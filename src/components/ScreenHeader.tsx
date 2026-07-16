import { BackChevronIcon } from './Icons';
import { useNavigation } from '../state/NavigationContext';
import styles from './ScreenHeader.module.css';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
}

export function ScreenHeader({ title, subtitle }: ScreenHeaderProps) {
  const nav = useNavigation();
  return (
    <div className={styles.header}>
      <button className={styles.backButton} onClick={() => nav.pop()} aria-label="Back">
        <BackChevronIcon />
      </button>
      <div>
        <div className={styles.title}>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
    </div>
  );
}
