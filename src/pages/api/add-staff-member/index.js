import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'dltschool64latest',
    });

    if (req.method === 'GET') {
      const [staffList] = await connection.execute(
        `SELECT 
          s.id,
          lm.member_id,
          lm.library_card_no,
          CONCAT(s.name, ' ', s.surname) AS staff_name,
          s.email,
          s.dob AS date_of_birth,
          s.contact_no AS phone
        FROM staff s
        LEFT JOIN libarary_members lm ON s.id = lm.staff_id
        ORDER BY s.name ASC`
      );

      const formattedStaffList = staffList.map(staff => ({
        id: staff.id,
        member_id: staff.member_id || null,
        library_card_no: staff.library_card_no || null,
        staff_name: staff.staff_name || '',
        email: staff.email || '',
        date_of_birth: staff.date_of_birth ? 
          new Date(staff.date_of_birth).toLocaleDateString('en-GB') : '',
        phone: staff.phone || ''
      }));

      return res.status(200).json(formattedStaffList);
    }

    else if (req.method === 'PUT') {
      const { id, library_card_no, action } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Staff ID is required' });
      }

      await connection.beginTransaction();

      try {
        const [staff] = await connection.execute(
          'SELECT id FROM staff WHERE id = ?', 
          [id]
        );

        if (staff.length === 0) {
          await connection.rollback();
          return res.status(404).json({ error: 'Staff member not found' });
        }

        if (action === 'remove') {
          await connection.execute(
            'UPDATE libarary_members SET library_card_no = NULL WHERE staff_id = ?',
            [id]
          );
        } else {
          if (!library_card_no) {
            await connection.rollback();
            return res.status(400).json({ error: 'Library card number is required' });
          }

          const randomNum = Math.floor(1000 + Math.random() * 9000);
          const member_id = `${randomNum}`; // Modified here to exclude date part

          await connection.execute(
            `INSERT INTO libarary_members (staff_id, member_id, library_card_no)
             VALUES (?, ?, ?)
             ON DUPLICATE KEY UPDATE 
               member_id = VALUES(member_id),
               library_card_no = VALUES(library_card_no)`,
            [id, member_id, library_card_no]
          );

          await connection.commit();
          return res.status(200).json({ 
            success: true,
            member_id,
            library_card_no
          });
        }

        await connection.commit();
        return res.status(200).json({ success: true });

      } catch (error) {
        await connection.rollback();
        console.error('Transaction error:', error);
        return res.status(500).json({ 
          error: 'Database operation failed',
          detail: error.message 
        });
      }
    }

    else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Internal Server Error', 
      detail: error.message 
    });
  } finally {
    if (connection) await connection.end();
  }
}
