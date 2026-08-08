export interface TopicContent {
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  order: number;
  content: {
    overview: string;
    objectives: string[];
    prerequisites: string[];
    steps: {
      title: string;
      description: string;
      code?: string;
      image?: string;
    }[];
    examples: {
      title: string;
      code: string;
      explanation: string;
    }[];
    practice: {
      question: string;
      hint?: string;
      solution?: string;
    }[];
    quiz: {
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    }[];
  };
  resources: {
    title: string;
    url: string;
    type: 'video' | 'article' | 'download';
  }[];
  relatedTopics: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
