import React, { useEffect, useRef } from 'react';
import backgroundMusic from '../assets/background-music.mp3';

// Music bileşeni için prop türlerini tanımlayın
interface MusicProps {
    isPlaying: boolean; // Müzik çalıyor mu?
    volume: number; // Müzik sesi seviyesi
}

// Music bileşenini tanımlayın
const Music: React.FC<MusicProps> = ({ isPlaying, volume }) => {
    const audioRef = useRef<HTMLAudioElement>(null); // Müzik için bir referans oluştur

    // Oyun durumuna göre müziği oynat veya durdur
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume; // Ses seviyesini ayarla
            if (isPlaying) {
                audioRef.current.play().catch((error) => console.error('Müzik çalma hatası:', error)); // Müzik çal
            } else {
                audioRef.current.pause(); // Müzik durdur
            }
        }
    }, [isPlaying, volume]); // isPlaying veya volume değiştiğinde bu efekti çalıştır

    return (
        <audio ref={audioRef} loop> {/* Müzik dosyasını döngüsel olarak çal */}
            <source src={backgroundMusic} type="audio/mpeg" />
            Tarayıcınız bu müziği çalamıyor.
        </audio>
    );
};

export default Music; // Music bileşenini dışa aktar