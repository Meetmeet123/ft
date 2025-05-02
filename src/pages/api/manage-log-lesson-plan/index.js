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

    // GET - Fetch dropdowns, topic list, and lessons with topics
    if (req.method === 'GET') {
      const [classes] = await connection.execute('SELECT id, class FROM classes');
      const [sections] = await connection.execute('SELECT id, section FROM sections');
      const [subjectGroups] = await connection.execute('SELECT id, name FROM subject_groups');
      const [subjects] = await connection.execute('SELECT id, name FROM subjects');
      const [sessions] = await connection.execute('SELECT id, session FROM sessions');

      // Topic List with full info
      const [topicList] = await connection.execute(
        `SELECT 
          l.id, l.name,
          c.id AS class_id, c.class,
          se.id AS session_id, se.session,
          s.id AS section_id, s.section,
          sg.id AS subject_group_id, sg.name AS subject_group,
          sub.id AS subject_id, sub.name AS subject
        FROM lesson l
        LEFT JOIN classes c ON l.class_id = c.id
        LEFT JOIN sections s ON l.section_id = s.id
        LEFT JOIN subject_groups sg ON l.subject_group_id = sg.id
        LEFT JOIN subjects sub ON l.subject_id = sub.id
        LEFT JOIN sessions se ON l.session_id = se.id
        ORDER BY l.id DESC`
      );

      // 🔥 Get Lessons
      const [lessonsRaw] = await connection.execute(
        'SELECT id, name FROM lesson ORDER BY name'
      );

      // 🔥 Get Topics mapped to lessons
      const [topicsRaw] = await connection.execute(
        'SELECT id, name, lesson_id FROM topic ORDER BY name'
      );

      // 🔥 Merge Lessons and Topics
      const lessonList = lessonsRaw.map(lesson => ({
        ...lesson,
        topics: topicsRaw.filter(topic => topic.lesson_id === lesson.id)
      }));

      // ✅ Send all data
      res.status(200).json({
        classes,
        sections,
        sessions,
        subjectGroups,
        subjects,
        topicList,
        lessonList, // 🔥 For dropdown linking
      });
    }

    // POST - Add new lesson
    // POST - Add new lesson
    else if (req.method === 'POST') {
      const {
        class_id,
        section_id,
        subject_group_id,
        subject_id,
        session_id,
        name  // यहाँ name टॉपिक का नाम होगा
      } = req.body;

      // सभी फ़ील्ड्स की जाँच
      if (!class_id || !section_id || !subject_group_id || !subject_id || !session_id || !name) {
        return res.status(400).json({ error: 'सभी फ़ील्ड आवश्यक हैं' });
      }

      // सीधे lesson टेबल में इन्सर्ट
      const [result] = await connection.execute(
        `INSERT INTO lesson (
      class_id, 
      section_id, 
      subject_group_id, 
      subject_id, 
      session_id, 
      name
    ) VALUES (?, ?, ?, ?, ?, ?)`,
        [class_id, section_id, subject_group_id, subject_id, session_id, name]
      );

      res.status(201).json({
        message: 'पाठ योजना सफलतापूर्वक जोड़ी गई',
        id: result.insertId
      });
    }

    // PUT - Update lesson
    else if (req.method === 'PUT') {
      const { id, name, class_id, section_id, subject_group_id, subject_id, session_id } = req.body;

      if (!id || !name || !class_id || !section_id || !subject_group_id || !subject_id || !session_id) {
        return res.status(400).json({ error: 'All fields are required for update' });
      }

      await connection.execute(
        `UPDATE lesson 
         SET name = ?, class_id = ?, section_id = ?, subject_group_id = ?, subject_id = ?, session_id = ?
         WHERE id = ?`,
        [name, class_id, section_id, subject_group_id, subject_id, session_id, id]
      );

      res.status(200).json({ message: 'Lesson updated successfully' });
    }

    // Not Allowed
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