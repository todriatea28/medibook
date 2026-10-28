import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

export default function NotificationBell() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) return;
    fetchNotifications();
  }, [user]);

  const fetchNotifications = async () => {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (!error) {
      setNotifications(data || []);
    }
  };

  const markAsRead = async (id) => {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('id', id);
    
    setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="relative">
      {/* ზარის ხატულა */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 transition text-stone-600 hover:text-rose-900 bg-stone-100 hover:bg-stone-200 rounded-xl"
        aria-label="შეტყობინებები"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-900 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-md">
            {unreadCount}
          </span>
        )}
      </button>

      {/* ჩამოსაშლელი სია */}
      {isOpen && (
        <div className="absolute right-0 z-50 p-4 mt-3 space-y-3 border shadow-2xl w-80 bg-white/95 backdrop-blur-xl border-stone-200 rounded-2xl">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <h4 className="text-xs font-bold text-stone-900">შეტყობინებები</h4>
            <span className="text-[10px] text-stone-400">{notifications.length} სულ</span>
          </div>

          <div className="space-y-2 overflow-y-auto max-h-64">
            {notifications.length === 0 ? (
              <p className="py-4 text-xs text-center text-stone-400">შეტყობინებები არ არის.</p>
            ) : (
              notifications.map((item) => (
                <div 
                  key={item.id} 
                  onClick={() => markAsRead(item.id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                    item.is_read 
                      ? 'bg-stone-50 border-stone-200 text-stone-600' 
                      : 'bg-rose-50/50 border-rose-200 text-stone-900 font-medium'
                  }`}
                >
                  <p className="font-bold text-rose-900 mb-0.5">{item.title}</p>
                  <p>{item.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}