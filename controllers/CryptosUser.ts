import {Request, Response} from "express";
import Cryptos from "../models/Cryptos";
import verifyToken from "../middleware/Authentication";
import {getCryptoCurrencysHistoryGateway} from "../gateway/CryptoCurrenciesGateway";
import {get} from "lodash";
import moment from "moment";


export const getUserCryptos = async (request: Request, response: Response) => {
    try {

        const date: string = request.get("date") || "";

        if (date === "")
            return response.status(400).json({
                message: "Date is required"
            });

        let isValid: boolean = moment(date, "DD-MM-YYYY", true).isValid();

        console.log(isValid);

        if (!isValid) {
            return response.status(400).json({
                message: "Invalid date format (DD-MM-YYYY)"
            });
        }

        const idUserAuth = await verifyToken(request, response);
        let arrCryptosUser: any = [];

        if (idUserAuth.message === "invalid signature" || idUserAuth.message === "jwt must be provided") {
            return response.status(401).send({message: "Token is not valid or Undefined"});
        } else {

            const userCryptos = await Cryptos.findAll({where: {user_id: idUserAuth}});

            if (!userCryptos)
                return response.status(404).send({message: "User not found"});

            for (const userCrypto of userCryptos) {
                const cryptoUser = await getCryptoCurrencysHistoryGateway(get(userCrypto, "id_crypto"), date);
                console.log(cryptoUser);
                arrCryptosUser.push(cryptoUser);
            }
            if (arrCryptosUser.length === 0)
                return response.status(404).send({message: "The user has no cryptos created"});

            response.status(200).send(arrCryptosUser);

        }


    } catch (error) {
        console.log(error);
        response.status(500).send("Server Error");
    }

};

export const createCurrencyUser = async (request: Request, response: Response) => {
    try {
        const idUserAuth = await verifyToken(request, response);

        if (idUserAuth === "jwt expired")
            return response.status(401).send({message: "login expired"});

        if (idUserAuth.message === "invalid signature" || idUserAuth.message === "jwt must be provided") {

            return response.status(401).send({message: "Token is not valid or Undefined"});

        } else {
            const {crypto} = request.body;

            if (!crypto)
                return response.status(400).send({message: "Crypto is required"});

            const existCrypto = await Cryptos.findOne({where: {id_crypto: crypto}});

            if (existCrypto && get(existCrypto,"user_id") === idUserAuth)
                return response.status(400).send({message: "Crypto already exist"});

            const cryptoUser = await Cryptos.create({
                id_crypto: crypto,
                user_id: idUserAuth
            });

            if (!cryptoUser)
                return response.status(404).send({message: "Could not create crypto"});

            response.status(201).send({message: "Crypto created successfully"});

        }
    } catch (error) {

        response.status(500).send({msg: "Server Error"});

    }
};
