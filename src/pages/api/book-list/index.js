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
      // Check if this is a request for the list (simplified version)
      if (req.query.type === "list") {
        const [rows] = await pool.query(`
          SELECT id, book_title as name 
          FROM books
        `);
        return res.status(200).json(rows);
      }

      // Fetch all books with full details
      const [rows] = await pool.query(`
        SELECT 
          id,
          book_title,
          description,
          book_no,
          isbn_no,
          publish,
          author,
          subject,
          rack_no,
          qty,
          available,
          book_price,
          postdate
        FROM books
        ${req.query.search ? `WHERE 
          book_title LIKE ? OR
          description LIKE ? OR
          book_no LIKE ? OR
          isbn_no LIKE ? OR
          publish LIKE ? OR
          author LIKE ? OR
          subject LIKE ? OR
          rack_no LIKE ?` : ''}
        ORDER BY postdate DESC
      `, req.query.search ? 
        Array(8).fill(`%${req.query.search}%`) : 
        []);

      return res.status(200).json(rows);
    }

    if (method === "POST") {
      const {
        book_title,
        description,
        book_no,
        isbn_no,
        publish,
        author,
        subject,
        rack_no,
        qty,
        book_price
      } = req.body;

      // Validate required fields
      if (!book_title || !book_no || !isbn_no || !publish || 
          !author || !subject || !rack_no || !qty || !book_price) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      const [result] = await pool.query(
        `INSERT INTO books (
          book_title, description, book_no, isbn_no, 
          publish, author, subject, rack_no, 
          qty, available, book_price, postdate
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())`,
        [
          book_title,
          description || null,
          book_no,
          isbn_no,
          publish,
          author,
          subject,
          rack_no,
          qty,
          qty, // Initially available = quantity
          book_price
        ]
      );

      return res.status(201).json({ 
        success: true, 
        insertedId: result.insertId 
      });
    }

    if (method === "PUT") {
      const { id } = req.query;
      const {
        book_title,
        description,
        book_no,
        isbn_no,
        publish,
        author,
        subject,
        rack_no,
        qty,
        book_price
      } = req.body;

      // Validate required fields
      if (!id) return res.status(400).json({ error: "Missing book ID" });
      if (!book_title || !book_no || !isbn_no || !publish || 
          !author || !subject || !rack_no || !qty || !book_price) {
        return res.status(400).json({ error: "Missing required fields" });
      }

      // Check if book exists
      const [book] = await pool.query(
        `SELECT qty, available FROM books WHERE id = ?`,
        [id]
      );

      if (book.length === 0) {
        return res.status(404).json({ error: "Book not found" });
      }

      const currentQty = book[0].qty;
      const currentAvailable = book[0].available;
      
      // Calculate new available quantity
      let newAvailable;
      if (qty > currentQty) {
        // If increasing total quantity, add difference to available
        newAvailable = currentAvailable + (qty - currentQty);
      } else if (qty < currentQty) {
        // If decreasing total quantity, subtract difference from available
        // But don't let available go below 0
        const reduction = currentQty - qty;
        newAvailable = Math.max(0, currentAvailable - reduction);
      } else {
        // Quantity unchanged, keep available count the same
        newAvailable = currentAvailable;
      }

      // Update book information
      await pool.query(
        `UPDATE books SET
          book_title = ?,
          description = ?,
          book_no = ?,
          isbn_no = ?,
          publish = ?,
          author = ?,
          subject = ?,
          rack_no = ?,
          qty = ?,
          available = ?,
          book_price = ?,
          postdate = NOW()
        WHERE id = ?`,
        [
          book_title,
          description || null,
          book_no,
          isbn_no,
          publish,
          author,
          subject,
          rack_no,
          qty,
          newAvailable,
          book_price,
          id
        ]
      );

      return res.status(200).json({ 
        success: true,
        message: "Book updated successfully"
      });
    }

    if (method === "DELETE") {
      const { id } = req.query;

      if (!id) return res.status(400).json({ error: "Missing book ID" });

      // Check if book exists
      const [book] = await pool.query(
        `SELECT id FROM books WHERE id = ?`,
        [id]
      );

      if (book.length === 0) {
        return res.status(404).json({ error: "Book not found" });
      }

      await pool.query(`DELETE FROM books WHERE id = ?`, [id]);

      return res.status(200).json({ 
        success: true,
        message: "Book deleted successfully"
      });
    }

    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ 
      error: "Internal Server Error", 
      details: error.message 
    });
  }
}