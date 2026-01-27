# 🔐 OAuth Setup Guide - Google & GitHub Login

## ⚠️ IMPORTANT: OAuth Configuration Required

For Google and GitHub login buttons to work, you **MUST** configure OAuth providers in your Supabase Dashboard. Without this setup, users will see a **"Provider is not enabled"** error.

---

## 🚀 Quick Setup Overview

1. Go to your Supabase Dashboard
2. Navigate to Authentication → Providers
3. Enable and configure Google and/or GitHub
4. Add redirect URLs
5. Test the integration

---

## 📋 Detailed Setup Instructions

### 🟦 Google OAuth Setup

#### Step 1: Enable Google Provider in Supabase

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **Authentication** → **Providers**
4. Find **Google** and click **Enable**

#### Step 2: Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Navigate to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth 2.0 Client ID**
5. Configure consent screen if prompted:
   - User Type: External
   - App name: LexShield
   - User support email: your email
   - Developer contact: your email
6. Application type: **Web application**
7. Name: LexShield
8. **Authorized JavaScript origins:**
   ```
   https://your-project-ref.supabase.co
   http://localhost:3000 (for local development)
   ```
9. **Authorized redirect URIs:**
   ```
   https://your-project-ref.supabase.co/auth/v1/callback
   ```
10. Click **Create**
11. Copy the **Client ID** and **Client Secret**

#### Step 3: Configure in Supabase

1. Go back to Supabase Dashboard → Authentication → Providers → Google
2. Paste **Client ID** (Google OAuth Client ID)
3. Paste **Client Secret** (Google OAuth Client Secret)
4. Click **Save**

#### Step 4: Add Redirect URL

In Supabase Dashboard → Authentication → URL Configuration:
- Add redirect URL: `https://your-project-ref.supabase.co/auth/v1/callback`
- Add site URL: `https://your-app-domain.com` (or localhost for testing)

---

### 🟪 GitHub OAuth Setup

#### Step 1: Enable GitHub Provider in Supabase

1. Go to your Supabase Dashboard
2. Navigate to **Authentication** → **Providers**
3. Find **GitHub** and click **Enable**

#### Step 2: Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in the details:
   - **Application name:** LexShield
   - **Homepage URL:** `https://your-app-domain.com`
   - **Authorization callback URL:** 
     ```
     https://your-project-ref.supabase.co/auth/v1/callback
     ```
