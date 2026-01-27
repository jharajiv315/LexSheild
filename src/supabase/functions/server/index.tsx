import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import * as auth from "./auth.tsx";
const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-c0f89565/health", (c) => {
  return c.json({ 
    status: "ok",
    timestamp: new Date().toISOString(),
    message: "LexShield API is running"
  });
});

// Test endpoint to verify auth routes
app.get("/make-server-c0f89565/test", (c) => {
  return c.json({ 
    message: "Server is working!",
    timestamp: new Date().toISOString(),
    routes: {
      signup: "/make-server-c0f89565/auth/signup",
      signin: "/make-server-c0f89565/auth/signin",
      health: "/make-server-c0f89565/health"
    },
    cors: "enabled",
    environment: {
      supabaseUrl: Deno.env.get('SUPABASE_URL') ? 'configured' : 'missing',
      supabaseAnonKey: Deno.env.get('SUPABASE_ANON_KEY') ? 'configured' : 'missing',
      supabaseServiceKey: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ? 'configured' : 'missing'
    }
  });
});

// Explicit OPTIONS handler for CORS preflight
app.options("/make-server-c0f89565/*", (c) => {
  return c.json({ ok: true });
});

// ============================================
// AUTHENTICATION ROUTES
// ============================================

// Sign up new user
app.post("/make-server-c0f89565/auth/signup", async (c) => {
  console.log('🔵 Signup route hit');
  
  // Log headers for debugging
  const authHeader = c.req.header('Authorization');
  console.log('🔑 Authorization header:', authHeader ? 'Present (Bearer ...)' : 'Missing');
  console.log('📋 All headers:', Object.fromEntries(c.req.raw.headers.entries()));
  
  try {
    const body = await c.req.json();
    console.log('📦 Signup request body:', { email: body.email, hasPassword: !!body.password, hasName: !!body.name });

    const { email, password, name } = body;

    if (!email || !password || !name) {
      console.error('❌ Missing required fields');
      return c.json({ 
        success: false,
        error: 'Email, password, and name are required' 
      }, 400);
    }

    console.log('🔐 Calling auth.signUp...');
    const result = await auth.signUp(email, password, name);
    console.log('📊 SignUp result:', { success: result.success, hasUser: !!result.user, hasSession: !!result.session });

    if (!result.success) {
      console.error('❌ SignUp failed:', result.error);
      
      // Special handling for "user already exists" error
      if (result.error === 'USER_ALREADY_EXISTS') {
        console.log('ℹ️ Returning user_exists status');
        return c.json({ 
          success: false,
          error: 'USER_ALREADY_EXISTS',
          code: 'user_exists',
          message: 'An account with this email already exists. Please sign in instead.'
        }, 409); // 409 Conflict
      }
      
      return c.json({ 
        success: false,
        error: result.error 
      }, 400);
    }

    // Initialize user profile in KV store
    const userId = result.user.id;
    console.log('💾 Creating user profile for:', userId);
    
    try {
      await kv.set(`user_profile:${userId}`, {
        id: userId,
        email: result.user.email,
        name: result.user.name,
        level: 1,
        xp: 0,
        xpToNextLevel: 100,
        totalAnalyses: 0,
        risksFound: 0,
        streakDays: 0,
        badges: ['newcomer'],
        joinDate: new Date().toISOString(),
        analysisHistory: []
      });
      console.log('✅ User profile created successfully');
    } catch (kvError: any) {
      console.error('⚠️ Failed to create user profile in KV store:', kvError);
      // Continue anyway - profile can be created later
    }

    console.log('✅ Signup successful, returning response');
    return c.json({ 
      success: true, 
      user: result.user,
      session: result.session,
      message: 'Account created successfully' 
    });
  } catch (error: any) {
    console.error('❌ Signup route error:', error);
    console.error('Error stack:', error.stack);
    return c.json({ 
      success: false,
      error: error.message || 'Signup failed due to server error' 
    }, 500);
  }
});

