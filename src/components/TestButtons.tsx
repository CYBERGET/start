import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export const TestButtons = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleTestClick = () => {
    console.log('Button clicked!');
    toast({
      title: 'Test Button',
      description: 'This button is working!',
    });
  };

  const handleNavigationTest = () => {
    console.log('Navigation button clicked!');
    navigate('/');
  };

  const handleAlertTest = () => {
    console.log('Alert button clicked!');
    alert('This is a test alert!');
  };

  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold">Button Functionality Test</h2>
      
      <div className="space-y-2">
        <Button onClick={handleTestClick} className="w-full">
          Test Toast Button
        </Button>
        
        <Button onClick={handleNavigationTest} variant="outline" className="w-full">
          Test Navigation Button
        </Button>
        
        <Button onClick={handleAlertTest} variant="secondary" className="w-full">
          Test Alert Button
        </Button>
      </div>
      
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">Instructions:</h3>
        <ul className="text-sm space-y-1">
          <li>• Click "Test Toast Button" - should show a toast notification</li>
          <li>• Click "Test Navigation Button" - should navigate to home page</li>
          <li>• Click "Test Alert Button" - should show a browser alert</li>
          <li>• Check browser console for log messages</li>
        </ul>
      </div>
    </div>
  );
}; 