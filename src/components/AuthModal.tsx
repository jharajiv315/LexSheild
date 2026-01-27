import { useState } from "react";
import {
  X,
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Shield,
  Sparkles,
  Github,
  Chrome,
  CheckCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { createClient } from "@supabase/supabase-js";
import { projectId, publicAnonKey } from "../utils/supabase/info";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
}

export function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [serverTest, setServerTest] = useState<string>("");
  const [useLocalMode, setUseLocalMode] = useState(false);

  // Local fallback authentication (for testing when server is down)
  const handleLocalAuth = async () => {
    console.log("🔧 Using local fallback authentication");

    // Store in localStorage
    const userId = `local-${Date.now()}`;
    const userData = {
      id: userId,
      email,
      name: name || email.split("@")[0],
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
      totalAnalyses: 0,
      risksFound: 0,
      streakDays: 0,
      badges: ["newcomer"],
      joinDate: new Date().toISOString(),
    };

    if (mode === "signup") {
      // Store user credentials
      const users = JSON.parse(localStorage.getItem("lexshield_users") || "{}");
      users[email] = { password, ...userData };
      localStorage.setItem("lexshield_users", JSON.stringify(users));
    } else {
      // Check credentials
      const users = JSON.parse(localStorage.getItem("lexshield_users") || "{}");
      if (!users[email] || users[email].password !== password) {
        throw new Error("Invalid email or password");
      }
      Object.assign(userData, users[email]);
    }

    // Store session
    localStorage.setItem("lexshield_user", JSON.stringify(userData));
    localStorage.setItem(
      "lexshield_session",
      JSON.stringify({
        access_token: `local-token-${userId}`,
        user: userData,
      }),
    );

    setSuccess(true);
    setTimeout(() => {
      onAuthSuccess({
        success: true,
        user: userData,
        session: { access_token: `local-token-${userId}` },
      });
    }, 1000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setLoading(true);

    console.log("🔐 Auth submission started:", { mode, email, useLocalMode });

    // Use local mode if enabled
    if (useLocalMode) {
      try {
        await handleLocalAuth();
        setLoading(false);
        return;
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
        return;
      }
    }

    try {
      // Validation
      if (mode === "signup" && name.trim().length < 2) {
        throw new Error("Name must be at least 2 characters long");
      }
      if (!email.includes("@")) {
        throw new Error("Please enter a valid email address");
      }
      if (password.length < 6) {
        throw new Error("Password must be at least 6 characters long");
      }

      const apiBase = `https://${projectId}.supabase.co/functions/v1/make-server-c0f89565`;

      console.log("📡 API Base URL:", apiBase);
      console.log("🔑 Anon Key:", publicAnonKey ? "✅ Loaded" : "❌ Missing");

      if (!projectId) {
        throw new Error(
          "Supabase configuration not loaded. Please refresh the page.",
        );
      }

      if (!publicAnonKey) {
        throw new Error(
          "Supabase API key not loaded. Please refresh the page.",
        );
      }

      if (mode === "signup") {
        // Sign up
        console.log("📤 Sending signup request...");
        const response = await fetch(`${apiBase}/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email, password, name }),
        });

        console.log("📥 Signup response status:", response.status);

        let data;
        try {
          data = await response.json();
          console.log("📦 Signup response data:", data);
        } catch (parseError) {
          console.error("❌ Failed to parse signup response:", parseError);
          throw new Error(
            "Server returned invalid response. Please try again.",
          );
        }

        if (!response.ok) {
          console.error("❌ Signup failed:", data);
          throw new Error(
            data.error || `Signup failed with status ${response.status}`,
          );
        }

        if (!data.success) {
          // Check if it's a "user already exists" error
          if (
            data.error === "USER_ALREADY_EXISTS" ||
            data.code === "user_exists" ||
            data.error?.toLowerCase().includes("already") ||
            data.error?.toLowerCase().includes("registered") ||
            data.error?.toLowerCase().includes("exists")
          ) {
            // User-friendly message with action
            console.log("ℹ️ User already exists, switching to Sign In mode");
            setError("⚠️ Account exists! Switching to Sign In mode...");
            setLoading(false);
            setTimeout(() => {
              setMode("signin");
              setError("");
              // Keep the email and password filled in
            }, 2000);
            return;
          }
          throw new Error(data.error || "Signup failed");
        }

        console.log("✅ Signup successful!");
        setSuccess(true);
        setTimeout(() => {
          onAuthSuccess(data);
        }, 1000);
      } else {
        // Sign in
        console.log("📤 Sending signin request...");
        const response = await fetch(`${apiBase}/auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ email, password }),
        });

        console.log("📥 Signin response status:", response.status);

        let data;
        try {
          data = await response.json();
          console.log("📦 Signin response data:", data);
        } catch (parseError) {
          console.error("❌ Failed to parse signin response:", parseError);
          throw new Error(
            "Server returned invalid response. Please try again.",
          );
        }

        if (!response.ok) {
          console.error("❌ Signin failed:", data);
          throw new Error(
            data.error || `Sign in failed with status ${response.status}`,
          );
        }

        if (!data.success) {
          throw new Error(data.error || "Sign in failed");
        }

        console.log("✅ Signin successful!");
        setSuccess(true);
        setTimeout(() => {
          onAuthSuccess(data);
        }, 1000);
      }
    } catch (err: any) {
      console.error("❌ Authentication error:", err);
      console.error("Error details:", {
        message: err.message,
        stack: err.stack,
        name: err.name,
      });

      // Provide user-friendly error messages
      let userMessage =
        err.message || "Authentication failed. Please try again.";

      if (
        err.message?.includes("fetch") ||
        err.message?.includes("NetworkError") ||
        err.message?.includes("Failed to fetch")
      ) {
        userMessage =
          'Server unavailable. Try enabling "Local Mode" below to continue without server.';
        // Auto-suggest local mode
        console.log("💡 Tip: Enable Local Mode to test without server");
      }

      setError(userMessage);
      setLoading(false);
    }
  };

  const testServerConnection = async () => {
    try {
      const apiBase = `https://${projectId}.supabase.co/functions/v1/make-server-c0f89565`;

      console.log("🧪 Testing server connection:", `${apiBase}/test`);

      const response = await fetch(`${apiBase}/test`);
      const data = await response.json();

      console.log("✅ Server test result:", data);
      setServerTest("✅ Server is reachable!");

      return true;
    } catch (error) {
      console.error("❌ Server test failed:", error);
      setServerTest("�� Cannot reach server");
      return false;
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setError("");
    setLoading(true);

    try {
      if (!projectId || !publicAnonKey) {
        throw new Error("Supabase configuration missing");
      }

      // Create Supabase client for OAuth
      const supabase = createClient(
        `https://${projectId}.supabase.co`,
        publicAnonKey,
      );

      // Sign in with OAuth - this will redirect to provider
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      // The page will redirect, so we don't need to do anything else
      // Note: OAuth redirect will happen automatically
    } catch (err: any) {
      let errorMessage = err.message;

      // Provide helpful error messages
      if (
        errorMessage.includes("not enabled") ||
        errorMessage.includes("provider")
      ) {
        errorMessage = `${provider.charAt(0).toUpperCase() + provider.slice(1)} OAuth is not configured. Please follow the setup instructions at https://supabase.com/docs/guides/auth/social-login/auth-${provider}`;
      }

      setError(errorMessage);
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md max-h-[90vh] bg-[#0F1419] border border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors z-10"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-b border-white/10 p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {mode === "signin" ? "Welcome Back!" : "Join LexShield 🛡️"}
            </h2>
            <p className="text-gray-400">
              {mode === "signin"
                ? "Sign in to access your profile and history"
                : "Create your free account and start protecting your digital rights"}
            </p>
          </div>

          {/* Form */}
          <div className="p-8 overflow-y-auto flex-1">
            {/* Mode Tabs */}
            <div className="flex gap-2 mb-6 p-1 bg-white/5 rounded-xl">
              <button
                type="button"
                onClick={() => {
                  setMode("signup");
                  setError("");
                  setSuccess(false);
                  setEmail("");
                  setPassword("");
                  setName("");
                }}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                  mode === "signup"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode("signin");
                  setError("");
                  setSuccess(false);
                  setEmail("");
                  setPassword("");
                  setName("");
                }}
                className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all ${
                  mode === "signin"
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                Sign In
              </button>
            </div>

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-sm flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>
                  {mode === "signin"
                    ? "Welcome back! Redirecting..."
                    : "Account created successfully! Redirecting..."}
                </span>
              </motion.div>
            )}

            {/* Account Already Exists Warning */}
            {!error && !success && !serverTest && mode === "signup" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-4 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-2 border-amber-500/40 rounded-xl"
              >
                <div className="flex items-start gap-3">
                  <div className="text-amber-400 text-xl">⚠️</div>
                  <div>
                    <p className="text-sm text-amber-300 font-bold mb-2">
                      Already have an account?
                    </p>
                    <p className="text-xs text-gray-300 leading-relaxed mb-3">
                      If you're seeing "user already registered" errors, it
                      means your account exists! Click "Sign in here" below to
                      access your account.
                    </p>
                    <button
                      onClick={() => {
                        setMode("signin");
                        setError("");
                      }}
                      className="text-xs bg-amber-500 hover:bg-amber-600 text-black font-bold px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Switch to Sign In →
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Quick Start Tip */}
            {!error && !success && !serverTest && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl"
              >
                <div className="flex items-start gap-2">
                  <div className="text-purple-400 text-sm">💡</div>
                  <div>
                    <p className="text-xs text-purple-300 font-semibold mb-1">
                      Quick Start Tip
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      {mode === "signup"
                        ? "First time? Create a new account below"
                        : "Use the same email and password you created during sign up"}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Server Test Info */}
            {serverTest && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400 text-xs"
              >
                {serverTest}
              </motion.div>
            )}

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`mb-6 p-4 rounded-xl text-sm border-2 ${
                  error.includes("Account exists") ||
                  error.includes("Switching to Sign In")
                    ? "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-500/50 text-amber-300"
                    : "bg-red-500/10 border-red-500/20 text-red-400"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div className="text-2xl">
                    {error.includes("Account exists") ||
                    error.includes("Switching to Sign In")
                      ? "⚠️"
                      : "❌"}
                  </div>
                  <div>
                    <div className="font-bold mb-1 text-base">
                      {error.includes("Account exists") ||
                      error.includes("Switching to Sign In")
                        ? "🔄 Account Already Exists!"
                        : "Error:"}
                    </div>
                    <div className="leading-relaxed">{error}</div>
                    {error.includes("Server") && (
                      <button
                        onClick={testServerConnection}
                        className="mt-2 text-xs underline hover:text-red-300"
                      >
                        Test server connection
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button
                onClick={() => handleSocialLogin("google")}
                disabled={loading}
                className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <Chrome className="w-5 h-5 text-blue-400" />
                Continue with Google
              </button>
              <button
                onClick={() => handleSocialLogin("github")}
                disabled={loading}
                className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <Github className="w-5 h-5 text-purple-400" />
                Continue with GitHub
              </button>
            </div>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#0F1419] text-gray-400">
                  Or continue with email
                </span>
              </div>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "signup" && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="John Doe"
                      required
                      minLength={2}
                      className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Password <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full pl-11 pr-11 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {mode === "signup" && (
                  <p className="text-xs text-gray-500 mt-2">
                    Must be at least 6 characters
                  </p>
                )}
              </div>

              {mode === "signin" && (
                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit Button Section */}
              <div className="pt-2">
                <div className="mb-3 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
                  <span>
                    {mode === "signup"
                      ? "Ready to join?"
                      : "Ready to continue?"}
                  </span>
                  <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] font-mono">
                    Enter ↵
                  </span>
                </div>
                <button
                  type="submit"
                  disabled={loading || success}
                  className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-lg shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>
                        {mode === "signin"
                          ? "Signing in..."
                          : "Creating account..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      <span>
                        {mode === "signin" ? "Sign In Now" : "Create Account"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Toggle Mode */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                {mode === "signin"
                  ? "Don't have an account? "
                  : "Already have an account? "}
                <button
                  onClick={() => {
                    setMode(mode === "signin" ? "signup" : "signin");
                    setError("");
                    setSuccess(false);
                    // Keep email and password, only clear name when switching to signin
                    if (mode === "signup") {
                      setName("");
                    }
                  }}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors underline decoration-blue-400/30 hover:decoration-blue-300"
                >
                  {mode === "signin" ? "Create an account" : "Sign in here"}
                </button>
              </p>
            </div>

            {/* Mode Info */}
            {useLocalMode ? (
              <div className="mt-6 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                <div className="flex items-start gap-2">
                  <div className="text-yellow-500 text-sm">⚠️</div>
                  <div>
                    <p className="text-xs text-yellow-400 font-semibold mb-1">
                      Local Mode Active
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Your account data will be stored in your browser only.
                      Perfect for testing!
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                <p className="text-xs text-gray-400 text-center leading-relaxed">
                  By continuing, you agree to our Terms of Service and Privacy
                  Policy. We'll protect your data with industry-standard
                  encryption.
                </p>
              </div>
            )}

            {/* Debug Panel */}
            <div className="mt-4 p-3 bg-gray-800/50 border border-white/5 rounded-lg">
              <div className="text-xs text-gray-500 mb-2 font-semibold">
                Debug Info:
              </div>
              <div className="space-y-2 text-[10px] text-gray-600 font-mono">
                <div>Project ID: {projectId ? "✅ Loaded" : "❌ Missing"}</div>
                <div>API Key: {publicAnonKey ? "✅ Loaded" : "❌ Missing"}</div>
                {!projectId || !publicAnonKey ? (
                  <div className="text-red-400 pt-1">
                    ⚠️ Missing config - use Local Mode
                  </div>
                ) : null}

                {/* Local Mode Toggle */}
                <div className="pt-2 border-t border-white/5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={useLocalMode}
                      onChange={(e) => setUseLocalMode(e.target.checked)}
                      className="w-3 h-3 rounded border-gray-600 bg-gray-700 checked:bg-blue-500"
                    />
                    <span className="text-xs text-gray-400">
                      Use Local Mode (no server required)
                    </span>
                  </label>
                  {useLocalMode && (
                    <div className="mt-1 text-[10px] text-yellow-500">
                      ⚠️ Data stored locally only
                    </div>
                  )}
                </div>

                {!useLocalMode && (
                  <button
                    onClick={testServerConnection}
                    className="mt-2 w-full px-3 py-1 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded text-blue-400 text-xs transition-colors"
                  >
                    Test Server Connection
                  </button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
