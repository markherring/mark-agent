import { NextResponse } from 'next/server'
import { readFileSync } from 'fs'
import { join } from 'path'

// Default questions if company-specific not found
const DEFAULT_QUESTIONS = {
  'Experience & Background': [
    'Walk me through your background',
    'What are your biggest accomplishments at HiveMQ?',
    'How did you scale InfluxData from $1M to $30M ARR?',
    'Tell me about your experience with PLG + enterprise motions',
  ],
  'GTM Strategy & Execution': [
    'How do you approach the first 90 days as CMO?',
    'What is your framework for diagnosing GTM challenges?',
    'How do you balance PLG and enterprise GTM strategies?',
    'Walk me through how you build a demand gen engine',
  ],
  'Team & Organization': [
    'How do you prioritize marketing hiring?',
    'What is your approach to building SDR teams?',
    'How do you structure a marketing organization?',
    'What qualities do you look for in marketing leaders?',
  ],
  'Metrics & Performance': [
    'What marketing metrics do you care about most?',
    'How do you measure marketing contribution to revenue?',
    'How do you improve pipeline coverage and forecasting?',
    'What is your approach to MQL/PQL definitions?',
  ],
  'Technical Marketing': [
    'How do you market to technical buyers?',
    'What is your approach to developer marketing?',
    'How do you balance technical depth with accessibility?',
    'Tell me about your experience with analyst relations',
  ],
}

function parseQuestionsFile(content: string): Record<string, string[]> {
  const questions: Record<string, string[]> = {}
  const lines = content.split('\n')
  let currentCategory = ''

  for (const line of lines) {
    // Match ## Category headers
    if (line.startsWith('## ')) {
      currentCategory = line.replace('## ', '').trim()
      questions[currentCategory] = []
    }
    // Match - Question bullets
    else if (line.startsWith('- ') && currentCategory) {
      const question = line.replace('- ', '').trim()
      if (question) {
        questions[currentCategory].push(question)
      }
    }
  }

  return questions
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const company = searchParams.get('company')

    if (!company) {
      return NextResponse.json(DEFAULT_QUESTIONS)
    }

    // Try to load company-specific questions
    const questionsPath = join(
      process.cwd(),
      '..',
      'companies',
      `${company.toLowerCase().replace(/[\s.]+/g, '_')}_questions.md`
    )

    try {
      const content = readFileSync(questionsPath, 'utf-8')
      const parsedQuestions = parseQuestionsFile(content)

      console.log(`✓ Loaded company-specific questions for ${company}`)
      return NextResponse.json(parsedQuestions)
    } catch (error) {
      // File not found, return defaults
      console.log(`No company-specific questions for ${company}, using defaults`)
      return NextResponse.json(DEFAULT_QUESTIONS)
    }
  } catch (error) {
    console.error('Error in questions API:', error)
    return NextResponse.json(DEFAULT_QUESTIONS)
  }
}
