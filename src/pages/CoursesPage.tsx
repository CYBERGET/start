import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
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
  Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/database';

export const CoursesPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedFormat, setSelectedFormat] = useState<string>('all');
  const [courses, setCourses] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [coursesData, categoriesData] = await Promise.all([
        api.getCourses(),
        api.getCategories()
      ]);
      setCourses(coursesData);
      setCategories(categoriesData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.instructorName?.toLowerCase().includes(searchTerm.toLowerCase()) || '') ||
      (course.categoryName?.toLowerCase().includes(searchTerm.toLowerCase()) || '');
    const matchesCategory = selectedCategory === 'all' || (course.categoryName?.toLowerCase().includes(selectedCategory));
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesFormat = selectedFormat === 'all' || course.format === selectedFormat;
    return matchesSearch && matchesCategory && matchesLevel && matchesFormat;
  });

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
          <p className="text-muted-foreground">Loading courses...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">Explore Our Courses</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover comprehensive courses taught by expert instructors. Find the perfect course to advance your skills and career.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-6">
        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <Input
            placeholder="Search courses, instructors, or categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-3 text-lg"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-center">
          {/* Category Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-sm"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name.toLowerCase()}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Level Filter */}
          <div className="flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-sm"
            >
              <option value="all">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          {/* Format Filter */}
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-muted-foreground" />
            <select
              value={selectedFormat}
              onChange={(e) => setSelectedFormat(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-sm"
            >
              <option value="all">All Formats</option>
              <option value="Online">Online</option>
              <option value="In-Person">In-Person</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center">
          <p className="text-muted-foreground">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCourses.map((course, index) => (
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

            <CardFooter className="p-6 pt-0">
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
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or browse all courses
          </p>
          <Button 
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('all');
              setSelectedLevel('all');
              setSelectedFormat('all');
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}; 