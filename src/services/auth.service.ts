import { JsonWebToken } from '../utils/authToken';
import {getDb} from '../utils/connectDb';
import { BasicPasswordHash } from '../utils/passhWordHash';
const PasswordHash = new BasicPasswordHash();
const jsonWebToken = new JsonWebToken();

export class AuthService {

    private get collection () {
        const db = getDb();
        return db.collection("users");
    }

    async createUser(data:any) {
        try {
            const hashedPassword = await PasswordHash.generate(data.password);
            const newData = {...data, password: hashedPassword};
            const result = await this.collection.insertOne(newData);
            return result;
        } catch (error: any) {
            throw new Error(error)
        }
    }
    async verifyUser(password: string, storedPassword: string): Promise<boolean> {
        return await PasswordHash.comparePassword(password, storedPassword);
    }
    async findUserByEmail(email: string) {
        try {
            const user = await this.collection.findOne({email: email});
            return user;
        } catch (error: any) {
            throw new Error(error);
        }
    }

    async authenticateUserbyPassword(email: string, password: string) {
        try {
            const user = await this.collection.findOne({email: email});
            if( user ){
                const verifyUser = await PasswordHash.comparePassword(password, user.password);
                if( verifyUser ){
                    const userToken = await jsonWebToken.generate(user._id.toHexString());
                    const {password, ...userWithOutPassword } = user;
                    const userData = {...userWithOutPassword, token: userToken};
                    return userData;
                } else {
                    throw new Error('Crednetials not matching');
                }
            } else {
                throw new Error("User does not exists!");
            }
            
        } catch (error: any) {
            throw new Error(error);
        }
    }
}