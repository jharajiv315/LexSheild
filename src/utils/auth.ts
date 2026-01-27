import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-c0f89565`;

export async function signUp(email: string, password: string, name: string) {
  const response = await fetch(`${API_BASE}/auth/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, name })
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Signup failed');
  }

  return data;
}

export async function signIn(email: string, password: string) {
  const response = await fetch(`${API_BASE}/auth/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password })
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Sign in failed');
  }

  return data;
}

export async function signInWithOAuth(provider: 'google' | 'github') {
  const response = await fetch(`${API_BASE}/auth/${provider}`, {
    method: 'POST',
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'OAuth login failed');
  }

  return data;
}

export async function getCurrentUser(accessToken: string) {
  const response = await fetch(`${API_BASE}/auth/user`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to get user');
  }

  return data.user;
}

export async function signOut(accessToken: string) {
  const response = await fetch(`${API_BASE}/auth/signout`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Sign out failed');
  }

  return data;
}

export async function addAnalysisToProfile(accessToken: string, serviceName: string, score: number, risks: number) {
  const response = await fetch(`${API_BASE}/user/analysis`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },
    body: JSON.stringify({ serviceName, score, risks })
  });

  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to add analysis');
  }

  return data;
}
