import { useState, useEffect } from 'react';
import { Hero } from './components/Hero';
import { Analyzer } from './components/Analyzer';
import { Results } from './components/Results';
import { Gamification } from './components/Gamification';
import { Comparison } from './components/Comparison';
import { Chatbot } from './components/Chatbot';
import { UserProfile } from './components/UserProfile';
import { Analytics } from './components/Analytics';
import { AppDatabase } from './components/AppDatabase';
import { ClauseTracking } from './components/ClauseTracking';
import { Navbar } from './components/Navbar';
import { api } from './services/api';


export type ViewType = 'hero' | 'analyzer' | 'results' | 'gamification' | 'comparison' | 'profile' | 'chatbot' | 'analytics' | 'apps' | 'tracking';

interface AnalysisResult {
  serviceName: string;
  safetyScore: number;
  grade: string;
  analysisDate: string;
  risks: {
    critical: Array<{ title: string; description: string; impact: string }>;
    high: Array<{ title: string; description: string; impact: string }>;
    medium: Array<{ title: string; description: string; impact: string }>;
    low: Array<{ title: string; description: string; impact: string }>;
  };
  positives: Array<{ title: string; description: string }>;
  recommendations: string[];
}

interface UserData {
  id: string;
  name?: string;
  username?: string;
  email: string;
  avatar?: string;
  level: number;
  xp: number;
  xpToNextLevel: number;
  totalAnalyses: number;
  risksFound: number;
  streakDays: number;
  badges: string[];
  joinDate: string;
  analysisHistory: Array<{
    id: number;
    serviceName: string;
    score: number;
    date: string;
  }>;
}

function App() {
  const [currentView, setCurrentView] = useState<ViewType>('hero');
  const [analysisResults, setAnalysisResults] = useState<AnalysisResult | null>(null);
  const [user, setUser] = useState<UserData | null>({
    id: 'guest-user',
    name: 'Guest User',
    username: 'guest',
    email: 'guest@example.com',
    level: 1,
    xp: 0,
    xpToNextLevel: 100,
    totalAnalyses: 0,
    risksFound: 0,
    streakDays: 0,
    badges: [],
    joinDate: new Date().toISOString(),
    analysisHistory: []
  });
  const [loading, setLoading] = useState(false);


  // Handle sign out - Reset to guest
  const handleSignOut = async () => {
    // Just reset view, user stays as guest
    setCurrentView('hero');
    alert('Resetting session...');
  };

  const handleStartAnalysis = () => {
    // No login required

    setCurrentView('analyzer');
  };

  const handleAnalysisComplete = async (results: AnalysisResult) => {
    setAnalysisResults(results);

    // Local update only for guest
    if (user) {
      // simulate score update
    }
    
    setCurrentView('results');
  };

  const handleNavigate = (view: ViewType) => {
    // No login required for navigation


    // Prevent navigating to chatbot without results
    if (view === 'chatbot' && !analysisResults) {
      alert('Please analyze a Terms of Service first to use the chatbot feature.');
      return;
    }
    
    setCurrentView(view);
  };

  // Handle analyzing a pre-analyzed app from database
  const handleAnalyzeApp = (app: any) => {
    // No login required

    // Convert app data to analysis results format
    const mockResults: AnalysisResult = {
      serviceName: app.name,
      safetyScore: app.score,
      grade: app.grade,
      analysisDate: new Date().toISOString(),
      risks: {
        critical: app.risks.slice(0, Math.min(2, app.risks.length)).map((risk: string) => ({
          title: risk,
          description: `Critical issue detected in ${app.name} Terms of Service: ${risk}`,
          impact: 'HIGH'
        })),
        high: app.risks.slice(2, Math.min(4, app.risks.length)).map((risk: string) => ({
          title: risk,
          description: `High risk clause found in ${app.name} ToS: ${risk}`,
          impact: 'MEDIUM'
        })),
        medium: app.risks.slice(4).map((risk: string) => ({
          title: risk,
          description: `Medium risk identified in ${app.name}: ${risk}`,
          impact: 'LOW'
        })),
        low: []
      },
      positives: [
        { title: 'Data Encryption', description: 'Uses industry-standard encryption protocols.' },
        { title: 'Transparency', description: 'Terms are clearly written and accessible.' }
      ],
      recommendations: [
        'Review privacy settings regularly',
        'Limit data sharing permissions',
        'Enable two-factor authentication',
        `Be aware of: ${app.topRisk}`
      ]
    };
    
    setAnalysisResults(mockResults);
    setCurrentView('results');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A0E1A] flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  useEffect(() => {
    // Check backend connection
    api.healthCheck()
      .then(data => console.log('Backend connected:', data))
      .catch(err => console.error('Backend connection failed:', err));
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0A0E1A] text-white">
        {currentView !== 'hero' && (
          <Navbar
            user={user}
            currentView={currentView}
            onNavigate={handleNavigate}
            onAuthClick={() => {}} 
            onSignOut={handleSignOut}
          />
        )}

        {currentView === 'hero' && (
          <Hero 
            onGetStarted={handleStartAnalysis}
            onBrowseApps={() => handleNavigate('apps')}
            onAuthClick={() => {}}
          />
        )}

        {currentView === 'analyzer' && user && (
          <Analyzer
            onAnalysisComplete={handleAnalysisComplete}
            onBack={() => setCurrentView('hero')}
          />
        )}

        {currentView === 'results' && analysisResults && user && (
          <Results
            results={analysisResults}
            onBack={() => setCurrentView('analyzer')}
            onCompare={() => setCurrentView('comparison')}
            onChat={() => setCurrentView('chatbot')}
          />
        )}

        {currentView === 'gamification' && user && (
          <Gamification
            user={user}
            onBack={() => setCurrentView('analyzer')}
          />
        )}

        {currentView === 'comparison' && user && (
          <Comparison
            onBack={() => analysisResults ? setCurrentView('results') : setCurrentView('analyzer')}
          />
        )}

        {currentView === 'profile' && user && (
          <UserProfile
            user={user}
            onUpdateUser={setUser}
            onBack={() => setCurrentView('analyzer')}
          />
        )}

        {currentView === 'chatbot' && user && (
          <Chatbot
            analysisResults={analysisResults}
            onBack={() => analysisResults ? setCurrentView('results') : setCurrentView('analyzer')}
          />
        )}

        {currentView === 'analytics' && user && (
          <Analytics
            onBack={() => setCurrentView('analyzer')}
          />
        )}

        {currentView === 'apps' && user && (
          <AppDatabase
            onBack={() => setCurrentView('hero')}
            onAnalyzeApp={handleAnalyzeApp}
          />
        )}

        {currentView === 'tracking' && user && (
          <ClauseTracking
            onBack={() => setCurrentView('analyzer')}
          />
        )}


        {/* Auth Modal Removed */}

      </div>
    </LanguageProvider>
  );
}

export default App;
