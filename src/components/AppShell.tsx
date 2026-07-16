import { useNavigation } from '../state/NavigationContext';
import { TabBar } from './TabBar';
import { ConfirmModal } from './ConfirmModal';
import { Toast } from './Toast';
import { ScanningOverlay } from './ScanningOverlay';
import { GarageScreen } from '../screens/GarageScreen';
import { RemindersScreen } from '../screens/RemindersScreen';
import { ServiceLogScreen } from '../screens/ServiceLogScreen';
import { VehicleDetailScreen } from '../screens/VehicleDetailScreen';
import { ScanIntroScreen } from '../screens/ScanIntroScreen';
import { ConfirmVehicleScreen } from '../screens/ConfirmVehicleScreen';
import { AddManuallyScreen } from '../screens/AddManuallyScreen';
import { VehicleAddedScreen } from '../screens/VehicleAddedScreen';
import { ArchiveScreen } from '../screens/ArchiveScreen';
import { EditVehicleScreen } from '../screens/EditVehicleScreen';
import { AddServiceScreen } from '../screens/AddServiceScreen';
import styles from './AppShell.module.css';

function renderScreen(name: string) {
  switch (name) {
    case 'garage':
      return <GarageScreen />;
    case 'reminders':
      return <RemindersScreen />;
    case 'log':
      return <ServiceLogScreen />;
    case 'vehicleDetail':
      return <VehicleDetailScreen />;
    case 'scanIntro':
      return <ScanIntroScreen />;
    case 'scanResult':
      return <ConfirmVehicleScreen />;
    case 'manualEntry':
      return <AddManuallyScreen />;
    case 'addSuccess':
      return <VehicleAddedScreen />;
    case 'archive':
      return <ArchiveScreen />;
    case 'editVehicle':
      return <EditVehicleScreen />;
    case 'addService':
      return <AddServiceScreen />;
    default:
      return null;
  }
}

export function AppShell() {
  const nav = useNavigation();

  return (
    <div className={styles.shell}>
      <div className={styles.content}>
        {renderScreen(nav.current.name)}
        <ScanningOverlay />
        <Toast />
        <ConfirmModal />
      </div>
      {nav.showTabBar && <TabBar />}
    </div>
  );
}
