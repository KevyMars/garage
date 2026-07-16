import { useGarage } from '../state/GarageContext';
import { useNavigation } from '../state/NavigationContext';
import { HomeHeader } from '../components/HomeHeader';
import { UpcomingRow } from '../components/UpcomingRow';
import { URGENCY_COLOR, URGENCY_LABEL } from '../data/constants';
import type { Urgency, UpcomingItem } from '../types';
import styles from './RemindersScreen.module.css';

interface FlatItem extends UpcomingItem {
  vehicleId: string;
  vehicleName: string;
}

export function RemindersScreen() {
  const { vehicles } = useGarage();
  const nav = useNavigation();

  const grouped: Record<Urgency, FlatItem[]> = { overdue: [], soon: [], upcoming: [] };
  vehicles.forEach((v) => {
    v.upcoming.forEach((u) => {
      grouped[u.urgency].push({ ...u, vehicleId: v.id, vehicleName: v.nickname });
    });
  });

  const sections = (['overdue', 'soon', 'upcoming'] as Urgency[]).filter((k) => grouped[k].length > 0);
  const overdueCount = grouped.overdue.length;

  return (
    <div className="scroll-screen">
      <HomeHeader
        title="Reminders"
        subtitle={overdueCount > 0 ? `${overdueCount} item${overdueCount > 1 ? 's' : ''} overdue` : 'All caught up'}
      />
      <div className={styles.body}>
        {sections.map((key) => (
          <div key={key}>
            <div className={styles.sectionHeading}>
              <span className={styles.dot} style={{ background: URGENCY_COLOR[key] }} />
              <span className={styles.sectionLabel} style={{ color: URGENCY_COLOR[key] }}>
                {URGENCY_LABEL[key]}
              </span>
            </div>
            <div className={styles.items}>
              {grouped[key].map((item) => (
                <UpcomingRow
                  key={item.id}
                  item={item}
                  vehicleName={item.vehicleName}
                  onClick={() => nav.push('vehicleDetail', { vehicleId: item.vehicleId })}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
