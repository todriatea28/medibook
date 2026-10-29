import { useState } from 'react';
import { Bell } from 'lucide-react';
import { useNotifications } from '../hooks/useNotifications';

const fmt = (iso) =>
  new Date(iso).toLocaleString('ka-GE', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 transition text-slate-600 hover:text-teal-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
        aria-label="შეტყობინებები"
        aria-expanded={isOpen}
      >
        <Bell size={18} aria-hidden="true" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-md">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 p-4 mt-3 space-y-3 bg-white border shadow-2xl w-80 border-slate-200 rounded-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200">
            <h4 className="text-xs font-bold text-slate-900">შეტყობინებები</h4>
            <span className="text-[10px] text-slate-400">{notifications.length} სულ</span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-64">
            {notifications.length === 0 ? (
              <p className="py-4 text-xs text-center text-slate-400">შეტყობინებები არ არის.</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => !n.is_read && markAsRead(n.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                    n.is_read
                      ? 'bg-slate-50 border-slate-200 text-slate-600'
                      : 'bg-teal-50 border-teal-200 text-slate-900 font-medium'
                  }`}
                >
                  <p className="mb-0.5">{n.text}</p>
                  <p className="text-[10px] text-slate-400">{fmt(n.created_at)}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}