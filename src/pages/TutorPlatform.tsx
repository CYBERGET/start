import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Star, 
  Clock, 
  Users, 
  MapPin, 
  BookOpen, 
  Search, 
  Filter,
  GraduationCap,
  DollarSign,
  Globe,
  Heart,
  Palette,
  User,
  Zap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/database';
import { LocationBasedMatching } from '@/components/LocationBasedMatching';

const serviceCategories = [
  {
    id: 'tutors',
    title: 'Tutors',
    subtitle: 'Freelancers/Jr. Tutors',
    icon: User,
    color: 'bg-blue-500',
    description: 'Find experienced tutors for personalized learning'
  },
  {
    id: 'teachers',
    title: 'Teachers',
    subtitle: 'Professional / Experienced',
    icon: GraduationCap,
    color: 'bg-green-500',
    description: 'Learn from certified professionals and experts'
  },
  {
    id: 'art-education',
    title: 'Art Education',
    subtitle: 'Dancing/Music/Editing etc.',
    icon: Palette,
    color: 'bg-purple-500',
    description: 'Explore creative arts and performance'
  },
  {
    id: 'health',
    title: 'Health',
    subtitle: 'Yoga/Nutritionists etc.',
    icon: Heart,
    color: 'bg-red-500',
    description: 'Wellness and health coaching services'
  }
];

export const TutorPlatform = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [featuredCourses, setFeaturedCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const coursesData = await api.getCourses();
      setFeaturedCourses(coursesData.slice(0, 6));
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    toast({
      title: 'Category Selected',
      description: `Exploring ${categoryId} services...`,
    });
  };

  const handleLogin = () => {
    navigate('/auth');
  };

  const handleSignup = () => {
    navigate('/auth');
  };

  const handleDonate = () => {
    toast({
      title: 'Donation',
      description: 'Thank you for your interest in donating! This feature will be available soon.',
    });
  };

  const handleViewCourses = () => {
    navigate('/courses');
  };

  const handleCourseClick = (courseId: string) => {
    navigate(`/course/${courseId}`);
  };

  const handleEnroll = (courseTitle: string, e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: 'Course Enrollment',
      description: `Successfully enrolled in "${courseTitle}"!`,
    });
  };

  const handleViewLocation = (course: any, e: React.MouseEvent) => {
    e.stopPropagation();
    toast({
      title: 'Location',
      description: `${course.instructorName} is located in ${course.locationCity}`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading featured courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-white shadow-sm p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary">We Tute</h1>
          <div className="flex gap-2">
            <Button variant="ghost" onClick={handleLogin}>Login</Button>
            <Button className="bg-green-500 hover:bg-green-600 text-white" onClick={handleSignup}>Sign up</Button>
          </div>
        </div>
      </header>

      {/* Purple Banner */}
      <div className="bg-primary text-primary-foreground py-3 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-sm">Where Knowledge Breeds Knowledge</span>
          <Button variant="secondary" size="sm" className="bg-white/20 hover:bg-white/30" onClick={handleDonate}>
            Donate 🚀
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Finding the Right Tutor, Made Simple
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Connect with expert tutors and teachers across various subjects. 
            Learn at your own pace with personalized guidance.
          </p>
          {/* Search Bar */}
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <input
              type="text"
              placeholder="Search for tutors, subjects, or locations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>

        {/* Service Categories */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {serviceCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <Card 
                key={category.id}
                className="group cursor-pointer hover:shadow-elegant transition-all duration-300 animate-scale-in border-0 shadow-md"
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => handleCategorySelect(category.id)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{category.subtitle}</p>
                  <p className="text-xs text-muted-foreground">{category.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Courses Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-foreground">Featured Courses</h3>
            <Button 
              variant="outline" 
              onClick={handleViewCourses}
              className="flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              View All Courses
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCourses.map((course, index) => (
              <Card 
                key={course.id}
                className="group cursor-pointer hover:shadow-elegant transition-all duration-300 animate-slide-up border-0 shadow-lg overflow-hidden"
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => handleCourseClick(course.id)}
              >
                {/* Course Image */}
                <CardHeader className="p-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <Badge className="bg-accent text-accent-foreground">
                        {course.categoryName}
                      </Badge>
                      <Badge variant="secondary" className="bg-white/90">
                        {course.level}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="outline" className="bg-white/90">
                        {course.format}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="p-6">
                  {/* Course Title and Instructor */}
                  <div className="space-y-3">
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <div className="flex items-center gap-3">
                      <img 
                        src={course.instructorAvatar || 'https://via.placeholder.com/40'} 
                        alt={course.instructorName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-sm">{course.instructorName}</p>
                        <p className="text-xs text-muted-foreground">{course.instructorTitle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="flex items-center gap-4 my-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {course.duration}h
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.currentStudents}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {course.locationCity}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-muted-foreground">({course.totalReviews})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">${course.price}</span>
                      <span className="text-muted-foreground line-through">${course.originalPrice}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      <span>${course.instructorHourlyRate}/hr</span>
                    </div>
                  </div>

                  {/* Course Description */}
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                    {course.description}
                  </p>

                  {/* Topics Preview */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {course.topics.slice(0, 3).map((topic: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                    {course.topics.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{course.topics.length - 3} more
                      </Badge>
                    )}
                  </div>
                </CardContent>

                <CardContent className="p-6 pt-0">
                  <div className="flex gap-2 w-full">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground group-hover:shadow-glow transition-all duration-300"
                      onClick={(e) => handleEnroll(course.title, e)}
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Enroll Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon"
                      onClick={(e) => handleViewLocation(course, e)}
                      className="group-hover:shadow-glow transition-all duration-300"
                    >
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center py-12 bg-gradient-to-r from-primary to-primary/80 rounded-2xl text-primary-foreground">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Learning?</h3>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have transformed their skills with our expert tutors
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-primary hover:bg-white/90"
              onClick={handleViewCourses}
            >
              <Zap className="w-5 h-5 mr-2" />
              Explore Courses
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10"
              onClick={handleSignup}
            >
              <User className="w-5 h-5 mr-2" />
              Join Now
            </Button>
          </div>
        </div>
      </div>

      {/* Location-Based Matching Section */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-100">
        <div className="container mx-auto px-4">
          <LocationBasedMatching />
        </div>
      </section>
    </div>
  );
};