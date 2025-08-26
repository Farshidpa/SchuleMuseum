'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  birthDate?: string
  address?: string
  city?: string
  zipCode?: string
  role?: 'user' | 'admin'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Mock users database
  const mockUsers: Record<string, { password: string; user: User }> = {
    'demo@museum.de': {
      password: 'demo123',
      user: {
        id: '1',
        firstName: 'Max',
        lastName: 'Mustermann',
        email: 'demo@museum.de',
        phone: '0123 456789',
        birthDate: '1985-05-15',
        address: 'Musterstraße 123',
        city: 'Musterstadt',
        zipCode: '12345',
        role: 'user'
      }
    },
    'admin@admin.com': {
      password: 'admin',
      user: {
        id: 'admin-001',
        firstName: 'Museum',
        lastName: 'Administrator',
        email: 'admin@admin.com',
        phone: '06458 123456',
        birthDate: '1970-01-01',
        address: 'Schulstraße 15',
        city: 'Ernsthausen',
        zipCode: '36287',
        role: 'admin'
      }
    },
    'admin@museum.de': {
      password: 'admin123',
      user: {
        id: '2',
        firstName: 'Maria',
        lastName: 'Schmidt',
        email: 'admin@museum.de',
        phone: '06642 919191',
        birthDate: '1975-03-20',
        address: 'Schulstraße 15',
        city: 'Ernsthausen',
        zipCode: '36287',
        role: 'admin'
      }
    }
  }

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('museum_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('museum_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Check mock users first
    const userData = mockUsers[email]
    if (userData && userData.password === password) {
      setUser(userData.user)
      localStorage.setItem('museum_user', JSON.stringify(userData.user))
      setIsLoading(false)
      return true
    }
    
    // Check registered users from localStorage
    try {
      const registeredUsers = JSON.parse(localStorage.getItem('museum_registered_users') || '[]')
      const foundUser = registeredUsers.find((u: any) => u.email === email && u.password === password)
      
      if (foundUser) {
        const userToLogin: User = {
          id: foundUser.id,
          firstName: foundUser.firstName,
          lastName: foundUser.lastName,
          email: foundUser.email,
          phone: foundUser.phone,
          birthDate: foundUser.birthDate,
          address: foundUser.address,
          city: foundUser.city,
          zipCode: foundUser.zipCode,
          role: 'user'
        }
        setUser(userToLogin)
        localStorage.setItem('museum_user', JSON.stringify(userToLogin))
        setIsLoading(false)
        return true
      }
    } catch (error) {
      console.error('Error checking registered users:', error)
    }
    
    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('museum_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
