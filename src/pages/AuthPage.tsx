import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  GraduationCap,
  MapPin,
  Phone
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/database';

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student' as 'student' | 'tutor',
    phone: '',
    city: '',
    state: '',
    country: 'USA'
  });
  
  const { login, signup } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        // Login logic
        await login(formData.email, formData.password);
        toast({
          title: 'Welcome back!',
          description: 'You have been successfully logged in.',
        });
        navigate('/');
      } else {
        // Signup logic
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: 'Password mismatch',
            description: 'Passwords do not match.',
            variant: 'destructive',
          });
          return;
        }

        // Create user with role
        const userData = {
          name: formData.name,
          email: formData.email,
          role: formData.role,
          phone: formData.phone,
          city: formData.city,
          state: formData.state,
          country: formData.country,
          preferences: {
            subjects: [],
            learningStyle: 'visual',
            availability: []
          }
        };

        const newUser = await api.createUser(userData);

        // If user is a tutor, create tutor profile
        if (formData.role === 'tutor') {
          // Find or create a location for the tutor
          const locations = await api.getLocations();
          let locationId = locations[0]?.id || '1'; // Default to first location

          // Create tutor profile
          await api.createTutor({
            userId: newUser.id,
            title: `${formData.name} - Professional Tutor`,
            experience: '2+ years',
            bio: `Experienced tutor specializing in various subjects. Based in ${formData.city}, ${formData.state}.`,
            subjects: ['Mathematics', 'Science', 'English'],
            hourlyRate: 25,
            availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            education: ['Bachelor\'s Degree'],
            certifications: ['Teaching Certification'],
            languages: ['English'],
            teachingStyle: 'Interactive and engaging',
            specializations: ['Test Preparation', 'Homework Help'],
            rating: 4.5,
            totalStudents: 0,
            totalReviews: 0,
            status: 'active',
            locationId: locationId
          });
        }

        // Auto-login after signup
        await login(formData.email, formData.password);
        
        toast({
          title: 'Account created!',
          description: `Welcome to EduBloom Studio as a ${formData.role}!`,
        });
        
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-animated-gradient flex items-center justify-center p-4">
      <Card className="w-full max-w-md animate-fade-in-up shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {isLogin ? 'Welcome Back' : 'Join EduBloom Studio'}
          </CardTitle>
          <p className="text-muted-foreground">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="pl-10 auth-input"
                      required={!isLogin}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="role">I am a</Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value: 'student' | 'tutor') => handleInputChange('role', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="student">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Student
                        </div>
                      </SelectItem>
                      <SelectItem value="tutor">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4" />
                          Tutor
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="pl-10 auth-input"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      type="text"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="auth-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input
                      id="state"
                      type="text"
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="auth-input"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="pl-10 auth-input"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  className="pl-10 pr-10 auth-input"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    className="pl-10 pr-10 auth-input"
                    required={!isLogin}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            <Button type="submit" className="w-full transition-all duration-200 hover:scale-[1.03] active:scale-95" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  {isLogin ? 'Signing in...' : 'Creating account...'}
                </div>
              ) : (
                isLogin ? 'Sign In' : 'Create Account'
              )}
            </Button>
          </form>

          <Separator className="my-6" />

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>
            <Button
              variant="link"
              onClick={() => setIsLogin(!isLogin)}
              className="p-0 h-auto"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </Button>
          </div>

          {!isLogin && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> {formData.role === 'tutor' ? 
                  'As a tutor, you\'ll be able to create courses and help students learn.' :
                  'As a student, you\'ll be able to find tutors and enroll in courses.'
                }
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};