import { useState } from 'react';
import { useGarage } from '../state/GarageContext';
import { useNavigation } from '../state/NavigationContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { decodeVin, VinDecodeError } from '../data/vinDecode';
import styles from './ManualVinScreen.module.css';

export function ManualVinScreen() {
  const garage = useGarage();
  const nav = useNavigation();
  const [vin, setVin] = useState('');

  const decode = async () => {
    garage.setScanning(true);
    try {
      const draft = await decodeVin(vin);
      garage.setScanning(false);
      garage.setDraft(draft);
      nav.push('scanResult');
    } catch (err) {
      garage.setScanning(false);
      garage.showToast(err instanceof VinDecodeError ? err.message : 'Could not decode that VIN.');
    }
  };

  return (
    <div className="scroll-screen">
      <ScreenHeader title="Enter VIN Manually" />
      <div className="scroll-body">
        <div className={styles.helper}>
          Enter the 17-character VIN found on your registration, title, or driver-side door jamb.
        </div>
        <label className="field-label">VIN</label>
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
      </div>
    </div>
  );
}
