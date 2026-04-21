# 🚀 College Management System - Team Setup Guide

## ✅ Prerequisites
- Node.js 18+ installed
- npm installed
- Git installed
- Internet connection (to access Supabase cloud database)

---

## 📋 PART 1: Database Setup (ONLY PROJECT LEAD - Do this FIRST)

> ⚠️ **Akash:** Run these steps to set up the database. Your team members **DO NOT** need to do this.

### Step 1: Create Database Tables in Supabase

1. Open **[Supabase SQL Editor](https://app.supabase.co)**
2. Select your project → Click **SQL Editor** 
3. Click **New Query** → **Blank Query**
4. Copy entire contents of `backend/database.sql`
5. Paste into editor and click **Run**

✅ Tables created: `users` and `otps`

### Step 2: Insert Test Admin User

Run this SQL in Supabase SQL Editor:

```sql
INSERT INTO users (user_id, email, password, role, dob, is_activated)
VALUES (
  'ADMIN001',
  'admin@cms.com',
  '$2b$10$KIX.YhPzLv8dkgC1Ip.wYuCzq4D4n6YuKP/CpJ3QD.JhZaGZ8dFoi',
  'admin',
  '1990-01-01',
  true
);
```

✅ **Login Credentials (for all team members):**
- Email: `admin@cms.com`
- Password: `admin123`

---

## 🔐 PART 2: Environment Variables (ALL TEAM MEMBERS)

### For Backend (`backend/.env`)

Copy this exactly to `backend/.env`:

```
PORT=5000
DATABASE_URL=postgresql://postgres:2gZmRWTP0e3rCWAh@db.gycnytjmlakptjepoozq.supabase.co:5432/postgres
JWT_SECRET=mysecretkey
ENABLE_OTP=false

NEXT_PUBLIC_SUPABASE_URL=https://gycnytjmlakptjepoozq.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_S2i2utIJIuUrxAwJTg15BQ_Rk6KWOGq

EMAIL_USER=dashbikash501@gmail.com
EMAIL_PASS=xltyvzrjqiuncbfo

FAST2SMS_API_KEY=esdUGSBPaX03ivmKWRfJ9b1QI2ZNzycEojh8lYAC5Vwx7FrOutmzkPOIQGj6sfgHvXR5o9YtLNheWnSJ
```

### For Frontend (`frontend/.env.local`)

Create `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000
NEXT_PUBLIC_SUPABASE_URL=https://gycnytjmlakptjepoozq.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_S2i2utIJIuUrxAwJTg15BQ_Rk6KWOGq
```

---

## 🔧 PART 3: Start Development Servers (ALL TEAM MEMBERS)

### Terminal 1: Start Backend

```bash
cd backend
npm install
npm start
```

✅ Expected output:
```
✅ Database connected successfully
Server running on port 5000
```

### Terminal 2: Start Frontend

```bash
cd frontend
npm install
npm run dev
```

✅ Expected output:
```
➜  Local:   http://localhost:3000
```

---

## ✅ PART 4: Test Login

1. Open browser → `http://localhost:3000`
2. Click **Login**
3. Enter:
   - Email: `admin@cms.com`
   - Password: `admin123`
4. Click **Sign In**

✅ **Success!** You should see the dashboard.

---

## 📤 PART 5: Share Code With Team

### Push Changes to Git

```bash
git add .
git commit -m "Fixed database schema and added team setup"
git push origin main
```

### Team Members Pull Latest Code

```bash
git pull origin main
npm install
npm start  # backend
npm run dev  # frontend (different terminal)
```

---

## 🔴 TROUBLESHOOTING

### Error: "relation 'users' already exists"
✅ **FIXED!** Updated `database.sql` with `IF NOT EXISTS`
- Already-created tables won't throw errors
- Safe to run again

### Error: "Cannot connect to database"
```bash
# Check .env has correct DATABASE_URL
cat backend/.env

# Verify Supabase is online
# https://status.supabase.com
```

### Error: "Something went wrong" on login
1. ✅ Backend running? (check terminal output)
2. ✅ Admin user exists? Run in Supabase SQL Editor:
   ```sql
   SELECT * FROM users WHERE email = 'admin@cms.com';
   ```
3. ✅ Check browser DevTools (F12) → Network tab for API errors

### Error: "Port 5000/3000 already in use"
```bash
# Kill existing process
# Windows: Press Ctrl+C in the terminal
# Then restart: npm start
```

---

## 📋 Quick Reference

| What | Command |
|------|---------|
| Install backend deps | `cd backend && npm install` |
| Install frontend deps | `cd frontend && npm install` |
| Start backend | `cd backend && npm start` |
| Start frontend | `cd frontend && npm run dev` |
| Pull latest code | `git pull` |
| Push your code | `git add . && git commit -m "msg" && git push` |
| View backend logs | Check Terminal 1 |
| View frontend errors | F12 → Console tab in browser |

---

## 👥 Team Member Checklist

Each team member should:
- [ ] Clone/pull latest repository
- [ ] Run `npm install` in both `backend/` and `frontend/`
- [ ] Copy `.env` template to `backend/.env` (from team lead)
- [ ] Create `frontend/.env.local` with API URL
- [ ] Start backend: `npm start`
- [ ] Start frontend: `npm run dev`
- [ ] Test login: `admin@cms.com` / `admin123`
- [ ] Report issues to team lead

---

## 🎯 Architecture

```
Supabase (Cloud Database)
    ↑
    │ (DATABASE_URL from .env)
    │
Backend (Port 5000)
    ↑
    │ (NEXT_PUBLIC_API_URL from .env.local)
    │
Frontend (Port 3000)
    ↓
Browser
```

All team members connect to the **SAME Supabase database** (cloud-based).
No syncing needed - changes are instant!

---

**Ready to develop? Start with PART 1 → PART 5 in order.** 🚀
