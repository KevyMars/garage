import { useState } from 'react';
import { useGarage } from '../state/GarageContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { SwipeToDeleteRow } from '../components/SwipeToDeleteRow';
import { vehicleSubtitle } from '../data/constants';
import styles from './ArchiveScreen.module.css';

export function ArchiveScreen() {
  const { archived, restoreVehicle, askDeleteArchived } = useGarage();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="scroll-screen">
      <ScreenHeader title="Archive" />
      <div className={styles.body}>
        {archived.map((v) => (
          <SwipeToDeleteRow
            key={v.id}
            isOpen={openId === v.id}
            onOpen={() => setOpenId(v.id)}
            onClose={() => setOpenId((cur) => (cur === v.id ? null : cur))}
            onDelete={() => askDeleteArchived(v.id)}
          >
            <div className={styles.card}>
              <div style={{ minWidth: 0 }}>
                <div className={styles.nickname}>{v.nickname}</div>
                <div className={styles.subtitle}>{vehicleSubtitle(v)}</div>
              </div>
              <div className={styles.restoreButton} onClick={() => restoreVehicle(v.id)}>
                Restore
              </div>
            </div>
          </SwipeToDeleteRow>
        ))}
        {archived.length === 0 && <div className={styles.empty}>No archived vehicles.</div>}
      </div>
    </div>
  );
}
