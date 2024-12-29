import React, { useState } from 'react';
import axios from 'axios';

// SaveScoreModal bileşeni için prop türleri
interface SaveScoreModalProps {
    show: boolean; // Modal'ın gösterilip gösterilmeyeceğini belirten prop
    onClose: () => void; // Modal'ı kapatmak için kullanılacak fonksiyon
    score: number; // Kullanıcının yaptığı skor
}

// SaveScoreModal bileşeni
const SaveScoreModal: React.FC<SaveScoreModalProps> = ({ show, onClose, score }) => {
    const [name, setName] = useState(''); // Kullanıcı adı için state

    // Yeni bir skor ekle
    const addScore = async () => {
        if (!name || !score) { // Kullanıcı adı veya skor boşsa uyarı ver
            alert('Lütfen adınızı girin.');
            return;
        }
        try {
            await axios.post('http://localhost:3001/scores', { name, score }); // Skoru sunucuya gönder
            setName(''); // Kullanıcı adını sıfırla
            onClose(); // Modal'ı kapat
        } catch (error) {
            console.error('Skor eklerken hata oluştu:', error); // Hata durumunda konsola yazdır
        }
    };

    if (!show) { // Modal gösterilmeyecekse null döndür
        return null;
    }

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h1 className="title">{score} puan yaptın!</h1> {/* Kullanıcının yaptığı skoru göster */}
                <p>Çok yüksek bir skor yaptın. Kayıtlara geçmesini ister misin?</p>
                <p style={{color:"red"}}>Adını gir ve skoru kaydet</p>
                <p style={{color:"yellow"}}>Instagram adınızı yazmanız önerilir.</p>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', borderBottom: '5px solid white', paddingBottom: '1rem' }}>
                    <input
                        className='show-input'
                        style={{ width: '150px', backgroundColor: 'white', border: 'none',fontFamily: 'monospace', fontSize: '1.1rem', textAlign: 'center' }}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)} // Kullanıcı adı değiştiğinde state'i güncelle
                        maxLength={15} // Maksimum 15 karakter
                        required
                    />
                    <button className='scoreSaveButton' onClick={addScore}>Kaydet</button> {/* Skoru kaydetmek için buton */}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <button className='scoreSaveButton' style={{ backgroundColor:"red" }} onClick={onClose}>Gerek Yok</button> {/* Modal'ı kapatmak için buton */}
                </div>
            </div>
        </div>
    );
};

export default SaveScoreModal;