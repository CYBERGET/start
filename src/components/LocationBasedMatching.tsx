import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  MapPin, 
  Users, 
  GraduationCap, 
  Star, 
  Clock, 
  DollarSign,
  Phone,
  Mail,
  MessageSquare,
  Search,
  Filter
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/database';

interface NearbyUser {
  id: string;
  name: string;
  role: 'student' | 'tutor';
  avatar?: string;
  city: string;
  state: string;
  distance: number;
  rating?: number;
  subjects?: string[];
  hourlyRate?: number;
  experience?: string;
  bio?: string;
  phone?: string;
  email?: string;
}

export const LocationBasedMatching = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [nearbyUsers, setNearbyUsers] = useState<NearbyUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [distanceFilter, setDistanceFilter] = useState(50); // miles
  const [subjectFilter, setSubjectFilter] = useState('all');

  useEffect(() => {
    if (user) {
      fetchNearbyUsers();
    }
  }, [user]);

  const fetchNearbyUsers = async () => {
    setLoading(true);
    try {
      if (user?.role === 'student') {
        // Students see nearby tutors
        const tutors = await api.getTutors();
        const tutorUsers = await Promise.all(
          tutors.map(async (tutor) => {
            const tutorUser = await api.getUsers({ id: tutor.userId });
            const location = await api.getLocationById(tutor.locationId);
            
            if (tutorUser[0] && location) {
              const distance = calculateDistance(
                user.city || 'New York',
                user.state || 'NY',
                location.city,
                location.state
              );

              return {
                id: tutor.id,
                name: tutorUser[0].name,
                role: 'tutor' as const,
                avatar: tutorUser[0].avatar,
                city: location.city,
                state: location.state,
                distance,
                rating: tutor.rating,
                subjects: tutor.subjects,
                hourlyRate: tutor.hourlyRate,
                experience: tutor.experience,
                bio: tutor.bio,
                phone: tutorUser[0].phone,
                email: tutorUser[0].email
              };
            }
            return null;
          })
        );

        const validTutors = tutorUsers.filter(tutor => tutor !== null) as NearbyUser[];
        setNearbyUsers(validTutors);
      } else if (user?.role === 'tutor') {
        // Tutors see nearby students
        const students = await api.getUsers({ role: 'student' });
        
        const studentUsers = students.map(student => {
          const distance = calculateDistance(
            user.city || 'New York',
            user.state || 'NY',
            student.city || 'New York',
            student.state || 'NY'
          );

          return {
            id: student.id,
            name: student.name,
            role: 'student' as const,
            avatar: student.avatar,
            city: student.city || 'Unknown',
            state: student.state || 'Unknown',
            distance,
            subjects: student.preferences?.subjects || [],
            phone: student.phone,
            email: student.email
          };
        });

        setNearbyUsers(studentUsers);
      }
    } catch (error) {
      console.error('Error fetching nearby users:', error);
      toast({
        title: 'Error',
        description: 'Failed to load nearby users.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  // Simple distance calculation (in real app, use proper geocoding)
  const calculateDistance = (city1: string, state1: string, city2: string, state2: string): number => {
    // Mock distance calculation - in real app, use actual coordinates
    if (city1 === city2 && state1 === state2) return 0;
    if (state1 === state2) return Math.random() * 20 + 5; // 5-25 miles
    return Math.random() * 100 + 25; // 25-125 miles
  };

  const filteredUsers = nearbyUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistance = user.distance <= distanceFilter;
    const matchesSubject = subjectFilter === 'all' || 
                          (user.subjects && user.subjects.includes(subjectFilter));
    
    return matchesSearch && matchesDistance && matchesSubject;
  });

  const handleContact = (contactUser: NearbyUser, method: 'phone' | 'email' | 'message') => {
    const action = method === 'phone' ? 'call' : method === 'email' ? 'email' : 'message';
    
    toast({
      title: 'Contact',
      description: `You can ${action} ${contactUser.name} through the platform.`,
    });
  };

  const getRoleIcon = (role: string) => {
    return role === 'tutor' ? <GraduationCap className="w-4 h-4" /> : <Users className="w-4 h-4" />;
  };

  const getRoleBadgeColor = (role: string) => {
    return role === 'tutor' ? 'bg-blue-500' : 'bg-green-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Finding nearby {user?.role === 'student' ? 'tutors' : 'students'}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">
          Nearby {user?.role === 'student' ? 'Tutors' : 'Students'}
        </h2>
        <p className="text-muted-foreground">
          {user?.role === 'student' 
            ? 'Find qualified tutors in your area' 
            : 'Connect with students looking for help'
          }
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder={`Search ${user?.role === 'student' ? 'tutors' : 'students'}...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <Input
                type="number"
                placeholder="Distance (miles)"
                value={distanceFilter}
                onChange={(e) => setDistanceFilter(Number(e.target.value))}
                min="1"
                max="500"
              />
            </div>
            {user?.role === 'student' && (
              <div className="w-full md:w-48">
                <select
                  value={subjectFilter}
                  onChange={(e) => setSubjectFilter(e.target.value)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background"
                >
                  <option value="all">All Subjects</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science">Science</option>
                  <option value="English">English</option>
                  <option value="History">History</option>
                  <option value="Computer Science">Computer Science</option>
                </select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map((nearbyUser) => (
          <Card key={nearbyUser.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={nearbyUser.avatar || 'https://via.placeholder.com/48'}
                    alt={nearbyUser.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{nearbyUser.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getRoleBadgeColor(nearbyUser.role)}>
                        {getRoleIcon(nearbyUser.role)}
                        <span className="ml-1">{nearbyUser.role}</span>
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <span>{nearbyUser.city}, {nearbyUser.state}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-primary">
                    {nearbyUser.distance.toFixed(1)} miles
                  </p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Rating for tutors */}
              {nearbyUser.role === 'tutor' && nearbyUser.rating && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(nearbyUser.rating!) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{nearbyUser.rating}</span>
                </div>
              )}

              {/* Subjects */}
              {nearbyUser.subjects && nearbyUser.subjects.length > 0 && (
                <div>
                  <p className="text-sm font-medium mb-2">Subjects:</p>
                  <div className="flex flex-wrap gap-1">
                    {nearbyUser.subjects.slice(0, 3).map((subject, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                    {nearbyUser.subjects.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{nearbyUser.subjects.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              {/* Bio for tutors */}
              {nearbyUser.role === 'tutor' && nearbyUser.bio && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {nearbyUser.bio}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                {nearbyUser.role === 'tutor' && (
                  <>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{nearbyUser.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      <span>${nearbyUser.hourlyRate}/hr</span>
                    </div>
                  </>
                )}
                {nearbyUser.role === 'student' && (
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>Looking for help</span>
                  </div>
                )}
              </div>

              {/* Contact Actions */}
              <div className="flex gap-2 pt-2 border-t">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => handleContact(nearbyUser, 'phone')}
                >
                  <Phone className="w-4 h-4 mr-1" />
                  Call
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleContact(nearbyUser, 'email')}
                >
                  <Mail className="w-4 h-4 mr-1" />
                  Email
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleContact(nearbyUser, 'message')}
                >
                  <MessageSquare className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No {user?.role === 'student' ? 'tutors' : 'students'} found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria or increasing the distance range.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}; 