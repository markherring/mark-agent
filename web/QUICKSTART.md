# Quick Start Guide

Get your interview agent running in 5 minutes!

## 1. Install Dependencies

```bash
cd web
npm install
```

This will install Next.js, React, Tailwind CSS, Anthropic SDK, and other dependencies.

## 2. Set Up Environment

Create `.env.local` file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```env
ANTHROPIC_API_KEY=sk-ant-your-key-here
PASSWORD_KOREAI=koreai2026
PASSWORD_DESCRIPT=descript2026
```

**Don't have an Anthropic API key?**
- Go to [console.anthropic.com](https://console.anthropic.com)
- Sign up or log in
- Navigate to API Keys
- Create a new key

## 3. Add Your Photo (Optional)

1. Copy your professional headshot to `public/mark-herring.jpg`
2. Open `components/InterviewHeader.tsx`
3. Find the commented-out `<Image>` component
4. Uncomment it and comment out the placeholder div

## 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 5. Test the Interface

1. **Home Page**: You should see a landing page with company links
2. **Click "Kore.ai"**: Enter password `koreai2026` (or your custom password)
3. **Ask a Question**: Try "Walk me through your background"
4. **Test Suggested Questions**: Click questions from the sidebar
5. **Export**: Click "Export PDF" to download the conversation

## What's Next?

- **Deploy to Vercel**: See [DEPLOYMENT.md](DEPLOYMENT.md) for full guide
- **Add Companies**: Create new context files in `../contexts/`
- **Customize Questions**: Edit `components/SuggestedQuestions.tsx`
- **View Usage**: Visit [http://localhost:3000/api/track](http://localhost:3000/api/track)

## Troubleshooting

### Port Already in Use

```bash
# Kill the process on port 3000
lsof -ti:3000 | xargs kill

# Or use a different port
npm run dev -- -p 3001
```

### API Key Error

Check that:
- API key is correctly copied to `.env.local`
- No extra spaces before/after the key
- File is named `.env.local` (not `.env`)

### Context Not Loading

Verify:
- Context files exist in `../contexts/` directory
- Files are named correctly (lowercase with underscores)
- Example: `kore_ai.md` for Kore.ai company

### Styling Not Working

```bash
# Rebuild Tailwind CSS
npm run dev
```

Press `Ctrl+C` and restart if styles don't appear.

## File Structure Overview

```
web/
├── app/
│   ├── [company]/page.tsx     ← Main interview page
│   ├── api/
│   │   ├── chat/route.ts      ← Claude API integration
│   │   ├── auth/route.ts      ← Password verification
│   │   └── track/route.ts     ← Usage tracking
│   ├── page.tsx               ← Home page
│   └── layout.tsx             ← Root layout
├── components/
│   ├── ChatInterface.tsx      ← Chat UI
│   ├── InterviewHeader.tsx    ← Header with photo
│   ├── PasswordGate.tsx       ← Password screen
│   ├── SuggestedQuestions.tsx ← Question sidebar
│   └── ExportButton.tsx       ← PDF export
├── public/
│   └── mark-herring.jpg       ← Your photo (add this!)
└── .env.local                 ← Your API key (create this!)
```

## Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run lint
```

## Ready to Deploy?

Once everything works locally, follow the [DEPLOYMENT.md](DEPLOYMENT.md) guide to deploy to Vercel!

## Need Help?

- Check [README.md](README.md) for detailed documentation
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment help
- Email: markrherring@gmail.com
