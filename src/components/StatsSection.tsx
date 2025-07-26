import { Card, CardContent } from '@/components/ui/card';
import { Users, BookOpen, GraduationCap, Award } from 'lucide-react';

const stats = [
  {
    id: 1,
    icon: Users,
    value: "12M+",
    label: "Active Students",
    description: "Learning and growing"
  },
  {
    id: 2,
    icon: BookOpen,
    value: "60K+",
    label: "Total Courses",
    description: "Across all categories"
  },
  {
    id: 3,
    icon: GraduationCap,
    value: "150K+",
    label: "Graduated Students",
    description: "Successfully completed"
  },
  {
    id: 4,
    icon: Award,
    value: "50K+",
    label: "Certified Instructors",
    description: "Industry experts"
  }
];

export const StatsSection = () => {
  return (
    <section className="py-20 bg-hero-gradient relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-accent/20 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
            Trusted by Millions Worldwide
          </h2>
          <p className="text-xl text-primary-foreground/80 max-w-3xl mx-auto">
            Join the world's largest online learning platform and unlock your potential
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <Card 
                key={stat.id}
                className="bg-white/10 backdrop-blur-sm border-white/20 text-center animate-scale-in"
                style={{animationDelay: `${index * 0.2}s`}}
              >
                <CardContent className="p-8">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-accent flex items-center justify-center">
                    <IconComponent className="w-8 h-8 text-accent-foreground" />
                  </div>
                  
                  <h3 className="text-4xl font-bold text-primary-foreground mb-2">
                    {stat.value}
                  </h3>
                  
                  <h4 className="text-xl font-semibold text-primary-foreground mb-2">
                    {stat.label}
                  </h4>
                  
                  <p className="text-primary-foreground/70">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};