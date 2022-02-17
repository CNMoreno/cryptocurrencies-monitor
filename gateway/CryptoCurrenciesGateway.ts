import axios from "axios";

export const getCryptoCurrenciesGateway = async (currency: string, id?: string) => {

    const cryptoCurrencyes = await axios.get(`${process.env.URL_COINGECKO}/coins/markets`, {
        params: {
            vs_currency: currency,
            id
        }
    });

    let arrCryptoCurrencyes: any = [];
    cryptoCurrencyes.data.forEach((crypto: any) => {
        let CryptoCurrency = {
            symbol: crypto.symbol,
            price: crypto.current_price,
            name: crypto.name,
            image: crypto.image,
            updatedAt: crypto.last_updated,
        }
        arrCryptoCurrencyes.push(CryptoCurrency);
    });
    return arrCryptoCurrencyes;
}

export const getCryptoCurrencysHistoryGateway = async (id: string, date: string) => {
        const cryptoCurrencyes = await axios.get(`${process.env.URL_COINGECKO}/coins/${id}/history`, {
            params: {
                date: '30-12-2019'
            }
        });

        return {
            symbol: cryptoCurrencyes.data.symbol,
            priceArs: cryptoCurrencyes.data.market_data.current_price.ars,
            priceUsd: cryptoCurrencyes.data.market_data.current_price.usd,
            priceCop: cryptoCurrencyes.data.market_data.current_price.cop,
            name: cryptoCurrencyes.data.name,
            image: cryptoCurrencyes.data.image,
        };

}