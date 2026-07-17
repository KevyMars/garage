# Garage — Auto & Moto Maintenance

A PWA for tracking maintenance across multiple vehicles: service history, upcoming-maintenance reminders, VIN scanning/decode, and photo/notes per vehicle. React + TypeScript + Vite.

## Getting started

```bash
npm install
npm run dev
```

Visit `http://localhost:5173`. To test from a phone on the same Wi-Fi, visit `http://<this-Mac's-LAN-IP>:5173` instead — find the IP with `ipconfig getifaddr en0` (or check the "Network:" line Vite prints on startup).

## Camera / VIN barcode scanning (HTTPS)

Browsers only allow camera access (`getUserMedia`, used by the Scan VIN screen) on a "secure context" — `https://`, or `localhost`. Plain `npm run dev` over your LAN IP won't be able to use the camera. `npm run dev:https` serves the same dev server over HTTPS instead.

**One-time setup on this Mac** (already done as of this writing, but if you're setting up a new machine):

```bash
brew install mkcert
mkcert -install                      # trusts a local CA — may prompt for your password/Touch ID
mkdir certs
mkcert -key-file certs/key.pem -cert-file certs/cert.pem localhost <your-LAN-IP> 127.0.0.1 ::1
```

Re-run the `mkcert -key-file ...` line (with your current LAN IP) any time your IP changes — the `certs/` folder is gitignored since it's machine-specific.

**Every time you want to test the camera:**

```bash
npm run dev:https
```

This serves `https://<LAN-IP>:5173`. On this Mac, that URL is already trusted (browsers use the system keychain, which now trusts the mkcert CA). **Your iPhone is a separate trust store** and needs a one-time setup too:

1. AirDrop (or otherwise transfer) `~/Library/Application Support/mkcert/rootCA.pem` from this Mac to your iPhone.
2. On the iPhone, open the file — it'll prompt to install a Configuration Profile. Install it (Settings will ask for your passcode).
3. Go to **Settings → General → About → Certificate Trust Settings**, and enable full trust for the "mkcert" certificate.
4. Now visit `https://<LAN-IP>:5173` in Safari — it should load without a warning, and the Scan VIN screen will be able to request camera access.

Plain `npm run dev` (HTTP) still works as before for everything else — only camera scanning needs the HTTPS variant.

## VIN decoding

VIN decode uses [NHTSA's free vPIC API](https://vpic.nhtsa.dot.gov/api/) — no API key required. Coverage varies by manufacturer (especially for motorcycles), so some fields may come back blank; that's NHTSA's data, not a bug.

## Building

```bash
npm run build
```
