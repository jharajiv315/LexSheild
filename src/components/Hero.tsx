import { Shield, Sparkles, ArrowRight, Zap, TrendingUp, Users, BarChart3, CheckCircle, Clock, Globe, Lock, MessageSquare, GitCompare, Bell, Award, Star, TrendingDown, AlertTriangle, Play, ChevronRight, Database, Brain, Eye } from 'lucide-react';
import { motion } from 'motion/react';
import { LanguageSelector } from './LanguageSelector';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

interface HeroProps {
  onGetStarted: () => void;
  onBrowseApps?: () => void;
  onAuthClick: () => void;
}

export function Hero({ onGetStarted, onBrowseApps, onAuthClick }: HeroProps) {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  
  return (
    <div className="bg-[#0A0E1A]">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Language Selector - Top Right */}
        <div className="absolute top-6 right-6 z-50">
          <LanguageSelector />
        </div>

        {/* Animated Background Grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                             linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
        
        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-20 left-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
        />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span className="text-sm text-gray-300">{t('hero.trustedBadge')}</span>
            </motion.div>
            
            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-extrabold mb-6 leading-tight"
            >
              <span className="block text-white">Your AI Legal</span>
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                LexShield
              </span>
            </motion.h1>
            
            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>
            
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8"
            >
              <button
                onClick={onGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-semibold text-lg shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all duration-300 flex items-center gap-2"
              >
                <Shield className="w-5 h-5" />
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              
              {onBrowseApps && (
                <button 
                  onClick={onBrowseApps}
                  className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center gap-2"
                >
                  <BarChart3 className="w-5 h-5" />
                  {t('hero.browseApps')}
                </button>
              )}
            </motion.div>

            {/* Trust Badge */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-gray-500 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              {t('hero.subtext')}
            </motion.p>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto"
            >
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Users className="w-6 h-6 text-blue-400" />
                  <div className="text-4xl font-bold text-white">12.5K+</div>
                </div>
                <div className="text-sm text-gray-400">{t('hero.stats.users')}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Zap className="w-6 h-6 text-purple-400" />
                  <div className="text-4xl font-bold text-white">89.4K+</div>
                </div>
                <div className="text-sm text-gray-400">{t('hero.stats.analyses')}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                  <div className="text-4xl font-bold text-white">4.2K+</div>
                </div>
                <div className="text-sm text-gray-400">{t('hero.stats.risks')}</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <TrendingUp className="w-6 h-6 text-pink-400" />
                  <div className="text-4xl font-bold text-white">$2.3M</div>
                </div>
                <div className="text-sm text-gray-400">{t('hero.stats.saved')}</div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#0A0E1A] to-[#111827]">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-4">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span className="text-sm text-red-400 font-medium">{t('hero.problem.badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('hero.problem.title')}
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              {t('hero.problem.desc')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { stat: "91%", label: t('hero.problem.stat1'), icon: Eye, color: "red" },
              { stat: "40+ min", label: t('hero.problem.stat2'), icon: Clock, color: "orange" },
              { stat: "1,462", label: t('hero.problem.stat3'), icon: Database, color: "yellow" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`bg-${item.color}-500/5 border border-${item.color}-500/20 rounded-2xl p-8 text-center hover:bg-${item.color}-500/10 transition-all`}
              >
                <item.icon className={`w-12 h-12 text-${item.color}-400 mx-auto mb-4`} />
                <div className={`text-5xl font-bold text-${item.color}-400 mb-2`}>{item.stat}</div>
                <p className="text-gray-400">{item.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Impact Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30 rounded-2xl p-8 text-center"
          >
            <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">{t('hero.problem.impactTitle')}</h3>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: t('hero.problem.impactDesc') }} />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-[#111827]">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full mb-4">
              <Zap className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-blue-400 font-medium">{t('hero.process.badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('hero.process.title')}
            </h2>
            <p className="text-xl text-gray-400">
              {t('hero.process.desc')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Lines */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30"></div>

            {[
              {
                step: "01",
                title: t('hero.process.steps.1.title'),
                desc: t('hero.process.steps.1.desc'),
                icon: Database,
                color: "blue"
              },
              {
                step: "02",
                title: t('hero.process.steps.2.title'),
                desc: t('hero.process.steps.2.desc'),
                icon: Brain,
                color: "purple"
              },
              {
                step: "03",
                title: t('hero.process.steps.3.title'),
                desc: t('hero.process.steps.3.desc'),
                icon: Shield,
                color: "pink"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative"
              >
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all group h-full">
                  <div className={`w-16 h-16 bg-gradient-to-br from-${item.color}-500/20 to-${item.color}-600/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-8 h-8 text-${item.color}-400`} />
                  </div>
                  <div className={`text-sm font-bold text-${item.color}-400 mb-2`}>STEP {item.step}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#111827] to-[#0A0E1A]">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
              <Star className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-400 font-medium">{t('hero.features.badge')}</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('hero.features.title')}
            </h2>
            <p className="text-xl text-gray-400">
              {t('hero.features.desc')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: t('hero.features.list.ai.title'),
                desc: t('hero.features.list.ai.desc'),
                gradient: "from-blue-500 to-blue-600"
              },
              {
                icon: BarChart3,
                title: t('hero.features.list.scoring.title'),
                desc: t('hero.features.list.scoring.desc'),
                gradient: "from-purple-500 to-purple-600"
              },
              {
                icon: MessageSquare,
                title: t('hero.features.list.assistant.title'),
                desc: t('hero.features.list.assistant.desc'),
                gradient: "from-pink-500 to-pink-600"
              },
              {
                icon: GitCompare,
                title: t('hero.features.list.comparison.title'),
                desc: t('hero.features.list.comparison.desc'),
                gradient: "from-green-500 to-green-600"
              },
              {
                icon: Database,
                title: t('hero.features.list.apps.title'),
                desc: t('hero.features.list.apps.desc'),
                gradient: "from-orange-500 to-orange-600"
              },
              {
                icon: Bell,
                title: t('hero.features.list.tracking.title'),
                desc: t('hero.features.list.tracking.desc'),
                gradient: "from-red-500 to-red-600"
              },
              {
                icon: Award,
                title: t('hero.features.list.gamification.title'),
                desc: t('hero.features.list.gamification.desc'),
                gradient: "from-yellow-500 to-yellow-600"
              },
              {
                icon: Globe,
                title: t('hero.features.list.languages.title'),
                desc: t('hero.features.list.languages.desc'),
                gradient: "from-cyan-500 to-cyan-600"
              },
              {
                icon: BarChart3,
                title: t('hero.features.list.analytics.title'),
                desc: t('hero.features.list.analytics.desc'),
                gradient: "from-indigo-500 to-indigo-600"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all group cursor-pointer"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform opacity-20 group-hover:opacity-30`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-20 px-6 bg-[#0A0E1A]">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {t('hero.testimonials.title')}
            </h2>
            <p className="text-xl text-gray-400">
              {t('hero.testimonials.desc')}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote: t('hero.testimonials.items.1.quote'),
                author: t('hero.testimonials.items.1.author'),
                role: t('hero.testimonials.items.1.role'),
                rating: 5
              },
              {
                quote: t('hero.testimonials.items.2.quote'),
                author: t('hero.testimonials.items.2.author'),
                role: t('hero.testimonials.items.2.role'),
                rating: 5
              },
              {
                quote: t('hero.testimonials.items.3.quote'),
                author: t('hero.testimonials.items.3.author'),
                role: t('hero.testimonials.items.3.role'),
                rating: 5
              }
            ].map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.author}</div>
                    <div className="text-sm text-gray-400">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-[#0A0E1A] to-[#111827]">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-3xl p-12 text-center relative overflow-hidden"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle, rgba(59, 130, 246, 0.3) 1px, transparent 1px)`,
                backgroundSize: '30px 30px'
              }}></div>
            </div>

            <div className="relative z-10">
              <Shield className="w-16 h-16 text-blue-400 mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t('hero.finalCta.title')}
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                {t('hero.finalCta.desc')}
              </p>
              
              <button
                onClick={onGetStarted}
                className="group px-10 py-5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl font-bold text-xl shadow-2xl shadow-blue-500/50 hover:shadow-blue-500/70 transition-all duration-300 inline-flex items-center gap-3"
              >
                {t('hero.finalCta.button')}
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>

              <p className="text-sm text-gray-400 mt-6 flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                {t('hero.finalCta.note')}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-[#111827] border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
                <span className="text-xl font-bold text-white">LexShield</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {t('footer.tagline')}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">{t('footer.product.title')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.product.features')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.product.howItWorks')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.product.pricing')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.product.faq')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">{t('footer.resources.title')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.resources.blog')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.resources.guide')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.resources.api')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.resources.support')}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">{t('footer.legal.title')}</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.legal.privacy')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.legal.terms')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.legal.cookie')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('footer.legal.disclaimer')}</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
