const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');

// GET /api/leaderboard
router.get('/', async (req, res) => {
  try {
    const [results] = await sequelize.query(`
      SELECT
        u.id,
        u.username,
        COUNT(DISTINCT gp.game_id) AS total_games,
        COUNT(DISTINCT CASE WHEN gr.winner_id = u.id THEN gr.game_id END) AS wins,
        COALESCE(SUM(ma.score), 0) AS total_score
      FROM users u
      LEFT JOIN game_players gp ON gp.user_id = u.id
      LEFT JOIN game_results gr ON gr.game_id = gp.game_id
      LEFT JOIN match_answers ma ON ma.player_id = u.id
      WHERE u.role = 'player'
      GROUP BY u.id, u.username
      ORDER BY wins DESC, total_score DESC
      LIMIT 20
    `);
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
