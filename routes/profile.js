const express = require('express');
const router = express.Router();
const { sequelize } = require('../models');
const authMiddleware = require('../middleware/auth');

router.get('/', authMiddleware, async (req, res) => {
  const uid = req.user.id;
  try {
    const [[stats]] = await sequelize.query(`
      SELECT
        u.username, u.email, u.role, u.created_at,
        COUNT(DISTINCT gp.game_id) AS games_played,
        COUNT(DISTINCT CASE WHEN gr.winner_id = u.id THEN gr.game_id END) AS games_won,
        COUNT(DISTINCT q.id) AS quizzes_created,
        COALESCE(SUM(ma.score), 0) AS total_score
      FROM users u
      LEFT JOIN game_players gp ON gp.user_id = u.id
      LEFT JOIN game_results gr ON gr.game_id = gp.game_id
      LEFT JOIN quizzes q ON q.created_by = u.id
      LEFT JOIN match_answers ma ON ma.player_id = u.id
      WHERE u.id = :uid
      GROUP BY u.id
    `, { replacements: { uid } });

    const [recentMatches] = await sequelize.query(`
      SELECT
        m.id, m.match_number, m.status,
        q.title AS quiz_title,
        COALESCE(SUM(ma.score), 0) AS score,
        m.winner_id = :uid AS is_winner,
        g.room_code,
        g.created_at
      FROM matches m
      JOIN games g ON g.id = m.game_id
      JOIN game_players gp ON gp.game_id = g.id AND gp.user_id = :uid
      LEFT JOIN quizzes q ON q.id = m.quiz_id
      LEFT JOIN match_answers ma ON ma.match_id = m.id AND ma.player_id = :uid
      WHERE m.status = 'finished'
      GROUP BY m.id
      ORDER BY g.created_at DESC
      LIMIT 5
    `, { replacements: { uid } });

    res.json({ ...stats, recentMatches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
