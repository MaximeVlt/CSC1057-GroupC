import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from 'react-oidc-context'
import { createAnnouncement, isApiConfigured } from '../../api/announcements'
import './CreatePost.css'

const TITLE_MAX = 120
const MESSAGE_MAX = 2000

function CreatePost() {
    const auth = useAuth()
    const [title, setTitle] = useState('')
    const [message, setMessage] = useState('')
    const [source, setSource] = useState('')
    const [sending, setSending] = useState(false)
    const [error, setError] = useState('')
    const [published, setPublished] = useState('')

    async function handleSubmit(e: FormEvent) {
        e.preventDefault()
        setError('')
        setPublished('')
        if (!title.trim() || !message.trim()) {
            setError('Please add a title and a message.')
            return
        }
        setSending(true)
        try {
            const created = await createAnnouncement({
                title: title.trim(),
                message: message.trim(),
                source: source.trim() || 'Staff',
            }, auth.user?.access_token ?? '')
            setPublished(created.title)
            setTitle('')
            setMessage('')
            setSource('')
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Could not publish the announcement.')
        } finally {
            setSending(false)
        }
    }

    return (
        <div className="create-post">
            <h1>Create post</h1>
            <p className="create-post-intro">Publish an announcement to all students. It appears on the Announcements page straight away.</p>

            {!isApiConfigured && (
                <p className="create-post-alert error">The announcements service is not configured, so posts cannot be published yet.</p>
            )}

            <form className="create-post-form" onSubmit={handleSubmit}>
                <label>
                    Title
                    <input
                        value={title}
                        maxLength={TITLE_MAX}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. CSC1057 lecture moved to QG25"
                    />
                </label>

                <label>
                    Message
                    <textarea
                        value={message}
                        maxLength={MESSAGE_MAX}
                        rows={6}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="What do students need to know?"
                    />
                    <span className="create-post-count">{message.length}/{MESSAGE_MAX}</span>
                </label>

                <label>
                    Source <span className="create-post-optional">(optional)</span>
                    <input
                        value={source}
                        maxLength={60}
                        onChange={(e) => setSource(e.target.value)}
                        placeholder="e.g. CSC1057, Registry, Library"
                    />
                </label>

                {error && <p className="create-post-alert error">{error}</p>}
                {published && (
                    <p className="create-post-alert success">
                        “{published}” was published. <Link to="/announcements">View announcements</Link>
                    </p>
                )}

                <button type="submit" className="create-post-submit" disabled={sending || !isApiConfigured}>
                    {sending ? 'Publishing…' : 'Publish announcement'}
                </button>
            </form>
        </div>
    )
}
export default CreatePost
