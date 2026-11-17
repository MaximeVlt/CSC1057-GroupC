import './Header.css'

type HeaderProps = {
    userName: string
    roleLabel?: string
}

function Header({userName, roleLabel}: HeaderProps){
    const initial = userName.charAt(0).toUpperCase()

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
            </div>
        </header>
    )
}
export default Header