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

const customer = mongoose.model('customer', customerSchema);
module.exports = customer;

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
    console.log('5. Quit Tool')
    const option = prompt('Action to perform? ');
    if (option === 1) {
        createCustomer();
    };
    if (option === 2) {

    };
    if (option === 3) {

    };
    if (option === 4) {

    };
    if (option === 5) {
        quitFunction();
    };
};

const createCustomer = async () => {
    const customerName = prompt('Customer Name: ');
    const customerAge = prompt('Customer Age: ');
    const customerData = {
        name: customerName,
        age: customerAge
    };
    const newCustomer = await customer.create(customerData);
    console.log('New Customer:',newCustomer);
    const nextPrompt = prompt('Return to Menu or Quit? (M/Q) ')
    if(nextPrompt === 'M') {
        promptFunction();
    };
    if(nextPrompt === 'Q') {
        quitFunction();
    };
};




const quitFunction = () => {
    console.log('Quitting...');
};

Init();


