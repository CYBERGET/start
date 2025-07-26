import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin 
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: 'Subscription Error',
        description: 'Please enter a valid email address.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubscribing(true);
    
    // Mock subscription
    setTimeout(() => {
      toast({
        title: 'Subscription Successful',
        description: 'Thank you for subscribing to our newsletter!',
      });
      setEmail('');
      setIsSubscribing(false);
    }, 1000);
  };

  const handleSocialClick = (platform: string) => {
    toast({
      title: 'Social Media',
      description: `Redirecting to ${platform}...`,
    });
    // In a real app, this would open the social media profile
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="bg-hero-gradient py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-3xl font-bold mb-4">Stay Updated with Latest Courses</h3>
            <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter and be the first to know about new courses, special offers, and learning tips
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input 
                type="email" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60"
                required
              />
              <Button 
                type="submit" 
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={isSubscribing}
              >
                {isSubscribing ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-accent-foreground font-bold text-lg">E</span>
                </div>
                <span className="font-bold text-xl">Educrat</span>
              </div>
              <p className="text-primary-foreground/80 leading-relaxed">
                Transform your career with world-class online courses from top universities and industry experts.
              </p>
              <div className="flex space-x-4">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="hover:bg-white/10"
                  onClick={() => handleSocialClick('Facebook')}
                >
                  <Facebook className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="hover:bg-white/10"
                  onClick={() => handleSocialClick('Twitter')}
                >
                  <Twitter className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="hover:bg-white/10"
                  onClick={() => handleSocialClick('Instagram')}
                >
                  <Instagram className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="hover:bg-white/10"
                  onClick={() => handleSocialClick('LinkedIn')}
                >
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="hover:bg-white/10"
                  onClick={() => handleSocialClick('YouTube')}
                >
                  <Youtube className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">About Us</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Courses</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Instructors</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Events</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Blog</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Career</a></li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-bold text-lg mb-6">Categories</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Web Development</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Digital Marketing</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Graphic Design</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Data Science</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Photography</a></li>
                <li><a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Business</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-bold text-lg mb-6">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-accent" />
                  <span className="text-primary-foreground/80">123 Education Street, Learning City, LC 12345</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-accent" />
                  <span className="text-primary-foreground/80">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-accent" />
                  <span className="text-primary-foreground/80">info@educrat.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-white/10" />

      {/* Bottom Footer */}
      <div className="py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/80 text-sm">
              © 2024 Educrat. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Privacy Policy</a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Terms of Service</a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};