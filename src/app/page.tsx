'use client';

import { useState, useEffect } from 'react';
import TestFlow from '@/components/TestFlow';
import ResultView from '@/components/ResultView';

export default function Home() {
  const [testState, setTestState] = useState<'idle' | 'testing' | 'calculating' | 'result'>('idle');
  const [resultType, setResultType] = useState<string | null>(null);
  const [participantsCount, setParticipantsCount] = useState<number>(201312);

  useEffect(() => {
    // Fetch initial participants count
    fetch('/api/stats')
      .then(res => res.json())
      .then(data => {
        if (data.totalParticipants) {
          setParticipantsCount(data.totalParticipants);
        }
      })
      .catch(err => console.error('Failed to fetch stats', err));
  }, []);

  const startTest = () => setTestState('testing');

  const handleComplete = async (type: string, traits: string[]) => {
    setResultType(type);
    setTestState('calculating');
    
    // Submit real data to the backend
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resultType: type, traits })
      });
    } catch (err) {
      console.error('Submit error:', err);
    }
    
    // Simulate interstitial Ad time
    setTimeout(() => {
      setTestState('result');
    }, 3000);
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {testState === 'idle' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <h1 className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-6 flex items-baseline justify-center">
            SB<span className="text-4xl">TI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-2">看看你是个什么 SBTI</p>
          <p className="text-sm text-gray-400 mb-12">已有 {participantsCount.toLocaleString()} 人参与测试</p>
          
          <div className="flex gap-4">
            <button 
              onClick={startTest}
              className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-bold py-4 px-10 rounded-full shadow-2xl transform transition hover:scale-105"
            >
              开始测试
            </button>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                alert('已复制网址，快去分享给朋友吧！');
              }}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 text-xl font-bold py-4 px-8 rounded-full shadow-lg transform transition hover:scale-105"
            >
              分享
            </button>
          </div>
        </div>
      )}

      {testState === 'testing' && (
        <TestFlow onComplete={handleComplete} />
      )}

      {testState === 'calculating' && (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-8"></div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">正在生成你的 SBTI 人格档案...</h2>
          <p className="text-gray-500 mb-8">请稍候</p>
          
          {/* 插屏广告占位 */}
          <div className="w-full max-w-sm h-64 bg-gray-200 border-2 border-dashed border-gray-400 rounded-xl flex flex-col items-center justify-center text-gray-500">
            <p className="font-bold mb-2">插屏/视频广告位招租</p>
            <p className="text-sm">绿泡泡：as5886658</p>
          </div>
        </div>
      )}

      {testState === 'result' && resultType && (
        <ResultView resultType={resultType} />
      )}
    </main>
  );
}
