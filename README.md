# VICON - AI-Powered Fire Protection System

Advanced AI-powered fire detection and suppression system website built with Next.js 16, React 19, and Tailwind CSS v4.

## 🚀 Features

- **Cinematic Hero Carousel** with parallax effects and directional transitions
- **3D Product Cards** with expandable features and hover animations
- **Scroll-Based Reveal Animations** using Intersection Observer
- **Glassmorphism Navigation** with animated underlines
- **AI Chatbot** with glowing orb and quick suggestions
- **Responsive Design** with mobile-optimized carousels
- **Modern UI** with futuristic animations and effects

## 📦 Tech Stack

- **Framework**: Next.js 16.0.0 (App Router)
- **React**: 19.2.0
- **Styling**: Tailwind CSS v4.1.9
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Animations**: tw-animate-css, tailwindcss-animate
- **AI**: OpenAI GPT-4o-mini
- **Email**: Resend
- **Deployment**: Vercel

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/bemgmt/viconsite.git
cd viconsite
```

2. Install dependencies:
```bash
npm install --legacy-peer-deps
```

3. Create `.env.local` file:
```bash
cp .env.example .env.local
```

4. Add your API keys to `.env.local`:
```env
OPENAI_API_KEY=sk-your-openai-key
RESEND_API_KEY=re-your-resend-key
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🌐 Deployment to Vercel

### Option 1: Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `bemgmt/viconsite`
4. Configure environment variables:
   - `OPENAI_API_KEY`: Your OpenAI API key
   - `RESEND_API_KEY`: Your Resend API key
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Add environment variables:
```bash
vercel env add OPENAI_API_KEY
vercel env add RESEND_API_KEY
```

4. Redeploy:
```bash
vercel --prod
```

## 🔑 Required Environment Variables

| Variable | Description | Where to Get |
|----------|-------------|--------------|
| `OPENAI_API_KEY` | OpenAI API key for chatbot | [OpenAI Platform](https://platform.openai.com/api-keys) |
| `RESEND_API_KEY` | Resend API key for emails | [Resend Dashboard](https://resend.com/api-keys) |

## 📁 Project Structure

```
vicontech/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes (chat, escalate-lead)
│   ├── agent-pricing/     # Agent pricing page
│   ├── how-it-works/      # How it works page
│   ├── learn-more/        # Learn more page
│   ├── products/          # Products page
│   ├── the-system/        # System details page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── chatbot.tsx       # AI chatbot
│   ├── hero.tsx          # Hero carousel
│   ├── navigation.tsx    # Navigation bar
│   └── ...               # Other components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
└── styles/               # Global styles

```

## 🎨 Customization

### Colors

Edit `app/globals.css` to customize the color scheme:

```css
@theme {
  --color-primary: oklch(0.12 0.02 15);    /* Dark maroon */
  --color-accent: oklch(0.92 0.03 70);     /* Cream */
  /* ... */
}
```

### Animations

Animations are configured in `tailwind.config.ts` and use:
- `tw-animate-css` for pre-built animations
- Custom keyframes in `app/globals.css`

## 🐛 Troubleshooting

### 404 Error on Vercel

If you see a 404 error after deployment:

1. **Check environment variables** are set in Vercel dashboard
2. **Check build logs** in Vercel deployment details
3. **Verify install command** uses `--legacy-peer-deps` flag
4. **Redeploy** after adding environment variables

### Build Errors

If build fails locally:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install --legacy-peer-deps
npm run build
```

## 📄 License

Private - All rights reserved

## 🤝 Support

For support, email derek@birdseyemanagementservices.com

