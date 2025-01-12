import { Response } from "express";

export const actionResponse = (res: Response, result: boolean, status: number, message: string, data: any = {}) => {
    res.status(status).json({
        success: result,
        error: !result ? data : {},
        message: message,
        result: result ? data : {}
    });
}