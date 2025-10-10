import User from "../models/User.js";
import { sql } from "../db/Mssql.js";
export default class UserRepository {
    constructor();
    getAllUsers(): Promise<sql.IRecordSet<any>>;
    getUserByEmail(email: string): Promise<User | null>;
    getUserById(id: number): Promise<User | null>;
    createUser(user: User): Promise<User>;
    updateUser(id: number, user: User): Promise<{
        id: number;
    }>;
}
//# sourceMappingURL=user.d.ts.map