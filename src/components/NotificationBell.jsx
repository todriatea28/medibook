import React, { useState } from 'react';
import { useMediStore } from '../store/useMediStore'; // შენი სთეიტის იმპორტი

export default function NotificationBell() {
  const { notifications } = useMediStore(); // ვიღებთ შეტყობინებებს სთეიტიდან
  const [isOpen, setIsOpen] = useState(false);
  const [readIds, setReadIds] = useState([]); // შენახული წაკითხული ID-ები

  const markAsRead = (id) => {
    if (!readIds.includes(id)) {
      setReadIds([...readIds, id]);
    }
  };

  // ვითვლით წაუკითხავებს (ყველა ის, რომელიც არ არის readIds სიაში)
  const unreadCount = notifications.filter(n => !readIds.includes(n.id)).length;

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
              notifications.map((item) => {
                const isRead = readIds.includes(item.id);
                return (
                  <div 
                    key={item.id} 
                    onClick={() => markAsRead(item.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition ${
                      isRead 
                        ? 'bg-stone-50 border-stone-200 text-stone-600' 
                        : 'bg-rose-50/50 border-rose-200 text-stone-900 font-medium'
                    }`}
                  >
                    <p className="font-bold text-rose-900 mb-0.5">{item.text}</p>
                    <p className="text-[10px] text-stone-400">{item.time}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}