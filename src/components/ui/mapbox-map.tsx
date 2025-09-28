import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { supabase } from '@/integrations/supabase/client';

interface MapboxMapProps {
  center?: [number, number];
  zoom?: number;
  markers?: Array<{
    id: string;
    coordinates: [number, number];
    data: any;
    color?: string;
  }>;
  onMarkerClick?: (marker: any) => void;
  className?: string;
  style?: string;
}

const MapboxMap: React.FC<MapboxMapProps> = ({
  center = [-74.0, 41.1], // Hudson Valley area
  zoom = 10,
  markers = [],
  onMarkerClick,
  className = '',
  style = 'mapbox://styles/mapbox/light-v11'
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch Mapbox token from edge function
  useEffect(() => {
    const fetchMapboxToken = async () => {
      try {
        const { data, error } = await supabase.functions.invoke('mapbox-token');
        if (error) {
          throw new Error('Failed to fetch Mapbox token');
        }
        setMapboxToken(data.token);
      } catch (err) {
        console.error('Error fetching Mapbox token:', err);
        setError('Unable to load map. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMapboxToken();
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || map.current) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style,
      center,
      zoom,
      projection: 'mercator'
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup function
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken, center, zoom, style]);

  // Add markers
  useEffect(() => {
    if (!map.current || !markers.length) return;

    // Remove existing markers
    const existingMarkers = document.querySelectorAll('.opportunity-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add new markers
    markers.forEach((markerData) => {
      const markerElement = document.createElement('div');
      markerElement.className = 'opportunity-marker';
      markerElement.style.cssText = `
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: ${markerData.color || '#3b82f6'};
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        cursor: pointer;
        transition: transform 0.2s ease;
        position: relative;
        z-index: 1;
      `;

      // Add hover effect with proper positioning
      markerElement.addEventListener('mouseenter', () => {
        markerElement.style.transform = 'scale(1.2)';
        markerElement.style.zIndex = '1000';
      });
      markerElement.addEventListener('mouseleave', () => {
        markerElement.style.transform = 'scale(1)';
        markerElement.style.zIndex = '1';
      });

      // Add click handler
      if (onMarkerClick) {
        markerElement.addEventListener('click', () => {
          onMarkerClick(markerData);
        });
      }

      new mapboxgl.Marker(markerElement)
        .setLngLat(markerData.coordinates)
        .addTo(map.current!);
    });
  }, [markers, onMarkerClick]);

  if (isLoading) {
    return (
      <div className={`h-full w-full bg-muted animate-pulse rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
          <p className="text-sm text-muted-foreground">Loading map...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`h-full w-full bg-muted rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center">
          <p className="text-sm text-destructive mb-2">Map Error</p>
          <p className="text-xs text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={mapContainer} 
      className={`h-full w-full rounded-lg overflow-hidden ${className}`}
    />
  );
};

export default MapboxMap;