import { useState } from 'react'
import { timetable } from '../../data/timetable'
import type { ClassSession } from '../../data/timetable'
import './Timetable.css'

const days: ClassSession['day'][] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const firstHour = 9
const lastHour = 17
const hours = Array.from({ length: lastHour - firstHour }, (_, i) => firstHour + i)


const moduleColours: Record<string, string> = {
  CSC1202: 'purple',
  CSC1041: 'blue',
  CSC1058: 'pink',
  CSC1201: 'green',
  CSC1057: 'orange',
}

const keyDates = [
  { label: 'Reading week', date: '2-6 Nov' },
  { label: 'Exams start', date: '7 Dec' },
]


function hourOf(time: string) {
  return Number(time.split(':')[0])
}

function Timetable() {
  const [view, setView] = useState<'week' | 'day'>('week')
  const [dayIndex, setDayIndex] = useState(0)

  const selectedDay = days[dayIndex]
  const dayClasses = timetable.filter((c) => c.day === selectedDay)

  const modules = timetable.filter(
    (c, i) => timetable.findIndex((other) => other.code === c.code) === i,
  )

  return (
    <div>
      <div className="timetable-top">
        <div>
          <h1 className="timetable-title">Timetable</h1>
          <p className="timetable-subtitle">
            {view === 'week' ? 'Week 6 · 19-23 Oct' : `${selectedDay}, week 6`}
          </p>
        </div>

        <div className="timetable-controls">
          {view === 'day' && (
            <button
              className="filter-pill"
              onClick={() => setDayIndex(Math.max(0, dayIndex - 1))}
              aria-label="Previous day"
            >
              &lt;
            </button>
          )}
          <button
            className={view === 'day' ? 'filter-pill active' : 'filter-pill'}
            onClick={() => setView('day')}
          >
            Day
          </button>
          <button
            className={view === 'week' ? 'filter-pill active' : 'filter-pill'}
            onClick={() => setView('week')}
          >
            Week
          </button>
          {view === 'day' && (
            <button
              className="filter-pill"
              onClick={() => setDayIndex(Math.min(days.length - 1, dayIndex + 1))}
              aria-label="Next day"
            >
              &gt;
            </button>
          )}
        </div>
      </div>

      {view === 'week' ? (
        <div className="timetable-grid">
          <div />
          {days.map((d) => (
            <div key={d} className="timetable-day">{d}</div>
          ))}

          {hours.map((h, row) =>
            [
              <div key={`t${h}`} className="timetable-time" style={{ gridRow: row + 2 }}>
                {h}:00
              </div>,
              ...days.map((d, col) => (
                <div
                  key={`${d}${h}`}
                  className="timetable-cell"
                  style={{ gridRow: row + 2, gridColumn: col + 2 }}
                />
              )),
            ],
          )}

          {timetable.map((c) => (
            <div
              key={c.id}
              className={`timetable-block colour-${moduleColours[c.code]}`}
              style={{
                gridColumn: days.indexOf(c.day) + 2,
                gridRow: `${hourOf(c.start) - firstHour + 2} / span ${hourOf(c.end) - hourOf(c.start)}`,
              }}
            >
              <strong>{c.code}</strong>
              <span>{c.room}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="timetable-daylist">
          {dayClasses.length === 0 && <p className="timetable-empty">No classes on this day.</p>}
          {dayClasses.map((c) => (
            <div key={c.id} className={`timetable-dayitem colour-${moduleColours[c.code]}`}>
              <span className="timetable-daytime">{c.start}-{c.end}</span>
              <span>
                <strong>{c.code}</strong> {c.name}
              </span>
              <span>Room {c.room}</span>
            </div>
          ))}
        </div>
      )}

      <div className="timetable-bottom">
        <div className="timetable-legend">
          {modules.map((m) => (
            <div key={m.code} className="timetable-legend-item">
              <span className={`timetable-legend-dot colour-${moduleColours[m.code]}`} />
              {m.code} {m.name}
            </div>
          ))}
        </div>

        <div className="timetable-keydates">
          <h3>Key dates</h3>
          {keyDates.map((k) => (
            <div key={k.label} className="timetable-keydate">
              <span>{k.label}</span>
              <span>{k.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Timetable