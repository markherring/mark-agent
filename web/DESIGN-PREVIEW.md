# Design Preview

Visual description of the web interface design.

## Color Palette

- **Primary Blue**: `#0A66C2` (LinkedIn blue)
- **Background**: Gradient from `#F9FAFB` to `#F3F4F6`
- **White**: `#FFFFFF` (cards and containers)
- **Text Dark**: `#111827`
- **Text Medium**: `#6B7280`
- **User Message**: `#0A66C2` (blue background, white text)
- **Assistant Message**: `#F3F4F6` (gray background, dark text)

## Page Layouts

### 1. Landing Page (`/`)

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│            ┌──────────────────────────┐            │
│            │                          │            │
│            │    MARK HERRING          │            │
│            │                          │            │
│            │  Interactive Interview   │            │
│            │        Agent             │            │
│            │                          │            │
│            │  AI-Powered Resume       │            │
│            │     Experience           │            │
│            │                          │            │
│            │  ┌────────────────────┐  │            │
│            │  │ Bio paragraph with │  │            │
│            │  │ 30+ years, $1M→$30M│  │            │
│            │  └────────────────────┘  │            │
│            │                          │            │
│            │  Available Contexts:     │            │
│            │                          │            │
│            │  ┌─[Kore.ai]──────────┐ │            │
│            │  │ Enterprise AI...   │ │            │
│            │  └────────────────────┘ │            │
│            │                          │            │
│            │  ┌─[Descript]─────────┐ │            │
│            │  │ Video editing...   │ │            │
│            │  └────────────────────┘ │            │
│            │                          │            │
│            └──────────────────────────┘            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 2. Password Gate

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│            ┌──────────────────────────┐            │
│            │   MARK HERRING           │            │
│            │   Interactive Interview  │            │
│            │                          │            │
│            │  ┌────────────────────┐  │            │
│            │  │ Interview Context: │  │            │
│            │  │    Kore.ai        │  │            │
│            │  └────────────────────┘  │            │
│            │                          │            │
│            │  Access Password:        │            │
│            │  [________________]      │            │
│            │                          │            │
│            │  [  Enter Interview  ]   │            │
│            │                          │            │
│            │  This is a personalized  │            │
│            │  interview experience... │            │
│            └──────────────────────────┘            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 3. Main Interview Interface

```
┌───────────────────────────────────────────────────────────────────────────┐
│                                                                           │
│  ┌─────────────────────────────────────────────────────────────────────┐ │
│  │                                                                       │ │
│  │  MARK HERRING              [Photo]         ┌─────────────────────┐  │ │
│  │  Chief Marketing Officer      MH           │ Interview Context   │  │ │
│  │  🔗 linkedin.com/in/herringmark            │     Kore.ai        │  │ │
│  │                                            └─────────────────────┘  │ │
│  │  ─────────────────────────────────────────────────────────────────  │ │
│  │  Technically fluent marketing leader with 30+ years building GTM   │ │
│  │  engines... $1M → $30M ARR... hybrid PLG + enterprise...          │ │
│  └─────────────────────────────────────────────────────────────────────┘ │
│                                                                           │
│  ┌──────────────────────────────────┐  ┌──────────────────────────────┐ │
│  │ Interview Conversation           │  │ Suggested Questions          │ │
│  │                          15 / 50 │  │                              │ │
│  │                      📥 Export PDF│  │ ▼ Experience & Background    │ │
│  │ ────────────────────────────────│  │   · Walk me through your...  │ │
│  │                                  │  │   · What are your biggest... │ │
│  │ Welcome! Ask any question about  │  │   · How did you scale...     │ │
│  │ Mark's background or select from │  │                              │ │
│  │ the sidebar...                   │  │ ▶ GTM Strategy & Execution   │ │
│  │                                  │  │                              │ │
│  │                     ┌──────────┐ │  │ ▶ Team & Organization        │ │
│  │                     │ Walk me  │ │  │                              │ │
│  │                     │ through  │ │  │ ▶ Metrics & Performance      │ │
│  │                     │ your...  │ │  │                              │ │
│  │                     └──────────┘ │  │ ▶ Technical Marketing        │ │
│  │                        11:23 AM  │  │                              │ │
│  │                                  │  │ ────────────────────────────│ │
│  │  ┌─────────────────────────────┐│  │ 💡 Tip: Ask follow-up       │ │
│  │  │ I've spent 30+ years        ││  │    questions to dive deeper │ │
│  │  │ building GTM engines...     ││  │                              │ │
│  │  │                             ││  └──────────────────────────────┘ │
│  │  │ At InfluxData: $1M → $30M   ││                                   │
│  │  │ At HiveMQ: $25M → $53M...   ││                                   │
│  │  └─────────────────────────────┘│                                   │
│  │  11:23 AM                        │                                   │
│  │                                  │                                   │
│  │  ─────────────────────────────── │                                   │
│  │  [Type your question...]   [Ask] │                                   │
│  └──────────────────────────────────┘                                   │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘
```

