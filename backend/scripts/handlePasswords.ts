import bcrypt from 'bcryptjs';

export const encryptPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, 10);
}
  
export const passwordMatch = async (password: string, encrypted_password: string): Promise<boolean> => {
    return await bcrypt.compare(password, encrypted_password);
}
