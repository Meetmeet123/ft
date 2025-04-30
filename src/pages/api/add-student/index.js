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

    // GET - Fetch data for dropdowns and student list
    if (req.method === 'GET') {
      const [classes] = await connection.execute('SELECT id, class FROM classes');
      const [sections] = await connection.execute('SELECT id, section FROM sections');

      // If class_id and section_id are provided in query params, filter students
      if (req.query.class_id && req.query.section_id) {
        const [students] = await connection.execute(
          `SELECT 
            s.id,
            s.admission_no,
            CONCAT(s.firstname, ' ', COALESCE(s.middlename, ''), ' ', s.lastname) AS student_name,
            c.class,
            sec.section,
            s.father_name,
            s.dob AS date_of_birth,
            s.gender,
            s.mobileno AS mobile_number,
            lm.member_id,
            lm.library_card_no
          FROM students s
          LEFT JOIN classes c ON s.class_id = c.id
          LEFT JOIN sections sec ON s.section_id = sec.id
          LEFT JOIN libarary_members lm ON s.id = lm.student_id
          WHERE s.class_id = ? AND s.section_id = ?
          ORDER BY s.firstname, s.lastname ASC`,
          [req.query.class_id, req.query.section_id]
        );

        return res.status(200).json({
          classes,
          sections,
          students
        });
      }

      // If no filters, just return dropdown data
      res.status(200).json({
        classes,
        sections
      });

    } 
    // POST - Add new student (if needed)
    else if (req.method === 'POST') {
      const { 
        admission_no, 
        firstname,
        middlename,
        lastname,
        class_id, 
        section_id, 
        father_name, 
        dob, 
        gender, 
        mobileno,
        member_id,
        library_card_no
      } = req.body;

      if (!firstname || !lastname || !class_id || !section_id || !admission_no) {
        return res.status(400).json({ error: 'Required fields: firstname, lastname, class_id, section_id, admission_no' });
      }

      // Start transaction
      await connection.beginTransaction();

      try {
        // Insert student
        const [studentResult] = await connection.execute(
          `INSERT INTO students (
            admission_no, firstname, middlename, lastname, 
            class_id, section_id, father_name, dob, gender, mobileno
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            admission_no,
            firstname,
            middlename || null,
            lastname,
            class_id,
            section_id,
            father_name || null,
            dob || null,
            gender || null,
            mobileno || null
          ]
        );

        const studentId = studentResult.insertId;

        // Insert library member if data provided
        if (member_id || library_card_no) {
          await connection.execute(
            `INSERT INTO libarary_members (
              member_id, library_card_no, student_id
            ) VALUES (?, ?, ?)`,
            [
              member_id || null,
              library_card_no || null,
              studentId
            ]
          );
        }

        // Commit transaction
        await connection.commit();

        res.status(201).json({ 
          message: 'Student added successfully', 
          id: studentId 
        });

      } catch (error) {
        // Rollback transaction if any error occurs
        await connection.rollback();
        throw error;
      }

    } 
    // PUT - Update student (if needed)
    else if (req.method === 'PUT') {
      const { 
        id,
        admission_no, 
        firstname,
        middlename,
        lastname,
        class_id, 
        section_id, 
        father_name, 
        dob, 
        gender, 
        mobileno,
        member_id,
        library_card_no
      } = req.body;

      if (!id || !firstname || !lastname || !class_id || !section_id || !admission_no) {
        return res.status(400).json({ error: 'Required fields: id, firstname, lastname, class_id, section_id, admission_no' });
      }

      // Start transaction
      await connection.beginTransaction();

      try {
        // Update student
        await connection.execute(
          `UPDATE students SET
            admission_no = ?,
            firstname = ?,
            middlename = ?,
            lastname = ?,
            class_id = ?,
            section_id = ?,
            father_name = ?,
            dob = ?,
            gender = ?,
            mobileno = ?
          WHERE id = ?`,
          [
            admission_no,
            firstname,
            middlename || null,
            lastname,
            class_id,
            section_id,
            father_name || null,
            dob || null,
            gender || null,
            mobileno || null,
            id
          ]
        );

        // Update or insert library member
        if (member_id || library_card_no) {
          // Check if library member exists
          const [existingMember] = await connection.execute(
            'SELECT id FROM libarary_members WHERE student_id = ?',
            [id]
          );

          if (existingMember.length > 0) {
            // Update existing
            await connection.execute(
              `UPDATE libarary_members SET
                member_id = ?,
                library_card_no = ?
              WHERE student_id = ?`,
              [
                member_id || null,
                library_card_no || null,
                id
              ]
            );
          } else {
            // Insert new
            await connection.execute(
              `INSERT INTO libarary_members (
                member_id, library_card_no, student_id
              ) VALUES (?, ?, ?)`,
              [
                member_id || null,
                library_card_no || null,
                id
              ]
            );
          }
        }

        // Commit transaction
        await connection.commit();

        res.status(200).json({ message: 'Student updated successfully' });

      } catch (error) {
        // Rollback transaction if any error occurs
        await connection.rollback();
        throw error;
      }

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