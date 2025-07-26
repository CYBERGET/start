import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "UX Designer at Google",
    content: "The courses on Educrat helped me transition from marketing to UX design. The instructors are world-class and the content is always up-to-date.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Full Stack Developer",
    content: "I learned everything I needed to become a developer through Educrat. The practical projects and mentorship made all the difference.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Digital Marketing Manager",
    content: "The digital marketing courses gave me the skills to advance my career. I got promoted within 6 months of completing the program!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 4,
    name: "David Park",
    role: "Data Scientist",
    content: "Outstanding platform with comprehensive courses. The Python for Data Science course was exactly what I needed to break into the field.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            Testimonials
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            What Our Students Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Hear from thousands of students who have transformed their careers with our courses
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.id}
              className="hover:shadow-elegant transition-all duration-300 animate-slide-up border-0 shadow-lg relative"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="absolute -top-3 left-6">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <Quote className="w-4 h-4 text-accent-foreground" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mb-4 pt-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <Card className="inline-block bg-muted/50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Join 12+ Million Happy Students</h3>
              <p className="text-muted-foreground mb-6">Start your learning journey today and see why millions trust Educrat</p>
              <Badge className="bg-accent text-accent-foreground px-6 py-2 text-lg">
                4.8/5 Average Rating ⭐
              </Badge>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};