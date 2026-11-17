export type Announcement = {
  id: number
  title: string
  message: string
  source: string
  read: boolean
}

export const announcements: Announcement[] = [
  {
    id: 1,
    title: 'Exam timetable released',
    message: 'The semester 1 exam timetable is now available.',
    source: 'Registry',
    read: false,
  },
  {
    id: 2,
    title: 'CSC1057 lecture moved to L114',
    message: "This Thursday's IT Architecture lecture will take place in L114 instead of QG27.",
    source: 'CSC1057',
    read: false,
  },
  {
    id: 3,
    title: 'Library hours extended',
    message: 'The library will be open until midnight during exams.',
    source: 'Library',
    read: true,
  },
]