import { useState } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Brain, Star, Send, CheckCircle } from 'lucide-react';

interface FeedbackPageProps {
  onRestart: () => void;
}

export function FeedbackPage({ onRestart }: FeedbackPageProps) {
  const [rating, setRating] = useState<string>('');
  const [feedback, setFeedback] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    // In a real app, this would send to backend
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md">
          <div className="size-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="size-10 text-green-600" />
          </div>
          <h2 className="text-3xl text-gray-900">Thank You!</h2>
          <p className="text-gray-600">
            Your feedback helps us improve MindPath for everyone. We appreciate you taking the time to share your thoughts.
          </p>
          <Button onClick={onRestart} className="bg-blue-600 hover:bg-blue-700" size="lg">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Brain className="size-8 text-blue-600" />
            <span className="text-2xl text-blue-900">MindPath</span>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="text-center mb-8">
            <h1 className="text-3xl text-gray-900 mb-2">We'd Love Your Feedback</h1>
            <p className="text-gray-600">
              Help us improve your experience with MindPath
            </p>
          </div>

          <div className="space-y-8">
            {/* Rating */}
            <div>
              <Label className="text-lg text-gray-900 mb-4 block">
                How useful were your results?
              </Label>
              <RadioGroup value={rating} onValueChange={setRating}>
                <div className="grid grid-cols-5 gap-3">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div
                      key={value}
                      className="flex flex-col items-center gap-2 border-2 border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={value.toString()} id={`rating-${value}`} />
                      <Label htmlFor={`rating-${value}`} className="cursor-pointer flex flex-col items-center gap-1">
                        <div className="flex gap-1">
                          {[...Array(value)].map((_, i) => (
                            <Star key={i} className="size-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-xs text-gray-600">
                          {value === 1 && 'Not helpful'}
                          {value === 2 && 'Slightly helpful'}
                          {value === 3 && 'Moderately helpful'}
                          {value === 4 && 'Very helpful'}
                          {value === 5 && 'Extremely helpful'}
                        </span>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Text feedback */}
            <div>
              <Label htmlFor="feedback" className="text-lg text-gray-900 mb-4 block">
                What could we improve? (Optional)
              </Label>
              <Textarea
                id="feedback"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Share your thoughts, suggestions, or any issues you encountered..."
                className="min-h-32 resize-none"
              />
            </div>

            {/* Future features */}
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-lg text-gray-900 mb-3">Coming Soon</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Detailed PDF career reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>One-on-one career counseling sessions</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>University program recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="size-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>Learning path and course suggestions</span>
                </li>
              </ul>
            </div>

            {/* Submit button */}
            <div className="flex gap-4">
              <Button
                onClick={handleSubmit}
                disabled={!rating}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <Send className="mr-2 size-4" />
                Submit Feedback
              </Button>
              <Button onClick={onRestart} variant="outline" size="lg">
                Skip
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
