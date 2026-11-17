import { useState } from 'react'
import { events } from '../../data/events'
import './Events.css'

const categories = ['All', 'Careers', 'Societies', 'Sport', 'Academic']

function Events() {
  const [category, setCategory] = useState('All')
  const [interested, setInterested] = useState<number[]>([])

  const visible = events.filter((e) => category === 'All' || e.category === category)

  function toggleInterested(id: number) {
    if (interested.includes(id)) {
      setInterested(interested.filter((x) => x !== id))
    } else {
      setInterested([...interested, id])
    }
  }

  return (
    <div>
      <h1 className="events-title">Events</h1>
      <p className="events-subtitle">What's happening on campus</p>

      <div className="events-filters">
        {categories.map((c) => (
          <button
            key={c}
            className={category === c ? 'filter-pill active' : 'filter-pill'}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="events-count">
        {visible.length} upcoming {visible.length === 1 ? 'event' : 'events'}
      </p>

      <div className="events-list">
        {visible.map((e) => {
          const [dayNumber, month] = e.date.split(' ')
          const isInterested = interested.includes(e.id)

          return (
            <div key={e.id} className="event-card">
              <div className="event-date">
                <span className="event-date-day">{e.day}</span>
                <span className="event-date-number">{dayNumber}</span>
                <span className="event-date-month">{month}</span>
              </div>

              <div className="event-info">
                <p className="event-name">
                  {e.title}
                  <span className={`event-tag tag-${e.category.toLowerCase()}`}>{e.category}</span>
                </p>
                <p className="event-details">{e.time} · {e.location}</p>
                <p className="event-description">{e.description}</p>
              </div>

              <button
                className={isInterested ? 'event-button interested' : 'event-button'}
                onClick={() => toggleInterested(e.id)}
              >
                {isInterested ? 'Interested ✓' : 'Interested'}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Events