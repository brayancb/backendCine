import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import configuration from './configuration/configuration';
import { AuthenticationModule } from './authentication/authentication.module';
import { MovieModule } from './movie/movie.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      envFilePath: '.env',
      isGlobal: true,
    }),
    //mongodb://admin:123456@localhost:27017/
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        uri: `mongodb://${ConfigService.get('mongo.user')}:${ConfigService.get('mongo.password')}@${ConfigService.get('mongo.host')}:${ConfigService.get('mongo.port')}/${ConfigService.get('mongo.database')}?authSource=admin`,
      }),
    }),
    AuthenticationModule,
    MovieModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
