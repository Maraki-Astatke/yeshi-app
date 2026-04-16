import pool from "../db/db.js";

export async function addFavorite(req, res) {
  try {
    const { destination_id } = req.body;
    const user_id = req.user.id;

    const result = await pool.query(
      `INSERT INTO favorites (user_id, destination_id)
       VALUES ($1, $2)
       RETURNING *`,
      [user_id, destination_id]
    );

    res.status(201).json({ favorite: result.rows[0] });
  } catch (error) {
    if (error.code === '23505') {
      return res.status(400).json({ message: 'Destination already in favorites' });
    }
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function removeFavorite(req, res) {
  try {
    const { destination_id } = req.params;
    const user_id = req.user.id;

    const result = await pool.query(
      `DELETE FROM favorites
       WHERE user_id = $1 AND destination_id = $2
       RETURNING *`,
      [user_id, destination_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Favorite not found' });
    }

    res.json({ message: 'Removed from favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function getUserFavorites(req, res) {
  try {
    const user_id = req.user.id;

    const result = await pool.query(
      `SELECT d.*, f.created_at as favorited_at
       FROM favorites f
       JOIN destinations d ON f.destination_id = d.id
       WHERE f.user_id = $1
       ORDER BY f.created_at DESC`,
      [user_id]
    );

    res.json({ favorites: result.rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

export async function checkFavorite(req, res) {
  try {
    const { destination_id } = req.params;
    const user_id = req.user.id;

    const result = await pool.query(
      `SELECT * FROM favorites
       WHERE user_id = $1 AND destination_id = $2`,
      [user_id, destination_id]
    );

    res.json({ isFavorite: result.rows.length > 0 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}