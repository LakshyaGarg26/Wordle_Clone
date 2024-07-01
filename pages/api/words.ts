import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const filePath = path.resolve('public', 'words.txt');
  const fileContents = fs.readFileSync(filePath, 'utf-8');
  const words = fileContents.split('\n').map(word => word.trim()).filter(word => word.length === 5);
  res.setHeader('Cache-Control', 'no-store'); // Ensure no caching
  res.status(200).json(words);
}
