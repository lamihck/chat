import { SoundOutlined, StopOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useState } from 'react';

export const SoundButton = ({ defaultValue, onChange }) => {
  const [isMuted, setIsMuted] = useState(defaultValue);

  const handleSoundToggle = () => {
    onChange(!isMuted)
    setIsMuted(!isMuted);
    // ajoutez ici votre propre logique pour activer ou désactiver le son
  };

  return (
    <Button icon={isMuted ? <StopOutlined /> : <SoundOutlined />} onClick={handleSoundToggle}>
      {isMuted ? 'Activer le son' : 'Désactiver le son'}
    </Button>
  );
};

export default SoundButton;
