import { useEffect, useRef, useState } from 'react';
import type { IScannerControls } from '@zxing/browser';
import { useGarage } from '../state/GarageContext';
import { useNavigation } from '../state/NavigationContext';
import { ScreenHeader } from '../components/ScreenHeader';
import { decodeVin, VinDecodeError } from '../data/vinDecode';
import styles from './ScanIntroScreen.module.css';

const VIN_SUBSTRING = /[A-HJ-NPR-Z0-9]{17}/;
const RESCAN_COOLDOWN_MS = 4000;

function extractVin(raw: string): string | null {
  const cleaned = raw.toUpperCase().replace(/[^A-Z0-9]/g, '');
  return cleaned.match(VIN_SUBSTRING)?.[0] ?? null;
}

export function ScanIntroScreen() {
  const { setScanning, setDraft, showToast } = useGarage();
  const { push } = useNavigation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const busyRef = useRef(false);
  const lastVinRef = useRef<string | null>(null);
  const cooldownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [cameraError, setCameraError] = useState<string | null>(null);
  const [retryToken, setRetryToken] = useState(0);

  useEffect(() => {
    setCameraError(null);
    let cancelled = false;

    // Lazy-loaded: ZXing is a sizeable library and only this screen needs it.
    Promise.all([import('@zxing/browser'), import('@zxing/library')])
      .then(([{ BrowserMultiFormatReader }, { DecodeHintType, BarcodeFormat }]) => {
        if (cancelled) return;

        const hints = new Map();
        hints.set(DecodeHintType.POSSIBLE_FORMATS, [BarcodeFormat.CODE_39]);
        const reader = new BrowserMultiFormatReader(hints);

        return reader.decodeFromConstraints(
          { video: { facingMode: 'environment' } },
          videoRef.current ?? undefined,
          (result, _err, controls) => {
            controlsRef.current = controls;
            if (cancelled || !result || busyRef.current) return;

            const vin = extractVin(result.getText());
            if (!vin || vin === lastVinRef.current) return;

            busyRef.current = true;
            lastVinRef.current = vin;
            setScanning(true);

            decodeVin(vin)
              .then((draft) => {
                controls.stop();
                setScanning(false);
                setDraft(draft);
                push('scanResult');
              })
              .catch((err) => {
                setScanning(false);
                showToast(err instanceof VinDecodeError ? err.message : 'Could not decode that VIN.');
                busyRef.current = false;
                if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
                cooldownTimer.current = setTimeout(() => {
                  lastVinRef.current = null;
                }, RESCAN_COOLDOWN_MS);
              });
          },
        );
      })
      .catch(() => {
        if (!cancelled) {
          setCameraError('Camera unavailable — check that camera access is allowed for this site, or enter the VIN manually.');
        }
      });

    return () => {
      cancelled = true;
      if (cooldownTimer.current) clearTimeout(cooldownTimer.current);
      controlsRef.current?.stop();
      controlsRef.current = null;
    };
  }, [retryToken, setScanning, setDraft, showToast, push]);

  return (
    <div className="scroll-screen">
      <ScreenHeader title="Scan VIN" />
      <div className={styles.body}>
        <div className={styles.frame}>
          {!cameraError && <video ref={videoRef} className={styles.video} muted playsInline />}
          <div className={`${styles.corner} ${styles.cornerTL}`} />
          <div className={`${styles.corner} ${styles.cornerTR}`} />
          <div className={`${styles.corner} ${styles.cornerBL}`} />
          <div className={`${styles.corner} ${styles.cornerBR}`} />
          {!cameraError && <div className={styles.scanLine} />}
          {cameraError && <div className={styles.errorState}>{cameraError}</div>}
        </div>
        <div className={styles.helper}>
          {cameraError ? 'You can still add this vehicle without the camera.' : 'Align the VIN barcode inside the frame'}
        </div>
        {cameraError && (
          <div className={`primary-button ${styles.scanButton}`} onClick={() => setRetryToken((t) => t + 1)}>
            Try Again
          </div>
        )}
        <div className={styles.manualLink} onClick={() => push('manualVin')}>
          Enter VIN manually
        </div>
      </div>
    </div>
  );
}
