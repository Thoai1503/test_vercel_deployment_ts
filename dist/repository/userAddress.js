import prisma from "../prisma/client.js";
export default class UserAddressRepository {
    async create(item) {
        try {
            if (item.getIsDefault()) {
                await prisma.user_addresses.updateMany({
                    where: { user_id: item.getUserId(), is_default: true },
                    data: { is_default: false },
                });
            }
            const result = await prisma.user_addresses.create({
                data: {
                    user_id: item.getUserId(),
                    full_name: item.getFullName(),
                    phone: item.getPhone(),
                    province_id: Number(item.getProvinceId()),
                    district_id: Number(item.getDistrictId()),
                    ward_id: Number(item.getWardId()),
                    address_detail: item.getAddressDetail(),
                    address_type: item.getAddressType(),
                    is_default: item.getIsDefault(),
                },
            });
            console.log(JSON.stringify(result));
            if (!result)
                return 0;
            return 1;
        }
        catch (error) {
            throw new Error("Lỗi: " + error);
        }
    }
    async findAll() {
        throw new Error("Method not implemented.");
    }
    async findById(id) {
        throw new Error("Method not implemented.");
    }
    async update(id, item) {
        try {
            const current = await prisma.user_addresses.findUnique({ where: { id } });
            if (!current)
                throw new Error("Address not found");
            if (item.getIsDefault()) {
                await prisma.user_addresses.updateMany({
                    where: { user_id: item.getUserId(), is_default: true },
                    data: { is_default: false },
                });
            }
            const newDate = Date.now();
            const result = await prisma.user_addresses.update({
                where: { id: id },
                data: {
                    user_id: item.getUserId(),
                    full_name: item.getFullName(),
                    phone: item.getPhone(),
                    province_id: Number(item.getProvinceId()),
                    district_id: Number(item.getDistrictId()),
                    ward_id: Number(item.getWardId()),
                    address_detail: item.getAddressDetail(),
                    address_type: item.getAddressType(),
                    is_default: item.getIsDefault(),
                    updated_at: new Date(newDate),
                },
            });
            console.log("Update data: " + JSON.stringify(result));
            if (!result)
                return false;
            return true;
        }
        catch (error) {
            throw error;
        }
    }
    async delete(id) {
        throw new Error("Method not implemented.");
    }
    async findByUserId(user_id) {
        try {
            const result = await prisma.user_addresses.findMany({
                where: {
                    user_id: user_id,
                },
                include: {
                    users: true,
                    provinces: true,
                    districts: true,
                    wards: true,
                },
            });
            return result;
        }
        catch (error) {
            throw new Error("lỗi: " + error);
        }
    }
}
//# sourceMappingURL=userAddress.js.map