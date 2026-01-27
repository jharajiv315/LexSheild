import { Shield, Upload, Link as LinkIcon, Sparkles, AlertTriangle, ArrowLeft, FileText, Loader } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../contexts/LanguageContext';

interface AnalyzerProps {
  onAnalysisComplete: (results: any) => void;
  onBack: () => void;
}

export function Analyzer({ onAnalysisComplete, onBack }: AnalyzerProps) {
  const { t } = useLanguage();
  const [inputMethod, setInputMethod] = useState<'text' | 'url' | 'file'>('text');
  const [tosText, setTosText] = useState('');
  const [url, setUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState('');

  const quickExamples = [
    { name: 'Instagram', sample: 'Instagram ToS: We may use your photos in advertisements. We can terminate your account at any time. You grant us a perpetual license to your content. We share data with Facebook and third parties. Forced arbitration required.' },
    { name: 'WhatsApp', sample: 'WhatsApp ToS: We collect metadata and share with Facebook. End-to-end encryption for messages. We may ban accounts. No liability for service interruptions. You must be 16 or older.' },
    { name: 'TikTok', sample: 'TikTok ToS: We own rights to your videos. Can use for marketing. Share data with ByteDance. Track your activity. Forced arbitration. Can change terms anytime.' },
    { name: 'Uber', sample: 'Uber ToS: Drivers are independent contractors. No liability for accidents. Dynamic pricing applies. Can suspend account. Binding arbitration required. Share trip data.' },
    { name: 'Netflix', sample: 'Netflix ToS: Automatic subscription renewal. Can change prices with 30 days notice. Geographic restrictions apply. No refunds. Can terminate service. Content varies by region.' },
  ];

  const handleAnalyze = async () => {
    if (!tosText && !url) return;

    setIsAnalyzing(true);
    setProgress(0);

    // Simulate analysis progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate AI analysis
    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);

      // Detect service name from text
      const detectServiceName = (text: string) => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('instagram')) return 'Instagram';
        if (lowerText.includes('whatsapp')) return 'WhatsApp';
        if (lowerText.includes('tiktok')) return 'TikTok';
        if (lowerText.includes('uber')) return 'Uber';
        if (lowerText.includes('netflix')) return 'Netflix';
        if (lowerText.includes('facebook')) return 'Facebook';
        if (lowerText.includes('twitter') || lowerText.includes('x.com')) return 'Twitter/X';
        if (lowerText.includes('amazon')) return 'Amazon';
        if (lowerText.includes('google')) return 'Google';
        return 'Unknown Service';
      };

      const serviceName = detectServiceName(tosText || url);
      const baseScore = Math.floor(Math.random() * 40) + 30; // 30-70
      const getGrade = (score: number) => {
        if (score >= 85) return 'A';
        if (score >= 70) return 'B';
        if (score >= 55) return 'C';
        if (score >= 40) return 'D';
        return 'F';
      };

      // Mock analysis results - matching the correct format
      const mockResults = {
        serviceName,
        safetyScore: baseScore,
        grade: getGrade(baseScore),
        analysisDate: new Date().toISOString(),
        risks: {
          critical: [
            {
              title: 'Data Sharing with Third Parties',
              description: 'Your personal information may be shared with thousands of advertising partners without explicit consent.',
              impact: 'HIGH'
            },
            {
              title: 'Forced Arbitration',
              description: 'You waive your right to sue in court. All disputes must go through binding arbitration.',
              impact: 'HIGH'
            }
          ],
          high: [
            {
              title: 'Content Ownership Transfer',
              description: 'Platform can use your photos, videos, and posts in advertisements without compensation.',
              impact: 'MEDIUM'
            },
            {
              title: 'Unilateral Terms Changes',
              description: 'Service can modify terms at any time without prior notice or user consent.',
              impact: 'MEDIUM'
            }
          ],
          medium: [
            {
              title: 'Automatic Renewal',
              description: 'Subscription automatically renews unless cancelled 24 hours before renewal.',
              impact: 'LOW'
            },
            {
              title: 'Data Collection Scope',
              description: 'Extensive data collection including location, contacts, and device information.',
              impact: 'LOW'
            },
            {
              title: 'Cookie Tracking',
              description: 'Third-party cookies track your activity across websites and apps.',
              impact: 'LOW'
            }
          ],
          low: []
        },
        positives: [
          {
            title: 'Data Encryption',
            description: 'Your data is encrypted in transit and at rest using industry-standard protocols.'
          },
          {
            title: 'Account Deletion Rights',
            description: 'You can permanently delete your account and all associated data at any time.'
          },
          {
            title: 'Transparent Policy Updates',
            description: 'Users will be notified 30 days before any policy changes take effect.'
          },
          {
            title: 'GDPR Compliance',
            description: 'Service complies with GDPR and provides data portability rights.'
          }
        ],
        recommendations: [
          'Review and adjust your privacy settings regularly',
          'Be cautious about what personal information you share',
          'Read policy updates when notified',
          'Consider using two-factor authentication',
          'Regularly review third-party app connections',
          'Download your data periodically as backup'
        ]
      };

      setTimeout(() => {
        setIsAnalyzing(false);
        onAnalysisComplete(mockResults);
      }, 500);
    }, 2500);
  };

  const loadExample = (example: any) => {
    setTosText(example.sample);
    setInputMethod('text');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    // Check file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    // Read file content
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setTosText(content);
      setInputMethod('text'); // Switch to text mode to show the content
    };

    // Handle different file types
    if (file.type === 'text/plain' || file.name.endsWith('.txt')) {
      reader.readAsText(file);
    } else if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
      // For PDF, show a message and simulate extraction
      setTosText(`PDF file "${file.name}" uploaded. In a production environment, this would extract text from the PDF.\n\nFor demo purposes, here's a sample Terms of Service:\n\nTerms of Service for Sample App:\n1. Data Collection: We collect your personal information including name, email, and usage data.\n2. Third-Party Sharing: We may share your data with advertising partners.\n3. Arbitration: All disputes must be resolved through binding arbitration.\n4. Content License: You grant us a perpetual license to use your content.\n5. Account Termination: We can suspend your account at any time.`);
      setInputMethod('text');
    } else {
      // For other types, try reading as text
      reader.readAsText(file);
    }
  };

  return (
    <section className="py-12 px-6 bg-[#0A0E1A] min-h-screen">
      <div className="container mx-auto max-w-6xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>

        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-6"
          >
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">AI-Powered Instant Analysis</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl font-bold text-white mb-4"
          >
            Analyze Any Terms of Service
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Paste text, upload a file, or enter a URL. Get your safety score in 10 seconds.
          </motion.p>
        </div>

        {/* Analyzer Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#111827] border border-white/10 rounded-2xl p-8 shadow-2xl"
        >
          {/* Input Method Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setInputMethod('text')}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300
                ${inputMethod === 'text'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }
              `}
            >
              <Sparkles className="w-4 h-4" />
              Text Input
            </button>
            
            <button
              onClick={() => setInputMethod('url')}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300
                ${inputMethod === 'url'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }
              `}
            >
              <LinkIcon className="w-4 h-4" />
              URL Input
            </button>
            
            <button
              onClick={() => setInputMethod('file')}
              className={`
                flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300
                ${inputMethod === 'file'
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }
              `}
            >
              <Upload className="w-4 h-4" />
              File Upload
            </button>
          </div>

          {/* Text Input */}
          {inputMethod === 'text' && (
            <div className="space-y-4">
              <textarea
                value={tosText}
                onChange={(e) => setTosText(e.target.value)}
                placeholder="Paste the Terms of Service here... (Try Instagram, Facebook, TikTok, or any service)"
                className="w-full h-64 bg-[#1F2937] border border-white/10 rounded-xl p-6 text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none font-mono text-sm"
              />
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  {tosText.length > 0 ? `${tosText.length} characters` : 'Start typing or select an example below...'}
                </span>
                <span className="text-gray-500">
                  {tosText.length > 0 ? `~${Math.ceil(tosText.length / 5)} words` : ''}
                </span>
              </div>
            </div>
          )}

          {/* URL Input */}
          {inputMethod === 'url' && (
            <div className="space-y-4">
              <div className="relative">
                <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/terms-of-service"
                  className="w-full bg-[#1F2937] border border-white/10 rounded-xl pl-12 pr-6 py-4 text-gray-200 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>We'll automatically extract and analyze the terms from this URL</span>
              </div>
            </div>
          )}

          {/* File Upload */}
          {inputMethod === 'file' && (
            <div>
              <label 
                htmlFor="file-upload" 
                className="border-2 border-dashed border-white/10 rounded-xl p-12 text-center hover:border-blue-500/50 transition-all cursor-pointer group block"
              >
                <input
                  id="file-upload"
                  type="file"
                  accept=".txt,.pdf,.doc,.docx"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500/10 rounded-full mb-4 group-hover:bg-blue-500/20 transition-all">
                  <Upload className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {fileName ? `Selected: ${fileName}` : 'Drop your file here or click to browse'}
                </h3>
                <p className="text-gray-400 mb-4">
                  Supports PDF, TXT, DOC, DOCX (Max 10MB)
                </p>
                <div className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 group-hover:bg-white/10 transition-all">
                  Browse files
                </div>
              </label>

              {fileName && (
                <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-sm font-medium text-white">{fileName}</p>
                        <p className="text-xs text-gray-400">File uploaded successfully</p>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setFileName('');
                        setTosText('');
                      }}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
              
              {/* Privacy Notice */}
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-start gap-3 text-left">
                  <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="text-green-400 font-semibold mb-1">🔒 Your Privacy is Protected</p>
                    <p className="text-gray-300">
                      <strong>Uploads are processed in-memory, deleted after session, and we can run locally to avoid external API calls.</strong>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={(!tosText && !url) || isAnalyzing}
            className="
              w-full mt-6 px-8 py-5 bg-gradient-to-r from-blue-600 to-purple-600 
              rounded-xl font-bold text-white text-lg 
              hover:shadow-2xl hover:shadow-blue-500/50 
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300 
              relative overflow-hidden group
            "
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isAnalyzing ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  Analyzing... {progress}%
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  Analyze Terms of Service
                </>
              )}
            </span>
            {!isAnalyzing && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            )}
          </button>

          {/* Progress Bar */}
          {isAnalyzing && (
            <div className="mt-4">
              <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                />
              </div>
              <div className="mt-2 text-center text-sm text-gray-400">
                {progress < 30 && 'Parsing document...'}
                {progress >= 30 && progress < 60 && 'Analyzing clauses...'}
                {progress >= 60 && progress < 90 && 'Detecting risks...'}
                {progress >= 90 && 'Generating report...'}
              </div>
            </div>
          )}

          {/* Quick Examples */}
          <div className="mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-gray-500" />
              <p className="text-sm text-gray-500">Quick Examples (Click to try):</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {quickExamples.map((service) => (
                <button
                  key={service.name}
                  onClick={() => loadExample(service)}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300 hover:bg-white/10 hover:border-blue-500/50 transition-all"
                >
                  Try {service.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-blue-400">1</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Submit ToS</h3>
            <p className="text-sm text-gray-400">Paste text, upload file, or enter URL</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-purple-400">2</span>
            </div>
            <h3 className="font-semibold text-white mb-2">AI Analysis</h3>
            <p className="text-sm text-gray-400">Our AI scans for hidden risks and unfair terms</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-pink-400">3</span>
            </div>
            <h3 className="font-semibold text-white mb-2">Get Results</h3>
            <p className="text-sm text-gray-400">Receive safety score and detailed breakdown</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}