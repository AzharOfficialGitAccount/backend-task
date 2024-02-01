
import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    sub: string;
    issuer: string;
    username: string;
    password: string;
    accessToken: string | null;
    refreshToken: string | null;
}

const userSchema = new Schema<IUser>({
    sub: { type: String, required: true },
    issuer: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    accessToken: { type: String, default: null },
    refreshToken: { type: String, default: null },
});

userSchema.pre('save', async function (next) {
    const user = this as IUser;

    if (user.isModified('password')) {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
    }

    next();
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
