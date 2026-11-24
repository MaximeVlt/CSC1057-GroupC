import { useMemo, useState } from 'react'
import { timetable } from '../../data/timetable'
import './RoomSearch.css'

type Room = {
  id: string
  name: string
  building: string
  capacity: number
  type: string
  features: string[]
}

const rooms: Room[] = [
  {
    id: 'LIBRARY',
    name: 'Library',
    building: 'Library',
    capacity: 6,
    type: 'Group study',
    features: ['Group study']
  },
  {
    id: 'L101',
    name: 'L101',
    building: 'McNulty',
    capacity: 30,
    type: 'Computer room',
    features: ['Computers']
  },
  {
    id: 'L114',
    name: 'L114',
    building: 'McNulty',
    capacity: 30,
    type: 'Computer room',
    features: ['Computers']
  },
  {
    id: 'CG86',
    name: 'CG86',
    building: 'Henry Grattan',
    capacity: 40,
    type: 'Lecture room',
    features: ['Lecture room']
  },
  {
    id: 'SA101',
    name: 'SA101',
    building: 'Stokes',
    capacity: 40,
    type: 'Lecture room',
    features: ['Lecture room']
  },
  {
    id: 'HG20',
    name: 'HG20',
    building: 'Nursing Building',
    capacity: 40,
    type: 'Lecture room',
    features: ['Lecture room']
  },
  {
    id: 'FTG11',
    name: 'FTG11',
    building: 'Polaris',
    capacity: 40,
    type: 'Lecture room',
    features: ['Lecture room']
  },
  {
    id: 'QG27',
    name: 'QG27',
    building: 'Business School',
    capacity: 40,
    type: 'Lecture room',
    features: ['Lecture room']
  },
]

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const

const buildings = [
  'Any building',
  'Library',
  'McNulty',
  'Henry Grattan',
  'Stokes',
  'Nursing Building',
  'Polaris',
  'Business School',
]

const timeOptions = [
  { value: '09:00', label: '09:00' },
  { value: '10:00', label: '10:00' },
  { value: '11:00', label: '11:00' },
  { value: '12:00', label: '12:00' },
  { value: '13:00', label: '13:00' },
  { value: '14:00', label: '14:00' },
  { value: '15:00', label: '15:00' },
  { value: '16:00', label: '16:00' },
]

function minutes(time: string) {
  const [hours, mins] = time.split(':').map(Number)
  return hours * 60 + mins
}

// Checks whether two time periods overlap.
// A class ending exactly when the search starts is not an overlap.
function hasTimeOverlap(
  classStart: string,
  classEnd: string,
  searchStart: number,
  searchEnd: number
) {
  return (
    minutes(classStart) < searchEnd &&
    minutes(classEnd) > searchStart
  )
}

function RoomSearch() {
  const [building, setBuilding] = useState('Any building')
  const [capacity, setCapacity] = useState('Any')
  const [roomType, setRoomType] = useState('Any')
  const [day, setDay] = useState<(typeof days)[number]>('Mon')
  const [time, setTime] = useState('12:00')
  const [searched, setSearched] = useState(true)

  const availableRooms = useMemo(() => {
    const searchStart = minutes(time)
    const searchEnd = searchStart + 60

    return rooms.filter((room) => {
      const buildingMatches =
        building === 'Any building' || room.building === building

      const capacityMatches =
        capacity === 'Any' || room.capacity >= Number(capacity)

      const typeMatches =
        roomType === 'Any' || room.type === roomType

      const hasNoScheduledClass = !timetable.some((session) => {
        if (session.room !== room.id || session.day !== day) {
          return false
        }

        return hasTimeOverlap(
          session.start,
          session.end,
          searchStart,
          searchEnd
        )
      })

      return (
        buildingMatches &&
        capacityMatches &&
        typeMatches &&
        hasNoScheduledClass
      )
    })
  }, [building, capacity, roomType, day, time])

  function nextBooking(roomId: string) {
    const searchEnd = minutes(time) + 60

    const next = timetable
      .filter(
        (session) =>
          session.room === roomId &&
          session.day === day &&
          minutes(session.start) >= searchEnd
      )
      .sort(
        (a, b) => minutes(a.start) - minutes(b.start)
      )[0]

    return next
      ? `Next class at ${next.start}`
      : 'No later class scheduled'
  }

  function resetFilters() {
    setBuilding('Any building')
    setCapacity('Any')
    setRoomType('Any')
    setDay('Mon')
    setTime('12:00')
    setSearched(true)
  }

  return (
    <div className="room-search-page">
      <h1 className="room-search-title">Room search</h1>
      <p className="room-search-subtitle">
        Find a free room to study or work in
      </p>

      <section
        className="room-search-panel"
        aria-label="Room search filters"
      >
        <label className="room-filter">
          <span>Building</span>
          <select
            value={building}
            onChange={(event) => setBuilding(event.target.value)}
          >
            {buildings.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="room-filter">
          <span>Capacity</span>
          <select
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
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
            onChange={(event) => setRoomType(event.target.value)}
          >
            <option value="Any">Any</option>
            <option value="Group study">Group study</option>
            <option value="Computer room">Computer room</option>
            <option value="Lecture room">Lecture room</option>
          </select>
        </label>

        <label className="room-filter">
          <span>Day</span>
          <select
            value={day}
            onChange={(event) =>
              setDay(event.target.value as (typeof days)[number])
            }
          >
            {days.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="room-filter">
          <span>When</span>
          <select
            value={time}
            onChange={(event) => setTime(event.target.value)}
          >
            {timeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="room-filter-actions">
          <button
            className="room-search-button"
            onClick={() => setSearched(true)}
          >
            ⌕ Search
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
          {availableRooms.length}{' '}
          {availableRooms.length === 1 ? 'room' : 'rooms'} available
        </h2>
        <span>{day} at {time} · 1-hour slot</span>
      </div>

      {searched && availableRooms.length > 0 ? (
        <div className="room-results-list">
          {availableRooms.map((room) => (
            <article className="room-result-card" key={room.id}>
              <div className="room-result-icon" aria-hidden="true">
                ▦
              </div>

              <div className="room-result-info">
                <h3>
                  {room.name}, {room.building}
                </h3>
                <p>
                  {room.capacity} seats · {room.features.join(', ')}
                </p>
                <span className="room-type-label">
                  {room.type}
                </span>
              </div>

              <span className="room-availability">
                {nextBooking(room.id)}
              </span>
            </article>
          ))}
        </div>
      ) : (
        <div className="room-empty-state">
          <strong>No rooms match these filters.</strong>
          <p>Try another building, room type or time slot.</p>
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
