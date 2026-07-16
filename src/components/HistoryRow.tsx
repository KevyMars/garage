import type { HistoryEntry } from '../types';
import { fmtMi } from '../data/constants';
import { WrenchIcon } from './Icons';
import styles from './HistoryRow.module.css';

interface HistoryRowProps {
  entry: HistoryEntry;
  vehicleName?: string;
}

export function HistoryRow({ entry, vehicleName }: HistoryRowProps) {
  return (
    <div className={styles.row}>
      <div className={styles.iconChip}>
        <WrenchIcon />
      </div>
      <div className={styles.main}>
        <div className={styles.type}>{entry.type}</div>
        <div className={styles.meta}>
          {vehicleName ? `${vehicleName} · ${entry.date}` : entry.date}
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.cost}>{entry.cost}</div>
        <div className={styles.mileage}>{fmtMi(entry.mileage)}</div>
      </div>
    </div>
  );
}
