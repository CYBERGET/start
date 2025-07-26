import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageSquare, 
  Navigation,
  Clock,
  Star,
  Users,
  DollarSign
} from 'lucide-react';
import { api } from '@/lib/database';
import { useToast } from '@/hooks/use-toast';

interface MapComponentProps {
  category?: string;
  selectedLocation?: string;
  onLocationSelect?: (location: any) => void;
}

export const MapComponent = ({ category, selectedLocation, onLocationSelect }: MapComponentProps) => {
  const [locations, setLocations] = useState<any[]>([]);
  const [tutors, setTutors] = useState<any[]>([]);
  const [selectedTutor, setSelectedTutor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    loadMapData();
  }, [category]);

  const loadMapData = async () => {
    try {
      setLoading(true);
      
      // Load locations
      const locationsData = await api.getLocations();
      setLocations(locationsData);

      // Load tutors with their locations
      const tutorsData = await api.getTutors();
      const tutorsWithLocations = await Promise.all(
        tutorsData.map(async (tutor) => {
          const location = await api.getLocationById(tutor.locationId);
          const user = await api.getUsers({ id: tutor.userId });
          return {
            ...tutor,
            location,
            user: user[0]
          };
        })
      );
      
      setTutors(tutorsWithLocations);
    } catch (error) {
      console.error('Error loading map data:', error);
      toast({
        title: 'Error',
        description: 'Failed to load location data',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTutorSelect = (tutor: any) => {
    setSelectedTutor(tutor);
    if (onLocationSelect) {
      onLocationSelect(tutor.location);
    }
  };

  const handleContactTutor = (tutor: any, method: 'phone' | 'email' | 'message') => {
    const tutorName = tutor.user?.name || 'Tutor';
    
    switch (method) {
      case 'phone':
        toast({
          title: 'Contact Tutor',
          description: `Calling ${tutorName} at ${tutor.user?.phone || 'N/A'}`,
        });
        break;
      case 'email':
        toast({
          title: 'Contact Tutor',
          description: `Opening email to ${tutor.user?.email || 'N/A'}`,
        });
        break;
      case 'message':
        toast({
          title: 'Contact Tutor',
          description: `Opening chat with ${tutorName}`,
        });
        break;
    }
  };

  const handleGetDirections = (location: any) => {
    const { latitude, longitude } = location.coordinates;
    const address = `${location.address}, ${location.city}, ${location.state} ${location.zipCode}`;
    
    // Open Google Maps with directions
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
    
    toast({
      title: 'Directions',
      description: `Opening directions to ${location.address}`,
    });
  };

  if (loading) {
    return (
      <Card className="h-96 flex items-center justify-center">
        <CardContent className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading locations...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Map Visualization */}
      <Card className="h-96 relative overflow-hidden">
        <CardHeader className="absolute top-0 left-0 right-0 z-10 bg-white/90 backdrop-blur-sm">
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" />
            Tutor Locations
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0 h-full">
          {/* Mock Map Visualization */}
          <div className="h-full bg-gradient-to-br from-blue-50 to-indigo-100 relative">
            {/* Map Grid */}
            <div className="absolute inset-0 opacity-20">
              <div className="grid grid-cols-12 grid-rows-8 h-full">
                {Array.from({ length: 96 }).map((_, i) => (
                  <div key={i} className="border border-gray-200"></div>
                ))}
              </div>
            </div>
            
            {/* Location Markers */}
            {tutors.map((tutor, index) => {
              const location = tutor.location;
              if (!location) return null;
              
              // Calculate position based on coordinates (simplified)
              const lat = location.coordinates.latitude;
              const lng = location.coordinates.longitude;
              const left = ((lng + 180) / 360) * 100;
              const top = ((90 - lat) / 180) * 100;
              
              return (
                <div
                  key={tutor.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: `${left}%`, top: `${top}%` }}
                  onClick={() => handleTutorSelect(tutor)}
                >
                  <div className="relative">
                    <div className="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg group-hover:scale-125 transition-transform duration-200"></div>
                    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg px-2 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
                      {tutor.user?.name}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Map Legend */}
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 bg-primary rounded-full"></div>
                <span>Tutor Location</span>
              </div>
              <div className="flex items-center gap-2 text-sm mt-1">
                <div className="w-3 h-3 bg-accent rounded-full"></div>
                <span>Course Location</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Location List */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tutors.map((tutor) => {
          const location = tutor.location;
          const user = tutor.user;
          
          if (!location || !user) return null;
          
          return (
            <Card 
              key={tutor.id}
              className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${
                selectedTutor?.id === tutor.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => handleTutorSelect(tutor)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={user.avatar || 'https://via.placeholder.com/40'} 
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <CardTitle className="text-lg">{user.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{tutor.title}</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    ${tutor.hourlyRate}/hr
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                {/* Rating */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-3 h-3 ${i < Math.floor(tutor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{tutor.rating}</span>
                  <span className="text-xs text-muted-foreground">({tutor.totalReviews})</span>
                </div>
                
                {/* Location */}
                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">{location.address}</p>
                    <p className="text-muted-foreground">{location.city}, {location.state}</p>
                  </div>
                </div>
                
                {/* Availability */}
                <div className="flex items-start gap-2 text-sm">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium">Availability</p>
                    {tutor.availability.slice(0, 2).map((time: string, index: number) => (
                      <p key={index} className="text-muted-foreground text-xs">{time}</p>
                    ))}
                  </div>
                </div>
                
                {/* Subjects */}
                <div className="flex flex-wrap gap-1">
                  {tutor.subjects.slice(0, 3).map((subject: string, index: number) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {subject}
                    </Badge>
                  ))}
                  {tutor.subjects.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{tutor.subjects.length - 3} more
                    </Badge>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGetDirections(location);
                    }}
                    className="flex-1"
                  >
                    <Navigation className="w-3 h-3 mr-1" />
                    Directions
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContactTutor(tutor, 'message');
                    }}
                    className="flex-1"
                  >
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Contact
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Selected Tutor Details */}
      {selectedTutor && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              {selectedTutor.user?.name} - Location Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="font-semibold">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">{selectedTutor.user?.phone || 'Not available'}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">{selectedTutor.user?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium">Students Taught</p>
                      <p className="text-sm text-muted-foreground">{selectedTutor.totalStudents} students</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-medium">Hourly Rate</p>
                      <p className="text-sm text-muted-foreground">${selectedTutor.hourlyRate}/hour</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Location Details */}
              <div className="space-y-4">
                <h3 className="font-semibold">Location Details</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">
                        {selectedTutor.location.address}<br />
                        {selectedTutor.location.city}, {selectedTutor.location.state} {selectedTutor.location.zipCode}<br />
                        {selectedTutor.location.country}
                      </p>
                    </div>
                  </div>
                  {selectedTutor.location.description && (
                    <div>
                      <p className="font-medium">Description</p>
                      <p className="text-sm text-muted-foreground">{selectedTutor.location.description}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button 
                onClick={() => handleContactTutor(selectedTutor, 'phone')}
                className="flex-1"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Tutor
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleContactTutor(selectedTutor, 'email')}
                className="flex-1"
              >
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button 
                variant="outline"
                onClick={() => handleContactTutor(selectedTutor, 'message')}
                className="flex-1"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Send Message
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};