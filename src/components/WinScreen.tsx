import React, { useEffect, useState } from 'react';
import { Trophy, Sparkles, DollarSign } from 'lucide-react';

interface WinScreenProps {
  balance: number;
}

export default function WinScreen({ balance }: WinScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleValidateAccount = () => {
    window.location.href = 'https://pay.comprasegurapay.click/kNgrKAlx';
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-red-950 via-red-900 to-black flex items-center justify-center p-3 z-50 overflow-y-auto">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,215,0,0.25),transparent)] animate-pulse"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(220,38,38,0.15),transparent)]"></div>
        <div className="absolute w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(153,27,27,0.15),transparent)]"></div>
        
        {/* Casino coins animation */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full animate-bounce shadow-[0_0_10px_rgba(255,215,0,0.8)]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Diamond sparkles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`diamond-${i}`}
            className="absolute text-yellow-400 animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              fontSize: `${8 + Math.random() * 8}px`
            }}
          >
            💎
          </div>
        ))}
      </div>

      <div className="relative bg-gradient-to-b from-red-950 via-red-900 to-black rounded-3xl p-6 sm:p-8 border-4 border-yellow-400 shadow-2xl max-w-sm sm:max-w-md w-full mx-3 my-4 overflow-hidden">
        {/* Premium overlay effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 via-red-600/5 to-yellow-400/10 animate-pulse"></div>
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400/30 via-red-500/10 to-yellow-400/30 blur-xl animate-pulse pointer-events-none"></div>
        
        {/* Casino pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22%3E%3Ccircle cx=%2250%22 cy=%2250%22 r=%2220%22 fill=%22gold%22 opacity=%220.3%22/%3E%3Ctext x=%2250%22 y=%2255%22 text-anchor=%22middle%22 fill=%22gold%22 font-size=%2212%22%3E$%3C/text%3E%3C/svg%3E')] bg-[length:40px_40px] animate-pulse"></div>
        </div>
        
        {/* Header */}
        <div className="text-center mb-6 relative z-10">
          <div className="flex justify-center mb-3">
            <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400 animate-bounce drop-shadow-[0_0_25px_rgba(255,215,0,1)]" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-yellow-400 mb-2 animate-pulse drop-shadow-[0_0_20px_rgba(255,215,0,1)]">
            PARABÉNS!
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 animate-spin" />
            <span className="text-lg sm:text-xl text-gray-100 drop-shadow-lg">Você ganhou!</span>
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300 animate-spin" />
          </div>
        </div>

        {/* Balance Display */}
        <div className="text-center mb-6 relative z-10">
          <div className="bg-gradient-to-r from-yellow-600 via-yellow-500 to-yellow-400 rounded-2xl p-4 sm:p-6 mb-4 shadow-2xl relative overflow-hidden border-2 border-yellow-300">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)] animate-pulse"></div>
            <div className="flex items-center justify-center space-x-2">
              <DollarSign className="w-6 h-6 sm:w-8 sm:h-8 text-white drop-shadow-[0_0_10px_rgba(0,0,0,0.8)] animate-pulse" />
              <span className="text-3xl sm:text-4xl font-bold text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
                R$ {balance.toFixed(2).replace('.', ',')}
              </span>
            </div>
            <div className="text-white/95 mt-1 text-sm sm:text-base font-semibold drop-shadow-lg">prontos para saque</div>
          </div>
        </div>

        {/* Message */}
        <div className="bg-red-900/40 rounded-xl p-4 sm:p-6 mb-6 border border-red-600/50 backdrop-blur-sm relative z-10 shadow-inner">
          <p className="text-gray-100 text-center leading-relaxed text-sm sm:text-base drop-shadow-sm">
            Para liberar este saque e validar sua conta bancária 
            <span className="text-yellow-400 font-bold drop-shadow-[0_0_5px_rgba(255,215,0,0.8)]"> (nível 2 de verificação)</span>, 
            é necessário realizar um depósito mínimo de 
            <span className="text-green-400 font-bold drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]"> R$ 26,57</span>.
          </p>
          <p className="text-gray-100 text-center mt-3 text-sm sm:text-base drop-shadow-sm">
            Após a validação, seu saque é 
            <span className="text-green-400 font-bold drop-shadow-[0_0_5px_rgba(34,197,94,0.8)]"> liberado imediatamente</span>.
          </p>
        </div>

        {/* Validate Button */}
        <button
          onClick={handleValidateAccount}
          className="
            relative z-10 w-full bg-gradient-to-r from-green-600 via-green-500 to-green-600 
            active:from-green-700 active:to-green-800 
            text-white font-bold text-lg sm:text-xl py-5 px-6 rounded-2xl 
            shadow-2xl transform active:scale-95 transition-all duration-200
            border-3 border-green-400 active:border-green-300
            animate-pulse active:animate-none overflow-hidden
            drop-shadow-[0_0_25px_rgba(34,197,94,0.6)]
          "
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)] animate-pulse"></div>
          ✅ VALIDAR MINHA CONTA AGORA
        </button>

        {/* Security badges */}
        <div className="flex justify-center space-x-3 sm:space-x-4 mt-4 text-xs sm:text-sm text-gray-300 relative z-10">
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="drop-shadow-sm">Seguro</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="drop-shadow-sm">Rápido</span>
          </span>
          <span className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="drop-shadow-sm">Confiável</span>
          </span>
        </div>
      </div>
    </div>
  );
}