import { writeFileSync } from 'fs';
import { join } from 'path';

const { log } = console;

const defaultEnv = {
  TZ: 'UTC',
};

try {
  writeFileSync(
    join(process.cwd(), '.env'),
    Object.entries(defaultEnv)
      .map(([k, v]) => `${k}=${v}`)
      .join('\n')
      .concat('\n'),
    {
      flag: 'wx',
    }
  );
  log('New .env file written');
} catch (e) {
  log('No .env written because it already existed');
}
