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
    if (option === '1') {
        createCustomer();
    };
    if (option === '2') {
        viewCustomers();
    };
    if (option === '3') {
        updateCustomer();
    };
    if (option === '4') {
        deleteCustomer();
    };
    if (option === '5') {
        quitFunction();
    };
};

const nextPrompt = () => {
    const nextPrompt = prompt('Return to Menu or Quit? (M/Q) ')
    if(nextPrompt === 'M') {
        promptFunction();
    } else if (nextPrompt === 'Q') {
        quitFunction();
    } else {
        console.log('Invalid input, returning to Menu...')
        promptFunction(); 
    };
};

const customerList = async () => {
    const allCustomers = await customer.find({});
    console.log('All Customers:', allCustomers);
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
    nextPrompt();
};

const viewCustomers = async () => {
    const allCustomers = await customer.find({});
    console.log('All Customers:', allCustomers);
    nextPrompt();
};

const updateCustomer = async () => {
    const allCustomers = await customer.find({});
    console.log('All Customers:', allCustomers);
    const customerToUpdate = prompt('Copy and Paste the ID of the Customer you wish to update: ');
    const updatingCustomer = await customer.findById(customerToUpdate);
    console.log('Customer to Update:', updatingCustomer);
    const customerName = prompt('Updated Name: ');
    const customerAge = prompt('Updated Age: ');
    const updatedCustomer = await customer.findByIdAndUpdate(customerToUpdate, {name : customerName, age: Number(customerAge)}, {new: true});
    console.log('Customer Updated to: ', updatedCustomer);
    nextPrompt();
};

const deleteCustomer = async () => {
    const allCustomers = await customer.find({});
    console.log('All Customers:', allCustomers);
    const customerToDelete = prompt('Copy and Paste the ID of the Customer you wish to delete: ');
    const deletingCustomer = await customer.findById(customerToDelete);
    console.log('Customer to Delete:', deletingCustomer);
    const confirmation = prompt('Are you sure you wish to delete this customer? (Y/N) ');
    if(confirmation === 'N') {
        console.log('Returning to Menu...');
        promptFunction();
    } else if(confirmation === 'Y') {
        console.log('Deleting...');
        await customer.findByIdAndDelete(customerToDelete);
        console.log('Customer successfully deleted.');
        nextPrompt();
    } else {
        console.log('Invalid input, returning to Menu...')
        promptFunction();
    };
};

const quitFunction = () => {
    console.log('Quitting...');
    mongoose.connection.close();
};

Init();