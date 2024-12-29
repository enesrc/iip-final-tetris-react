// filepath: /c:/Users/enesh/Projects/iip-final-tetris-react/src/components/TopScores.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TopScoresModalProps {
    show: boolean;
    onClose: () => void;
    scores: { id: number, name: string, score: number }[];
}

const TopScoresModal: React.FC<TopScoresModalProps> = ({ show, onClose }) => {
    const [scores, setScores] = useState<{ id: number, name: string, score: number }[]>([]); // Skor listesi
    const [name, setName] = useState(''); // Kullanıcı adı
    const [score, setScore] = useState(''); // Kullanıcı skoru

    // Skorları backend'den al
    useEffect(() => {
        if (show) {
            fetchScores();
        }
    }, [show]);

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

    if (!show) {
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h1 className='title'>En Yüksek Skorlar</h1>
                <div>
                    <table className='top-scores-table'>
                        <tbody>
                            {scores.map((s, index) => (
                                <tr key={s.id}>
                                    <td>{index + 1}.</td>
                                    <td>{s.name}</td>
                                    <td>{s.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default TopScoresModal;