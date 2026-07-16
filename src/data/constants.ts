import type { Urgency } from '../types';

export const URGENCY_COLOR: Record<Urgency, string> = {
  overdue: '#ef4444',
  soon: '#ffb020',
  upcoming: 'rgba(242,239,233,0.35)',
};

export const URGENCY_LABEL: Record<Urgency, string> = {
  overdue: 'Overdue',
  soon: 'Due Soon',
  upcoming: 'Upcoming',
};

export const URGENCY_ORDER: Record<Urgency, number> = {
  overdue: 0,
  soon: 1,
  upcoming: 2,
};

export const SERVICE_TYPES = ['Oil Change', 'Tires', 'Brakes', 'Battery', 'Chain/Belt', 'Fluids', 'Inspection', 'Other'];

export const CAR_GRADIENT: [string, string] = ['#3b4854', '#20272e'];
export const MOTO_GRADIENT: [string, string] = ['#4a2a24', '#1c1210'];

export function fmtMi(n: number): string {
  return `${n.toLocaleString()} mi`;
}

export function vehicleSubtitle(v: { year: string | number; make: string; model: string; trim: string }): string {
  return `${v.year} ${v.make} ${v.model}${v.trim ? ' ' + v.trim : ''}`;
}
