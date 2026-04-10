'use client';

import { useEffect, useState } from 'react';

interface ResultStat {
  type: string;
  count: number;
}

interface TraitStat {
  trait: string;
  count: number;
}

interface StatsData {
  totalParticipants: number;
  results: ResultStat[];
  traits: TraitStat[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/stats')
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!data) {
    return <div className="min-h-screen flex items-center justify-center">Error loading data</div>;
  }

  const maxResultCount = Math.max(...data.results.map(r => r.count), 1);
  const maxTraitCount = Math.max(...data.traits.map(t => t.count), 1);

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-gray-800">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-blue-900">SBTI 核心数据大盘</h1>
        
        {/* Total Participants */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-500 mb-2">累计参与测试总人数</h2>
          <div className="text-5xl font-black text-blue-600">{data.totalParticipants.toLocaleString()}</div>
          <p className="text-sm text-gray-400 mt-2">包含基础值 201312 及真实测试人数</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Result Types Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">16种人格分布</h2>
            {data.results.length === 0 ? (
              <p className="text-gray-400">暂无数据</p>
            ) : (
              <div className="space-y-4">
                {data.results.map((r) => (
                  <div key={r.type} className="flex items-center">
                    <div className="w-16 font-bold text-gray-700">{r.type}</div>
                    <div className="flex-1 ml-4 relative h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                        style={{ width: `${(r.count / maxResultCount) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-16 text-right text-sm text-gray-500 font-mono ml-4">{r.count}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Traits Distribution */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">底层选项(Trait)统计</h2>
            {data.traits.length === 0 ? (
              <p className="text-gray-400">暂无数据</p>
            ) : (
              <div className="space-y-4">
                {data.traits.map((t) => (
                  <div key={t.trait} className="flex items-center">
                    <div className="w-20 font-bold text-gray-700">{t.trait}</div>
                    <div className="flex-1 ml-4 relative h-6 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-blue-500 rounded-full"
                        style={{ width: `${(t.count / maxTraitCount) * 100}%` }}
                      ></div>
                    </div>
                    <div className="w-16 text-right text-sm text-gray-500 font-mono ml-4">{t.count}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
