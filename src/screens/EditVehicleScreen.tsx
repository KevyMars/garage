import { useState } from 'react';
import { useGarage } from '../state/GarageContext';
import { useNavigation } from '../state/NavigationContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { PhotoPicker } from '../components/PhotoPicker';
import { PlusIcon, TrashIcon } from '../components/Icons';
import type { HistoryEntry } from '../types';
import styles from './EditVehicleScreen.module.css';

export function EditVehicleScreen() {
  const garage = useGarage();
  const nav = useNavigation();
  const { vehicleId } = nav.current.params;
  const vehicle = garage.vehicles.find((v) => v.id === vehicleId);

  const [nickname, setNickname] = useState(vehicle?.nickname ?? '');
  const [year, setYear] = useState(String(vehicle?.year ?? ''));
  const [make, setMake] = useState(vehicle?.make ?? '');
  const [model, setModel] = useState(vehicle?.model ?? '');
  const [trim, setTrim] = useState(vehicle?.trim ?? '');
  const [vin, setVin] = useState(vehicle?.vin && vehicle.vin !== '—' ? vehicle.vin : '');
  const [plate, setPlate] = useState(vehicle?.plate && vehicle.plate !== '— —' ? vehicle.plate : '');
  const [mileage, setMileage] = useState(String(vehicle?.mileage ?? ''));
  const [history, setHistory] = useState<HistoryEntry[]>(vehicle ? vehicle.history.map((h) => ({ ...h })) : []);
  const [photo, setPhoto] = useState(vehicle?.photo);
  const [notes, setNotes] = useState(vehicle?.notes ?? '');

  if (!vehicle) return null;

  const updateEntry = (index: number, field: keyof HistoryEntry, value: string) => {
    setHistory((h) => h.map((entry, i) => (i === index ? { ...entry, [field]: value } : entry)));
  };

  const removeEntry = (index: number) => {
    setHistory((h) => h.filter((_, i) => i !== index));
  };

  const addEntry = () => {
    setHistory((h) => [{ id: 'h' + Date.now(), type: '', date: '', mileage: 0, cost: '', notes: '', ts: Date.now() }, ...h]);
  };

  const save = () => {
    if (photo && photo !== vehicle.photo) garage.setPhoto(vehicle.id, photo);
    garage.saveEditVehicle(
      vehicle.id,
      { nickname, year, make, model, trim, vin, plate, mileage: parseInt(mileage, 10) || 0, notes },
      history,
    );
    nav.pop();
  };

  return (
    <div className="scroll-screen">
      <ScreenHeader title="Edit Vehicle" />
      <div className="scroll-body">
        <div className={styles.photoArea}>
          <PhotoPicker photo={photo} onPick={setPhoto} placeholder="Drop a vehicle photo" />
        </div>

        <label className="field-label">Nickname</label>
        <input type="text" className="text-input" value={nickname} onChange={(e) => setNickname(e.target.value)} />

        <div className="field-row" style={{ marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label className="field-label">Year</label>
            <input
              type="text"
              className="text-input"
              style={{ marginTop: 6, marginBottom: 0 }}
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div style={{ flex: 2 }}>
            <label className="field-label">Make</label>
            <input
              type="text"
              className="text-input"
              style={{ marginTop: 6, marginBottom: 0 }}
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />
          </div>
        </div>

        <div className="field-row" style={{ marginBottom: 16 }}>
          <div style={{ flex: 2 }}>
            <label className="field-label">Model</label>
            <input
              type="text"
              className="text-input"
              style={{ marginTop: 6, marginBottom: 0 }}
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className="field-label">Trim</label>
            <input
              type="text"
              className="text-input"
              style={{ marginTop: 6, marginBottom: 0 }}
              value={trim}
              onChange={(e) => setTrim(e.target.value)}
            />
          </div>
        </div>

        <label className="field-label">VIN</label>
        <input
          type="text"
          className="text-input mono"
          placeholder="17-character VIN"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
        />

        <label className="field-label">License Plate</label>
        <input
          type="text"
          className="text-input mono"
          placeholder="e.g. 7XKT 291"
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
        />

        <label className="field-label">Current Mileage</label>
        <input
          type="number"
          className="text-input"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
        />

        <label className="field-label">Notes</label>
        <textarea
          className="text-input"
          placeholder="Mods, quirks, reminders, anything else worth remembering…"
          rows={3}
          style={{ marginBottom: 22 }}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="section-label" style={{ marginBottom: 10 }}>
          History
        </div>
        <div className={styles.historyList}>
          {history.map((entry, i) => (
            <div key={entry.id} className={styles.historyEntry}>
              <div className={styles.entryTopRow}>
                <input
                  type="text"
                  className={styles.entryInput}
                  placeholder="Service type"
                  value={entry.type}
                  onChange={(e) => updateEntry(i, 'type', e.target.value)}
                />
                <div className={styles.deleteEntryButton} onClick={() => removeEntry(i)}>
                  <TrashIcon />
                </div>
              </div>
              <div className={styles.entryBottomRow}>
                <input
                  type="text"
                  className={styles.entryInput}
                  placeholder="Date"
                  value={entry.date}
                  onChange={(e) => updateEntry(i, 'date', e.target.value)}
                />
                <input
                  type="number"
                  className={styles.entryInput}
                  placeholder="Mileage"
                  value={entry.mileage}
                  onChange={(e) => updateEntry(i, 'mileage', e.target.value)}
                />
                <input
                  type="text"
                  className={styles.entryInput}
                  placeholder="Cost"
                  value={entry.cost}
                  onChange={(e) => updateEntry(i, 'cost', e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.addEntryRow} onClick={addEntry}>
          <PlusIcon size={13} color="currentColor" strokeWidth={2.4} />
          Add history entry
        </div>

        <div className="primary-button" onClick={save}>
          Save Changes
        </div>
        <div className={styles.cancelLink} onClick={() => nav.pop()}>
          Cancel
        </div>
      </div>
    </div>
  );
}
