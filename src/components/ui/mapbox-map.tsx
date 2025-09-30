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
    const existingMarkers = document.querySelectorAll('.mapboxgl-marker');
    existingMarkers.forEach(marker => marker.remove());

    // Add new markers
    markers.forEach((markerData) => {
      // Marker wrapper (Mapbox positions this element). Do NOT set transform here.
      const markerElement = document.createElement('div');
      markerElement.className = 'opportunity-marker';
      markerElement.style.cssText = `
        width: 16px;
        height: 16px;
        display: grid;
        place-items: center;
        cursor: pointer;
        position: relative;
        z-index: 1;
      `;

      // Inner dot that we can safely scale without breaking Mapbox positioning
      const dot = document.createElement('div');
      dot.style.cssText = `
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: ${markerData.color || '#3b82f6'};
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        transition: transform 120ms ease;
        will-change: transform;
      `;
      markerElement.appendChild(dot);

      // Popup with property info (address, year, last sold, price)
      const fmtPrice = (n: number | undefined) =>
        (n ?? 0).toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
      const popupHtml = `
        <div style="font-family: ui-sans-serif, system-ui; font-size:12px; min-width: 220px;">
          <div style="font-weight:600; margin-bottom:4px;">${markerData?.data?.address || 'Property'}</div>
          <div style="color:#6b7280;">${markerData?.data?.location || ''}</div>
          <div style="margin-top:6px; display:grid; grid-template-columns: 1fr 1fr; gap:6px;">
            <div><span style="color:#6b7280;">Year built:</span> ${markerData?.data?.yearBuilt || '—'}</div>
            <div><span style="color:#6b7280;">Last sold:</span> ${markerData?.data?.lastSoldDate || '—'}</div>
            <div><span style="color:#6b7280;">Sold price:</span> ${fmtPrice(markerData?.data?.lastSoldPrice)}</div>
            <div><span style="color:#6b7280;">Est. value:</span> ${fmtPrice(markerData?.data?.estimatedValue)}</div>
          </div>
        </div>`;
      const popup = new mapboxgl.Popup({ offset: 12, closeButton: true, closeOnClick: false }).setHTML(popupHtml);

      // Interactions
      const showPopup = () => {
        popup.setLngLat(markerData.coordinates).addTo(map.current!);
        dot.style.transform = 'scale(1.2)';
      };
      const hidePopup = () => {
        popup.remove();
        dot.style.transform = 'scale(1)';
      };

      markerElement.addEventListener('mouseenter', showPopup);
      markerElement.addEventListener('mouseleave', hidePopup);
      markerElement.addEventListener('click', () => {
        showPopup();
        onMarkerClick?.(markerData);
      });

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