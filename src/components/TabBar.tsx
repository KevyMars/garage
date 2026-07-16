import { useNavigation } from '../state/NavigationContext';
import { useGarage } from '../state/GarageContext';
import { GarageTabIcon, LogTabIcon, RemindersTabIcon } from './Icons';
import styles from './TabBar.module.css';

const ACTIVE = '#ff5a1f';
const INACTIVE = 'rgba(242,239,233,0.4)';

export function TabBar() {
  const nav = useNavigation();
  const { vehicles } = useGarage();
  const hasOverdue = vehicles.some((v) => v.upcoming.some((u) => u.urgency === 'overdue'));

  const garageColor = nav.activeTab === 'garage' ? ACTIVE : INACTIVE;
  const remindersColor = nav.activeTab === 'reminders' ? ACTIVE : INACTIVE;
  const logColor = nav.activeTab === 'log' ? ACTIVE : INACTIVE;

  return (
    <div className={styles.bar}>
      <div className={styles.tab} onClick={() => nav.goToTab('garage')}>
        <GarageTabIcon color={garageColor} />
        <span className={styles.label} style={{ color: garageColor }}>
          Garage
        </span>
      </div>
      <div className={styles.tab} onClick={() => nav.goToTab('reminders')}>
        <RemindersTabIcon color={remindersColor} />
        <span className={styles.label} style={{ color: remindersColor }}>
          Reminders
        </span>
        {hasOverdue && <span className={styles.badge} />}
      </div>
      <div className={styles.tab} onClick={() => nav.goToTab('log')}>
        <LogTabIcon color={logColor} />
        <span className={styles.label} style={{ color: logColor }}>
          Log
        </span>
      </div>
    </div>
  );
}