// Sign in existing user
app.post("/make-server-c0f89565/auth/signin", async (c) => {
  console.log('🔵 Signin route hit');
  
  // Log headers for debugging
  const authHeader = c.req.header('Authorization');
  console.log('🔑 Authorization header:', authHeader ? 'Present (Bearer ...)' : 'Missing');
  
  try {
    const body = await c.req.json();
    console.log('📦 Signin request body:', { email: body.email, hasPassword: !!body.password });

    const { email, password } = body;

    if (!email || !password) {
      console.error('❌ Missing required fields');
      return c.json({ 
        success: false,
        error: 'Email and password are required' 
      }, 400);
    }

    console.log('🔐 Calling auth.signIn...');
    const result = await auth.signIn(email, password);
    console.log('📊 SignIn result:', { success: result.success, hasUser: !!result.user, hasSession: !!result.session });

    if (!result.success) {
      console.error('❌ SignIn failed:', result.error);
      return c.json({ 
        success: false,
        error: result.error 
      }, 400);
    }

    console.log('✅ Signin successful, returning response');
    return c.json({
      success: true,
      user: result.user,
      session: result.session
    });
  } catch (error: any) {
    console.error('❌ Signin route error:', error);
    console.error('Error stack:', error.stack);
    return c.json({ 
      success: false,
      error: error.message || 'Sign in failed due to server error' 
    }, 500);
  }
});

// OAuth sign in (Google, GitHub)
app.post("/make-server-c0f89565/auth/:provider", async (c) => {
  try {
    const provider = c.req.param('provider') as 'google' | 'github';

    if (!['google', 'github'].includes(provider)) {
      return c.json({ error: 'Invalid provider. Use google or github' }, 400);
    }

    const result = await auth.signInWithOAuth(provider);

    if (!result.success) {
      return c.json({ error: result.error }, 400);
    }

    return c.json({
      success: true,
      url: result.url
    });
  } catch (error: any) {
    console.error('OAuth route error:', error);
    return c.json({ error: error.message || 'OAuth login failed' }, 500);
  }
});

// OAuth signup - create profile for OAuth users
app.post("/make-server-c0f89565/auth/oauth-signup", async (c) => {
  try {
    const authResult = await auth.verifyAuth(c.req.raw);

    if (!authResult.authorized) {
      return c.json({ error: authResult.error || 'Unauthorized' }, 401);
    }

    const { userId, email, name } = await c.req.json();

    // Check if profile already exists
    const existingProfile = await kv.get(`user_profile:${userId}`);
    if (existingProfile) {
      return c.json({ success: true, user: existingProfile });
    }

    // Create new profile
    const newProfile = {
      id: userId,
      email,
      name,
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      totalAnalyses: 0,
      risksFound: 0,
      streakDays: 0,
      badges: ['newcomer'],
      joinDate: new Date().toISOString(),
      analysisHistory: []
    };

    await kv.set(`user_profile:${userId}`, newProfile);

    return c.json({ 
      success: true, 
      user: newProfile,
      message: 'Profile created successfully' 
    });
  } catch (error: any) {
    console.error('OAuth signup route error:', error);
    return c.json({ error: error.message || 'OAuth signup failed' }, 500);
  }
});

// Get current user
app.get("/make-server-c0f89565/auth/user", async (c) => {
  try {
    const authResult = await auth.verifyAuth(c.req.raw);

    if (!authResult.authorized) {
      return c.json({ error: authResult.error || 'Unauthorized' }, 401);
    }

    // Get user profile from KV store
    const profile = await kv.get(`user_profile:${authResult.userId}`);

    if (!profile) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    return c.json({
      success: true,
      user: profile
    });
  } catch (error: any) {
    console.error('Get user route error:', error);
    return c.json({ error: error.message || 'Failed to get user' }, 500);
  }
});

