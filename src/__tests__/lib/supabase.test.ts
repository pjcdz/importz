import { supabase } from '@/lib/supabase'

describe('Supabase Client - Sprint 0', () => {
  it('exports configured supabase client', () => {
    expect(supabase).toBeDefined()
    expect(supabase.auth).toBeDefined()
    expect(supabase.from).toBeDefined()
    expect(typeof supabase.auth.getSession).toBe('function')
    expect(typeof supabase.auth.onAuthStateChange).toBe('function')
    expect(typeof supabase.auth.signInWithOAuth).toBe('function')
    expect(typeof supabase.auth.signOut).toBe('function')
  })

  it('supabase client has expected database methods', () => {
    expect(typeof supabase.from).toBe('function')
    
    // Test that from() returns chainable methods
    const queryBuilder = supabase.from('profiles')
    expect(queryBuilder).toBeDefined()
    expect(typeof queryBuilder.select).toBe('function')
    expect(typeof queryBuilder.insert).toBe('function')
  })

  it('validates basic supabase configuration', () => {
    // These should be set by jest.setup.js
    expect(process.env.NEXT_PUBLIC_SUPABASE_URL).toBeDefined()
    expect(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY).toBeDefined()
    expect(process.env.SUPABASE_SERVICE_ROLE_KEY).toBeDefined()
  })
})