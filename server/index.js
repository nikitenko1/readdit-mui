require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
// const middleware = require('./utils/middleware');

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

// app.use(middleware.unknownEndpointHandler);

// Listen server
const PORT = process.env.PORT || 8800;
app.listen(8800, () => {
  console.log(`Server running on port: ${PORT}`);
});
