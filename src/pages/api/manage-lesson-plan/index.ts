// pages/api/teachers.ts
import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const jsonDirectory = path.join(process.cwd(), 'public');
    const fileContents = await fs.readFile(jsonDirectory + '/teachers.json', 'utf8');
    res.status(200).json(JSON.parse(fileContents));
  } catch (error) {
    res.status(500).json({ error: 'Error reading teachers data' });
  }
}