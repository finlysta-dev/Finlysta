import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

export async function query(text: string, params?: any[]) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
}

export async function getOpportunities() {
  const result = await query(`
    SELECT 
      id, slug, title, company, company_logo as "companyLogo",
      about_company as "aboutCompany", type, work_mode as "workMode",
      location, experience, duration, salary, skills,
      overview, responsibilities, qualifications, benefits,
      apply_link as "applyLink", is_new as "isNew", is_verified as "isVerified",
      is_trending as "isTrending", is_actively_hiring as "isActivelyHiring",
      posted_at as "postedAt", deadline, views, apply_clicks as "applyClicks"
    FROM opportunities 
    WHERE published = true 
    ORDER BY posted_at DESC
  `);
  return result.rows;
}
