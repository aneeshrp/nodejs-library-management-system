import { Request, Response } from "express";
import { actionResponse } from "../utils/responseHandler";
import { AuthService } from "../services/auth.service";

const authService =  new AuthService();

export const registerUser = async(req: Request, res: Response) => {
        try {
            const newUser = await authService.createUser(req.body);
            actionResponse(res, true, 201, "Registered successfully", {});
        } catch (error: any) {
            actionResponse(res, false, 500, error.message, error );
        }
}

export const authenticateUser =  async ( req: Request, res: Response ) => {
    try {
        const user = await authService.authenticateUserbyPassword(req.body.email, req.body.password);
        actionResponse(res, true, 200, "Logged in successfully", user);
    } catch (error: any) {
        actionResponse(res, false, 500,error.message, error);
    }
}