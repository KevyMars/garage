import { useGarage } from '../state/GarageContext';
import { useNavigation } from '../state/NavigationContext';
import { VehiclePhoto } from '../components/VehiclePhoto';
import { StatBox } from '../components/StatBox';
import { UpcomingRow } from '../components/UpcomingRow';
import { HistoryRow } from '../components/HistoryRow';
import { BackChevronIcon } from '../components/Icons';
import { fmtMi, vehicleSubtitle } from '../data/constants';
import styles from './VehicleDetailScreen.module.css';

export function VehicleDetailScreen() {
  const { vehicles, askEdit, askDelete } = useGarage();
  const nav = useNavigation();
  const { vehicleId } = nav.current.params;
  const vehicle = vehicles.find((v) => v.id === vehicleId);

  if (!vehicle) return null;

  return (
    <div className="scroll-screen">
      <div className={styles.scroll}>
        <div
          className={styles.hero}
          style={{ background: `linear-gradient(135deg, ${vehicle.colorA}, ${vehicle.colorB})` }}
        >
          <button className={styles.backButton} onClick={() => nav.pop()} aria-label="Back">
            <BackChevronIcon color="#fff" />
          </button>
          <div className={styles.typeBadge}>{vehicle.isMoto ? 'MOTORCYCLE' : 'CAR / TRUCK'}</div>
          <div className={styles.plateChip}>{vehicle.plate}</div>
          <VehiclePhoto photo={vehicle.photo} isMoto={vehicle.isMoto} iconSize={64} />
        </div>

        <div className={styles.info}>
          <div className={styles.nickname}>{vehicle.nickname}</div>
          <div className={styles.subtitle}>{vehicleSubtitle(vehicle)}</div>

          <div className={styles.statRow}>
            <StatBox label="Mileage" value={fmtMi(vehicle.mileage)} />
            <StatBox label="Records" value={vehicle.history.length} />
            <StatBox label="VIN" value={`…${vehicle.vin.slice(-6)}`} mono />
          </div>

          <div
            className={`primary-button ${styles.ctaButton}`}
            onClick={() => nav.push('addService', { vehicleId: vehicle.id })}
          >
            + Log Service
          </div>

          {vehicle.upcoming.length > 0 && (
            <div className={styles.section}>
              <div className="section-label">Upcoming</div>
              <div className={styles.upcomingList}>
                {vehicle.upcoming.map((u) => (
                  <UpcomingRow
                    key={u.id}
                    item={u}
                    onLogNow={() => nav.push('addService', { vehicleId: vehicle.id, presetType: u.type })}
                  />
                ))}
              </div>
            </div>
          )}

          <div className={styles.section}>
            <div className="section-label">History</div>
            <div className={styles.historyCard}>
              {vehicle.history.map((h) => (
                <HistoryRow key={h.id} entry={h} />
              ))}
            </div>
          </div>

          <div className={styles.actionRow}>
            <div className={`${styles.actionButton} ${styles.editButton}`} onClick={() => askEdit(vehicle.id)}>
              Edit
            </div>
            <div className={`${styles.actionButton} ${styles.deleteButton}`} onClick={() => askDelete(vehicle.id)}>
              Delete
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
