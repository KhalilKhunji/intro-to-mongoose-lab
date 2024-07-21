// Import Modules
require('dotenv').config();
const { default: mongoose } = require('mongoose');
const prompt = require('prompt-sync')();

// Database Connection
mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on('connected', () => {
    console.log(`Connected to MongoDB on ${mongoose.connection.name}`);
});

// Schema & Model
const customerSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;

// Functions
const Init = () => {
    promptFunction();
};

const promptFunction = () => {
console.log('Welcome to the CRM Tool')
console.log('What would you like to do?')
console.log('1. Create a new Customer')
console.log('2. View all Customers')
console.log('3. Update a preexisting Customer')
console.log('4. Delete a Customer')
console.log('5. Exit Tool')
const option = prompt('Action to perform? ');
};

Init();


