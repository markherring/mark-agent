import { NextResponse } from 'next/server'

// Password mapping per company
// In production, this should be in environment variables or a secure database
const COMPANY_PASSWORDS: { [key: string]: string } = {
  'Kore.ai': process.env.PASSWORD_KOREAI || 'koreai2026',
  'Descript': process.env.PASSWORD_DESCRIPT || 'descript2026',
  // Add more companies as needed
}

export async function POST(request: Request) {
  try {
    const { password, company } = await request.json()

    const expectedPassword = COMPANY_PASSWORDS[company]

    if (!expectedPassword) {
      return NextResponse.json(
        { error: 'Company not found' },
        { status: 404 }
      )
    }

    if (password === expectedPassword) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error('Error in auth API:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}
