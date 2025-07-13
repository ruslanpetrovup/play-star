import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export interface Arbitrator {
  id: number;
  username: string;
  referralid: string;
}

export async function getArbitratorByReferralId(referralId: string): Promise<Arbitrator | null> {
  const res = await pool.query('SELECT id, username, referralId FROM arbitrators WHERE referralId = $1 LIMIT 1', [referralId]);
  return res.rows[0] || null;
}
