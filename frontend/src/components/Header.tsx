import { useAuth } from 'react-oidc-context'
import './Header.css'

type HeaderProps = {
    userName: string
    roleLabel?: string
}

function Header({ userName, roleLabel }: HeaderProps) {
    const auth = useAuth()
    const initial = userName.charAt(0).toUpperCase()

    async function signOut() {
        await auth.removeUser()

        const url = 'https://eu-north-1zncytdwpn.auth.eu-north-1.amazoncognito.com/logout'
        const clientId = '67djennimsfi9rlp74era766jf'
        const returnUrl = window.location.origin + '/'

        window.location.href =
            `${url}?client_id=${clientId}&logout_uri=${encodeURIComponent(returnUrl)}`
    }

    return (
        <header className="header">
            <div className="header-left">
                <span className="header-logo">🎓</span>
                <span className="header-title">Smart Campus</span>
                {roleLabel && <span className="header-role">{roleLabel}</span>}
            </div>

            <div className="header-right">
                <span className="header-greeting">Hi, {userName}</span>
                <div className="header-avatar">{initial}</div>
                <button onClick={signOut}>Sign Out</button>
            </div>
        </header>
    )
}

export default Header