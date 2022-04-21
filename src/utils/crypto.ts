import { createHash } from 'crypto';
function encrypt(algorithm: string, content: string) {
  const hash = createHash(algorithm);
  hash.update(content);
  return hash.digest('hex');
}

export function md5(content: string) {
  return encrypt('md5', content);
}