## Component Details

### InterviewHeader

- **Layout**: 3-column flex layout
  - Left: Name, title, LinkedIn link
  - Center: Professional photo (circular, blue border)
  - Right: Company badge (gradient blue background)
- **Divider line** separating header from bio
- **Bio paragraph**: Single paragraph, concise elevator pitch

### ChatInterface

- **Messages container**: Scrollable area, 600px height
- **User messages**: Blue background, white text, right-aligned, max 3/4 width
- **Assistant messages**: Gray background, dark text, left-aligned, max 3/4 width
- **Markdown support**: Formatting, lists, bold, code blocks
- **Timestamps**: Small gray text below each message
- **Loading indicator**: Three bouncing dots animation
- **Input area**: Full-width input + blue button

### SuggestedQuestions

- **Sticky sidebar**: Stays visible on scroll
- **Collapsible categories**: Accordion-style
  - Arrow rotates when expanded
  - Hover effect on category headers
- **Question buttons**: Full-width, hover effect (background turns white, text turns blue)
- **Tip box**: Bottom of sidebar, light gray background

### ExportButton

- **Style**: Gray background button
- **Icon**: Download icon (SVG)
- **State**: Disabled when no messages, grayed out appearance
- **Hover effect**: Darker gray background

### PasswordGate

- **Centered layout**: Vertically and horizontally centered
- **Max width**: 400px
- **Form**: Single password input + submit button
- **Error display**: Red background alert box
- **Info box**: Blue background showing company context

## Responsive Behavior

### Desktop (>1024px)
- 2-column layout: Chat (2/3) + Sidebar (1/3)
- Max width: 1200px container
- Generous padding and spacing

### Tablet (768px - 1024px)
- Single column: Chat on top, Sidebar below
- Full-width components
- Reduced padding

### Mobile (<768px)
- Stack all components vertically
- Photo size reduced
- Simplified header layout
- Sidebar collapses by default

## Animations & Interactions

- **Page transitions**: Smooth fade-in
- **Message appearance**: Slide up + fade in
- **Button hovers**: Color transitions (300ms)
- **Loading dots**: Staggered bounce animation
- **Accordion expand**: Smooth height transition
- **Scroll behavior**: Smooth auto-scroll to latest message

## Typography

- **Headings**: `font-bold`, various sizes (4xl, 3xl, 2xl, xl, lg)
- **Body**: `font-normal`, sizes (base, sm)
- **Font family**: Inter (from Google Fonts)
- **Line height**: `leading-relaxed` for readability

## Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Focus indicators (blue ring)
- Sufficient color contrast
- Alt text for images

## Polish Details

- Rounded corners everywhere (8px - 16px)
- Subtle shadows on cards
- Gradient backgrounds for depth
- LinkedIn blue accent color throughout
- Consistent spacing (multiples of 4px)
- Professional, modern aesthetic

## What It Feels Like

- **Professional but approachable**: Like a high-end SaaS product
- **Conversational**: Chat-style interface feels natural
- **Guided**: Suggested questions remove uncertainty
- **Transparent**: Question counter shows limits clearly
- **Trustworthy**: Password protection + professional design
- **Memorable**: "I've never seen a resume like this before" 🎯
