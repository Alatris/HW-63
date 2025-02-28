const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'pug');

mongoose.connect(process.env.MONGODB_URI, )
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log('MongoDB connection error:', err));

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    completed: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', TaskSchema);

app.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.render('index', { tasks });
});

app.post('/tasks', async (req, res) => {
    const { title, description } = req.body;
    const task = new Task({ title, description });
    await task.save();
    res.status(201).json(task);
});
console.log("Test update")
app.delete('/tasks/:id', async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
});

app.listen(3000, () => {
    console.log('Homework-67 is running on port 3000');
});