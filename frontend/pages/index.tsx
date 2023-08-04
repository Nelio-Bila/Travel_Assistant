import React, { useContext, useState } from "react";
import SearchForm from "../components/SearchForm";
import {
  getPopulation,
  getGdpPerCapita,
  getWeather,
  getExchangeRate,
} from "@/services/apiService";
import WeatherCard from "@/components/ui/cards/WeatherCard";
import PopulationCard from "@/components/ui/cards/PopulationCard";
import GdpPerCapitaCard from "@/components/ui/cards/GdpPerCapitaCard";
import ExchangeRateCard from "@/components/ui/cards/ExchangeRateCard";
import ExchangeRateCardSkeleton from "@/components/ui/skeletons/ExchangeRateCardSkeleton";
import PopulationCardSkeleton from "@/components/ui/skeletons/PopulationCardSkeleton";
import GdpPerCapitaCardSkeleton from "@/components/ui/skeletons/GdpPerCapitaCardSkeleton";
import WeatherCardSkeleton from "@/components/ui/skeletons/WeatherCardSkeleton";
import { AuthContext } from "contexts/authcontext";
import Hero from "@/components/Hero";

const HomePage = () => {
  const [city, setCity] = useState("");
  const [population, setPopulation] = useState(null);
  const [gdpPerCapita, setGdpPerCapita] = useState(null);
  const [weather, setWeather] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [dataLoaded, setDataLoaded] = useState(false);

  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city === "") {
      return;
    }
    setLoading(true);
    setDataLoaded(false);

    try {
      setErrorMessage("");

      const [
        populationResponse,
        gdpResponse,
        weatherResponse,
        exchangeRateResponse,
      ] = await Promise.all([
        getPopulation(city),
        getGdpPerCapita(city),
        getWeather(city),
        getExchangeRate(city),
      ]);

      setPopulation(populationResponse);
      setGdpPerCapita(gdpResponse);
      setWeather(weatherResponse);
      setExchangeRate(exchangeRateResponse);

      if (
        Array.isArray(populationResponse) &&
        Array.isArray(gdpResponse) &&
        weatherResponse !== null &&
        typeof weatherResponse === "object" &&
        weatherResponse.hasOwnProperty("coord") &&
        weatherResponse.hasOwnProperty("weather") &&
        weatherResponse.hasOwnProperty("base") &&
        weatherResponse.hasOwnProperty("main") &&
        weatherResponse.hasOwnProperty("visibility") &&
        weatherResponse.hasOwnProperty("wind") &&
        weatherResponse.hasOwnProperty("clouds") &&
        weatherResponse.hasOwnProperty("dt") &&
        weatherResponse.hasOwnProperty("sys") &&
        weatherResponse.hasOwnProperty("timezone") &&
        weatherResponse.hasOwnProperty("id") &&
        weatherResponse.hasOwnProperty("name") &&
        weatherResponse.hasOwnProperty("cod") &&
        exchangeRateResponse !== null &&
        typeof exchangeRateResponse === "object" &&
        exchangeRateResponse.hasOwnProperty("success") &&
        exchangeRateResponse.hasOwnProperty("timestamp") &&
        exchangeRateResponse.hasOwnProperty("base") &&
        exchangeRateResponse.hasOwnProperty("date") &&
        exchangeRateResponse.hasOwnProperty("rates") &&
        typeof exchangeRateResponse.rates === "object"
      ) {
        setDataLoaded(true);
      } else {
        setDataLoaded(false);
        setErrorMessage(
          "An error occurred while fetching data. Please check if there is any typo or try again later."
        );
      }

      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setErrorMessage(
        "An error occurred while fetching data. Please check if there is any typo or try again later."
      );

      setDataLoaded(false);

      setPopulation(null);
      setGdpPerCapita(null);
      setWeather(null);
      setExchangeRate(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <Hero/>
      <div className="row d-flex justify-content-center">
        <div className="col-md-8">
          <SearchForm
            submitHandler={handleSubmit}
            city={city}
            setCity={setCity}
            loading={loading}
          />
        </div>
      </div>
      {errorMessage !== "" ? (
        <div className="row d-flex justify-content-center my-2">
          <div className="col-md-8 alert alert-danger">{errorMessage}</div>
        </div>
      ) : null}

      <div className="row d-flex mt-5 justify-content-center">
        {user ? (
          <>
            <div className={`col-md-4 d-flex justify-content-center`}>
              
              {loading && <PopulationCardSkeleton />}{" "}
              {dataLoaded ? <PopulationCard data={population} /> : null}
            </div>
            <div className="col-md-4 d-flex justify-content-center">
              {loading && <GdpPerCapitaCardSkeleton />}{" "}
              {dataLoaded ? <GdpPerCapitaCard data={gdpPerCapita} /> : null}
            </div>
          </>
        ) : null}
        <div className="col-md-4 d-flex justify-content-center">
          {loading && <WeatherCardSkeleton />}{" "}
          {dataLoaded ? <WeatherCard data={weather} /> : null}
        </div>
      </div>
      {user ? (
        <div className="row d-flex ">
          <div className="col d-flex justify-content-center">
            {loading && <ExchangeRateCardSkeleton />}{" "}
            {dataLoaded ? <ExchangeRateCard data={exchangeRate} /> : null}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default HomePage;
