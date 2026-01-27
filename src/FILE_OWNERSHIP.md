# 📁 File Ownership & Responsibilities

## 🎯 The Golden Rule

**Each team member owns specific files. NEVER edit someone else's files without asking!**

---

## 👤 Team Member Assignments

### **👨‍💻 Member 1 - Frontend Lead (Landing & Analysis Flow)**

```
📂 Your Responsibility:
├── 🏠 Landing Page
├── 🔍 Analysis Flow
├── 📊 Results Display
└── 🎨 Main Styling

📁 Files You Can Edit:
├── /src/
│   ├── components/
│   │   ├── ✅ Hero.tsx                    (100% yours)
│   │   ├── ✅ Analyzer.tsx                (100% yours)
│   │   └── ✅ Results.tsx                 (100% yours)
│   │
│   ├── ✅ App.tsx                         (80% yours - coordinate for imports)
│   │
│   └── styles/
│       └── ✅ globals.css                 (80% yours - don't change others' classes)
│
└── ✅ README.md                           (Shared - communicate before editing)

🚫 DON'T Touch:
├── ❌ Analytics.tsx
├── ❌ Gamification.tsx
├── ❌ Chatbot.tsx
├── ❌ UserProfile.tsx
└── ❌ Backend files
```

**Your Git Branch:** `feature/member1-frontend`

---

### **📊 Member 2 - Analytics & Data Visualization**

```
📂 Your Responsibility:
├── 📈 Analytics Dashboard
├── 🎮 Gamification System
├── ⚖️ Service Comparison
└── 📊 All Charts & Graphs

📁 Files You Can Edit:
├── /src/
│   └── components/
│       ├── ✅ Analytics.tsx              (100% yours)
│       ├── ✅ Gamification.tsx           (100% yours)
│       └── ✅ Comparison.tsx             (100% yours)
│
└── ✅ ANALYTICS_DOCS.md                  (100% yours - create if needed)

🚫 DON'T Touch:
├── ❌ Hero.tsx
├── ❌ Analyzer.tsx
├── ❌ Results.tsx
├── ❌ Chatbot.tsx
├── ❌ UserProfile.tsx
└── ❌ Navbar.tsx
```

**Your Git Branch:** `feature/member2-analytics`

---

### **💬 Member 3 - User Interaction Features**

```
📂 Your Responsibility:
├── 🤖 AI Chatbot
├── 👤 User Profile
├── 🧭 Navigation
└── 🔔 User Settings

📁 Files You Can Edit:
├── /src/
│   └── components/
│       ├── ✅ Chatbot.tsx                (100% yours)
│       ├── ✅ UserProfile.tsx            (100% yours)
│       └── ✅ Navbar.tsx                 (100% yours)
│
└── ✅ USER_FEATURES.md                   (100% yours - create if needed)

🚫 DON'T Touch:
├── ❌ Hero.tsx
├── ❌ Analyzer.tsx
├── ❌ Results.tsx
├── ❌ Analytics.tsx
├── ❌ Gamification.tsx
└── ❌ Comparison.tsx
```

**Your Git Branch:** `feature/member3-chatbot`

---

### **🔧 Member 4 - Backend & API (Optional)**

```
📂 Your Responsibility:
├── 🔌 API Development
├── 🗄️ Database Models
├── 🤖 AI Integration
└── 🔐 Authentication

📁 Files You Can Edit:
├── /backend/
│   ├── ✅ app.py                         (100% yours)
│   ├── ✅ models.py                      (100% yours)
│   ├── ✅ routes/                        (100% yours)
│   │   ├── ✅ analysis.py
│   │   ├── ✅ user.py
│   │   └── ✅ chatbot.py
│   │
│   └── ✅ requirements.txt               (100% yours)
│
├── ✅ API_DOCUMENTATION.md               (100% yours)
└── ✅ .env.example                       (100% yours)

🚫 DON'T Touch:
├── ❌ Any /src/components/ files
└── ❌ Frontend files (unless API integration needed - coordinate first!)
```

**Your Git Branch:** `feature/member4-backend`

---

## 📋 Shared Files (Need Coordination!)

### **⚠️ App.tsx** (Imports & Routing)

```typescript
// Member 1 adds these:
import { Hero } from './components/Hero';
import { Analyzer } from './components/Analyzer';
import { Results } from './components/Results';

// Member 2 adds these:
import { Analytics } from './components/Analytics';
import { Gamification } from './components/Gamification';
import { Comparison } from './components/Comparison';

// Member 3 adds these:
import { Chatbot } from './components/Chatbot';
import { UserProfile } from './components/UserProfile';
import { Navbar } from './components/Navbar';
```

**Rule:** Add ONLY your own imports. Don't change others' sections.

---

### **⚠️ globals.css** (Styling)

```css
/* Member 1's Section - Landing & Analysis */
.hero-gradient { }
.analyzer-card { }
.results-score { }

/* Member 2's Section - Analytics & Charts */
.analytics-card { }
.chart-container { }
.gamification-badge { }

/* Member 3's Section - User Features */
.chatbot-bubble { }
.profile-card { }
.navbar-link { }
```

**Rule:** Add your styles in your section. Don't modify others' classes.

---

### **⚠️ README.md** (Documentation)

**Sections:**
- Introduction → **Team Lead**
- Features → **Everyone adds their own**
- Installation → **Team Lead**
- Usage → **Everyone adds their own**
- API Docs → **Member 4**
- Contributing → **Team Lead**

**Rule:** Edit only your feature's documentation.

---

