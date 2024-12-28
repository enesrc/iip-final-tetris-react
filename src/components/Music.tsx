import React, { useEffect, useRef } from 'react';
import backgroundMusic from '../assets/background-music.mp3';


interface MusicProps {
    isPlaying: boolean; // isPlaying'in türü boolean
    volume: number;
}

const Music: React.FC<MusicProps> = ({ isPlaying, volume }) => {
    const audioRef = useRef<HTMLAudioElement>(null); // Müzik için bir referans oluştur

    // Oyun durumuna göre müziği oynat veya durdur
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
            if (isPlaying) {
                audioRef.current.play().catch((error) => console.error('Müzik çalma hatası:', error));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, volume]);

    return (
        <audio ref={audioRef} loop>
            <source src={backgroundMusic} type="audio/mpeg" />
            Tarayıcınız bu müziği çalamıyor.
        </audio>
    );
};

export default Music;
