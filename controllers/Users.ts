import {Request, Response} from "express";
import User from "../models/User";
import {hashSync} from "bcrypt";
import verifyToken from "../middleware/Authentication";


export const getUsers = async (req: Request, res: Response) => {
    const users = await User.findAll();

    res.json({users});
};

export const getUser = async (req: Request, res: Response) => {

    const {id} = req.params;

    const user = await User.findByPk(id);

    if (!user)
        return res.status(404).json({msg: "User not found"});

    res.json({user});

};

export const createUser = async (req: Request, res: Response) => {

    const validateAlphaNumeric = /^(?=.*\d)(?=.*[a-záéíóúüñ]).*[A-ZÁÉÍÓÚÜÑ]/;
    const {body} = req;

    try {

        const existUser = await User.findOne({
            where: {
                user_name: body.userName
            }
        });
        if (existUser)
            return res.status(400).json({msg: "User already exists"});

        if (!validateAlphaNumeric.test(body.password))
            return res.status(400).json({msg: "Password must contain at least one uppercase letter and one number"});
        let userBody = {
            name: body.name,
            last_name: body.lastName,
            user_name: body.userName,
            password: hashSync(body.password, 10),
            preferred_currency: body.preferredCurrency,
        }

        const user = await User.create(userBody);

        res.json({
            name: user.getDataValue("name"),
            last_name: user.getDataValue("last_name"),
            user_name: user.getDataValue("user_name"),
            preferred_currency: user.getDataValue("preferred_currency"),
        });
    } catch (error) {
        res.status(400).json({msg: "User is not created"});
    }
};

export const updateUser = async (request: Request, response: Response) => {

    const {body} = request;

    try {

        const idUserAuth = await verifyToken(request, response);

        if (idUserAuth === "jwt expired")
            return response.status(401).send({message: "login expired"});

        if (idUserAuth.message === "invalid signature" || idUserAuth.message === "jwt must be provided")
            return response.status(401).send({message: "Token is not valid or undefined"});

        const user = await User.findByPk(idUserAuth);

        if (!user)
            return response.status(404).json({msg: "User not found"});

        if (body.password || body.userName)
            return response.status(400).json({msg: "Password or username can't be updated"});

        let userBody = {
            name: body.name,
            last_name: body.lastName,
            user_name: body.userName,
            preferred_currency: body.preferredCurrency,
        }

        await user.update(userBody);

        response.json({
            name: user.getDataValue("name"),
            last_name: user.getDataValue("last_name"),
            user_name: user.getDataValue("user_name"),
            preferred_currency: user.getDataValue("preferred_currency"),
        });

    } catch (error) {
        response.status(400).json({msg: "User is not updated"});
    }
};

export const deleteUser = async (request: Request, response: Response) => {


    try {
        const idUserAuth = await verifyToken(request, response);

        if (idUserAuth === "jwt expired")
            return response.status(401).send({message: "login expired"});

        if (idUserAuth.message === "invalid signature" || idUserAuth.message === "jwt must be provided")
            return response.status(401).send({message: "Token is not valid or undefined"});

        const user = await User.findByPk(idUserAuth);

        if (!user)
            return response.status(404).json({msg: "User not found"});

        await user.update({status: false});

        return response.json({
            msg: "User deleted"
        })
    } catch (error) {
        return response.status(400).json({msg: "User is not deleted"});
    }
};