## 🚦 Traffic Light System

### 🟢 GREEN - Safe to Edit (No Conflicts)
**Your assigned component files**
- You have full control
- Edit anytime
- No coordination needed

### 🟡 YELLOW - Coordinate First (Possible Conflicts)
**Shared files:**
- `App.tsx` (imports)
- `globals.css` (styling)
- `package.json` (dependencies)

**Before editing:**
1. Message in team chat
2. Wait for confirmation
3. Pull latest changes
4. Make your changes
5. Push immediately
6. Notify team

### 🔴 RED - DO NOT TOUCH (High Conflict Risk)
**Other members' component files**
- Never edit without explicit permission
- If you need a change, ask them to do it
- Or create GitHub issue

---

## 📞 Communication Protocol

### **Before Editing Shared File:**

```
Team Chat Message:
"🟡 Need to add dependency 'recharts' to package.json
⏰ Doing it now, will push in 5 mins
✅ Done? Reply when you've pulled it"
```

### **When You Need Someone Else's File:**

```
Team Chat Message:
"@Member2 Can you add a prop 'onAnalyticsOpen' to Analytics.tsx?
I need to link it from Results.tsx
📋 Details: [explain what you need]"
```

### **Daily Status Update:**

```
Team Chat Message:
"📊 Daily Update:
✅ Completed: Analytics Dashboard (Analytics.tsx)
🏃 In Progress: Gamification badges (Gamification.tsx)
📅 Tomorrow: Comparison feature (Comparison.tsx)
🚫 Blockers: None"
```

---

## 🎯 Task Assignment Matrix

| Feature | Member | Files | Status |
|---------|--------|-------|--------|
| Landing Page | Member 1 | Hero.tsx | ✅ Done |
| Analyzer | Member 1 | Analyzer.tsx | ✅ Done |
| Results | Member 1 | Results.tsx | ✅ Done |
| Analytics | Member 2 | Analytics.tsx | ✅ Done |
| Gamification | Member 2 | Gamification.tsx | ✅ Done |
| Comparison | Member 2 | Comparison.tsx | ✅ Done |
| Chatbot | Member 3 | Chatbot.tsx | 🏃 In Progress |
| Profile | Member 3 | UserProfile.tsx | 📋 Planned |
| Navbar | Member 3 | Navbar.tsx | ✅ Done |
| Backend API | Member 4 | app.py | 📋 Planned |

---

## 🔍 How to Check File Ownership

```bash
# See who last modified a file
git log --oneline filename.tsx

# See detailed blame (line by line)
git blame filename.tsx

# See all changes in a file
git log -p filename.tsx
```

---

## 🚨 Conflict Resolution Matrix

### **Scenario 1: You Both Edited Same File**

```bash
# Git shows conflict
<<<<<<< HEAD (your changes)
const theme = 'dark';
=======
const theme = 'light'; (their changes)
>>>>>>> main
```

**Solution:**
1. Talk to team member
2. Decide which to keep
3. Or merge both if possible

---

### **Scenario 2: They Modified Your File Without Permission**

**DO:**
- ✅ Talk calmly
- ✅ Understand why
- ✅ Review their changes
- ✅ Keep good parts
- ✅ Fix any issues

**DON'T:**
- ❌ Get angry
- ❌ Revert without checking
- ❌ Work in silos

---

### **Scenario 3: You Need to Edit Their File**

**Correct Process:**
1. **Ask permission** in team chat
2. **Explain why** you need the change
3. **Wait for response**
4. **Coordinate timing**
5. **Make minimal changes**
6. **Notify when done**

**Example:**
```
"@Member2 I need to add a prop to Analytics.tsx
to integrate it with my Results page.
Can I make this change, or would you prefer to do it?
Here's what I need: [details]"
```

---

## 📅 Weekly Sync Schedule

### **Monday 10 AM - Planning**
- Assign files for the week
- Update task board
- Set deadlines

### **Wednesday 3 PM - Mid-week Check**
- Progress update
- Resolve any blockers
- Adjust assignments if needed

### **Friday 5 PM - Code Review**
- Review all PRs
- Merge completed features
- Plan next week

---

## 🎓 Best Practices Summary

### ✅ DO:
1. **Own your files** - Take full responsibility
2. **Communicate early** - Before conflicts happen
3. **Pull daily** - Stay up to date
4. **Push often** - Small, frequent commits
5. **Review others' code** - Help the team
6. **Document changes** - Clear commit messages

### ❌ DON'T:
1. **Touch others' files** - Without permission
2. **Work in isolation** - Communicate constantly
3. **Push broken code** - Test first
4. **Force push** - Ever
5. **Ignore conflicts** - Resolve immediately
6. **Skip code review** - Always review

---

## 🏆 Collaboration Success Checklist

- [ ] Everyone knows which files they own
- [ ] Clear communication channels established
- [ ] Daily standup scheduled
- [ ] Code review process defined
- [ ] Conflict resolution protocol agreed
- [ ] Git branches created
- [ ] Task board setup
- [ ] Documentation updated

---

## 📞 Quick Reference

| Need | Action | Command |
|------|--------|---------|
| See your files | Check this doc | - |
| Before editing shared file | Message team | - |
| After editing shared file | Push + notify | `git push` |
| Need others' file change | Ask them nicely | @mention in chat |
| Conflict appears | Talk first, code later | - |
| Daily sync | Status update | Post in chat |

---

**Remember: Great teams communicate more than they code!** 💬 > 💻

**Your File = Your Responsibility = Your Pride!** 🎯✨
