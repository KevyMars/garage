interface IconProps {
  size?: number;
  color?: string;
}

export function ClockIcon({ size = 14, color = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" />
      <path d="M12 7v5l3 2" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronRightIcon({ size = 8, color = '#f2efe9', opacity = 0.35 }: IconProps & { opacity?: number }) {
  return (
    <svg width={size} height={size * 1.75} viewBox="0 0 8 14" style={{ opacity }}>
      <path d="M1 1l6 6-6 6" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function BackChevronIcon({ size = 9, color = '#f2efe9' }: IconProps) {
  return (
    <svg width={size} height={size * 1.55} viewBox="0 0 8 14">
      <path d="M7 1L1 7l6 6" stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusIcon({ size = 18, color = '#121316', strokeWidth = 2.6 }: IconProps & { strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 4v16M4 12h16" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" />
    </svg>
  );
}

export function WrenchIcon({ size = 16, color = '#ff5a1f' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M14.7 6.3a4 4 0 0 0-5.4 4.6L3 17.2V21h3.8l6.3-6.3a4 4 0 0 0 4.6-5.4l-2.5 2.5-2.1-2.1 2.5-2.5Z"
        stroke={color}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CheckIcon({ size = 38, color = '#35c46a' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M5 13l4.5 4.5L19 8" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function TrashIcon({ size = 14, color = '#ef4444' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function GarageTabIcon({ size = 22, color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M3 11.5 12 4l9 7.5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 10v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 20v-5h6v5" stroke={color} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

export function RemindersTabIcon({ size = 22, color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6.5H4c0.5-1 2-2.5 2-6.5Z" stroke={color} strokeWidth="2" strokeLinejoin="round" />
      <path d="M10 19a2 2 0 0 0 4 0" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function LogTabIcon({ size = 22, color }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <rect x="6" y="4" width="12" height="17" rx="2" stroke={color} strokeWidth="2" />
      <path d="M9 3.5h6v2H9z" fill={color} />
      <path d="M9 11h6M9 15h6M9 19h3" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
