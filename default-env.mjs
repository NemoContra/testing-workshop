import { writeFileSync } from 'fs';
import { join } from 'path';

const { log } = console;

const defaultEnv = `
TZ=UTC
`;

try {
  writeFileSync(join(process.cwd(), '.env'), defaultEnv.trim().concat('\n'), {
    flag: 'wx',
  });
  log('New .env file written');
} catch (e) {
  log('No .env written because it already existed');
}
