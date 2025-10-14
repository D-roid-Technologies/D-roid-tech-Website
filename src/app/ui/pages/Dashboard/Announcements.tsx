import React, { useState } from 'react';
import { Bell, Clock, Calendar, Tag, Trash2, CheckCheck } from 'lucide-react';
import styles from './Notifications.module.css';

interface Announcement {
  id: number;
  title: string;
  message: string;
  date: string;
  time: string;
  type: string;
  isRead: boolean;
}

type FilterType = 'all' | 'unread' | 'read';

const Notifications: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    {
      id: 1,
      title: 'System Maintenance Scheduled',
      message: 'We will be performing scheduled maintenance on our servers. Please save your work accordingly.',
      date: '2025-10-14',
      time: '10:30 AM',
      type: 'System',
      isRead: false,
    },
    {
      id: 2,
      title: 'New Feature Released',
      message: 'Check out our latest feature update that includes dark mode support and improved performance.',
      date: '2025-10-13',
      time: '2:15 PM',
      type: 'Feature',
      isRead: false,
    },
    {
      id: 3,
      title: 'Monthly Report Available',
      message: 'Your monthly analytics report is now ready to view. Access it from your dashboard.',
      date: '2025-10-12',
      time: '9:00 AM',
      type: 'Report',
      isRead: true,
    },
    {
      id: 4,
      title: 'Security Update',
      message: 'We have implemented new security measures to keep your account safe. No action required.',
      date: '2025-10-11',
      time: '4:45 PM',
      type: 'Security',
      isRead: true,
    },
  ]);

  const handleRemoveAnnouncement = (id: number) => {
    setAnnouncements(announcements.filter(a => a.id !== id));
  };

  const handleMarkAsRead = (id: number) => {
    setAnnouncements(
      announcements.map(a => (a.id === id ? { ...a, isRead: true } : a))
    );
  };

  const filteredAnnouncements = announcements.filter(a => {
    if (activeFilter === 'unread') return !a.isRead;
    if (activeFilter === 'read') return a.isRead;
    return true;
  });

  const unreadCount = announcements.filter(a => !a.isRead).length;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Notifications</h1>
        <p className={styles.subtitle}>
          {unreadCount > 0
            ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
            : 'All caught up!'}
        </p>
      </div>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${activeFilter === 'all' ? styles.active : ''}`}
          onClick={() => setActiveFilter('all')}
        >
          All ({announcements.length})
        </button>
        <button
          className={`${styles.tab} ${activeFilter === 'unread' ? styles.active : ''}`}
          onClick={() => setActiveFilter('unread')}
        >
          Unread ({unreadCount})
        </button>
        <button
          className={`${styles.tab} ${activeFilter === 'read' ? styles.active : ''}`}
          onClick={() => setActiveFilter('read')}
        >
          Read ({announcements.length - unreadCount})
        </button>
      </div>

      {filteredAnnouncements.length === 0 ? (
        <div className={styles.emptyState}>
          <Bell className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>No notifications</h3>
          <p className={styles.emptyMessage}>
            {activeFilter === 'unread'
              ? 'You have no unread notifications'
              : activeFilter === 'read'
              ? 'You have no read notifications'
              : 'You have no notifications at this time'}
          </p>
        </div>
      ) : (
        <div className={styles.notificationsList}>
          {filteredAnnouncements.map(announcement => (
            <div
              key={announcement.id}
              className={`${styles.notificationCard} ${
                !announcement.isRead ? styles.unread : ''
              }`}
            >
              <div className={styles.notificationHeader}>
                <h2 className={styles.notificationTitle}>{announcement.title}</h2>
                <div
                  className={`${styles.statusBadge} ${
                    announcement.isRead ? styles.read : styles.unread
                  }`}
                >
                  <span
                    className={`${styles.statusDot} ${
                      announcement.isRead ? styles.read : styles.unread
                    }`}
                  ></span>
                  {announcement.isRead ? 'Read' : 'Unread'}
                </div>
              </div>

              <p className={styles.notificationMessage}>{announcement.message}</p>

              <div className={styles.notificationMeta}>
                <div className={styles.metaItem}>
                  <Calendar className={styles.metaIcon} />
                  <span>{announcement.date}</span>
                </div>
                <div className={styles.metaItem}>
                  <Clock className={styles.metaIcon} />
                  <span>{announcement.time}</span>
                </div>
                <div className={styles.typeBadge}>
                  <Tag className={styles.metaIcon} />
                  <span>{announcement.type}</span>
                </div>
              </div>

              <div className={styles.actions}>
                {!announcement.isRead && (
                  <button
                    onClick={() => handleMarkAsRead(announcement.id)}
                    className={`${styles.actionButton} ${styles.markReadButton}`}
                  >
                    <CheckCheck size={16} />
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleRemoveAnnouncement(announcement.id)}
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
