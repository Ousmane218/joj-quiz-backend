const express = require('express');
const router = express.Router();

// GET /api/fun-fact?category=histoire
router.get('/', async (req, res) => {
  const { category = 'joj' } = req.query;

  // Static fallbacks (no Gemini API key needed for now)
  const facts = {
    histoire: [
      "Les Jeux Olympiques de la Jeunesse ont été créés en 2007 par Jacques Rogge, alors président du CIO.",
      "La première édition des JOJ d'été s'est tenue à Singapour en 2010 avec 3 600 athlètes de 204 pays.",
      "Dakar 2026 sera la première édition des JOJ organisée sur le continent africain.",
    ],
    athletisme: [
      "Le record du monde du 100m est détenu par Usain Bolt avec 9.58 secondes, établi à Berlin en 2009.",
      "Le marathon mesure exactement 42,195 km depuis les Jeux Olympiques de Londres en 1908.",
      "La technique Fosbury Flop en saut en hauteur a été introduite par Dick Fosbury aux JO de 1968.",
    ],
    nations: [
      "Le Sénégal a participé aux Jeux Olympiques pour la première fois en 1964 à Tokyo.",
      "206 nations font partie du Comité International Olympique.",
      "La flamme olympique parcourt toujours le pays organisateur avant les Jeux.",
    ],
    champions: [
      "Michael Phelps est l'athlète le plus médaillé de l'histoire olympique avec 28 médailles.",
      "Usain Bolt est le seul athlète à avoir remporté l'or au 100m et 200m lors de trois Jeux consécutifs.",
      "Simone Biles détient plus de médailles mondiales en gymnastique que tout autre gymnaste.",
    ],
  };

  const list = facts[category] || facts['histoire'];
  const fact = list[Math.floor(Math.random() * list.length)];
  res.json({ fact, category });
});

module.exports = router;
