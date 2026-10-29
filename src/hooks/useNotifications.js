import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import { useAuth } from '../context/AuthContext';

export function useNotifications() {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);

  const load = useCallback(async () => {
    if (!user) return setNotifications([]);
    const { data } = await supabase
      .from('notifications')
      .select('id, text, is_read, created_at')
      .order('created_at', { ascending: false })
      .limit(30);
    setNotifications(data ?? []);
  }, [user]);

  useEffect(() => {
    load();
    if (!user) return;

    const channel = supabase
      .channel(`notif-${user.id}-${Math.random().toString(36).slice(2)}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${user.id}` },
        (payload) => setNotifications((list) => [payload.new, ...list])
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, load]);
}