import { X, Bell, CheckCircle, AlertTriangle, Info, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface NotificationPanelProps {
  onClose: () => void;
}

export function NotificationPanel({ onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Order Delivered',
      message: 'Your medicine order has been delivered successfully',
      time: '5 min ago',
      read: false
    },
    {
      id: 2,
      type: 'info',
      title: 'New Pharmacy Available',
      message: 'Apollo Pharmacy is now available in your area',
      time: '1 hour ago',
      read: false
    },
    {
      id: 3,
      type: 'warning',
      title: 'Emergency Alert',
      message: 'Response time exceeded for your request',
      time: '2 hours ago',
      read: true
    },
    {
      id: 4,
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile information has been updated',
      time: '1 day ago',
      read: true
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="text-green-400" size={20} />;
      case 'warning':
        return <AlertTriangle className="text-yellow-400" size={20} />;
      case 'info':
        return <Info className="text-blue-400" size={20} />;
      default:
        return <Bell className="text-gray-400" size={20} />;
    }
  };

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 bg-black/50 backdrop-blur-sm">
      <motion.div
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        className="bg-[#12161D] border border-gray-800 rounded-2xl w-full max-w-md shadow-2xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-bold">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-sm text-gray-400">{unreadCount} unread</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Actions */}
        {notifications.length > 0 && (
          <div className="px-6 py-3 border-b border-gray-800">
            <button
              onClick={handleMarkAllRead}
              className="text-sm text-green-400 hover:text-green-300"
            >
              Mark all as read
            </button>
          </div>
        )}

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`p-4 rounded-xl transition-all hover:bg-[#1A1F28] ${
                  notification.read ? 'bg-[#0B0F14]' : 'bg-[#1A1F28] border border-green-500/20'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-sm">{notification.title}</h3>
                      <button
                        onClick={() => handleDelete(notification.id)}
                        className="p-1 hover:bg-red-500/10 rounded transition-colors"
                      >
                        <Trash2 size={14} className="text-gray-500 hover:text-red-400" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-400 mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.time}</p>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12">
              <Bell className="text-gray-600 mx-auto mb-4" size={48} />
              <p className="text-gray-400">No notifications</p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
