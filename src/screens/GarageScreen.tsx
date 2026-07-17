import { useState } from 'react';
import { useGarage } from '../state/GarageContext';
import { useNavigation } from '../state/NavigationContext';
import { HomeHeader } from '../components/HomeHeader';
import { VehicleCard } from '../components/VehicleCard';
import { AddVehicleModal } from '../components/AddVehicleModal';
import { PlusIcon } from '../components/Icons';
import styles from './GarageScreen.module.css';

export function GarageScreen() {
  const { vehicles, archived } = useGarage();
  const nav = useNavigation();
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="scroll-screen">
      <HomeHeader
        title="Garage"
        subtitle={`${vehicles.length} vehicle${vehicles.length === 1 ? '' : 's'}`}
        onAdd={() => setShowAddModal(true)}
      />
      <div className={styles.list}>
        {vehicles.map((v) => (
          <VehicleCard key={v.id} vehicle={v} />
        ))}
        <div className="dashed-row" onClick={() => setShowAddModal(true)}>
          <PlusIcon size={15} color="currentColor" strokeWidth={2.4} />
          Add another vehicle
        </div>
        {archived.length > 0 && (
          <div className={styles.archiveLink} onClick={() => nav.push('archive')}>
            View Archive ({archived.length})
          </div>
        )}
      </div>
      {showAddModal && <AddVehicleModal onClose={() => setShowAddModal(false)} />}
    </div>
  );
}
