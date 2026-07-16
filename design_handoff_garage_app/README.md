# Handoff: Garage — Auto & Moto Maintenance App

## Overview
A mobile app for tracking maintenance on multiple vehicles (cars, trucks, and motorcycles) in one garage. Core features: VIN scanning (simulated) with manual fallback to add a vehicle, per-vehicle service history and upcoming-maintenance reminders, logging new service entries, editing vehicle details (including a photo), and archiving/restoring vehicles instead of hard-deleting them.

## About the Design Files
The files in this bundle are **design references built as an interactive HTML prototype** (a single-file "Design Component" runtime, not production framework code). They demonstrate the intended visual design, layout, copy, and interaction/navigation flow with realistic sample data and working client-side state. **Do not ship the HTML/JS as-is.** The task is to recreate this design in the target codebase's existing environment (React Native, SwiftUI, Kotlin/Compose, or whatever the app already uses) — or, if no mobile framework exists yet, choose the most appropriate one and implement there, following that platform's native patterns for navigation, forms, and image picking (the prototype's simulated camera scan and drag-drop photo picker should become a real camera/VIN-scan integration and a real photo-library picker).

## Fidelity
**High-fidelity.** Colors, type, spacing, and copy in the prototype are final/intentional and should be recreated precisely. The prototype runs at a 390×844 iPhone viewport (iPhone 13/14-class screen) — treat this as the base design size and scale responsively for other device sizes.

## Screens / Views

### 1. Garage (home / vehicle list)
- **Purpose**: Landing screen. Lists all active vehicles, entry point to add a new vehicle or view the archive.
- **Layout**: Header row (title "Garage" + vehicle count subtext, left; circular orange "+" add button, right), then a vertically scrolling column of vehicle cards (gap 14px), a dashed "Add another vehicle" card, and (only if any vehicles are archived) a "View Archive (n)" text link at the bottom.
- **Vehicle card**: Rounded rect (18px radius), dark surface `#1c1e22`, 1px border `rgba(255,255,255,0.07)`.
  - Top: 108px-tall photo area, gradient background per-vehicle (`colorA`→`colorB`, 135deg) as fallback; a type badge pill top-left ("CAR / TRUCK" or "MOTORCYCLE", uppercase, 10.5px/700, on translucent black+blur). A photo (once added via Edit) fills this area instead of the gradient.
  - Bottom: nickname (Oswald 600, 19px), subtitle "{year} {make} {model} {trim}" (12.5px, 50% opacity white), then a row with mileage (clock icon + "N mi") on the left and a colored status pill on the right showing either the next-due service type or "All caught up".
  - Status pill colors: overdue = red `#ef4444`, due soon = amber `#ffb020`, upcoming/none = neutral gray; background is the color at ~13% opacity (or green-tinted `rgba(53,196,106,0.16)` when caught up).
  - Tapping a card opens Vehicle Detail. Tapping/dropping on the photo area itself opens the photo picker without navigating (must stop event propagation from the card's tap-to-open behavior).

### 2. Reminders
- **Purpose**: Cross-vehicle view of all upcoming/overdue maintenance.
- **Layout**: Header ("Reminders" + summary text "N items overdue" / "All caught up"), then sections grouped by urgency: **Overdue** (red), **Due Soon** (amber), **Upcoming** (neutral) — sections with no items are omitted.
- Each row: dark card (14px radius), 3px colored left border matching urgency, service type (15px/600) + "{vehicle nickname} · {due label}" (12.5px, 50% opacity), chevron affordance. Tapping opens that vehicle's detail.

### 3. Service Log
- **Purpose**: Flat, reverse-chronological list of every logged service entry across all vehicles.
- **Layout**: Header ("Service Log" + "N entries logged"), single card container (16px radius) with rows separated by 1px hairlines. Each row: small wrench-icon chip (orange on `rgba(255,90,31,0.14)`), service type (14.5px/600) + "{vehicle} · {date}" (12px, 50% opacity), right-aligned cost (13px/600) and mileage (11.5px, 40% opacity).

### 4. Vehicle Detail
- **Purpose**: Full record for one vehicle — stats, quick actions, upcoming items, full history, and edit/delete.
- **Layout**:
  - Hero (190px tall): gradient background (or the vehicle's photo once set, via the same photo slot as the Garage card/Edit screen), circular back button top-left, type badge top-left (offset right of back button), plate number bottom-right (monospace chip).
  - Title block: nickname (Oswald 700, 26px), subtitle (13.5px, 50% opacity).
  - Stat row: 3 equal dark cards (Mileage / Records / VIN-last-6), 14px radius, label 11px uppercase 45% opacity + value 15px/700.
  - Primary CTA: full-width "+ Log Service" button, orange `#ff5a1f` bg, dark text, 14px radius.
  - "Upcoming" section (only if items exist): cards with colored left border per urgency, type + due label, right-aligned "Log now" link (orange) that pre-fills the service-type on the Add Service screen.
  - "History" section: card list identical row style to the Service Log screen (icon chip, type/date, cost/mileage).
  - Bottom action row: two equal-width buttons — "Edit" (neutral, `rgba(255,255,255,0.06)` bg, white border) and "Delete" (red-tinted, `rgba(239,68,68,0.12)` bg, `#ef4444` text/border).

### 5. Scan VIN (intro)
- **Purpose**: Entry point for adding a vehicle via camera VIN scan.
- **Layout**: Header with back + "Scan VIN" title. Centered 260×260 scan frame with 4 orange corner brackets and an animated horizontal scan line (loops top↔bottom, glow shadow), a mock barcode graphic centered inside, helper copy "Align the VIN plate or barcode inside the frame", primary button "Simulate Scan" (in production: opens camera), and a secondary text link "Enter VIN manually".
- Tapping "Simulate Scan" shows a full-screen dark overlay with a spinning ring + "Decoding VIN…" (1.5s), then navigates to Confirm Vehicle with a decoded result.

### 6. Confirm Vehicle (scan result)
- **Purpose**: Review decoded VIN data and finish adding the vehicle.
- **Layout**: Header (back + "Confirm Vehicle"). Read-only summary card (VIN, Year/Make/Model, Trim, Engine — each a label/value row with hairline dividers). Below: editable "Nickname" and "Current Mileage" text inputs, then full-width orange "Add to Garage" button.

### 7. Add Manually
- **Purpose**: Manual-entry fallback (also reachable directly, and the destination of "Enter VIN manually").
- **Layout**: Header (back + "Add Manually"). Optional VIN field with an inline "Decode" action (feeds the same decode flow as scanning, 1.2s delay), a divider "or enter details manually", a two-segment toggle for vehicle type (Car/Truck vs Motorcycle — selected segment orange bg/dark text, unselected neutral), Year+Make row, Model field, Nickname field, Current Mileage field, then full-width "Add to Garage" button.

### 8. Vehicle Added (success)
- **Purpose**: Confirmation after adding a vehicle (from either scan or manual flow).
- **Layout**: Centered content — green circular check badge (pop-in animation), "Vehicle Added!" (Oswald 700, 24px), helper copy, a summary card echoing nickname/subtitle, full-width "Done" button returning to Garage.

### 9. Archive
- **Purpose**: View and restore vehicles that were deleted (archived, never hard-deleted).
- **Layout**: Header (back + "Archive"). List of cards (nickname + subtitle, right-aligned orange "Restore" pill). Empty state: centered "No archived vehicles." text.

### 10. Edit Vehicle
- **Purpose**: Edit a vehicle's photo, identity fields, mileage, plate, VIN, and full service history (add/edit/remove entries).
- **Layout**: Header (back + "Edit Vehicle"). Photo drop/picker area (150px tall, rounded). Fields in order: Nickname; Year + Make (side by side); Model + Trim (side by side); VIN; License Plate; Current Mileage. "History" section: one editable card per entry with a Type field + delete (trash) button on one row, and Date/Mileage/Cost fields on the next row; a dashed "Add history entry" row appends a new blank entry at the top. Primary "Save Changes" button (orange), then a plain-text "Cancel" link below it that discards changes and returns to Vehicle Detail.
- Reached only via a confirmation modal (see below) from Vehicle Detail's "Edit" button.

### 11. Add Service
- **Purpose**: Log a new maintenance entry against a vehicle.
- **Layout**: Header (back, "Log Service" title + vehicle nickname subtitle). "Service Type" as a wrapping row of selectable pills (Oil Change, Tires, Brakes, Battery, Chain/Belt, Fluids, Inspection, Other — selected = orange bg/dark text). Date + Mileage fields (side by side), Cost field, Notes textarea (3 rows). "Save Entry" button — disabled-looking (50% opacity orange) until a service type is selected; saving updates the vehicle's mileage (if higher), prepends the entry to history, clears any matching "upcoming" item of the same type, and shows a "Service logged" toast.

## Interactions & Behavior

### Navigation model
A single navigation **stack** (array of `{screen, params}`), not a flat router: pushing adds a screen, back pops it. The bottom tab bar (Garage / Reminders / Log) is only visible when the stack has exactly one entry (i.e., not mid-flow); tapping a tab resets the stack to that screen. This should map to your framework's native stack + tab navigator equivalent (e.g., a tab navigator whose each tab hosts its own stack navigator).

### Bottom tab bar
Three tabs: Garage (house icon), Reminders (bell icon, with a small pulsing red dot badge when any item is overdue), Log (list/document icon). Active tab icon+label tinted orange `#ff5a1f`; inactive `rgba(242,239,233,0.4)`.

### Confirmation modals
A single reusable centered modal (dark card, 18px radius, over a 60%-black scrim) used for two destructive/navigational confirmations:
- **Delete vehicle**: title "Delete vehicle?", body names the vehicle and explains it moves to Archive (recoverable), buttons Cancel / **Delete** (red). Confirms → vehicle removed from active list, appended to archived list, user is returned to Garage, toast "Vehicle moved to archive".
- **Edit vehicle**: title "Edit vehicle?", body explains what's editable, buttons Cancel / **Continue** (orange). Confirms → opens Edit Vehicle pre-filled with that vehicle's current data.

### Toasts
A single bottom-anchored toast (rounded pill, dark, fades/slides in) for confirmations: "Vehicle moved to archive", "Vehicle restored", "Vehicle updated", "Service logged", and a validation nudge "Pick a service type" if Save Entry is tapped with no type selected.

### Photo picking
The vehicle photo is a single shared "slot" per vehicle (same photo shows on the Garage card, the Vehicle Detail hero, and is editable from the Edit screen) — in the prototype this is a drag-and-drop / click-to-browse image placeholder; in production this should be a native photo-library picker (and ideally camera capture too), with the chosen image persisted per-vehicle and rendered in all three locations.

### VIN scan simulation
"Simulate Scan" and "Decode" (manual VIN) both show a 1.2–1.5s loading state (full-screen spinner + "Decoding VIN…") before resolving to mock decoded data (year/make/model/trim/engine). In production, replace with a real camera capture + VIN-decode API call, keeping the same loading-state UX and the Confirm Vehicle review step before committing.

### Archive / restore
Deleting a vehicle never destroys data — it moves the full vehicle record (including history) to an `archived` list, visible and restorable from the Archive screen ("Restore" moves it back to the active list).

### Editable history in Edit Vehicle
Each history entry is independently editable inline (type, date, mileage, cost) and removable; a new blank entry can be added at any time. Saving persists the whole edited array back onto the vehicle, coercing mileage to a number and cost to a "$"-prefixed string.

## State Management
Minimum state needed per user/session:
- `vehicles`: array of vehicle records (active/in-garage)
- `archived`: array of vehicle records (soft-deleted)
- Navigation stack (screen name + params, e.g. `{ vehicleId }`)
- `activeTab`: which bottom tab is selected (only meaningful when stack depth is 1)
- Transient form state per in-progress flow: manual-add form, scan-result draft, service-entry form, edit-vehicle form (all local/ephemeral until saved)
- `confirmModal`: which confirmation (if any) is open, and for which vehicle
- `toast`: current toast message (auto-dismiss ~2.2s)

**Vehicle record shape**:
```
{
  id, isMoto (bool), year, make, model, trim,
  nickname, vin, plate, mileage (number),
  photo (image reference),
  history: [{ id, type, date, mileage, cost, notes, ts }],
  upcoming: [{ id, type, urgency: 'overdue'|'soon'|'upcoming', dueLabel }]
}
```
`upcoming` items are derived/managed maintenance schedule entries — in the prototype these are static seed data; production should compute them from a real maintenance-interval schedule (mileage/date-based) per service type.

## Design Tokens

**Colors**
- Background (app/screens): `#0a0a0b` / `#121316`
- Surface (cards): `#1c1e22`
- Surface border: `rgba(255,255,255,0.07)` (hairlines `rgba(255,255,255,0.06)`)
- Primary/accent (orange): `#ff5a1f`
- Text primary: `#f2efe9`
- Text secondary: `rgba(242,239,233,0.5)` (also 0.4 / 0.45 / 0.6 / 0.65 tints used contextually)
- Success/green: `#35c46a`
- Error/red (overdue, delete): `#ef4444`
- Warning/amber (due soon): `#ffb020`
- Vehicle gradient examples: truck `#3b4854`→`#20272e`; motorcycle `#4a2a24`→`#1c1210`; sedan `#2c4a6b`→`#16232f` (each vehicle gets its own 2-color diagonal gradient, car-type-tinted)

**Typography**
- Display/headers: **Oswald** 500/600/700
- Body/UI: **Inter** 400/500/600/700
- Monospace (VIN, plate): **JetBrains Mono** 500/600
- Scale in use: 30px (screen titles), 26px (vehicle name), 24px (success title), 19px (card title), 17px (nav header), 15–15.5px (buttons/body), 13–13.5px (secondary/subtitle), 11–12.5px (labels/meta)

**Radii**: 18px (cards), 14–16px (panels/buttons/modals), 12px (inputs/pills segments), 10px (small chips), 50% (circular buttons/badges)

**Spacing**: card gap 14px, screen horizontal padding 16–20px, section vertical rhythm ~26px between grouped sections

## Assets
- Icons are hand-drawn inline SVG line icons (clock, chevron, wrench, checkmark, tab-bar icons, back-chevron) — no external icon library was used; recreate as an icon set or inline SVGs in the target codebase.
- Vehicle photos use a placeholder "drop/browse image" component in the prototype — replace with a real photo picker + stored image URL/asset reference.
- App icon (for home-screen/PWA install) is included under `icons/` (192×192 and 512×512 PNG, dark rounded-square with an orange wrench mark) — reusable as the app icon / launch icon in the native build.
- Fonts loaded via Google Fonts (Oswald, Inter, JetBrains Mono) — bundle or link these in the target app.

## Files
- `Auto Maintenance App.dc.html` — the full interactive prototype (all 11 screens, navigation, and sample data/state logic). This is the primary reference; open it in a browser to click through every flow.
- `image-slot.js` — the drag-and-drop/click-to-browse photo picker component used for vehicle photos (prototype-only implementation detail; production should use a native photo picker).
- `support.js` — prototype runtime support file (not relevant to production implementation).
- `manifest.json`, `service-worker.js`, `icons/` — PWA packaging added so the prototype installs as a home-screen app; reference only for icon assets and app metadata (name, theme color) if useful, not for production architecture.
