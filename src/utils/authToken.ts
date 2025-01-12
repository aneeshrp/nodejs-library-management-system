import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config';

export interface AuthTokenGen {
    generate(user_id: string): Promise<any>;
}

export class JsonWebToken implements AuthTokenGen {
    async generate(user_id: string): Promise<any> {
        return jwt.sign({ user_id }, JWT_SECRET || 'A0B0C0D0E0F0G0HI0J0K0L0M0N0O0P', { expiresIn: '1h' });
    }
}