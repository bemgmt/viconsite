# Admin Dashboard Setup Instructions

## Phase 1 Setup Complete! 🎉

The authentication system and admin dashboard foundation has been set up. Follow these steps to complete the setup:

## 📋 Prerequisites

1. **PostgreSQL Database**: You'll need a PostgreSQL database. Options:
   - **Vercel Postgres**: Free tier available, easy setup
   - **Supabase**: Free tier available
   - **Local PostgreSQL**: For development
   - **Any PostgreSQL provider**: Railway, Neon, etc.

## 🚀 Setup Steps

### 1. Install Dependencies

Dependencies are already installed, but if you need to reinstall:

```bash
npm install
```

### 2. Configure Environment Variables

Add these to your `.env.local` file:

```env
# Database
DATABASE_URL="postgresql://user:password@host:5432/database_name?sslmode=require&connect_timeout=10&pool_timeout=10&pgbouncer=true"

# NextAuth (v5 uses AUTH_* variables)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
AUTH_URL="http://localhost:3000"
AUTH_SECRET="your-secret-key-here"
```

**Generate AUTH_SECRET / NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

**Note**: Use the same secret for both `NEXTAUTH_SECRET` and `AUTH_SECRET`.

### 3. Set Up Database

1. **Generate Prisma Client:**
   ```bash
   npm run db:generate
   ```

2. **Push Schema to Database:**
   ```bash
   npm run db:push
   ```
   
   This creates the `users` table in your database.

3. **Seed Initial Admin User:**
   ```bash
   npm run db:seed
   ```
   
   This creates:
   - Admin user: `admin@vicontech.group` / `Admin123!`
   - Example sales person: `sales@example.com` / `Password123!`
   - Example influencer: `influencer@example.com` / `Password123!`

   **⚠️ IMPORTANT**: Change the admin password after first login!

### 4. Start Development Server

```bash
npm run dev
```

### 5. Access Admin Dashboard

1. Navigate to: `http://localhost:3000/admin/login`
2. Login with:
   - Email: `admin@vicontech.group`
   - Password: `Admin123!`
3. You'll be redirected to `/admin` dashboard

## 📁 Files Created

### Core Files
- `prisma/schema.prisma` - Database schema
- `lib/prisma.ts` - Prisma client singleton
- `lib/auth.ts` - NextAuth.js v5 configuration
- `middleware.ts` - Route protection middleware

### Pages
- `app/admin/login/page.tsx` - Admin login page
- `app/admin/page.tsx` - Admin dashboard home
- `app/api/auth/[...nextauth]/route.ts` - Auth API route

### Utilities
- `prisma/seed.ts` - Database seeding script
- `components/admin/sign-out-button.tsx` - Sign out button component

## 🔒 Security Notes

1. **Change Default Password**: The seed script creates an admin with a default password. Change it immediately!
2. **AUTH_SECRET**: Use a strong, random secret in production (same value for both AUTH_SECRET and NEXTAUTH_SECRET)
3. **Database URL**: Never commit your database URL to version control
4. **HTTPS**: Always use HTTPS in production
5. **Vercel Environment Variables**: Make sure to set AUTH_URL and AUTH_SECRET in Vercel dashboard for production

## 🧪 Testing

1. **Test Login:**
   - Try logging in with admin credentials
   - Try logging in with wrong credentials (should show error)
   - Try accessing `/admin` without login (should redirect to login)

2. **Test Protection:**
   - Try accessing `/admin` without being logged in
   - Try accessing `/admin/users` without being logged in
   - Both should redirect to `/admin/login`

## 🐛 Troubleshooting

### "Prisma Client not generated"
```bash
npm run db:generate
```

### "Database connection error"
- Check your `DATABASE_URL` in `.env.local`
- Ensure your database is running
- Check firewall/network settings

### "Module not found: next-auth"
```bash
npm install next-auth@beta
```

### "Cannot find module '@/lib/auth'"
- Ensure TypeScript paths are configured in `tsconfig.json`
- Restart your dev server

## 📚 Next Steps

All phases complete! ✅

- **Phase 1**: ✅ Authentication and admin dashboard foundation
- **Phase 2**: ✅ User management UI (list, add, edit, delete users)
- **Phase 3**: ✅ Polish and testing
- **Phase 4**: ✅ Enhanced features (details pages, bulk operations, filtering, analytics)

See [PHASE_4_COMPLETE.md](./PHASE_4_COMPLETE.md) for details on the latest features!

## 🆘 Need Help?

- Check the [ADMIN_DASHBOARD_PLAN.md](./ADMIN_DASHBOARD_PLAN.md) for the full plan
- Prisma Docs: https://www.prisma.io/docs
- NextAuth.js v5 Docs: https://authjs.dev/

---

**Ready for Phase 2?** Let's build the user management interface! 🚀

