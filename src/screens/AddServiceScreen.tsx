import { useState } from 'react';
import { useGarage } from '../state/GarageContext';
import { useNavigation } from '../state/NavigationContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { SERVICE_TYPES } from '../data/constants';
import type { HistoryEntry } from '../types';
import styles from './AddServiceScreen.module.css';

export function AddServiceScreen() {
  const garage = useGarage();
  const nav = useNavigation();
  const { vehicleId, presetType } = nav.current.params;
  const vehicle = garage.vehicles.find((v) => v.id === vehicleId);

  const [type, setType] = useState<string | null>(presetType ?? null);
  const [date, setDate] = useState('Today');
  const [mileage, setMileage] = useState(vehicle ? String(vehicle.mileage) : '');
  const [cost, setCost] = useState('');
  const [notes, setNotes] = useState('');

  if (!vehicle) return null;

  const save = () => {
    if (!type) {
      garage.showToast('Pick a service type');
      return;
    }
    const entry: HistoryEntry = {
      id: 's' + Date.now(),
      type,
      date: date || 'Today',
      mileage: parseInt(mileage, 10) || 0,
      cost: cost ? `$${cost}` : '$0',
      notes,
      ts: Date.now(),
    };
    garage.logService(vehicle.id, entry);
    nav.pop();
  };

  return (
    <div className="scroll-screen">
      <ScreenHeader title="Log Service" subtitle={vehicle.nickname} />
      <div className="scroll-body">
        <label className="field-label">Service Type</label>
        <div className={styles.typeRow}>
          {SERVICE_TYPES.map((label) => {
            const active = type === label;
            return (
              <div
                key={label}
                className={styles.typePill}
                style={{
                  background: active ? '#ff5a1f' : 'rgba(255,255,255,0.06)',
                  color: active ? '#121316' : 'rgba(242,239,233,0.75)',
                  borderColor: active ? '#ff5a1f' : 'rgba(255,255,255,0.1)',
                }}
                onClick={() => setType(label)}
              >
                {label}
              </div>
            );
          })}
        </div>

        <div className="field-row" style={{ marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label className="field-label">Date</label>
            <input
              type="text"
              className="text-input"
              style={{ marginTop: 6, marginBottom: 0 }}
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label className="field-label">Mileage</label>
            <input
              type="number"
              className="text-input"
              style={{ marginTop: 6, marginBottom: 0 }}
              value={mileage}
              onChange={(e) => setMileage(e.target.value)}
            />
          </div>
        </div>

        <label className="field-label">Cost ($)</label>
        <input type="text" className="text-input" placeholder="0" value={cost} onChange={(e) => setCost(e.target.value)} />

        <label className="field-label">Notes</label>
        <textarea
          className="text-input"
          placeholder="Parts used, shop, observations…"
          rows={3}
          style={{ marginBottom: 22 }}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <div className="primary-button" style={{ background: type ? '#ff5a1f' : 'rgba(255,90,31,0.5)' }} onClick={save}>
          Save Entry
        </div>
      </div>
    </div>
  );
}
