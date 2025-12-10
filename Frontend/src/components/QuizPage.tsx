import { useState } from "react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Brain, ChevronLeft, ChevronRight, FlaskConical } from "lucide-react";
import {
  riasecQuestions,
  calculateRIASECResult,
  QuizAnswers, 
  RIASECResult, 
} from "./HollandCode";

interface QuizPageProps {
  onComplete: (data: { result: RIASECResult; answers: Record<string, any>; questions: any[] }) => void;
  isTestMode?: boolean; 
}

const allQuestions = riasecQuestions;

export function QuizPage({ onComplete, isTestMode = false }: QuizPageProps) {
  const questions = isTestMode 
    ? [
        allQuestions.find(q => q.id === 'riasec_R')!,
        allQuestions.find(q => q.id === 'riasec_I')!,
        allQuestions.find(q => q.id === 'riasec_A')!,
        allQuestions.find(q => q.id === 'riasec_S')!,
        allQuestions.find(q => q.id === 'riasec_E')!,
        allQuestions.find(q => q.id === 'riasec_C')!,
      ].filter(Boolean)
    : allQuestions;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];
  const uniqueKey = `${question.id}_${currentQuestion}`;
  const currentAnswer = answers[uniqueKey];

  const handleNext = () => {
    if (!isAnswered) {
      setError("Please select an option before proceeding.");
      return;
    }
    setError(null);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const formattedAnswers: QuizAnswers = {};
      Object.keys(answers).forEach((key) => {
        const questionId = key.substring(0, key.lastIndexOf('_'));
        if (!formattedAnswers[questionId]) {
          formattedAnswers[questionId] = 0;
        }
        formattedAnswers[questionId] = (formattedAnswers[questionId] as number) + answers[key];
      });
      
      const result = calculateRIASECResult(formattedAnswers, questions);
      onComplete({ result, answers, questions });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRadioChange = (value: string) => {
    const numericValue = parseInt(value, 10);
    const uniqueKey = `${question.id}_${currentQuestion}`;
    setAnswers({ ...answers, [uniqueKey]: numericValue });
    setError(null); // Clear error immediately on selection
  };

  const handleSliderChange = (value: number[]) => {
    const uniqueKey = `${question.id}_${currentQuestion}`;
    setAnswers({ ...answers, [uniqueKey]: value[0] });
  };

  const isAnswered = currentAnswer !== undefined && currentAnswer !== null;

  return (
    <div className="min-h-screen">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2">
            <Brain className="size-8 text-blue-600" />
            <span className="text-2xl text-blue-900">MindPath</span>
            {isTestMode && (
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded flex items-center gap-1">
                    <FlaskConical className="size-3" /> Test Mode
                </span>
            )}
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm text-gray-600">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8">
          <h2 className="text-3xl text-gray-900 mb-8">{question.question}</h2>

          {question.type === "radio" && (
            <RadioGroup value={currentAnswer?.toString() || ""} onValueChange={handleRadioChange}>
              <div className="space-y-4">
                {question.options?.map((option) => {
                  const isSelected = currentAnswer === option.value;
                  return (
                    <div
                      key={option.value}
                      onClick={() => handleRadioChange(option.value.toString())}
                      className={`
                        flex items-center space-x-3 border-2 rounded-xl p-4 transition-all cursor-pointer
                        ${isSelected 
                          ? 'border-blue-600 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        }
                      `}
                    >
                      <RadioGroupItem 
                        value={option.value.toString()} 
                        id={option.value.toString()}
                        className="pointer-events-none" // Prevents double-click issues on the radio dot itself
                      />
                      <Label 
                        htmlFor={option.value.toString()} 
                        className="flex-1 cursor-pointer text-gray-700 pointer-events-none" // Let parent div handle the click
                      >
                        {option.label}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          )}

          {question.type === "slider" && (
            <div className="space-y-6">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Not Important</span>
                <span>Very Important</span>
              </div>
              <Slider
                value={[currentAnswer || 5]}
                onValueChange={handleSliderChange}
                min={question.min}
                max={question.max}
                step={1}
                className="py-4"
              />
              <div className="text-center">
                <span className="inline-block bg-blue-100 text-blue-900 px-6 py-2 rounded-full">
                  {currentAnswer !== undefined ? currentAnswer : 5} / {question.max}
                </span>
              </div>
            </div>
          )}

          {/* Error Message Display */}
          {error && (
            <div className="mt-4 text-red-500 text-sm font-medium animate-pulse">
              {error}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
            <ChevronLeft className="mr-2 size-4" /> Previous
          </Button>

          <Button onClick={handleNext} disabled={!isAnswered} className="bg-blue-600 hover:bg-blue-700">
            {currentQuestion === questions.length - 1 ? "See Results" : "Next"}
            <ChevronRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}