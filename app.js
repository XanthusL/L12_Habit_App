// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

let habits = [
    {
        id: 1,
        name: "Morning Exercise",
        description: "30 minutes of cardio or strength training",
        category: "Health",
        startDate: "2026-05-01",
        endDate: "2026-05-31",
        frequency: "Daily",
        reminderTime: "07:00",
        status: "Active",
        completed: false,
        streak: 5,
        createdAt: new Date('2026-05-01'),
        notes: "Wake up at 6:30 AM to prepare"
    },
    {
        id: 2,
        name: "Read Books",
        description: "Read 20 pages every day",
        category: "Learning",
        startDate: "2026-05-01",
        endDate: "2026-06-30",
        frequency: "Daily",
        reminderTime: "21:00",
        status: "Active",
        completed: false,
        streak: 3,
        createdAt: new Date('2026-05-01'),
        notes: "Focus on self-improvement books"
    },
    {
        id: 3,
        name: "Drink Water",
        description: "Drink 8 glasses of water daily",
        category: "Health",
        startDate: "2026-05-01",
        endDate: "2026-12-31",
        frequency: "Daily",
        reminderTime: "10:00",
        status: "Active",
        completed: true,
        streak: 12,
        createdAt: new Date('2026-05-01'),
        notes: "Keep water bottle on desk"
    }
];

//Define a route to render the index page
app.get('/', (req, res) => {
    res.render('index', { habits });
});

app.get('/addhabit', (req, res) => {
    res.render('addhabit');
});

app.post('/addhabit', (req, res) => {
    const { name, description, category, startDate, endDate, frequency, reminderTime, status, notes } = req.body;
    const newHabit = {
        id: habits.length + 1,
        name,
        description,
        category,
        startDate,
        endDate,
        frequency,
        reminderTime,
        status,
        completed: false,
        streak: 0,
        createdAt: new Date(),
        notes
    };
    habits.push(newHabit);
    res.redirect('/');
});

app.get('/viewhabit/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const habit = habits[index];
    res.render('viewhabit', { habit });
});

app.get('/edithabit/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const habit = habits[index];
    res.render('edithabit', { habit, index });
});

app.post('/edithabit/:index', (req, res) => {
    const index = parseInt(req.params.index);
    const { name, description, category, startDate, endDate, frequency, reminderTime, status, notes } = req.body;

    // Update the habit with the new values
    habits[index] = { ...habits[index], name, description, category, startDate, endDate, frequency, reminderTime, status, notes };

    res.redirect('/');
});

app.post('/deletehabit/:index', (req, res) => {
    const index = parseInt(req.params.index);
    habits.splice(index, 1);
    res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});