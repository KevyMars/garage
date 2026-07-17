import styles from './VehiclePhoto.module.css';

interface VehiclePhotoProps {
  photo?: string;
  isMoto: boolean;
  iconSize?: number;
}

export function VehiclePhoto({ photo, isMoto, iconSize = 48 }: VehiclePhotoProps) {
  return (
    <div className={styles.root}>
      {photo ? (
        <img src={photo} alt="" className={styles.image} />
      ) : (
        <div className={styles.placeholder}>
          <img
            src={isMoto ? '/icons/icon-motorcycle.png' : '/icons/icon-car.png'}
            alt=""
            className={styles.icon}
            style={{ height: iconSize }}
          />
        </div>
      )}
    </div>
  );
}