4. Click **Register application**
5. Copy the **Client ID**
6. Click **Generate a new client secret**
7. Copy the **Client Secret** (you won't be able to see it again!)

#### Step 3: Configure in Supabase

1. Go back to Supabase Dashboard → Authentication → Providers → GitHub
2. Paste **Client ID** (GitHub OAuth Client ID)
3. Paste **Client Secret** (GitHub OAuth Client Secret)
4. Click **Save**

---

## 🔗 Redirect URL Configuration

Your Supabase project needs these redirect URLs configured:

### In Supabase Dashboard → Authentication → URL Configuration:

**Redirect URLs (add all that apply):**
```
https://your-project-ref.supabase.co/auth/v1/callback
http://localhost:3000
https://your-production-domain.com
```

**Site URL:**
```
https://your-production-domain.com
```

---

## ✅ Testing OAuth Integration

### Test Google Login:
1. Click "Continue with Google" button
2. Should redirect to Google login page
3. Select/login with Google account
4. Should redirect back to your app
5. User should be logged in automatically

### Test GitHub Login:
1. Click "Continue with GitHub" button
2. Should redirect to GitHub authorization page
3. Click "Authorize" on GitHub
4. Should redirect back to your app
5. User should be logged in automatically

---

## 🐛 Common Issues & Solutions

### Error: "Provider is not enabled"

**Cause:** OAuth provider not enabled in Supabase Dashboard

**Solution:**
1. Go to Supabase Dashboard
2. Authentication → Providers
3. Enable Google/GitHub
4. Add Client ID and Secret
5. Save changes

---

### Error: "Redirect URI mismatch"

**Cause:** Redirect URL not configured correctly

**Solution:**
1. Check Google Cloud Console / GitHub OAuth App settings
2. Ensure callback URL is exactly: `https://your-project-ref.supabase.co/auth/v1/callback`
3. Check Supabase Dashboard → Authentication → URL Configuration
4. Ensure site URL matches your domain

---

### Error: "Invalid client"

**Cause:** Client ID or Secret is incorrect

**Solution:**
1. Verify Client ID and Secret in provider console
2. Copy them again (regenerate if needed)
3. Paste in Supabase Dashboard
4. Save and test again

---

### OAuth Works But User Not Created

**Cause:** Profile creation issue in backend

**Solution:**
1. Check browser console for errors
2. Verify `/auth/oauth-signup` endpoint is working
3. Check that user profile is created in KV store
4. Look at server logs for errors

---

## 📱 How OAuth Flow Works

```
┌─────────────────────────────────────────────────────┐
│  User clicks "Continue with Google/GitHub"         │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Frontend: AuthModal calls supabase.auth           │
│  .signInWithOAuth({ provider: 'google' })          │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Supabase redirects to Google/GitHub                │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  User logs in with Google/GitHub                    │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Google/GitHub redirects back to Supabase           │
│  callback URL with auth code                        │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Supabase exchanges code for access token           │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Redirect back to app with #access_token in URL    │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  App.tsx detects hash params and extracts token    │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Call /auth/oauth-signup to create user profile    │
└────────────────┬────────────────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────────────────┐
│  Store token in localStorage                        │
│  Set user state                                     │
│  Show welcome toast                                 │
│  User is logged in! ✅                              │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 Implementation Details

### Frontend (`/components/AuthModal.tsx`):
```tsx
const handleSocialLogin = async (provider: 'google' | 'github') => {
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  
  await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin
    }
  });
  
  // User will be redirected to provider
};
```

### OAuth Callback Handler (`/App.tsx`):
```tsx
useEffect(() => {
  // Check for OAuth hash params
  const hash = window.location.hash;
  if (hash && hash.includes('access_token')) {
    // Extract session
    // Create user profile if needed
    // Store token
    // Set user state
  }
}, []);
```

### Backend (`/supabase/functions/server/index.tsx`):
```tsx
app.post("/auth/oauth-signup", async (c) => {
  // Verify auth token
  // Check if profile exists
  // Create new profile if needed
  // Return user data
});
```

---

## 📚 Official Documentation Links

- **Supabase Social Login:** https://supabase.com/docs/guides/auth/social-login
- **Google OAuth:** https://supabase.com/docs/guides/auth/social-login/auth-google
- **GitHub OAuth:** https://supabase.com/docs/guides/auth/social-login/auth-github
- **Google Cloud Console:** https://console.cloud.google.com/
- **GitHub Developer Settings:** https://github.com/settings/developers

---

## ✨ Features After Setup

Once OAuth is configured, users can:
- ✅ Sign in with Google (one click)
- ✅ Sign in with GitHub (one click)
- ✅ No password required
- ✅ Profile automatically created
- ✅ XP and progress tracked
- ✅ Same experience as email signup

---

## 🔒 Security Notes

1. **Never share Client Secrets** - Keep them secure in Supabase Dashboard only
2. **Use HTTPS in production** - OAuth requires secure connections
3. **Validate redirect URLs** - Only allow your domains
4. **Regular secret rotation** - Regenerate secrets periodically
5. **Monitor OAuth logs** - Check for suspicious activity

---

## 🎉 You're Ready!

Once configured:
1. Users can click "Continue with Google/GitHub"
2. They'll be redirected to provider
3. After authorization, they're back in your app
4. Fully logged in with profile created
5. Can use all features immediately

---

**Need Help?**
- Supabase Discord: https://discord.supabase.com
- Stack Overflow: Tag with `supabase` and `oauth`
- Documentation: https://supabase.com/docs

---

*Last Updated: January 27, 2026*  
*LexShield - AI Legal Guardian*
