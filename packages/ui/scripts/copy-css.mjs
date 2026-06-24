import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');

mkdirSync(dist, { recursive: true });
copyFileSync(join(root, 'src/styles/styles.css'), join(dist, 'styles.css'));
copyFileSync(join(root, 'src/styles/theme.css'), join(dist, 'theme.css'));
