import { useGarage } from '../state/GarageContext';
import { useNavigation } from '../state/NavigationContext';
import styles from './ConfirmModal.module.css';

export function ConfirmModal() {
  const garage = useGarage();
  const nav = useNavigation();
  const { confirmModal, vehicles, archived } = garage;

  if (!confirmModal) return null;

  const vehicle =
    confirmModal.type === 'deleteArchived'
      ? archived.find((v) => v.id === confirmModal.vehicleId)
      : vehicles.find((v) => v.id === confirmModal.vehicleId);

  let title = '';
  let body = '';
  let confirmLabel = '';
  let confirmBg = '#ff5a1f';
  let stacked = false;
  let onConfirm = () => {};

  if (confirmModal.type === 'delete') {
    title = 'Delete vehicle?';
    body = `${vehicle ? vehicle.nickname : 'This vehicle'} will be moved to the Archive. You can restore it later.`;
    confirmLabel = 'Delete';
    confirmBg = '#ef4444';
    onConfirm = () => {
      garage.deleteVehicle(confirmModal.vehicleId);
      nav.resetToGarage();
    };
  } else if (confirmModal.type === 'edit') {
    title = 'Edit vehicle?';
    body = "You'll be able to update the photo, details, mileage, and service history.";
    confirmLabel = 'Continue';
    confirmBg = '#ff5a1f';
    onConfirm = () => {
      garage.closeModal();
      nav.push('editVehicle', { vehicleId: confirmModal.vehicleId });
    };
  } else if (confirmModal.type === 'deleteArchived') {
    title = 'Delete';
    body = 'Are you sure?';
    confirmLabel = 'Delete';
    confirmBg = '#ef4444';
    stacked = true;
    onConfirm = () => {
      garage.deleteArchivedVehicle(confirmModal.vehicleId);
    };
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.card}>
        <div className={styles.title}>{title}</div>
        <div className={styles.body}>{body}</div>
        {stacked ? (
          <div className={styles.stackedActions}>
            <div className={styles.stackedButton} style={{ background: confirmBg }} onClick={onConfirm}>
              {confirmLabel}
            </div>
            <div className={styles.cancelLink} onClick={() => garage.closeModal()}>
              Cancel
            </div>
          </div>
        ) : (
          <div className={styles.actions}>
            <div className={`${styles.button} ${styles.cancel}`} onClick={() => garage.closeModal()}>
              Cancel
            </div>
            <div className={styles.button} style={{ background: confirmBg }} onClick={onConfirm}>
              {confirmLabel}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
