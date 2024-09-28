import { DynamicModule, ForwardReference, Module, Type } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AccountsModule } from './accounts/accounts.module';
import { GoogleStrategy } from './auth/strategies/google.strategy';
import { UsersService } from './users/users.service';
import { PrismaService } from 'prisma/prisma.service';
import { AccountsService } from './accounts/accounts.service';
import { JwtService } from '@nestjs/jwt';
import { redisStore } from 'cache-manager-redis-yet'; 
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

const imports: (Type<any> | DynamicModule | Promise<DynamicModule> | ForwardReference<any>) [] = [
  AuthModule,
  UsersModule,
  PostsModule,
  AccountsModule,
  CacheModule.registerAsync({  
    isGlobal: true,  
    useFactory: async () => ({  
      store: await redisStore({  
        socket: {  
          host: process.env.REDIS_HOST || 'localhost',
          port: 6379,  
        },        
      }),      
    }),    
  }), 
]

process.env.NODE_ENV === 'production' && imports.push(ServeStaticModule.forRoot({
  rootPath: join(__dirname, '../../client/dist'),
  exclude: ['/api/(.*)'],
}))

@Module({
  imports: imports,
  providers: [GoogleStrategy, UsersService, PrismaService, AccountsService, JwtService],

})
export class AppModule {}
