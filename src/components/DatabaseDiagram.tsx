import { Database, Key, Link } from 'lucide-react';

export function DatabaseDiagram() {
  const collections = [
    {
      name: 'users',
      color: 'blue',
      fields: [
        { name: '_id', type: 'ObjectId', key: true },
        { name: 'email', type: 'String', indexed: true },
        { name: 'phone', type: 'String', indexed: true },
        { name: 'name', type: 'String' },
        { name: 'role', type: 'Enum', values: ['patient', 'pharmacy', 'admin'] },
        { name: 'location', type: 'GeoJSON' },
        { name: 'language', type: 'String', default: 'en' },
        { name: 'createdAt', type: 'Date' },
        { name: 'updatedAt', type: 'Date' }
      ]
    },
    {
      name: 'emergency_requests',
      color: 'red',
      fields: [
        { name: '_id', type: 'ObjectId', key: true },
        { name: 'userId', type: 'ObjectId', ref: 'users' },
        { name: 'medicine', type: 'String', indexed: true },
        { name: 'status', type: 'Enum', values: ['pending', 'confirmed', 'completed'] },
        { name: 'priority', type: 'Number', default: 1 },
        { name: 'location', type: 'GeoJSON', indexed: true },
        { name: 'escalationLevel', type: 'Number', default: 0 },
        { name: 'responseDeadline', type: 'Date', indexed: true },
        { name: 'assignedPharmacy', type: 'ObjectId', ref: 'pharmacies' },
        { name: 'createdAt', type: 'Date', indexed: true },
        { name: 'completedAt', type: 'Date' }
      ]
    },
    {
      name: 'pharmacies',
      color: 'green',
      fields: [
        { name: '_id', type: 'ObjectId', key: true },
        { name: 'name', type: 'String', indexed: true },
        { name: 'userId', type: 'ObjectId', ref: 'users' },
        { name: 'location', type: 'GeoJSON', indexed: true },
        { name: 'phone', type: 'String' },
        { name: 'whatsapp', type: 'String' },
        { name: 'isOpen', type: 'Boolean', default: true },
        { name: 'rating', type: 'Number', default: 0 },
        { name: 'responseTime', type: 'Number', default: 0 },
        { name: 'inventory', type: 'Array[Object]' },
        { name: 'operatingHours', type: 'Object' },
        { name: 'createdAt', type: 'Date' }
      ]
    },
    {
      name: 'responses',
      color: 'yellow',
      fields: [
        { name: '_id', type: 'ObjectId', key: true },
        { name: 'requestId', type: 'ObjectId', ref: 'emergency_requests' },
        { name: 'pharmacyId', type: 'ObjectId', ref: 'pharmacies' },
        { name: 'status', type: 'Enum', values: ['confirmed', 'declined'] },
        { name: 'message', type: 'String' },
        { name: 'estimatedTime', type: 'Number' },
        { name: 'whatsappMessageId', type: 'String' },
        { name: 'createdAt', type: 'Date', indexed: true }
      ]
    },
    {
      name: 'notifications',
      color: 'purple',
      fields: [
        { name: '_id', type: 'ObjectId', key: true },
        { name: 'userId', type: 'ObjectId', ref: 'users', indexed: true },
        { name: 'type', type: 'Enum', values: ['emergency', 'response', 'escalation'] },
        { name: 'title', type: 'String' },
        { name: 'message', type: 'String' },
        { name: 'isRead', type: 'Boolean', default: false },
        { name: 'metadata', type: 'Object' },
        { name: 'createdAt', type: 'Date', indexed: true }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'border-blue-500/50 bg-blue-500/5',
      red: 'border-red-500/50 bg-red-500/5',
      green: 'border-green-500/50 bg-green-500/5',
      yellow: 'border-yellow-500/50 bg-yellow-500/5',
      purple: 'border-purple-500/50 bg-purple-500/5'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Database Schema</h1>
          <p className="text-gray-400">
            MongoDB collections and relationships for Med Connect
          </p>
        </div>

        {/* Schema Overview */}
        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6">Collections Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <div
                key={collection.name}
                className={`border-2 rounded-xl p-4 ${getColorClasses(collection.color)}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Database size={20} />
                  <h3 className="font-semibold">{collection.name}</h3>
                </div>
                <p className="text-sm text-gray-400">
                  {collection.fields.length} fields
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Schemas */}
        <div className="space-y-6">
          {collections.map((collection) => (
            <div
              key={collection.name}
              className={`border-2 rounded-xl overflow-hidden ${getColorClasses(collection.color)}`}
            >
              <div className="bg-[#1A1F28] px-6 py-4 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <Database size={24} />
                  <div>
                    <h3 className="font-bold text-lg">{collection.name}</h3>
                    <p className="text-sm text-gray-400">MongoDB Collection</p>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left py-2 px-3 text-sm font-medium text-gray-400">Field</th>
                      <th className="text-left py-2 px-3 text-sm font-medium text-gray-400">Type</th>
                      <th className="text-left py-2 px-3 text-sm font-medium text-gray-400">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {collection.fields.map((field, index) => (
                      <tr key={index} className="border-b border-gray-800/50">
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2">
                            {field.key && <Key size={14} className="text-yellow-400" />}
                            {field.ref && <Link size={14} className="text-blue-400" />}
                            <span className="font-mono text-sm">{field.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-sm text-gray-300">{field.type}</span>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex flex-wrap gap-2">
                            {field.key && (
                              <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                                Primary Key
                              </span>
                            )}
                            {field.indexed && (
                              <span className="px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded text-xs">
                                Indexed
                              </span>
                            )}
                            {field.ref && (
                              <span className="px-2 py-0.5 bg-purple-500/20 text-purple-400 rounded text-xs">
                                → {field.ref}
                              </span>
                            )}
                            {field.default !== undefined && (
                              <span className="px-2 py-0.5 bg-gray-700 text-gray-300 rounded text-xs">
                                default: {String(field.default)}
                              </span>
                            )}
                            {field.values && (
                              <span className="px-2 py-0.5 bg-gray-700 text-gray-300 rounded text-xs">
                                {field.values.join(' | ')}
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>

        {/* Indexes */}
        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6">Database Indexes</h2>
          <div className="space-y-4">
            <div className="bg-[#1A1F28] rounded-lg p-4">
              <h3 className="font-semibold mb-2">Geospatial Indexes</h3>
              <p className="text-sm text-gray-400 mb-3">For location-based queries</p>
              <div className="space-y-2">
                <code className="block px-3 py-2 bg-[#0B0F14] rounded text-sm">
                  emergency_requests.location: <span className="text-green-400">"2dsphere"</span>
                </code>
                <code className="block px-3 py-2 bg-[#0B0F14] rounded text-sm">
                  pharmacies.location: <span className="text-green-400">"2dsphere"</span>
                </code>
              </div>
            </div>

            <div className="bg-[#1A1F28] rounded-lg p-4">
              <h3 className="font-semibold mb-2">Compound Indexes</h3>
              <p className="text-sm text-gray-400 mb-3">For optimized queries</p>
              <div className="space-y-2">
                <code className="block px-3 py-2 bg-[#0B0F14] rounded text-sm">
                  emergency_requests: {'{'}status: 1, createdAt: -1{'}'}
                </code>
                <code className="block px-3 py-2 bg-[#0B0F14] rounded text-sm">
                  responses: {'{'}requestId: 1, pharmacyId: 1, createdAt: -1{'}'}
                </code>
              </div>
            </div>

            <div className="bg-[#1A1F28] rounded-lg p-4">
              <h3 className="font-semibold mb-2">TTL Indexes</h3>
              <p className="text-sm text-gray-400 mb-3">Automatic document expiration</p>
              <div className="space-y-2">
                <code className="block px-3 py-2 bg-[#0B0F14] rounded text-sm">
                  notifications.createdAt: <span className="text-yellow-400">expireAfter 30 days</span>
                </code>
              </div>
            </div>
          </div>
        </div>

        {/* Redis Patterns */}
        <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
          <h2 className="text-2xl font-semibold mb-6">Redis Cache Patterns</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#1A1F28] rounded-lg p-4">
              <h3 className="font-semibold mb-3">Session Management</h3>
              <code className="block px-3 py-2 bg-[#0B0F14] rounded text-sm mb-2">
                session:{'{'}userId{'}'} → <span className="text-blue-400">Hash</span>
              </code>
              <p className="text-xs text-gray-400">Store user session data with 24h TTL</p>
            </div>

            <div className="bg-[#1A1F28] rounded-lg p-4">
              <h3 className="font-semibold mb-3">Real-time Request Queue</h3>
              <code className="block px-3 py-2 bg-[#0B0F14] rounded text-sm mb-2">
                requests:pending → <span className="text-red-400">Sorted Set</span>
              </code>
              <p className="text-xs text-gray-400">Priority queue sorted by timestamp</p>
            </div>

            <div className="bg-[#1A1F28] rounded-lg p-4">
              <h3 className="font-semibold mb-3">Pharmacy Availability</h3>
              <code className="block px-3 py-2 bg-[#0B0F14] rounded text-sm mb-2">
                pharmacy:{'{'}id{'}'}:online → <span className="text-green-400">String</span>
              </code>
              <p className="text-xs text-gray-400">Real-time pharmacy status with 5min TTL</p>
            </div>

            <div className="bg-[#1A1F28] rounded-lg p-4">
              <h3 className="font-semibold mb-3">Rate Limiting</h3>
              <code className="block px-3 py-2 bg-[#0B0F14] rounded text-sm mb-2">
                ratelimit:{'{'}ip{'}'} → <span className="text-yellow-400">Counter</span>
              </code>
              <p className="text-xs text-gray-400">API rate limiting per IP address</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
