require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();

// Cloud Mongodb Atlas

require('./utils/db');
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(morgan('dev'));
// Routes
app.use('/api', require('./routes/auth'));
app.use('/api/posts', require('./routes/post'));
app.use('/api/subreddits', require('./routes/subreddit'));
app.use('/api/users', require('./routes/user'));

// Production Deploy
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
  });
}

// Listen server
const PORT = process.env.PORT || 8800;
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
