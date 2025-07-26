export interface Tutor {
  id: string;
  name: string;
  title: string;
  experience: string;
  rating: number;
  students: number;
  hourlyRate: number;
  subjects: string[];
  bio: string;
  avatar: string;
  location: {
    address: string;
    city: string;
    coordinates: [number, number];
  };
  availability: string[];
  education: string[];
  certifications: string[];
  languages: string[];
  teachingStyle: string;
  specializations: string[];
}

export interface Course {
  id: string;
  title: string;
  instructor: Tutor;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  price: number;
  originalPrice: number;
  rating: number;
  students: number;
  description: string;
  image: string;
  topics: string[];
  requirements: string[];
  outcomes: string[];
  schedule: string[];
  location: {
    address: string;
    city: string;
    coordinates: [number, number];
  };
  format: 'Online' | 'In-Person' | 'Hybrid';
}

export const tutors: Tutor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    title: 'Senior Mathematics Professor',
    experience: '15+ years',
    rating: 4.9,
    students: 234,
    hourlyRate: 85,
    subjects: ['Mathematics', 'Calculus', 'Algebra', 'Statistics'],
    bio: 'Dr. Sarah is a passionate mathematics educator with over 15 years of experience teaching at university level. She specializes in making complex mathematical concepts accessible to students of all levels.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
    location: {
      address: '123 Education Street',
      city: 'New York, NY',
      coordinates: [-74.0060, 40.7128]
    },
    availability: ['Monday-Friday 9AM-6PM', 'Saturday 10AM-2PM'],
    education: ['PhD Mathematics - MIT', 'MSc Mathematics - Stanford'],
    certifications: ['Certified Mathematics Teacher', 'Advanced Calculus Instructor'],
    languages: ['English', 'Spanish'],
    teachingStyle: 'Interactive and problem-solving focused',
    specializations: ['Calculus', 'Linear Algebra', 'Mathematical Modeling']
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Full Stack Development Expert',
    experience: '8+ years',
    rating: 4.8,
    students: 456,
    hourlyRate: 75,
    subjects: ['Web Development', 'JavaScript', 'React', 'Node.js'],
    bio: 'Michael is a seasoned full-stack developer who loves teaching coding. He has worked with major tech companies and now focuses on helping students build real-world projects.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    location: {
      address: '456 Tech Avenue',
      city: 'San Francisco, CA',
      coordinates: [-122.4194, 37.7749]
    },
    availability: ['Monday-Sunday 10AM-8PM'],
    education: ['BSc Computer Science - UC Berkeley', 'MSc Software Engineering - Stanford'],
    certifications: ['AWS Certified Developer', 'Google Cloud Professional'],
    languages: ['English', 'Mandarin'],
    teachingStyle: 'Project-based learning with real-world applications',
    specializations: ['React Development', 'Backend Architecture', 'Cloud Computing']
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    title: 'Digital Marketing Strategist',
    experience: '12+ years',
    rating: 4.9,
    students: 189,
    hourlyRate: 70,
    subjects: ['Digital Marketing', 'SEO', 'Social Media', 'Content Strategy'],
    bio: 'Emily is a digital marketing expert who has helped hundreds of businesses grow their online presence. She specializes in data-driven marketing strategies.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    location: {
      address: '789 Marketing Blvd',
      city: 'Los Angeles, CA',
      coordinates: [-118.2437, 34.0522]
    },
    availability: ['Monday-Friday 8AM-7PM', 'Saturday 9AM-3PM'],
    education: ['MBA Marketing - UCLA', 'BSc Business Administration - USC'],
    certifications: ['Google Ads Certified', 'Facebook Blueprint Certified'],
    languages: ['English', 'Spanish'],
    teachingStyle: 'Case study based with hands-on campaign management',
    specializations: ['SEO Optimization', 'Social Media Marketing', 'Email Marketing']
  },
  {
    id: '4',
    name: 'David Park',
    title: 'Data Science Consultant',
    experience: '10+ years',
    rating: 4.7,
    students: 678,
    hourlyRate: 90,
    subjects: ['Data Science', 'Python', 'Machine Learning', 'Statistics'],
    bio: 'David is a data science expert with experience in both academia and industry. He has published numerous papers and worked on cutting-edge AI projects.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    location: {
      address: '321 Data Street',
      city: 'Seattle, WA',
      coordinates: [-122.3321, 47.6062]
    },
    availability: ['Monday-Friday 9AM-5PM'],
    education: ['PhD Computer Science - University of Washington', 'MSc Statistics - Stanford'],
    certifications: ['TensorFlow Developer Certificate', 'AWS Machine Learning Specialty'],
    languages: ['English', 'Korean'],
    teachingStyle: 'Theory combined with practical applications',
    specializations: ['Machine Learning', 'Deep Learning', 'Big Data Analytics']
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    title: 'Art & Design Instructor',
    experience: '6+ years',
    rating: 4.8,
    students: 145,
    hourlyRate: 65,
    subjects: ['Graphic Design', 'Digital Art', 'UI/UX Design', 'Illustration'],
    bio: 'Lisa is a creative professional who combines traditional art techniques with modern digital tools. She has worked with major brands and loves teaching design principles.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    location: {
      address: '567 Creative Lane',
      city: 'Austin, TX',
      coordinates: [-97.7431, 30.2672]
    },
    availability: ['Tuesday-Saturday 11AM-7PM'],
    education: ['BFA Graphic Design - Parsons School of Design', 'MFA Digital Arts - NYU'],
    certifications: ['Adobe Certified Expert', 'Figma Design Specialist'],
    languages: ['English'],
    teachingStyle: 'Creative exploration with technical foundation',
    specializations: ['Brand Design', 'User Interface Design', 'Digital Illustration']
  },
  {
    id: '6',
    name: 'Dr. James Wilson',
    title: 'Physics Research Scientist',
    experience: '20+ years',
    rating: 4.9,
    students: 89,
    hourlyRate: 95,
    subjects: ['Physics', 'Quantum Mechanics', 'Thermodynamics', 'Electromagnetism'],
    bio: 'Dr. Wilson is a renowned physics researcher who has published over 50 papers. He specializes in making complex physics concepts understandable to students.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    location: {
      address: '890 Science Park',
      city: 'Boston, MA',
      coordinates: [-71.0589, 42.3601]
    },
    availability: ['Monday-Thursday 10AM-6PM'],
    education: ['PhD Physics - Harvard University', 'Postdoc - MIT'],
    certifications: ['Advanced Physics Teaching Certificate'],
    languages: ['English', 'French'],
    teachingStyle: 'Conceptual understanding with mathematical rigor',
    specializations: ['Quantum Physics', 'Classical Mechanics', 'Modern Physics']
  }
];

