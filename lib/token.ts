import { createHash, randomBytes } from 'crypto';

export const getVerificationToken = (): string =>
    createHash('sha256').update(randomBytes(256)).digest('hex');
