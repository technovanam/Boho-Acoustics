import sharp from "sharp";

const width = 1200;
const height = 630;

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b0b0b" />
      <stop offset="100%" stop-color="#1b1308" />
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#bg)" />
  <rect x="44" y="44" width="1112" height="542" fill="none" stroke="#c79a52" stroke-opacity="0.40" stroke-width="2" />
  <text x="72" y="220" font-size="72" font-family="Georgia, serif" font-weight="700" fill="#f8e6c5">Boho Acoustics</text>
  <text x="72" y="292" font-size="34" font-family="Arial, sans-serif" fill="#e7d8bb">Perfect Sound, Designed For Your Space</text>
  <text x="72" y="360" font-size="24" font-family="Arial, sans-serif" fill="#d9c9a8">Acoustic Consulting • Soundproofing • Home Theatre Acoustics</text>
  <text x="72" y="535" font-size="22" font-family="Arial, sans-serif" fill="#bda77f">www.bohoacoustic.com</text>
</svg>
`;

const logoPath = "public/logo.png";
const outPath = "public/og-default.png";

const logoMeta = await sharp(logoPath).metadata();
const logoWidth = 180;
const logoHeight = Math.round(((logoMeta.height || 180) / (logoMeta.width || 180)) * logoWidth);
const logo = await sharp(logoPath).resize({ width: logoWidth, height: logoHeight, fit: "contain" }).png().toBuffer();

await sharp(Buffer.from(svg))
  .composite([{ input: logo, left: 940, top: 76 }])
  .png({ compressionLevel: 9 })
  .toFile(outPath);

const outMeta = await sharp(outPath).metadata();
console.log(`generated ${outPath} (${outMeta.width}x${outMeta.height})`);
