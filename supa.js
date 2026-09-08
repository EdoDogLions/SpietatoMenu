// Connessione a Supabase — Osteria Lo Spietato
export const SUPABASE_URL = 'https://oxredhrvfoyngyauogad.supabase.co';
export const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im94cmVkaHJ2Zm95bmd5YXVvZ2FkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg4NDE2NzUsImV4cCI6MjEwNDQxNzY3NX0.gwnfIDB7AJmleF2ABtqFN2pmiM7CDyZwCxN3y9IFmrc';

const headers = token => ({
  apikey: SUPABASE_KEY,
  Authorization: 'Bearer ' + (token || SUPABASE_KEY),
  'Content-Type': 'application/json'
});

export async function fetchMenu() {
  const r = await fetch(SUPABASE_URL + '/rest/v1/menu?id=eq.1&select=data', { headers: headers() });
  if (!r.ok) throw new Error('lettura ' + r.status);
  const rows = await r.json();
  const d = rows[0] && rows[0].data;
  return d && d.categorie ? d : null;
}

export async function pushMenu(data, token) {
  const r = await fetch(SUPABASE_URL + '/rest/v1/menu?id=eq.1', {
    method: 'PATCH',
    headers: { ...headers(token), Prefer: 'return=minimal' },
    body: JSON.stringify({ data, updated_at: new Date().toISOString() })
  });
  if (r.status === 401 || r.status === 403) throw new Error('sessione');
  if (!r.ok) throw new Error('scrittura ' + r.status);
}

export async function signIn(email, password) {
  const r = await fetch(SUPABASE_URL + '/auth/v1/token?grant_type=password', {
    method: 'POST',
    headers: { apikey: SUPABASE_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!r.ok) throw new Error('credenziali');
  const j = await r.json();
  return j.access_token;
}
