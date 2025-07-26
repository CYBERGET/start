import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Users, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    instructor: "Dr. Angela Yu",
    rating: 4.9,
    students: 234,
    duration: "52 hours",
    price: "$89.99",
    originalPrice: "$199.99",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop",
    category: "Web Development",
    level: "Beginner"
  },
  {
    id: 2,
    title: "Digital Marketing Masterclass",
    instructor: "Neil Patel",
    rating: 4.8,
    students: 456,
    duration: "38 hours",
    price: "$79.99",
    originalPrice: "$149.99",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
    category: "Marketing",
    level: "Intermediate"
  },
  {
    id: 3,
    title: "UX/UI Design Complete Course",
    instructor: "Jonas Schmedtmann",
    rating: 4.9,
    students: 189,
    duration: "45 hours",
    price: "$94.99",
    originalPrice: "$179.99",
    image: "https://images.unsplash.com/photo-1545670723-196ed0954986?w=400&h=250&fit=crop",
    category: "Design",
    level: "Beginner"
  },
  {
    id: 4,
    title: "Python for Data Science",
    instructor: "Jose Portilla",
    rating: 4.7,
    students: 678,
    duration: "42 hours",
    price: "$84.99",
    originalPrice: "$159.99",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=250&fit=crop",
    category: "Programming",
    level: "Intermediate"
  }
];

export const FeaturedCourses = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleEnroll = (courseTitle: string) => {
    toast({
      title: 'Course Enrollment',
      description: `You have successfully enrolled in "${courseTitle}"!`,
    });
    // In a real app, this would redirect to the course or payment page
    navigate('/tutor-platform');
  };

  const handleViewAllCourses = () => {
    navigate('/tutor-platform');
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            Featured Courses
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Most Popular Courses
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover our most popular courses and start learning today with world-class instructors
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {courses.map((course, index) => (
            <Card 
              key={course.id} 
              className="group hover:shadow-elegant transition-all duration-300 animate-slide-up border-0 shadow-lg"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-accent text-accent-foreground">
                      {course.category}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="secondary" className="bg-white/90">
                      {course.level}
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6">
                <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="text-muted-foreground mb-4">by {course.instructor}</p>
                
                <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {course.students}
                  </div>
                </div>

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
                  <span className="text-muted-foreground">({course.students})</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">{course.price}</span>
                  <span className="text-muted-foreground line-through">{course.originalPrice}</span>
                </div>
              </CardContent>

              <CardFooter className="p-6 pt-0">
                <Button 
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground group-hover:shadow-glow transition-all duration-300"
                  onClick={() => handleEnroll(course.title)}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Enroll Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Button 
            variant="outline" 
            size="lg" 
            className="px-8 py-3 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            onClick={handleViewAllCourses}
          >
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
};