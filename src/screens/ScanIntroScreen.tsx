import { useGarage } from '../state/GarageContext';
import { useNavigation } from '../state/NavigationContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { mockDecodeVin } from '../data/vinDecode';
import styles from './ScanIntroScreen.module.css';

const BARS = [
  { width: 2, light: false },
  { width: 4, light: true },
  { width: 2, light: false, height: 70 },
  { width: 3, light: true },
  { width: 2, light: false, height: 55 },
  { width: 5, light: true },
  { width: 2, light: false, height: 80 },
  { width: 2, light: true },
  { width: 3, light: false, height: 60 },
  { width: 2, light: true },
  { width: 4, light: false, height: 90 },
  { width: 2, light: true },
];

export function ScanIntroScreen() {
  const garage = useGarage();
  const nav = useNavigation();

  const startScan = () => {
    garage.setScanning(true);
    mockDecodeVin().then((draft) => {
      garage.setScanning(false);
      garage.setDraft(draft);
      nav.push('scanResult');
    });
  };

  return (
    <div className="scroll-screen">
      <ScreenHeader title="Scan VIN" />
      <div className={styles.body}>
        <div className={styles.frame}>
          <div className={`${styles.corner} ${styles.cornerTL}`} />
          <div className={`${styles.corner} ${styles.cornerTR}`} />
          <div className={`${styles.corner} ${styles.cornerBL}`} />
          <div className={`${styles.corner} ${styles.cornerBR}`} />
          <div className={styles.scanLine} />
          <div className={styles.barcodeWrap}>
            <div className={styles.barcode}>
              {BARS.map((bar, i) => (
                <div
                  key={i}
                  className={`${styles.bar} ${bar.light ? styles.barLight : ''}`}
                  style={{ width: bar.width, height: `${bar.height ?? 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>
        <div className={styles.helper}>Align the VIN plate or barcode inside the frame</div>
        <div className={`primary-button ${styles.scanButton}`} onClick={startScan}>
          Simulate Scan
        </div>
        <div className={styles.manualLink} onClick={() => nav.push('manualEntry')}>
          Enter VIN manually
        </div>
      </div>
    </div>
  );
}
