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
      const [membersList] = await connection.execute(
        `SELECT 
            s.id,
            s.admission_no,
            CONCAT(s.firstname, ' ', COALESCE(s.middlename, ''), ' ', s.lastname) AS student_name,
            s.mobileno AS phone,
            lm.member_id,
            lm.library_card_no,
            lm.member_type
          FROM students s
          LEFT JOIN libarary_members lm ON s.id = lm.student_id
          ORDER BY s.firstname, s.lastname ASC`
      );

      const formattedMembersList = membersList.map(member => ({
        id: member.id,
        student_name: member.student_name,
        admission_no: member.admission_no,
        phone: member.phone,
        member_id: member.member_id,
        library_card_no: member.library_card_no,
        member_type: member.member_type
      }));

      return res.status(200).json(formattedMembersList);
    }

    return res.status(405).json({ error: 'Method not allowed' });
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
