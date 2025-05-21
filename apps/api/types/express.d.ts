import { Role } from '../generated/client';

declare global {
    namespace Express {
        interface Request {
            user?: {
                email: string;
                role: Role;
                [key: string]: any;
            };
        }
    }
}