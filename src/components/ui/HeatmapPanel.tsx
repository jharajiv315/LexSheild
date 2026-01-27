import { TrendingUp, Users, Clock, MapPin } from 'lucide-react';

export function HeatmapPanel() {
  // Mock heatmap data
  const heatmapData = [
    { hour: '00:00', requests: 2, intensity: 10 },
    { hour: '02:00', requests: 1, intensity: 5 },
    { hour: '04:00', requests: 3, intensity: 15 },
    { hour: '06:00', requests: 8, intensity: 40 },
    { hour: '08:00', requests: 15, intensity: 75 },
    { hour: '10:00', requests: 22, intensity: 100 },
    { hour: '12:00', requests: 18, intensity: 90 },
    { hour: '14:00', requests: 25, intensity: 100 },
    { hour: '16:00', requests: 20, intensity: 90 },
    { hour: '18:00', requests: 28, intensity: 100 },
    { hour: '20:00', requests: 16, intensity: 80 },
    { hour: '22:00', requests: 8, intensity: 40 },
  ];

  const hotspots = [
    { area: 'Andheri West', requests: 156, avgTime: '3.5 min', trend: '+15%' },
    { area: 'Bandra East', requests: 142, avgTime: '4.2 min', trend: '+8%' },
    { area: 'Malad West', requests: 128, avgTime: '5.1 min', trend: '-2%' },
    { area: 'Borivali', requests: 98, avgTime: '6.3 min', trend: '+5%' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold mb-2">Emergency Request Analytics</h2>
        <p className="text-gray-400">Real-time heatmap and response patterns</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Peak Hour</span>
            <Clock className="text-yellow-400" size={20} />
          </div>
          <p className="text-2xl font-bold">6-8 PM</p>
          <p className="text-xs text-gray-400 mt-1">28 requests/hour</p>
        </div>

        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Busiest Area</span>
            <MapPin className="text-red-400" size={20} />
          </div>
          <p className="text-2xl font-bold">Andheri W</p>
          <p className="text-xs text-gray-400 mt-1">156 requests today</p>
        </div>

        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Active Users</span>
            <Users className="text-blue-400" size={20} />
          </div>
          <p className="text-2xl font-bold">2,847</p>
          <p className="text-xs text-gray-400 mt-1">+234 this week</p>
        </div>

        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Trend</span>
            <TrendingUp className="text-green-400" size={20} />
          </div>
          <p className="text-2xl font-bold">+18%</p>
          <p className="text-xs text-gray-400 mt-1">vs last month</p>
        </div>
      </div>

      {/* Heatmap */}
      <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
        <h3 className="font-semibold mb-6">24-Hour Request Heatmap</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            {heatmapData.map((data) => (
              <div key={data.hour} className="flex-1">
                <div
                  className="rounded-lg transition-all hover:scale-105 cursor-pointer"
                  style={{
                    height: `${Math.max(data.intensity * 2, 20)}px`,
                    backgroundColor: `rgba(16, 185, 129, ${data.intensity / 100})`,
                  }}
                  title={`${data.hour}: ${data.requests} requests`}
                />
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-400">
            {heatmapData.map((data) => (
              <span key={data.hour} className="flex-1 text-center">
                {data.hour}
              </span>
            ))}
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-800">
            <span>Low Activity</span>
            <div className="flex items-center gap-2">
              <div className="w-20 h-3 rounded-full bg-gradient-to-r from-green-900 via-green-500 to-green-400"></div>
            </div>
            <span>High Activity</span>
          </div>
        </div>
      </div>

      {/* Geographic Hotspots */}
      <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
        <h3 className="font-semibold mb-6">Geographic Hotspots</h3>
        <div className="space-y-4">
          {hotspots.map((hotspot, index) => (
            <div
              key={hotspot.area}
              className="flex items-center justify-between p-4 bg-[#1A1F28] rounded-lg hover:bg-[#212731] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-bold text-green-400">#{index + 1}</span>
                </div>
                <div>
                  <h4 className="font-semibold">{hotspot.area}</h4>
                  <p className="text-sm text-gray-400">{hotspot.requests} requests today</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-right">
                  <p className="text-gray-400">Avg Response</p>
                  <p className="font-semibold">{hotspot.avgTime}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400">Trend</p>
                  <p className={`font-semibold ${
                    hotspot.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {hotspot.trend}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Response Time Distribution */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <h3 className="font-semibold mb-6">Response Time Distribution</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">0-2 minutes</span>
                <span className="font-semibold text-green-400">35%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 rounded-full" style={{ width: '35%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">2-5 minutes</span>
                <span className="font-semibold text-blue-400">42%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">5-10 minutes</span>
                <span className="font-semibold text-yellow-400">18%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-yellow-500 rounded-full" style={{ width: '18%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-400">10+ minutes</span>
                <span className="font-semibold text-red-400">5%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-red-500 rounded-full" style={{ width: '5%' }}></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <h3 className="font-semibold mb-6">Request Status Breakdown</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
              <span className="text-sm">Completed</span>
              <span className="font-bold text-green-400">412</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <span className="text-sm">Confirmed</span>
              <span className="font-bold text-blue-400">38</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <span className="text-sm">Pending</span>
              <span className="font-bold text-yellow-400">12</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
              <span className="text-sm">Declined</span>
              <span className="font-bold text-red-400">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
