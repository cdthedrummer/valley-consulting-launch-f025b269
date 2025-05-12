
import React, { useEffect, useRef } from "react";

interface CalendlyEmbedProps {
  url: string;
  className?: string;
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ url, className }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    // Initialize Calendly after script loads
    script.onload = () => {
      if (containerRef.current && window.Calendly) {
        // Clear any existing content
        containerRef.current.innerHTML = '';
        
        // Force re-initialization
        window.Calendly.initInlineWidget({
          url,
          parentElement: containerRef.current,
          prefill: {},
          utm: {}
        });
      }
    };

    return () => {
      // Cleanup
      if (script.parentNode) {
        document.body.removeChild(script);
      }
    };
  }, [url]);

  return (
    <div className={className}>
      <div 
        ref={containerRef}
        className="calendly-inline-widget" 
        data-url={url}
        style={{ minWidth: "320px", height: "700px" }}
      />
    </div>
  );
};

// Add this declaration to make TypeScript happy
declare global {
  interface Window {
    Calendly: any;
  }
}

export default CalendlyEmbed;
