import type { ReactNode } from 'react';
import { PlusIcon } from './Icons';
import styles from './HomeHeader.module.css';

interface HomeHeaderProps {
  title: string;
  subtitle: string;
  onAdd?: () => void;
  right?: ReactNode;
}

export function HomeHeader({ title, subtitle, onAdd, right }: HomeHeaderProps) {
  return (
    <div className={styles.header}>
      <div>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      {onAdd && (
        <button className={styles.addButton} onClick={onAdd} aria-label="Add vehicle">
          <PlusIcon />
        </button>
      )}
      {right}
    </div>
  );
}
