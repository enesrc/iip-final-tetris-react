import React, { useState } from 'react';
import axios from 'axios';

interface SaveScoreModalProps {
    show: boolean;
    onClose: () => void;
    score: number;
}

const SaveScoreModal: React.FC<SaveScoreModalProps> = ({ show, onClose, score }) => {
    const [name, setName] = useState(''); // Kullanıcı adı

    // Yeni bir skor ekle
    const addScore = async () => {
        if (!name || !score) {
            alert('Lütfen adınızı girin.');
            return;
        }
        try {
            await axios.post('http://localhost:3001/scores', { name, score });
            setName('');
            onClose(); // Modal'ı kapat
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
                <h1 className="title">{score} puan yaptın!</h1>
                <p>Çok yüksek bir skor yaptın. Kayıtlara geçmesini ister misin?</p>
                <p style={{color:"red"}}>Adını gir ve skoru kaydet</p>
                <p style={{color:"yellow"}}>Instagram adınızı yazmanız önerilir.</p>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', borderBottom: '5px solid white', paddingBottom: '1rem' }}>
                    <input
                        className='show-input'
                        style={{ width: '150px', backgroundColor: 'white', border: 'none',fontFamily: 'monospace', fontSize: '1.1rem', textAlign: 'center' }}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        maxLength={15}
                        required
                    />
                    <button className='scoreSaveButton' onClick={addScore}>Kaydet</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <button className='scoreSaveButton' style={{ backgroundColor:"red" }} onClick={onClose}>Gerek Yok</button>
                </div>
            </div>
        </div>
    );
};

export default SaveScoreModal;