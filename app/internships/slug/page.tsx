"use client";

import { useTrackView } from '@/hooks/useTrackView';
import { useParams } from 'next/navigation';

export default function InternshipDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // Track view for this internship
  useTrackView(slug, 'internship');
  
  // Rest of your component
  return (
    <div>
      {/* Your internship detail content */}
    </div>
  );
}
