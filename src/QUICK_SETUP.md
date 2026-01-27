# ⚡ Quick Team Setup Guide

## 🚀 For Project Lead (Setup Once)

```bash
# 1. Initialize Git
git init
git add .
git commit -m "🎉 Initial commit: The Guardian - AI Legal Auditor"

# 2. Create GitHub Repository
# Go to: https://github.com/new
# Repository name: the-guardian
# Make it Public
# Don't initialize with README (we have one)

# 3. Connect and Push
git remote add origin https://github.com/YOUR_USERNAME/the-guardian.git
git branch -M main
git push -u origin main

# 4. Create Team Branches
git checkout -b feature/member1-frontend
git push origin feature/member1-frontend
git checkout main

git checkout -b feature/member2-analytics
git push origin feature/member2-analytics
git checkout main

git checkout -b feature/member3-chatbot
git push origin feature/member3-chatbot
git checkout main

git checkout -b feature/member4-backend
git push origin feature/member4-backend
git checkout main

# 5. Invite Team Members
# GitHub > Repository > Settings > Collaborators
# Add team members' GitHub usernames
```

---

## 👥 For Team Members (First Time Setup)

```bash
# 1. Accept GitHub invitation (check email)

# 2. Clone repository
git clone https://github.com/TEAM_LEAD_USERNAME/the-guardian.git
cd the-guardian

# 3. Install dependencies
npm install

# 4. Check available branches
git branch -a

# 5. Switch to YOUR assigned branch
git checkout feature/YOUR-BRANCH-NAME
# Example: git checkout feature/member2-analytics

# 6. Start development server
npm run dev

# 7. Open browser
# http://localhost:5173

# You're ready to code! 🎉
```

---

## 📝 Daily Workflow (Everyone)

### Morning (Before Starting Work)

```bash
# 1. Pull latest changes
git checkout main
git pull origin main

# 2. Update your branch
git checkout feature/your-branch
git merge main

# 3. Start coding!
npm run dev
```

### Evening (After Finishing Work)

```bash
# 1. Check what you changed
git status

# 2. Stage all changes
git add .

# 3. Commit with message
git commit -m "✨ Added Analytics Dashboard with charts"

# 4. Push to your branch
git push origin feature/your-branch

# 5. Create Pull Request on GitHub
# GitHub > Your Branch > "Compare & pull request"
```

---

## 🎯 File Assignments (No Conflicts!)

### **Member 1 - Landing & Analysis** 🏠
**Your Files:**
- `/components/Hero.tsx`
- `/components/Analyzer.tsx`
- `/components/Results.tsx`
- `/App.tsx`

**Your Branch:** `feature/member1-frontend`

```bash
git checkout feature/member1-frontend
# Edit only YOUR files
# Don't touch Analytics, Chatbot, etc.
```

### **Member 2 - Analytics & Stats** 📊
**Your Files:**
- `/components/Analytics.tsx`
- `/components/Gamification.tsx`
- `/components/Comparison.tsx`

**Your Branch:** `feature/member2-analytics`

```bash
git checkout feature/member2-analytics
# Edit only YOUR files
```

### **Member 3 - User Features** 💬
**Your Files:**
- `/components/Chatbot.tsx`
- `/components/UserProfile.tsx`
- `/components/Navbar.tsx`

**Your Branch:** `feature/member3-chatbot`

```bash
git checkout feature/member3-chatbot
# Edit only YOUR files
```

### **Member 4 - Backend (Optional)** 🔧
**Your Files:**
- `/backend/app.py`
- `/backend/models.py`
- API integrations

**Your Branch:** `feature/member4-backend`

```bash
git checkout feature/member4-backend
# Edit only backend files
```

---

## 🚨 Emergency Commands

### **Undo Last Commit (keep changes)**
```bash
git reset --soft HEAD~1
```

### **Discard All Local Changes**
```bash
git checkout .
```

### **Abort Merge Conflict**
```bash
git merge --abort
```

### **See Who Changed What**
```bash
git log --oneline
git blame filename.tsx
```

### **Update Branch List**
```bash
git fetch --prune
git branch -a
```

---

## 💡 VS Code Live Share (RECOMMENDED!)

### **Setup (One-Time):**
1. Open VS Code
2. Extensions (Ctrl+Shift+X)
3. Search "Live Share"
4. Install extension
5. Sign in with GitHub

### **Usage:**
```
Host (Person sharing code):
1. Click "Live Share" in bottom status bar
2. Copy link
3. Share link in team chat

Guests (Team members):
1. Click the shared link
2. Opens in VS Code
3. Can see and edit in real-time!
```

**Benefits:**
- ✅ No Git conflicts
- ✅ Real-time collaboration
- ✅ Shared terminal
- ✅ Perfect for debugging together

---

## 📱 Communication Template

### **Before Starting Work:**
**Message in team chat:**
```
🚀 Starting work on Analytics Dashboard
⏰ ETA: 3 hours
📁 Files: Analytics.tsx, Gamification.tsx
```

