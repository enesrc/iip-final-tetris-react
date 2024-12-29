import React from 'react';

// SettingsModal bileşeni için prop türlerini tanımlayın
interface ModalProps {
    show: boolean; // Modal'ın gösterilip gösterilmeyeceğini belirten prop
    onClose: () => void; // Modal'ı kapatmak için kullanılacak fonksiyon
    onContinue: () => void; // Oyuna devam etmek için kullanılacak fonksiyon
    musicVolume: number; // Müzik sesi seviyesi
    onMusicVolumeChange: (musicVolume: number) => void; // Müzik sesi seviyesini değiştirmek için kullanılacak fonksiyon
    soundEffectVolume: number; // Ses efekti seviyesi
    onSoundEffectVolumeChange: (soundEffectVolume: number) => void; // Ses efekti seviyesini değiştirmek için kullanılacak fonksiyon
    keyBindings: { left: string; right: string; down: string; rotate: string }; // Tuş atamaları
    onKeyBindingChange: (key: string, value: string) => void; // Tuş atamalarını değiştirmek için kullanılacak fonksiyon
    isPlaying: boolean; // Oyun oynanıyor mu?
}

// SettingsModal bileşenini tanımlayın
const SettingsModal: React.FC<ModalProps> = ({ show, onClose, onContinue, musicVolume, onMusicVolumeChange, soundEffectVolume, onSoundEffectVolumeChange, keyBindings, onKeyBindingChange }) => {
    if (!show) return null; // Modal gösterilmeyecekse null döndür

    // Müzik sesi seviyesini değiştirmek için kullanılan fonksiyon
    const handleMusicVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onMusicVolumeChange(parseFloat(event.target.value));
    };

    // Ses efekti seviyesini değiştirmek için kullanılan fonksiyon
    const handleSoundEffectVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSoundEffectVolumeChange(parseFloat(event.target.value));
    };

    // Tuş atamalarını değiştirmek için kullanılan fonksiyon
    const handleKeyBindingChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        onKeyBindingChange(key, event.target.value);
    };

    return (
        <div className="modal-overlay">
            <div className="modal">
                <h1 className='title'>Ayarlar</h1>
                <div>
                    <label htmlFor="volume">Müzik Seviyesi: </label>
                    <input
                        type="range"
                        id="volume"
                        name="volume"
                        min="0"
                        max="1"
                        step="0.01"
                        value={musicVolume}
                        onChange={handleMusicVolumeChange}
                    />
                </div>
                <div>
                    <label htmlFor="volume">Ses Efekti Seviyesi: </label>
                    <input
                        type="range"
                        id="volume"
                        name="volume"
                        min="0"
                        max="1"
                        step="0.01"
                        value={soundEffectVolume}
                        onChange={handleSoundEffectVolumeChange}
                    />
                </div>
                <div>
                    <label htmlFor="left">Sol: </label>
                    <input
                        type="text"
                        id="left"
                        name="left"
                        value={keyBindings.left}
                        onChange={handleKeyBindingChange('left')}
                    />
                </div>
                <div>
                    <label htmlFor="right">Sağ: </label>
                    <input
                        type="text"
                        id="right"
                        name="right"
                        value={keyBindings.right}
                        onChange={handleKeyBindingChange('right')}
                    />
                </div>
                <div>
                    <label htmlFor="down">Aşağı: </label>
                    <input
                        type="text"
                        id="down"
                        name="down"
                        value={keyBindings.down}
                        onChange={handleKeyBindingChange('down')}
                    />
                </div>
                <div>
                    <label htmlFor="rotate">Döndür: </label>
                    <input
                        type="text"
                        id="rotate"
                        name="rotate"
                        value={keyBindings.rotate}
                        onChange={handleKeyBindingChange('rotate')}
                    />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <button onClick={onContinue} className="continue-button">Oyuna Devam</button> {/* Oyuna devam etmek için buton */}
                    <button onClick={onClose} className="close-button">Kapat</button> {/* Modal'ı kapatmak için buton */}
                </div>
            </div>
        </div>
    );
};

export default SettingsModal; // SettingsModal bileşenini dışa aktar