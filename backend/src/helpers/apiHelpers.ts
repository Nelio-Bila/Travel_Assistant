import axios from 'axios';

export const getCountryCodeByCity = async (city: string) => {
  try {
    const username = process.env.USERNAME;
    const response = await axios.get(
      `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`
    );
    return response.data.geonames[0].countryCode;
  } catch (error) {
    throw new Error("Failed to fetch Country Code");
  }
};

export const getLocalCurrencyByCity = async (city: string) => {
 
    try {
      const countryCode = await getCountryCodeByCity(city);
      const countryResponse = await axios.get(`https://restcountries.com/v2/name/${countryCode}?fullText=true`);
  
      const currency = countryResponse.data[0].currencies[0].code;
  
      return currency;
    } catch (error) {
      console.error('Error fetching currency data:', error);
    }
};


export const getLastYear = async () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return currentYear - 1;
};
