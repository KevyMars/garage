import { useGarage } from '../state/GarageContext';
import styles from './ScanningOverlay.module.css';

export function ScanningOverlay() {
  const { scanning } = useGarage();
  if (!scanning) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.spinner} />
      <div className={styles.label}>Decoding VIN…</div>
    </div>
  );
}
