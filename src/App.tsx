import React, { useState } from 'react';
import SlotMachine from './components/SlotMachine';
import WinScreen from './components/WinScreen';
import SoundManager from './components/SoundManager';
import { Play, Coins, TrendingUp } from 'lucide-react';

export default function App() {
  const [balance, setBalance] = useState(510);
  const [isSpinning, setIsSpinning] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [showWinScreen, setShowWinScreen] = useState(false);
  const [playWinSound, setPlayWinSound] = useState(false);

  const handleSpin = () => {
    if (isSpinning || hasWon) return;
    
    setBalance(460); // Deduct R$50 for the spin
    setIsSpinning(true);
  };

  const handleWin = () => {
    setIsSpinning(false);
    setBalance(1010); // Add winnings
    setHasWon(true);
    setPlayWinSound(true);
    
    setTimeout(() => {
      setShowWinScreen(true);
    }, 1500);
  };

  const handleWinSoundComplete = () => {
    setPlayWinSound(false);
  };

  if (showWinScreen) {
    return <WinScreen balance={balance} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-950 via-red-900 to-black flex flex-col overflow-x-hidden">
      <SoundManager playWinSound={playWinSound} onWinSoundComplete={handleWinSoundComplete} />
      
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,215,0,0.15),transparent)] animate-pulse"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_70%_70%,rgba(220,38,38,0.12),transparent)]"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_10%,rgba(153,27,27,0.08),transparent)]"></div>
        
        {/* Casino coins floating */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full animate-bounce shadow-[0_0_15px_rgba(255,215,0,0.6)]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
        
        {/* Casino symbols floating */}
        {['🎰', '🎲', '♠️', '♥️', '♦️', '♣️', '💎', '🃏'].map((symbol, i) => (
          <div
            key={`symbol-${i}`}
            className="absolute text-yellow-400/20 animate-pulse text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            {symbol}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="relative z-10 text-center py-6 px-4">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-600 mb-2 drop-shadow-[0_0_40px_rgba(255,215,0,0.5)] animate-pulse">
          GOLDEN SLOTS
        </h1>
        <p className="text-gray-200 text-base sm:text-lg drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] font-semibold">🎰 O cassino mais premiado do Brasil 🎰</p>
        <div className="flex justify-center mt-2">
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full animate-pulse shadow-[0_0_10px_rgba(255,215,0,0.8)]"></div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-4 relative z-10">
        {/* Balance Display */}
        <div className="bg-gradient-to-r from-red-950 via-red-900 to-red-950 rounded-2xl p-4 sm:p-6 mb-6 border-2 border-yellow-500 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-red-600/5 to-yellow-400/10 animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.05),transparent)] animate-pulse"></div>
          <div className="flex items-center justify-center space-x-2 sm:space-x-3 relative z-10">
            <Coins className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-400 drop-shadow-[0_0_15px_rgba(255,215,0,0.8)] animate-spin" />
            <span className="text-2xl sm:text-3xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              R$ {balance.toFixed(2).replace('.', ',')}
            </span>
            {hasWon && <TrendingUp className="w-6 h-6 sm:w-8 sm:h-8 text-green-400 animate-bounce drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]" />}
          </div>
        </div>

        {/* Slot Machine */}
        <div className="mb-6 w-full flex justify-center">
          <SlotMachine onWin={handleWin} isSpinning={isSpinning} />
        </div>

        {/* Spin Button */}
        <button
          onClick={handleSpin}
          disabled={isSpinning || hasWon}
          className={`
            group flex items-center justify-center space-x-2 sm:space-x-3 text-lg sm:text-xl font-bold 
            py-5 px-6 sm:px-8 rounded-2xl border-3 shadow-2xl transform transition-all duration-200
            w-full max-w-sm relative overflow-hidden
            ${hasWon 
              ? 'bg-gradient-to-r from-green-600 via-green-500 to-green-600 border-green-400 text-white cursor-default drop-shadow-[0_0_25px_rgba(34,197,94,0.6)]' 
              : isSpinning 
                ? 'bg-gradient-to-r from-red-800 to-red-900 border-red-600 text-gray-300 cursor-not-allowed animate-pulse'
                : 'bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-600 border-yellow-400 text-white active:scale-95 active:from-yellow-700 active:to-yellow-800 drop-shadow-[0_0_25px_rgba(255,193,7,0.6)]'
            }
          `}
        >
          {(hasWon || isSpinning) && (
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          )}
          <Play className={`w-5 h-5 sm:w-6 sm:h-6 relative z-10 drop-shadow-lg ${isSpinning ? 'animate-spin' : hasWon ? 'animate-bounce' : 'group-active:translate-x-1 transition-transform'}`} />
          <span className="relative z-10">
            {hasWon ? '🎉 VOCÊ GANHOU! 🎉' : isSpinning ? 'GIRANDO...' : 'GIRAR - R$ 50,00'}
          </span>
        </button>

        {/* Win Message */}
        {hasWon && !showWinScreen && (
          <div className="mt-4 text-center animate-bounce">
            <div className="text-yellow-400 text-xl sm:text-2xl font-bold drop-shadow-[0_0_20px_rgba(255,215,0,1)] animate-pulse">
              🎰 CARTA DOURADA! +R$ 500,00 🎰
            </div>
            <div className="text-gray-200 mt-2 text-sm sm:text-base drop-shadow-lg">
              Preparando seu saque...
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center py-4 px-4 text-gray-300 text-xs sm:text-sm">
        <p className="drop-shadow-sm">🎲 Jogue com responsabilidade • Maiores de 18 anos 🎲</p>
      </div>
    </div>
  );
}