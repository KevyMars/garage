import styles from './StatBox.module.css';

export function StatBox({ label, value, mono }: { label: string; value: string | number; mono?: boolean }) {
  return (
    <div className={styles.box}>
      <div className={styles.label}>{label}</div>
      <div className={`${styles.value} ${mono ? styles.mono : ''}`}>{value}</div>
    </div>
  );
}
