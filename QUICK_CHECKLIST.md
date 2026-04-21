# ⚡ QUICK SETUP CHECKLIST

## YOU (Team Lead) - DO FIRST ✅

- [ ] **Step 1:** Create database tables in Supabase
  - Go to: https://app.supabase.com
  - SQL Editor → New Query → Paste SQL from COLLABORATIVE_SETUP_GUIDE.md → Run

- [ ] **Step 2:** Add test users to database
  - Run 3 SQL INSERT statements (Admin, Staff, Student)

- [ ] **Step 3:** Push code to GitHub
  - `git init`
  - `git add .`
  - `git commit -m "Initial commit"`
  - `git remote add origin YOUR_REPO_URL`
  - `git push -u origin main`

- [ ] **Step 4:** Get your IP address
  - PowerShell: `ipconfig`
  - Find "IPv4 Address" (e.g., 192.168.1.100)

- [ ] **Step 5:** Keep backend running
  - `cd backend`
  - `npm run dev`
  - **Keep terminal OPEN**

📌 **Share with team members:**
- GitHub URL
- Your IP address
- Test credentials

---

## EACH TEAM MEMBER - DO AFTER GETTING INFO ✅

- [ ] **Clone project**
  - `git clone GITHUB_URL`
  - `cd College-Management-System`

- [ ] **Backend setup**
  - `cd backend`
  - `npm install`
  - Create `.env` file with provided content

- [ ] **Frontend setup**
  - `cd ..` (go back to root)
  - `cd frontend`
  - `npm install`
  - Create `.env.local` with: `NEXT_PUBLIC_API_URL=http://TEAM_LEAD_IP:5000`

- [ ] **Start frontend**
  - `npm run dev`
  - Open: http://localhost:3000

- [ ] **Test login**
  - User ID: `ADMIN001`
  - Password: `password123`
  - Should redirect to dashboard

✅ **DONE! You're all set up!**

---

## Test Credentials

```
User ID: ADMIN001    Password: password123
User ID: STAFF001    Password: password123
User ID: STUDENT001  Password: password123
```

---

## Communication

- **Backend:** Team lead's machine (runs on 5000)
- **Frontend:** Each person's machine (runs on 3000)
- **Database:** Supabase (shared by everyone)

Each person works on frontend features locally while backend is shared.
