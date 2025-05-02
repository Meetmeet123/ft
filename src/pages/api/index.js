// app/api/topic/route.js

import mysql from "mysql2/promise";

const connectionConfig = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "dltschool64latest",
};

export async function GET(req) {
  const connection = await mysql.createConnection(connectionConfig);
  const url = new URL(req.url);
  const isDropdown = url.searchParams.get("dropdowns");

  if (isDropdown) {
    const [classes] = await connection.execute("SELECT id, class FROM classes");
    const [sections] = await connection.execute("SELECT id, section FROM sections");
    const [subjectGroups] = await connection.execute("SELECT id, name FROM subject_groups");
    const [subjects] = await connection.execute("SELECT id, name FROM subjects");
    const [lessons] = await connection.execute("SELECT id, name FROM lesson");

    await connection.end();
    return new Response(JSON.stringify({
      classes,
      sections,
      subjectGroups,
      subjects,
      lessons,
    }), { status: 200 });
  }

  const [topics] = await connection.execute(`
    SELECT 
      t.id,
      c.class,
      s.section,
      sg.name AS subject_group,
      sub.name AS subject,
      l.name AS lesson,
      t.name AS topic_name
    FROM topic t
    JOIN classes c ON t.class_id = c.id
    JOIN sections s ON t.section_id = s.id
    JOIN subject_groups sg ON t.subject_group_id = sg.id
    JOIN subjects sub ON t.subject_id = sub.id
    JOIN lesson l ON t.lesson_id = l.id
    ORDER BY t.id DESC
  `);

  await connection.end();
  return new Response(JSON.stringify(topics), { status: 200 });
}

export async function POST(req) {
  const connection = await mysql.createConnection(connectionConfig);
  const body = await req.json();

  const {
    class_id,
    section_id,
    subject_group_id,
    subject_id,
    lesson_id,
    topics = [],
  } = body;

  for (let topic of topics) {
    if (topic.trim()) {
      await connection.execute(
        `INSERT INTO topic (class_id, section_id, subject_group_id, subject_id, lesson_id, name)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [class_id, section_id, subject_group_id, subject_id, lesson_id, topic.trim()]
      );
    }
  }

  await connection.end();
  return new Response(JSON.stringify({ status: "success", message: "Topics added" }), { status: 200 });
}

export async function DELETE(req) {
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  const connection = await mysql.createConnection(connectionConfig);
  await connection.execute("DELETE FROM topic WHERE id = ?", [id]);
  await connection.end();

  return new Response(JSON.stringify({ status: "success", message: "Topic deleted" }), { status: 200 });
}
