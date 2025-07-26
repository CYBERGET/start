import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export const ElevenLabsWidget = () => {
  const location = useLocation();
  const widgetRef = useRef<HTMLDivElement>(null);

  // Don't show on admin page
  if (location.pathname === '/admin') {
    return null;
  }

  useEffect(() => {
    // Ensure the widget script is loaded
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    
    if (!document.querySelector('script[src*="elevenlabs/convai-widget-embed"]')) {
      document.head.appendChild(script);
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return (
    <div 
      ref={widgetRef}
      className="fixed bottom-4 right-4 z-50"
      dangerouslySetInnerHTML={{ 
        __html: '<elevenlabs-convai agent-id="agent_6101k12yr8qyeyns6q59g62e38xz"></elevenlabs-convai>' 
      }}
    />
  );
}; 