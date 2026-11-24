import { createRoot } from 'react-dom/client'
import { AuthProvider, useAuth } from 'react-oidc-context'
import './index.css'
import App from './App.tsx'

const cognitoConfig = {
  authority: 'https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_zNcyTdWpn',
  client_id: '67djennimsfi9rlp74era766jf',
  redirect_uri: window.location.origin + '/',
  response_type: 'code',
  scope: 'openid email phone',
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname)
  }
}

function Login() {
  const auth = useAuth()

  if (auth.isLoading) return <p>Loading...</p>
  if (auth.error) return <p>Login error: {auth.error.message}</p>

  if (!auth.isAuthenticated) {
    return (
      <div>
        <h1>Smart Campus</h1>
        <button onClick={() => auth.signinRedirect()}>Sign In</button>
      </div>
    )
  }

  return <App />
}

createRoot(document.getElementById('root')!).render(
  <AuthProvider {...cognitoConfig}>
    <Login />
  </AuthProvider>,
)