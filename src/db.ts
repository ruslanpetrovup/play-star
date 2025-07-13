import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export interface Arbitrator {
  id: number;
  username: string;
  referral_id: string;
}

export async function getArbitratorByReferralId(referral_id: string): Promise<Arbitrator | null> {
  const res = await pool.query('SELECT id, username, referral_id FROM arbitrators WHERE referral_id = $1 LIMIT 1', [referral_id]);
  return res.rows[0] || null;
}
