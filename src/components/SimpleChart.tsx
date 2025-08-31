
import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface SimpleChartProps {
  data: Array<{ name: string; value: number }>;
  color?: string;
  height?: number;
}

const SimpleChart: React.FC<SimpleChartProps> = ({ 
  data, 
  color = "hsl(var(--chart-primary))", 
  height = 60 
}) => {
  // Clean color for gradient ID
  const gradientId = `colorGradient-${color.replace(/[^\w]/g, '')}`;
  
  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 5, right: 0, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color} stopOpacity={0.2}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" hide={true} />
          <YAxis hide={true} />
          <Area 
            type="monotone" 
            dataKey="value" 
            stroke={color} 
            fillOpacity={1} 
            fill={`url(#${gradientId})`} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SimpleChart;
