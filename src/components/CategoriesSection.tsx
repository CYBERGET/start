import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Palette, 
  TrendingUp, 
  Calculator, 
  Brush, 
  Code, 
  Heart, 
  Camera, 
  BarChart3, 
  Users, 
  Globe 
} from 'lucide-react';

const categories = [
  {
    id: 1,
    name: "Art & Humanities",
    icon: Palette,
    courses: 126,
    color: "from-red-500 to-pink-500"
  },
  {
    id: 2,
    name: "Digital Marketing",
    icon: TrendingUp,
    courses: 89,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 3,
    name: "Finance & Accounting",
    icon: Calculator,
    courses: 67,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    name: "Graphic Design",
    icon: Brush,
    courses: 154,
    color: "from-purple-500 to-indigo-500"
  },
  {
    id: 5,
    name: "IT and Software",
    icon: Code,
    courses: 298,
    color: "from-orange-500 to-red-500"
  },
  {
    id: 6,
    name: "Personal Development",
    icon: Heart,
    courses: 112,
    color: "from-pink-500 to-rose-500"
  },
  {
    id: 7,
    name: "Photography",
    icon: Camera,
    courses: 78,
    color: "from-teal-500 to-cyan-500"
  },
  {
    id: 8,
    name: "Sales Marketing",
    icon: BarChart3,
    courses: 93,
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: 9,
    name: "Social Sciences",
    icon: Users,
    courses: 145,
    color: "from-indigo-500 to-purple-500"
  },
  {
    id: 10,
    name: "Web Development",
    icon: Globe,
    courses: 201,
    color: "from-emerald-500 to-teal-500"
  }
];

export const CategoriesSection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate('/tutor-platform');
  };

  const handleViewAllCategories = () => {
    navigate('/tutor-platform');
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
            Categories
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Browse Top Categories
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore thousands of courses across various categories and find the perfect course for your learning journey
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            
            return (
              <Card 
                key={category.id}
                className="group cursor-pointer hover:shadow-elegant transition-all duration-300 animate-scale-in border-0 shadow-md"
                style={{animationDelay: `${index * 0.1}s`}}
                onClick={() => handleCategoryClick(category.name)}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm">
                    {category.courses} Courses
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* All Categories Button */}
        <div className="text-center mt-12">
          <Card 
            className="inline-block cursor-pointer hover:shadow-elegant transition-all duration-300 bg-primary text-primary-foreground"
            onClick={handleViewAllCategories}
          >
            <CardContent className="p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                <Globe className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-lg mb-2">View All Categories</h3>
              <p className="text-primary-foreground/80 text-sm">
                500+ Categories
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};