import { useEffect } from 'react';

interface SoundManagerProps {
  playWinSound: boolean;
  onWinSoundComplete: () => void;
}

export default function SoundManager({ playWinSound, onWinSoundComplete }: SoundManagerProps) {
  useEffect(() => {
    if (playWinSound) {
      // Create win sound using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playWinSequence = () => {
        // Victory fanfare sequence
        const frequencies = [523, 659, 784, 1047]; // C, E, G, C (one octave higher)
        let delay = 0;
        
        frequencies.forEach((freq, index) => {
          setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
            oscillator.type = 'triangle';
            
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.1);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
            
            if (index === frequencies.length - 1) {
              setTimeout(onWinSoundComplete, 500);
            }
          }, delay);
          delay += 200;
        });
      };
      
      playWinSequence();
    }
  }, [playWinSound, onWinSoundComplete]);

  return null;
}