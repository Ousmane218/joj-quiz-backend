const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Quiz, Question, QuizQuestion, User } = require('../models');
const authMiddleware = require('../middleware/auth');

// GET /api/quizzes
router.get('/', authMiddleware, async (req, res) => {
  try {
    const where = {
      [Op.or]: [{ is_preset: true }, { created_by: req.user.id }]
    };
    if (req.query.category) where.category = req.query.category;
    const quizzes = await Quiz.findAll({ where, order: [['is_preset', 'DESC'], ['created_at', 'DESC']] });
    res.json(quizzes);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// GET /api/quizzes/questions/all
router.get('/questions/all', authMiddleware, async (req, res) => {
  try {
    const where = {};
    if (req.query.category) where.category = req.query.category;
    if (req.query.difficulty) where.difficulty = req.query.difficulty;
    const questions = await Question.findAll({ where });
    res.json(questions);
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// GET /api/quizzes/:id
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findByPk(req.params.id, {
      include: [{
        model: Question,
        through: { attributes: ['order_index'] },
      }]
    });
    if (!quiz) return res.status(404).json({ error: 'Quiz not found' });
    // Sort questions by order_index
    const sorted = quiz.Questions.sort(
      (a, b) => a.QuizQuestion.order_index - b.QuizQuestion.order_index
    );
    res.json({ ...quiz.toJSON(), questions: sorted });
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// POST /api/quizzes — create custom quiz
router.post('/', authMiddleware, async (req, res) => {
  const { title, category, question_ids } = req.body;
  if (!title || !question_ids?.length)
    return res.status(400).json({ error: 'Title and questions required' });
  try {
    const quiz = await Quiz.create({ title, category, created_by: req.user.id, is_preset: false });
    await Promise.all(question_ids.map((qid, i) =>
      QuizQuestion.create({ quiz_id: quiz.id, question_id: qid, order_index: i })
    ));
    res.status(201).json({ id: quiz.id, message: 'Quiz created' });
  } catch { res.status(500).json({ error: 'Server error' }); }
});

// POST /api/quizzes/questions/add — admin only
router.post('/questions/add', authMiddleware, async (req, res) => {
  if (req.user.role !== 'admin')
    return res.status(403).json({ error: 'Admin only' });
  const { text, type, category, difficulty, options, correct_index, language } = req.body;
  if (!text || !options || correct_index === undefined)
    return res.status(400).json({ error: 'Missing fields' });
  try {
    const q = await Question.create({ text, type, category, difficulty, options, correct_index, language });
    res.status(201).json({ id: q.id, message: 'Question added' });
  } catch { res.status(500).json({ error: 'Server error' }); }
});

module.exports = router;
