import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {

   async hashPassword(password: string): Promise<string> {
        const pass = await bcrypt.hash(password, 10);
        return pass;
    }

}
