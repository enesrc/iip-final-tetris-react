import React, { useRef, useEffect } from 'react';
import BlockPlacementSound from '../assets/block-placement-sound.mp3';

// SoundEffect bileşeni için prop türlerini tanımlayın
interface SoundEffectProps {
  volume: number; // Ses seviyesi
  play: boolean; // Sesin çalınıp çalınmayacağını belirten prop
}

// SoundEffect bileşenini tanımlayın
const SoundEffect: React.FC<SoundEffectProps> = ({ volume, play }) => {
  const audioRef = useRef<HTMLAudioElement>(null); // Ses için bir referans oluştur

  // Ses seviyesi veya çalma durumu değiştiğinde çalışacak efekt
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume; // Ses seviyesini ayarla
      if (play) {
        audioRef.current.currentTime = 0; // Sesin başına dön
        audioRef.current.play(); // Sesi çal
      }
    }
  }, [volume, play]); // volume veya play değiştiğinde bu efekti çalıştır

  return <audio ref={audioRef} src={BlockPlacementSound} />; // Ses dosyasını render et
};

export default SoundEffect; // SoundEffect bileşenini dışa aktar