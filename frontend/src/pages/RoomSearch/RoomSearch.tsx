
import { useMemo, useState } from 'react'
import { timetable } from '../../data/timetable'
import type { ClassSession } from '../../data/timetable'
import './RoomSearch.css'

type Room = {
  id: string
  building: string
  capacity: number
  type: string
  features: string[]
}

const rooms: Room[] = [
  {
    id: 'L114',
    building: 'Lonsdale Building',
    capacity: 30,
    type: 'Lecture room',
    features: ['30 seats', 'Computer', 'Projector'],
  },
  {
    id: 'LIB-3',
    building: 'Library',
    capacity: 6,
    type: 'Group study',
    features: ['6 seats', 'Group study', 'Whiteboard'],
  },
  {
    id: 'QG27',
    building: 'Business School',
    capacity: 40,
    type: 'Lecture room',
    features: ['40 seats', 'Lecture room'],
  },
  {
    id: 'L025',
    building: 'Lonsdale Building',
    capacity: 25,
    type: 'Computer room',
    features: ['25 seats', 'Computer', 'Projector'],
  },
  {
    id: 'L101',
    building: 'Lonsdale Building',
    capacity: 30,
    type: 'Lecture room',
    features: ['30 seats', 'Projector'],
  },
  {
    id: 'CG86',
    building: 'Business School',
    capacity: 40,
    type: 'Lecture room',
    features: ['40 seats', 'Lecture room'],
  },
  {
    id: 'SA101',
    building: 'Glasnevin',
    capacity: 25,
    type: 'Seminar room',
    features: ['25 seats', 'Seminar room'],
  },
  {
    id: 'HG20',
    building: 'Glasnevin',
    capacity: 20,
    type: 'Seminar room',
    features: ['20 seats', 'Seminar room'],
  },
  {
    id: 'FTG11',
    building: 'Glasnevin',
    capacity: 24,
    type: 'Computer room',
    features: ['24 seats', 'Computers'],
  },
]

const days: ClassSession['day'][] = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
]

const times = [
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
]

function toMinutes(time: string) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function RoomSearch() {
  const [building, setBuilding] = useState('All buildings')
  const [capacity, setCapacity] = useState('Any')
  const [roomType, setRoomType] = useState('Any')
  const [day, setDay] = useState<ClassSession['day']>('Mon')
  const [time, setTime] = useState('12:00')

  const availableRooms = useMemo(() => {
    const selectedStart = toMinutes(time)
    const selectedEnd = selectedStart + 60

    return rooms.filter((room) => {
      const correctBuilding =
        building === 'All buildings' || room.building === building

      const correctCapacity =
        capacity === 'Any' || room.capacity >= Number(capacity)

      const correctType =
        roomType === 'Any' || room.type === roomType

      const isAvailable = !timetable.some((session) => {
        if (session.room !== room.id || session.day !== day) {
          return false
        }

        return (
          toMinutes(session.start) < selectedEnd &&
          toMinutes(session.end) > selectedStart
        )
      })

      return (
        correctBuilding &&
        correctCapacity &&
        correctType &&
        isAvailable
      )
    })
  }, [building, capacity, roomType, day, time])

  function getFreeUntil(roomId: string) {
    const selectedEnd = toMinutes(time)

    const nextClass = timetable
      .filter(
        (session) =>
          session.room === roomId &&
          session.day === day &&
          toMinutes(session.start) >= selectedEnd,
      )
      .sort(
        (a, b) =>
          toMinutes(a.start) - toMinutes(b.start),
      )[0]

    return nextClass
      ? `Free until ${nextClass.start}`
      : 'Free all day'
  }

  function resetFilters() {
    setBuilding('All buildings')
    setCapacity('Any')
    setRoomType('Any')
    setDay('Mon')
    setTime('12:00')
  }

  return (
    <div className="room-search-page">

      <div className="room-search-top">
        <div>
          <h1 className="room-search-title">Room search</h1>
          <p className="room-search-subtitle">
            Find a free room to study or work in
          </p>
        </div>
      </div>

      <section className="room-search-filters">

        <label className="room-filter">
          <span>Building</span>
          <select
            value={building}
            onChange={(e) => setBuilding(e.target.value)}
          >
            <option>All buildings</option>
            <option>Lonsdale Building</option>
            <option>Library</option>
            <option>Business School</option>
            <option>Glasnevin</option>
          </select>
        </label>

        <label className="room-filter">
          <span>Capacity</span>
          <select
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          >
            <option value="Any">Any capacity</option>
            <option value="4">4+ people</option>
            <option value="10">10+ people</option>
            <option value="20">20+ people</option>
            <option value="30">30+ people</option>
          </select>
        </label>

        <label className="room-filter">
          <span>Room type</span>
          <select
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option value="Any">Any</option>
            <option value="Group study">Group study</option>
            <option value="Lecture room">Lecture room</option>
            <option value="Computer room">Computer room</option>
            <option value="Seminar room">Seminar room</option>
          </select>
        </label>

        <label className="room-filter">
          <span>Day</span>
          <select
            value={day}
            onChange={(e) =>
              setDay(e.target.value as ClassSession['day'])
            }
          >
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </label>

        <label className="room-filter">
          <span>When</span>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            {times.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <div className="room-filter-actions">
          <button
            className="room-search-button"
            onClick={() => {
              // Results update automatically when filters change.
            }}
          >
            Search
          </button>

          <button
            className="room-reset-button"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>

      </section>

      <div className="room-results-heading">
        <h2>
          {availableRooms.length} rooms available
        </h2>
        <span>
          {day} at {time} · 1-hour time slot
        </span>
      </div>

      {availableRooms.length > 0 ? (
        <div className="room-results-list">

          {availableRooms.map((room) => (
            <article
              className="room-result-card"
              key={room.id}
            >
              <div className="room-result-info">
                <h3>
                  {room.id}, {room.building}
                </h3>

                <p>
                  {room.features.join(', ')}
                </p>

                <span className="room-type-label">
                  {room.type}
                </span>
              </div>

              <span className="room-availability">
                {getFreeUntil(room.id)}
              </span>
            </article>
          ))}

        </div>
      ) : (
        <div className="room-empty-state">
          <h3>No available rooms found</h3>
          <p>
            Try changing the building, capacity,
            room type or selected time.
          </p>

          <button
            className="room-reset-button"
            onClick={resetFilters}
          >
            Clear filters
          </button>
        </div>
      )}

    </div>
  )
}

export default RoomSearch
