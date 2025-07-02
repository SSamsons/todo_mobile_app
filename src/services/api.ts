const API_URL = 'http://localhost:8000'; // Замените на адрес вашего backend при необходимости

function getToken() {
  return localStorage.getItem('token');
}

export async function getTodos(params: Record<string, any> = {}) {
  const token = getToken();
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_URL}/tasks/?${query}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Ошибка загрузки задач');
  }
  return await response.json();
}

export async function createTodo(todo: any) {
  const token = getToken();
  const response = await fetch(`${API_URL}/tasks/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(todo)
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || 'Ошибка создания задачи');
  }
  return await response.json();
}

export async function updateTodo(id: number, updates: any) {
  const token = getToken();
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(updates)
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || 'Ошибка обновления задачи');
  }
  return await response.json();
}

export async function deleteTodo(id: number) {
  const token = getToken();
  const response = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.detail || 'Ошибка удаления задачи');
  }
  return await response.json();
} 