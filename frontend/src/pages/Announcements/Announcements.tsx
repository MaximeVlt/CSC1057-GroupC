import { useState } from 'react'
import './Announcements.css'
const announcements = [
    {
        id: 1,
        title: 'Exam timetable released',
        message: 'The semester 1 exam timetable is now available.',
        source: 'Registry',
        read: false,
    },

    {
        id: 2,
        title: 'CSC1057 lecture moved to QG25',
        message: 'This Thursday the lecture will be in QG25 instead of QG27.',
        source: 'CSC1057',
        read: false,
    },

    {
        id: 3,
        title: 'Library hours extended',
        message: 'The library will be open till midnight during exams.',
        source: 'Library',
        read: true,
    },
]
function Announcements() {
    const [filter, setFilter] = useState('all')

    const visible = announcements.filter((item) =>{
        if (filter ==='unread') return !item.read
        return true
    })
    return (
        <div>
            <h1>Announcements</h1>
            <div className="announcements-filters">
            <button
                className={filter === 'all' ? 'filter-pill active': 'filter-pill'}
                onClick={() => setFilter('all')}
            >
            All
            </button>
            <button
                className={filter === 'unread' ? 'filter-pill active': 'filter-pill'}
                onClick={() => setFilter('unread')}
            >
            Unread 
            </button>
            </div>
            
            <div className="announcements-list">
              {visible.map((item) => (
                <div 
                key={item.id} 
                className={item.read ? 'announcement-card': 'announcement-card unread'}
                >
                    <h3 className = "announcement-title"> {item.title}</h3>
                    <p className = "announcement-message">{item.message}</p>
                    <p className = "announcement-source">{item.source}</p>
                </div>
                ))}
               </div>
            </div>
            )
        }
export default Announcements