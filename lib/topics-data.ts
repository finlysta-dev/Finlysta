export interface TopicContent {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  order: number;
  learningObjectives: string[];
  prerequisites: string[];
  introduction: string;
  sections: {
    title: string;
    content: string;
    code?: string;
    image?: string;
    imageAlt?: string;
    tips?: string[];
    warning?: string;
  }[];
  examples: {
    title: string;
    scenario: string;
    beforeCode?: string;
    afterCode?: string;
    explanation: string;
    result?: string;
  }[];
  practiceExercises: {
    title: string;
    description: string;
    initialCode?: string;
    expectedOutput?: string;
    hint: string;
    solution: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
  }[];
  resources: {
    title: string;
    url: string;
    type: 'video' | 'article' | 'download' | 'exercise';
    description: string;
  }[];
  relatedTopics: string[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export const topicsData: Record<string, Record<string, TopicContent>> = {
  // ... your existing topicsData content (excel, sql, etc.)
  // Keeping your existing content as is
};

// Existing functions
export function getTopic(category: string, topicSlug: string): TopicContent | null {
  return topicsData[category]?.[topicSlug] || null;
}

export function getAllTopics() {
  const allTopics: { category: string; topic: TopicContent }[] = [];
  for (const [category, topics] of Object.entries(topicsData)) {
    for (const topic of Object.values(topics)) {
      allTopics.push({ category, topic });
    }
  }
  return allTopics;
}

// NEW FUNCTIONS - Add these at the end
export function getAllCategories() {
  return Object.keys(topicsData);
}

export function getTopicsByCategory(category: string) {
  const categoryData = topicsData[category];
  if (!categoryData) return [];
  
  // Convert the object to an array of topics
  return Object.values(categoryData);
}