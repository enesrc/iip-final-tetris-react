import Board from './components/Board';
import UpcomingBlocks from './components/UpcomingBlocks';
import { useTetris } from './hooks/useTetris';
import videoBg from './assets/27770-365891067.mp4';
import SettingsModal from './components/Settings';
import { useState } from 'react';
import Music from './components/Music'; 

function App() {
  const { board, startGame, pauseGame, resumeGame, isPlaying, isPaused, score, upcomingBlocks, line, keyBindings, setKeyBindings } = useTetris();
  const [showSettingsModal, setShowSettingsModal] = useState(false); // Modal görünürlüğü için state
  const [musicKey, setMusicKey] = useState<string>(Date.now().toString());
  const [volume, setVolume] = useState(0.5);
  
  const openModal = () => {
    setShowSettingsModal(true);
    if (isPlaying && !isPaused) {
      pauseGame();
    }
  };
  const closeModalAndContinue = () => {
    setShowSettingsModal(false);
    if (isPlaying && isPaused) {
      resumeGame();
    }
  };
  const closeModal = () => {
    setShowSettingsModal(false);
    if (isPlaying && isPaused) {
      pauseGame();
    }
  };
  const handleStartGame = () => {
    startGame();
    setMusicKey(Date.now().toString()); // Music bileşenini yeniden oluşturmak için key'i güncelle
  };
  const handleKeyBindingChange = (key: string, value: string) => {
    setKeyBindings((prevBindings) => ({
      ...prevBindings,
      [key]: value,
    }));
  };

  return (
    <div className="app">
      <Music key={musicKey} isPlaying={isPlaying && !isPaused} volume={volume} />

      <video src={videoBg} autoPlay loop muted style={{ zIndex: -1, position: 'absolute', width: '100%' }}></video>
      <h1 style={{margin: "5px 0"}}>Tetris</h1>
      <Board currentBoard={board} />

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
          {!isPlaying && <button className='startButton' onClick={handleStartGame}>Oyna</button>}
          {isPlaying && !isPaused && <button className='pauseButton' onClick={pauseGame}>Durdur</button>}
          {isPlaying && isPaused && <button className='continueButton' onClick={resumeGame}>Devam</button>}
        </div>
      </div>

      <div className='upcoming-area'>
        {isPlaying ? (
          <UpcomingBlocks upcomingBlocks={upcomingBlocks} />
        ) : (
          <div></div>
        )}

        <button className='settingsButton' onClick={openModal}>Ayarlar</button>
      </div>

      <SettingsModal
        show={showSettingsModal}
        onClose={closeModal}
        onContinue={closeModalAndContinue}
        volume={volume}
        onVolumeChange={setVolume}
        keyBindings={keyBindings}
        onKeyBindingChange={handleKeyBindingChange}
        isPlaying={isPlaying}
      />
    </div>
  );
}
  
export default App;
