export interface Career {
  id: string;
  title: string;
  track: string;
  description: string;
  salary: string;
  growth: string;
  aiImpact: string;
  skills: string[];
  tools: string[];
  roadmap: {
    title: string;
    description: string;
    items: string[];
  }[];
  interviewQuestions: {
    question: string;
    idealConcepts: string[];
    sampleBest: string;
  }[];
}

export interface QuizQuestion {
  id: number;
  text: string;
  options: {
    text: string;
    weights: { [careerId: string]: number };
  }[];
}
