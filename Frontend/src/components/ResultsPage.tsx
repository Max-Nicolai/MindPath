import React, { useMemo, useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  Brain,
  Share2,
  Download,
  Linkedin,
  Mail,
  TrendingUp,
  ChevronDown,
  ChevronUp,
  Briefcase,
  MapPin,
  ExternalLink
} from "lucide-react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  RIASECResult,
  RIASECKey,
  getRiasecName,
  QuizQuestion,
} from "./HollandCode";

interface ResultsPageProps {
  result: RIASECResult;
  answers: Record<string, any>;
  questions: QuizQuestion[];
  onViewFeedback: () => void;
  onRestart: () => void;
}

// Data shape for jobs coming from the backend
interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  url: string;
  salary_string: string;
}

export function ResultsPage({ 
  result, 
  answers, 
  questions, 
  onViewFeedback, 
  onRestart 
}: ResultsPageProps) {
  const [showAnswers, setShowAnswers] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(false);

  // --- CONNECT TO BACKEND HERE ---
  useEffect(() => {
    const fetchJobs = async () => {
      if (!result.code) return;
      
      setLoadingJobs(true);
      try {
        // CHANGED: Use environment variable for the URL
        // If VITE_BACKEND_URL is set (in Netlify), use it.
        // If not (on your laptop), fallback to localhost:8000.
        // @ts-ignore
        const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';
        const response = await fetch(`${backendUrl}/api/jobs?code=${result.code}&limit=1`);
        
        if (response.ok) {
            const data = await response.json();
            setJobs(data);
        } else {
            console.error("Backend error");
        }
      } catch (error) {
        console.error("Failed to fetch jobs:", error);
      } finally {
        setLoadingJobs(false);
      }
    };

    fetchJobs();
  }, [result.code]);
  // ------------------------------

  // Transform RIASEC data for charts
  const skillsData = useMemo(() => {
    return result.breakdown.map(([key, score]) => ({
      skill: getRiasecName(key),
      value: score,
      fullMark: 24,
    }));
  }, [result]);

  const topThree = result.breakdown.slice(0, 3);

  // Keep Majors as mock data for now (or move to backend later)
  const majors = useMemo(() => {
    return [
      {
        title: "Computer Science",
        match: 95,
        description: "Build innovative software solutions.",
        skills: ["Programming", "Problem Solving", "Logic"],
      },
      {
        title: "Business Administration",
        match: 88,
        description: "Lead teams and manage projects.",
        skills: ["Leadership", "Strategy", "Communication"],
      },
      {
        title: "Psychology",
        match: 82,
        description: "Understand human behavior.",
        skills: ["Empathy", "Analysis", "Communication"],
      },
    ];
  }, [topThree]);

  const answersDisplay = useMemo(() => {
    const display: Array<{ question: string; answer: string; category: string }> = [];
    questions.forEach((q, index) => {
      const uniqueKey = `${q.id}_${index}`;
      const answerValue = answers[uniqueKey];
      if (answerValue !== undefined && answerValue !== null) {
        const option = q.options.find(opt => opt.value === answerValue);
        display.push({
          question: q.question,
          answer: option?.label || answerValue.toString(),
          category: getRiasecName(q.id.split('_')[1] as RIASECKey),
        });
      }
    });
    return display;
  }, [answers, questions]);

  return (
    <div className="min-h-screen">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Brain className="size-8 text-blue-600" />
              <span className="text-2xl text-blue-900">MindPath</span>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Share2 className="mr-2 size-4" />Share</Button>
              <Button variant="outline" size="sm"><Download className="mr-2 size-4" />Export</Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center size-16 bg-green-100 rounded-full mb-4">
            <TrendingUp className="size-8 text-green-600" />
          </div>
          <h1 className="text-4xl text-gray-900 mb-2">Your Personalized Path</h1>
          <p className="text-xl text-gray-600 mb-4">Based on your responses, we've identified your strengths</p>
          <div className="inline-block bg-blue-100 text-blue-900 px-6 py-3 rounded-full">
            Your Holland Code: <span className="font-bold">{result.code}</span>
          </div>
        </div>

        {/* RIASEC Breakdown */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl text-gray-900 mb-4">Your Personality Profile</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {topThree.map(([key, score], index) => (
              <div key={key} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl text-blue-600">{key}</span>
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">#{index + 1}</span>
                </div>
                <h3 className="text-lg text-gray-900 mb-2">{getRiasecName(key)}</h3>
                <div className="text-2xl text-blue-600">{score} points</div>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-200 pt-6">
            <button onClick={() => setShowAnswers(!showAnswers)} className="flex items-center justify-between w-full text-left">
              <h3 className="text-xl text-gray-900">View Your Responses ({answersDisplay.length} questions)</h3>
              {showAnswers ? <ChevronUp className="size-5 text-gray-600" /> : <ChevronDown className="size-5 text-gray-600" />}
            </button>
            {showAnswers && (
              <div className="mt-6 space-y-4 max-h-96 overflow-y-auto">
                {answersDisplay.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-gray-900 mb-2">{item.question}</p>
                        <p className="text-blue-600">Your answer: {item.answer}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs whitespace-nowrap">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Skills Chart */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl text-gray-900 mb-6">Your Skills Profile</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={skillsData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "#6b7280", fontSize: 12 }} />
                  <PolarRadiusAxis angle={90} domain={[0, 24]} tick={{ fill: "#6b7280" }} />
                  <Radar name="Skills" dataKey="value" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={skillsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="skill" tick={{ fill: "#6b7280", fontSize: 10 }} angle={-45} textAnchor="end" height={100} />
                  <YAxis domain={[0, 24]} tick={{ fill: "#6b7280" }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* -------------------- REAL JOBS SECTION -------------------- */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl text-gray-900">Career Opportunities</h2>
              <p className="text-sm text-gray-500 mt-1">Real jobs matching your <strong>{result.code}</strong> profile</p>
            </div>
            {loadingJobs && <span className="text-blue-600 animate-pulse">Loading jobs...</span>}
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {!loadingJobs && jobs.length === 0 && (
                <div className="col-span-2 text-center py-8 text-gray-500 bg-gray-50 rounded-xl">
                    No jobs found at the moment.
                </div>
            )}
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:border-blue-400 transition-all">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1">{job.title}</h3>
                    <ExternalLink className="size-4 text-gray-400" />
                </div>
                <div className="flex items-center gap-2 mb-4 text-gray-600">
                    <Briefcase className="size-4" />
                    <span className="text-sm font-medium">{job.company}</span>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-4 text-gray-400" />
                    <p className="text-sm text-gray-900 line-clamp-1">{job.location}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-900 text-green-600 font-medium">{job.salary_string || "Salary not listed"}</p>
                  </div>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => window.open(job.url, '_blank')}>
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        </div>
        {/* ----------------------------------------------------------- */}

        {/* Recommended Majors */}
        <div className="mb-8">
          <h2 className="text-2xl text-gray-900 mb-6">Recommended Majors</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {majors.map((major, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 border-2 border-gray-100 hover:border-blue-300 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl text-gray-900">{major.title}</h3>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">{major.match}% match</span>
                </div>
                <p className="text-gray-600 mb-4">{major.description}</p>
                <div className="flex flex-wrap gap-2">
                  {major.skills.map((skill, i) => (
                    <span key={i} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Actions */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl mb-4">What's Next?</h2>
          <p className="text-lg mb-6 text-blue-100">Take action on your personalized recommendations</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button onClick={onViewFeedback} variant="secondary" size="lg">Share Feedback</Button>
            <Button variant="outline" size="lg" className="bg-white text-blue-600 hover:bg-gray-100"><Mail className="mr-2 size-4" />Email Results</Button>
            <Button onClick={onRestart} variant="outline" size="lg" className="border-white text-white hover:bg-blue-700">Retake Quiz</Button>
          </div>
        </div>
      </div>
    </div>
  );
}