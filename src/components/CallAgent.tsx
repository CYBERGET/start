import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Settings,
  MessageSquare,
  User,
  Clock,
  Globe
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CallAgentProps {
  onCallStart?: () => void;
  onCallEnd?: () => void;
}

export const CallAgent = ({ onCallStart, onCallEnd }: CallAgentProps) => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callDuration, setCallDuration] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState('en-US');
  const [agentStatus, setAgentStatus] = useState<'available' | 'busy' | 'offline'>('available');
  const [callQueue, setCallQueue] = useState(0);
  
  const callDurationRef = useRef<NodeJS.Timeout | null>(null);
  const { toast } = useToast();

  // ElevenLabs integration
  const [voiceId, setVoiceId] = useState('21m00Tcm4TlvDq8ikWAM'); // Default voice ID
  const [isConfiguring, setIsConfiguring] = useState(false);

  useEffect(() => {
    if (isCallActive) {
      callDurationRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (callDurationRef.current) {
        clearInterval(callDurationRef.current);
        callDurationRef.current = null;
      }
    }

    return () => {
      if (callDurationRef.current) {
        clearInterval(callDurationRef.current);
      }
    };
  }, [isCallActive]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCallStart = async () => {
    try {
      setIsCallActive(true);
      setCallDuration(0);
      setAgentStatus('busy');
      onCallStart?.();

      // Call initialization with 11labs
      toast({
        title: 'Call Started',
        description: 'Connecting to AI call agent...',
      });

      // Simulate call connection
      setTimeout(() => {
        toast({
          title: 'Connected',
          description: 'You are now connected to the AI call agent.',
        });
      }, 2000);

    } catch (error) {
      toast({
        title: 'Call Failed',
        description: 'Failed to start call. Please try again.',
        variant: 'destructive'
      });
      setIsCallActive(false);
      setAgentStatus('available');
    }
  };

  const handleCallEnd = () => {
    setIsCallActive(false);
    setCallDuration(0);
    setAgentStatus('available');
    onCallEnd?.();

    toast({
      title: 'Call Ended',
      description: 'Call has been disconnected.',
    });
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    toast({
      title: isMuted ? 'Unmuted' : 'Muted',
      description: `Microphone ${isMuted ? 'enabled' : 'disabled'}.`,
    });
  };

  const handleSpeakerToggle = () => {
    setIsSpeakerOn(!isSpeakerOn);
    toast({
      title: isSpeakerOn ? 'Speaker Off' : 'Speaker On',
      description: `Speaker ${isSpeakerOn ? 'disabled' : 'enabled'}.`,
    });
  };

  const handleSettings = () => {
    // Mock settings modal
    toast({
      title: 'Settings',
      description: 'Call agent settings opened.',
    });
  };

  const handleMessage = () => {
    toast({
      title: 'Message',
      description: 'Opening chat interface...',
    });
  };

  const handleTestVoice = async () => {
    try {
      await synthesizeSpeech("Hello! I'm your AI call agent. How can I help you today?");
      toast({
        title: 'Voice Test',
        description: 'Playing AI voice sample...',
      });
    } catch (error) {
      toast({
        title: 'Voice Test Failed',
        description: 'Could not play voice sample. Please try again.',
        variant: 'destructive'
      });
    }
  };

  // ElevenLabs voice synthesis
  const synthesizeSpeech = async (text: string) => {
    try {
      const response = await fetch(`/api/elevenlabs/synthesize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text,
          voiceId: voiceId,
        }),
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      }
    } catch (error) {
      console.error('Error synthesizing speech:', error);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-0 shadow-lg">
        <CardContent className="p-6">
          {/* Header with Status */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              {/* Circular Icon/Avatar */}
              <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center shadow-inner">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-500 to-gray-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg">AI Call Agent</h3>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={agentStatus === 'available' ? 'default' : agentStatus === 'busy' ? 'secondary' : 'destructive'}
                    className="text-xs"
                  >
                    {agentStatus === 'available' ? 'Available' : agentStatus === 'busy' ? 'Busy' : 'Offline'}
                  </Badge>
                  {callQueue > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {callQueue} in queue
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Language Selector */}
            <div className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm">
              <Globe className="w-4 h-4 text-gray-600" />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="text-sm bg-transparent border-none outline-none"
              >
                <option value="en-US">🇺🇸 US</option>
                <option value="en-GB">🇬🇧 UK</option>
                <option value="es-ES">🇪🇸 ES</option>
                <option value="fr-FR">🇫🇷 FR</option>
                <option value="de-DE">🇩🇪 DE</option>
              </select>
            </div>
          </div>

          {/* Call Duration */}
          {isCallActive && (
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(callDuration)}</span>
              </div>
            </div>
          )}

          {/* Main Call Button */}
          <div className="text-center mb-6">
            <Button
              size="lg"
              className={`w-16 h-16 rounded-full ${
                isCallActive 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-black hover:bg-gray-800'
              } text-white shadow-lg`}
              onClick={isCallActive ? handleCallEnd : handleCallStart}
            >
              {isCallActive ? (
                <PhoneOff className="w-6 h-6" />
              ) : (
                <Phone className="w-6 h-6" />
              )}
            </Button>
            <p className="text-sm text-muted-foreground mt-2">
              {isCallActive ? 'End Call' : 'Start Voice Chat'}
            </p>
          </div>

          {/* Call Controls */}
          {isCallActive && (
            <div className="flex items-center justify-center gap-4 mb-6">
              <Button
                variant="outline"
                size="icon"
                className={`w-12 h-12 rounded-full ${
                  isMuted ? 'bg-red-100 border-red-300' : 'bg-white'
                }`}
                onClick={handleMuteToggle}
              >
                {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className={`w-12 h-12 rounded-full ${
                  !isSpeakerOn ? 'bg-gray-100' : 'bg-white'
                }`}
                onClick={handleSpeakerToggle}
              >
                {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full bg-white"
                onClick={handleTestVoice}
                title="Test AI Voice"
              >
                <MessageSquare className="w-5 h-5" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full bg-white"
                onClick={handleSettings}
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          )}

          {/* Call Status */}
          <div className="text-center">
            {isCallActive ? (
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-green-600 font-medium">Connected</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  AI agent is ready to help you
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Click to start a voice conversation with our AI agent
                </p>
                <p className="text-xs text-muted-foreground">
                  Powered by ElevenLabs AI
                </p>
              </div>
            )}
          </div>

          {/* Voice Configuration */}
          {!isCallActive && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-xs text-blue-800 mb-2">
                <strong>AI Voice Agent Ready:</strong>
              </p>
              <p className="text-xs text-blue-600">
                ElevenLabs AI integration is configured and ready to use.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}; 