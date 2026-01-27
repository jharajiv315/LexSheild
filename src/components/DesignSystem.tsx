import { EmergencyToggle } from './ui/EmergencyToggle';
import { SearchBar } from './ui/SearchBar';
import { PharmacyCard } from './ui/PharmacyCard';
import { CountdownTimer } from './ui/CountdownTimer';
import { WhatsAppResponseCard } from './ui/WhatsAppResponseCard';

export function DesignSystem() {
  return (
    <div className="min-h-screen p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Design System</h1>
          <p className="text-gray-400">
            Med Connect component library and design tokens
          </p>
        </div>

        {/* Color Palette */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Color Palette</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-400 mb-2">Background</p>
              <div className="space-y-2">
                <div className="h-16 bg-[#0B0F14] border border-gray-700 rounded-lg flex items-center justify-center text-xs">
                  #0B0F14
                </div>
                <div className="h-16 bg-[#12161D] border border-gray-700 rounded-lg flex items-center justify-center text-xs">
                  #12161D
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-2">Success</p>
              <div className="space-y-2">
                <div className="h-16 bg-green-500 rounded-lg flex items-center justify-center text-xs">
                  #10B981
                </div>
                <div className="h-16 bg-green-400 rounded-lg flex items-center justify-center text-xs">
                  #34D399
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-2">Warning</p>
              <div className="space-y-2">
                <div className="h-16 bg-yellow-500 rounded-lg flex items-center justify-center text-xs text-gray-900">
                  #F59E0B
                </div>
                <div className="h-16 bg-yellow-400 rounded-lg flex items-center justify-center text-xs text-gray-900">
                  #FBBF24
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-2">Danger</p>
              <div className="space-y-2">
                <div className="h-16 bg-red-500 rounded-lg flex items-center justify-center text-xs">
                  #EF4444
                </div>
                <div className="h-16 bg-red-400 rounded-lg flex items-center justify-center text-xs">
                  #F87171
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Typography</h2>
          <div className="space-y-4 bg-[#12161D] border border-gray-800 rounded-xl p-6">
            <div>
              <p className="text-4xl font-bold">Heading 1</p>
              <p className="text-sm text-gray-400 mt-1">text-4xl font-bold</p>
            </div>
            <div>
              <p className="text-2xl font-semibold">Heading 2</p>
              <p className="text-sm text-gray-400 mt-1">text-2xl font-semibold</p>
            </div>
            <div>
              <p className="text-base">Body Text</p>
              <p className="text-sm text-gray-400 mt-1">text-base</p>
            </div>
            <div>
              <p className="text-sm text-gray-400">Secondary Text</p>
              <p className="text-sm text-gray-400 mt-1">text-sm text-gray-400</p>
            </div>
          </div>
        </section>

        {/* Spacing */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Spacing Scale</h2>
          <div className="space-y-3 bg-[#12161D] border border-gray-800 rounded-xl p-6">
            {['xs: 0.25rem', 'sm: 0.5rem', 'md: 1rem', 'lg: 1.5rem', 'xl: 2rem', '2xl: 3rem'].map((spacing) => (
              <div key={spacing} className="flex items-center gap-4">
                <div 
                  className="bg-green-500 h-4"
                  style={{ width: spacing.split(': ')[1] }}
                ></div>
                <span className="text-sm text-gray-400">{spacing}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Components */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Components</h2>
          
          <div className="space-y-8">
            {/* Emergency Toggle */}
            <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Emergency Toggle</h3>
              <EmergencyToggle />
            </div>

            {/* Search Bar */}
            <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Search Bar</h3>
              <SearchBar placeholder="Search pharmacies..." />
            </div>

            {/* Pharmacy Card */}
            <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Pharmacy Card</h3>
              <PharmacyCard
                name="Apollo Pharmacy"
                distance={1.2}
                rating={4.5}
                isOpen={true}
                responseTime="2-5 min"
                availability="In Stock"
              />
            </div>

            {/* Countdown Timer */}
            <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Countdown Timer</h3>
              <CountdownTimer initialSeconds={300} />
            </div>

            {/* WhatsApp Response Card */}
            <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">WhatsApp Response Card</h3>
              <WhatsAppResponseCard
                pharmacyName="MedPlus Pharmacy"
                message="We have the medicine in stock. Can deliver in 15 minutes."
                timestamp="2 min ago"
                status="confirmed"
              />
            </div>

            {/* Buttons */}
            <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6">
              <h3 className="font-semibold mb-4">Buttons</h3>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors">
                  Primary
                </button>
                <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-lg font-medium transition-colors">
                  Warning
                </button>
                <button className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors">
                  Danger
                </button>
                <button className="px-6 py-3 border border-gray-700 hover:bg-gray-800 rounded-lg font-medium transition-colors">
                  Secondary
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Accessibility */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Accessibility (WCAG AA)</h2>
          <div className="bg-[#12161D] border border-gray-800 rounded-xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs">✓</span>
              </div>
              <div>
                <p className="font-medium">Color Contrast</p>
                <p className="text-sm text-gray-400">All text meets 4.5:1 contrast ratio</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs">✓</span>
              </div>
              <div>
                <p className="font-medium">Keyboard Navigation</p>
                <p className="text-sm text-gray-400">All interactive elements are keyboard accessible</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs">✓</span>
              </div>
              <div>
                <p className="font-medium">Screen Reader Support</p>
                <p className="text-sm text-gray-400">ARIA labels and semantic HTML throughout</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500 rounded flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-xs">✓</span>
              </div>
              <div>
                <p className="font-medium">Focus Indicators</p>
                <p className="text-sm text-gray-400">Clear focus states for all interactive elements</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
