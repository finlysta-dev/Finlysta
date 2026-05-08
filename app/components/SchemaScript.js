// app/components/SchemaScript.js
'use client';

import { useEffect } from 'react';

export default function SchemaScript() {
  useEffect(() => {
    // Load schema after page is interactive
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Finlysta",
      "url": "https://www.finlysta.com",
      "logo": "https://www.finlysta.com/og-image.png",
      "sameAs": [
        "https://www.instagram.com/Finlysta.in/",
        "https://www.linkedin.com/company/join-Finlysta/",
        "https://x.com/Finlysta83656"
      ]
    });
    document.head.appendChild(script);
  }, []);
  
  return null;
}