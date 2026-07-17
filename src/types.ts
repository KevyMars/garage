export type Urgency = 'overdue' | 'soon' | 'upcoming';

export interface HistoryEntry {
  id: string;
  type: string;
  date: string;
  mileage: number;
  cost: string;
  notes: string;
  ts: number;
}

export interface UpcomingItem {
  id: string;
  type: string;
  urgency: Urgency;
  dueLabel: string;
}

export interface Vehicle {
  id: string;
  isMoto: boolean;
  year: string | number;
  make: string;
  model: string;
  trim: string;
  nickname: string;
  vin: string;
  plate: string;
  colorA: string;
  colorB: string;
  mileage: number;
  photo?: string;
  notes?: string;
  history: HistoryEntry[];
  upcoming: UpcomingItem[];
}

export type ScreenName =
  | 'garage'
  | 'reminders'
  | 'log'
  | 'vehicleDetail'
  | 'scanIntro'
  | 'scanResult'
  | 'manualEntry'
  | 'addSuccess'
  | 'archive'
  | 'editVehicle'
  | 'addService';

export interface ScreenParams {
  vehicleId?: string;
  presetType?: string;
}

export interface StackEntry {
  name: ScreenName;
  params: ScreenParams;
}

export type TabName = 'garage' | 'reminders' | 'log';

export interface VinDraft {
  vin: string;
  isMoto: boolean;
  year: number | string;
  make: string;
  model: string;
  trim: string;
  engine: string;
  nickname: string;
  mileage: string;
}

export interface ConfirmModalState {
  type: 'delete' | 'edit';
  vehicleId: string;
}
