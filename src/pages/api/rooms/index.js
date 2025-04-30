import mysql from "mysql2";

// Create connection pool
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
      // Fetch rooms with joined hostel data
      const [rows] = await pool.query(`
        SELECT 
          hostel_rooms.id,
          hostel_rooms.room_no,
          hostel_rooms.no_of_bed,
          hostel_rooms.cost_per_bed,
          hostel_rooms.hostel_warden,
          hostel_rooms.hostel_id,
          hostel.hostel_name,
          hostel.type,
          hostel.description
        FROM hostel_rooms
        JOIN hostel ON hostel_rooms.hostel_id = hostel.id
      `);
      return res.status(200).json(rows);
    }

    if (method === "POST") {
      const { room_no, hostel_id, no_of_bed, cost_per_bed, hostel_warden } = req.body;

      if (!room_no || !hostel_id || !no_of_bed || !cost_per_bed) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const [result] = await pool.query(
        `INSERT INTO hostel_rooms (room_no, hostel_id, no_of_bed, cost_per_bed, hostel_warden)
         VALUES (?, ?, ?, ?, ?)`,
        [room_no, hostel_id, no_of_bed, cost_per_bed, hostel_warden]
      );

      return res.status(201).json({ success: true, insertedId: result.insertId });
    }

    if (method === "PUT") {
      const { id } = req.query;
      const { room_no, hostel_id, no_of_bed, cost_per_bed, hostel_warden } = req.body;

      if (!id) return res.status(400).json({ error: "Missing ID in query" });

      await pool.query(
        `UPDATE hostel_rooms
         SET room_no = ?, hostel_id = ?, no_of_bed = ?, cost_per_bed = ?, hostel_warden = ?
         WHERE id = ?`,
        [room_no, hostel_id, no_of_bed, cost_per_bed, hostel_warden, id]
      );

      return res.status(200).json({ success: true });
    }

    if (method === "DELETE") {
      const { id } = req.query;

      if (!id) return res.status(400).json({ error: "Missing ID in query" });

      await pool.query(`DELETE FROM hostel_rooms WHERE id = ?`, [id]);

      return res.status(200).json({ success: true });
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
}
