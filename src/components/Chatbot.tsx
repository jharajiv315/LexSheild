import { ArrowLeft, Send, Sparkles, Bot, User as UserIcon, AlertTriangle } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatbotProps {
  analysisResults: any;
  onBack: () => void;
}

export function Chatbot({ analysisResults, onBack }: ChatbotProps) {
  const { t } = useLanguage();
  const serviceName = analysisResults?.serviceName || 'the service';
  const safetyScore = analysisResults?.safetyScore || analysisResults?.score || 0;
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: `Welcome! I'm your AI Legal Assistant. I've analyzed the ${serviceName} Terms of Service. Ask me anything about data sharing, your rights, risks, or specific clauses. How can I help you today?`,
      time: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickQuestions = [
    'Can they sell my data?',
    'What are the worst clauses?',
    'Can I sue them in court?',
    'How can I protect myself?',
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Generate intelligent AI response based on actual analysis data
  const generateResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    // Get actual risks from analysis
    const criticalRisks = analysisResults?.risks?.critical || [];
    const highRisks = analysisResults?.risks?.high || [];
    const mediumRisks = analysisResults?.risks?.medium || [];
    const allHighRisks = [...criticalRisks, ...highRisks];
    const positives = analysisResults?.positives || [];
    const recommendations = analysisResults?.recommendations || [];

    // Data selling / sharing questions
    if (lowerQuestion.includes('data') && (lowerQuestion.includes('sell') || lowerQuestion.includes('share'))) {
      const dataRisk = allHighRisks.find(r => 
        r.title.toLowerCase().includes('data') || 
        r.description.toLowerCase().includes('data sharing') ||
        r.description.toLowerCase().includes('third party')
      );
      
      if (dataRisk) {
        return `Yes, there are significant data sharing concerns with ${serviceName}:\n\n❌ ${dataRisk.title}\n${dataRisk.description}\n\n💡 Impact Level: ${dataRisk.impact}\n\nI recommend reviewing your privacy settings and limiting what personal information you share on this platform.`;
      }
      return `Based on my analysis, ${serviceName} does collect and may share user data. Check the privacy settings to limit data sharing where possible.`;
    }

    // Worst clauses questions
    if (lowerQuestion.includes('worst') || lowerQuestion.includes('dangerous') || lowerQuestion.includes('concerning')) {
      if (allHighRisks.length === 0) {
        return `Good news! I didn't find any critical high-risk clauses in ${serviceName}'s terms. The safety score is ${safetyScore}/100, which is relatively good.`;
      }
      
      let response = `Based on my analysis, here are the ${Math.min(3, allHighRisks.length)} most concerning clauses in ${serviceName}'s Terms:\n\n`;
      
      allHighRisks.slice(0, 3).forEach((risk, idx) => {
        response += `${idx + 1}. ❌ ${risk.title}\n   ${risk.description}\n   Impact: ${risk.impact}\n\n`;
      });
      
      return response + `Overall Safety Score: ${safetyScore}/100 (Grade: ${analysisResults.grade})`;
    }

    // Legal action / arbitration questions
    if (lowerQuestion.includes('sue') || lowerQuestion.includes('court') || lowerQuestion.includes('arbitration') || lowerQuestion.includes('legal')) {
      const arbitrationRisk = allHighRisks.find(r => 
        r.title.toLowerCase().includes('arbitration') || 
        r.description.toLowerCase().includes('arbitration') ||
        r.description.toLowerCase().includes('sue') ||
        r.description.toLowerCase().includes('court')
      );
      
      if (arbitrationRisk) {
        return `⚖️ ${arbitrationRisk.title}\n\n${arbitrationRisk.description}\n\nThis means your legal options are significantly limited. You'll likely need to resolve disputes through private arbitration instead of court, which can be more expensive and limits your ability to join class action lawsuits.`;
      }
      return `I didn't find specific arbitration clauses in my analysis. However, always check the "Dispute Resolution" section of the full Terms of Service for details about your legal rights.`;
    }

    // Content ownership questions
    if (lowerQuestion.includes('content') || lowerQuestion.includes('photos') || lowerQuestion.includes('videos') || lowerQuestion.includes('ownership')) {
      const contentRisk = allHighRisks.find(r => 
        r.title.toLowerCase().includes('content') || 
        r.title.toLowerCase().includes('ownership') ||
        r.description.toLowerCase().includes('license')
      );
      
      if (contentRisk) {
        return `📸 ${contentRisk.title}\n\n${contentRisk.description}\n\nThis is a common but concerning clause. While you technically retain ownership, you grant the platform broad rights to use your content, sometimes without compensation.`;
      }
      return `Content ownership terms weren't flagged as high-risk in this analysis, but always be cautious about what you post publicly.`;
    }

    // Protection / safety questions
    if (lowerQuestion.includes('protect') || lowerQuestion.includes('safe') || lowerQuestion.includes('secure')) {
      let response = `Here are the key ways to protect yourself when using ${serviceName}:\n\n`;
      
      if (recommendations.length > 0) {
        recommendations.slice(0, 5).forEach((rec, idx) => {
          response += `${idx + 1}. ${rec}\n`;
        });
      } else {
        response += `1. Review privacy settings regularly\n2. Limit personal information sharing\n3. Enable two-factor authentication\n4. Read policy updates\n5. Be cautious with third-party apps\n`;
      }
      
      if (positives.length > 0) {
        response += `\n✅ Good news - ${serviceName} does have some positive terms:\n`;
        positives.slice(0, 2).forEach(pos => {
          response += `• ${pos.title}: ${pos.description}\n`;
        });
      }
      
      return response;
    }

    // Score / rating questions
    if (lowerQuestion.includes('score') || lowerQuestion.includes('rating') || lowerQuestion.includes('grade')) {
      return `${serviceName} received a safety score of ${safetyScore}/100 (Grade: ${analysisResults.grade}).\n\nBreakdown:\n• Critical/High Risks: ${allHighRisks.length}\n• Medium Risks: ${mediumRisks.length}\n• Fair Terms: ${positives.length}\n\n${safetyScore >= 70 ? 'This is a relatively good score.' : safetyScore >= 50 ? 'Proceed with caution - there are notable concerns.' : 'This is a concerning score with multiple high-risk clauses.'}`;
    }

    // Privacy questions
    if (lowerQuestion.includes('privacy') || lowerQuestion.includes('tracking') || lowerQuestion.includes('collect')) {
      const privacyRisk = [...allHighRisks, ...mediumRisks].find(r => 
        r.title.toLowerCase().includes('privacy') || 
        r.title.toLowerCase().includes('collection') ||
        r.description.toLowerCase().includes('tracking')
      );
      
      if (privacyRisk) {
        return `🔍 Privacy Concern Found:\n\n${privacyRisk.title}\n${privacyRisk.description}\n\nPrivacy Score: ${safetyScore}/100\n\nI recommend checking the privacy settings and limiting data collection where possible.`;
      }
      return `Privacy terms weren't specifically flagged, but ${serviceName} scored ${safetyScore}/100 overall. Always review privacy settings after signing up.`;
    }

    // Refund / payment questions
    if (lowerQuestion.includes('refund') || lowerQuestion.includes('payment') || lowerQuestion.includes('subscription') || lowerQuestion.includes('cancel')) {
      const paymentRisk = [...allHighRisks, ...mediumRisks].find(r => 
        r.title.toLowerCase().includes('refund') || 
        r.title.toLowerCase().includes('renewal') ||
        r.title.toLowerCase().includes('subscription')
      );
      
      if (paymentRisk) {
        return `💳 ${paymentRisk.title}\n\n${paymentRisk.description}\n\nMake sure to check cancellation procedures and set reminders before renewal dates.`;
      }
      return `I didn't find specific refund/payment issues in the analysis, but always review billing terms carefully and set up cancellation reminders.`;
    }

    // Account termination questions
    if (lowerQuestion.includes('ban') || lowerQuestion.includes('terminate') || lowerQuestion.includes('delete') || lowerQuestion.includes('close account')) {
      return `Account termination policies vary by service. Based on the analysis:\n\nSafety Score: ${safetyScore}/100\n\nCommon concerns:\n• Services often reserve the right to terminate accounts without notice\n• You should have the right to delete your account and data\n• Check if there's an appeal process\n\nAlways download your data before closing an account.`;
    }

    // Changes to terms questions
    if (lowerQuestion.includes('change') && lowerQuestion.includes('terms')) {
      const changeRisk = allHighRisks.find(r => 
        r.title.toLowerCase().includes('change') || 
        r.description.toLowerCase().includes('modify')
      );
      
      if (changeRisk) {
        return `⚠️ ${changeRisk.title}\n\n${changeRisk.description}\n\nThis means they can change the rules at any time, potentially without proper notice. Stay alert for policy update notifications.`;
      }
      return `Terms changes weren't flagged as high-risk, but always read update notifications when the terms change.`;
    }

    // Default response with context
    return `Great question! Based on my analysis of ${serviceName}:\n\n📊 Safety Score: ${safetyScore}/100 (Grade: ${analysisResults.grade})\n🚨 High-Risk Issues: ${allHighRisks.length}\n⚠️ Medium Concerns: ${mediumRisks.length}\n✅ Fair Terms: ${positives.length}\n\n${allHighRisks.length > 0 ? `Top concern: ${allHighRisks[0].title}` : 'No critical issues found.'}\n\nCould you be more specific about what aspect you'd like to know about? (e.g., data sharing, legal rights, content ownership, privacy)`;
  };

  const handleSend = (question?: string) => {
    const messageText = question || input;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      text: messageText,
      time: 'Just now'
    };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Generate AI response
    setTimeout(() => {
      const aiResponse = generateResponse(messageText);
      
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        text: aiResponse,
        time: 'Just now'
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds for realism
  };

  return (
    <section className="py-12 px-6 bg-[#0A0E1A] min-h-screen">
      <div className="container mx-auto max-w-4xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Results
        </button>

        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4"
          >
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-purple-400 font-medium">AI-Powered Legal Assistant</span>
          </motion.div>
          
          <h2 className="text-4xl font-bold text-white mb-2">Ask Me Anything</h2>
          <p className="text-gray-400">Get instant answers about {serviceName} Terms of Service</p>
        </div>

        {/* Chat Container */}
        <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white">Legal Guardian AI</div>
                <div className="text-xs text-blue-100 flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  Online • Responds instantly
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 custom-scrollbar">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'bot' 
                      ? 'bg-gradient-to-br from-blue-500 to-purple-600' 
                      : 'bg-gradient-to-br from-gray-600 to-gray-700'
                  }`}>
                    {message.type === 'bot' ? (
                      <Bot size={18} className="text-white" />
                    ) : (
                      <UserIcon size={18} className="text-white" />
                    )}
                  </div>

                  {/* Message Bubble */}
                  <div className={`max-w-[75%] ${message.type === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.type === 'bot'
                        ? 'bg-white/5 border border-white/10'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600'
                    }`}>
                      <p className="text-sm text-white whitespace-pre-line leading-relaxed">{message.text}</p>
                    </div>
                    <span className="text-xs text-gray-500 px-2">{message.time}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Typing Indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-2xl">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Invisible element for auto-scroll */}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="p-4 border-t border-white/10 bg-white/5">
            <p className="text-xs text-gray-400 mb-3 flex items-center gap-2">
              <Sparkles size={14} />
              Quick Questions:
            </p>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q)}
                  className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-xs text-gray-300 hover:bg-blue-600/20 hover:border-blue-500/50 transition-all"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            {/* Legal Disclaimer Banner */}
            <div className="mb-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-start gap-2 text-xs">
                <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-gray-300">
                  <strong className="text-yellow-400">Not Legal Advice:</strong> This AI assistant provides information only. <strong>We display rationale and a disclaimer: not legal advice; the tool aids triage, not legal counsel.</strong>
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !isTyping && handleSend()}
                placeholder="Ask about data sharing, arbitration, refunds..."
                disabled={isTyping}
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-50"
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-medium text-white hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3"
        >
          <Sparkles className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="text-blue-400 font-medium mb-1">🤖 Context-Aware AI Responses</p>
            <p className="text-gray-400">
              This AI assistant analyzes your specific Terms of Service document (Safety Score: {safetyScore}/100) and provides tailored answers based on the actual risks found. Ask anything about data privacy, legal rights, refunds, or specific clauses.
            </p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.7);
        }
      `}</style>
    </section>
  );
}
