import { useNavigation } from '../state/NavigationContext';
import { ChevronRightIcon } from './Icons';
import type { ScreenName } from '../types';
import styles from './AddVehicleModal.module.css';

interface AddVehicleModalProps {
  onClose: () => void;
}

const OPTIONS: { screen: ScreenName; label: string; subtitle: string }[] = [
  { screen: 'scanIntro', label: 'Scan VIN', subtitle: 'Use your camera to scan the VIN plate or barcode' },
  { screen: 'manualVin', label: 'Enter VIN Manually', subtitle: 'Type in a VIN to decode the vehicle details' },
  { screen: 'manualEntry', label: 'Add Without VIN', subtitle: 'Enter details yourself — add the VIN later' },
];

export function AddVehicleModal({ onClose }: AddVehicleModalProps) {
  const nav = useNavigation();

  const choose = (screen: ScreenName) => {
    onClose();
    nav.push(screen);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.title}>Add a Vehicle</div>
        <div className={styles.body}>How would you like to add it?</div>
        <div className={styles.options}>
          {OPTIONS.map((opt) => (
            <div key={opt.screen} className={styles.option} onClick={() => choose(opt.screen)}>
              <div>
                <div className={styles.optionLabel}>{opt.label}</div>
                <div className={styles.optionSubtitle}>{opt.subtitle}</div>
              </div>
              <ChevronRightIcon />
            </div>
          ))}
        </div>
        <div className={styles.cancel} onClick={onClose}>
          Cancel
        </div>
      </div>
    </div>
  );
}
