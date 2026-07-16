import { useGarage } from '../state/GarageContext';
import styles from './Toast.module.css';

export function Toast() {
  const { toast } = useGarage();
  if (!toast) return null;
  return <div className={styles.toast}>{toast}</div>;
}
