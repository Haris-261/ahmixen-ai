import {Module} from '@nestjs/common';
import {ConfigModule,ConfigService} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {JwtModule} from '@nestjs/jwt';
import {ThrottlerModule} from '@nestjs/throttler';
import {validate} from './config';
import {Admin,AdminSchema,Program,ProgramApplication,ProgramApplicationSchema,ProgramSchema,Resource,ResourceSchema,Testimonial,TestimonialSchema} from './schemas';
import {AuthService} from './auth.service';import {AuthGuard} from './auth.guard';import {CsrfGuard} from './csrf.guard';import {AuthController} from './auth.controller';import {ContentService} from './content.service';import {AdminProgramsController,HomeController,ProgramsController,ResourcesController,TestimonialsController} from './content.controller';import {MediaController} from './media.controller';

@Module({
 imports:[
  ConfigModule.forRoot({isGlobal:true,envFilePath:['../.env','.env'],validate}),
  MongooseModule.forRootAsync({inject:[ConfigService],useFactory:(c:ConfigService)=>({uri:c.getOrThrow('MONGODB_URI'),serverSelectionTimeoutMS:10000,connectionFactory:(connection:any)=>{const connected=()=>console.log(`[database] MongoDB connected successfully - database: ${connection.name}`);if(connection.readyState===1)connected();else connection.once('open',connected);connection.on('error',(error:Error)=>console.error(`[database] MongoDB connection error: ${error.message}`));return connection}})}),
  MongooseModule.forFeature([{name:Admin.name,schema:AdminSchema},{name:Program.name,schema:ProgramSchema},{name:Resource.name,schema:ResourceSchema},{name:Testimonial.name,schema:TestimonialSchema},{name:ProgramApplication.name,schema:ProgramApplicationSchema}]),
  JwtModule.registerAsync({global:true,inject:[ConfigService],useFactory:(c:ConfigService)=>({secret:c.getOrThrow('JWT_SECRET'),signOptions:{expiresIn:'8h'}})}),
  ThrottlerModule.forRoot([{ttl:60000,limit:100}])
 ],
 controllers:[AuthController,ProgramsController,AdminProgramsController,ResourcesController,TestimonialsController,HomeController,MediaController],
 providers:[AuthService,AuthGuard,CsrfGuard,ContentService]
})export class AppModule{}
