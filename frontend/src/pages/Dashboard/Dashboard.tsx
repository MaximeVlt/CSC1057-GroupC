import { Link } from 'react-router-dom'
import { timetable } from '../../data/timetable'
import { announcements } from '../../data/announcements'
import { events } from '../../data/events'
import './Dashboard.css'


const today = 'Mon'


const overallAttendance = 87

function Dashboard() {
  const todaysClasses = timetable.filter((c) => c.day === today)
  const unread = announcements.filter((a) => !a.read)
  const upcomingEvents = events.slice(0, 2)

  return (
    <div>
      <h1>Dashboard</h1>

      <div className="dashboard-grid">
        <section className="dashboard-card">
          <h2>Today's classes</h2>
          {todaysClasses.map((c) => (
            <div key={c.id} className="dashboard-row">
              <p className="dashboard-main">
                <span className="dashboard-time">{c.start}</span> {c.code} {c.name}
              </p>
              <p className="dashboard-sub">Room {c.room}</p>
            </div>
          ))}
          <Link to="/timetable" className="dashboard-link">View timetable</Link>
        </section>

        <section className="dashboard-card">
          <h2>Announcements</h2>
          {unread.map((a) => (
            <div key={a.id} className="dashboard-row">
              <p className="dashboard-main">
                <span className="dashboard-dot" /> {a.title}
              </p>
              <p className="dashboard-sub">{a.source}</p>
            </div>
          ))}
          <Link to="/announcements" className="dashboard-link">View all</Link>
        </section>

        <section className="dashboard-card">
          <h2>Upcoming events</h2>
          {upcomingEvents.map((e) => (
            <div key={e.id} className="dashboard-row dashboard-row-split">
              <div>
                <p className="dashboard-main">{e.title}</p>
                <p className="dashboard-sub">{e.day} {e.date}, {e.location}</p>
              </div>
              <Link to="/events" className="dashboard-button">View</Link>
            </div>
          ))}
        </section>

        <section className="dashboard-card">
          <h2>Attendance</h2>
          <p className="dashboard-big">{overallAttendance}%</p>
          <p className="dashboard-sub">overall this semester</p>
          <div className="dashboard-bar">
            <div className="dashboard-bar-fill" style={{ width: `${overallAttendance}%` }} />
          </div>
        </section>
      </div>
    </div>
  )
}

export default Dashboard