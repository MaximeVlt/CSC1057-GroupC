export type ClassSession = {
  id: number
  day: 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'
  start: string
  end: string
  code: string
  name: string
  room: string
}

export const timetable: ClassSession[] = [
  { id: 1, day: 'Mon', start: '10:00', end: '12:00', code: 'CSC1202', name: 'Programming', room: 'L101' },
  { id: 2, day: 'Mon', start: '14:00', end: '16:00', code: 'CSC1041', name: 'Quantitative analysis', room: 'CG86' },
  { id: 3, day: 'Tue', start: '14:00', end: '15:00', code: 'CSC1041', name: 'Quantitative analysis', room: 'L114' },
  { id: 4, day: 'Tue', start: '15:00', end: '16:00', code: 'CSC1058', name: 'User interface design', room: 'SA101' },
  { id: 5, day: 'Wed', start: '09:00', end: '10:00', code: 'CSC1201', name: 'LLM engineering', room: 'HG20' },
  { id: 6, day: 'Wed', start: '11:00', end: '12:00', code: 'CSC1058', name: 'User interface design', room: 'FTG11' },
  { id: 7, day: 'Thu', start: '12:00', end: '13:00', code: 'CSC1057', name: 'IT Architecture', room: 'QG27' },
]