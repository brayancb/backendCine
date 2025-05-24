import { Injectable } from '@nestjs/common';
import { cloudinary } from '../cloudinary/cloud.provider';
import { UploadApiResponse } from 'cloudinary';
import { Express } from 'express';

@Injectable()
export class CloudinaryService {
  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'cine/peliculas', 
        },
        (error, result) => {
          if (error) return reject(error);
          if (!result) return reject(new Error('Failed to upload image'));
          resolve(result);
        },
      ).end(file.buffer);
    });
  }
}
