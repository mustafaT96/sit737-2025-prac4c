const express = require('express');
const winston = require('winston');

const app = express();
const PORT = 3000;

// Create a Winston logger for logging requests
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

// Middleware to parse query parameters
app.use(express.json());

// Function to validate inputs
const validateNumbers = (num1, num2) => {
    if (isNaN(num1) || isNaN(num2)) {
        return "Invalid input: Both num1 and num2 should be numbers.";
    }
    return null;
};

// API Endpoints

// Addition
app.get('/add', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    const error = validateNumbers(num1, num2);
    if (error) {
        logger.error(error);
        return res.status(400).json({ error });
    }

    const result = num1 + num2;
    logger.info(`Addition requested: ${num1} + ${num2} = ${result}`);
    res.json({ operation: "addition", result });
});

// Subtraction
app.get('/subtract', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    const error = validateNumbers(num1, num2);
    if (error) {
        logger.error(error);
        return res.status(400).json({ error });
    }

    const result = num1 - num2;
    logger.info(`Subtraction requested: ${num1} - ${num2} = ${result}`);
    res.json({ operation: "subtraction", result });
});

// Multiplication
app.get('/multiply', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    const error = validateNumbers(num1, num2);
    if (error) {
        logger.error(error);
        return res.status(400).json({ error });
    }

    const result = num1 * num2;
    logger.info(`Multiplication requested: ${num1} * ${num2} = ${result}`);
    res.json({ operation: "multiplication", result });
});

// Division
app.get('/divide', (req, res) => {
    const num1 = parseFloat(req.query.num1);
    const num2 = parseFloat(req.query.num2);

    const error = validateNumbers(num1, num2);
    if (error) {
        logger.error(error);
        return res.status(400).json({ error });
    }

    if (num2 === 0) {
        logger.error("Error: Division by zero is not allowed.");
        return res.status(400).json({ error: "Division by zero is not allowed." });
    }

    const result = num1 / num2;
    logger.info(`Division requested: ${num1} / ${num2} = ${result}`);
    res.json({ operation: "division", result });
});

// New Advanced Operations

// Exponentiation: num1^num2
app.get('/power', (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2 || isNaN(num1) || isNaN(num2)) {
        logger.error('Invalid input for exponentiation');
        return res.status(400).json({ error: 'Invalid input' });
    }
    const result = Math.pow(parseFloat(num1), parseFloat(num2));
    logger.info(`Exponentiation: ${num1}^${num2} = ${result}`);
    res.json({ operation: "Exponent", result });
});

// Square root: √num1
app.get('/sqrt', (req, res) => {
    const { num1 } = req.query;
    if (!num1 || isNaN(num1) || num1 < 0) {
        logger.error('Invalid input for square root');
        return res.status(400).json({ error: 'Invalid input, number must be non-negative' });
    }
    const result = Math.sqrt(parseFloat(num1));
    logger.info(`Square Root: √${num1} = ${result}`);
    res.json({ operation: "Square Root",result });
});

// Modulo: num1 % num2
app.get('/modulo', (req, res) => {
    const { num1, num2 } = req.query;
    if (!num1 || !num2 || isNaN(num1) || isNaN(num2) || num2 == 0) {
        logger.error('Invalid input for modulo operation');
        return res.status(400).json({ error: 'Invalid input or division by zero' });
    }
    const result = parseFloat(num1) % parseFloat(num2);
    logger.info(`Modulo: ${num1} % ${num2} = ${result}`);
    res.json({ operation: "Modulo",result });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Calculator microservice running at http://localhost:${PORT}`);
});