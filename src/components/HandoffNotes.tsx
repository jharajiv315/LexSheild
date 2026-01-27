import { Code, Database, Zap, Palette, Shield, Globe } from 'lucide-react';

export function HandoffNotes() {
  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Developer Handoff Notes</h1>
          <p className="text-gray-400">
            Complete technical specifications for implementation
          </p>
        </div>

        {/* API Endpoints */}
        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Code className="text-green-400" size={24} />
            <h2 className="text-2xl font-semibold">FastAPI Endpoints</h2>
          </div>

          <div className="space-y-6">
            {/* Authentication */}
            <div>
              <h3 className="font-semibold mb-3 text-blue-400">Authentication</h3>
              <div className="space-y-3">
                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-mono">POST</span>
                    <code className="text-sm">/api/v1/auth/register</code>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">Register new user (patient/pharmacy)</p>
                  <pre className="text-xs text-gray-400 overflow-x-auto bg-[#0B0F14] p-3 rounded">
{`Request Body:
{
  "email": "user@example.com",
  "phone": "+919876543210",
  "name": "John Doe",
  "role": "patient",
  "location": {"type": "Point", "coordinates": [72.8777, 19.0760]}
}

Response: 201
{
  "user_id": "507f1f77bcf86cd799439011",
  "access_token": "eyJ0eXAiOiJKV1...",
  "refresh_token": "eyJ0eXAiOiJKV1..."
}`}
                  </pre>
                </div>

                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-mono">POST</span>
                    <code className="text-sm">/api/v1/auth/login</code>
                  </div>
                  <p className="text-xs text-gray-400">Login and get JWT tokens</p>
                </div>

                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-mono">POST</span>
                    <code className="text-sm">/api/v1/auth/refresh</code>
                  </div>
                  <p className="text-xs text-gray-400">Refresh access token using refresh token</p>
                </div>
              </div>
            </div>

            {/* Emergency Requests */}
            <div>
              <h3 className="font-semibold mb-3 text-red-400">Emergency Requests</h3>
              <div className="space-y-3">
                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-mono">POST</span>
                    <code className="text-sm">/api/v1/emergency/create</code>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">Create emergency request</p>
                  <pre className="text-xs text-gray-400 overflow-x-auto bg-[#0B0F14] p-3 rounded">
{`Authorization: Bearer {access_token}

Request Body:
{
  "medicine": "Insulin",
  "location": {"type": "Point", "coordinates": [72.8777, 19.0760]},
  "priority": 1,
  "notes": "Urgent need"
}

Response: 201
{
  "request_id": "507f1f77bcf86cd799439012",
  "status": "pending",
  "nearby_pharmacies": 12,
  "estimated_response_time": 300
}`}
                  </pre>
                </div>

                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-mono">GET</span>
                    <code className="text-sm">/api/v1/emergency/{'{'}request_id{'}'}</code>
                  </div>
                  <p className="text-xs text-gray-400">Get emergency request details and responses</p>
                </div>

                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-mono">PUT</span>
                    <code className="text-sm">/api/v1/emergency/{'{'}request_id{'}'}/escalate</code>
                  </div>
                  <p className="text-xs text-gray-400">Manually escalate request</p>
                </div>

                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-xs font-mono">DELETE</span>
                    <code className="text-sm">/api/v1/emergency/{'{'}request_id{'}'}/cancel</code>
                  </div>
                  <p className="text-xs text-gray-400">Cancel emergency request</p>
                </div>
              </div>
            </div>

            {/* Pharmacy */}
            <div>
              <h3 className="font-semibold mb-3 text-green-400">Pharmacy Management</h3>
              <div className="space-y-3">
                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-mono">GET</span>
                    <code className="text-sm">/api/v1/pharmacy/nearby</code>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">Find nearby pharmacies</p>
                  <pre className="text-xs text-gray-400 overflow-x-auto bg-[#0B0F14] p-3 rounded">
{`Query Params:
?lat=19.0760&lng=72.8777&radius=5000&medicine=Insulin

Response: 200
{
  "pharmacies": [
    {
      "id": "507f1f77bcf86cd799439013",
      "name": "Apollo Pharmacy",
      "distance": 1.2,
      "is_open": true,
      "response_time_avg": 240
    }
  ]
}`}
                  </pre>
                </div>

                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-mono">POST</span>
                    <code className="text-sm">/api/v1/pharmacy/respond</code>
                  </div>
                  <p className="text-xs text-gray-400">Pharmacy responds to emergency request</p>
                </div>

                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-mono">PUT</span>
                    <code className="text-sm">/api/v1/pharmacy/inventory</code>
                  </div>
                  <p className="text-xs text-gray-400">Update pharmacy inventory</p>
                </div>
              </div>
            </div>

            {/* Admin */}
            <div>
              <h3 className="font-semibold mb-3 text-purple-400">Admin & Analytics</h3>
              <div className="space-y-3">
                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-mono">GET</span>
                    <code className="text-sm">/api/v1/admin/requests</code>
                  </div>
                  <p className="text-xs text-gray-400">Get all emergency requests with filters</p>
                </div>

                <div className="bg-[#1A1F28] rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-mono">GET</span>
                    <code className="text-sm">/api/v1/admin/analytics/heatmap</code>
                  </div>
                  <p className="text-xs text-gray-400">Get request heatmap data for visualization</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Environment Variables */}
        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="text-yellow-400" size={24} />
            <h2 className="text-2xl font-semibold">Environment Configuration</h2>
          </div>
          <pre className="text-sm text-gray-300 overflow-x-auto bg-[#1A1F28] p-4 rounded-lg">
{`# .env file

# Database
MONGODB_URI=mongodb://localhost:27017/medconnect
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET_KEY=your-secret-key-here
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30
JWT_REFRESH_TOKEN_EXPIRE_DAYS=7

# WhatsApp / Twilio
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
TWILIO_WHATSAPP_NUMBER=whatsapp:+14155238886

# AWS S3
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_BUCKET_NAME=medconnect-uploads

# Application
APP_ENV=production
APP_DEBUG=false
CORS_ORIGINS=["https://medconnect.com"]

# WebSocket
WS_HOST=0.0.0.0
WS_PORT=8000

# Rate Limiting
RATE_LIMIT_PER_MINUTE=60`}
          </pre>
        </div>

        {/* CSS Tokens */}
        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="text-blue-400" size={24} />
            <h2 className="text-2xl font-semibold">CSS Design Tokens</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Colors</h3>
              <pre className="text-xs text-gray-300 overflow-x-auto bg-[#1A1F28] p-4 rounded-lg">
{`/* Background */
--color-bg-primary: #0B0F14;
--color-bg-secondary: #12161D;
--color-bg-tertiary: #1A1F28;

/* Accent Colors */
--color-success: #10B981;
--color-warning: #F59E0B;
--color-danger: #EF4444;

/* Text Colors */
--color-text-primary: #F9FAFB;
--color-text-secondary: #D1D5DB;
--color-text-tertiary: #9CA3AF;`}
              </pre>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Spacing & Radius</h3>
              <pre className="text-xs text-gray-300 overflow-x-auto bg-[#1A1F28] p-4 rounded-lg">
{`/* Spacing */
--spacing-xs: 0.25rem;
--spacing-sm: 0.5rem;
--spacing-md: 1rem;
--spacing-lg: 1.5rem;
--spacing-xl: 2rem;

/* Border Radius */
--radius-sm: 0.375rem;
--radius-md: 0.5rem;
--radius-lg: 0.75rem;
--radius-xl: 1rem;`}
              </pre>
            </div>
          </div>
        </div>

        {/* Deployment */}
        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="text-red-400" size={24} />
            <h2 className="text-2xl font-semibold">Deployment Instructions</h2>
          </div>
          
          <div className="space-y-4">
            <div className="bg-[#1A1F28] rounded-lg p-4">
              <h3 className="font-semibold mb-2">1. Backend Setup</h3>
              <pre className="text-xs text-gray-300 overflow-x-auto bg-[#0B0F14] p-3 rounded mt-2">
{`# Clone repository
git clone https://github.com/medconnect/backend.git
cd backend

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start server
uvicorn main:app --host 0.0.0.0 --port 8000`}
              </pre>
            </div>

            <div className="bg-[#1A1F28] rounded-lg p-4">
              <h3 className="font-semibold mb-2">2. Frontend Deployment</h3>
              <pre className="text-xs text-gray-300 overflow-x-auto bg-[#0B0F14] p-3 rounded mt-2">
{`# Install dependencies
npm install

# Build for production
npm run build

# Deploy to Vercel/Netlify
vercel --prod`}
              </pre>
            </div>

            <div className="bg-[#1A1F28] rounded-lg p-4">
              <h3 className="font-semibold mb-2">3. Docker Deployment</h3>
              <pre className="text-xs text-gray-300 overflow-x-auto bg-[#0B0F14] p-3 rounded mt-2">
{`# Build images
docker-compose build

# Start services
docker-compose up -d

# Check logs
docker-compose logs -f`}
              </pre>
            </div>
          </div>
        </div>

        {/* Testing */}
        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="text-green-400" size={24} />
            <h2 className="text-2xl font-semibold">Testing Checklist</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold mb-3">Functional Tests</h3>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">User registration and login</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Emergency request creation</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">WebSocket real-time updates</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">WhatsApp integration</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Escalation workflow</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Pharmacy response handling</span>
              </label>
            </div>
            
            <div className="space-y-2">
              <h3 className="font-semibold mb-3">Non-Functional Tests</h3>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Load testing (10K concurrent users)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Security penetration testing</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Accessibility (WCAG AA)</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Offline PWA functionality</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Mobile responsiveness</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <span className="text-sm">Multi-language support</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
