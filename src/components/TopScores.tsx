import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TopScoresModalProps {
  show: boolean;
  onClose: () => void;
  scores: { id: number, name: string, score: number }[];
}

const TopScoresModal: React.FC<TopScoresModalProps> = ({ show, onClose }) => {
  if (!show) {
    return null;
  }

  const [scores, setScores] = useState([]); // Skor listesi
  const [name, setName] = useState(''); // Kullanıcı adı
  const [score, setScore] = useState(''); // Kullanıcı skoru

  // Skorları backend'den al
  useEffect(() => {
    fetchScores();
  }, []);

  const fetchScores = async () => {
    try {
      const response = await axios.get('http://localhost:3001/scores');
      setScores(response.data);
    } catch (error) {
      console.error('Skorları alırken hata oluştu:', error);
    }
  };

  // Yeni bir skor ekle
  const addScore = async () => {
    if (!name || !score) {
      alert('Lütfen adınızı ve skorunuzu girin.');
      return;
    }
    try {
      await axios.post('http://localhost:3001/scores', { name, score: parseInt(score, 10) });
      setName('');
      setScore('');
      fetchScores(); // Skor listesini güncelle
    } catch (error) {
      console.error('Skor eklerken hata oluştu:', error);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
            <h1>Top Scores</h1>
            <ul>
                {scores.map((s:any) => (
                <li key={s.id}>
                    {s.name}: {s.score}
                </li>
                ))}
            </ul>
      </div>
    </div>
  );
};

export default TopScoresModal;