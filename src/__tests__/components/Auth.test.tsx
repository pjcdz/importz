import { render, screen, waitFor, act } from '@testing-library/react'
import '@testing-library/jest-dom'
import Auth from '@/components/Auth'
import { supabase } from '@/lib/supabase'

// Mock Supabase with proper types
jest.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: jest.fn(),
      onAuthStateChange: jest.fn(),
      signInWithOAuth: jest.fn(),
      signOut: jest.fn(),
      getUser: jest.fn(),
    },
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn()
        }))
      })),
      insert: jest.fn(() => ({
        select: jest.fn(() => ({
          single: jest.fn()
        }))
      }))
    }))
  },
  createSupabaseAdmin: jest.fn()
}))

// Type the mocked supabase
const mockSupabase = supabase as jest.Mocked<typeof supabase>

describe('Auth Component - Sprint 0', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    
    // Mock auth methods with proper Jest types
    ;(mockSupabase.auth.getSession as jest.MockedFunction<typeof mockSupabase.auth.getSession>)
      .mockResolvedValue({
        data: { session: null },
        error: null
      })
    
    // Mock onAuthStateChange with proper Subscription type
    ;(mockSupabase.auth.onAuthStateChange as jest.MockedFunction<typeof mockSupabase.auth.onAuthStateChange>)
      .mockReturnValue({
        data: { 
          subscription: {
            id: 'mock-subscription-id',
            callback: jest.fn(),
            unsubscribe: jest.fn()
          }
        }
      })
  })

  it('shows Importz title and Google login when not authenticated', async () => {
    await act(async () => {
      render(<Auth />)
    })
    
    await waitFor(() => {
      expect(screen.getByText('Importz')).toBeInTheDocument()
      expect(screen.getByText('Iniciar sesión con Google')).toBeInTheDocument()
    })
  })

  it('displays welcome message when authenticated', async () => {
    const mockUser = {
      id: '03e19010-4b48-430e-9368-3813317dbde7',
      email: 'cardozopabloj@gmail.com',
      user_metadata: { full_name: 'Pablo Cardozo' }
    }
    
    const mockProfile = {
      id: '03e19010-4b48-430e-9368-3813317dbde7',
      email: 'cardozopabloj@gmail.com',
      full_name: 'Pablo Cardozo',
      avatar_url: null,
      role: 'comprador' as const,
      created_at: '2025-05-29',
      updated_at: '2025-05-29'
    }

    ;(mockSupabase.auth.getSession as jest.MockedFunction<typeof mockSupabase.auth.getSession>)
      .mockResolvedValue({
        data: { session: { user: mockUser } as any },
        error: null
      })

    ;(mockSupabase.from as jest.MockedFunction<typeof mockSupabase.from>)
      .mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockProfile,
              error: null
            })
          })
        })
      } as any)

    await act(async () => {
      render(<Auth />)
    })

    await waitFor(() => {
      expect(screen.getByText('¡Bienvenido a Importz!')).toBeInTheDocument()
      expect(screen.getByText('Pablo Cardozo')).toBeInTheDocument()
      expect(screen.getByText('comprador')).toBeInTheDocument()
    })
  })

  it('shows comprador panel for comprador role', async () => {
    const mockUser = {
      id: '03e19010-4b48-430e-9368-3813317dbde7',
      email: 'test@example.com',
      user_metadata: { full_name: 'Test User' }
    }
    
    const mockProfile = {
      id: '03e19010-4b48-430e-9368-3813317dbde7',
      email: 'test@example.com',
      full_name: 'Test User',
      avatar_url: null,
      role: 'comprador' as const,
      created_at: '2025-05-29',
      updated_at: '2025-05-29'
    }

    ;(mockSupabase.auth.getSession as jest.MockedFunction<typeof mockSupabase.auth.getSession>)
      .mockResolvedValue({
        data: { session: { user: mockUser } as any },
        error: null
      })

    ;(mockSupabase.from as jest.MockedFunction<typeof mockSupabase.from>)
      .mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockProfile,
              error: null
            })
          })
        })
      } as any)

    await act(async () => {
      render(<Auth />)
    })

    await waitFor(() => {
      expect(screen.getByText('Panel de Comprador')).toBeInTheDocument()
      expect(screen.getByText('Aquí podrás crear y gestionar tus encargos.')).toBeInTheDocument()
    })
  })

  it('shows vendedora panel for vendedora role', async () => {
    const mockUser = {
      id: 'vendedora-id',
      email: 'vendedora@example.com',
      user_metadata: { full_name: 'Test Vendedora' }
    }
    
    const mockProfile = {
      id: 'vendedora-id',
      email: 'vendedora@example.com',
      full_name: 'Test Vendedora',
      avatar_url: null,
      role: 'vendedora' as const,
      created_at: '2025-05-29',
      updated_at: '2025-05-29'
    }

    ;(mockSupabase.auth.getSession as jest.MockedFunction<typeof mockSupabase.auth.getSession>)
      .mockResolvedValue({
        data: { session: { user: mockUser } as any },
        error: null
      })

    ;(mockSupabase.from as jest.MockedFunction<typeof mockSupabase.from>)
      .mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockProfile,
              error: null
            })
          })
        })
      } as any)

    await act(async () => {
      render(<Auth />)
    })

    await waitFor(() => {
      expect(screen.getByText('Panel de Vendedora')).toBeInTheDocument()
      expect(screen.getByText('Aquí podrás ver encargos y crear cotizaciones.')).toBeInTheDocument()
    })
  })

  it('shows admin panel for admin role', async () => {
    const mockUser = {
      id: 'admin-id',
      email: 'admin@example.com',
      user_metadata: { full_name: 'Test Admin' }
    }
    
    const mockProfile = {
      id: 'admin-id',
      email: 'admin@example.com',
      full_name: 'Test Admin',
      avatar_url: null,
      role: 'admin' as const,
      created_at: '2025-05-29',
      updated_at: '2025-05-29'
    }

    ;(mockSupabase.auth.getSession as jest.MockedFunction<typeof mockSupabase.auth.getSession>)
      .mockResolvedValue({
        data: { session: { user: mockUser } as any },
        error: null
      })

    ;(mockSupabase.from as jest.MockedFunction<typeof mockSupabase.from>)
      .mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({
              data: mockProfile,
              error: null
            })
          })
        })
      } as any)

    await act(async () => {
      render(<Auth />)
    })

    await waitFor(() => {
      expect(screen.getByText('Panel de Administrador')).toBeInTheDocument()
      expect(screen.getByText('Aquí podrás gestionar usuarios y el sistema.')).toBeInTheDocument()
    })
  })

  it('handles loading state properly', async () => {
    // Mock a delayed response to catch loading state
    ;(mockSupabase.auth.getSession as jest.MockedFunction<typeof mockSupabase.auth.getSession>)
      .mockImplementation(() => 
        new Promise(resolve => 
          setTimeout(() => resolve({ data: { session: null }, error: null }), 100)
        )
      )

    await act(async () => {
      render(<Auth />)
    })

    // Should show loading initially
    expect(screen.getByText('Cargando...')).toBeInTheDocument()

    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.getByText('Importz')).toBeInTheDocument()
      expect(screen.getByText('Iniciar sesión con Google')).toBeInTheDocument()
    })
  })
})