# Node, Express, and Next.js App

This repository contains a web application built with a Node.js and Express backend, along with a React/Next.js frontend. Follow the instructions below to get the app up and running.

## Prerequisites

- Node.js: Make sure you have Node.js installed on your system. You can download it from the [official website](https://nodejs.org/).

## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/nelio-bila/your-app.git
    cd your-app
    ```

2.  **Install dependencies:**

    Navigate to both the `backend` and `frontend` directories and install the dependencies.

    ```bash
    cd backend
    npm install
    ```

    ```bash
    cd frontend
    npm install
    ```

3.  **Configure environment variables:**

        In the `backend` directory, create a `.env` file and configure the necessary environment variables. You might need to set variables such as openweathermap_api_key, exchangeratesapi_api_key and geonames_account_username .

    ```plaintext
    USERNAME=geonames_account_username
    WEATHER_API_KEY=openweathermap_api_key
    EXCHANGE_API_KEY=exchangeratesapi_api_key
    JWT_SECRET=your_jwt_secret
    DATABASE_URL=your_database_url
    ```
    In the `frontend` directory, create a `.env` file and configure the necessary environment variables. You might need to set variables such as NEXT_PUBLIC_BACKEND_URL.

```plaintext
    NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
    ```

4.  **Run the application:**

    Open three terminal windows, two for the backend and one for the frontend.

    In the first backend terminal:

    ```bash
    cd backend
    npm start
    ```

    In the second backend terminal:

    ```bash
    cd backend
    tsc --w
    ```

    In the frontend terminal:

    ```bash
    cd frontend
    npm run dev
    ```

5.  **Access the application:**

    Once the backend and frontend servers are running, you can access the application in your browser by navigating to `http://localhost:3000`.

## Project Structure

- `backend`: Contains the Node.js and Express backend code.
- `frontend`: Contains the Next.js frontend code.
