import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Users, 
  BookOpen, 
  MapPin, 
  Settings, 
  BarChart3, 
  MessageSquare,
  LogOut,
  LayoutDashboard,
  Plus,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { UserManagement } from '@/components/admin/UserManagement';
import { CourseManagement } from '@/components/admin/CourseManagement';
import { AnalyticsDashboard } from '@/components/admin/AnalyticsDashboard';
import { PlatformSettings } from '@/components/admin/PlatformSettings';
import { SupportCenter } from '@/components/admin/SupportCenter';

type AdminSection = 'dashboard' | 'users' | 'courses' | 'locations' | 'settings' | 'analytics' | 'support';

export const AdminPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<AdminSection>('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCourses: 0,
    totalRevenue: 0,
    activeTickets: 0
  });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/auth');
      return;
    }

    // Fetch initial stats
    fetchStats();
  }, [user, navigate]);

  const fetchStats = async () => {
    try {
      // Mock stats - in real app, these would come from API
      setStats({
        totalUsers: 1250,
        totalCourses: 89,
        totalRevenue: 45600,
        activeTickets: 12
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
    navigate('/');
  };

  const handleSectionChange = (section: AdminSection) => {
    setActiveSection(section);
    toast({
      title: 'Section Changed',
      description: `Switched to ${section} section.`,
    });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <AnalyticsDashboard />;
      case 'users':
        return <UserManagement />;
      case 'courses':
        return <CourseManagement />;
      case 'locations':
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Location Management</h2>
              <p className="text-muted-foreground">Manage tutor locations and service areas</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Location Management</h3>
                  <p className="text-muted-foreground mb-4">
                    Manage tutor locations, service areas, and geographical settings.
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Location
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      case 'settings':
        return <PlatformSettings />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'support':
        return <SupportCenter />;
      default:
        return <AnalyticsDashboard />;
    }
  };

  const getSectionIcon = (section: AdminSection) => {
    switch (section) {
      case 'dashboard': return <LayoutDashboard className="w-5 h-5" />;
      case 'users': return <Users className="w-5 h-5" />;
      case 'courses': return <BookOpen className="w-5 h-5" />;
      case 'locations': return <MapPin className="w-5 h-5" />;
      case 'settings': return <Settings className="w-5 h-5" />;
      case 'analytics': return <BarChart3 className="w-5 h-5" />;
      case 'support': return <MessageSquare className="w-5 h-5" />;
      default: return <LayoutDashboard className="w-5 h-5" />;
    }
  };

  const getSectionTitle = (section: AdminSection) => {
    switch (section) {
      case 'dashboard': return 'Dashboard';
      case 'users': return 'User Management';
      case 'courses': return 'Course Management';
      case 'locations': return 'Location Management';
      case 'settings': return 'Platform Settings';
      case 'analytics': return 'Analytics';
      case 'support': return 'Support Center';
      default: return 'Dashboard';
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-4">You don't have permission to access this page.</p>
          <Button onClick={() => navigate('/')}>Go Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold">Admin Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, {user.name}</p>
              </div>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {(['dashboard', 'users', 'courses', 'locations', 'analytics', 'support', 'settings'] as AdminSection[]).map((section) => (
                  <Button
                    key={section}
                    variant={activeSection === section ? 'default' : 'ghost'}
                    className="w-full justify-start"
                    onClick={() => handleSectionChange(section)}
                  >
                    {getSectionIcon(section)}
                    <span className="ml-2">{getSectionTitle(section)}</span>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            {activeSection === 'dashboard' && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Users</span>
                    <span className="font-semibold">{stats.totalUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Courses</span>
                    <span className="font-semibold">{stats.totalCourses}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Total Revenue</span>
                    <span className="font-semibold">${stats.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active Tickets</span>
                    <span className="font-semibold">{stats.activeTickets}</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderSection()}
          </div>
        </div>
      </div>
    </div>
  );
};