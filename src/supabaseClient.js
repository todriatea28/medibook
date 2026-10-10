import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'შენი_პროექტის_URL'
const supabaseAnonKey = 'შენი_ANON_გასაღები'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)