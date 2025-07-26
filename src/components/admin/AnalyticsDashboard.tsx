import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  BookOpen, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Star,
  Clock,
  MapPin,
  BarChart3,
  PieChart,
  Activity,
  Target
} from 'lucide-react';
import { api } from '@/lib/database';

interface AnalyticsData {
  totalUsers: number;
  totalCourses: number;
  totalRevenue: number;
  averageRating: number;
  totalEnrollments: number;
  activeTutors: number;
  monthlyGrowth: number;
  topCategories: Array<{ name: string; count: number }>;
  recentActivity: Array<{ type: string; description: string; timestamp: Date }>;
  revenueByMonth: Array<{ month: string; revenue: number }>;
}

export const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const [users, courses, categories, tutors] = await Promise.all([
        api.getUsers(),
        api.getCourses(),
        api.getCategories(),
        api.getTutors()
      ]);

      // Calculate analytics
      const totalRevenue = courses.reduce((sum, course) => sum + (course.price * course.currentStudents), 0);
      const averageRating = courses.length > 0 ? (courses.reduce((sum, course) => sum + course.rating, 0) / courses.length) : 0;
      const totalEnrollments = courses.reduce((sum, course) => sum + course.currentStudents, 0);
      const activeTutors = tutors.length;

      // Calculate top categories
      const categoryCounts = courses.reduce((acc, course) => {
        const category = categories.find(c => c.id === course.categoryId);
        if (category) {
          acc[category.name] = (acc[category.name] || 0) + 1;
        }
        return acc;
      }, {} as Record<string, number>);

      const topCategories = Object.entries(categoryCounts)
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5);

      // Mock recent activity
      const recentActivity = [
        { type: 'enrollment', description: 'New student enrolled in React Course', timestamp: new Date() },
        { type: 'course', description: 'New course "Advanced JavaScript" added', timestamp: new Date(Date.now() - 3600000) },
        { type: 'user', description: 'New tutor "Sarah Johnson" joined', timestamp: new Date(Date.now() - 7200000) },
        { type: 'revenue', description: 'Monthly revenue target achieved', timestamp: new Date(Date.now() - 86400000) }
      ];

      // Mock revenue by month
      const revenueByMonth = [
        { month: 'Jan', revenue: 12500 },
        { month: 'Feb', revenue: 15800 },
        { month: 'Mar', revenue: 14200 },
        { month: 'Apr', revenue: 18900 },
        { month: 'May', revenue: 22100 },
        { month: 'Jun', revenue: 19800 }
      ];

      const analyticsData: AnalyticsData = {
        totalUsers: users.length,
        totalCourses: courses.length,
        totalRevenue,
        averageRating,
        totalEnrollments,
        activeTutors,
        monthlyGrowth: 12.5, // Mock growth percentage
        topCategories,
        recentActivity,
        revenueByMonth
      };

      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No analytics data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <p className="text-muted-foreground">Platform performance and insights</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{analytics.totalUsers.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">+{analytics.monthlyGrowth}%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Courses</p>
                <p className="text-2xl font-bold">{analytics.totalCourses}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">+8.2%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Revenue</p>
                <p className="text-2xl font-bold">${analytics.totalRevenue.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-500">+15.3%</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Rating</p>
                <p className="text-2xl font-bold">{analytics.averageRating.toFixed(1)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">out of 5</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-end justify-between gap-2">
              {analytics.revenueByMonth.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div 
                    className="bg-primary rounded-t w-8 transition-all duration-300 hover:bg-primary/80"
                    style={{ 
                      height: `${(item.revenue / Math.max(...analytics.revenueByMonth.map(r => r.revenue))) * 200}px` 
                    }}
                  ></div>
                  <span className="text-xs text-muted-foreground">{item.month}</span>
                  <span className="text-xs font-medium">${(item.revenue / 1000).toFixed(1)}k</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Top Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics.topCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-yellow-500' :
                      index === 3 ? 'bg-purple-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="text-sm font-medium">{category.name}</span>
                  </div>
                  <Badge variant="secondary">{category.count}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              User Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Enrollments</span>
              <span className="font-semibold">{analytics.totalEnrollments}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Tutors</span>
              <span className="font-semibold">{analytics.activeTutors}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Avg Course Duration</span>
              <span className="font-semibold">12.5 hours</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="w-5 h-5" />
              Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Completion Rate</span>
              <span className="font-semibold text-green-600">87%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Satisfaction Score</span>
              <span className="font-semibold text-blue-600">4.6/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Response Time</span>
              <span className="font-semibold">2.3 hours</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Goals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Monthly Revenue</span>
                <span className="text-sm font-medium">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">User Growth</span>
                <span className="text-sm font-medium">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">Course Quality</span>
                <span className="text-sm font-medium">90%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg border">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === 'enrollment' ? 'bg-green-100' :
                  activity.type === 'course' ? 'bg-blue-100' :
                  activity.type === 'user' ? 'bg-purple-100' : 'bg-yellow-100'
                }`}>
                  {activity.type === 'enrollment' && <Users className="w-4 h-4 text-green-600" />}
                  {activity.type === 'course' && <BookOpen className="w-4 h-4 text-blue-600" />}
                  {activity.type === 'user' && <Users className="w-4 h-4 text-purple-600" />}
                  {activity.type === 'revenue' && <DollarSign className="w-4 h-4 text-yellow-600" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.timestamp.toLocaleString()}
                  </p>
                </div>
                <Badge variant="outline" className="capitalize">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}; 