export const courses: Course[] = [
  {
    id: '1',
    title: 'Complete Web Development Bootcamp',
    instructor: tutors[1], // Michael Chen
    category: 'Web Development',
    level: 'Beginner',
    duration: '52 hours',
    price: 89.99,
    originalPrice: 199.99,
    rating: 4.9,
    students: 234,
    description: 'Learn web development from scratch with this comprehensive bootcamp. Build real-world projects and master modern web technologies.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
    topics: ['HTML & CSS', 'JavaScript', 'React', 'Node.js', 'Database Design'],
    requirements: ['Basic computer skills', 'No prior programming experience needed'],
    outcomes: ['Build full-stack web applications', 'Deploy projects to the web', 'Understand modern web development'],
    schedule: ['Monday, Wednesday, Friday 6PM-8PM'],
    location: {
      address: '456 Tech Avenue',
      city: 'San Francisco, CA',
      coordinates: [-122.4194, 37.7749]
    },
    format: 'Hybrid'
  },
  {
    id: '2',
    title: 'Digital Marketing Masterclass',
    instructor: tutors[2], // Emily Rodriguez
    category: 'Marketing',
    level: 'Intermediate',
    duration: '38 hours',
    price: 79.99,
    originalPrice: 149.99,
    rating: 4.8,
    students: 456,
    description: 'Master digital marketing strategies and grow your business online. Learn SEO, social media, and content marketing.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    topics: ['SEO Fundamentals', 'Social Media Marketing', 'Content Strategy', 'Analytics'],
    requirements: ['Basic understanding of business', 'Access to social media accounts'],
    outcomes: ['Create effective marketing campaigns', 'Analyze marketing performance', 'Grow online presence'],
    schedule: ['Tuesday, Thursday 7PM-9PM'],
    location: {
      address: '789 Marketing Blvd',
      city: 'Los Angeles, CA',
      coordinates: [-118.2437, 34.0522]
    },
    format: 'Online'
  },
  {
    id: '3',
    title: 'Advanced Mathematics for Engineers',
    instructor: tutors[0], // Dr. Sarah Johnson
    category: 'Mathematics',
    level: 'Advanced',
    duration: '45 hours',
    price: 94.99,
    originalPrice: 179.99,
    rating: 4.9,
    students: 189,
    description: 'Advanced mathematical concepts for engineering students. Covers calculus, linear algebra, and differential equations.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
    topics: ['Calculus III', 'Linear Algebra', 'Differential Equations', 'Vector Analysis'],
    requirements: ['Calculus I & II', 'Basic linear algebra knowledge'],
    outcomes: ['Solve complex engineering problems', 'Understand advanced mathematical concepts'],
    schedule: ['Monday, Wednesday 5PM-7PM'],
    location: {
      address: '123 Education Street',
      city: 'New York, NY',
      coordinates: [-74.0060, 40.7128]
    },
    format: 'In-Person'
  },
  {
    id: '4',
    title: 'Data Science with Python',
    instructor: tutors[3], // David Park
    category: 'Data Science',
    level: 'Intermediate',
    duration: '42 hours',
    price: 84.99,
    originalPrice: 159.99,
    rating: 4.7,
    students: 678,
    description: 'Learn data science fundamentals using Python. Master data analysis, visualization, and machine learning.',
    image: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop',
    topics: ['Python Programming', 'Data Analysis', 'Machine Learning', 'Data Visualization'],
    requirements: ['Basic Python knowledge', 'High school mathematics'],
    outcomes: ['Analyze complex datasets', 'Build machine learning models', 'Create data visualizations'],
    schedule: ['Tuesday, Thursday 6PM-8PM'],
    location: {
      address: '321 Data Street',
      city: 'Seattle, WA',
      coordinates: [-122.3321, 47.6062]
    },
    format: 'Hybrid'
  },
  {
    id: '5',
    title: 'UX/UI Design Fundamentals',
    instructor: tutors[4], // Lisa Thompson
    category: 'Design',
    level: 'Beginner',
    duration: '36 hours',
    price: 74.99,
    originalPrice: 139.99,
    rating: 4.8,
    students: 156,
    description: 'Learn the fundamentals of user experience and user interface design. Create beautiful and functional digital products.',
    image: 'https://images.unsplash.com/photo-1545670723-196ed0954986?w=400&h=250&fit=crop',
    topics: ['Design Principles', 'User Research', 'Wireframing', 'Prototyping'],
    requirements: ['No prior design experience needed', 'Access to design software'],
    outcomes: ['Design user-friendly interfaces', 'Conduct user research', 'Create interactive prototypes'],
    schedule: ['Wednesday, Friday 7PM-9PM'],
    location: {
      address: '567 Creative Lane',
      city: 'Austin, TX',
      coordinates: [-97.7431, 30.2672]
    },
    format: 'Online'
  },
  {
    id: '6',
    title: 'Quantum Physics for Beginners',
    instructor: tutors[5], // Dr. James Wilson
    category: 'Physics',
    level: 'Advanced',
    duration: '48 hours',
    price: 99.99,
    originalPrice: 189.99,
    rating: 4.9,
    students: 78,
    description: 'Explore the fascinating world of quantum physics. Understand the fundamental principles that govern the universe.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
    topics: ['Wave-Particle Duality', 'Quantum Superposition', 'Entanglement', 'Quantum Computing'],
    requirements: ['Strong mathematics background', 'Understanding of classical physics'],
    outcomes: ['Understand quantum principles', 'Apply quantum concepts', 'Appreciate modern physics'],
    schedule: ['Monday, Thursday 6PM-8PM'],
    location: {
      address: '890 Science Park',
      city: 'Boston, MA',
      coordinates: [-71.0589, 42.3601]
    },
    format: 'In-Person'
  }
];

