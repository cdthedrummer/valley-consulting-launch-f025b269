import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from './skeleton';

interface MapboxMapProps {
  center: [number, number];
  zoom?: number;
  markers?: Array<{
    location: [number, number];
    color?: string;
    popup?: string;
  }>;
  onMarkerClick?: (location: [number, number]) => void;
  className?: string;
  autoFit?: boolean;
}

const MapboxMap: React.FC<MapboxMapProps> = ({
  center,
  zoom = 10,
  markers = [],
  onMarkerClick,
  className = '',
  autoFit = false,
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    const initializeMap = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('mapbox-token');
        
        if (error) throw error;
        if (!data?.token) throw new Error('No token received');

        mapboxgl.accessToken = data.token;
        
        map.current = new mapboxgl.Map({
          container: mapContainer.current!,
          style: 'mapbox://styles/mapbox/streets-v12',
          center: center,
          zoom: zoom,
        });

        map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
        
        map.current.on('load', () => {
          setIsLoading(false);
        });

        // Setup ResizeObserver to handle container size changes
        if (mapContainer.current) {
          resizeObserverRef.current = new ResizeObserver(() => {
            if (map.current) {
              map.current.resize();
            }
          });
          resizeObserverRef.current.observe(mapContainer.current);
        }

      } catch (err) {
        console.error('Error initializing map:', err);
        setError('Failed to load map');
        setIsLoading(false);
      }
    };

    initializeMap();

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!map.current || isLoading) return;

    // Remove existing markers properly
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    markers.forEach((markerData) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'relative';
      wrapper.style.width = '30px';
      wrapper.style.height = '30px';

      const dot = document.createElement('div');
      dot.className = 'absolute inset-0 cursor-pointer transition-transform duration-200';
      dot.style.borderRadius = '50%';
      dot.style.backgroundColor = markerData.color || '#3b82f6';
      dot.style.border = '3px solid white';
      dot.style.boxShadow = '0 2px 4px rgba(0,0,0,0.3)';
      
      // Hover scale on the inner dot only
      dot.addEventListener('mouseenter', () => {
        dot.style.transform = 'scale(1.2)';
      });
      dot.addEventListener('mouseleave', () => {
        dot.style.transform = 'scale(1)';
      });

      wrapper.appendChild(dot);

      const marker = new mapboxgl.Marker({ element: wrapper, anchor: 'center' })
        .setLngLat(markerData.location)
        .addTo(map.current!);

      if (markerData.popup) {
        const popup = new mapboxgl.Popup({ 
          offset: 15,
          closeButton: true,
          closeOnClick: false,
          maxWidth: '300px'
        }).setHTML(markerData.popup);
        
        marker.setPopup(popup);
        
        // Show popup on hover and click
        wrapper.addEventListener('mouseenter', () => popup.addTo(map.current!));
        wrapper.addEventListener('click', () => {
          popup.addTo(map.current!);
          if (onMarkerClick) {
            onMarkerClick(markerData.location);
          }
        });
      } else if (onMarkerClick) {
        wrapper.addEventListener('click', () => {
          onMarkerClick(markerData.location);
        });
      }

      markersRef.current.push(marker);
    });

    // Auto-fit bounds if requested and markers exist
    if (autoFit && markers.length > 0 && map.current) {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach(m => bounds.extend(m.location));
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 13 });
    }
  }, [markers, isLoading, onMarkerClick, autoFit]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`}>
        <div className="text-center">
          <Skeleton className="h-6 w-6 rounded-full mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center bg-muted rounded-lg ${className}`}>
        <div className="text-center text-destructive">
          <p className="text-sm font-medium">Map Error</p>
          <p className="text-xs">{error}</p>
        </div>
      </div>
    );
  }

  return <div ref={mapContainer} className={`rounded-lg ${className}`} />;
};

export default MapboxMap;
