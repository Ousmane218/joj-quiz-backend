const express = require('express');
const router = express.Router();
const { Game, GamePlayer, GameResult, User, Match } = require('../models');
const authMiddleware = require('../middleware/auth');

function generateRoomCode() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

router.post('/', authMiddleware, async (req, res) => {
  const { mode = 'live', max_players = 10, max_matches = 1 } = req.body;
  try {
    let room_code = null;
    if (mode === 'live') {
      let unique = false;
      while (!unique) {
        room_code = generateRoomCode();
        const existing = await Game.findOne({ where: { room_code } });
        if (!existing) unique = true;
      }
    }
    const game = await Game.create({ mode, host_id: req.user.id, room_code, max_players, max_matches });
    await GamePlayer.create({ game_id: game.id, user_id: req.user.id });
    res.status(201).json({ id: game.id, room_code: game.room_code });
  } catch { res.status(500).json({ error: 'Server error' }); }
});

router.get('/:code', async (req, res) => {
  try {
    const game = await Game.findOne({
      where: { room_code: req.params.code },
      include: [{ model: User, as: 'players', attributes: ['id', 'username'], through: { attributes: [] } }]
    });
    if (!game) return res.status(404).json({ error: 'Room not found' });
    res.json(game);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

router.get('/:id/result', async (req, res) => {
  try {
    const result = await GameResult.findOne({
      where: { game_id: req.params.id },
      include: [{ model: User, as: 'winner', attributes: ['id', 'username'] }]
    });
    if (!result) return res.status(404).json({ error: 'Result not found' });
    res.json(result);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;
