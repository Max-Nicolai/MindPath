// Define RIASEC keys and types for robustness
export type RIASECKey = 'R' | 'I' | 'A' | 'S' | 'E' | 'C';
export type RIASECScores = Record<RIASECKey, number>;
export type QuizAnswers = Record<string, number | null>;

/**
 * Defines the structure for a single option within a radio question.
 * The 'value' is used to calculate the RIASEC score (0-4).
 */
export interface QuizOption {
  value: number;
  label: string;
}

/**
 * Defines the structure for a single RIASEC quiz question.
 * The 'id' determines which RIASEC category the preference contributes to (R, I, A, S, E, C).
 */
export interface QuizQuestion {
  id: 'riasec_R' | 'riasec_I' | 'riasec_A' | 'riasec_S' | 'riasec_E' | 'riasec_C';
  type: 'radio';
  question: string;
  options: QuizOption[];
}

//Result structure
export interface RIASECResult {
    code: string; // e.g., "IAS"
    breakdown: [RIASECKey, number][]; // [Key, Score] pairs sorted
}

// Universal preference options for the 5-point Likert scale
const preferenceOptions: QuizOption[] = [
  { value: 0, label: 'Strongly Dislike' },
  { value: 1, label: 'Dislike' },
  { value: 2, label: 'Neutral' },
  { value: 3, label: 'Like' },
  { value: 4, label: 'Strongly Like' },
];

export const riasecQuestions: QuizQuestion[] = [
  // --- REALISTIC (R) - Do you like to... (Hands-on, physical, mechanical, nature) ---
  { id: 'riasec_R', type: 'radio', question: 'Do you like to work on cars?', options: preferenceOptions },
  { id: 'riasec_R', type: 'radio', question: 'Do you like to build things?', options: preferenceOptions },
  { id: 'riasec_R', type: 'radio', question: 'Do you like to take care of animals?', options: preferenceOptions },
  { id: 'riasec_R', type: 'radio', question: 'Do you like to put things together or assemble models?', options: preferenceOptions },
  { id: 'riasec_R', type: 'radio', question: 'Do you like to cook?', options: preferenceOptions },
  { id: 'riasec_R', type: 'radio', question: 'Do you like to work outdoors?', options: preferenceOptions },

  // --- INVESTIGATIVE (I) - Do you like to... (Analytical, intellectual, scientific, research) ---
  { id: 'riasec_I', type: 'radio', question: 'Do you like to do puzzles?', options: preferenceOptions },
  { id: 'riasec_I', type: 'radio', question: 'Do you like to do experiments?', options: preferenceOptions },
  { id: 'riasec_I', type: 'radio', question: 'Do you like to work on science projects?', options: preferenceOptions },
  { id: 'riasec_I', type: 'radio', question: 'Do you like to figure out how things work?', options: preferenceOptions },
  { id: 'riasec_I', type: 'radio', question: 'Do you like to analyze things like problems, situations or trends?', options: preferenceOptions },
  { id: 'riasec_I', type: 'radio', question: 'Do you like to think things through before making decisions?', options: preferenceOptions },
  { id: 'riasec_I', type: 'radio', question: 'Do you like to work on math problems?', options: preferenceOptions },

  // --- ARTISTIC (A) - Do you like to... (Creative, intuitive, expressive, unstructured) ---
  { id: 'riasec_A', type: 'radio', question: 'Do you like to attend concerts, theaters or art exhibits?', options: preferenceOptions },
  { id: 'riasec_A', type: 'radio', question: 'Do you like to read fiction, poetry or plays?', options: preferenceOptions },
  { id: 'riasec_A', type: 'radio', question: 'Do you like to do creative writing?', options: preferenceOptions },
  { id: 'riasec_A', type: 'radio', question: 'Do you like to be creative?', options: preferenceOptions },
  { id: 'riasec_A', type: 'radio', question: 'Do you like to play instruments or sing?', options: preferenceOptions },
  { id: 'riasec_A', type: 'radio', question: 'Do you like to act in plays?', options: preferenceOptions },
  { id: 'riasec_A', type: 'radio', question: 'Do you like to draw?', options: preferenceOptions },

  // --- SOCIAL (S) - Do you like to... (Helping, teaching, serving, group activities) ---
  { id: 'riasec_S', type: 'radio', question: 'Do you like to work in teams?', options: preferenceOptions },
  { id: 'riasec_S', type: 'radio', question: 'Do you like to teach or train people?', options: preferenceOptions },
  { id: 'riasec_S', type: 'radio', question: 'Do you like to help people solve their problems?', options: preferenceOptions },
  { id: 'riasec_S', type: 'radio', question: 'Do you like to heal people?', options: preferenceOptions },
  { id: 'riasec_S', type: 'radio', question: 'Do you like to learn about other cultures?', options: preferenceOptions },
  { id: 'riasec_S', type: 'radio', question: 'Do you like to discuss issues like politics or current events?', options: preferenceOptions },
  { id: 'riasec_S', type: 'radio', question: 'Do you like to help people?', options: preferenceOptions },

  // --- ENTERPRISING (E) - Do you like to... (Persuading, selling, leading, ambitious) ---
  { id: 'riasec_E', type: 'radio', question: 'Do you like to set goals for yourself?', options: preferenceOptions },
  { id: 'riasec_E', type: 'radio', question: 'Do you like to influence or persuade people?', options: preferenceOptions },
  { id: 'riasec_E', type: 'radio', question: 'Do you like to sell things?', options: preferenceOptions },
  { id: 'riasec_E', type: 'radio', question: 'Do you like to take on new responsibilities?', options: preferenceOptions },
  { id: 'riasec_E', type: 'radio', question: 'Do you like to dream about starting your own business?', options: preferenceOptions },
  { id: 'riasec_E', type: 'radio', question: 'Do you like to be a leader?', options: preferenceOptions },
  { id: 'riasec_E', type: 'radio', question: 'Do you like to give speeches?', options: preferenceOptions },

  // --- CONVENTIONAL (C) - Do you like to... (Organizing, details, systematic, precision) ---
  { id: 'riasec_C', type: 'radio', question: 'Do you like to organize things like files, offices or activities?', options: preferenceOptions },
  { id: 'riasec_C', type: 'radio', question: 'Do you like to have clear instructions to follow?', options: preferenceOptions },
  { id: 'riasec_C', type: 'radio', question: 'Do you like to have your day structured?', options: preferenceOptions },
  { id: 'riasec_C', type: 'radio', question: 'Do you like to pay attention to details?', options: preferenceOptions },
  { id: 'riasec_C', type: 'radio', question: 'Do you like to do filing or typing?', options: preferenceOptions },
  { id: 'riasec_C', type: 'radio', question: 'Do you like to work with numbers or charts?', options: preferenceOptions },
  { id: 'riasec_C', type: 'radio', question: 'Do you like to keep records of your work?', options: preferenceOptions },
  { id: 'riasec_C', type: 'radio', question: 'Do you like to work in an office?', options: preferenceOptions },
];

