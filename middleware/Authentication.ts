import {Request, Response} from "express";
import {JwtPayload, verify} from "jsonwebtoken";
import {get} from 'lodash'

const verifyToken = async (request: Request, _: Response) => {

    try {
        let token: string = request.get('token') || '';

        const auth: JwtPayload | string = await verify(token, process.env.SECRET_KEY || '');

        return get(auth, 'user_id');
    } catch (error) {
        return error;
    }
}
export default verifyToken;