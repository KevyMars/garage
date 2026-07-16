import type { Vehicle } from '../types';
import { URGENCY_COLOR, URGENCY_ORDER, fmtMi, vehicleSubtitle } from '../data/constants';
import { ClockIcon } from './Icons';
import { PhotoPicker } from './PhotoPicker';
import { useGarage } from '../state/GarageContext';
import { useNavigation } from '../state/NavigationContext';
import styles from './VehicleCard.module.css';

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const garage = useGarage();
  const nav = useNavigation();

  const sorted = [...vehicle.upcoming].sort((a, b) => URGENCY_ORDER[a.urgency] - URGENCY_ORDER[b.urgency]);
  const next = sorted[0];
  const color = next ? URGENCY_COLOR[next.urgency] : 'rgba(242,239,233,0.35)';
  const badgeBg = next ? `${color}22` : 'rgba(53,196,106,0.16)';

  return (
    <div className={styles.card} onClick={() => nav.push('vehicleDetail', { vehicleId: vehicle.id })}>
      <div
        className={styles.photoArea}
        style={{ background: `linear-gradient(135deg, ${vehicle.colorA}, ${vehicle.colorB})` }}
      >
        <div className={styles.typeBadge}>{vehicle.isMoto ? 'MOTORCYCLE' : 'CAR / TRUCK'}</div>
        <PhotoPicker
          overlay
          photo={vehicle.photo}
          placeholder="Add photo"
          onPick={(dataUrl) => garage.setPhoto(vehicle.id, dataUrl)}
        />
      </div>
      <div className={styles.body}>
        <div className={styles.nickname}>{vehicle.nickname}</div>
        <div className={styles.subtitle}>{vehicleSubtitle(vehicle)}</div>
        <div className={styles.metaRow}>
          <div className={styles.mileage}>
            <ClockIcon />
            {fmtMi(vehicle.mileage)}
          </div>
          <div className={styles.statusPill} style={{ background: badgeBg, color }}>
            <span className={styles.statusDot} style={{ background: color }} />
            {next ? next.type : 'All caught up'}
          </div>
        </div>
      </div>
    </div>
  );
}
