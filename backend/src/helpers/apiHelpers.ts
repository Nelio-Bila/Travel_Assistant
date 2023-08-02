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

export const getLastYear = async () => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  return currentYear - 1;
};
