import { useState } from 'react';
import Board from './components/Board';
import UpcomingBlocks from './components/UpcomingBlocks';
import { useTetris } from './hooks/useTetris';
import videoBg from './assets/27770-365891067.mp4';
import SettingsModal from './components/Settings';
import Music from './components/Music';
import SoundEffect from './components/SoundEffect';
import TopScoresModal from './components/TopScores'; 
import SaveScoreModal from './components/SaveScore'; 
import axios from 'axios';

function App() {
  const [showSettingsModal, setShowSettingsModal] = useState(false); // Ayarlar modal'ının gösterilip gösterilmeyeceğini belirten state
  const [showTopScoresModal, setShowTopScoresModal] = useState(false); // En yüksek skorlar modal'ının gösterilip gösterilmeyeceğini belirten state
  const [ShowSaveScoreModal, setShowSaveScoreModal] = useState(false); // Skor kaydetme modal'ının gösterilip gösterilmeyeceğini belirten state
  const [musicKey, setMusicKey] = useState<string>(Date.now().toString()); // Müzik bileşenini yeniden başlatmak için kullanılan key
  const [musicVolume, setMusicVolume] = useState(0.2); // Müzik sesi seviyesi state'i
  const [soundEffectVolume, setSoundEffectVolume] = useState(0.5); // Ses efekti seviyesi state'i

  // 10. sıradaki skoru backend'den al
  const fetch10thScore = async () => {
    try {
      const response = await axios.get('http://localhost:3001/tenthscore');
      if (response.data.length > 0) {
        return response.data[0].score;
      }
      return 0;
    } catch (error) {
      console.error('Skorları alırken hata oluştu:', error);
      return 0;
    }
  };

  // Oyun bittiğinde yapılacak işlemler
  const handleGameOver = async () => {
    const fetchedTenthScore = await fetch10thScore();
    if (score > fetchedTenthScore) {
      setShowSaveScoreModal(true);
    } else {
      setShowTopScoresModal(true);
    }
  };

  // useTetris hook'unu kullanarak oyun durumunu yönetin
  const { board, startGame, pauseGame, resumeGame, isPlaying, isPaused, score, upcomingBlocks, line, keyBindings, setKeyBindings, playSoundEffect } = useTetris(handleGameOver);

  // Oyunu başlatma işlemi
  const handleStartGame = () => {
    startGame();
    setMusicKey(Date.now().toString());
    setShowTopScoresModal(false);
    setShowSaveScoreModal(false);
    setShowSettingsModal(false);
  };

  // Tuş atamalarını değiştirme işlemi
  const handleKeyBindingChange = (key: string, value: string) => {
    setKeyBindings((prevBindings) => ({
      ...prevBindings,
      [key]: value,
    }));
  };

  // Ayarlar modal'ını açma işlemi
  const openModal = () => {
    setShowSettingsModal(true);
    if (isPlaying && !isPaused) {
      pauseGame();
    }
  };

  // Ayarlar modal'ını kapatıp oyuna devam etme işlemi
  const closeModalAndContinue = () => {
    setShowSettingsModal(false);
    if (isPlaying && isPaused) {
      resumeGame();
    }
  };

  // Ayarlar modal'ını kapatma işlemi
  const closeModal = () => {
    setShowSettingsModal(false);
    if (isPlaying && isPaused) {
      pauseGame();
    }
  };

  return (
    <div className="app">
      <Music key={musicKey} isPlaying={isPlaying && !isPaused} volume={musicVolume} /> {/* Müzik bileşeni */}
      <SoundEffect volume={soundEffectVolume} play={playSoundEffect} /> {/* Ses efekti bileşeni */}

      <video src={videoBg} autoPlay loop muted style={{ zIndex: -1, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}></video> {/* Arka plan videosu */}
      <h1 style={{ margin: "5px 0" }}>Tetris</h1>
      <Board currentBoard={board} /> {/* Oyun tahtası bileşeni */}

      <div className="controls">
        <div className="live-score-area">
          <div>
            <h1 className='show-label'>Skor</h1>
            <div className='show-input'>{score}</div>
          </div>

          <div>
            <h1 className='show-label'>Satır</h1>
            <div className='show-input'>{line}</div>
          </div>
        </div>

        <div style={{ width: "114px", display: 'flex', justifyContent: 'center', padding: '10px' }}>
          {!isPlaying && <button className='startButton' onClick={handleStartGame}>Oyna</button>} {/* Oyun başlatma butonu */}
          {isPlaying && !isPaused && <button className='pauseButton' onClick={pauseGame}>Durdur</button>} {/* Oyun durdurma butonu */}
          {isPlaying && isPaused && <button className='continueButton' onClick={resumeGame}>Devam</button>} {/* Oyun devam ettirme butonu */}
        </div>
      </div>

      <div className='upcoming-area'>
        {isPlaying ? (
          <UpcomingBlocks upcomingBlocks={upcomingBlocks} /> 
        ) : (
          <div></div>
        )}

        <button className='settingsButton' onClick={openModal}>Ayarlar</button> {/* Ayarlar butonu */}
      </div>

      <SettingsModal
        show={showSettingsModal}
        onClose={closeModal}
        onContinue={closeModalAndContinue}
        musicVolume={musicVolume}
        onMusicVolumeChange={setMusicVolume}
        soundEffectVolume={soundEffectVolume}
        onSoundEffectVolumeChange={setSoundEffectVolume}
        keyBindings={keyBindings}
        onKeyBindingChange={handleKeyBindingChange}
        isPlaying={isPlaying}
      /> {/* Ayarlar modal'ı bileşeni */}
      <SaveScoreModal
        show={ShowSaveScoreModal}
        onClose={() => {setShowSaveScoreModal(false); setShowTopScoresModal(true);}}
        score={score}
      /> {/* Skor kaydetme modal'ı bileşeni */}

      <TopScoresModal
        show={showTopScoresModal}
        onClose={() => setShowTopScoresModal(false)}
        startGame={handleStartGame}
      /> {/* En yüksek skorlar modal'ı bileşeni */}
    </div>
  );
}

export default App; // App bileşenini dışa aktar