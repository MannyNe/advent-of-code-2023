import { promises as fsPromises } from 'fs';
import path from 'path';

export default async function toArray(filename: string) {
  try {
    const absolute = path.join(__dirname, '../inputs');
    const contents = await fsPromises.readFile(
      `${absolute}/${filename}`,
      'utf-8'
    );

    const arr = contents.split(/\r?\n+/);

    return arr;
  } catch (err: unknown) {
    console.log(err);
    new Error(`Error: ${err}`);
    return [];
  }
}
