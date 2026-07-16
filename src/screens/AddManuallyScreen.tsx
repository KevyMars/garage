import { useState } from 'react';
import { useGarage } from '../state/GarageContext';
import { useNavigation } from '../state/NavigationContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { mockDecodeVin } from '../data/vinDecode';
import { CAR_GRADIENT, MOTO_GRADIENT } from '../data/constants';
import type { Vehicle } from '../types';
import styles from './AddManuallyScreen.module.css';

export function AddManuallyScreen() {
  const garage = useGarage();
  const nav = useNavigation();

  const [vin, setVin] = useState('');
  const [isMoto, setIsMoto] = useState(false);
  const [year, setYear] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [nickname, setNickname] = useState('');
  const [mileage, setMileage] = useState('');

  const decode = () => {
    garage.setScanning(true);
    mockDecodeVin(vin, isMoto).then((draft) => {
      garage.setScanning(false);
      garage.setDraft(draft);
      nav.push('scanResult');
    });
  };

  const addToGarage = () => {
    const mileageNum = parseInt(mileage, 10) || 0;
    const [colorA, colorB] = isMoto ? MOTO_GRADIENT : CAR_GRADIENT;
    const vehicle: Vehicle = {
      id: 'v' + Date.now(),
      isMoto,
      year: year || '—',
      make: make || 'Unknown',
      model: model || 'Vehicle',
      trim: '',
      nickname: nickname || `${make || 'New'} ${model || 'Vehicle'}`,
      vin: vin ? vin.toUpperCase() : '—',
      plate: '— —',
      colorA,
      colorB,
      mileage: mileageNum,
      history: [],
      upcoming: [{ id: 'u' + Date.now(), type: 'First Service', urgency: 'upcoming', dueLabel: "Schedule whenever you're ready" }],
    };
    garage.addVehicle(vehicle);
    nav.push('addSuccess', { vehicleId: vehicle.id });
  };

  return (
    <div className="scroll-screen">
      <ScreenHeader title="Add Manually" />
      <div className="scroll-body">
        <label className="field-label">VIN (optional)</label>
        <div className={styles.vinRow}>
          <input
            type="text"
            className="text-input mono"
            style={{ margin: 0 }}
            placeholder="17-character VIN"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
          />
          <div className={styles.decodeButton} onClick={decode}>
            Decode
          </div>
        </div>

        <div className="or-divider">
          <div className="line" />
          <span>or enter details manually</span>
          <div className="line" />
        </div>

        <div className="segmented">
          <div
            className="segment"
            style={{
              background: !isMoto ? '#ff5a1f' : 'rgba(255,255,255,0.06)',
              color: !isMoto ? '#121316' : 'rgba(242,239,233,0.7)',
              borderColor: !isMoto ? '#ff5a1f' : 'rgba(255,255,255,0.1)',
            }}
            onClick={() => setIsMoto(false)}
          >
            Car / Truck
          </div>
          <div
            className="segment"
            style={{
              background: isMoto ? '#ff5a1f' : 'rgba(255,255,255,0.06)',
              color: isMoto ? '#121316' : 'rgba(242,239,233,0.7)',
              borderColor: isMoto ? '#ff5a1f' : 'rgba(255,255,255,0.1)',
            }}
            onClick={() => setIsMoto(true)}
          >
            Motorcycle
          </div>
        </div>

        <div className="field-row" style={{ marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <label className="field-label">Year</label>
            <input
              type="text"
              className="text-input"
              style={{ marginTop: 6, marginBottom: 0 }}
              placeholder="2022"
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
              placeholder="Honda"
              value={make}
              onChange={(e) => setMake(e.target.value)}
            />
          </div>
        </div>

        <label className="field-label">Model</label>
        <input
          type="text"
          className="text-input"
          placeholder="Civic"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />

        <label className="field-label">Nickname</label>
        <input
          type="text"
          className="text-input"
          placeholder="e.g. Daily Driver"
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
