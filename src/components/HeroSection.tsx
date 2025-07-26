import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Users, BookOpen, GraduationCap } from 'lucide-react';
import educator1 from '@/assets/educator-1.jpg';
import educator2 from '@/assets/educator-2.jpg';
import educator3 from '@/assets/educator-3.jpg';

export const HeroSection = () => {
  const navigate = useNavigate();

  const handleFindTutor = () => {
    navigate('/tutor-platform');
  };

  const handleJoinFree = () => {
    navigate('/auth');
  };

  return (
    <section className="bg-hero-gradient min-h-[80vh] relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-accent/20 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full animate-float" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-40 left-1/4 w-12 h-12 bg-accent/30 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
        <div className="absolute top-60 right-1/3 w-8 h-8 bg-white/20 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <h1 className="text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
              Learn New Skills Online{' '}
              <span className="text-accent relative">
                With Top
                <span className="block">Educators</span>
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-accent rounded-full"></div>
              </span>
            </h1>
            
            <p className="text-xl text-primary-foreground/80 max-w-lg">
              Build skills with courses, certificates, and degrees online from 
              world-class universities and companies.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6 rounded-xl shadow-glow"
                onClick={handleFindTutor}
              >
                Find a Tutor
              </Button>
              <Button 
                variant="outline" 
                className="border-white/30 text-primary-foreground hover:bg-white/10 text-lg px-8 py-6 rounded-xl"
                onClick={handleJoinFree}
              >
                Join For Free
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-primary-foreground font-semibold">Over 12 million students</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-primary-foreground font-semibold">More than 60,000 courses</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-primary-foreground font-semibold">Learn anything online</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className="relative animate-scale-in">
            {/* Main instructor card */}
            <Card className="absolute top-0 right-0 p-4 bg-white/95 backdrop-blur-sm shadow-elegant animate-float z-10">
              <div className="flex items-center gap-3">
                <img 
                  src={educator1} 
                  alt="Ali Tufan" 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-sm">Ali Tufan</h4>
                  <p className="text-xs text-muted-foreground">UX/UI Designer</p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Course stats card */}
            <Card className="absolute bottom-20 left-0 p-4 bg-white/95 backdrop-blur-sm shadow-elegant animate-float z-10" style={{animationDelay: '1s'}}>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-accent">3,000 +</p>
                  <p className="text-sm text-muted-foreground">Free Courses</p>
                </div>
              </div>
            </Card>

            {/* Background educator images */}
            <div className="relative">
              <div className="absolute top-20 left-20 w-40 h-48 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl overflow-hidden animate-float" style={{animationDelay: '2s'}}>
                <img 
                  src={educator2} 
                  alt="Educator" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="absolute bottom-0 right-20 w-40 h-48 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl overflow-hidden animate-float" style={{animationDelay: '3s'}}>
                <img 
                  src={educator3} 
                  alt="Educator" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};