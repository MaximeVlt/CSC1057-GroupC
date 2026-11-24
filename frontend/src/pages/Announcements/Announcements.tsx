import { useEffect, useState } from 'react'
import { fetchAnnouncements, loadReadIds, saveReadIds, type Announcement } from '../../api/announcements'
import './Announcements.css'

function Announcements() {
    const [filter, setFilter] = useState('all')
    const [items, setItems] = useState<Announcement[]>([])
    const [loading, setLoading] = useState(true)
    const [live, setLive] = useState(false)
    const [readIds, setReadIds] = useState<Set<string>>(loadReadIds)

    useEffect(() => {
        fetchAnnouncements().then((result) => {
            setItems(result.items)
            setLive(result.live)
            setLoading(false)
        })
    }, [])

    function markRead(id: string) {
        if (readIds.has(id)) return
        const next = new Set(readIds).add(id)
        setReadIds(next)
        saveReadIds(next)
    }

    const visible = items.filter((item) => {
        if (filter === 'unread') return !readIds.has(item.id)
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

            {!loading && !live && (
                <p className="announcements-notice">Showing sample announcements (live service unavailable).</p>
            )}

            <div className="announcements-list">
              {loading && <p className="announcements-notice">Loading announcements…</p>}
              {!loading && visible.length === 0 && (
                <p className="announcements-notice">No announcements to show.</p>
              )}
              {visible.map((item) => (
                <div
                key={item.id}
                className={readIds.has(item.id) ? 'announcement-card': 'announcement-card unread'}
                onClick={() => markRead(item.id)}
                >
                    <h3 className = "announcement-title"> {item.title}</h3>
                    <p className = "announcement-message">{item.message}</p>
                    <p className = "announcement-source">
                        {item.source}
                        {item.createdAt && ` · ${new Date(item.createdAt).toLocaleDateString('en-IE', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`}
                    </p>
                </div>
                ))}
               </div>
            </div>
            )
        }
export default Announcements
