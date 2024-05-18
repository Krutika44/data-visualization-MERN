const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://Krutika:TiDnYmF9OLCAg45k@cluster0.ehz3zak.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Define MongoDB Schema and Model
const insightSchema = new mongoose.Schema({
    end_year:Number,
    intensity:Number,
    sector:String,
    topic:String,
    insight: String,
    url: String,
    region: String,
    start_year: Number,
    impact: String,
    added: Date,
    published: Date,
    country: String,
    relevance: Number,
    pestle: String,
    source: String,
    title: String,
    likelihood: Number
});

const Insight = mongoose.model('Insight', insightSchema);

// Define API endpoints
app.get('/api/insights', async (req, res) => {
  try {
    const insights = await Insight.find();
    res.json(insights);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
