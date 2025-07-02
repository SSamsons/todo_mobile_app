import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useHistory } from 'react-router-dom';

interface AuthContextType {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => void;
}

const API_URL = 'http://localhost:8000'; // Замените на адрес вашего backend при необходимости

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const history = useHistory();

  useEffect(() => {
    // Восстанавливаем user из localStorage при инициализации
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    if (token && savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (username: string, password: string) => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    const response = await fetch(`${API_URL}/users/login`, {
      method: 'POST',
      body: formData
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.detail || 'Ошибка входа');
    }
    const data = await response.json();
    localStorage.setItem('token', data.access_token);
    // Получаем пользователя (username)
    const userObj = { username };
    setUser(userObj);
    localStorage.setItem('user', JSON.stringify(userObj));
  };

  const register = async (username: string, password: string, firstName: string, lastName: string) => {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, first_name: firstName, last_name: lastName })
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.detail || 'Ошибка регистрации');
    }
    // После успешной регистрации сразу логиним пользователя
    await login(username, password);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
} 