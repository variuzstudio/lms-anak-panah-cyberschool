import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

// Define Notification interface locally to avoid circular dependency
export interface Notification {
  id: string;
  userId: string;
  userRole: 'admin' | 'guru' | 'murid' | 'orangtua';
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  category: 'tugas' | 'ujian' | 'nilai' | 'pembayaran' | 'pengumuman' | 'absensi';
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Mock notifications
const mockNotifications: Notification[] = [
  {
    id: 'NOT001',
    userId: 'S001',
    userRole: 'murid',
    title: 'Tugas Baru: Matematika',
    message: 'Tugas baru telah diberikan untuk mata pelajaran Matematika. Deadline: 10 Februari 2026',
    type: 'info',
    category: 'tugas',
    read: false,
    createdAt: '2026-02-06T09:00:00Z',
    actionUrl: '/tugas'
  }
];

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  deleteNotification: (id: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Load notifications untuk user yang login
    if (user) {
      const userNotifications = mockNotifications.filter(
        n => n.userId === user.id || n.userId === user.studentId
      );
      setNotifications(userNotifications);

      // Simulasi push notification untuk notifikasi baru
      const unreadNotifications = userNotifications.filter(n => !n.read);
      if (unreadNotifications.length > 0 && 'Notification' in window) {
        // Request permission untuk browser notifications
        if (window.Notification.permission === 'default') {
          window.Notification.requestPermission();
        }
      }
    }
  }, [user]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    toast.success('Semua notifikasi telah dibaca');
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `NOT${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false
    };

    setNotifications([newNotification, ...notifications]);

    // Show toast notification
    toast(notification.title, {
      description: notification.message,
      duration: 5000
    });

    // Show browser notification if permitted
    if ('Notification' in window && window.Notification.permission === 'granted') {
      new window.Notification(notification.title, {
        body: notification.message,
        icon: '/icon.png',
        badge: '/badge.png',
        tag: newNotification.id
      });
    }
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <NotificationContext.Provider value={{
      notifications,
      unreadCount,
      markAsRead,
      markAllAsRead,
      addNotification,
      deleteNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}