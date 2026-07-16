import type { UpcomingItem } from '../types';
import { URGENCY_COLOR } from '../data/constants';
import { ChevronRightIcon } from './Icons';
import styles from './UpcomingRow.module.css';

interface UpcomingRowProps {
  item: UpcomingItem;
  vehicleName?: string;
  onClick?: () => void;
  onLogNow?: () => void;
}

export function UpcomingRow({ item, vehicleName, onClick, onLogNow }: UpcomingRowProps) {
  const color = URGENCY_COLOR[item.urgency];
  return (
    <div
      className={`${styles.row} ${onClick ? styles.clickable : ''}`}
      style={{ borderLeft: `3px solid ${color}` }}
      onClick={onClick}
    >
      <div>
        <div className={`${styles.type} ${!vehicleName ? styles.detailType : ''}`}>{item.type}</div>
        <div className={`${styles.meta} ${!vehicleName ? styles.detailMeta : ''}`}>
          {vehicleName ? `${vehicleName} · ${item.dueLabel}` : item.dueLabel}
        </div>
      </div>
      {onLogNow && (
        <div
          className={styles.logNow}
          onClick={(e) => {
            e.stopPropagation();
            onLogNow();
          }}
        >
          Log now
        </div>
      )}
      {onClick && !onLogNow && <ChevronRightIcon />}
    </div>
  );
}
