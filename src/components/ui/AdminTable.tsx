import { CheckCircle, XCircle, Clock, TrendingUp, TrendingDown } from 'lucide-react';

interface EmergencyRequest {
  id: string;
  patient: string;
  medicine: string;
  status: 'pending' | 'confirmed' | 'declined' | 'completed';
  responseTime: number;
  pharmacy: string;
  timestamp: string;
}

export function AdminTable() {
  const mockRequests: EmergencyRequest[] = [
    {
      id: 'ER-2401',
      patient: 'Raj Kumar',
      medicine: 'Insulin',
      status: 'completed',
      responseTime: 4,
      pharmacy: 'Apollo Pharmacy',
      timestamp: '10 min ago'
    },
    {
      id: 'ER-2402',
      patient: 'Priya Sharma',
      medicine: 'Aspirin',
      status: 'confirmed',
      responseTime: 2,
      pharmacy: 'MedPlus',
      timestamp: '5 min ago'
    },
    {
      id: 'ER-2403',
      patient: 'Amit Patel',
      medicine: 'Antibiotics',
      status: 'pending',
      responseTime: 0,
      pharmacy: '-',
      timestamp: '1 min ago'
    },
    {
      id: 'ER-2404',
      patient: 'Sneha Reddy',
      medicine: 'Pain Relief',
      status: 'declined',
      responseTime: 8,
      pharmacy: 'Wellness Forever',
      timestamp: '15 min ago'
    }
  ];

  const getStatusBadge = (status: EmergencyRequest['status']) => {
    const styles = {
      completed: 'bg-green-500/20 text-green-400 border-green-500/30',
      confirmed: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      pending: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      declined: 'bg-red-500/20 text-red-400 border-red-500/30'
    };

    const icons = {
      completed: <CheckCircle size={14} />,
      confirmed: <Clock size={14} />,
      pending: <Clock size={14} />,
      declined: <XCircle size={14} />
    };

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${styles[status]}`}>
        {icons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="bg-[#12161D] border border-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-1">Emergency Requests</h3>
            <p className="text-sm text-gray-400">Real-time monitoring dashboard</p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-green-400" size={16} />
              <span className="text-gray-400">92% Success Rate</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="text-blue-400" size={16} />
              <span className="text-gray-400">4.2 min avg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#1A1F28]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Request ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Medicine
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Response Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Pharmacy
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {mockRequests.map((request) => (
              <tr key={request.id} className="hover:bg-[#1A1F28] transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="font-mono text-sm text-green-400">{request.id}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm">{request.patient}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm">{request.medicine}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {getStatusBadge(request.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {request.responseTime > 0 ? (
                      <>
                        <span className="text-sm">{request.responseTime} min</span>
                        {request.responseTime <= 5 ? (
                          <TrendingUp className="text-green-400" size={14} />
                        ) : (
                          <TrendingDown className="text-yellow-400" size={14} />
                        )}
                      </>
                    ) : (
                      <span className="text-sm text-gray-500">-</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-300">{request.pharmacy}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-500">{request.timestamp}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-800 flex items-center justify-between text-sm text-gray-400">
        <span>Showing 4 of 156 requests</span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-gray-700 hover:bg-gray-800 rounded transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 bg-green-500 text-white rounded">
            1
          </button>
          <button className="px-3 py-1 border border-gray-700 hover:bg-gray-800 rounded transition-colors">
            2
          </button>
          <button className="px-3 py-1 border border-gray-700 hover:bg-gray-800 rounded transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
