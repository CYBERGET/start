import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Star, 
  Clock, 
  Users, 
  MapPin, 
  BookOpen, 
  CheckCircle, 
  Phone, 
  Mail, 
  MessageSquare,
  ArrowLeft,
  DollarSign,
  Calendar,
  Globe,
  Award,
  GraduationCap
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MapComponent } from '@/components/MapComponent';
import { api } from '@/lib/database';

export const CourseDetailPage = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [course, setCourse] = useState<any>(null);
  const [instructor, setInstructor] = useState<any>(null);
  const [location, setLocation] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    const fetchCourseData = async () => {
      if (!courseId) return;
      
      setLoading(true);
      try {
        // Fetch course details
        const courseData = await api.getCourseById(courseId);
        if (!courseData) {
          toast({
            title: 'Course Not Found',
            description: 'The requested course could not be found.',
            variant: 'destructive'
          });
          navigate('/courses');
          return;
        }

        // Fetch instructor details
        const instructorData = await api.getTutorById(courseData.instructorId);
        if (instructorData) {
          // Fetch instructor's user details
          const instructorUser = await api.getUsers({ id: instructorData.userId });
          const instructorLocation = await api.getLocationById(instructorData.locationId);
          
          setInstructor({
            ...instructorData,
            user: instructorUser[0],
            location: instructorLocation
          });
          setLocation(instructorLocation);
        }

        // Enrich course data with instructor and location info
        const enrichedCourse = {
          ...courseData,
          instructorName: instructorData ? (await api.getUsers({ id: instructorData.userId }))[0]?.name : 'N/A',
          instructorAvatar: instructorData ? (await api.getUsers({ id: instructorData.userId }))[0]?.avatar : 'https://via.placeholder.com/40',
          instructorTitle: instructorData?.title || 'N/A',
          instructorHourlyRate: instructorData?.hourlyRate || 0,
          locationCity: location?.city || 'N/A',
          categoryName: (await api.getCategories({ id: courseData.categoryId }))[0]?.name || 'N/A'
        };

        setCourse(enrichedCourse);
      } catch (error) {
        console.error('Error fetching course data:', error);
        toast({
          title: 'Error',
          description: 'Failed to load course details.',
          variant: 'destructive'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId, navigate, toast]);

  const handleEnroll = () => {
    toast({
      title: 'Course Enrollment',
      description: `Successfully enrolled in "${course?.title}"!`,
    });
  };

  const handleContactInstructor = (method: 'phone' | 'email' | 'message') => {
    const instructorName = instructor?.user?.name || 'the instructor';
    const action = method === 'phone' ? 'call' : method === 'email' ? 'email' : 'message';
    
    toast({
      title: 'Contact Instructor',
      description: `You can ${action} ${instructorName} through the platform.`,
    });
  };

  const handleViewLocation = () => {
    setShowMap(!showMap);
  };

  const handleBackToCourses = () => {
    navigate('/courses');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Course Not Found</h2>
          <Button onClick={handleBackToCourses}>Back to Courses</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={handleBackToCourses}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Header */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="p-0">
                <div className="relative">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-64 object-cover rounded-t-lg"
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
                <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
                <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
                
                {/* Course Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-semibold">{course.duration}h</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Students</p>
                    <p className="font-semibold">{course.currentStudents}</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Star className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Rating</p>
                    <p className="font-semibold">{course.rating}/5</p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold">{course.locationCity}</p>
                  </div>
                </div>

                {/* What You'll Learn */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {course.topics.map((topic: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Course Content */}
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4">Course Content</h3>
                  <div className="space-y-3">
                    {course.content?.map((section: any, index: number) => (
                      <div key={index} className="border rounded-lg p-4">
                        <h4 className="font-semibold mb-2">{section.title}</h4>
                        <p className="text-sm text-muted-foreground">{section.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{section.duration} min</span>
                          <span>{section.lessons} lessons</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Requirements */}
                {course.requirements && course.requirements.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xl font-bold mb-4">Requirements</h3>
                    <ul className="space-y-2">
                      {course.requirements.map((req: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm">{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Instructor Profile */}
            {instructor && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    About the Instructor
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4 mb-6">
                    <img 
                      src={instructor.user?.avatar || 'https://via.placeholder.com/80'} 
                      alt={instructor.user?.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{instructor.user?.name}</h3>
                      <p className="text-muted-foreground mb-2">{instructor.title}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span>{instructor.rating}/5</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span>{instructor.totalStudents} students</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Award className="w-4 h-4" />
                          <span>{instructor.experience} years</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">{instructor.bio}</p>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => handleContactInstructor('phone')}
                      className="flex-1"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleContactInstructor('email')}
                      className="flex-1"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleContactInstructor('message')}
                      className="flex-1"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Location Map */}
            {showMap && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-primary" />
                    Location
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MapComponent />
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <Card className="border-0 shadow-lg sticky top-8">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-primary">${course.price}</span>
                    <span className="text-muted-foreground line-through">${course.originalPrice}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">One-time payment</p>
                </div>

                <div className="space-y-4">
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90"
                    onClick={handleEnroll}
                  >
                    <BookOpen className="w-4 h-4 mr-2" />
                    Enroll Now
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleViewLocation}
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {showMap ? 'Hide Location' : 'View Location'}
                  </Button>
                </div>

                <Separator className="my-4" />

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Course includes:</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Full lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Access on mobile and TV</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>30-day money-back guarantee</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructor Contact */}
            {instructor && (
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Contact Instructor</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <img 
                      src={instructor.user?.avatar || 'https://via.placeholder.com/40'} 
                      alt={instructor.user?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold">{instructor.user?.name}</p>
                      <p className="text-sm text-muted-foreground">{instructor.title}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <DollarSign className="w-4 h-4" />
                    <span>${instructor.hourlyRate}/hour</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{instructor.location?.city}, {instructor.location?.state}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Globe className="w-4 h-4" />
                    <span>{instructor.location?.country}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}; 