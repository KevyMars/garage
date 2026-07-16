import { useState } from 'react';
import { useGarage } from '../state/GarageContext';
import { useNavigation } from '../state/NavigationContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { CAR_GRADIENT, MOTO_GRADIENT } from '../data/constants';
import type { Vehicle } from '../types';
import styles from './ConfirmVehicleScreen.module.css';

export function ConfirmVehicleScreen() {
  const garage = useGarage();
  const nav = useNavigation();
  const draft = garage.draft;
  const [nickname, setNickname] = useState('');
  const [mileage, setMileage] = useState('');

  if (!draft) return null;

  const addToGarage = () => {
    const mileageNum = parseInt(mileage, 10) || 0;
    const [colorA, colorB] = draft.isMoto ? MOTO_GRADIENT : CAR_GRADIENT;
    const vehicle: Vehicle = {
      id: 'v' + Date.now(),
      isMoto: draft.isMoto,
      year: draft.year,
      make: draft.make,
      model: draft.model,
      trim: draft.trim || '',
      nickname: nickname || `${draft.make} ${draft.model}`,
      vin: draft.vin,
      plate: '— —',
      colorA,
      colorB,
      mileage: mileageNum,
      history: [],
      upcoming: [{ id: 'u' + Date.now(), type: 'First Service', urgency: 'upcoming', dueLabel: "Schedule whenever you're ready" }],
    };
    garage.addVehicle(vehicle);
    garage.setDraft(null);
    nav.push('addSuccess', { vehicleId: vehicle.id });
  };

  return (
    <div className="scroll-screen">
      <ScreenHeader title="Confirm Vehicle" />
      <div className="scroll-body">
        <div className={styles.card}>
          <div className={styles.row}>
            <span className={styles.rowLabel}>VIN</span>
            <span className={`${styles.rowValue} ${styles.mono}`}>{draft.vin}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Year / Make / Model</span>
            <span className={styles.rowValue}>
              {draft.year} {draft.make} {draft.model}
            </span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Trim</span>
            <span className={styles.rowValue}>{draft.trim}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Engine</span>
            <span className={styles.rowValue}>{draft.engine}</span>
          </div>
        </div>

        <label className="field-label">Nickname</label>
        <input
          type="text"
          className="text-input"
          placeholder="e.g. The Hauler"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />

        <label className="field-label">Current Mileage</label>
        <input
          type="number"
          className="text-input"
          placeholder="0"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
        />

        <div className="primary-button" onClick={addToGarage}>
          Add to Garage
        </div>
      </div>
    </div>
  );
}
