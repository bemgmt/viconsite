# Stripe Error Troubleshooting Guide

## Error: "Neither apiKey nor config.authenticator provided"

This error means `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is not available in your production build.

## ⚠️ Critical: NEXT_PUBLIC_* Variables Must Be Set Before Build

In Next.js, `NEXT_PUBLIC_*` environment variables are **embedded at build time**, not runtime. This means:

1. ✅ Variable must be set in Vercel **BEFORE** deployment
2. ✅ You **MUST redeploy** after adding/updating the variable
3. ❌ Just adding the variable won't work - you need a new build

## 🔍 Step-by-Step Fix

### Step 1: Verify Variable in Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Look for: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
5. **Check these things:**
   - ✅ Name is EXACTLY: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (case-sensitive, no spaces)
   - ✅ Value starts with `pk_test_` or `pk_live_`
   - ✅ Environment is set to **Production** (or all environments)
   - ✅ Variable is not empty

### Step 2: Common Mistakes to Check

- ❌ Typo in name: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (not `PUBLISHABLE` or `PUBLIC_KEY`)
- ❌ Wrong environment: Variable set for Preview but not Production
- ❌ Extra spaces: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ` (trailing space)
- ❌ Empty value: Variable exists but value is empty

### Step 3: Redeploy (CRITICAL!)

After verifying the variable:

1. Go to **Deployments** tab in Vercel
2. Find the latest deployment
3. Click the **three dots (⋯)** menu
4. Click **Redeploy**
5. Wait for deployment to complete
6. Test the checkout page again

### Step 4: Verify It's Working

After redeploy, check the browser console:
- ✅ No more "Neither apiKey nor config.authenticator provided" error
- ✅ Checkout page loads without errors
- ✅ Payment form appears

## 🧪 Quick Test

To verify the variable is available after redeploy:

1. Open browser console on your site
2. Type: `console.log(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)`
3. If it shows `undefined` → Variable not set or not redeployed
4. If it shows your key → Variable is working!

## 📋 Complete Environment Variables Checklist

Make sure ALL these are set in Vercel (Production environment):

- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` ← **This is the one causing the error**
- [ ] `STRIPE_SECRET_KEY`
- [ ] `STRIPE_WEBHOOK_SECRET` (optional but recommended)
- [ ] `OPENAI_API_KEY` (if using chatbot)
- [ ] `RESEND_API_KEY` (if using emails)
- [ ] `DATABASE_URL` (if using admin dashboard)
- [ ] `AUTH_SECRET` or `NEXTAUTH_SECRET` (if using admin)

## 🚨 Still Not Working?

If you've verified everything above and it still doesn't work:

1. **Clear Vercel build cache:**
   - Settings → General → Clear Build Cache
   - Redeploy

2. **Check Vercel build logs:**
   - Go to Deployments → Click on latest deployment
   - Check Build Logs for any errors

3. **Verify variable format:**
   - Test key should start with: `pk_test_`
   - Live key should start with: `pk_live_`
   - No quotes around the value in Vercel

4. **Try setting for all environments:**
   - In Vercel, when adding variable, select: Production, Preview, Development

## 💡 Pro Tip

To avoid this in the future:
- Always set environment variables **before** first deployment
- Use Vercel's environment variable templates
- Test locally with `.env.local` first

