import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard/Dashboard'
import Timetable from './pages/Timetable/Timetable'
import RoomSearch from './pages/RoomSearch/RoomSearch'
import Attendance from './pages/Attendance/Attendance'
import Events from './pages/Events/Events'
import Announcements from './pages/Announcements/Announcements'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
      <Route path="/"element={<Dashboard />} />
      <Route path="/timetable" element={<Timetable />} />
      <Route path="/room-search" element={<RoomSearch />} />
      <Route path="/attendance" element={<Attendance />} />
      <Route path="/events" element={<Events />} />
      <Route path="/announcements" element={<Announcements/>} />
      </Route>
    </Routes>
    </BrowserRouter>
  )
}
export default App