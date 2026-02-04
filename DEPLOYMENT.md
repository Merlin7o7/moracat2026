# Moracat Deployment Guide

This guide walks you through deploying Moracat to production with Vercel and Supabase.

## Prerequisites

- GitHub account
- Vercel account (free at vercel.com)
- Supabase account (free at supabase.com)

---

## Step 1: Set Up Supabase Database

1. **Create a new project** at [supabase.com/dashboard](https://supabase.com/dashboard)
   - Choose a project name (e.g., "moracat")
   - Set a strong database password (save this!)
   - Select a region close to Saudi Arabia (e.g., Frankfurt or Mumbai)

2. **Get your database URLs**
   - Go to Project Settings > Database
   - Copy the **Connection string** (URI format)
   - You'll need two URLs:
     - **Transaction/Pooler** (port 6543) → `DATABASE_URL`
     - **Session/Direct** (port 5432) → `DIRECT_URL`

   Example format:
   ```
   DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"
   DIRECT_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres"
   ```

---

## Step 2: Push Code to GitHub

1. **Initialize git** (if not already):
   ```bash
   cd moracat
   git init
   git add .
   git commit -m "Initial commit: Moracat MVP"
   ```

2. **Create a GitHub repository** at github.com/new

3. **Push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/moracat.git
   git branch -M main
   git push -u origin main
   ```

---

## Step 3: Deploy to Vercel

1. **Go to [vercel.com/new](https://vercel.com/new)**

2. **Import your GitHub repository**

3. **Configure Environment Variables** (click "Environment Variables"):

   | Variable | Value |
   |----------|-------|
   | `DATABASE_URL` | Your Supabase pooled connection string |
   | `DIRECT_URL` | Your Supabase direct connection string |
   | `AUTH_SECRET` | Generate with: `openssl rand -base64 32` |
   | `NEXTAUTH_URL` | `https://your-app.vercel.app` (update after first deploy) |
   | `AUTH_GOOGLE_ID` | (Optional) Google OAuth Client ID |
   | `AUTH_GOOGLE_SECRET` | (Optional) Google OAuth Secret |

4. **Click "Deploy"** and wait for build to complete

5. **After deployment**, update `NEXTAUTH_URL` to your actual Vercel URL

---

## Step 4: Run Database Migrations

After your first deployment, run migrations to create the database tables:

```bash
# In your local project directory
npx prisma db push
```

Or use Prisma migrations for production:
```bash
npx prisma migrate deploy
```

---

## Step 5: (Optional) Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)

2. Create a new project or select existing

3. Configure OAuth consent screen:
   - User Type: External
   - App name: Moracat
   - Support email: your email

4. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized redirect URIs:
     - `http://localhost:3000/api/auth/callback/google` (development)
     - `https://your-app.vercel.app/api/auth/callback/google` (production)

5. Copy Client ID and Secret to Vercel environment variables

---

## Step 6: Set Up Custom Domain (Optional)

1. In Vercel dashboard, go to your project > Settings > Domains

2. Add your domain (e.g., `moracat.sa`)

3. Update DNS records as instructed by Vercel

4. Update `NEXTAUTH_URL` environment variable to your custom domain

---

## Post-Deployment Checklist

- [ ] Test user registration
- [ ] Test user login (email/password)
- [ ] Test Google OAuth (if configured)
- [ ] Test waitlist form submission
- [ ] Test protected dashboard access
- [ ] Verify database entries in Supabase

---

## Useful Commands

```bash
# View database in Prisma Studio
npx prisma studio

# Reset database (development only!)
npx prisma db push --force-reset

# Generate Prisma client after schema changes
npx prisma generate

# Create migration
npx prisma migrate dev --name your_migration_name
```

---

## Troubleshooting

### Build fails with Prisma error
```bash
# Ensure Prisma client is generated
npx prisma generate
```

### Database connection issues
- Check your DATABASE_URL format
- Ensure Supabase project is active
- Verify password doesn't have special characters that need encoding

### Auth not working
- Verify AUTH_SECRET is set
- Check NEXTAUTH_URL matches your domain exactly
- For Google OAuth, verify redirect URIs are correct

---

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Supabase pooled connection |
| `DIRECT_URL` | Yes | Supabase direct connection |
| `AUTH_SECRET` | Yes | Random 32+ char secret |
| `NEXTAUTH_URL` | Yes | Your app's full URL |
| `AUTH_GOOGLE_ID` | No | Google OAuth Client ID |
| `AUTH_GOOGLE_SECRET` | No | Google OAuth Secret |