// --- 3. Result Calculation Logic ---

/**
 * Calculates the total score for each RIASEC category and determines the top 3 code.
 */
export const calculateRIASECResult = (answers: QuizAnswers, questions: QuizQuestion[]): RIASECResult => {
    // Initialise scores for all six codes
    const scores: RIASECScores = { R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 };

    questions.forEach((q) => {
        // Extract the R, I, A, S, E, or C key from the question ID (e.g., 'riasec_R' -> 'R')
        const scoreKey = q.id.split('_')[1] as RIASECKey;
        const answerValue = answers[q.id];

        // Ensure the answer is a valid number (0-4) before adding to the total
        if (typeof answerValue === 'number' && answerValue !== null) {
            scores[scoreKey] += answerValue;
        }
    });

    // 1. Convert scores to an array of [Key, Score] pairs
    const scoreArray: [RIASECKey, number][] = Object.entries(scores) as [RIASECKey, number][];

    // 2. Sort scores in descending order
    scoreArray.sort((a, b) => b[1] - a[1]);

    // 3. Get the top three codes
    const code = scoreArray.slice(0, 3).map(([key]) => key).join('');

    return { code, breakdown: scoreArray };
};

export const getRiasecName = (key: RIASECKey): string => {
  switch (key) {
    case 'R': return 'Realistic (Doers)';
    case 'I': return 'Investigative (Thinkers)';
    case 'A': return 'Artistic (Creators)';
    case 'S': return 'Social (Helpers)';
    case 'E': return 'Enterprising (Persuaders)';
    case 'C': return 'Conventional (Organizers)';
    default: return '';
  }
};