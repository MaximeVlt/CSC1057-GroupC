export type CampusEvent = {
  id: number
  title: string
  category: 'Careers' | 'Societies' | 'Sport' | 'Academic'
  day: string
  date: string
  time: string
  location: string
  description: string
}

export const events: CampusEvent[] = [
  { id: 1, title: 'Careers fair', category: 'Careers', day: 'Wed', date: '21 Oct', time: '11:00-15:00', location: 'The Helix', description: 'Meet 40+ employers hiring graduates and interns' },
  { id: 2, title: 'Society meetup', category: 'Societies', day: 'Thu', date: '22 Oct', time: '18:00-20:00', location: 'The U', description: 'Find a society and meet new people' },
  { id: 3, title: '5-a-side tournament', category: 'Sport', day: 'Fri', date: '23 Oct', time: '14:00-17:00', location: 'Sports Complex', description: 'Sign up as a team or join one on the day' },
  { id: 4, title: 'Exam prep workshop', category: 'Academic', day: 'Mon', date: '26 Oct', time: '13:00-14:00', location: 'Library', description: 'Study tips and revision planning' },
]
