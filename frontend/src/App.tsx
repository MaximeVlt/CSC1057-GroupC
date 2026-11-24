import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import Timetable from './pages/Timetable/Timetable'
import RoomSearch from './pages/RoomSearch/RoomSearch'
import Attendance from './pages/Attendance/Attendance'
import Events from './pages/Events/Events'
import Announcements from './pages/Announcements/Announcements'
import CreatePost from './pages/CreatePost/CreatePost'

function App() {
  const auth = useAuth()
  const groups = auth.user?.profile['cognito:groups']

  const student = Array.isArray(groups) && groups.includes('student')
  const staff = Array.isArray(groups) && groups.includes('staff')
  const admin = Array.isArray(groups) && groups.includes('admin')

  const denied = <p>Access Denied</p>

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={
            admin ? <h2>Admin Dashboard</h2> :
            staff ? <Navigate to="/announcements" replace /> :
            student ? <Dashboard /> : denied
          } />
          <Route path="/timetable" element={student ? <Timetable /> : denied} />
          <Route path="/room-search" element={student ? <RoomSearch /> : denied} />
          <Route path="/attendance" element={student ? <Attendance /> : denied} />
          <Route path="/events" element={student ? <Events /> : denied} />
          <Route path="/announcements" element={student || staff ? <Announcements /> : denied} />
          <Route path="/create-post" element={staff ? <CreatePost /> : denied} />
          <Route path="/users" element={admin ? <h2>User Management (Not Implemented)</h2> : denied} />
          <Route path="/audit-log" element={admin ? <h2>Audit Log (Not Implemented)</h2> : denied} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App