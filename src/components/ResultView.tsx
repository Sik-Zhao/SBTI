'use client';

import { getResultData } from '@/data/results';
import { useRef, useEffect, useState } from 'react';
import { domToPng } from 'modern-screenshot';
import { QRCodeCanvas } from 'qrcode.react';

export default function ResultView({ resultType }: { resultType: string }) {
  const resultRef = useRef<HTMLDivElement>(null);
  const data = getResultData(resultType);
  const [currentUrl, setCurrentUrl] = useState<string>('');

  useEffect(() => {
    // 设置当前页面URL，用于二维码生成
    setCurrentUrl(window.location.origin);
  }, []);

  const handleDownload = async () => {
    if (resultRef.current) {
      try {
        const dataUrl = await domToPng(resultRef.current, {
          scale: 2,
          backgroundColor: '#f3f4f6',
        });
        
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `SBTI_Result_${resultType}.png`;
        link.click();
      } catch (err) {
        console.error('Failed to generate image', err);
        alert('生成海报失败，请稍后再试: ' + (err as Error).message);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div 
        ref={resultRef}
        className="bg-white rounded-3xl shadow-2xl p-6 w-full max-w-md relative overflow-hidden flex flex-col items-center"
      >
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 opacity-20"></div>
        <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mt-2 mb-2 z-10">你的专属人格</h2>
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 z-10 tracking-widest">
          {data.type}
        </h1>
        
        {/* 卡通形象 */}
        <img 
          src={data.imageUrl} 
          alt={data.title} 
          className="w-32 h-32 rounded-full border-4 border-white shadow-lg z-10 mb-4 bg-gray-100 object-cover" 
          crossOrigin="anonymous"
        />

        <h3 className="text-2xl font-bold text-gray-800 mb-3 z-10 text-center">
          「{data.title}」
        </h3>
        
        <div className="flex flex-wrap justify-center gap-2 mb-4 z-10">
          {data.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
              #{tag}
            </span>
          ))}
        </div>

        <p className="text-gray-600 leading-relaxed text-center z-10 mb-6 px-2 text-sm font-medium">
          {data.description}
        </p>

        {/* 多维度分析 */}
        <div className="w-full bg-gray-50 rounded-xl p-4 mb-6 z-10 text-left text-xs space-y-3 border border-gray-100 shadow-inner">
          <div className="flex flex-col">
            <span className="font-bold text-gray-700 mb-1">🔋 社交能量</span>
            <span className="text-gray-600">{data.dimensions.energy}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-700 mb-1">🧠 思维模式</span>
            <span className="text-gray-600">{data.dimensions.mindset}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-700 mb-1">🎯 关注焦点</span>
            <span className="text-gray-600">{data.dimensions.focus}</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-gray-700 mb-1">⚡️ 行动方式</span>
            <span className="text-gray-600">{data.dimensions.action}</span>
          </div>
        </div>

        {/* 15 维度雷达分析 (N-I-S-H-I-Z-H-E-N-D-E-D-A-S-B) */}
        <div className="w-full bg-white rounded-xl p-4 mb-6 z-10 border border-gray-100 shadow-sm">
          <h4 className="text-xs font-bold text-gray-800 mb-3 border-b pb-2 text-center">十五维度评分</h4>
          <div className="grid grid-cols-3 gap-y-3 gap-x-2 text-[10px]">
            {data.fifteenDimensions.map((dim, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <span className="font-bold text-blue-600 text-sm mb-1">{dim.en[0]}</span>
                <span className="text-gray-500 font-medium mb-1">{dim.name}</span>
                <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-400 to-purple-500 h-full rounded-full" 
                    style={{ width: `${dim.score}%` }}
                  ></div>
                </div>
                <span className="text-gray-400 mt-0.5 scale-90">{dim.score}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* 占位广告位 */}
        <div className="w-full h-16 bg-gray-200 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center text-gray-400 text-xs z-10 mb-4">
          广告位招租 (Ad Banner)
        </div>

        {/* 二维码区域 */}
        <div className="flex items-center justify-center w-full mt-2 pt-4 border-t border-gray-200 z-10">
          <div className="flex flex-col items-start mr-4">
            <p className="text-sm font-bold text-gray-800">长按保存专属海报</p>
            <p className="text-xs text-gray-500">扫码测测你是个什么 SBTI</p>
          </div>
          <div className="p-1 bg-white rounded-lg shadow-sm border border-gray-100">
            {currentUrl ? (
              <QRCodeCanvas value={currentUrl} size={60} level="M" includeMargin={false} />
            ) : (
              <div className="w-[60px] h-[60px] bg-gray-200 animate-pulse rounded"></div>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-6 w-full max-w-md">
        <button 
          onClick={() => window.location.reload()}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-xl transition-colors text-sm"
        >
          再测一次
        </button>
        <button 
          onClick={handleDownload}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-lg transition-colors text-sm"
        >
          保存专属海报
        </button>
      </div>
    </div>
  );
}
