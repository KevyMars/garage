import type { Vehicle } from '../types';

export function seedVehicles(): Vehicle[] {
  return [
    {
      id: 'f150',
      isMoto: false,
      year: 2019,
      make: 'Ford',
      model: 'F-150',
      trim: 'XLT',
      nickname: 'The Hauler',
      vin: '1FTEW1EP5KFA45213',
      plate: '7XKT 291',
      colorA: '#3b4854',
      colorB: '#20272e',
      mileage: 68420,
      history: [
        { id: 'h1', type: 'Oil Change', date: 'Jun 24, 2026', mileage: 68420, cost: '$64', notes: 'Full synthetic 5W-30, filter replaced', ts: 100 },
        { id: 'h2', type: 'Tire Rotation', date: 'Apr 10, 2026', mileage: 65100, cost: '$40', notes: 'Rotated + balanced, tread even', ts: 90 },
        { id: 'h3', type: 'Brake Service', date: 'Jan 15, 2026', mileage: 60200, cost: '$310', notes: 'Front pads + rotors replaced', ts: 80 },
        { id: 'h4', type: 'Battery', date: 'Sep 2, 2025', mileage: 54800, cost: '$189', notes: 'New AGM battery installed', ts: 70 },
      ],
      upcoming: [
        { id: 'u1', type: 'Oil Change', urgency: 'soon', dueLabel: 'Due in 380 mi' },
        { id: 'u2', type: 'Tire Rotation', urgency: 'upcoming', dueLabel: 'Due in 2,100 mi' },
      ],
    },
    {
      id: 'iron883',
      isMoto: true,
      year: 2021,
      make: 'Harley-Davidson',
      model: 'Iron 883',
      trim: '',
      nickname: 'Blackout',
      vin: '1HD1BW419MB061178',
      plate: 'MC 4471',
      colorA: '#4a2a24',
      colorB: '#1c1210',
      mileage: 5230,
      history: [
        { id: 'h5', type: 'Chain Adjustment', date: 'May 30, 2026', mileage: 5100, cost: '$0', notes: 'Tensioned + lubed, DIY', ts: 95 },
        { id: 'h6', type: 'Oil Change', date: 'Feb 18, 2026', mileage: 4200, cost: '$95', notes: 'Synthetic V-Twin blend', ts: 75 },
        { id: 'h7', type: 'Tires', date: 'Oct 5, 2025', mileage: 3100, cost: '$260', notes: 'Rear tire, Dunlop D408', ts: 60 },
      ],
      upcoming: [
        { id: 'u3', type: 'Chain/Belt', urgency: 'overdue', dueLabel: 'Overdue by 210 mi' },
        { id: 'u4', type: 'Inspection', urgency: 'upcoming', dueLabel: 'Due at 6,000 mi' },
      ],
    },
    {
      id: 'wrx',
      isMoto: false,
      year: 2016,
      make: 'Subaru',
      model: 'WRX',
      trim: 'Premium',
      nickname: 'Rally Blue',
      vin: 'JF1VA1J60G9812345',
      plate: 'RALLY16',
      colorA: '#2c4a6b',
      colorB: '#16232f',
      mileage: 81200,
      history: [
        { id: 'h8', type: 'Oil Change', date: 'Jun 30, 2026', mileage: 81200, cost: '$58', notes: '0W-20 full synthetic', ts: 98 },
        { id: 'h9', type: 'Other', date: 'Mar 3, 2026', mileage: 78500, cost: '$620', notes: 'Clutch kit + flywheel resurface', ts: 85 },
        { id: 'h10', type: 'Other', date: 'Nov 12, 2025', mileage: 74000, cost: '$540', notes: 'Timing belt, tensioner, water pump', ts: 65 },
      ],
      upcoming: [{ id: 'u5', type: 'Fluids', urgency: 'soon', dueLabel: 'Brake fluid due in 500 mi' }],
    },
  ];
}
