import { useRef, useState, type DragEvent } from 'react';
import styles from './PhotoPicker.module.css';

interface PhotoPickerProps {
  photo?: string;
  onPick: (dataUrl: string) => void;
  placeholder: string;
  overlay?: boolean;
}

function readAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function PhotoPicker({ photo, onPick, placeholder, overlay = false }: PhotoPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File | null | undefined) => {
    if (!file || !file.type.startsWith('image/')) return;
    const dataUrl = await readAsDataUrl(file);
    onPick(dataUrl);
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  const rootClass = overlay ? styles.overlayRoot : styles.standaloneRoot;

  return (
    <div
      className={`${rootClass} ${dragOver ? styles.dragOver : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        inputRef.current?.click();
      }}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={onDrop}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.input}
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {photo ? (
        <img src={photo} alt="" className={styles.image} />
      ) : overlay ? (
        <div className={styles.overlayPlaceholder}>
          <span className={styles.placeholder}>{placeholder}</span>
        </div>
      ) : (
        <span className={styles.placeholder}>{placeholder}</span>
      )}
    </div>
  );
}
