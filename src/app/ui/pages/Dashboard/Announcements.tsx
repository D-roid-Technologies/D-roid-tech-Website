import React, { useState } from 'react';
import { Bell, Clock, Calendar, Tag, Trash2, CheckCheck } from 'lucide-react';
import styles from './Notifications.module.css';
import { useSelector, useDispatch } from "react-redux";
import { removeAnnouncement, markAsRead } from "../../../redux/slices/Annoucements";
import { RootState } from "../../../redux/Store";
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
 
  
    const announcements = useSelector(
    (state: RootState) => state.announcements || []
  );
  const dispatch = useDispatch();



  const handleMarkAsRead = (id: number) => {
    dispatch(markAsRead(id));
  };

  const handleRemoveAnnouncement = (id: number) => {
    dispatch(removeAnnouncement(id));
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
