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
      const [rows] = await pool.query(
        "SELECT id, type, description FROM hostel"
      );
      return res.status(200).json(rows);
    }

    if (method === "POST") {
      const { type, description } = req.body;

      if (!type) {
        return res.status(400).json({ error: "Type is required" });
      }

      const [result] = await pool.query(
        "INSERT INTO hostel (type, description) VALUES (?, ?)",
        [type, description]
      );

      return res.status(201).json({ 
        success: true, 
        insertedId: result.insertId 
      });
    }

    if (method === "PUT") {
      const { id } = req.query;
      const { type, description } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Missing ID" });
      }

      await pool.query(
        "UPDATE hostel SET type = ?, description = ? WHERE id = ?",
        [type, description, id]
      );

      return res.status(200).json({ success: true });
    }

    if (method === "DELETE") {
      const { id } = req.query;

      if (!id) {
        return res.status(400).json({ error: "Missing ID" });
      }

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