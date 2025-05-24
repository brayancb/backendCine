import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'dl709eftk',
  api_key: '279299121555959',
  api_secret: process.env.CLOUDINARY_API_SECRET, // Usa variables de entorno
});

export { cloudinary };
