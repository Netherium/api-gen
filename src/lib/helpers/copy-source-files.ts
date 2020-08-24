import { promises as fs } from 'fs';
import * as path from 'path';

(async () => {
  /**
   *  Copies templates from src to ./lib/templates for development
   */
  const copyTemplateFiles = async (src: string, dest: any, excludedDirectories: string[] = []) => {
    const stat = await fs.lstat(src);
    const isDirectory = stat.isDirectory();
    if (isDirectory) {
      await fs.mkdir(dest, {recursive: true});
      for (const childItemName of (await fs.readdir(src))) {
        if (excludedDirectories.includes(childItemName)) {
          continue;
        }
        let baseFileName: string;
        const newSrcPath = path.join(src, childItemName);
        const newSrcStat = await fs.lstat(newSrcPath);
        const newSrcIsDirectory = newSrcStat.isDirectory();
        if (!newSrcIsDirectory) {
          baseFileName = childItemName + '.tmpl';
        } else {
          baseFileName = childItemName;
        }
        await copyTemplateFiles(newSrcPath, path.join(dest, baseFileName), excludedDirectories);
      }
    } else {
      await fs.copyFile(src, dest);
    }
  }

  try {
    await copyTemplateFiles('../neth-express-api-ts', 'src/lib/templates/server', [
      'node_modules', 'package-lock.json', 'img', '.idea', '.git',
      '.env.test', '.env.production', '.env', '.buildstatus', 'neth-api-gen-sample.json',
      'coverage', '.nyc_output', 'dist', 'server.ts'
    ]);
    await copyTemplateFiles('../neth-ng', 'src/lib/templates/client', [
      'node_modules', 'package-lock.json', 'img', '.idea', '.git',
      'coverage'
    ]);
  } catch (e) {
    console.log('Copy template files aborted', e);
  }
})();
