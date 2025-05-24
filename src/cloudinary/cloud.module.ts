import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloud.service';

@Module({
  providers: [CloudinaryService],
  exports: [CloudinaryService], // Importante: exportar el servicio
})
export class CloudinaryModule {}