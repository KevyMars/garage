import { useRef, useState, type DragEvent } from 'react';
import { fileToResizedDataUrl } from '../utils/image';
import styles from './PhotoPicker.module.css';

interface PhotoPickerProps {
  photo?: string;
  onPick: (dataUrl: string) => void;
  placeholder: string;
}

export function PhotoPicker({ photo, onPick, placeholder }: PhotoPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = async (file: File | null | undefined) => {
    if (!file || !file.type.startsWith('image/')) return;
    try {
      const dataUrl = await fileToResizedDataUrl(file);
      onPick(dataUrl);
    } catch {
      // Leave the existing photo (or placeholder) in place if the image can't be read.
    }
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files?.[0]);
  };

  return (
    <div
      className={`${styles.root} ${dragOver ? styles.dragOver : ''}`}
      onClick={() => inputRef.current?.click()}
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
      {photo ? <img src={photo} alt="" className={styles.image} /> : <span className={styles.placeholder}>{placeholder}</span>}
    </div>
  );
}
