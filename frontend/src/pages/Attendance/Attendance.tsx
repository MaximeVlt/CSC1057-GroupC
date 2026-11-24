import './Attendance.css'

type ModuleAttendance = {
  code: string
  name: string
  attended: number
  missed: number
}

const moduleAttendance: ModuleAttendance[] = [
  {
    code: 'CSC1057',
    name: 'IT Architecture',
    attended: 8,
    missed: 2,
  },
  {
    code: 'CSC1041',
    name: 'Programming',
    attended: 6,
    missed: 3,
  },
  {
    code: 'CSC1202',
    name: 'Computer Systems',
    attended: 9,
    missed: 1,
  },
  {
    code: 'CSC1058',
    name: 'Web Development',
    attended: 7,
    missed: 3,
  },
  {
    code: 'CSC1201',
    name: 'Information Systems',
    attended: 8,
    missed: 1,
  },
]

function Attendance() {
  const totalAttended = moduleAttendance.reduce(
    (total, module) => total + module.attended,
    0
  )

  const totalMissed = moduleAttendance.reduce(
    (total, module) => total + module.missed,
    0
  )

  const totalSessions = totalAttended + totalMissed

  const overallPercentage = Math.round(
    (totalAttended / totalSessions) * 100
  )

  return (
    <div className="attendance-page">
      <h1 className="attendance-title">Attendance</h1>
      <p className="attendance-subtitle">
        Track your attendance across your modules
      </p>

      {/* Overall attendance summary */}
      <div className="attendance-summary">
        <div className="attendance-summary-card">
          <div className="summary-icon">%</div>
          <div>
            <p className="summary-label">Overall attendance</p>
            <h2>{overallPercentage}%</h2>
            <span className="summary-extra">
              Across all modules
            </span>
          </div>
        </div>

        <div className="attendance-summary-card">
          <div className="summary-icon">✓</div>
          <div>
            <p className="summary-label">Sessions attended</p>
            <h2>{totalAttended}</h2>
            <span className="summary-extra">
              Classes attended
            </span>
          </div>
        </div>

        <div className="attendance-summary-card">
          <div className="summary-icon">×</div>
          <div>
            <p className="summary-label">Sessions missed</p>
            <h2>{totalMissed}</h2>
            <span className="summary-extra">
              Classes missed
            </span>
          </div>
        </div>
      </div>

      {/* Module attendance */}
      <div className="attendance-section-heading">
        <h2>Module Attendance</h2>
        <span>Target: 75%</span>
      </div>

      <div className="attendance-module-list">
        {moduleAttendance.map((module) => {
          const sessions = module.attended + module.missed
          const percentage = Math.round(
            (module.attended / sessions) * 100
          )

          const belowTarget = percentage < 75

          return (
            <div className="attendance-module-card" key={module.code}>
              <div className="module-top-row">
                <div className="module-info">
                  <h3>{module.name}</h3>
                  <p>{module.code}</p>
                </div>

                <div
                  className={
                    belowTarget
                      ? 'attendance-status status-warning'
                      : 'attendance-status status-good'
                  }
                >
                  {belowTarget ? 'Below 75% target' : 'On target'}
                </div>
              </div>

              <div className="module-percentage-row">
                <span>Attendance</span>
                <strong>{percentage}%</strong>
              </div>

              <div className="attendance-progress-track">
                <div
                  className={
                    belowTarget
                      ? 'attendance-progress-fill progress-warning'
                      : 'attendance-progress-fill progress-good'
                  }
                  style={{ width: `${percentage}%` }}
                />
              </div>

              <div className="module-session-details">
                <span>
                  <strong>{module.attended}</strong> sessions attended
                </span>
                <span>
                  <strong>{module.missed}</strong> sessions missed
                </span>
                <span>
                  <strong>{sessions}</strong> total sessions
                </span>
              </div>

              {belowTarget && (
                <p className="attendance-warning-message">
                  Your attendance is below the recommended 75% target.
                </p>
              )}
            </div>
          )
        })}
      </div>

    </div>
  )
}

export default Attendance
