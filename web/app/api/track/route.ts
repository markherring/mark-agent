import { NextResponse } from 'next/server'
import { writeFileSync, existsSync, readFileSync, mkdirSync } from 'fs'
import { join } from 'path'

interface UsageLog {
  timestamp: string
  company: string
  question: string
}

export async function POST(request: Request) {
  try {
    const { company, question } = await request.json()

    const logEntry: UsageLog = {
      timestamp: new Date().toISOString(),
      company,
      question
    }

    const logsDir = join(process.cwd(), '..', 'logs')
    const logFile = join(logsDir, 'usage.jsonl')

    // Create logs directory if it doesn't exist
    if (!existsSync(logsDir)) {
      mkdirSync(logsDir, { recursive: true })
    }

    // Append to log file
    const logLine = JSON.stringify(logEntry) + '\n'
    writeFileSync(logFile, logLine, { flag: 'a' })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in track API:', error)
    // Don't fail the request if tracking fails
    return NextResponse.json({ success: false })
  }
}

export async function GET() {
  try {
    const logsDir = join(process.cwd(), '..', 'logs')
    const logFile = join(logsDir, 'usage.jsonl')

    if (!existsSync(logFile)) {
      return NextResponse.json({ logs: [] })
    }

    const content = readFileSync(logFile, 'utf-8')
    const logs = content
      .trim()
      .split('\n')
      .filter(line => line)
      .map(line => JSON.parse(line))

    // Generate statistics
    const stats = {
      totalQuestions: logs.length,
      byCompany: logs.reduce((acc: any, log: UsageLog) => {
        acc[log.company] = (acc[log.company] || 0) + 1
        return acc
      }, {}),
      recentActivity: logs.slice(-10).reverse()
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error reading logs:', error)
    return NextResponse.json({ error: 'Failed to read logs' }, { status: 500 })
  }
}
