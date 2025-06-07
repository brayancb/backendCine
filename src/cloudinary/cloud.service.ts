import { Inject, Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { Express } from 'express';

@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY') private readonly cloudinaryClient,
  ) {}

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      this.cloudinaryClient.uploader.upload_stream(
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
