import type { NextFunction, Request, Response } from "express";
export default class UserAddressController {
    private userAddressRepository;
    constructor();
    createNewAddress: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    findByUserId: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
//# sourceMappingURL=UserAddressRepository.d.ts.map