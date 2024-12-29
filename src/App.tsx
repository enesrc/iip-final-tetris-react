// filepath: /c:/Users/enesh/Projects/iip-final-tetris-react/src/App.tsx
import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import UpcomingBlocks from './components/UpcomingBlocks';
import { useTetris } from './hooks/useTetris';
import videoBg from './assets/27770-365891067.mp4';
import SettingsModal from './components/Settings';
import Music from './components/Music';
import TopScoresModal from './components/TopScores'; // Yeni modal bileşeni

function App() {
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showTopScoresModal, setShowTopScoresModal] = useState(false); // Top Scores modal state
  const [musicKey, setMusicKey] = useState<string>(Date.now().toString());
  const [volume, setVolume] = useState(0.5);
  const [scores, setScores] = useState<{ id: number, name: string, score: number }[]>([]);
  //const [playerName, setPlayerName] = useState<string>('');

  const handleGameOver = () => {
    setShowTopScoresModal(true);
  };

  const { board, startGame, pauseGame, resumeGame, isPlaying, isPaused, score, upcomingBlocks, line, keyBindings, setKeyBindings } = useTetris(handleGameOver);

  useEffect(() => {
    fetch('http://localhost:3001/scores')
      .then(response => response.json())
      .then(data => setScores(data));
  }, []);

  /*const saveScore = (name: string, score: number) => {
    fetch('http://localhost:3001/scores', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, score }),
    })
    .then(response => response.json())
    .then(data => {
      setScores(prevScores => [...prevScores, { id: data.id, name, score }]);
    });
  };*/

  const handleStartGame = () => {
    startGame();
    setMusicKey(Date.now().toString());
  };

  const handleKeyBindingChange = (key: string, value: string) => {
    setKeyBindings((prevBindings) => ({
      ...prevBindings,
      [key]: value,
    }));
  };

  /*const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    saveScore(playerName, score);
    setPlayerName('');
  };*/

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

  return (
    <div className="app">
      <Music key={musicKey} isPlaying={isPlaying && !isPaused} volume={volume} />
      <video src={videoBg} autoPlay loop muted style={{ zIndex: -1, position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover'}}></video>
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

      <TopScoresModal
        show={showTopScoresModal}
        onClose={() => setShowTopScoresModal(false)}
        scores={scores}
      />
    </div>
  );
}

export default App;