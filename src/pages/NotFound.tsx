import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-club-green">
      <div className="text-center">
        <h1 className="font-archivo text-6xl uppercase tracking-wide text-action-yellow mb-4">OUT OF BOUNDS</h1>
        <p className="text-xl text-warm-cream/80 mb-8">This page doesn't exist.</p>
        <Link 
          to="/" 
          className="inline-block bg-action-yellow text-club-green font-dm font-bold uppercase tracking-wide px-8 py-4 rounded-full hover:-translate-y-1 transition-transform"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
