// Database Schema and Backend Integration
export interface DatabaseSchema {
  users: User[];
  courses: Course[];
  tutors: Tutor[];
  enrollments: Enrollment[];
  locations: Location[];
  categories: Category[];
  reviews: Review[];
  orders: Order[];
  cart: CartItem[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'student' | 'tutor' | 'admin';
  avatar?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  country?: string;
  createdAt: Date;
  updatedAt: Date;
  preferences: {
    subjects: string[];
    learningStyle: string;
    availability: string[];
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  categoryId: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: number; // in hours
  price: number;
  originalPrice: number;
  image: string;
  videoUrl?: string;
  topics: string[];
  requirements: string[];
  outcomes: string[];
  schedule: string[];
  format: 'Online' | 'In-Person' | 'Hybrid';
  maxStudents: number;
  currentStudents: number;
  rating: number;
  totalReviews: number;
  status: 'active' | 'draft' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface Tutor {
  id: string;
  userId: string;
  title: string;
  experience: string;
  bio: string;
  subjects: string[];
  hourlyRate: number;
  availability: string[];
  education: string[];
  certifications: string[];
  languages: string[];
  teachingStyle: string;
  specializations: string[];
  rating: number;
  totalStudents: number;
  totalReviews: number;
  status: 'active' | 'inactive' | 'verified';
  locationId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Location {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  type: 'tutor_location' | 'course_location' | 'meeting_point';
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  parentId?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  enrolledAt: Date;
  completedAt?: Date;
  progress: number; // 0-100
  certificateUrl?: string;
}

export interface Review {
  id: string;
  userId: string;
  courseId?: string;
  tutorId?: string;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  status: 'pending' | 'paid' | 'completed' | 'cancelled';
  paymentMethod: string;
  paymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  courseId: string;
  price: number;
  quantity: number;
}

export interface CartItem {
  id: string;
  userId: string;
  courseId: string;
  addedAt: Date;
}

// Mock Database Implementation
class MockDatabase {
  private data: DatabaseSchema = {
    users: [],
    courses: [],
    tutors: [],
    enrollments: [],
    locations: [],
    categories: [],
    reviews: [],
    orders: [],
    cart: []
  };

  constructor() {
    this.initializeData();
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }

  private initializeData() {
    // Initialize with sample data
    this.data.categories = [
      {
        id: '1',
        name: 'Web Development',
        description: 'Learn to build modern websites and web applications',
        icon: '💻',
        color: '#3B82F6',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: 'Digital Marketing',
        description: 'Master digital marketing strategies and grow your business',
        icon: '📈',
        color: '#10B981',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        name: 'Mathematics',
        description: 'Advanced mathematical concepts and problem-solving',
        icon: '📐',
        color: '#8B5CF6',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        name: 'Data Science',
        description: 'Analyze data and build machine learning models',
        icon: '📊',
        color: '#F59E0B',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5',
        name: 'Design',
        description: 'Create beautiful and functional digital designs',
        icon: '🎨',
        color: '#EF4444',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '6',
        name: 'Physics',
        description: 'Explore the fundamental laws of the universe',
        icon: '⚛️',
        color: '#06B6D4',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    this.data.locations = [
      {
        id: '1',
        address: '123 Education Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        coordinates: { latitude: 40.7128, longitude: -74.0060 },
        type: 'tutor_location',
        description: 'Downtown Manhattan location',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        address: '456 Tech Avenue',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        country: 'USA',
        coordinates: { latitude: 37.7749, longitude: -122.4194 },
        type: 'tutor_location',
        description: 'Silicon Valley tech hub',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        address: '789 Marketing Blvd',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        country: 'USA',
        coordinates: { latitude: 34.0522, longitude: -118.2437 },
        type: 'tutor_location',
        description: 'LA creative district',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        address: '321 Data Street',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'USA',
        coordinates: { latitude: 47.6062, longitude: -122.3321 },
        type: 'tutor_location',
        description: 'Seattle tech corridor',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5',
        address: '567 Creative Lane',
        city: 'Austin',
        state: 'TX',
        zipCode: '73301',
        country: 'USA',
        coordinates: { latitude: 30.2672, longitude: -97.7431 },
        type: 'tutor_location',
        description: 'Austin creative hub',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '6',
        address: '890 Science Park',
        city: 'Boston',
        state: 'MA',
        zipCode: '02101',
        country: 'USA',
        coordinates: { latitude: 42.3601, longitude: -71.0589 },
        type: 'tutor_location',
        description: 'Boston academic district',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Initialize users
    this.data.users = [
      {
        id: '1',
        email: 'admin@wetute.com',
        name: 'Administrator',
        role: 'admin',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        phone: '+1-555-0123',
        address: '123 Admin Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: {
          subjects: ['All'],
          learningStyle: 'Administrative',
          availability: ['24/7']
        }
      },
      {
        id: '2',
        email: 'sarah.johnson@example.com',
        name: 'Dr. Sarah Johnson',
        role: 'tutor',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
        phone: '+1-555-0124',
        address: '123 Education Street',
        city: 'New York',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: {
          subjects: ['Mathematics', 'Calculus', 'Algebra'],
          learningStyle: 'Interactive',
          availability: ['Monday-Friday 9AM-6PM', 'Saturday 10AM-2PM']
        }
      },
      {
        id: '3',
        email: 'mike.chen@example.com',
        name: 'Mike Chen',
        role: 'tutor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        phone: '+1-555-0125',
        address: '456 Tech Avenue',
        city: 'San Francisco',
        state: 'CA',
        zipCode: '94102',
        country: 'USA',
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: {
          subjects: ['Programming', 'Web Development', 'Data Science'],
          learningStyle: 'Hands-on',
          availability: ['Monday-Friday 10AM-8PM', 'Sunday 2PM-6PM']
        }
      },
      {
        id: '4',
        email: 'emma.wilson@example.com',
        name: 'Emma Wilson',
        role: 'tutor',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        phone: '+1-555-0126',
        address: '789 Creative Lane',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90001',
        country: 'USA',
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: {
          subjects: ['Design', 'UI/UX', 'Graphic Design'],
          learningStyle: 'Creative',
          availability: ['Tuesday-Thursday 1PM-9PM', 'Saturday 11AM-5PM']
        }
      },
      {
        id: '5',
        email: 'david.kumar@example.com',
        name: 'Dr. David Kumar',
        role: 'tutor',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        phone: '+1-555-0127',
        address: '321 Data Street',
        city: 'Seattle',
        state: 'WA',
        zipCode: '98101',
        country: 'USA',
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: {
          subjects: ['Data Science', 'Machine Learning', 'Statistics'],
          learningStyle: 'Analytical',
          availability: ['Monday-Wednesday 9AM-5PM', 'Friday 2PM-8PM']
        }
      },
      {
        id: '6',
        email: 'lisa.garcia@example.com',
        name: 'Lisa Garcia',
        role: 'tutor',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face',
        phone: '+1-555-0128',
        address: '567 Creative Lane',
        city: 'Austin',
        state: 'TX',
        zipCode: '73301',
        country: 'USA',
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: {
          subjects: ['Physics', 'Chemistry', 'Biology'],
          learningStyle: 'Experimental',
          availability: ['Monday-Friday 3PM-9PM', 'Saturday 9AM-3PM']
        }
      },
      {
        id: '7',
        email: 'james.lee@example.com',
        name: 'James Lee',
        role: 'tutor',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        phone: '+1-555-0129',
        address: '890 Science Park',
        city: 'Boston',
        state: 'MA',
        zipCode: '02101',
        country: 'USA',
        createdAt: new Date(),
        updatedAt: new Date(),
        preferences: {
          subjects: ['English', 'Literature', 'Writing'],
          learningStyle: 'Discussion-based',
          availability: ['Tuesday-Thursday 4PM-10PM', 'Sunday 1PM-7PM']
        }
      }
    ];

    // Initialize tutors
    this.data.tutors = [
      {
        id: '1',
        userId: '2',
        title: 'Senior Mathematics Professor',
        experience: '15+ years',
        bio: 'Dr. Sarah is a passionate mathematics educator with over 15 years of experience teaching at university level.',
        subjects: ['Mathematics', 'Calculus', 'Algebra', 'Statistics'],
        hourlyRate: 85,
        availability: ['Monday-Friday 9AM-6PM', 'Saturday 10AM-2PM'],
        education: ['PhD Mathematics - MIT', 'MSc Mathematics - Stanford'],
        certifications: ['Certified Mathematics Teacher', 'Advanced Calculus Instructor'],
        languages: ['English', 'Spanish'],
        teachingStyle: 'Interactive and problem-solving focused',
        specializations: ['Calculus', 'Linear Algebra', 'Mathematical Modeling'],
        rating: 4.9,
        totalStudents: 234,
        totalReviews: 45,
        status: 'verified',
        locationId: '1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        userId: '3',
        title: 'Full-Stack Web Developer & Instructor',
        experience: '8+ years',
        bio: 'Mike is a passionate web developer who loves teaching others the art of coding and building amazing web applications.',
        subjects: ['Programming', 'Web Development', 'JavaScript', 'React', 'Node.js'],
        hourlyRate: 75,
        availability: ['Monday-Friday 10AM-8PM', 'Sunday 2PM-6PM'],
        education: ['BSc Computer Science - UC Berkeley', 'MSc Software Engineering - Stanford'],
        certifications: ['AWS Certified Developer', 'Google Cloud Professional'],
        languages: ['English', 'Mandarin'],
        teachingStyle: 'Hands-on project-based learning',
        specializations: ['React Development', 'Full-Stack Applications', 'API Design'],
        rating: 4.8,
        totalStudents: 156,
        totalReviews: 32,
        status: 'verified',
        locationId: '2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        userId: '4',
        title: 'Creative Design Director',
        experience: '12+ years',
        bio: 'Emma is a creative design professional with expertise in UI/UX, graphic design, and digital art.',
        subjects: ['Design', 'UI/UX', 'Graphic Design', 'Digital Art'],
        hourlyRate: 70,
        availability: ['Tuesday-Thursday 1PM-9PM', 'Saturday 11AM-5PM'],
        education: ['BFA Design - Parsons School', 'MFA Digital Arts - UCLA'],
        certifications: ['Adobe Certified Expert', 'Google UX Design Certificate'],
        languages: ['English', 'French'],
        teachingStyle: 'Creative exploration and portfolio building',
        specializations: ['User Interface Design', 'Brand Identity', 'Digital Illustration'],
        rating: 4.7,
        totalStudents: 89,
        totalReviews: 18,
        status: 'verified',
        locationId: '3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        userId: '5',
        title: 'Data Science & AI Specialist',
        experience: '10+ years',
        bio: 'Dr. David is a data science expert with deep knowledge in machine learning, AI, and statistical analysis.',
        subjects: ['Data Science', 'Machine Learning', 'Statistics', 'Python'],
        hourlyRate: 90,
        availability: ['Monday-Wednesday 9AM-5PM', 'Friday 2PM-8PM'],
        education: ['PhD Computer Science - MIT', 'MSc Statistics - Harvard'],
        certifications: ['TensorFlow Developer', 'AWS Machine Learning Specialist'],
        languages: ['English', 'Hindi'],
        teachingStyle: 'Data-driven problem solving and real-world applications',
        specializations: ['Deep Learning', 'Natural Language Processing', 'Predictive Analytics'],
        rating: 4.9,
        totalStudents: 203,
        totalReviews: 41,
        status: 'verified',
        locationId: '4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5',
        userId: '6',
        title: 'Science Education Specialist',
        experience: '7+ years',
        bio: 'Lisa is a dedicated science educator who makes complex scientific concepts accessible and engaging.',
        subjects: ['Physics', 'Chemistry', 'Biology', 'Environmental Science'],
        hourlyRate: 65,
        availability: ['Monday-Friday 3PM-9PM', 'Saturday 9AM-3PM'],
        education: ['MSc Physics - University of Texas', 'BSc Chemistry - Rice University'],
        certifications: ['Certified Science Teacher', 'STEM Education Specialist'],
        languages: ['English', 'Spanish'],
        teachingStyle: 'Experimental and inquiry-based learning',
        specializations: ['AP Physics', 'Chemistry Lab', 'Biology Research'],
        rating: 4.6,
        totalStudents: 127,
        totalReviews: 28,
        status: 'verified',
        locationId: '5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '6',
        userId: '7',
        title: 'English Literature & Writing Coach',
        experience: '9+ years',
        bio: 'James is an experienced English educator who helps students develop strong writing and critical thinking skills.',
        subjects: ['English', 'Literature', 'Writing', 'Creative Writing'],
        hourlyRate: 60,
        availability: ['Tuesday-Thursday 4PM-10PM', 'Sunday 1PM-7PM'],
        education: ['MA English Literature - Boston University', 'BA Creative Writing - Emerson College'],
        certifications: ['Certified English Teacher', 'Writing Workshop Leader'],
        languages: ['English', 'Korean'],
        teachingStyle: 'Discussion-based and writing-focused approach',
        specializations: ['Essay Writing', 'Creative Writing', 'Literature Analysis'],
        rating: 4.8,
        totalStudents: 94,
        totalReviews: 22,
        status: 'verified',
        locationId: '6',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Initialize courses
    this.data.courses = [
      {
        id: '1',
        title: 'Complete Web Development Bootcamp',
        description: 'Learn web development from scratch with this comprehensive bootcamp covering HTML, CSS, JavaScript, React, and Node.js.',
        instructorId: '2',
        categoryId: '1',
        level: 'Beginner',
        duration: 52,
        price: 89.99,
        originalPrice: 199.99,
        image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop',
        videoUrl: 'https://example.com/course-preview-1',
        topics: ['HTML & CSS', 'JavaScript', 'React', 'Node.js', 'Database Design'],
        requirements: ['Basic computer skills', 'No prior programming experience needed'],
        outcomes: ['Build full-stack web applications', 'Deploy projects to the web', 'Understand modern web development'],
        schedule: ['Monday, Wednesday, Friday 6PM-8PM'],
        format: 'Hybrid',
        maxStudents: 50,
        currentStudents: 23,
        rating: 4.9,
        totalReviews: 12,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        title: 'Advanced React & TypeScript Mastery',
        description: 'Master React with TypeScript, advanced patterns, and state management for professional applications.',
        instructorId: '2',
        categoryId: '1',
        level: 'Advanced',
        duration: 32,
        price: 129.99,
        originalPrice: 249.99,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
        videoUrl: 'https://example.com/course-preview-2',
        topics: ['React Hooks', 'TypeScript', 'Redux Toolkit', 'Testing', 'Performance Optimization'],
        requirements: ['Basic JavaScript knowledge', 'Understanding of React fundamentals'],
        outcomes: ['Build scalable React applications', 'Implement TypeScript effectively', 'Master state management'],
        schedule: ['Tuesday, Thursday 7PM-9PM'],
        format: 'Online',
        maxStudents: 30,
        currentStudents: 18,
        rating: 4.8,
        totalReviews: 8,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        title: 'UI/UX Design Fundamentals',
        description: 'Learn the principles of user interface and user experience design with hands-on projects.',
        instructorId: '3',
        categoryId: '5',
        level: 'Beginner',
        duration: 24,
        price: 79.99,
        originalPrice: 159.99,
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
        videoUrl: 'https://example.com/course-preview-3',
        topics: ['Design Principles', 'User Research', 'Wireframing', 'Prototyping', 'Usability Testing'],
        requirements: ['Basic computer skills', 'Creative mindset'],
        outcomes: ['Create user-centered designs', 'Build interactive prototypes', 'Conduct usability studies'],
        schedule: ['Wednesday, Saturday 2PM-4PM'],
        format: 'Hybrid',
        maxStudents: 25,
        currentStudents: 15,
        rating: 4.7,
        totalReviews: 6,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        title: 'Data Science & Machine Learning',
        description: 'Comprehensive introduction to data science, statistics, and machine learning algorithms.',
        instructorId: '4',
        categoryId: '4',
        level: 'Intermediate',
        duration: 40,
        price: 149.99,
        originalPrice: 299.99,
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop',
        videoUrl: 'https://example.com/course-preview-4',
        topics: ['Python Programming', 'Statistics', 'Machine Learning', 'Deep Learning', 'Data Visualization'],
        requirements: ['Basic Python knowledge', 'Understanding of mathematics'],
        outcomes: ['Build ML models', 'Analyze complex datasets', 'Create data visualizations'],
        schedule: ['Monday, Friday 6PM-8PM'],
        format: 'Online',
        maxStudents: 35,
        currentStudents: 28,
        rating: 4.9,
        totalReviews: 15,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '5',
        title: 'Calculus for Beginners',
        description: 'Master the fundamentals of calculus with clear explanations and practical applications.',
        instructorId: '1',
        categoryId: '3',
        level: 'Beginner',
        duration: 36,
        price: 69.99,
        originalPrice: 139.99,
        image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop',
        videoUrl: 'https://example.com/course-preview-5',
        topics: ['Limits', 'Derivatives', 'Integration', 'Applications', 'Problem Solving'],
        requirements: ['Basic algebra knowledge', 'Understanding of functions'],
        outcomes: ['Solve calculus problems', 'Understand mathematical concepts', 'Apply calculus to real-world scenarios'],
        schedule: ['Tuesday, Thursday 5PM-7PM'],
        format: 'In-Person',
        maxStudents: 20,
        currentStudents: 12,
        rating: 4.8,
        totalReviews: 9,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '6',
        title: 'Physics: Mechanics & Motion',
        description: 'Explore the fundamental principles of physics through interactive experiments and problem-solving.',
        instructorId: '5',
        categoryId: '6',
        level: 'Intermediate',
        duration: 28,
        price: 59.99,
        originalPrice: 119.99,
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop',
        videoUrl: 'https://example.com/course-preview-6',
        topics: ['Kinematics', 'Dynamics', 'Energy', 'Momentum', 'Circular Motion'],
        requirements: ['Basic mathematics', 'Understanding of algebra'],
        outcomes: ['Solve physics problems', 'Understand motion principles', 'Apply physics concepts'],
        schedule: ['Monday, Wednesday 4PM-6PM'],
        format: 'Hybrid',
        maxStudents: 18,
        currentStudents: 14,
        rating: 4.6,
        totalReviews: 7,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '7',
        title: 'Creative Writing Workshop',
        description: 'Develop your creative writing skills through guided exercises and peer feedback.',
        instructorId: '6',
        categoryId: '2',
        level: 'Beginner',
        duration: 20,
        price: 49.99,
        originalPrice: 99.99,
        image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=250&fit=crop',
        videoUrl: 'https://example.com/course-preview-7',
        topics: ['Story Structure', 'Character Development', 'Dialogue', 'Setting', 'Revision'],
        requirements: ['Basic writing skills', 'Creative imagination'],
        outcomes: ['Write compelling stories', 'Develop unique characters', 'Master narrative techniques'],
        schedule: ['Thursday, Sunday 3PM-5PM'],
        format: 'Online',
        maxStudents: 15,
        currentStudents: 10,
        rating: 4.7,
        totalReviews: 5,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '8',
        title: 'Advanced JavaScript Patterns',
        description: 'Deep dive into advanced JavaScript concepts, design patterns, and modern ES6+ features.',
        instructorId: '2',
        categoryId: '1',
        level: 'Advanced',
        duration: 18,
        price: 89.99,
        originalPrice: 179.99,
        image: 'https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=400&h=250&fit=crop',
        videoUrl: 'https://example.com/course-preview-8',
        topics: ['ES6+ Features', 'Design Patterns', 'Async Programming', 'Functional Programming', 'Performance'],
        requirements: ['Solid JavaScript fundamentals', 'Understanding of programming concepts'],
        outcomes: ['Write clean, maintainable code', 'Implement design patterns', 'Optimize JavaScript performance'],
        schedule: ['Friday 6PM-9PM'],
        format: 'Online',
        maxStudents: 22,
        currentStudents: 16,
        rating: 4.9,
        totalReviews: 11,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '9',
        title: 'Digital Marketing Mastery',
        description: 'Learn modern digital marketing strategies including SEO, social media, and content marketing.',
        instructorId: '3',
        categoryId: '2',
        level: 'Intermediate',
        duration: 30,
        price: 99.99,
        originalPrice: 199.99,
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
        videoUrl: 'https://example.com/course-preview-9',
        topics: ['SEO', 'Social Media Marketing', 'Content Strategy', 'Analytics', 'Email Marketing'],
        requirements: ['Basic computer skills', 'Understanding of business concepts'],
        outcomes: ['Create marketing campaigns', 'Analyze marketing data', 'Develop content strategies'],
        schedule: ['Tuesday, Saturday 1PM-3PM'],
        format: 'Hybrid',
        maxStudents: 30,
        currentStudents: 25,
        rating: 4.8,
        totalReviews: 13,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '10',
        title: 'Python for Data Analysis',
        description: 'Learn Python programming specifically for data analysis and manipulation.',
        instructorId: '4',
        categoryId: '4',
        level: 'Beginner',
        duration: 26,
        price: 79.99,
        originalPrice: 159.99,
        image: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=250&fit=crop',
        videoUrl: 'https://example.com/course-preview-10',
        topics: ['Python Basics', 'Pandas', 'NumPy', 'Matplotlib', 'Data Cleaning'],
        requirements: ['Basic computer skills', 'No prior programming experience needed'],
        outcomes: ['Analyze datasets', 'Create data visualizations', 'Clean and process data'],
        schedule: ['Wednesday, Friday 5PM-7PM'],
        format: 'Online',
        maxStudents: 28,
        currentStudents: 20,
        rating: 4.7,
        totalReviews: 8,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '11',
        title: 'Algebra & Pre-Calculus',
        description: 'Build a strong foundation in algebra and prepare for calculus with comprehensive problem-solving.',
        instructorId: '1',
        categoryId: '3',
        level: 'Intermediate',
        duration: 34,
        price: 74.99,
        originalPrice: 149.99,
        image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=250&fit=crop',
        videoUrl: 'https://example.com/course-preview-11',
        topics: ['Linear Algebra', 'Quadratic Functions', 'Trigonometry', 'Complex Numbers', 'Functions'],
        requirements: ['Basic algebra knowledge', 'Understanding of mathematical concepts'],
        outcomes: ['Solve complex equations', 'Understand function behavior', 'Prepare for calculus'],
        schedule: ['Monday, Thursday 6PM-8PM'],
        format: 'In-Person',
        maxStudents: 24,
        currentStudents: 17,
        rating: 4.8,
        totalReviews: 10,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '12',
        title: 'Chemistry Fundamentals',
        description: 'Explore the fascinating world of chemistry through experiments and theoretical understanding.',
        instructorId: '5',
        categoryId: '6',
        level: 'Beginner',
        duration: 22,
        price: 54.99,
        originalPrice: 109.99,
        image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=250&fit=crop',
        videoUrl: 'https://example.com/course-preview-12',
        topics: ['Atomic Structure', 'Chemical Bonding', 'Reactions', 'Stoichiometry', 'Solutions'],
        requirements: ['Basic mathematics', 'Understanding of scientific method'],
        outcomes: ['Understand chemical concepts', 'Perform calculations', 'Conduct experiments safely'],
        schedule: ['Tuesday, Friday 4PM-6PM'],
        format: 'Hybrid',
        maxStudents: 16,
        currentStudents: 11,
        rating: 4.6,
        totalReviews: 6,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
  }

  // Database Operations
  async query<T>(table: keyof DatabaseSchema, filters?: Partial<T>): Promise<T[]> {
    let results = this.data[table] as T[];
    
    if (filters) {
      results = results.filter(item => {
        return Object.entries(filters).every(([key, value]) => {
          return (item as any)[key] === value;
        });
      });
    }
    
    return results;
  }

  async insert<T>(table: keyof DatabaseSchema, data: Omit<T, 'id'>): Promise<T> {
    const newItem = { ...data, id: this.generateId() } as T;
    this.data[table].push(newItem as any);
    return newItem;
  }

  async update<T>(table: keyof DatabaseSchema, id: string, data: Partial<T>): Promise<T | null> {
    const index = this.data[table].findIndex(item => (item as any).id === id);
    if (index === -1) return null;
    
    this.data[table][index] = { ...this.data[table][index], ...data, updatedAt: new Date() };
    return this.data[table][index] as T;
  }

  async delete(table: keyof DatabaseSchema, id: string): Promise<boolean> {
    const index = this.data[table].findIndex(item => (item as any).id === id);
    if (index === -1) return false;
    
    this.data[table].splice(index, 1);
    return true;
  }
}

// Export singleton instance
export const db = new MockDatabase();

// API Functions
export const api = {
  // User operations
  async getUsers(filters?: Partial<User>): Promise<User[]> {
    return db.query<User>('users', filters);
  },

  async createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    return db.insert<User>('users', {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    return db.update<User>('users', id, userData);
  },

  async deleteUser(id: string): Promise<boolean> {
    return db.delete('users', id);
  },

  // Course operations
  async getCourses(filters?: Partial<Course>): Promise<Course[]> {
    return db.query<Course>('courses', filters);
  },

  async getCourseById(id: string): Promise<Course | null> {
    const courses = await db.query<Course>('courses', { id } as any);
    return courses[0] || null;
  },

  async createCourse(courseData: Omit<Course, 'id' | 'createdAt' | 'updatedAt'>): Promise<Course> {
    return db.insert<Course>('courses', {
      ...courseData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  async updateCourse(id: string, courseData: Partial<Course>): Promise<Course | null> {
    return db.update<Course>('courses', id, courseData);
  },

  async deleteCourse(id: string): Promise<boolean> {
    return db.delete('courses', id);
  },

  // Tutor operations
  async getTutors(filters?: Partial<Tutor>): Promise<Tutor[]> {
    return db.query<Tutor>('tutors', filters);
  },

  async getTutorById(id: string): Promise<Tutor | null> {
    const tutors = await db.query<Tutor>('tutors', { id } as any);
    return tutors[0] || null;
  },

  async createTutor(tutorData: Omit<Tutor, 'id' | 'createdAt' | 'updatedAt'>): Promise<Tutor> {
    return db.insert<Tutor>('tutors', {
      ...tutorData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  // Location operations
  async getLocations(filters?: Partial<Location>): Promise<Location[]> {
    return db.query<Location>('locations', filters);
  },

  async getLocationById(id: string): Promise<Location | null> {
    const locations = await db.query<Location>('locations', { id } as any);
    return locations[0] || null;
  },

  async createLocation(locationData: Omit<Location, 'id' | 'createdAt' | 'updatedAt'>): Promise<Location> {
    return db.insert<Location>('locations', {
      ...locationData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  },

  // Category operations
  async getCategories(filters?: Partial<Category>): Promise<Category[]> {
    return db.query<Category>('categories', filters);
  },

  // Enrollment operations
  async enrollUser(userId: string, courseId: string): Promise<Enrollment> {
    return db.insert<Enrollment>('enrollments', {
      userId,
      courseId,
      status: 'active',
      enrolledAt: new Date(),
      progress: 0
    });
  },

  // Cart operations
  async addToCart(userId: string, courseId: string): Promise<CartItem> {
    return db.insert<CartItem>('cart', {
      userId,
      courseId,
      addedAt: new Date()
    });
  },

  async getCart(userId: string): Promise<CartItem[]> {
    return db.query<CartItem>('cart', { userId } as any);
  },

  async removeFromCart(cartItemId: string): Promise<boolean> {
    return db.delete('cart', cartItemId);
  }
}; 