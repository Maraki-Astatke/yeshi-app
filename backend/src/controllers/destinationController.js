import pool from "../db/db.js";

export async function getAllDestinations(req, res) {
  try {
    const result = await pool.query(
      `SELECT id, title, location, description, price, image_url, duration_days, created_at
       FROM destinations
       ORDER BY created_at DESC`
    );

    return res.status(200).json({ destinations: result.rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function getDestinationById(req, res) {
  try {
    const { id } = req.params;
    
    // Convert id to integer
    const destinationId = parseInt(id);
    
    if (isNaN(destinationId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const result = await pool.query(
      `SELECT id, title, location, description, price, image_url, duration_days, created_at
       FROM destinations
       WHERE id = $1`,
      [destinationId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Destination not found" });
    }

    return res.status(200).json({ destination: result.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}

export async function deleteDestination(req, res) {
  try {
    const { id } = req.params;
    const destinationId = parseInt(id);
    
    if (isNaN(destinationId)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    // Check if destination exists
    const checkResult = await pool.query(
      'SELECT id FROM destinations WHERE id = $1',
      [destinationId]
    );

    if (checkResult.rows.length === 0) {
      return res.status(404).json({ message: "Destination not found" });
    }

    // Delete the destination
    await pool.query(
      'DELETE FROM destinations WHERE id = $1',
      [destinationId]
    );

    res.json({ message: "Destination deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

export async function createDestination(req, res) {
  try {
    const { title, location, description, price, image_url, duration_days } = req.body;

    const result = await pool.query(
      `INSERT INTO destinations (title, location, description, price, image_url, duration_days)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, title, location, description, price, image_url, duration_days`,
      [title, location, description, price, image_url, duration_days]
    );

    return res.status(201).json({ destination: result.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
}