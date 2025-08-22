import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export async function handler(event) {
  const { username, content } = JSON.parse(event.body || '{}')
  if (!username || !content) return { statusCode: 400, body: 'Missing username or content' }

  const { error } = await supabase.from('posts').insert([{ username, content }])
  if (error) return { statusCode: 500, body: JSON.stringify({ error: error.message }) }

  return { statusCode: 200, body: 'Post added' }
}