### **After Completing:**
```
✅ Analytics Dashboard completed
🔗 PR #12 created
👀 Please review
```

### **When Stuck:**
```
🚨 Blocked on Recharts integration
❓ Getting error: [paste error]
🙏 Need help from @TeamMember
```

---

## 🎮 GitHub Desktop (Easy Way)

Don't like command line? Use GitHub Desktop!

**Download:** https://desktop.github.com/

**Steps:**
1. Install GitHub Desktop
2. File > Clone Repository
3. Choose "the-guardian"
4. Select your branch
5. Make changes in VS Code
6. GitHub Desktop shows changes
7. Write commit message
8. Click "Commit"
9. Click "Push"
10. Done! ✨

---

## 🏆 Team Sync Schedule

### **Daily Standup (15 min) - 10:00 AM**
Everyone answers:
1. What I did yesterday
2. What I'm doing today
3. Any blockers?

### **Code Review (30 min) - 5:00 PM**
- Review day's Pull Requests
- Give feedback
- Merge approved PRs
- Update task board

### **Weekly Planning (1 hour) - Monday 10:00 AM**
- Review last week
- Plan this week
- Assign new tasks
- Set deadlines

---

## ✅ Pre-Push Checklist

Before `git push`, check:
- [ ] Code runs without errors (`npm run dev`)
- [ ] No console errors in browser
- [ ] Tested the feature
- [ ] Committed only YOUR files
- [ ] Wrote clear commit message
- [ ] Pulled latest main branch
- [ ] No conflicts

---

## 🎯 Commit Message Convention

Use emojis + clear description:

```bash
# New feature
git commit -m "✨ Added Analytics Dashboard with 9 charts"

# Bug fix
git commit -m "🐛 Fixed navbar mobile menu not closing"

# Style changes
git commit -m "💄 Updated color scheme for dark theme"

# Documentation
git commit -m "📝 Updated README with setup instructions"

# Performance
git commit -m "⚡ Optimized chart rendering speed"

# Refactoring
git commit -m "♻️ Refactored Analytics component structure"
```

**Emoji Guide:**
- ✨ New feature
- 🐛 Bug fix
- 💄 UI/Style
- 📝 Documentation
- ⚡ Performance
- ♻️ Refactoring
- 🚀 Deployment
- 🔧 Configuration

---

## 📊 Track Progress

### **Option 1: GitHub Projects**
Create Kanban board:
- Backlog
- In Progress
- In Review
- Done

### **Option 2: Notion**
Create team workspace with:
- Task board
- Meeting notes
- Documentation
- Resources

### **Option 3: Trello**
Simple card-based tracking

---

## 🆘 Common Issues & Solutions

### **"git pull" gives conflict:**
```bash
# Save your work first
git stash

# Pull latest
git pull origin main

# Restore your work
git stash pop

# Fix conflicts if any
```

### **"Permission denied" error:**
```bash
# Setup SSH key or use HTTPS
git remote set-url origin https://github.com/USERNAME/the-guardian.git
```

### **"Branch not found":**
```bash
# Fetch all branches
git fetch --all

# List all branches
git branch -a

# Switch to branch
git checkout feature/your-branch
```

### **"Merge conflict" scary message:**
```bash
# Don't panic! Just:
git merge --abort  # Cancel merge
# Then ask team lead for help
```

---

## 🎉 First Day Checklist

### **Team Lead:**
- [ ] Create GitHub repository
- [ ] Push initial code
- [ ] Create branches for team
- [ ] Invite all members
- [ ] Assign files to each member
- [ ] Setup communication (Discord/Slack)
- [ ] Schedule first team meeting

### **Team Members:**
- [ ] Accept GitHub invitation
- [ ] Clone repository
- [ ] Install dependencies (`npm install`)
- [ ] Test run (`npm run dev`)
- [ ] Switch to your branch
- [ ] Join team chat
- [ ] Attend first meeting
- [ ] Understand your assigned files

---

## 📞 Contact Points

**Team Lead:** [Your Name] - @username
**Member 2:** [Name] - @username
**Member 3:** [Name] - @username
**Member 4:** [Name] - @username

**Team Chat:** [Discord/Slack Link]
**GitHub Repo:** [Repository URL]
**Live Demo:** [Deployment URL]

---

## 🚀 Ready to Build!

```bash
# Everyone run these commands:
git clone [repo-url]
cd the-guardian
npm install
git checkout feature/your-branch
npm run dev

# Open http://localhost:5173
# Start coding! 🎉
```

---

**Remember:**
- ✅ Work only on YOUR assigned files
- ✅ Commit and push daily
- ✅ Communicate constantly
- ✅ Review others' code
- ✅ Ask when stuck
- ✅ Have fun! 🎉

**Let's Build Something Amazing! 🛡️⚖️✨**
