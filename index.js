require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: 'http://localhost:5173', methods: ['GET', 'POST'] }
});

app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
// Day 2 routes added here later:
app.use('/api/quizzes', require('./routes/quizzes'));
app.use('/api/games', require('./routes/games'));

const { sequelize } = require('./models');

require('./sockets/gameHandler')(io);

sequelize.authenticate()
  .then(() => console.log('✅ Database connected via Sequelize'))
  .catch(err => console.error('❌ DB connection failed:', err));

server.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
