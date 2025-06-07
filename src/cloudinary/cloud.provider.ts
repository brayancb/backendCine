import { v2 as cloudinary } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

export const cloudinaryProvider = {
  provide: 'CLOUDINARY',
  useFactory: (configService: ConfigService) => {
    const cloudName = configService.get<string>('CLOUDINARY_CLOUD_NAME');
    const apiKey = configService.get<string>('CLOUDINARY_API_KEY');
    const apiSecret = configService.get<string>('CLOUDINARY_API_SECRET');

    console.log('Cloudinary config from ConfigService:', {
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret ? '******' : undefined, // no loguees el secreto completo por seguridad
    });

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
    return cloudinary;
  },
  inject: [ConfigService],
};
