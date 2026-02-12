# Mark Herring - Interactive Interview Agent (Web Interface)

An AI-powered web interface that allows interviewers to ask questions and get personalized responses from Mark Herring's professional background and experience.

## Features

- **Company-Specific URLs**: Each company gets a unique URL (e.g., `/kore.ai`, `/descript`)
- **Password Protection**: Secure access per company with changeable passwords
- **AI-Powered Responses**: Uses Claude API to provide contextual, company-specific answers
- **Suggested Questions**: Organized by category to help guide the conversation
- **Rate Limiting**: 50 questions per session to manage API usage
- **Export Functionality**: Download conversation transcript as PDF
- **Usage Tracking**: Logs all questions for analytics

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

### 3. Add Your Photo (Optional)

Replace the placeholder in `components/InterviewHeader.tsx`:

1. Add your photo to `/public/mark-herring.jpg`
2. Uncomment the Image component in `InterviewHeader.tsx`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

### Prerequisites

- Vercel account (sign up at [vercel.com](https://vercel.com))
- Vercel CLI: `npm install -g vercel`

### Deploy Steps

1. **Login to Vercel**:
   ```bash
   vercel login
   ```

2. **Deploy**:
   ```bash
   vercel
   ```

3. **Set Environment Variables**:
   - Go to your project in Vercel Dashboard
   - Navigate to Settings → Environment Variables
   - Add `ANTHROPIC_API_KEY` with your API key
   - Add company passwords if desired (e.g., `PASSWORD_KOREAI`)

4. **Deploy to Production**:
   ```bash
   vercel --prod
   ```

### Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain (e.g., `interview.markherring.com`)
3. Follow Vercel's instructions to configure DNS

## Adding New Companies

To add a new company context:

1. **Create Context File**: Add `contexts/company_name.md` in the parent directory

2. **Update Home Page**: Edit `app/page.tsx` to add the new company link

3. **Add Password**:
   - Add to `.env.local`: `PASSWORD_COMPANY_NAME=your_password`
   - Add to `app/api/auth/route.ts` in the `COMPANY_PASSWORDS` object

4. **Test**: Navigate to `/company-name` and verify it works

## Project Structure

```
web/
├── app/
│   ├── [company]/          # Dynamic company-specific pages
│   │   └── page.tsx
│   ├── api/                # API routes
│   │   ├── auth/          # Password authentication
│   │   ├── chat/          # Claude API integration
│   │   └── track/         # Usage tracking
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ChatInterface.tsx
│   ├── ExportButton.tsx
│   ├── InterviewHeader.tsx
│   ├── PasswordGate.tsx
│   └── SuggestedQuestions.tsx
├── public/               # Static assets
│   └── mark-herring.jpg  # Your photo (add this)
├── .env.example          # Environment variable template
├── package.json
└── README.md
```

## Usage Tracking

View usage statistics by visiting `/api/track` (GET request) or check the `logs/usage.jsonl` file:

```bash
cat ../logs/usage.jsonl | jq
```

## Changing Passwords

To change a company's password:

1. Update the password in your `.env.local` file
2. If deployed to Vercel, update in Vercel Dashboard → Settings → Environment Variables
3. Redeploy: `vercel --prod`

## Customization

### Suggested Questions

Edit `components/SuggestedQuestions.tsx` to modify the question categories and options.

### Styling

- Tailwind CSS is used for styling
- Colors are defined in `tailwind.config.js`
- The LinkedIn blue color is `mark-blue`: `#0A66C2`

### Rate Limiting

Change the question limit in `app/[company]/page.tsx`:

```typescript
const maxQuestions = 50  // Change this number
```

## Troubleshooting

### API Key Issues
- Ensure `ANTHROPIC_API_KEY` is set in `.env.local`
- Check that the API key is valid and has sufficient credits

### Context Not Loading
- Verify context files exist in `../contexts/`
- Check file naming: should be lowercase with underscores (e.g., `kore_ai.md`)

### Password Not Working
- Check `.env.local` has the correct password
- Ensure company name matches exactly (case-sensitive)

## Support

For questions or issues:
- Email: markrherring@gmail.com
- LinkedIn: [linkedin.com/in/herringmark](https://linkedin.com/in/herringmark)
