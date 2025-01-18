# SaaS Plan with Stripe Integration

A SaaS plan with “Basic”, “Standard” and “Plus” where users can browse and make purchases using the Stripe payment gateway. 

## Prerequisites 

Before setting up the project, ensure you have the following installed: 

- [Node.js](https://nodejs.org/en/) (>= 16.8.0) 
- [npm](https://www.npmjs.com/get-npm) (comes with Node.js) 

## Getting Started 

Follow these steps to set up the project locally. 

### 1. Clone the repository 

Clone the project to your local machine: 

``` git clone <your-repository-url> ``` 
``` cd <project-directory>``` 

Install dependencies  
``` npm install``` 
Set up environment variables 
Create a .env file in the root directory and add your environment variables. Refer to the .env.example file for guidance. 

4. Run the development server 
To start the development server, use the following command
```npm run dev```
This will launch the application in development mode. Open your browser and go to http://localhost:5173 to view it.

### Dependencies  
axios: Promise-based HTTP client for making requests. 
cors: A package for enabling Cross-Origin Resource Sharing (CORS). 
dotenv: Loads environment variables from a .env file. 
react: A JavaScript library for building user interfaces. 
react-dom: Serves as the entry point to the DOM for React. 
react-loader-spinner: A set of React components for displaying loaders. 
react-router-dom: A library for declarative routing in React. 

