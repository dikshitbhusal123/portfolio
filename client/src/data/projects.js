export const GITHUB_PROFILE_URL = 'https://github.com/dikshitbhusal123';

export const PROJECTS = [
  {
    slug: 'loan-approval-prediction-system',
    title: 'Loan Approval Prediction System',
    description:
      'An end-to-end machine learning pipeline that predicts loan approval outcomes with high accuracy. Features data preprocessing, feature engineering, and multiple model comparisons.',
    tech: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    tags: ['ML', 'Data Science', 'Supervised Learning'],
    icon: '🏦',
    gradient: 'linear-gradient(135deg, #00d4ff22, #7c3aed22)',
    borderColor: '#00d4ff',
    highlights: ['Data Preprocessing', 'Supervised & Unsupervised Learning', 'Accuracy Optimization', 'Feature Engineering'],
    githubUrl: 'https://github.com/dikshitbhusal123/Car-Loan-Prediction-USING-MACHINE-LEARNING',
  },
  {
    slug: 'handsign-detection-translation-system',
    title: 'HandSign Detection & Translation System',
    description:
      'An AI-powered computer vision system that detects and translates hand signs in real-time using deep learning. Bridges communication gaps through intelligent gesture recognition.',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'MediaPipe', 'NumPy'],
    tags: ['Computer Vision', 'Deep Learning', 'Real-time'],
    icon: '🤟',
    gradient: 'linear-gradient(135deg, #7c3aed22, #ec489922)',
    borderColor: '#7c3aed',
    highlights: ['Real-time Detection', 'MediaPipe Integration', 'Deep Learning Model', 'Gesture Translation'],
    githubUrl: 'https://github.com/dikshitbhusal123/sign-language/tree/main/ml',
  },
  {
    slug: 'crm-frontend-development',
    title: 'CRM Frontend Development',
    description:
      'Designed and developed a modern, responsive frontend UI for a Customer Relationship Management system. Focused on intuitive UX, clean component architecture, and performance.',
    tech: ['React.js', 'JavaScript', 'HTML5', 'CSS3', 'REST APIs'],
    tags: ['Frontend', 'React', 'UI/UX'],
    icon: '💼',
    gradient: 'linear-gradient(135deg, #ec489922, #00d4ff22)',
    borderColor: '#ec4899',
    highlights: ['React Components', 'Responsive Design', 'REST API Integration', 'Modern UI/UX'],
    githubUrl: 'https://github.com/Aryan0883/ConnectSphere',
  },
];

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}
