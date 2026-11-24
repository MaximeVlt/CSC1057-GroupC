// Announcements API (FR05 / FR06)
// API Gateway (HTTP API) -> this Lambda -> DynamoDB table "Announcements"
//
//   GET  /announcements  -> list all announcements, newest first
//   POST /announcements  -> create a new announcement (staff "Create post" page)
//                           needs a Cognito access token from the "staff" group

import { randomUUID } from 'node:crypto'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from '@aws-sdk/lib-dynamodb'

const TABLE_NAME = process.env.TABLE_NAME
const db = DynamoDBDocumentClient.from(new DynamoDBClient({}))

const STAFF_GROUP = 'staff'
const LIMITS = { title: 120, message: 2000, source: 60 }

function reply(statusCode, body) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

// API Gateway has already verified the token (JWT authorizer). It passes
// cognito:groups as a string such as "[staff]" or "[staff admin]".
function isStaff(event) {
  const groups = event.requestContext?.authorizer?.jwt?.claims?.['cognito:groups'] ?? ''
  const list = Array.isArray(groups) ? groups : String(groups).replace(/^\[|\]$/g, '').split(/[\s,]+/)
  return list.includes(STAFF_GROUP)
}

async function listAnnouncements() {
  const items = []
  let ExclusiveStartKey
  do {
    const page = await db.send(new ScanCommand({ TableName: TABLE_NAME, ExclusiveStartKey }))
    items.push(...(page.Items ?? []))
    ExclusiveStartKey = page.LastEvaluatedKey
  } while (ExclusiveStartKey)

  items.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  return reply(200, items)
}

async function createAnnouncement(rawBody) {
  let input
  try {
    input = JSON.parse(rawBody ?? '{}')
  } catch {
    return reply(400, { error: 'Body must be valid JSON' })
  }

  const title = String(input.title ?? '').trim()
  const message = String(input.message ?? '').trim()
  const source = String(input.source ?? '').trim() || 'Staff'

  const errors = []
  if (!title) errors.push('title is required')
  if (!message) errors.push('message is required')
  if (title.length > LIMITS.title) errors.push(`title must be at most ${LIMITS.title} characters`)
  if (message.length > LIMITS.message) errors.push(`message must be at most ${LIMITS.message} characters`)
  if (source.length > LIMITS.source) errors.push(`source must be at most ${LIMITS.source} characters`)
  if (errors.length) return reply(400, { error: errors.join(', ') })

  const item = {
    id: randomUUID(),
    title,
    message,
    source,
    createdAt: new Date().toISOString(),
  }
  await db.send(new PutCommand({ TableName: TABLE_NAME, Item: item }))
  return reply(201, item)
}

export async function handler(event) {
  const method = event.requestContext?.http?.method
  try {
    if (method === 'GET') return await listAnnouncements()
    if (method === 'POST') {
      if (!isStaff(event)) return reply(403, { error: 'Only staff can publish announcements' })
      return await createAnnouncement(event.body)
    }
    return reply(405, { error: 'Method not allowed' })
  } catch (err) {
    console.error(err)
    return reply(500, { error: 'Internal server error' })
  }
}
