
import React, { useEffect } from "react";

interface CalendlyEmbedProps {
  url: string;
  className?: string;
}

const CalendlyEmbed: React.FC<CalendlyEmbedProps> = ({ url, className }) => {
  useEffect(() => {
    // Load Calendly script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className={className}>
      <div 
        className="calendly-inline-widget" 
        data-url={url}
        style={{ minWidth: "320px", height: "630px" }}
      />
    </div>
  );
};

export default CalendlyEmbed;
