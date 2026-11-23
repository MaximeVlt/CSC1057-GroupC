import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import type { SidebarLink } from './Sidebar'
import './Layout.css'

const studentLinks: SidebarLink[] = [
    { label: 'Dashboard', path: '/'},
    { label: 'Timetable', path: '/timetable'},
    { label: 'Room search', path: '/room-search'},
    { label: 'Attendance', path: '/attendance'},
    { label: 'Events', path: '/events'},
    { label: 'Announcements', path: '/announcements'},
    // Staff only: hide for students once Cognito roles are wired in (KAN-26)
    { label: 'Create post', path: '/create-post'},
]
function Layout() {
    return (
     <div>
        < Header userName="Rachel" />
        <div className="layout-body">
        <Sidebar links={studentLinks} />
        <main className="layout-content">
          <Outlet />
        </main>
        </div>
    </div>

    )
}
export default Layout