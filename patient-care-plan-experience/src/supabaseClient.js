import { createClient } from '@supabase/supabase-js'

// TODO: Place env vars in a common location supported by expo/react native
const REACT_APP_SUPABASE_URL="http://localhost:54321"
const REACT_APP_SUPABASE_ANON_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24ifQ.625_WdcF3KHqz5amU0x2X5WWHP-OEs_4qj0ssLNHzTs"

const supabaseUrl = REACT_APP_SUPABASE_URL
const supabaseAnonKey = REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)