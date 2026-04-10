'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions, Trait } from '@/data/questions';

export default function TestFlow({ onComplete }: { onComplete: (resultType: string, traits: Trait[]) => void }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState<Record<Trait, number>>({
    S: 0, C: 0, H: 0, T_Mind: 0, I: 0, R: 0, T_Action: 0, L: 0
  });
  const [chosenTraits, setChosenTraits] = useState<Trait[]>([]);

  const handleAnswer = (trait: Trait) => {
    const newScores = { ...scores, [trait]: scores[trait] + 1 };
    const newChosenTraits = [...chosenTraits, trait];
    
    setScores(newScores);
    setChosenTraits(newChosenTraits);

    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Calculate final result based on 4 axes
      const dim1 = newScores.S >= newScores.C ? 'S' : 'C';
      const dim2 = newScores.H >= newScores.T_Mind ? 'H' : 'T';
      const dim3 = newScores.I >= newScores.R ? 'I' : 'R';
      const dim4 = newScores.T_Action >= newScores.L ? 'T' : 'L';
      const resultType = `${dim1}${dim2}${dim3}${dim4}`;
      onComplete(resultType, newChosenTraits);
    }
  };

  const currentQ = questions[currentIdx];
  const progress = ((currentIdx) / questions.length) * 100;

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto p-4 min-h-[80vh] justify-center relative">
      <div className="w-full bg-gray-200 h-2 rounded-full mb-8 overflow-hidden">
        <div
          className="bg-blue-600 h-2 transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className="text-gray-500 mb-2 font-mono">
        {currentIdx + 1} / {questions.length}
      </div>

      <div className="relative w-full h-80">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-6 text-center border-2 border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-8 leading-relaxed">
              {currentQ.text}
            </h2>
            <div className="flex flex-col gap-4 w-full">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.trait)}
                  className="w-full bg-gray-50 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 border-2 border-transparent text-gray-700 py-4 px-4 rounded-lg transition-colors text-left font-medium"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
