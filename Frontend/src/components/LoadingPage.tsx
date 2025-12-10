import { Brain, Sparkles, Users } from 'lucide-react';

export function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8 max-w-md">
        <div className="relative">
          <div className="size-32 mx-auto">
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full animate-ping" />
            <div className="absolute inset-0 border-4 border-blue-400 rounded-full animate-pulse" />
            <div className="relative size-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
              <Brain className="size-16 text-white animate-pulse" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl text-gray-900">Analyzing Your Profile...</h2>
          <p className="text-gray-600">
            Our AI is processing your responses to create personalized recommendations
          </p>
        </div>

        <div className="flex items-center justify-center gap-8 text-blue-600">
            <div className="flex flex-col items-center gap-2">
                <Sparkles className="size-5 animate-pulse" />
                <span className="text-sm animate-pulse">Calculating path</span>
            </div>
            <div className="flex flex-col items-center gap-2">
                <Users className="size-5 animate-pulse" />
                <span className="text-sm animate-pulse">Finding similar profiles</span>
            </div>
        </div>

        {/* Loading dots animation */}
        <div className="flex justify-center gap-2 pt-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="size-3 bg-blue-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}