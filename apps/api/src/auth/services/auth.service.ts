import { Injectable } from '@nestjs/common';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import { RegisterDto } from '../dtos/register.dto';
import { LoginDto } from '../dtos/login.dto';
import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private supabase;

  constructor(private configService: ConfigService) { // Inject ConfigService
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseAnonKey = this.configService.get<string>('SUPABASE_ANON_KEY');

    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Key:', supabaseAnonKey?.slice(0, 5) + '...');

    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Missing Supabase configuration');
    }

    this.supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: false,
        detectSessionInUrl: false,
      }
    });
  }

  async register(dto: RegisterDto) {
    const { data, error } = await this.supabase.auth.signUp({
      email: dto.email,
      password: dto.password,
    });
    if (error) throw new Error(error.message);
    return data;
  }

  async login(dto: LoginDto) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email: dto.email,
      password: dto.password
    });
    if (error) throw new Error(error.message);
    return data;
  }

  async logout() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw new Error(error.message);
    return { success: true };
  }

  async confirmEmail(token: string) {
    const supabaseJwtSecret = process.env.SUPABASE_JWT_SECRET;
    if (!supabaseJwtSecret) throw new Error('Missing JWT secret');

    const decoded = jwt.verify(token, supabaseJwtSecret) as jwt.JwtPayload;
    const email = decoded.email;

    const { data, error } = await this.supabase.auth.verifyOtp({
      email,
      token,
      type: 'signup'
    });
    if (error) throw new Error(error.message);
    return data;
  }
}