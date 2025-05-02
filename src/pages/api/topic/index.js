import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  let connection;

  try {
    // DB connection
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'dltschool64latest',
    });

    // -------- GET Method --------
    if (req.method === 'GET') {
      const [classes] = await connection.execute('SELECT id, class FROM classes');
      const [sections] = await connection.execute('SELECT id, section FROM sections');
      const [subjectGroups] = await connection.execute('SELECT id, name FROM subject_groups');
      const [subjects] = await connection.execute('SELECT id, name FROM subjects');
      const [lessons] = await connection.execute('SELECT id, name FROM lesson');
      const [sessions] = await connection.execute('SELECT id, session FROM sessions');

      const [topicList] = await connection.execute(`
        SELECT 
          t.id, t.name, c.class, s.section, sg.name AS subject_group,
          sub.name AS subject, l.name AS lesson
        FROM topic t
        LEFT JOIN classes c ON t.class_id = c.id
        LEFT JOIN sections s ON t.section_id = s.id
        LEFT JOIN subject_groups sg ON t.subject_group_id = sg.id
        LEFT JOIN subjects sub ON t.subject_id = sub.id
        LEFT JOIN lesson l ON t.lesson_id = l.id
        ORDER BY t.id DESC
      `);

      res.status(200).json({
        classes,
        sections,
        subjectGroups,
        subjects,
        lessons,
        sessions,
        topicList
      });

    // -------- POST Method (Insert) --------
    } else if (req.method === 'POST') {
      const {
        class_id,
        section_id,
        subject_group_id,
        subject_id,
        lesson_id,
        name
      } = req.body;

      if (!class_id || !section_id || !subject_group_id || !subject_id || !lesson_id || !name) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const [result] = await connection.execute(
        `INSERT INTO topic (class_id, section_id, subject_group_id, subject_id, lesson_id, name)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [class_id, section_id, subject_group_id, subject_id, lesson_id, name]
      );

      res.status(201).json({ message: 'Topic inserted successfully', id: result.insertId });

    // -------- PUT Method (Update) --------
    } else if (req.method === 'PUT') {
      const {
        id,
        class_id,
        section_id,
        subject_group_id,
        subject_id,
        lesson_id,
        name
      } = req.body;

      if (!id || !class_id || !section_id || !subject_group_id || !subject_id || !lesson_id || !name) {
        return res.status(400).json({ error: 'All fields are required for update' });
      }

      await connection.execute(
        `UPDATE topic
         SET class_id = ?, section_id = ?, subject_group_id = ?, subject_id = ?, lesson_id = ?, name = ?
         WHERE id = ?`,
        [class_id, section_id, subject_group_id, subject_id, lesson_id, name, id]
      );

      res.status(200).json({ message: 'Topic updated successfully' });

    // -------- DELETE Method --------
    } else if (req.method === 'DELETE') {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Topic ID is required for delete' });
      }

      await connection.execute(`DELETE FROM topic WHERE id = ?`, [id]);

      res.status(200).json({ message: 'Topic deleted successfully' });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('❌ API Error:', error);
    res.status(500).json({ error: 'Internal Server Error', detail: error.message });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}
