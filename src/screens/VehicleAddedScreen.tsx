import { useGarage } from '../state/GarageContext';
import { useNavigation } from '../state/NavigationContext';
import { CheckIcon } from '../components/Icons';
import { vehicleSubtitle } from '../data/constants';
import styles from './VehicleAddedScreen.module.css';

export function VehicleAddedScreen() {
  const { vehicles } = useGarage();
  const nav = useNavigation();
  const { vehicleId } = nav.current.params;
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  return (
    <div className={styles.screen}>
      <div className={styles.badge}>
        <CheckIcon />
      </div>
      <div className={styles.title}>Vehicle Added!</div>
      <div className={styles.helper}>It's now in your garage, ready to track.</div>
      {vehicle && (
        <div className={styles.summaryCard}>
          <div className={styles.summaryNickname}>{vehicle.nickname}</div>
          <div className={styles.summarySubtitle}>{vehicleSubtitle(vehicle)}</div>
        </div>
      )}
      <div className={`primary-button ${styles.doneButton}`} onClick={() => nav.resetToGarage()}>
        Done
      </div>
    </div>
  );
}
