# Stripe Payment Integration Setup Guide

## Overview

VICON now uses Stripe as the primary payment processor for secure, seamless checkout experiences. This guide will help you set up and configure Stripe for your environment.

## 🎯 Features

- ✅ Secure payment processing with Stripe Elements
- ✅ PCI-compliant payment forms
- ✅ Support for multiple payment methods (cards, digital wallets)
- ✅ Real-time payment validation
- ✅ Webhook integration for order processing
- ✅ Customer billing information collection
- ✅ Order confirmation and success pages
- ✅ Automatic cart clearing after successful payment

## 📋 Prerequisites

1. A Stripe account (sign up at [stripe.com](https://stripe.com))
2. Node.js and npm installed
3. VICON project set up locally

## 🚀 Setup Steps

### 1. Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Click "Sign up" and create your account
3. Complete the account verification process

### 2. Get Your API Keys

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com)
2. Navigate to **Developers** → **API keys**
3. You'll see two types of keys:
   - **Publishable key** (starts with `pk_test_` for test mode)
   - **Secret key** (starts with `sk_test_` for test mode)

⚠️ **Important**: Never commit your secret key to version control!

### 3. Configure Environment Variables

Add the following to your `.env.local` file:

```env
# Stripe Publishable Key (client-side, safe to expose)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Stripe Secret Key (server-side only, keep secure!)
STRIPE_SECRET_KEY=sk_test_your_secret_key_here

# Stripe Webhook Secret (for webhook signature verification)
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

### 4. Set Up Webhooks (Important for Production)

Webhooks allow Stripe to notify your application about payment events.

#### For Local Development:

1. Install the Stripe CLI:
   ```bash
   # macOS
   brew install stripe/stripe-cli/stripe
   
   # Windows
   scoop install stripe
   
   # Or download from: https://stripe.com/docs/stripe-cli
   ```

2. Login to Stripe CLI:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. Copy the webhook signing secret (starts with `whsec_`) and add it to `.env.local`

#### For Production:

1. Go to [Stripe Dashboard](https://dashboard.stripe.com) → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.succeeded`
5. Copy the webhook signing secret and add it to your production environment variables

### 5. Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Add items to your cart
3. Click "Proceed to Checkout"
4. Use Stripe test cards:
   - **Success**: `4242 4242 4242 4242`
   - **Decline**: `4000 0000 0000 0002`
   - **3D Secure**: `4000 0025 0000 3155`
   - Use any future expiry date, any 3-digit CVC, and any ZIP code

5. Complete the checkout and verify:
   - Payment processes successfully
   - You're redirected to the success page
   - Cart is cleared
   - Webhook events are received (check Stripe CLI output)

## 🔒 Security Best Practices

1. **Never expose secret keys**: Only use `NEXT_PUBLIC_` prefix for publishable keys
2. **Verify webhook signatures**: Always validate webhook signatures using `STRIPE_WEBHOOK_SECRET`
3. **Use HTTPS in production**: Stripe requires HTTPS for production webhooks
4. **Implement proper error handling**: Handle payment failures gracefully
5. **Store sensitive data securely**: Never log or store full card details
6. **Use test mode for development**: Switch to live mode only when ready for production

## 🌐 Going Live

When you're ready to accept real payments:

1. Complete Stripe account activation in the dashboard
2. Switch from test keys to live keys:
   - Replace `pk_test_` with `pk_live_`
   - Replace `sk_test_` with `sk_live_`
3. Update webhook endpoints to use production URLs
4. Test thoroughly with small amounts first
5. Monitor the Stripe Dashboard for transactions

## 📊 Monitoring and Analytics

- View all transactions in the [Stripe Dashboard](https://dashboard.stripe.com/payments)
- Set up email notifications for successful payments
- Monitor webhook delivery and retry failed webhooks
- Use Stripe's built-in fraud detection (Radar)

## 🛠️ Customization

### Styling the Payment Form

The checkout form uses Stripe Elements with customizable appearance. Edit `app/checkout/page.tsx`:

```typescript
<Elements
  stripe={stripePromise}
  options={{
    clientSecret,
    appearance: {
      theme: "stripe", // or "night", "flat"
      variables: {
        colorPrimary: "#0066cc", // Your brand color
      },
    },
  }}
>
```

### Adding More Payment Methods

Stripe automatically enables compatible payment methods. To customize:

1. Go to Stripe Dashboard → **Settings** → **Payment methods**
2. Enable desired payment methods (Apple Pay, Google Pay, etc.)
3. They'll automatically appear in the checkout form

## 🐛 Troubleshooting

### "Invalid API Key"
- Check that your API keys are correct in `.env.local`
- Ensure you're using test keys for development
- Restart your development server after changing environment variables

### "Webhook signature verification failed"
- Verify `STRIPE_WEBHOOK_SECRET` is correct
- Ensure you're using the correct secret for your environment (test vs. live)
- Check that the webhook endpoint URL is correct

### "Payment failed"
- Check Stripe Dashboard for error details
- Verify test card numbers are correct
- Ensure sufficient test funds (not applicable to test mode, but good to check in live mode)

## 📚 Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Stripe Security Best Practices](https://stripe.com/docs/security/guide)

## 💡 Support

For Stripe-related issues:
- [Stripe Support](https://support.stripe.com)
- [Stripe Community](https://stripe.com/community)

For VICON-specific issues:
- Email: info@vicontech.group

