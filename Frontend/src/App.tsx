import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { QuizPage } from './components/QuizPage';
import { LoadingPage } from './components/LoadingPage';
import { ResultsPage } from './components/ResultsPage';
import { FeedbackPage } from './components/FeedbackPage';
import { RIASECResult } from './components/HollandCode';
import { Button } from './components/ui/button'; 
import { FlaskConical } from 'lucide-react';

type Page = 'landing' | 'quiz' | 'loading' | 'results' | 'feedback';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [isTestMode, setIsTestMode] = useState(false); 
  const [quizData, setQuizData] = useState<{ 
    result: RIASECResult; 
    answers: Record<string, any>; 
    questions: any[] 
  } | null>(null);

  const handleStartQuiz = () => {
    setIsTestMode(false);
    setCurrentPage('quiz');
  };

  // This function starts the quiz in "Speed Run" mode
  const handleStartTestQuiz = () => {
    setIsTestMode(true);
    setCurrentPage('quiz');
  };

  const handleQuizComplete = (data: { result: RIASECResult; answers: Record<string, any>; questions: any[] }) => {
    setQuizData(data);
    setCurrentPage('loading');
    
    // Simulate AI processing (shorter for test mode)
    setTimeout(() => {
      setCurrentPage('results');
    }, isTestMode ? 1000 : 3000); 
  };

  const handleViewFeedback = () => {
    setCurrentPage('feedback');
  };

  const handleRestart = () => {
    setQuizData(null);
    setCurrentPage('landing');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">
      
      {/* --- DEV BUTTON (Fixed Position) --- */}
      {/* This ensures the button floats on top of everything in the bottom-right corner */}
      {currentPage === 'landing' && (
        <div className="fixed bottom-4 right-4 z-[9999]">
             <Button 
                onClick={handleStartTestQuiz} 
                variant="outline" 
                className="bg-yellow-100 text-yellow-800 border-yellow-300 hover:bg-yellow-200 shadow-lg font-bold"
                size="lg"
             >
                <FlaskConical className="mr-2 size-5" />
                Test Mode (6 Qs)
             </Button>
        </div>
      )}
      {/* ----------------------------------- */}

      {currentPage === 'landing' && <LandingPage onStartQuiz={handleStartQuiz} />}
      {currentPage === 'quiz' && <QuizPage onComplete={handleQuizComplete} isTestMode={isTestMode} />}
      {currentPage === 'loading' && <LoadingPage />}
      {currentPage === 'results' && quizData && (
        <ResultsPage 
          result={quizData.result}
          answers={quizData.answers}
          questions={quizData.questions}
          onViewFeedback={handleViewFeedback}
          onRestart={handleRestart}
        />
      )}
      {currentPage === 'feedback' && <FeedbackPage onRestart={handleRestart} />}
    </div>
  );
}