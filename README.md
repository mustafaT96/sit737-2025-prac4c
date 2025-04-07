# Calculator Microservice

This project is a **Calculator Microservice** built using **Node.js** and **Express.js**. The microservice performs basic arithmetic operations (addition, subtraction, multiplication, division), along with three additional operations: exponentiation, square root, and modulus. It also logs requests and errors using **Winston**.

## Project Overview

The Calculator Microservice exposes a RESTful API with the following operations:

- **Addition**
- **Subtraction**
- **Multiplication**
- **Division**
- **Exponentiation**
- **Square Root**
- **Modulo**

**Technologies Used:**

- **Node.js** & **Express.js**: For handling API requests.
- **Winston**: For logging all API requests and errors.
- **GitHub**: For version control and collaboration.

## Project Folder Structure
calculator-microservice/

│-- logs/ <-- Stores log files

│ ├── combined.log <-- Logs all API requests

│ ├── error.log <-- Logs errors only

│-- server.js <-- Main API code

│-- package.json <-- Project dependencies and metadata

│-- node_modules/ <-- Installed dependencies

## Step-by-Step Setup Guide

### Step 1: Install Node.js

First, ensure that Node.js is installed. You can verify this by running:

```bash
node -v
npm -v
```

### Step 2: Initialize the Node.js Project

Navigate to the project folder and initialize the Node.js project:

```bash
npm init -y
```
This will create a package.json file with default values.

### Step 3: Install Dependencies

Install the required dependencies:

```bash
npm install express winston
```
- **Express: For handling HTTP requests.**
- **Winston: For logging API requests and errors.**

### API Implementation (server.js)
#### 1. Import Required Modules
```bash
const express = require('express');
const winston = require('winston');
```
#### 2. Initialize Express App
```bash
const app = express();
const PORT = 3000;
```
#### 3. Configure Winston Logging
```bash
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({ format: winston.format.simple() }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ],
});
```
#### 4. Middleware to Log Incoming Requests
```bash
app.use((req, res, next) => {
  logger.info(`Received ${req.method} request for ${req.url}`);
  next();
});
```
#### 5. API Endpoints
Each endpoint performs the respective operation (e.g., addition, subtraction) and returns the result in a JSON response.
#### Addition Endpoint:
```bash
app.get('/add', (req, res) => {
  const num1 = parseFloat(req.query.num1);
  const num2 = parseFloat(req.query.num2);
  if (isNaN(num1) || isNaN(num2)) {
    logger.error('Invalid input for addition');
    return res.status(400).json({ error: 'Invalid numbers' });
  }
  const result = num1 + num2;
  res.json({ operation: 'addition', result });
});
```
Other operations like subtraction, multiplication, division, exponentiation, square root, and modulus follow a similar pattern.
#### 6. Start the Server
```bash
app.listen(PORT, () => {
  console.log(`Calculator microservice running at http://localhost:${PORT}`);
});
```

### Running the Service
#### Step 1: Start the Server
Run the following command to start the server:
```bash
node server.js
```
This will output:
```bash
Calculator microservice running at http://localhost:3000
```
#### Step 2: Test the API Endpoints
You can test the API endpoints directly from a browser or a tool like Postman.
- **Addition: http://localhost:3000/add?num1=5&num2=3**
- **Subtraction: http://localhost:3000/subtract?num1=5&num2=3**
- **Multiplication: http://localhost:3000/multiply?num1=5&num2=3**
- **Division: http://localhost:3000/divide?num1=5&num2=3**
- **Exponentiation: http://localhost:3000/power?num1=5&num2=3**
- **Square Root: http://localhost:3000/sqrt?num1=25**
- **Modulo: http://localhost:3000/modulo?num1=5&num2=3**
#### Step 3: Viewing Logs
**Real-Time Logs**
To view logs in real-time, run:
```bash
Get-Content logs/combined.log
```
**Error Logs**
To view only error logs, run:
```bash
Get-Content logs/error.log
```

### Conclusion
This Calculator Microservice successfully implements basic arithmetic operations (addition, subtraction, multiplication, division), as well as additional operations like exponentiation, square root, and modulus.

It uses Express.js for handling API requests and Winston for logging. All requests and errors are logged in separate files for monitoring.

