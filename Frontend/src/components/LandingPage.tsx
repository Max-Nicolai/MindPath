import { useRef, MouseEvent } from 'react';
import { Button } from './ui/button';
import { Brain, Sparkles, TrendingUp, Users, Shield, X, Lock } from 'lucide-react';

interface LandingPageProps {
  onStartQuiz: () => void;
}

export function LandingPage({ onStartQuiz }: LandingPageProps) {
  // 1. Setup the Ref for the HTML Dialog element
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleOpenPrivacy = () => {
    dialogRef.current?.showModal();
  };

  const handleClosePrivacy = () => {
    dialogRef.current?.close();
  };

  const handleAcceptPrivacy = () => {
    handleClosePrivacy();
    onStartQuiz();
  };

  // 2. Handle clicking the backdrop (the dark area outside the modal)
  const handleBackdropClick = (e: MouseEvent<HTMLDialogElement>) => {
    // e.currentTarget refers to the <dialog> element itself.
    // If e.target matches e.currentTarget, the user clicked the backdrop, not the content inside.
    if (e.target === e.currentTarget) {
      handleClosePrivacy();
    }
  };

  return (
    <div className="min-h-screen relative bg-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="size-8 text-blue-600" />
              <span className="text-2xl text-blue-900">MindPath</span>
            </div>
            <div className="flex gap-4">
              <Button variant="ghost">Login</Button>
              <Button variant="outline">Sign Up</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl text-gray-900">
                Find not just a job,{' '}
                <span className="text-blue-600">find your path</span>
              </h1>
              <p className="text-xl text-gray-600">
                Discover your ideal university major and career path with our AI-powered quiz. 
                Get personalized recommendations based on your unique interests, personality, and abilities.
              </p>
            </div>
            
            <Button 
              onClick={handleOpenPrivacy}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6"
            >
              <Sparkles className="mr-2 size-5" />
              Start Your Journey
            </Button>

            <div className="flex gap-8 pt-4">
              <div className="flex items-center gap-2">
                <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Brain className="size-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">AI-Powered Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <TrendingUp className="size-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">Career Insights</span>
              </div>
            </div>
          </div>

          {/* Visual illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-400 to-indigo-500 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white rounded-2xl p-8 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="size-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Users className="size-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-32 mb-2" />
                    <div className="h-2 bg-gray-100 rounded w-24" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-3/4" />
                      <div className="h-2 bg-gray-100 rounded w-1/2" />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  {[...Array(2)].map((_, i) => (
                    <div key={i} className="bg-blue-50 rounded-lg p-3">
                      <div className="h-2 bg-blue-200 rounded w-16 mb-2" />
                      <div className="h-6 bg-blue-300 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="size-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Brain className="size-6 text-blue-600" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Smart Assessment</h3>
            <p className="text-gray-600">
              Answer a quick 10-minute quiz designed to understand your unique strengths and preferences.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="size-12 rounded-full bg-indigo-100 flex items-center justify-center mb-4">
              <TrendingUp className="size-6 text-indigo-600" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Personalized Results</h3>
            <p className="text-gray-600">
              Get tailored major and career recommendations with detailed insights into your potential paths.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <div className="size-12 rounded-full bg-purple-100 flex items-center justify-center mb-4">
              <Users className="size-6 text-purple-600" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Find Your Tribe</h3>
            <p className="text-gray-600">
              Discover profiles of people with similar interests and see where their paths have led them.
            </p>
          </div>
        </div>
      </div>

      {/* Privacy Policy Modal (Native Dialog) */}
      <dialog
        ref={dialogRef}
        onClick={handleBackdropClick}
        className="
          bg-transparent p-0 
          backdrop:bg-black/50 backdrop:backdrop-blur-sm
          max-w-2xl w-full max-h-[90vh]
          rounded-2xl shadow-2xl
          open:animate-in open:fade-in-0 open:zoom-in-95
        "
      >
        <div className="bg-white flex flex-col h-full rounded-2xl">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-blue-900">
              <Shield className="size-6" />
              <h2 className="text-2xl font-semibold">Privacy Policy</h2>
            </div>
            <button 
              onClick={handleClosePrivacy} 
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="size-6" />
            </button>
          </div>
          
          <div className="p-6 overflow-y-auto space-y-4 text-gray-600 leading-relaxed">
            <p className="font-medium text-gray-900">Welcome to MindPath.</p>
            <p>
              We are committed to protecting your privacy and handling your data transparently and securely.
              MindPath is based in the Netherlands and complies with the General Data Protection Regulation (GDPR).
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">1. Collected Information</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Personality & Interest Data:</strong> Used solely to generate personalized recommendations.</li>
              <li><strong>Profile Information:</strong> Name/Email (only if you create an account).</li>
              <li><strong>Device Metadata:</strong> For app functionality and performance.</li>
            </ul>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">2. How We Use Your Information</h3>
            <p>
              We use your data to generate AI-powered recommendations, provide trajectory insights, and ensure app security. 
              We do not sell your data.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">3. Data Storage & AI</h3>
            <p>
              All data is stored on secure cloud servers in the European Union. 
              We use anonymized interactions with LLMs to process inputs; your identifiable information is never shared with LLM providers.
            </p>

            <h3 className="text-lg font-semibold text-gray-900 mt-4">4. Your Rights</h3>
            <p>
              You have the right to access, correct, delete ("right to be forgotten"), or export your data at any time.
            </p>
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50 rounded-b-2xl flex justify-between items-center">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Lock className="size-4" />
              <span>Your data is encrypted and secure</span>
            </div>
            <div className="flex gap-3">
              <Button variant="ghost" onClick={handleClosePrivacy}>Cancel</Button>
              <Button onClick={handleAcceptPrivacy} className="bg-blue-600 hover:bg-blue-700">
                Accept & Start Quiz
              </Button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}