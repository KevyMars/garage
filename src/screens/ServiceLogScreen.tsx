import { useGarage } from '../state/GarageContext';
import { HomeHeader } from '../components/HomeHeader';
import { HistoryRow } from '../components/HistoryRow';
import styles from './ServiceLogScreen.module.css';

export function ServiceLogScreen() {
  const { vehicles } = useGarage();

  const allHistory = vehicles
    .flatMap((v) => v.history.map((h) => ({ ...h, vehicleName: v.nickname })))
    .sort((a, b) => (b.ts || 0) - (a.ts || 0));

  return (
    <div className="scroll-screen">
      <HomeHeader title="Service Log" subtitle={`${allHistory.length} entries logged`} />
      <div className={styles.body}>
        <div className={styles.card}>
          {allHistory.map((h) => (
            <HistoryRow key={h.id} entry={h} vehicleName={h.vehicleName} />
          ))}
        </div>
      </div>
    </div>
  );
}
