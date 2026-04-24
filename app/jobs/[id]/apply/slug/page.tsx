"use client";

import { useTrackView } from '@/hooks/useTrackView';
import { useParams } from 'next/navigation';

export default function JobDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // Track view for this job
  useTrackView(slug, 'job');
  
  // Rest of your component
  return (
    <div>
      {/* Your job detail content */}
    </div>
  );
}