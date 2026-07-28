import { useCountdown } from '../hooks/useCountdown';

interface Props {
  /** 'light' = dark text on light bg (homepage teaser), 'dark' = gold/cream on dark bg (retreat page) */
  variant?: 'light' | 'dark';
  className?: string;
  /** Optional: pin to a specific cohort date instead of the next upcoming one */
  cohortDate?: Date;
  cohortLabel?: string;
}

function pad(n: number) {
  return String(n).padStart(2, '0');
}

export function RetreatCountdown({ variant = 'light', className, cohortDate, cohortLabel }: Props) {
  const { label, days, hours, minutes, seconds, active } = useCountdown(cohortDate, cohortLabel);
  if (!active) return null;

  const isDark = variant === 'dark';

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: 8,
  };

  const eyebrowStyle: React.CSSProperties = isDark
    ? {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '0.65rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: '#e2c15c',
      }
    : {
        fontSize: '0.65rem',
        fontWeight: 700,
        letterSpacing: '0.2em',
        textTransform: 'uppercase' as const,
        color: 'hsl(var(--primary))',
      };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    gap: isDark ? 6 : 4,
    alignItems: 'flex-end',
  };

  const unitWrapStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 2,
  };

  const digitStyle: React.CSSProperties = isDark
    ? {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '1.6rem',
        fontWeight: 500,
        lineHeight: 1,
        color: '#f3ecdd',
        background: 'rgba(243,236,221,0.05)',
        border: '1px solid rgba(243,236,221,0.12)',
        padding: '8px 10px',
        minWidth: 52,
        textAlign: 'center' as const,
      }
    : {
        fontVariantNumeric: 'tabular-nums',
        fontSize: '1.4rem',
        fontWeight: 700,
        lineHeight: 1,
        color: 'hsl(var(--foreground))',
        background: 'hsl(var(--card))',
        border: '1px solid hsl(var(--border))',
        padding: '6px 8px',
        minWidth: 44,
        textAlign: 'center' as const,
      };

  const labelStyle: React.CSSProperties = isDark
    ? {
        fontFamily: "'IBM Plex Mono', monospace",
        fontSize: '0.55rem',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#a79c87',
      }
    : {
        fontSize: '0.55rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase' as const,
        color: 'hsl(var(--muted-foreground))',
      };

  const sepStyle: React.CSSProperties = isDark
    ? { fontSize: '1.2rem', color: '#c9a227', lineHeight: 1, paddingBottom: 10 }
    : { fontSize: '1.1rem', color: 'hsl(var(--primary))', lineHeight: 1, paddingBottom: 8 };

  return (
    <div style={containerStyle} className={className} aria-label={`${label} starts in ${days} days, ${hours} hours, ${minutes} minutes`}>
      <div style={eyebrowStyle}>{label} starts in</div>
      <div style={rowStyle}>
        {[
          { value: days,    unit: 'days' },
          { value: hours,   unit: 'hrs' },
          { value: minutes, unit: 'min' },
          { value: seconds, unit: 'sec' },
        ].map(({ value, unit }, i) => (
          <div key={unit} style={{ display: 'flex', alignItems: 'flex-end', gap: isDark ? 6 : 4 }}>
            {i > 0 && <span style={sepStyle}>:</span>}
            <div style={unitWrapStyle}>
              <div style={digitStyle}>{pad(value)}</div>
              <div style={labelStyle}>{unit}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
