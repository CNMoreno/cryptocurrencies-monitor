import {Request, Response} from "express";
import verifyToken from "../middleware/Authentication";
import User from "../models/User";
import {getCryptoCurrenciesGateway} from "../gateway/CryptoCurrenciesGateway";
import {get} from "lodash";

export const getCryptoCurrencies = async (request: Request, response: Response) => {
    try {

        const idUserAuth = await verifyToken(request, response);

        if (idUserAuth === "jwt expired")
            return response.status(401).send({message: "login expired"});

        if (idUserAuth.message === "invalid signature" || idUserAuth.message === "jwt must be provided") {

            response.status(401).send({message: "Token is not valid or undefined"});

        } else {
            const user = await User.findByPk(idUserAuth);
            if (user) {
                const cryptoCurrencies = await getCryptoCurrenciesGateway(get(user, "preferred_currency", ""));
                response.status(200).send(cryptoCurrencies);
            } else {
                response.status(404).send({message: "User not found"});
            }
        }
    } catch (e) {
        response.status(500).json({
            message: "Not possible to get the cryptocurrencies"
        });
    }

};