export const categories = [
  {
    id: 'web-development',
    name: 'Web Development',
    icon: '💻',
    description: 'Learn to build modern websites and web applications',
    courses: courses.filter(c => c.category === 'Web Development'),
    tutors: tutors.filter(t => t.subjects.some(s => s.toLowerCase().includes('web')))
  },
  {
    id: 'marketing',
    name: 'Digital Marketing',
    icon: '📈',
    description: 'Master digital marketing strategies and grow your business',
    courses: courses.filter(c => c.category === 'Marketing'),
    tutors: tutors.filter(t => t.subjects.some(s => s.toLowerCase().includes('marketing')))
  },
  {
    id: 'mathematics',
    name: 'Mathematics',
    icon: '📐',
    description: 'Advanced mathematical concepts and problem-solving',
    courses: courses.filter(c => c.category === 'Mathematics'),
    tutors: tutors.filter(t => t.subjects.some(s => s.toLowerCase().includes('math')))
  },
  {
    id: 'data-science',
    name: 'Data Science',
    icon: '📊',
    description: 'Analyze data and build machine learning models',
    courses: courses.filter(c => c.category === 'Data Science'),
    tutors: tutors.filter(t => t.subjects.some(s => s.toLowerCase().includes('data')))
  },
  {
    id: 'design',
    name: 'Design',
    icon: '🎨',
    description: 'Create beautiful and functional digital designs',
    courses: courses.filter(c => c.category === 'Design'),
    tutors: tutors.filter(t => t.subjects.some(s => s.toLowerCase().includes('design')))
  },
  {
    id: 'physics',
    name: 'Physics',
    icon: '⚛️',
    description: 'Explore the fundamental laws of the universe',
    courses: courses.filter(c => c.category === 'Physics'),
    tutors: tutors.filter(t => t.subjects.some(s => s.toLowerCase().includes('physics')))
  }
]; 