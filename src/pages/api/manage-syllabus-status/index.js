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

    // GET - Fetch data for dropdowns and topic list
    if (req.method === 'GET') {
      const [classes] = await connection.execute('SELECT id, class FROM classes');
      const [sections] = await connection.execute('SELECT id, section FROM sections');
      const [subjectGroups] = await connection.execute('SELECT id, name FROM subject_groups');
      const [subjects] = await connection.execute('SELECT id, name FROM subjects');

      const [topicList] = await connection.execute(
        `SELECT 
          l.id, l.name,
          c.id AS class_id, c.class,
          s.id AS section_id, s.section,
          sg.id AS subject_group_id, sg.name AS subject_group,
          sub.id AS subject_id, sub.name AS subject
        FROM lesson l
        LEFT JOIN classes c ON l.class_id = c.id
        LEFT JOIN sections s ON l.section_id = s.id
        LEFT JOIN subject_groups sg ON l.subject_group_id = sg.id
        LEFT JOIN subjects sub ON l.subject_id = sub.id
        ORDER BY l.id DESC`
      );

      res.status(200).json({
        classes,
        sections,
        subjectGroups,
        subjects,
        topicList
      });

    } 
    // POST - Add new topic
    else if (req.method === 'POST') {
      const { class_id, section_id, subject_group_id, subject_id, name } = req.body;

      if (!class_id || !section_id || !subject_group_id || !subject_id || !name) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      const [result] = await connection.execute(
        `INSERT INTO lesson (class_id, section_id, subject_group_id, subject_id, name)
         VALUES (?, ?, ?, ?, ?)`,
        [class_id, section_id, subject_group_id, subject_id, name]
      );

      res.status(201).json({ message: 'Topic added successfully', id: result.insertId });

    } 
    // PUT - Update topic
    else if (req.method === 'PUT') {
      const { id, name, class_id, section_id, subject_group_id, subject_id } = req.body;

      if (!id || !name || !class_id || !section_id || !subject_group_id || !subject_id) {
        return res.status(400).json({ error: 'All fields are required for update' });
      }

      await connection.execute(
        `UPDATE lesson 
         SET name = ?, class_id = ?, section_id = ?, subject_group_id = ?, subject_id = ?
         WHERE id = ?`,
        [name, class_id, section_id, subject_group_id, subject_id, id]
      );

      res.status(200).json({ message: 'Topic updated successfully' });

    } 
    else {
      res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Internal Server Error', detail: error.message });
  } finally {
    if (connection) await connection.end();
  }
}
