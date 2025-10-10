import JWTService from "../service/jwtService.js";
export default class User {
    id = 0;
    name = "";
    email = "";
    phone = "";
    password = "";
    role = 0;
    status = 0;
    jwtService;
    static USER_TABLE = "users";
    constructor(data) {
        this.id = data?.id ?? 0;
        this.name = data?.name ?? "";
        this.email = data?.email ?? "";
        this.phone = data?.phone ?? "";
        this.password = data?.password ?? "";
        this.role = data?.role ?? 0;
        this.status = data?.status ?? 0;
        this.jwtService = new JWTService();
    }
    getId() {
        return this.id;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getPhone() {
        return this.phone;
    }
    getPassword() {
        return this.password;
    }
    getRole() {
        return this.role;
    }
    getStatus() {
        return this.status;
    }
    setStatus(status) {
        this.status = status;
    }
    // -- Validation helper (simple, synchronous)
    // returns { valid, errors }
    static validate(payload) {
        const errors = {};
        if (!payload.name || payload.name.trim() === "") {
            errors.name = "Name is required";
        }
        else if (payload.name.length > 100) {
            errors.name = "Name must be <= 100 chars";
        }
        if (!payload.email || payload.email.trim() === "") {
            errors.email = "Email is required";
        }
        else {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!re.test(payload.email.toLowerCase())) {
                errors.email = "Email is invalid";
            }
        }
        if (payload.password !== undefined) {
            if (payload.password.length < 6) {
                errors.password = "Password must be at least 6 characters";
            }
        }
        if (payload.role !== undefined && typeof payload.role !== "number") {
            errors.role = "Role must be a number";
        }
        if (payload.status !== undefined && typeof payload.status !== "number") {
            errors.status = "Status must be a number";
        }
        return {
            valid: Object.keys(errors).length === 0,
            errors,
        };
    }
    // Keep bcrypt require inside method to reduce circular dependency risk during gradual migration
    async hashPassword() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const bcrypt = require("bcryptjs");
        const saltRounds = 10;
        this.password = await bcrypt.hash(String(this.password), saltRounds);
    }
    async comparePassword(plain) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const bcrypt = require("bcryptjs");
        // stored password may contain whitespace — trim for safety
        return await bcrypt.compare(String(plain), String(this.password).trim());
    }
    generateAuthToken() {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        //   const jwtService = require("../service/jwtService");
        const payload = {
            id: this.id,
            email: this.email,
            role: this.role,
            status: this.status,
        };
        const tokens = this.jwtService.generateTokens(payload);
        return tokens;
    }
}
//# sourceMappingURL=User.js.map