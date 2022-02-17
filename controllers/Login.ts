import {Request, Response} from "express";
import User from "../models/User";
import {compareSync} from "bcrypt";
import {get} from "lodash";
import {sign} from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
    let body = req.body;

    try {

        let user = await User.findOne({where: {user_name: body.userName}});

        if (!get(user, "status"))
            return res.status(404).json({message: "User not authorized"});

        if (!user)
            return res.status(404).json({msg: 'User or password incorrect'});

        if (!compareSync(body.password, get(user, "password")))
            return res.status(404).json({msg: 'User or password incorrect'});

        let token = sign({user_id: get(user, "id")}, process.env.SECRET_KEY || "", {expiresIn:process.env.TOKEN_EXPIRES_IN});

        res.json({
            success: true,
            token: token
        });

    } catch (err) {
        return res.status(400).json({
            ok: false,
            err
        });
    }
};