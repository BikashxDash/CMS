# ✅ Setup Checklist - Do This NOW

## Step 1: Insert Admin User into Database
**Time: 2 minutes**

1. Go to [Supabase SQL Editor](https://app.supabase.co)
2. Select your project → **SQL Editor**
3. Click **New Query** → **Blank Query**
4. Copy and paste the SQL from `backend/INSERT_ADMIN_USER.sql`
5. Click **Run**

✅ **Admin user created:**
- Email: `admin@cms.com`
- Password: `admin123`

---

## Step 2: Test Backend + Admin Login
**Time: 5 minutes**

### Terminal 1: Backend (should still be running)
```bash
# Check if backend is running - you should see:
# ✅ Database connected successfully
# Server running on port 5000
```

### Terminal 2: Start Frontend
```bash
cd frontend
npm run dev
```

### Browser: Test Login
1. Open http://localhost:3000
2. Click **Login**
3. Enter: `admin@cms.com` / `admin123`
4. Click **Sign In**

✅ Should show **Dashboard** if successful!

---

## Step 3: Prepare for Team
**Time: 5 minutes**

1. **Push to Git:**
   ```bash
   git add .
   git commit -m "Database schema fixed + team setup guide"
   git push
   ```

2. **Share with team:**
   - Send them the **TEAM_SETUP_GUIDE.md** file
   - Tell them to follow it step by step
   - They'll use same login credentials

---

## ✅ Current Status

- ✅ Backend: Running on port 5000
- ✅ Database: Connected to Supabase
- ⏳ Admin user: Waiting to be inserted (SQL is ready)
- ⏳ Frontend: Ready to start
- ⏳ Team: Waiting for your setup signal

---

## 🚀 Next: Insert Admin User

**Copy this SQL and run it in Supabase:**

```sql
INSERT INTO users (user_id, email, password, role, dob, is_activated)
VALUES (
  'ADMIN001',
  'admin@cms.com',
  '$2b$10$KIX.YhPzLv8dkgC1Ip.wYuCzq4D4n6YuKP/CpJ3QD.JhZaGZ8dFoi',
  'admin',
  '1990-01-01',
  true
)
ON CONFLICT (email) DO NOTHING;
```

Then reply when done! ✅
