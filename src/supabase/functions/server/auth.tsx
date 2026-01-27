import { createClient } from 'jsr:@supabase/supabase-js@2';

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

// Validate environment variables
if (!supabaseUrl || !supabaseServiceRoleKey || !supabaseAnonKey) {
  console.error('❌ Missing Supabase environment variables:');
  console.error('SUPABASE_URL:', supabaseUrl ? '✅' : '❌');
  console.error('SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceRoleKey ? '✅' : '❌');
  console.error('SUPABASE_ANON_KEY:', supabaseAnonKey ? '✅' : '❌');
  throw new Error('Missing required Supabase environment variables');
}

console.log('✅ Supabase environment variables loaded');
console.log('📍 Supabase URL:', supabaseUrl);

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);
export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Sign up new user
export async function signUp(email: string, password: string, name: string) {
  console.log('🔐 signUp function called for:', email);
  
  try {
    // Verify Supabase clients are initialized
    if (!supabaseAdmin || !supabaseClient) {
      console.error('❌ Supabase clients not initialized');
      throw new Error('Database connection not configured');
    }

    console.log('👤 Creating user with admin client...');
    // Create user with admin
    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured
      email_confirm: true
    });

    if (createError) {
      console.error('❌ User creation error:', createError);
      
      // Check if it's a "user already exists" error
      if (createError.message?.toLowerCase().includes('already') || 
          createError.message?.toLowerCase().includes('registered') ||
          createError.message?.toLowerCase().includes('exists') ||
          (createError as any).code === 'email_exists') {
        console.log('ℹ️ User already exists, should use sign in instead');
        throw new Error('USER_ALREADY_EXISTS');
      }
      
      throw new Error(createError.message);
    }

    console.log('✅ User created successfully:', userData.user.id);
    console.log('🔑 Attempting auto sign-in...');

    // Immediately sign in the user to get a session
    const { data: signInData, error: signInError } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      console.error('⚠️ Auto sign-in error after signup:', signInError);
      // Return user without session if sign-in fails
      return { 
        success: true, 
        user: {
          id: userData.user.id,
          email: userData.user.email,
          name: userData.user.user_metadata.name
        }
      };
    }

    console.log('✅ Auto sign-in successful');

    return { 
      success: true, 
      user: {
        id: signInData.user.id,
        email: signInData.user.email,
        name: signInData.user.user_metadata.name
      },
      session: {
        access_token: signInData.session.access_token,
        refresh_token: signInData.session.refresh_token
      }
    };
  } catch (error: any) {
    console.error('❌ Sign up error:', error);
    console.error('Error details:', { message: error.message, stack: error.stack });
    return { success: false, error: error.message || 'Failed to create account' };
  }
}

// Sign in existing user
export async function signIn(email: string, password: string) {
  console.log('🔐 signIn function called for:', email);
  
  try {
    if (!supabaseClient) {
      console.error('❌ Supabase client not initialized');
      throw new Error('Database connection not configured');
    }

    console.log('🔑 Attempting sign in...');
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error('❌ Sign in error:', error);
      throw new Error(error.message);
    }

    console.log('✅ Sign in successful');

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.name
      },
      session: {
        access_token: data.session.access_token,
        refresh_token: data.session.refresh_token
      }
    };
  } catch (error: any) {
    console.error('❌ Sign in error:', error);
    console.error('Error details:', { message: error.message, stack: error.stack });
    return { success: false, error: error.message || 'Invalid email or password' };
  }
}

// Sign in with OAuth (Google, GitHub)
export async function signInWithOAuth(provider: 'google' | 'github') {
  try {
    // Note: You MUST complete setup at https://supabase.com/docs/guides/auth/social-login
    // For Google: https://supabase.com/docs/guides/auth/social-login/auth-google
    // For GitHub: https://supabase.com/docs/guides/auth/social-login/auth-github
    // Without proper OAuth configuration, you will see "provider is not enabled" error
    
    // Get the current origin for redirect (use window.location.origin on frontend)
    const redirectUrl = typeof window !== 'undefined' 
      ? window.location.origin 
      : Deno.env.get('SUPABASE_URL');
    
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${redirectUrl}/auth/callback`
      }
    });

    if (error) {
      console.error(`OAuth ${provider} error:`, error);
      throw new Error(error.message);
    }

    return {
      success: true,
      url: data.url
    };
  } catch (error: any) {
    console.error(`OAuth ${provider} error:`, error);
    return { success: false, error: `${error.message}. Please ensure ${provider} OAuth is configured in Supabase Dashboard.` };
  }
}

// Get user from session
export async function getUser(accessToken: string) {
  try {
    const { data, error } = await supabaseClient.auth.getUser(accessToken);

    if (error) {
      console.error('Get user error:', error);
      throw new Error(error.message);
    }

    return {
      success: true,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.name
      }
    };
  } catch (error: any) {
    console.error('Get user error:', error);
    return { success: false, error: error.message };
  }
}

// Sign out user
export async function signOut(accessToken: string) {
  try {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      console.error('Sign out error:', error);
      throw new Error(error.message);
    }

    return { success: true };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return { success: false, error: error.message };
  }
}

// Middleware to verify authentication
export async function verifyAuth(request: Request): Promise<{ authorized: boolean; userId?: string; error?: string }> {
  try {
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { authorized: false, error: 'No authorization token provided' };
    }

    const accessToken = authHeader.split(' ')[1];
    const { data, error } = await supabaseClient.auth.getUser(accessToken);

    if (error || !data.user) {
      return { authorized: false, error: 'Invalid or expired token' };
    }

    return { authorized: true, userId: data.user.id };
  } catch (error: any) {
    console.error('Auth verification error:', error);
    return { authorized: false, error: error.message };
  }
}
