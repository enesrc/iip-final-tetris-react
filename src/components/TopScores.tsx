import React, { useEffect, useState } from 'react';
import axios from 'axios';

// TopScoresModal bileşeni için prop türlerini tanımlayın
interface TopScoresModalProps {
    show: boolean; // Modal'ın gösterilip gösterilmeyeceğini belirten prop
    onClose: () => void; // Modal'ı kapatmak için kullanılacak fonksiyon
    startGame: () => void; // Oyunu yeniden başlatmak için kullanılacak fonksiyon
}

// TopScoresModal bileşenini tanımlayın
const TopScoresModal: React.FC<TopScoresModalProps> = ({ show, onClose, startGame }) => {
    const [scores, setScores] = useState<{ id: number, name: string, score: number }[]>([]); // Skor listesi

    // Skorları backend'den al
    useEffect(() => {
        fetchScores();
    }, [show]);

    // Skorları backend'den almak için kullanılan fonksiyon
    const fetchScores = async () => {
        try {
            const response = await axios.get('http://localhost:3001/scores');
            setScores(response.data);
        } catch (error) {
            console.error('Skorları alırken hata oluştu:', error);
        }
    };

    if (!show) {
        return null; // Modal gösterilmeyecekse null döndür
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
                    <button className='close-button' style={{ backgroundColor:"red" }} onClick={onClose}>Kapat</button> {/* Modal'ı kapatmak için buton */}
                    <button className='close-button' style={{ backgroundColor:"blue" }} onClick={startGame}>Yeniden Oyna</button> {/* Oyunu yeniden başlatmak için buton */}
                </div>
            </div>
        </div>
    );
};

export default TopScoresModal; // TopScoresModal bileşenini dışa aktar