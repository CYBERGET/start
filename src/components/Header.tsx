import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, Search, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const categories = [
  'Art & Humanities',
  'Digital Marketing', 
  'Finance & Accounting',
  'Graphic Design',
  'IT and Software',
  'Personal Development',
  'Photography',
  'Sales Marketing',
  'Social Sciences',
  'Web Development'
];

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/auth');
  };

  const handleProfileClick = () => {
    if (user?.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/tutor-platform');
    }
  };

  return (
    <header className="bg-hero-gradient shadow-elegant relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
              <span className="text-accent-foreground font-bold text-lg">E</span>
            </div>
            <span className="text-primary-foreground font-bold text-xl">Educrat</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-primary-foreground bg-transparent hover:bg-white/10">
                    <Menu className="w-4 h-4 mr-2" />
                    Explore
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-2 gap-4 p-6 w-96">
                      {categories.map((category) => (
                        <NavigationMenuLink
                          key={category}
                          className="block p-3 rounded-lg hover:bg-accent/10 transition-colors cursor-pointer"
                          onClick={() => navigate('/tutor-platform')}
                        >
                          {category}
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-primary-foreground hover:text-accent transition-colors">Home</Link>
              <Link to="/courses" className="text-primary-foreground hover:text-accent transition-colors">Courses</Link>
              <Link to="/tutor-platform" className="text-primary-foreground hover:text-accent transition-colors">Tutors</Link>
              <Link to="/nearby" className="text-primary-foreground hover:text-accent transition-colors">Nearby</Link>
              <a href="#" className="text-primary-foreground hover:text-accent transition-colors">Blog</a>
              <a href="#" className="text-primary-foreground hover:text-accent transition-colors">Contact</a>
            </nav>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10">
              <Search className="w-5 h-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 relative">
              <ShoppingCart className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
                0
              </Badge>
            </Button>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                <Button 
                  className="bg-white text-primary hover:bg-white/90 hidden sm:flex"
                  onClick={handleProfileClick}
                >
                  <User className="w-4 h-4 mr-2" />
                  {user?.name}
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-primary-foreground hover:bg-white/10"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button 
                className="bg-white text-primary hover:bg-white/90 hidden sm:flex"
                onClick={handleLoginClick}
              >
                Log in
              </Button>
            )}
            
            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="lg:hidden text-primary-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-primary-foreground hover:text-accent transition-colors">Home</Link>
              <Link to="/courses" className="text-primary-foreground hover:text-accent transition-colors">Courses</Link>
              <Link to="/tutor-platform" className="text-primary-foreground hover:text-accent transition-colors">Tutors</Link>
              <Link to="/test" className="text-primary-foreground hover:text-accent transition-colors">Test Buttons</Link>
              <a href="#" className="text-primary-foreground hover:text-accent transition-colors">Blog</a>
              <a href="#" className="text-primary-foreground hover:text-accent transition-colors">Shop</a>
              <a href="#" className="text-primary-foreground hover:text-accent transition-colors">Pages</a>
              <a href="#" className="text-primary-foreground hover:text-accent transition-colors">Contact</a>
              
              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <Button 
                    className="bg-white text-primary hover:bg-white/90 w-fit"
                    onClick={handleProfileClick}
                  >
                    <User className="w-4 h-4 mr-2" />
                    {user?.name}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white/30 text-primary-foreground hover:bg-white/10 w-fit"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                </div>
              ) : (
                <Button 
                  className="bg-white text-primary hover:bg-white/90 w-fit"
                  onClick={handleLoginClick}
                >
                  Log in
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};