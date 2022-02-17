import {DataTypes} from 'sequelize';
import db from "../database/connection";

const Cryptos = db.define('Cryptos', {
    id_crypto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
});

export default Cryptos;