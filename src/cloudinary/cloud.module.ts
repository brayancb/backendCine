import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloud.service';
import { cloudinaryProvider } from './cloud.provider';

@Module({
  providers: [CloudinaryService, cloudinaryProvider],
  exports: [CloudinaryService],
})
export class CloudinaryModule {}
