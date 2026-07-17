import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { seedVehicles } from '../data/seed';
import type { ConfirmModalState, HistoryEntry, UpcomingItem, Vehicle, VinDraft } from '../types';

const STORAGE_KEY = 'garage:v1';

interface StoredState {
  vehicles: Vehicle[];
  archived: Vehicle[];
}

function loadInitial(): StoredState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as StoredState;
  } catch {
    // fall through to seed data
  }
  return { vehicles: seedVehicles(), archived: [] };
}

interface GarageContextValue {
  vehicles: Vehicle[];
  archived: Vehicle[];
  toast: string | null;
  confirmModal: ConfirmModalState | null;
  draft: VinDraft | null;
  scanning: boolean;
  showToast: (message: string) => void;
  setDraft: (draft: VinDraft | null) => void;
  setScanning: (scanning: boolean) => void;
  askDelete: (vehicleId: string) => void;
  askEdit: (vehicleId: string) => void;
  closeModal: () => void;
  deleteVehicle: (vehicleId: string) => void;
  restoreVehicle: (vehicleId: string) => void;
  addVehicle: (vehicle: Vehicle) => void;
  setPhoto: (vehicleId: string, photo: string) => void;
  saveEditVehicle: (
    vehicleId: string,
    fields: Partial<Pick<Vehicle, 'nickname' | 'year' | 'make' | 'model' | 'trim' | 'plate' | 'vin' | 'mileage' | 'notes'>>,
    history: HistoryEntry[],
  ) => void;
  logService: (vehicleId: string, entry: HistoryEntry) => void;
}

const GarageContext = createContext<GarageContextValue | null>(null);

export function GarageProvider({ children }: { children: ReactNode }) {
  const initial = useRef(loadInitial());
  const [{ vehicles, archived }, setGarage] = useState<StoredState>(initial.current);
  const [toast, setToast] = useState<string | null>(null);
  const [confirmModal, setConfirmModal] = useState<ConfirmModalState | null>(null);
  const [draft, setDraft] = useState<VinDraft | null>(null);
  const [scanning, setScanning] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ vehicles, archived }));
  }, [vehicles, archived]);

  const showToast = useCallback((message: string) => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast(message);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const askDelete = useCallback((vehicleId: string) => setConfirmModal({ type: 'delete', vehicleId }), []);
  const askEdit = useCallback((vehicleId: string) => setConfirmModal({ type: 'edit', vehicleId }), []);
  const closeModal = useCallback(() => setConfirmModal(null), []);

  const deleteVehicle = useCallback(
    (vehicleId: string) => {
      setGarage((s) => {
        const v = s.vehicles.find((x) => x.id === vehicleId);
        if (!v) return s;
        return { vehicles: s.vehicles.filter((x) => x.id !== vehicleId), archived: [...s.archived, v] };
      });
      setConfirmModal(null);
      showToast('Vehicle moved to archive');
    },
    [showToast],
  );

  const restoreVehicle = useCallback(
    (vehicleId: string) => {
      setGarage((s) => {
        const v = s.archived.find((x) => x.id === vehicleId);
        if (!v) return s;
        return { archived: s.archived.filter((x) => x.id !== vehicleId), vehicles: [...s.vehicles, v] };
      });
      showToast('Vehicle restored');
    },
    [showToast],
  );

  const addVehicle = useCallback((vehicle: Vehicle) => {
    setGarage((s) => ({ ...s, vehicles: [...s.vehicles, vehicle] }));
  }, []);

  const setPhoto = useCallback((vehicleId: string, photo: string) => {
    setGarage((s) => ({ ...s, vehicles: s.vehicles.map((v) => (v.id === vehicleId ? { ...v, photo } : v)) }));
  }, []);

  const saveEditVehicle = useCallback(
    (
      vehicleId: string,
      fields: Partial<
        Pick<Vehicle, 'nickname' | 'year' | 'make' | 'model' | 'trim' | 'plate' | 'vin' | 'mileage' | 'notes'>
      >,
      history: HistoryEntry[],
    ) => {
      setGarage((s) => ({
        ...s,
        vehicles: s.vehicles.map((v) => {
          if (v.id !== vehicleId) return v;
          return {
            ...v,
            ...fields,
            nickname: fields.nickname || v.nickname,
            year: fields.year || v.year,
            make: fields.make || v.make,
            model: fields.model || v.model,
            plate: fields.plate || v.plate,
            vin: fields.vin ? fields.vin.toUpperCase() : v.vin,
            history: history.map((h) => ({
              ...h,
              mileage: Number(h.mileage) || 0,
              cost: typeof h.cost === 'string' && h.cost.startsWith('$') ? h.cost : `$${h.cost || '0'}`,
            })),
          };
        }),
      }));
      showToast('Vehicle updated');
    },
    [showToast],
  );

  const logService = useCallback(
    (vehicleId: string, entry: HistoryEntry) => {
      setGarage((s) => ({
        ...s,
        vehicles: s.vehicles.map((v) => {
          if (v.id !== vehicleId) return v;
          const upcoming: UpcomingItem[] = v.upcoming.filter((u) => u.type !== entry.type);
          return {
            ...v,
            mileage: Math.max(v.mileage, entry.mileage),
            history: [entry, ...v.history],
            upcoming,
          };
        }),
      }));
      showToast('Service logged');
    },
    [showToast],
  );

  const value = useMemo<GarageContextValue>(
    () => ({
      vehicles,
      archived,
      toast,
      confirmModal,
      draft,
      scanning,
      showToast,
      setDraft,
      setScanning,
      askDelete,
      askEdit,
      closeModal,
      deleteVehicle,
      restoreVehicle,
      addVehicle,
      setPhoto,
      saveEditVehicle,
      logService,
    }),
    [
      vehicles,
      archived,
      toast,
      confirmModal,
      draft,
      scanning,
      showToast,
      askDelete,
      askEdit,
      closeModal,
      deleteVehicle,
      restoreVehicle,
      addVehicle,
      setPhoto,
      saveEditVehicle,
      logService,
    ],
  );

  return <GarageContext.Provider value={value}>{children}</GarageContext.Provider>;
}

export function useGarage() {
  const ctx = useContext(GarageContext);
  if (!ctx) throw new Error('useGarage must be used within GarageProvider');
  return ctx;
}
