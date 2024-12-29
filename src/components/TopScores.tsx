// filepath: /c:/Users/enesh/Projects/iip-final-tetris-react/src/components/TopScores.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface TopScoresModalProps {
    show: boolean;
    onClose: () => void;
    startGame: () => void;
}

const TopScoresModal: React.FC<TopScoresModalProps> = ({ show, onClose, startGame }) => {
    const [scores, setScores] = useState<{ id: number, name: string, score: number }[]>([]); // Skor listesi

    // Skorları backend'den al
    useEffect(() => {
        fetchScores();
    }, [show]);

    const fetchScores = async () => {
        try {
            const response = await axios.get('http://localhost:3001/scores');
            setScores(response.data);
        } catch (error) {
            console.error('Skorları alırken hata oluştu:', error);
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
                                    <td style={{color:"red"}}>{index + 1}.</td>
                                    <td style={{color:"yellow"}}>{s.name}</td>
                                    <td>{s.score}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    <button className='close-button' style={{ backgroundColor:"red" }} onClick={onClose}>Kapat</button>
                    <button className='close-button' style={{ backgroundColor:"blue" }} onClick={startGame}>Yeniden Oyna</button>
                </div>
            </div>
        </div>
    );
};

export default TopScoresModal;