import type { VinDraft } from '../types';

const VIN_PATTERN = /^[A-HJ-NPR-Z0-9]{17}$/;
const NHTSA_ENDPOINT = 'https://vpic.nhtsa.dot.gov/api/vehicles/decodevin';

export class VinDecodeError extends Error {}

interface NhtsaResult {
  Variable: string;
  Value: string | null;
}

interface NhtsaResponse {
  Results?: NhtsaResult[];
}

function pick(results: NhtsaResult[], variable: string): string {
  const value = results.find((r) => r.Variable === variable)?.Value;
  return value ? value.trim() : '';
}

function formatDisplacement(raw: string): string {
  const num = parseFloat(raw);
  return Number.isFinite(num) ? num.toFixed(1) : raw;
}

function buildEngineLabel(results: NhtsaResult[]): string {
  const electrification = pick(results, 'Electrification Level').toUpperCase();
  if (electrification.includes('BEV')) return 'Electric';

  const displacement = pick(results, 'Displacement (L)');
  const cylinders = pick(results, 'Engine Number of Cylinders');
  const parts: string[] = [];
  if (displacement) parts.push(`${formatDisplacement(displacement)}L`);
  if (cylinders) parts.push(`${cylinders}-Cyl`);
  if (parts.length) return parts.join(' ');

  return pick(results, 'Fuel Type - Primary') || '—';
}

/**
 * Decodes a real VIN via NHTSA's free vPIC API (no key required).
 * NHTSA's own data coverage is uneven — many valid VINs (motorcycles
 * especially) come back with only some fields populated and non-fatal
 * warning codes, so this only rejects a VIN outright when the format is
 * invalid, the request fails, or nothing usable came back at all.
 */
export async function decodeVin(vin: string): Promise<VinDraft> {
  const cleaned = vin.trim().toUpperCase();
  if (!VIN_PATTERN.test(cleaned)) {
    throw new VinDecodeError("That VIN doesn't look right — it should be 17 characters (no I, O, or Q).");
  }

  let response: Response;
  try {
    response = await fetch(`${NHTSA_ENDPOINT}/${cleaned}?format=json`);
  } catch {
    throw new VinDecodeError('Could not reach the VIN decoder. Check your connection and try again.');
  }
  if (!response.ok) {
    throw new VinDecodeError('The VIN decoder is unavailable right now. Try again later.');
  }

  const data = (await response.json()) as NhtsaResponse;
  const results = data.Results ?? [];

  const make = pick(results, 'Make');
  const model = pick(results, 'Model');
  if (!make && !model) {
    throw new VinDecodeError("That VIN couldn't be decoded. Double-check it or enter details manually.");
  }

  const vehicleType = pick(results, 'Vehicle Type').toUpperCase();

  return {
    vin: cleaned,
    isMoto: vehicleType.includes('MOTORCYCLE'),
    year: pick(results, 'Model Year') || '—',
    make: make || 'Unknown',
    model: model || 'Vehicle',
    trim: pick(results, 'Trim') || pick(results, 'Series'),
    engine: buildEngineLabel(results),
    nickname: '',
    mileage: '',
  };
}
