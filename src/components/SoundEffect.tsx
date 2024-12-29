// filepath: /c:/Users/enesh/Projects/iip-final-tetris-react/src/components/AudioPlayer.tsx
import React, { useRef, useEffect } from 'react';
import BlockPlacementSound from '../assets/block-placement-sound.mp3';

interface SoundEffectProps {
  volume: number;
  play: boolean;
}

const SoundEffect: React.FC<SoundEffectProps> = ({volume, play }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      if (play) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }
  }, [volume, play]);

  return <audio ref={audioRef} src={BlockPlacementSound} />;
};

export default SoundEffect;