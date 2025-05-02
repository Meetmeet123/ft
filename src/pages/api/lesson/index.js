import mysql from 'mysql2/promise';
import { parse } from 'json2csv';

export default async function handler(req, res) {
  let connection;

  try {
    connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'dltschool64latest',
    });

    // ✅ Export CSV Logic
    if (req.method === 'GET' && req.query.export === 'csv') {
      const [lessons] = await connection.execute(`
        SELECT 
          l.id, l.name AS topic_name,
          c.class AS class_name,
          s.section AS section_name,
          sg.name AS subject_group,
          sub.name AS subject
        FROM lesson l
        LEFT JOIN classes c ON l.class_id = c.id
        LEFT JOIN sections s ON l.section_id = s.id
        LEFT JOIN subject_groups sg ON l.subject_group_id = sg.id
        LEFT JOIN subjects sub ON l.subject_id = sub.id
      `);

      const csv = parse(lessons);
      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=lessons.csv');
      return res.status(200).send(csv);
    }

    // 👇 Existing GET Logic for dropdowns and topic list
    if (req.method === 'GET') {
      const [classes] = await connection.execute('SELECT id, class FROM classes');
      const [sections] = await connection.execute('SELECT id, section FROM sections');
      const [subjectGroups] = await connection.execute('SELECT id, name FROM subject_groups');
      const [subjects] = await connection.execute('SELECT id, name FROM subjects');

      const [topicList] = await connection.execute(`
        SELECT 
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
        ORDER BY l.id DESC
      `);

      res.status(200).json({
        classes,
        sections,
        subjectGroups,
        subjects,
        topicList
      });

    } else if (req.method === 'POST') {
      const { class_id, section_id, subject_group_id, subject_id, name } = req.body;

      if (!class_id || !section_id || !subject_group_id || !subject_id || !name) {
        return res.status(400).json({ error: 'All fields are required' });
      }

      await connection.execute(
        `INSERT INTO lesson (class_id, section_id, subject_group_id, subject_id, name)
         VALUES (?, ?, ?, ?, ?)`,
        [class_id, section_id, subject_group_id, subject_id, name]
      );

      res.status(201).json({ message: 'Lesson inserted successfully' });

    } else if (req.method === 'PUT') {
      const { id, class_id, section_id, subject_group_id, subject_id, name } = req.body;

      if (!id || !class_id || !section_id || !subject_group_id || !subject_id || !name) {
        return res.status(400).json({ error: 'All fields are required for update' });
      }

      await connection.execute(
        `UPDATE lesson 
         SET class_id = ?, section_id = ?, subject_group_id = ?, subject_id = ?, name = ?
         WHERE id = ?`,
        [class_id, section_id, subject_group_id, subject_id, name, id]
      );

      res.status(200).json({ message: 'Lesson updated successfully' });

    } else if (req.method === 'DELETE') {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: 'Lesson ID is required for deletion' });
      }

      await connection.execute(`DELETE FROM lesson WHERE id = ?`, [id]);

      res.status(200).json({ message: 'Lesson deleted successfully' });

    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }

  } catch (error) {
    console.error('❌ API Error:', error);
    res.status(500).json({ error: 'Internal Server Error', detail: error.message });
  } finally {
    if (connection) await connection.end();
  }
}
