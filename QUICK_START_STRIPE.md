# Quick Start: Stripe Payment Integration

## 🚀 Get Started in 5 Minutes

### Step 1: Get Stripe API Keys (2 minutes)

1. Go to [https://dashboard.stripe.com/register](https://dashboard.stripe.com/register)
2. Create a free account
3. Navigate to **Developers** → **API keys**
4. Copy your **Publishable key** (starts with `pk_test_`)
5. Copy your **Secret key** (starts with `sk_test_`)

### Step 2: Configure Environment Variables (1 minute)

Create or edit `.env.local` in your project root:

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
STRIPE_WEBHOOK_SECRET=whsec_YOUR_SECRET_HERE
```

### Step 3: Set Up Local Webhooks (2 minutes)

**Option A: Using Stripe CLI (Recommended)**

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe  # macOS
# or download from: https://stripe.com/docs/stripe-cli

# Login
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Copy the webhook signing secret (starts with `whsec_`) to your `.env.local`

**Option B: Skip for now (Testing only)**

You can test payments without webhooks, but you won't receive order notifications.

### Step 4: Start Development Server

```bash
npm run dev
```

### Step 5: Test a Payment

1. Open [http://localhost:3000](http://localhost:3000)
2. Add a product to cart
3. Click shopping cart icon → "Proceed to Checkout"
4. Fill in customer information
5. Use test card: **4242 4242 4242 4242**
   - Expiry: Any future date
   - CVC: Any 3 digits
   - ZIP: Any 5 digits
6. Click "Complete Purchase"
7. You should see the success page! 🎉

## 🧪 Test Cards

| Card Number | Result |
|-------------|--------|
| `4242 4242 4242 4242` | ✅ Success |
| `4000 0000 0000 0002` | ❌ Declined |
| `4000 0025 0000 3155` | 🔐 3D Secure |

## 🔍 Verify It's Working

### Check Payment in Stripe Dashboard

1. Go to [https://dashboard.stripe.com/test/payments](https://dashboard.stripe.com/test/payments)
2. You should see your test payment
3. Click on it to see customer details and metadata

### Check Webhook Events

If you're running Stripe CLI:
- Look at the terminal where `stripe listen` is running
- You should see webhook events being received

## 🚨 Troubleshooting

### "Invalid API Key"
- ✅ Check your `.env.local` file has the correct keys
- ✅ Restart your dev server: `npm run dev`
- ✅ Make sure you're using **test** keys (start with `pk_test_` and `sk_test_`)

### "Webhook signature verification failed"
- ✅ Make sure Stripe CLI is running: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`
- ✅ Copy the webhook secret from CLI output to `.env.local`
- ✅ Restart your dev server

### Payment form not showing
- ✅ Check browser console for errors
- ✅ Verify `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set correctly
- ✅ Make sure the key starts with `pk_test_` (not `sk_test_`)

### Cart is empty at checkout
- ✅ Add items to cart first
- ✅ Check that cart sidebar shows items

## 🌐 Going to Production

When ready to accept real payments:

### 1. Activate Your Stripe Account
- Complete business verification in Stripe Dashboard
- Add bank account for payouts

### 2. Get Live API Keys
- Go to **Developers** → **API keys**
- Toggle from "Test mode" to "Live mode"
- Copy your live keys (start with `pk_live_` and `sk_live_`)

### 3. Update Production Environment Variables

In Vercel (or your hosting platform):

```env
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_YOUR_LIVE_KEY
STRIPE_SECRET_KEY=sk_live_YOUR_LIVE_KEY
STRIPE_WEBHOOK_SECRET=whsec_YOUR_PRODUCTION_SECRET
```

### 4. Set Up Production Webhooks
- Go to **Developers** → **Webhooks** → **Add endpoint**
- URL: `https://yourdomain.com/api/webhooks/stripe`
- Events: `payment_intent.succeeded`, `payment_intent.payment_failed`, `charge.succeeded`
- Copy the webhook secret to your production environment

### 5. Test with Small Amount
- Make a real purchase with a small amount ($1-5)
- Verify everything works before announcing

## 📚 Need More Help?

- **Full Setup Guide**: See `STRIPE_SETUP.md`
- **Implementation Details**: See `STRIPE_INTEGRATION_SUMMARY.md`
- **Stripe Docs**: [https://stripe.com/docs](https://stripe.com/docs)
- **Support**: info@vicontech.group

## ✅ Checklist

- [ ] Stripe account created
- [ ] API keys added to `.env.local`
- [ ] Stripe CLI installed and running (optional for testing)
- [ ] Dev server running (`npm run dev`)
- [ ] Test payment completed successfully
- [ ] Payment visible in Stripe Dashboard
- [ ] Webhook events received (if using Stripe CLI)

**You're all set! Start accepting payments! 🎉**

