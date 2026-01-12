import Order from "../models/Order.js";
import User from "../models/User.js";
import prisma from "../prisma/client.js";
import { sql, getPool } from "../db/Mssql.js";
export default class OrderRepository {
    constructor() { }
    async create(item) {
        try {
            const result = await prisma.orders.create({
                data: {
                    user_id: item.getUserId(),
                    discount: item.getDiscount(),
                    total: item.getTotal(),
                    address_id: item.getAddressId(),
                    created_at: new Date(Date.now()),
                    status: 1,
                },
            });
            return result.id;
        }
        catch (error) {
            throw error;
        }
    }
    async findById(id) {
        try {
            const item = await prisma.orders.findUnique({
                where: { id: id },
                include: { users: true, order_detail: false, user_addresses: true },
            });
            if (item) {
                const user = new User({
                    id: item.users.id,
                    name: item.users.full_name,
                    email: item.users.email,
                    phone: item.users.phone,
                    password: "",
                    role: 2,
                    status: item.users.status,
                });
                return new Order(item.id, item.user_id, Number(item.discount), Number(item.total), item.address_id || undefined, item.status, item.created_at, user);
            }
            return null;
        }
        catch (error) {
            throw error;
        }
    }
    async findAll() {
        try {
            const list = await prisma.orders.findMany({
                include: { users: true, order_detail: false, user_addresses: true },
                orderBy: {
                    created_at: "desc",
                },
            });
            const mappingList = list.map((item) => new Order(item.id, item.user_id, Number(item.discount), Number(item.total), item.address_id || undefined, item.status, item.created_at, new User({
                id: item.users.id,
                name: item.users.full_name,
                email: item.users.email,
                phone: item.users.phone,
                password: "",
                role: 2,
                status: item.users.status,
            })));
            return mappingList;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, item) {
        try {
            const re = await prisma.orders.update({
                where: { id: id },
                data: {
                    status: item.getStatus(),
                },
            });
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        throw new Error("Method not implemented.");
    }
    async getByUserId(user_id) {
        try {
            const list = await prisma.orders.findMany({
                where: { user_id: user_id },
            });
            return list.map((item) => {
                const user = new User();
                return new Order(item.id, user_id, Number(item.discount), Number(item.total), item.address_id, item.status, item.created_at, user);
            });
        }
        catch (error) {
            throw error;
        }
    }
    async getPendingByUserId(user_id) {
        try {
            const en = await prisma.orders.findFirst({
                where: { user_id: user_id, status: 1 },
            });
            const user = new User();
            return new Order(en?.id, user_id, Number(en?.discount), Number(en?.total), en?.address_id, en?.status, en?.created_at, user);
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=order.js.map