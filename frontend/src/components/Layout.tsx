import { Outlet } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'
import Header from './Header'
import Sidebar from './Sidebar'
import type { SidebarLink } from './Sidebar'
import './Layout.css'

const studentLinks: SidebarLink[] = [
    { label: 'Dashboard', path: '/' },
    { label: 'Timetable', path: '/timetable' },
    { label: 'Room search', path: '/room-search' },
    { label: 'Attendance', path: '/attendance' },
    { label: 'Events', path: '/events' },
    { label: 'Announcements', path: '/announcements' },
]

const staffLinks: SidebarLink[] = [
    { label: 'Announcements', path: '/announcements' },
    { label: 'Create post', path: '/create-post' },
]

const adminLinks: SidebarLink[] = [
    { label: 'Dashboard', path: '/' },
    { label: 'Users', path: '/users' },
    { label: 'Audit Log', path: '/audit-log' },
]

function Layout() {
    const auth = useAuth()
    const groups = auth.user?.profile['cognito:groups']
    const role = Array.isArray(groups) ? groups[0] : ''
    const userName = auth.user?.profile.email?.split('@')[0] || 'User'

    let links: SidebarLink[] = []

    if (role === 'student') links = studentLinks
    if (role === 'staff') links = staffLinks
    if (role === 'admin') links = adminLinks

    return (
        <div>
            <Header userName={userName} />
            <div className="layout-body">
                <Sidebar links={links} />
                <main className="layout-content">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default Layout