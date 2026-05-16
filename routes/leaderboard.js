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
        COUNT(gr.game_id) AS total_games,
        SUM(CASE WHEN gr.winner_id = u.id THEN 1 ELSE 0 END) AS wins,
        COALESCE(SUM(
          JSON_EXTRACT(gr.final_scores, CONCAT('$."', u.id, '"'))
        ), 0) AS total_score
      FROM users u
      LEFT JOIN game_results gr ON JSON_CONTAINS_PATH(gr.final_scores, 'one', CONCAT('$."', u.id, '"'))
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
