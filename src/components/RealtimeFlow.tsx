import { Zap, Radio, MessageCircle, Bell, CheckCircle } from 'lucide-react';

export function RealtimeFlow() {
  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Real-time Communication Flow</h1>
          <p className="text-gray-400">
            WebSocket architecture and WhatsApp integration patterns
          </p>
        </div>

        {/* WebSocket Flow */}
        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-yellow-400" size={28} />
            <h2 className="text-2xl font-semibold">WebSocket Communication</h2>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-500/20 border border-blue-500 rounded-full flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <div className="w-0.5 h-full bg-gradient-to-b from-blue-500 to-green-500 mt-2"></div>
              </div>
              <div className="flex-1 pb-6">
                <h3 className="font-semibold mb-2">Client Connection</h3>
                <div className="bg-[#1A1F28] rounded-lg p-4 mb-3">
                  <code className="text-sm">
                    <span className="text-blue-400">const</span> socket = <span className="text-yellow-400">io</span>(<span className="text-green-400">"wss://api.medconnect.com"</span>, {'{'}<br />
                    &nbsp;&nbsp;auth: {'{'} token: jwt_token {'}'},<br />
                    &nbsp;&nbsp;transports: [<span className="text-green-400">"websocket"</span>]<br />
                    {'}'});
                  </code>
                </div>
                <p className="text-sm text-gray-400">
                  Client establishes WebSocket connection with JWT authentication
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-500/20 border border-green-500 rounded-full flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <div className="w-0.5 h-full bg-gradient-to-b from-green-500 to-yellow-500 mt-2"></div>
              </div>
              <div className="flex-1 pb-6">
                <h3 className="font-semibold mb-2">Subscribe to Channels</h3>
                <div className="bg-[#1A1F28] rounded-lg p-4 mb-3">
                  <code className="text-sm">
                    socket.<span className="text-yellow-400">emit</span>(<span className="text-green-400">"subscribe"</span>, {'{'}<br />
                    &nbsp;&nbsp;channels: [<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">"emergency:requests"</span>,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">"pharmacy:responses"</span>,<br />
                    &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-green-400">"notifications:user_123"</span><br />
                    &nbsp;&nbsp;]<br />
                    {'}'});
                  </code>
                </div>
                <p className="text-sm text-gray-400">
                  Client subscribes to relevant channels based on user role and location
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-yellow-500/20 border border-yellow-500 rounded-full flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <div className="w-0.5 h-full bg-gradient-to-b from-yellow-500 to-red-500 mt-2"></div>
              </div>
              <div className="flex-1 pb-6">
                <h3 className="font-semibold mb-2">Emit Emergency Request</h3>
                <div className="bg-[#1A1F28] rounded-lg p-4 mb-3">
                  <code className="text-sm">
                    socket.<span className="text-yellow-400">emit</span>(<span className="text-green-400">"emergency:create"</span>, {'{'}<br />
                    &nbsp;&nbsp;medicine: <span className="text-green-400">"Insulin"</span>,<br />
                    &nbsp;&nbsp;location: {'{'} lat: 19.0760, lng: 72.8777 {'}'},<br />
                    &nbsp;&nbsp;priority: <span className="text-blue-400">1</span><br />
                    {'}'});
                  </code>
                </div>
                <p className="text-sm text-gray-400">
                  Patient creates emergency request that broadcasts to nearby pharmacies
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-red-500/20 border border-red-500 rounded-full flex items-center justify-center font-bold text-sm">
                  4
                </div>
                <div className="w-0.5 h-full bg-gradient-to-b from-red-500 to-purple-500 mt-2"></div>
              </div>
              <div className="flex-1 pb-6">
                <h3 className="font-semibold mb-2">Receive Real-time Updates</h3>
                <div className="bg-[#1A1F28] rounded-lg p-4 mb-3">
                  <code className="text-sm">
                    socket.<span className="text-yellow-400">on</span>(<span className="text-green-400">"pharmacy:response"</span>, (data) {'=>'} {'{'}<br />
                    &nbsp;&nbsp;<span className="text-gray-400">// Update UI with pharmacy response</span><br />
                    &nbsp;&nbsp;updateResponseList(data);<br />
                    &nbsp;&nbsp;showNotification(data.message);<br />
                    {'}'});
                  </code>
                </div>
                <p className="text-sm text-gray-400">
                  Client receives instant notifications when pharmacies respond
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-purple-500/20 border border-purple-500 rounded-full flex items-center justify-center font-bold text-sm">
                  5
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold mb-2">Escalation Monitoring</h3>
                <div className="bg-[#1A1F28] rounded-lg p-4 mb-3">
                  <code className="text-sm">
                    socket.<span className="text-yellow-400">on</span>(<span className="text-green-400">"escalation:warning"</span>, (data) {'=>'} {'{'}<br />
                    &nbsp;&nbsp;<span className="text-gray-400">// Show escalation modal</span><br />
                    &nbsp;&nbsp;showEscalationModal(data.timeRemaining);<br />
                    {'}'});
                  </code>
                </div>
                <p className="text-sm text-gray-400">
                  Automatic escalation alerts when response timeout approaches
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* WhatsApp Integration */}
        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-8">
          <div className="flex items-center gap-3 mb-6">
            <MessageCircle className="text-[#25D366]" size={28} />
            <h2 className="text-2xl font-semibold">WhatsApp Integration Flow</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Outgoing Messages */}
            <div className="bg-[#1A1F28] rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Radio className="text-blue-400" size={20} />
                Outgoing Broadcast
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium">Emergency Created</p>
                    <p className="text-xs text-gray-400">Patient creates emergency request</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium">Query Nearby Pharmacies</p>
                    <p className="text-xs text-gray-400">Geospatial query within 5km radius</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium">WhatsApp API Call</p>
                    <p className="text-xs text-gray-400">Send via Twilio Business API</p>
                    <code className="block mt-2 px-2 py-1 bg-[#0B0F14] rounded text-xs">
                      POST /whatsapp/send
                    </code>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <p className="text-sm font-medium">Message Template</p>
                    <div className="mt-2 px-3 py-2 bg-[#0B0F14] rounded text-xs">
                      <p className="text-gray-400">🚨 EMERGENCY REQUEST</p>
                      <p className="mt-1">Medicine: Insulin</p>
                      <p>Distance: 1.2 km</p>
                      <p className="mt-1 text-yellow-400">Reply: YES / NO</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Incoming Messages */}
            <div className="bg-[#1A1F28] rounded-lg p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Bell className="text-green-400" size={20} />
                Incoming Responses
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium">Webhook Received</p>
                    <code className="block mt-1 px-2 py-1 bg-[#0B0F14] rounded text-xs">
                      POST /webhook/whatsapp
                    </code>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium">Parse Message</p>
                    <p className="text-xs text-gray-400">Extract pharmacy ID and response</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium">Update Database</p>
                    <p className="text-xs text-gray-400">Create response record in MongoDB</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <p className="text-sm font-medium">Broadcast via WebSocket</p>
                    <p className="text-xs text-gray-400">Push update to patient's device</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <p className="text-sm font-medium">Update Redis Cache</p>
                    <p className="text-xs text-gray-400">Store real-time availability status</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* WebSocket Events */}
        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6">WebSocket Event Contracts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Client to Server */}
            <div>
              <h3 className="font-semibold mb-4 text-blue-400">Client → Server</h3>
              <div className="space-y-3">
                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <code className="text-sm font-mono">emergency:create</code>
                  <pre className="mt-2 text-xs text-gray-400 overflow-x-auto">
{`{
  medicine: string,
  location: GeoJSON,
  priority: number,
  notes?: string
}`}
                  </pre>
                </div>

                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <code className="text-sm font-mono">pharmacy:respond</code>
                  <pre className="mt-2 text-xs text-gray-400 overflow-x-auto">
{`{
  requestId: string,
  status: 'confirmed' | 'declined',
  estimatedTime?: number,
  message?: string
}`}
                  </pre>
                </div>

                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <code className="text-sm font-mono">request:cancel</code>
                  <pre className="mt-2 text-xs text-gray-400 overflow-x-auto">
{`{
  requestId: string,
  reason: string
}`}
                  </pre>
                </div>
              </div>
            </div>

            {/* Server to Client */}
            <div>
              <h3 className="font-semibold mb-4 text-green-400">Server → Client</h3>
              <div className="space-y-3">
                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <code className="text-sm font-mono">pharmacy:response</code>
                  <pre className="mt-2 text-xs text-gray-400 overflow-x-auto">
{`{
  requestId: string,
  pharmacy: PharmacyInfo,
  status: string,
  message: string,
  timestamp: Date
}`}
                  </pre>
                </div>

                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <code className="text-sm font-mono">escalation:warning</code>
                  <pre className="mt-2 text-xs text-gray-400 overflow-x-auto">
{`{
  requestId: string,
  timeRemaining: number,
  escalationLevel: number,
  suggestedAction: string
}`}
                  </pre>
                </div>

                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <code className="text-sm font-mono">request:completed</code>
                  <pre className="mt-2 text-xs text-gray-400 overflow-x-auto">
{`{
  requestId: string,
  pharmacy: PharmacyInfo,
  completedAt: Date,
  responseTime: number
}`}
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="text-green-400" size={24} />
            <h2 className="text-2xl font-semibold">Performance Targets</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-[#1A1F28] rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-green-400">{'<'}100ms</p>
              <p className="text-sm text-gray-400 mt-1">WebSocket Latency</p>
            </div>
            <div className="bg-[#1A1F28] rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-blue-400">{'<'}3s</p>
              <p className="text-sm text-gray-400 mt-1">WhatsApp Delivery</p>
            </div>
            <div className="bg-[#1A1F28] rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-yellow-400">99.9%</p>
              <p className="text-sm text-gray-400 mt-1">Uptime SLA</p>
            </div>
            <div className="bg-[#1A1F28] rounded-lg p-4 text-center">
              <p className="text-3xl font-bold text-red-400">10K</p>
              <p className="text-sm text-gray-400 mt-1">Concurrent Connections</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
