import React from 'react';

interface ModalProps {
    show: boolean;
    onClose: () => void;
    onContinue: () => void;
    volume: number;
    onVolumeChange: (volume: number) => void;
    keyBindings: { left: string; right: string; down: string; rotate: string };
    onKeyBindingChange: (key: string, value: string) => void;
    isPlaying: boolean;
}

const SettingsModal: React.FC<ModalProps> = ({ show, onClose, onContinue, volume, onVolumeChange, keyBindings, onKeyBindingChange }) => {
    if (!show) return null;

    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onVolumeChange(parseFloat(event.target.value));
    };

    const handleKeyBindingChange = (key: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        onKeyBindingChange(key, event.target.value);
    };


    return (
        <div className="modal-overlay">
            <div className="modal">
                <h1 className='title'>Ayarlar</h1>
                <div>
                    <label htmlFor="volume">Ses Seviyesi: </label>
                    <input
                        type="range"
                        id="volume"
                        name="volume"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={handleVolumeChange}
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
                    <button onClick={onContinue} className="continue-button">Oyuna Devam</button>
                    <button onClick={onClose} className="close-button">Kapat</button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;