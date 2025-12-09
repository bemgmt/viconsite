# Vercel Environment Variables Checklist

## ⚠️ Important
- `.env.local` is ONLY for local development
- Production (www.vicontech.group) uses Vercel environment variables
- After adding/updating variables in Vercel, you MUST redeploy

## ✅ Required Environment Variables for Vercel

### Stripe (Required for Checkout)
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - **This is the one causing your error!**
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET` (recommended)

### Other Features (May be needed)
- `OPENAI_API_KEY` (for chatbot)
- `RESEND_API_KEY` (for email notifications)
- `DATABASE_URL` (for admin dashboard)
- `AUTH_SECRET` or `NEXTAUTH_SECRET` (for admin authentication)
- `AUTH_URL` or `NEXTAUTH_URL` (set to `https://www.vicontech.group` for production)

## 🔧 How to Add Variables in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (`viconsite`)
3. Go to **Settings** → **Environment Variables**
4. Add each variable:
   - **Name**: e.g., `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Value**: Your actual key value
   - **Environment**: Select **Production**, **Preview**, and **Development** (or just Production)
5. **IMPORTANT**: After adding variables, go to **Deployments** and click **Redeploy** on the latest deployment

## 🚨 Common Issues

### Variables not working after adding them?
- **You must redeploy** after adding environment variables
- Variables starting with `NEXT_PUBLIC_` are available on the client-side
- Other variables are server-side only

### Still getting the error?
1. Verify the variable name is EXACTLY: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (case-sensitive)
2. Check that the value starts with `pk_test_` (test) or `pk_live_` (production)
3. Make sure you redeployed after adding the variable
4. Check Vercel deployment logs for any errors

