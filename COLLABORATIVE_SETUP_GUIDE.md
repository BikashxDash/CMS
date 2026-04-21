# 🚀 Team Collaborative Setup - STEP BY STEP

Follow these steps **EXACTLY** in this order. Do one step at a time.

---

# PHASE 1: TEAM LEAD SETUP (YOU)
**Do these steps first. Only you need to do this.**

## Step 1: Create Database Tables in Supabase

1. Open **[Supabase Dashboard](https://app.supabase.com)**
2. Select your project
3. Go to **SQL Editor** (left sidebar)
4. Click **New Query**
5. Copy this entire SQL and paste it:

```sql
-- CREATE USERS TABLE
CREATE TABLE users (
  user_id VARCHAR(50) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'student',
  dob DATE NOT NULL,
  is_activated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);

-- CREATE OTP TABLE
CREATE TABLE otps (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(50) NOT NULL,
  otp VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE INDEX idx_otps_user_id ON otps(user_id);
CREATE INDEX idx_otps_expires_at ON otps(expires_at);
```

6. Click **Run** ✅

---

## Step 2: Add Test Users to Database

In the same **SQL Editor**, run this one by one:

**Add Admin User:**
```sql
INSERT INTO users (user_id, email, password, role, dob, is_activated)
VALUES (
  'ADMIN001',
  'admin@cms.com',
  '$2b$10$KIXxPfExkKUDW.3AknLuG.Lzj2DEz4PKZbMPyjPCKDZOvlHhXLpKG',
  'admin',
  '1990-01-01',
  true
);
```

**Add Staff User:**
```sql
INSERT INTO users (user_id, email, password, role, dob, is_activated)
VALUES (
  'STAFF001',
  'staff@cms.com',
  '$2b$10$KIXxPfExkKUDW.3AknLuG.Lzj2DEz4PKZbMPyjPCKDZOvlHhXLpKG',
  'staff',
  '1985-05-15',
  true
);
```

**Add Student User:**
```sql
INSERT INTO users (user_id, email, password, role, dob, is_activated)
VALUES (
  'STUDENT001',
  'student@cms.com',
  '$2b$10$KIXxPfExkKUDW.3AknLuG.Lzj2DEz4PKZbMPyjPCKDZOvlHhXLpKG',
  'student',
  '2005-08-20',
  true
);
```

⚠️ **Note:** All test users have password: `password123`

---

## Step 3: Push Code to GitHub

1. Open PowerShell in your project root folder:
   ```
   c:\Users\akash\OneDrive\Documents\PROJECTS\College-Management-System
   ```

2. Run these commands **one at a time**:

```powershell
# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit with Supabase setup"

# Add remote repository (replace YOUR_REPO_URL)
git remote add origin YOUR_REPO_URL

# Push to GitHub
git push -u origin main
```

**📌 If you need help with GitHub:**
- Create a new repository at [github.com](https://github.com)
- Come back with the repository URL
- Run the commands above

---

## Step 4: Get Your Machine IP Address

**This is important for team members to connect!**

1. Open PowerShell
2. Run:
```powershell
ipconfig
```

3. Look for **"IPv4 Address"** (something like `192.168.1.100`)
4. **Copy this IP** - you'll give it to your team

Example: `192.168.1.100`

---

## Step 5: Keep Backend Running

Your backend must always be running for team members to connect.

In a PowerShell terminal:
```powershell
cd "c:\Users\akash\OneDrive\Documents\PROJECTS\College-Management-System\backend"
npm run dev
```

**Keep this terminal OPEN** (minimize it if needed)

✅ You should see:
```
Server running on port 5000
✅ Database connected successfully
```

---

# ✅ TEAM LEAD SETUP COMPLETE

**Stop here and wait for team members to be ready.**

Tell your team:
- ✅ GitHub repository URL
- ✅ Your machine IP address (e.g., `192.168.1.100`)
- ✅ Database is ready
- ✅ Backend is running

---

---

# PHASE 2: TEAM MEMBER SETUP
**Each team member should follow these steps once they get the GitHub URL and Team Lead's IP**

---

## Step 1: Get Required Information from Team Lead

Ask your team lead for:
- [ ] GitHub repository URL
- [ ] Team lead's machine IP address (e.g., `192.168.1.100`)

---

## Step 2: Clone the Project

1. Choose a folder on your computer (e.g., `C:\Projects`)
2. Open PowerShell in that folder
3. Run:
```powershell
git clone GITHUB_URL
cd College-Management-System
```

Replace `GITHUB_URL` with the actual URL your team lead gave you.

**Example:**
```powershell
git clone https://github.com/yourname/College-Management-System.git
cd College-Management-System
```

---

## Step 3: Install Backend Dependencies

1. In PowerShell, navigate to backend:
```powershell
cd backend
```

2. Install dependencies:
```powershell
npm install
```

⏳ Wait for it to complete (may take 1-2 minutes)

---

## Step 4: Create Backend .env File

1. In the `backend` folder, create a new file named `.env`
2. Copy this content into it:

```
PORT=5000
DATABASE_URL=postgresql://postgres:2gZmRWTP0e3rCWAh@db.gycnytjmlakptjepoozq.supabase.co:5432/postgres
JWT_SECRET=mysecretkey
ENABLE_OTP=false
```

**Save the file** ✅

---

## Step 5: Go Back to Root Folder

```powershell
cd ..
```

Now you should be in `College-Management-System` folder (not backend)

---

## Step 6: Install Frontend Dependencies

```powershell
cd frontend
npm install
```

⏳ Wait for it to complete (may take 2-3 minutes)

---

## Step 7: Create Frontend .env.local File

1. In the `frontend` folder, create a new file named `.env.local`
2. Copy this content (replace `TEAM_LEAD_IP` with actual IP):

```
NEXT_PUBLIC_API_URL=http://TEAM_LEAD_IP:5000
```

**Example:**
```
NEXT_PUBLIC_API_URL=http://192.168.1.100:5000
```

**Save the file** ✅

---

## Step 8: Start Frontend

1. In PowerShell (in frontend folder):
```powershell
npm run dev
```

2. You should see:
```
> frontend@latest dev
> next dev

  ▲ Next.js 15.x.x
  - Local:        http://localhost:3000
```

3. Open your browser and go to: **http://localhost:3000**

✅ Frontend is now running!

---

## Step 9: Test Login

1. In your browser, click **Sign In**
2. Enter:
   - **User ID:** `ADMIN001`
   - **Password:** `password123`
3. Click **Sign In**

If it works → You're connected! 🎉

---

## 🎯 EXPECTED RESULTS

**If everything worked:**
- ✅ Frontend loads at `http://localhost:3000`
- ✅ Login works with ADMIN001 / password123
- ✅ Redirects to admin dashboard
- ✅ Backend console shows no errors

**If you get errors:**
- Check `.env.local` has correct IP address
- Check backend is running on team lead's machine
- Check firewall isn't blocking port 5000

---

# PHASE 3: TEAM COLLABORATION
**Now you can all work together!**

## Working Directory Setup

Each team member should work in their own branch:

```powershell
# Create your own branch
git checkout -b your-name-feature

# Make changes
# Then commit
git add .
git commit -m "your changes"

# Push to GitHub
git push -u origin your-name-feature
```

---

## Test User Credentials

| Role | User ID | Password | Email |
|------|---------|----------|-------|
| Admin | ADMIN001 | password123 | admin@cms.com |
| Staff | STAFF001 | password123 | staff@cms.com |
| Student | STUDENT001 | password123 | student@cms.com |

---

## Keep in Mind

✅ **Backend must always run on team lead's machine**  
✅ **All team members connect through team lead's IP**  
✅ **Database is shared (everyone uses same Supabase)**  
✅ **Frontend runs locally on each machine**  

---

## Troubleshooting

### "Cannot reach backend"
- [ ] Check team lead's machine IP is correct in `.env.local`
- [ ] Check backend is running (should show "Server running on port 5000")
- [ ] Check firewall isn't blocking port 5000

### "Something went wrong" at login
- [ ] Check backend terminal for error messages
- [ ] Verify user exists in database
- [ ] Check browser console (F12) for network errors

### "Module not found" error
- [ ] Make sure you ran `npm install` in backend AND frontend
- [ ] Delete `node_modules` folder and run `npm install` again

---

**Questions? Ask your team lead!**
