import {NavLink} from 'react-router-dom'
import './Sidebar.css'

export type SidebarLink = {
    label: string 
    path: string
}

type SidebarProps = {
    links: SidebarLink[]
}

function Sidebar({ links }: SidebarProps){
    return(
        <nav className="sidebar">
            {links.map((link) => (
                <NavLink
                key={link.path}
                to={link.path}
                end={link.path == '/'}
                className={({ isActive }) =>
                isActive ? 'sidebar-link active': 'sidebar-link'
            }
            >
                {link.label}
            </NavLink>
            ))}
        </nav>
    )

}
export default Sidebar