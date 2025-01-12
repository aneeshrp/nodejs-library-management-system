import bcrypt from 'bcryptjs';

export interface passwordHash {
    generate(password: string) : Promise<string>;
    comparePassword(givenPassword: string, storedPassword: string): Promise<boolean>;
}

export class BasicPasswordHash implements passwordHash {
    async generate(password: string): Promise<string> {
        const passwordSault = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, passwordSault);
        return hashedPassword;
    }

    async comparePassword (givenPassword: string, storedPassword: string) : Promise<boolean> {
        return bcrypt.compare(givenPassword, storedPassword);
    }
}