// Sign out
app.post("/make-server-c0f89565/auth/signout", async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader) {
      return c.json({ error: 'No authorization token' }, 401);
    }

    const accessToken = authHeader.split(' ')[1];
    const result = await auth.signOut(accessToken);

    if (!result.success) {
      return c.json({ error: result.error }, 400);
    }

    return c.json({ success: true, message: 'Signed out successfully' });
  } catch (error: any) {
    console.error('Signout route error:', error);
    return c.json({ error: error.message || 'Sign out failed' }, 500);
  }
});

// ============================================
// USER PROFILE ROUTES (Protected)
// ============================================

// Update user profile
app.put("/make-server-c0f89565/user/profile", async (c) => {
  try {
    const authResult = await auth.verifyAuth(c.req.raw);

    if (!authResult.authorized) {
      return c.json({ error: authResult.error || 'Unauthorized' }, 401);
    }

    const updates = await c.req.json();
    const userId = authResult.userId!;

    // Get current profile
    const currentProfile = await kv.get(`user_profile:${userId}`);

    if (!currentProfile) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    // Update profile
    const updatedProfile = { ...currentProfile, ...updates };
    await kv.set(`user_profile:${userId}`, updatedProfile);

    return c.json({
      success: true,
      user: updatedProfile
    });
  } catch (error: any) {
    console.error('Update profile route error:', error);
    return c.json({ error: error.message || 'Failed to update profile' }, 500);
  }
});

// Add analysis to user history
app.post("/make-server-c0f89565/user/analysis", async (c) => {
  try {
    const authResult = await auth.verifyAuth(c.req.raw);

    if (!authResult.authorized) {
      return c.json({ error: authResult.error || 'Unauthorized' }, 401);
    }

    const { serviceName, score, risks } = await c.req.json();
    const userId = authResult.userId!;

    // Get current profile
    const profile = await kv.get(`user_profile:${userId}`) as any;

    if (!profile) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    // Add to history
    const newAnalysis = {
      id: Date.now(),
      serviceName,
      score,
      date: new Date().toISOString()
    };

    profile.analysisHistory = [newAnalysis, ...(profile.analysisHistory || [])].slice(0, 50);
    profile.totalAnalyses = (profile.totalAnalyses || 0) + 1;
    profile.risksFound = (profile.risksFound || 0) + (risks || 0);
    
    // Add XP
    const xpGained = 50;
    profile.xp += xpGained;

    // Level up check
    while (profile.xp >= profile.xpToNextLevel) {
      profile.xp -= profile.xpToNextLevel;
      profile.level += 1;
      profile.xpToNextLevel = Math.floor(profile.xpToNextLevel * 1.5);
    }

    await kv.set(`user_profile:${userId}`, profile);

    return c.json({
      success: true,
      xpGained,
      newLevel: profile.level,
      user: profile
    });
  } catch (error: any) {
    console.error('Add analysis route error:', error);
    return c.json({ error: error.message || 'Failed to add analysis' }, 500);
  }
});

// Global error handler
app.onError((err, c) => {
  console.error('❌ Unhandled server error:', err);
  console.error('Error stack:', err.stack);
  return c.json({ 
    success: false,
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  }, 500);
});

// 404 handler
app.notFound((c) => {
  console.warn('⚠️ Route not found:', c.req.url);
  return c.json({ 
    success: false,
    error: 'Route not found',
    url: c.req.url,
    availableRoutes: [
      '/make-server-c0f89565/health',
      '/make-server-c0f89565/test',
      '/make-server-c0f89565/auth/signup',
      '/make-server-c0f89565/auth/signin'
    ]
  }, 404);
});

// Log startup
console.log('🚀 LexShield API Server Starting...');
console.log('📍 Server routes initialized');
console.log('🔐 Auth module loaded');
console.log('💾 KV Store module loaded');
console.log('✅ Server ready to accept connections');

Deno.serve(app.fetch);