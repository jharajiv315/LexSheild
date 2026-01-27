export default {
  common: {
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    back: 'Back',
    next: 'Next',
    submit: 'Submit',
  },
  hero: {
    title: 'Your AI Legal Guardian',
    subtitle: 'Analyze any Terms of Service in 10 seconds. Know your rights before you click "I agree".',
    cta: 'Get Started',
    browseApps: 'Browse 30+ Apps',
    subtext: '100% Free • No Sign-Up Required • Instant Results',
    demo: 'See Live Demo',
    trustedBadge: 'Trusted by 12,500+ Users Worldwide',
    stats: {
      users: 'Users Protected',
      analyses: 'ToS Analyzed',
      risks: 'Risks Detected',
      saved: 'Hidden Fees Found',
    },
    problem: {
      badge: 'The Problem',
      title: 'Nobody Reads Terms of Service',
      desc: 'Yet we accept them every day, giving away our rights without knowing',
      stat1: "Don't Read Before Accepting",
      stat2: "Average Reading Time",
      stat3: "Agreements Signed Per Year",
      impactTitle: "The Cost of Not Knowing",
      impactDesc: "<bold>$14 billion lost annually</bold> to hidden fees, data sold without consent, and legal rights waived unknowingly"
    },
    process: {
       badge: "Simple Process",
       title: "How LexShield Works",
       desc: "Get your safety score in just 3 simple steps",
       steps: {
          1: { title: "Submit ToS", desc: "Paste text, upload file, or enter URL from any service" },
          2: { title: "AI Analyzes", desc: "Our AI scans thousands of clauses for hidden risks in seconds" },
          3: { title: "Get Results", desc: "Receive safety score, risk breakdown, and actionable insights" }
       }
    },
    features: {
        badge: "Complete Platform",
        title: "Everything You Need to Stay Protected",
        desc: "Comprehensive tools for understanding your digital rights",
        list: {
            ai: { title: "AI-Powered Analysis", desc: "Advanced NLP detects hidden risks and unfair clauses instantly" },
            scoring: { title: "Safety Scoring 0-100", desc: "Clear A-F grades with critical, high, medium, and low risk breakdown" },
            assistant: { title: "AI Legal Assistant", desc: "24/7 chatbot answers your questions about specific clauses" },
            comparison: { title: "Service Comparison", desc: "Compare terms side-by-side to find the safest alternatives" },
            apps: { title: "30+ Pre-Analyzed Apps", desc: "Instant access to popular services like Instagram, TikTok, Netflix" },
            tracking: { title: "Change Tracking", desc: "Get notified when Terms of Service are updated or modified" },
            gamification: { title: "Gamification System", desc: "Earn XP, unlock badges, and climb the leaderboard" },
            languages: { title: "11 Languages", desc: "Accessible in English, Spanish, Hindi, Chinese, and 7 more" },
            analytics: { title: "Analytics Dashboard", desc: "Track trends, view statistics, and explore platform insights" }
        }
    },
    testimonials: {
      title: "Trusted by Thousands",
      desc: "Real people protecting their digital rights every day",
      items: {
        1: { quote: "LexShield helped me understand what Instagram was doing with my photos. I changed my privacy settings immediately!", author: "Sarah M.", role: "Content Creator" },
        2: { quote: "As a small business owner, I use this for every SaaS tool we evaluate. Saved us from a terrible contract!", author: "Mike Chen", role: "Startup Founder" },
        3: { quote: "Finally, someone made legal jargon understandable. The AI chatbot answers all my questions in plain English.", author: "Priya Sharma", role: "Privacy Advocate" }
      }
    },
    finalCta: {
      title: "Ready to Protect Your Rights?",
      desc: "Join 12,500+ users who analyze Terms of Service before clicking \"I agree\"",
      button: "Get Started Now",
      note: "No credit card required • Takes 10 seconds"
    }
  },
  analyzer: {
    title: 'Analyze Any Terms of Service',
    subtitle: 'Paste text, upload a file, or enter a URL. Get your safety score in 10 seconds.',
    backToHome: 'Back to Home',
    tabs: {
      text: 'Text Input',
      url: 'URL Input',
      file: 'File Upload',
    },
    placeholder: 'Paste the Terms of Service here... (Try Instagram, Facebook, TikTok, or any service)',
    urlPlaceholder: 'https://example.com/terms-of-service',
    urlNote: "We'll automatically extract and analyze the terms from this URL",
    fileUpload: {
      title: 'Drop your file here',
      subtitle: 'Supports PDF, TXT, DOC, DOCX (Max 10MB)',
      browse: 'Or browse files',
    },
    analyze: 'Analyze Terms of Service',
    analyzing: 'Analyzing...',
    progress: {
      parsing: 'Parsing document...',
      analyzing: 'Analyzing clauses...',
      detecting: 'Detecting risks...',
      generating: 'Generating report...',
    },
    examples: 'Quick Examples (Click to try):',
    tryService: 'Try',
    howItWorks: {
      step1: {
        title: 'Submit ToS',
        desc: 'Paste text, upload file, or enter URL',
      },
      step2: {
        title: 'AI Analysis',
        desc: 'Our AI scans for hidden risks and unfair terms',
      },
      step3: {
        title: 'Get Results',
        desc: 'Receive safety score and detailed breakdown',
      },
    },
  },
  results: {
    title: 'Safety Analysis Complete',
    newAnalysis: 'New Analysis',
    compare: 'Compare',
    share: 'Share',
    download: 'Download Report',
    verdict: {
      safe: {
        title: 'Safe to Use',
        desc: 'This service has fair and transparent terms.',
      },
      caution: {
        title: 'Acceptable with Caution',
        desc: 'Some concerns, but generally reasonable terms.',
      },
      warning: {
        title: 'Proceed with Caution',
        desc: 'Multiple high-risk clauses that may compromise your rights.',
      },
      danger: {
        title: 'High Risk - Avoid',
        desc: 'Numerous problematic terms. Consider alternatives.',
      },
    },
    tabs: {
      high: 'High Risk',
      medium: 'Medium Risk',
      safe: 'Fair Terms',
    },
    chatPrompt: {
      title: 'Have Questions?',
      desc: 'Ask our AI assistant anything about these terms',
      button: 'Chat with AI Assistant',
    },
  },
  chatbot: {
    welcome: "Hi! I'm your Legal Guardian Assistant. I've analyzed the",
    welcomeMessage: "Terms of Service. Ask me anything about the risks, clauses, or your rights!",
    justNow: 'Just now',
    placeholder: 'Type your question...',
    send: 'Send',
    quickQuestions: {
      data: 'Can they sell my data?',
      worst: 'What are the worst clauses?',
      sue: 'Can I sue them in court?',
      protect: 'How can I protect myself?',
    },
    title: 'Ask Me Anything',
    subtitle: 'Get instant answers about your Terms of Service',
    aiPowered: 'AI-Powered Legal Assistant',
    backToResults: 'Back to Results',
  },
  gamification: {
    title: 'Your Guardian Profile',
    subtitle: 'Level up by protecting your rights!',
    back: 'Back',
    level: 'Level',
    xp: 'XP',
    nextLevel: 'Next Level',
    currentLevel: 'Current Level',
    xpProgress: 'XP Progress',
    xpUntil: 'XP until Level',
    badges: {
      title: 'Achievement Badges',
      earned: 'Earned',
      locked: 'Locked',
      firstShield: 'First Shield',
      firstShieldDesc: 'Complete your first analysis',
      weekWarrior: 'Week Warrior',
      weekWarriorDesc: '7-day analysis streak',
      riskHunter: 'Risk Hunter',
      riskHunterDesc: 'Find 100+ high risks',
      socialGuardian: 'Social Guardian',
      socialGuardianDesc: 'Share 10 analyses',
      eliteProtector: 'Elite Protector',
      eliteProtectorDesc: 'Reach Level 10',
      privacyHawk: 'Privacy Hawk',
      privacyHawkDesc: 'Analyze 250 ToS',
      unlocked: 'Unlocked!',
    },
    leaderboard: {
      title: 'Community Leaderboard',
      rank: 'Rank',
      you: 'You',
    },
    activity: {
      title: 'Recent Activity',
    },
    stats: {
      tosAnalyzed: 'ToS Analyzed',
      risksFound: 'Risks Found',
      thisWeek: 'this week',
      avgPerTos: 'Avg per ToS',
      analyses: 'Total Analyses',
      risks: 'Risks Found',
      streak: 'Day Streak',
      member: 'Member Since',
    },
  },
  comparison: {
    title: 'Service Comparison',
    subtitle: 'Compare privacy and safety across popular services',
    back: 'Back',
    bestChoice: 'Best Choice',
    highestSafety: 'Highest safety score with minimal high-risk clauses',
    viewAnalysis: 'View Full Analysis',
    industryBenchmarks: 'Industry Benchmarks',
    socialMediaAvg: 'Social Media Average',
    messagingAvg: 'Messaging Apps Average',
    ecommerceAvg: 'E-commerce Average',
    selectService: 'Select Service',
    winner: 'Winner!',
    grade: 'Grade',
    categories: {
      overall: 'Overall Score',
      privacy: 'Privacy Protection',
      data: 'Data Rights',
      legal: 'Legal Rights',
      transparency: 'Transparency',
    },
  },
  profile: {
    title: 'User Profile',
    editProfile: 'Edit Profile',
    saveChanges: 'Save Changes',
    username: 'Username',
    email: 'Email',
    stats: {
      title: 'Your Statistics',
    },
    history: {
      title: 'Analysis History',
      service: 'Service',
      score: 'Score',
      date: 'Date',
    },
  },
  analytics: {
    title: 'Analytics Dashboard',
    kpi: {
      analyses: 'Total Analyses',
      users: 'Active Users',
      avgScore: 'Avg Safety Score',
      risks: 'Critical Risks',
    },
    charts: {
      trend: 'Analysis Trends',
      distribution: 'Risk Distribution',
      categories: 'Category Scores',
      comparison: 'Privacy Comparison',
      heatmap: 'Activity Heatmap',
    },
    timeRange: {
      week: '7 Days',
      month: '30 Days',
      quarter: '90 Days',
      year: '1 Year',
    },
    topServices: 'Top Analyzed Services',
  },
  navbar: {
    analyzer: 'Analyzer',
    analytics: 'Analytics',
    dashboard: 'Dashboard',
    compare: 'Compare',
    chat: 'AI Chat',
    profile: 'Profile',
  },
  footer: {
    tagline: "AI-powered legal protection for everyone. Analyze Terms of Service in seconds.",
    product: {
      title: "Product",
      features: "Features",
      howItWorks: "How it Works",
      pricing: "Pricing",
      faq: "FAQ"
    },
    resources: {
      title: "Resources",
      blog: "Blog",
      guide: "Legal Guide",
      api: "API Docs",
      support: "Support"
    },
    legal: {
      title: "Legal",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
      cookie: "Cookie Policy",
      disclaimer: "Disclaimer"
    },
    copyright: "© 2026 LexShield. All rights reserved."
  }
};