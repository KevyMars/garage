import type { VinDraft } from '../types';

/**
 * Placeholder for a real VIN-decode API call (e.g. NHTSA vPIC).
 * Keeps the same loading-state UX described in the design handoff.
 */
export function mockDecodeVin(typedVin?: string, isMoto = false): Promise<VinDraft> {
  const delay = typedVin ? 1200 : 1500;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        vin: typedVin
          ? typedVin.length > 3
            ? typedVin.toUpperCase()
            : 'JTMHY7AJ0482201'
          : 'JTMHY7AJ' + Math.floor(1000000 + Math.random() * 8999999),
        isMoto,
        year: 2024,
        make: 'Toyota',
        model: 'Tacoma',
        trim: 'TRD Off-Road',
        engine: '3.5L V6',
        nickname: '',
        mileage: '',
      });
    }, delay);
  });
}
