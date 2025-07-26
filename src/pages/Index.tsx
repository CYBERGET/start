import { Header } from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import { FeaturedCourses } from '@/components/FeaturedCourses';
import { CategoriesSection } from '@/components/CategoriesSection';
import { StatsSection } from '@/components/StatsSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { Footer } from '@/components/Footer';


const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <FeaturedCourses />
      <CategoriesSection />
      <StatsSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
