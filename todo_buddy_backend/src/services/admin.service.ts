import { PostgresDataSource } from "../config/data-source";
import { User } from '../models/user';
import { sendMail } from '../helpers/sendmail';
import bcrypt from 'bcrypt';
import { encrypt } from "../helpers/encrypt";

const userRepo = PostgresDataSource.getRepository(User);

export class AdminService {

    static async inviteUser(dto) {
        try {
            const { name, email, role, user_id } = dto;

            const isUserExist = await userRepo.findOne({
                where: { email: email }
            });

            if (isUserExist) {
                return false;
            }

            const password = Math.random().toString(36).slice(2, 10);
            const passwordHash = await bcrypt.hash(password, 10);

            const invitedUser = userRepo.create({
                name,
                email,
                role,
                password_hash: passwordHash,
                invited_by: user_id
            });

            const user = await userRepo.save(invitedUser);

            await sendMail(email, password, user.name);

            return { message: 'User invited successfully', user: invitedUser };
        } catch (err) {
            console.error('Error while inviting User', dto.email, err);
        }
    }


    static async login(email: string, password: string) {

        //find user
        const user = await userRepo.findOne({ where: { email } });

        if (!user) {
            throw new Error('User not found');
        }

        //compair password
        const isPasswordValid = await encrypt.comparepassword(user.password_hash, password);

        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const payload = { userId: user.id, role: user.role };

        const accessToken = encrypt.generateToken(payload);
        const userId = user.id
        const role = user.role;
        return { userId, accessToken , role};
    }

    static async getAllUsers(){
        return userRepo.find();
    }

}


