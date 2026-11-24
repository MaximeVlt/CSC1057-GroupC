# Announcements back end

Owner: Marceau (Jira KAN-21, KAN-22)

```
React (Announcements page, Create post page)
        │  fetch
        ▼
API Gateway (HTTP API)  ──►  Lambda smart-campus-announcements  ──►  DynamoDB table "Announcements"
```

| Method | Path             | Used by            | Body / response |
|--------|------------------|--------------------|-----------------|
| GET    | `/announcements` | Announcements page | `[{ id, title, message, source, createdAt }]`, newest first |
| POST   | `/announcements` | Create post page   | body `{ title, message, source? }` → `201` with the created item, `400` if invalid |

## Deploy (region eu-north-1)

Needs the AWS CLI and SAM CLI (`brew install awscli aws-sam-cli`) and an IAM user in the group AWS account.

```bash
cd backend/announcements
sam deploy --guided --region eu-north-1 --stack-name smart-campus-announcements
# first time: accept defaults, answer "y" to "AnnouncementsFunction has no authentication. Is this okay?"
```

Copy the `AnnouncementsApiUrl` output into `frontend/.env.local`:

```
VITE_ANNOUNCEMENTS_API_URL=https://xxxx.execute-api.eu-north-1.amazonaws.com
```

For Amplify, add the same variable in Amplify → App settings → Environment variables, then redeploy.

## Quick test

```bash
API=https://xxxx.execute-api.eu-north-1.amazonaws.com
curl -X POST $API/announcements -H 'Content-Type: application/json' \
  -d '{"title":"Exam timetable released","message":"The semester 1 exam timetable is now available.","source":"Registry"}'
curl $API/announcements
```

## Security notes

- DynamoDB encrypted at rest, Lambda only gets CRUD on this one table (least privilege).
- Inputs validated and length-limited in the Lambda.
- Next step: add a Cognito JWT authorizer on `POST /announcements` so only the `staff` / `admin` groups can post (User Pool from John's Cognito setup).
