import { useGarage } from '../state/GarageContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { vehicleSubtitle } from '../data/constants';
import styles from './ArchiveScreen.module.css';

export function ArchiveScreen() {
  const { archived, restoreVehicle } = useGarage();

  return (
    <div className="scroll-screen">
      <ScreenHeader title="Archive" />
      <div className={styles.body}>
        {archived.map((v) => (
          <div key={v.id} className={styles.card}>
            <div style={{ minWidth: 0 }}>
              <div className={styles.nickname}>{v.nickname}</div>
              <div className={styles.subtitle}>{vehicleSubtitle(v)}</div>
            </div>
            <div className={styles.restoreButton} onClick={() => restoreVehicle(v.id)}>
              Restore
            </div>
          </div>
        ))}
        {archived.length === 0 && <div className={styles.empty}>No archived vehicles.</div>}
      </div>
    </div>
  );
}
