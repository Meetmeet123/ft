// pages/api/hostel.js
import mysql from "mysql2";

// Create a connection pool
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "dltschool64latest",
}).promise();

export default async function handler(req, res) {
  const method = req.method;

  try {
    if (method === "GET") {
      // Fetch all hostels
      const [rows] = await pool.query("SELECT * FROM hostel ORDER BY created_at DESC");
      return res.status(200).json(rows);
    }

    if (method === "POST") {
      const { hostel_name, type, address, intake, description } = req.body;

      if (!hostel_name || !type) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      await pool.query(
        `INSERT INTO hostel (hostel_name, type, address, intake, description) VALUES (?, ?, ?, ?, ?)`,
        [hostel_name, type, address || "", intake || null, description || ""]
      );

      return res.status(201).json({ success: true });
    }

    if (method === "PUT") {
      const { id } = req.query;
      const { hostel_name, type, address, intake, description } = req.body;

      if (!id) return res.status(400).json({ error: "Missing ID" });

      await pool.query(
        `UPDATE hostel SET hostel_name=?, type=?, address=?, intake=?, description=? WHERE id=?`,
        [hostel_name, type, address || "", intake || null, description || "", id]
      );

      return res.status(200).json({ success: true });
    }

    if (method === "DELETE") {
      const { id } = req.query;
      if (!id) return res.status(400).json({ error: "Missing ID" });

      await pool.query("DELETE FROM hostel WHERE id = ?", [id]);

      return res.status(200).json({ success: true });
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
