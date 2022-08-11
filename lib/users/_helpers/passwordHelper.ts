import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export function hashPassword(plainTextPassword: string) {
    return bcrypt.hash(plainTextPassword, SALT_ROUNDS);
}

export function comparePasswords(plainTextPassword: string, hash: string) {
    return bcrypt.compare(plainTextPassword, hash);
}
