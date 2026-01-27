# Authentication Setup Guide

## ✅ What's Already Configured

Your Guardian app now has **full authentication** integrated with Supabase:

### Features Implemented:
- ✅ **Email/Password Sign Up** - Create new accounts
- ✅ **Email/Password Sign In** - Authenticate existing users
- ✅ **OAuth Support** - Google & GitHub login (needs setup)
- ✅ **Protected Routes** - Profile & Gamification require login
- ✅ **Session Management** - Auto-login on page refresh
- ✅ **User Profiles** - Stored in Supabase KV store
- ✅ **XP & Level System** - Tracks user progress
- ✅ **Analysis History** - Saves user's ToS analyses

---

## 🚀 How to Use (Already Working)

### Sign Up / Sign In
1. Click **"Sign In"** button in the top-right navbar
2. Choose to **Sign Up** or **Sign In**
3. Enter email, password, and name (for signup)
4. Click **"Create Account"** or **"Sign In"**

### Using the App
- **Without Login**: You can still analyze ToS and use most features
- **With Login**: You get XP, levels, badges, and saved history
- Access **Profile** and **Gamification** tabs (login required)

---

## 🔧 OAuth Setup (Optional - Google & GitHub)

OAuth login buttons are visible but need configuration in Supabase Dashboard:

### Google OAuth Setup
1. Go to your **Supabase Dashboard** → Authentication → Providers
2. Enable **Google** provider
3. Follow this guide: https://supabase.com/docs/guides/auth/social-login/auth-google
4. You'll need:
   - Google Cloud Console project
   - OAuth 2.0 Client ID
   - Client Secret
5. Add to Supabase provider settings

### GitHub OAuth Setup
1. Go to your **Supabase Dashboard** → Authentication → Providers
2. Enable **GitHub** provider
3. Follow this guide: https://supabase.com/docs/guides/auth/social-login/auth-github
4. You'll need:
   - GitHub OAuth App
   - Client ID
   - Client Secret
5. Add to Supabase provider settings

**Note:** OAuth buttons will show an error until you complete this setup. Email/password works immediately!

---

## 📊 User Data Structure

When a user signs up, this profile is created:

```typescript
{
  id: "user-uuid-from-supabase",
  email: "user@example.com",
  name: "John Doe",
  level: 1,
  xp: 0,
  xpToNextLevel: 100,
  totalAnalyses: 0,
  risksFound: 0,
  streakDays: 0,
  badges: ['newcomer'],
  joinDate: "2026-01-27",
  analysisHistory: []
}
```

---

## 🔐 How Authentication Works

### Backend (Supabase Edge Function)
```
/supabase/functions/server/auth.tsx - Authentication logic
/supabase/functions/server/index.tsx - API routes:
  - POST /auth/signup - Create new user
  - POST /auth/signin - Login user
  - POST /auth/google - OAuth (Google)
  - POST /auth/github - OAuth (GitHub)
  - GET /auth/user - Get current user
  - POST /auth/signout - Logout
  - POST /user/analysis - Add analysis to profile
```

### Frontend
```
/components/AuthModal.tsx - Login/Signup UI
/components/Navbar.tsx - Auth buttons & profile menu
/App.tsx - Session management & user state
```

### Flow
1. User signs up → Supabase Auth creates account
2. Server receives user → Creates profile in KV store
3. Frontend gets access token → Saves to localStorage
4. On page refresh → Checks token → Auto-login
5. User analyzes ToS → Updates XP/level in database

---

## 🎯 Testing Authentication

### Test Email/Password
1. Click "Sign In" → "Sign up"
2. Enter:
   - Email: `test@guardian.com`
   - Password: `password123`
   - Name: `Test User`
3. Click "Create Account"
4. You should see your name in the navbar!
5. Check Profile tab → See your stats

### Test Features
- ✅ Analyze a ToS → Gain 50 XP
- ✅ View Profile → See level/badges
- ✅ Check Gamification → See leaderboard
- ✅ Sign Out → Returns to homepage
- ✅ Refresh page → Still logged in

---

## 🛡️ Security Notes

⚠️ **Important for Production:**
- Email confirmation is **disabled** for demo purposes
- In production, enable email verification
- Add password reset functionality
- Implement rate limiting
- Add CAPTCHA to prevent spam signups

**Current Setup (Hackathon Demo):**
- Users auto-confirmed on signup
- No email verification needed
- Perfect for testing & demos

---

## 🐛 Troubleshooting

### "Sign up failed"
- Check Supabase Dashboard → Logs
- Ensure server is deployed
- Verify environment variables are set

### OAuth Error
- OAuth needs manual setup (see above)
- Email/password will work without OAuth

### Session Lost on Refresh
- Check browser console for errors
- Clear localStorage and try again
- Verify access token is valid

---

## 📱 Mobile & Desktop

Authentication works across all devices:
- ✅ Desktop - Full navbar with profile dropdown
- ✅ Tablet - Responsive auth modal
- ✅ Mobile - Mobile menu with sign in/out

---

## 🎉 You're All Set!

Authentication is fully working with email/password. OAuth (Google/GitHub) is optional and can be set up later if needed for the hackathon demo.

**Test it now:**
1. Click "Sign In" button
2. Create an account
3. Start analyzing ToS and earning XP!

Happy hacking! 🚀
