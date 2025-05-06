import React from 'react';
import { render, screen, waitFor } from '@testing-library/react'
import AdminPage from './page'
import { useRouter } from 'next/navigation'

// Mock de localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn()
};

// Mock do Next Router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() }))
}))

describe('AdminPage', () => {
  beforeEach(() => {
    // @ts-ignore
    global.localStorage = localStorageMock
    jest.clearAllMocks()
  })

  test('redireciona usuários não admin para /videos', async () => {
    localStorageMock.getItem.mockReturnValue('false')
    
    render(<AdminPage />)
    
    await waitFor(() => {
      expect(useRouter().push).toHaveBeenCalledWith('/videos')
    })
  })

  test('renderiza conteúdo admin corretamente para usuários autorizados', async () => {
    localStorageMock.getItem.mockReturnValue('true')
    
    render(<AdminPage />)
    
    await waitFor(() => {
      expect(screen.getByText('Gerenciar Alunos')).toBeInTheDocument()
      expect(screen.getByText('Liberar Conteúdo')).toBeInTheDocument()
    })
  })

  test('exibe modal de liberação de vídeos ao clicar em aluno', async () => {
    localStorageMock.getItem.mockReturnValue('true')
    
    const { user } = render(<AdminPage />)
    
    // Simula clique no primeiro aluno da lista
    const alunoRow = screen.getAllByRole('row')[1] // Pula o header
    await user.click(alunoRow)
    
    expect(screen.getByText('Liberar Vídeos para:')).toBeInTheDocument()
  })
})