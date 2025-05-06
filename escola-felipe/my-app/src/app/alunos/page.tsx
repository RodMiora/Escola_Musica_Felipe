"use client";
import { useState, useEffect } from "react";

interface Aluno {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  dataNascimento: string;
  createdAt: string;
  updatedAt: string;
}

export default function AlunosPage() {
  // Estados para os alunos e formulários
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [novoAluno, setNovoAluno] = useState({ nome: '', login: '', senha: '' });
  const [alunoEditando, setAlunoEditando] = useState<Aluno | null>(null);
  
  // Adicionar um estado separado para cada modal
  const [mostrarModalAdicionar, setMostrarModalAdicionar] = useState(false);
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  
  useEffect(() => {
    // Carregamento de alunos do localStorage
    const alunosSalvos = localStorage.getItem('alunos');
    if (alunosSalvos) {
      setAlunos(JSON.parse(alunosSalvos));
    }
  }, []);

  // Função para abrir o formulário de adicionar
  const abrirFormularioAdicionar = () => {
    console.log("Abrindo formulário de adicionar");
    // Primeiro, feche todos os modais
    setMostrarModalAdicionar(false);
    setMostrarModalEditar(false);
    
    // Depois de um pequeno atraso, abra o modal desejado
    setTimeout(() => {
      setMostrarModalAdicionar(true);
      setNovoAluno({ nome: '', login: '', senha: '' });
    }, 100);
  };
  
  // Função para abrir o formulário de editar
  const abrirFormularioEditar = (aluno: any) => {
    console.log("Abrindo formulário de editar", aluno);
    // Primeiro, feche todos os modais
    setMostrarModalAdicionar(false);
    setMostrarModalEditar(false);
    
    // Depois de um pequeno atraso, abra o modal desejado
    setTimeout(() => {
      setMostrarModalEditar(true);
      setAlunoEditando(aluno);
    }, 100);
  };

  // Função para fechar todos os formulários
  const fecharFormularios = () => {
    console.log("Fechando formulários");
    setMostrarModalAdicionar(false);
    setMostrarModalEditar(false);
  };

  // Função para adicionar um novo aluno
  const adicionarAluno = (e) => {
    e.preventDefault();
    // Seu código para adicionar aluno
    
    // Fechar o formulário após adicionar
    fecharFormularios();
  };

  // Função para editar um aluno existente
  const editarAluno = (e) => {
    e.preventDefault();
    // Seu código para editar aluno
    
    // Fechar o formulário após editar
    fecharFormularios();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-white">Lista de Alunos</h1>
      
      <button 
        onClick={abrirFormularioAdicionar}
        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Adicionar Aluno
      </button>
      
      {/* Tabela de alunos */}
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            <th className="px-4 py-2">Nome</th>
            <th className="px-4 py-2">Login</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id}>
              <td className="px-4 py-2">{aluno.nome}</td>
              <td className="px-4 py-2">{aluno.login}</td>
              <td className="px-4 py-2">
                <button 
                  onClick={() => abrirFormularioEditar(aluno)}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded mr-2"
                >
                  Editar
                </button>
                {/* Outros botões */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Modal de Adicionar Aluno - completamente independente */}
      {mostrarModalAdicionar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-white">Adicionar Novo Aluno</h2>
            <form onSubmit={adicionarAluno}>
              {/* Conteúdo do formulário de adicionar */}
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">Nome</label>
                <input
                  type="text"
                  value={novoAluno.nome}
                  onChange={(e) => setNovoAluno({...novoAluno, nome: e.target.value})}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">Login</label>
                <input
                  type="text"
                  value={novoAluno.login}
                  onChange={(e) => setNovoAluno({...novoAluno, login: e.target.value})}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">Senha</label>
                <input
                  type="password"
                  value={novoAluno.senha}
                  onChange={(e) => setNovoAluno({...novoAluno, senha: e.target.value})}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3"
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={fecharFormularios}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Modal de Editar Aluno - completamente independente */}
      {mostrarModalEditar && alunoEditando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4 text-white">Editar Aluno</h2>
            <form onSubmit={editarAluno}>
              {/* Conteúdo do formulário de editar */}
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">Nome</label>
                <input
                  type="text"
                  value={alunoEditando.nome}
                  onChange={(e) => setAlunoEditando({...alunoEditando, nome: e.target.value})}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">Login</label>
                <input
                  type="text"
                  value={alunoEditando.login}
                  onChange={(e) => setAlunoEditando({...alunoEditando, login: e.target.value})}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-white text-sm font-bold mb-2">Senha</label>
                <input
                  type="password"
                  value={alunoEditando.senha}
                  onChange={(e) => setAlunoEditando({...alunoEditando, senha: e.target.value})}
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded py-2 px-3"
                  required
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={fecharFormularios}
                  className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-2"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}