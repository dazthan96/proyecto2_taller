import { Controller,  Body, Req, Post } from '@nestjs/common';
import { request } from 'express';
import { AuthService } from './auth.service.js';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService:AuthService){}
  
  @Post('login')
  login(@Body() loginBody:any, @Req() request:Request){
    return this.authService.login(loginBody)
  }

  @Post('logout')
  async logout(){
    return this.authService.logout()
  }


}
