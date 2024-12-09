const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/apiRoutes');
const model = require('./tensorflow/loadModel');
const predictIntent = require('./tensorflow/predictIntent');
const { vocab, labelMap } = require('./tensorflow/preprocessData')();

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://saikrishnachintha06:sai123krishna@cluster0.i1yyaz8.mongodb.net/resourceChatBot?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());
app.use('/api', apiRoutes);

// Chatbot API
app.post('/chat', async (req, res) => {
  const { query } = req.body;
  const intent = await predictIntent(query, vocab, labelMap);

  if (intent === 'GetPreviousPapers') {
    // Fetch papers from the database
    const papers = await fetchPapersFromDB(query);  // Implement this function
    res.json(papers);
  } else {
    res.json({ message: 'Sorry, I didn\'t understand that.' });
  }
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

    // try {
    //   //only for inserting sample papers
    //   // Insert sample papers
    //   await Paper.insertMany(samplePapers);
    //   console.log('Sample papers inserted successfully!');
    // } catch (error) {
    //   console.error('Error inserting sample papers:', error);
    // } finally {
    //   // Close the connection
    //   mongoose.connection.close();
    // }
