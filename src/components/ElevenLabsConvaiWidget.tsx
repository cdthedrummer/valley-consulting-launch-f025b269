import React, { useEffect } from "react";

// Allow TSX to recognize the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      "elevenlabs-convai": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { "agent-id": string }, HTMLElement>;
    }
  }
}

interface ElevenLabsConvaiWidgetProps {
  agentId?: string;
}

const SCRIPT_SRC = "https://unpkg.com/@elevenlabs/convai-widget-embed";

const ElevenLabsConvaiWidget: React.FC<ElevenLabsConvaiWidgetProps> = ({ agentId = "agent_5701k2bdw7gyfqdv84383qtbtkf0" }) => {
  useEffect(() => {
    // Inject the script once
    const existing = document.querySelector(`script[src="${SCRIPT_SRC}"]`);
    if (!existing) {
      const script = document.createElement("script");
      script.src = SCRIPT_SRC;
      script.async = true;
      script.type = "text/javascript";
      document.head.appendChild(script);
    }

    // Hide "Powered by ElevenLabs" footer if present
    const hideBranding = () => {
      const candidates = Array.from(document.querySelectorAll("body *")) as HTMLElement[];
      candidates.forEach((el) => {
        if (el.textContent && el.textContent.trim().toLowerCase().includes("powered by elevenlabs")) {
          el.style.display = "none";
        }
      });
    };

    const observer = new MutationObserver(() => hideBranding());
    observer.observe(document.body, { childList: true, subtree: true });
    hideBranding();

    return () => observer.disconnect();
  }, []);

  // Render the widget element; it will attach a floating bubble UI
  return (
    <elevenlabs-convai agent-id={agentId} />
  );
};

export default ElevenLabsConvaiWidget;
