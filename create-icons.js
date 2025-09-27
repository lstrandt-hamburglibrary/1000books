// Node.js script to create PNG icons
const fs = require('fs');

// Create a simple SVG icon and save it
const createSVGIcon = () => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!-- Gradient background -->
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="512" height="512" fill="url(#bg)" rx="80" />

  <!-- Book stack (simplified) -->
  <!-- Bottom book -->
  <rect x="140" y="240" width="232" height="60" fill="#ffffff" opacity="0.9" rx="4" />
  <rect x="140" y="240" width="40" height="60" fill="#5a4a8a" rx="4" />

  <!-- Middle book -->
  <rect x="125" y="180" width="245" height="60" fill="#ffffff" opacity="0.95" rx="4" transform="rotate(-3 256 210)" />
  <rect x="125" y="180" width="40" height="60" fill="#6b5b95" rx="4" transform="rotate(-3 256 210)" />

  <!-- Top book (open) -->
  <path d="M 256 120 L 156 150 L 156 220 L 256 200 L 356 220 L 356 150 Z" fill="#ffffff" />
  <path d="M 256 120 L 256 200" stroke="#5a4a8a" stroke-width="4" />

  <!-- Text "1000" -->
  <text x="256" y="380" font-family="Arial, sans-serif" font-size="72" font-weight="bold" text-anchor="middle" fill="#ffffff">1000</text>
  <text x="256" y="430" font-family="Arial, sans-serif" font-size="32" text-anchor="middle" fill="#ffffff" opacity="0.9">BOOKS</text>
</svg>`;

    fs.writeFileSync('icon-512.svg', svg);
    console.log('Created icon-512.svg');

    // Create a maskable version with more padding
    const svgMaskable = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <!-- Gradient background (full bleed for maskable) -->
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#667eea;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#764ba2;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background (no rounded corners for maskable) -->
  <rect width="512" height="512" fill="url(#bg)" />

  <!-- Book stack (smaller for safe area) -->
  <!-- Bottom book -->
  <rect x="180" y="250" width="152" height="40" fill="#ffffff" opacity="0.9" rx="3" />
  <rect x="180" y="250" width="26" height="40" fill="#5a4a8a" rx="3" />

  <!-- Middle book -->
  <rect x="170" y="220" width="160" height="40" fill="#ffffff" opacity="0.95" rx="3" transform="rotate(-3 256 240)" />
  <rect x="170" y="220" width="26" height="40" fill="#6b5b95" rx="3" transform="rotate(-3 256 240)" />

  <!-- Top book (open) -->
  <path d="M 256 180 L 196 200 L 196 240 L 256 230 L 316 240 L 316 200 Z" fill="#ffffff" />
  <path d="M 256 180 L 256 230" stroke="#5a4a8a" stroke-width="3" />

  <!-- Text "1000" -->
  <text x="256" y="340" font-family="Arial, sans-serif" font-size="56" font-weight="bold" text-anchor="middle" fill="#ffffff">1000</text>
  <text x="256" y="375" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="#ffffff" opacity="0.9">BOOKS</text>
</svg>`;

    fs.writeFileSync('icon-maskable.svg', svgMaskable);
    console.log('Created icon-maskable.svg');
};

createSVGIcon();