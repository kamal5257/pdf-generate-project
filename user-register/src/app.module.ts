import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { PdfController } from './pdf/pdf.controller';
import { PdfModule } from './pdf/pdf.moduler';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://kchindaliya1998:P3OGTAxkWLWhdXMX@cluster0.188fime.mongodb.net/',
    ),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    PdfModule,
  ],
  controllers: [AppController, UserController, PdfController],
  providers: [AppService, UserService],
})
export class AppModule {}
