import React, { useState, useEffect } from 'react';
import { Zap, Crown, Gem, Star, DollarSign } from 'lucide-react';

interface SlotMachineProps {
  onWin: () => void;
  isSpinning: boolean;
}

const symbols = [
  { icon: Crown, color: 'text-yellow-400', name: 'crown' },
  { icon: Gem, color: 'text-purple-400', name: 'gem' },
  { icon: Star, color: 'text-blue-400', name: 'star' },
  { icon: Zap, color: 'text-red-400', name: 'zap' },
  { icon: DollarSign, color: 'text-green-400', name: 'dollar' },
];

const goldenSymbol = { icon: Crown, color: 'text-yellow-300', name: 'golden' };

export default function SlotMachine({ onWin, isSpinning }: SlotMachineProps) {
  const [reels, setReels] = useState([0, 1, 2]);
  const [showGolden, setShowGolden] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      setShowGolden(false);
      let spinCount = 0;
      const maxSpins = 20;
      
      const spinInterval = setInterval(() => {
        setReels([
          Math.floor(Math.random() * symbols.length),
          Math.floor(Math.random() * symbols.length),
          Math.floor(Math.random() * symbols.length)
        ]);
        
        spinCount++;
        if (spinCount >= maxSpins) {
          clearInterval(spinInterval);
          // Show golden symbols for win
          setTimeout(() => {
            setShowGolden(true);
            setTimeout(onWin, 500);
          }, 300);
        }
      }, 100);

      return () => clearInterval(spinInterval);
    }
  }, [isSpinning, onWin]);

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="bg-gradient-to-b from-red-950 via-red-900 to-black rounded-3xl p-6 border-4 border-yellow-400 shadow-2xl relative overflow-hidden">
        {/* Premium glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-red-600/10 to-yellow-400/20 animate-pulse"></div>
        
        {/* Casino pattern overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[radial-gradient(circle_at_25%_25%,gold_2px,transparent_2px)] bg-[length:20px_20px] animate-pulse"></div>
        </div>
        
        <div className="flex justify-center space-x-3 mb-6 relative z-10">
          {reels.map((symbolIndex, reelIndex) => {
            const symbol = showGolden ? goldenSymbol : symbols[symbolIndex];
            const Icon = symbol.icon;
            
            return (
              <div
                key={reelIndex}
                className={`
                  w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-b from-red-950 via-red-900 to-black rounded-xl 
                  border-2 border-red-600 flex items-center justify-center relative overflow-hidden
                  ${isSpinning ? 'animate-spin' : ''}
                  ${showGolden ? 'border-yellow-400 bg-gradient-to-b from-yellow-900/50 to-red-900/50 animate-pulse shadow-[0_0_40px_rgba(255,215,0,0.8)]' : 'shadow-[0_0_20px_rgba(220,38,38,0.4)]'}
                `}
              >
                {showGolden && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent animate-pulse"></div>
                )}
                <Icon 
                  className={`
                    w-8 h-8 sm:w-12 sm:h-12 ${symbol.color} relative z-10
                    ${showGolden ? 'drop-shadow-[0_0_20px_rgba(255,215,0,1)] animate-bounce' : 'drop-shadow-[0_0_10px_rgba(220,38,38,0.6)]'}
                  `} 
                />
              </div>
            );
          })}
        </div>
        
        {showGolden && (
          <div className="text-center">
            <div className="text-yellow-400 text-xl sm:text-2xl font-bold animate-bounce drop-shadow-[0_0_15px_rgba(255,215,0,1)]">
              🎰 JACKPOT! 🎰
            </div>
          </div>
        )}
      </div>
      
      {/* Glowing effects */}
      {showGolden && (
        <>
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-yellow-400/30 to-red-500/20 animate-pulse pointer-events-none"></div>
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-yellow-400/40 via-red-500/20 to-yellow-400/40 blur-2xl animate-pulse pointer-events-none"></div>
        </>
      )}
    </div>
  );
}