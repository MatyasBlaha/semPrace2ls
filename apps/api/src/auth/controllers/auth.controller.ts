import { Controller, Get, Req, Post, Body, Query, Res, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dtos/register.dto';
import {ApiTags, ApiOperation, ApiBody, ApiOkResponse} from '@nestjs/swagger';
import { LoginDto } from '../dtos/login.dto';
import { Request, Response } from 'express';
import { JwtAuthGuard } from '../JwtAuthGuard';
import {MeResponseDto} from "../dtos/me-response.dto";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register user via Supabase' })
  @ApiBody({ type: RegisterDto })
  async register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // auth.controller.ts
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response) {
    const { session } = await this.authService.login(dto);
    const token = session.access_token;
    const isProd = process.env.NODE_ENV === 'production';

    res.cookie('access_token', token, {
      httpOnly: true,
      secure:   true,                // ← only true in prod
      sameSite: 'none',
      path:     '/',
      maxAge:   7 * 24 * 60 * 60 * 1000,
    });

    return { session };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Logout user' })
  async logout(@Res({ passthrough: true }) res: Response) {
    await this.authService.logout();
    res.clearCookie('access_token');
    return { success: true };
  }

  @Get('confirm')
  async confirmEmail(@Query('token') token: string) {
    return this.authService.confirmEmail(token);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiOkResponse({ type: MeResponseDto })
  async me(@Req() req: Request): Promise<MeResponseDto> {
    return {
      id: req.user!.id,
      email: req.user!.email,
      role: req.user!.role,
    };
  }
}