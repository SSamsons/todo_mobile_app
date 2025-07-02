import { useState, useEffect } from 'react';
import AddTodo from '../components/AddTodo';
import TodoFilters from '../components/TodoFilters';
import TodoList from '../components/TodoList';
import Loading from '../components/Loading';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonText, IonButton, IonIcon } from '@ionic/react';
import { moon, sunny } from 'ionicons/icons';
import type { Todo } from '../types';
import * as api from '../services/api';
import { useTheme } from '../contexts/ThemeContext';

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortDesc, setSortDesc] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Загрузка задач с сервера
  const fetchTodos = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await api.getTodos({
        status: statusFilter || undefined,
        sort_by: sortBy,
        sort_desc: sortDesc
      });
      setTodos(data);
    } catch (e: any) {
      setError(e.message || 'Ошибка загрузки задач');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, [statusFilter, sortBy, sortDesc]);

  const addTodo = async (todo: Omit<Todo, 'id'>) => {
    setError('');
    try {
      await api.createTodo(todo);
      fetchTodos();
    } catch (e: any) {
      setError(e.message || 'Ошибка создания задачи');
    }
  };

  const updateTodo = async (id: number, updates: Partial<Todo>) => {
    setError('');
    try {
      await api.updateTodo(id, updates);
      fetchTodos();
    } catch (e: any) {
      setError(e.message || 'Ошибка обновления задачи');
    }
  };

  const deleteTodo = async (id: number) => {
    setError('');
    try {
      await api.deleteTodo(id);
      fetchTodos();
    } catch (e: any) {
      setError(e.message || 'Ошибка удаления задачи');
    }
  };

  // Фильтрация и сортировка теперь на сервере
  const filteredTodos = todos;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Задачи</IonTitle>
          <IonButton slot="end" fill="clear" onClick={toggleTheme} aria-label="Сменить тему">
            <IonIcon icon={theme === 'dark' ? sunny : moon} />
          </IonButton>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <AddTodo onAdd={addTodo} />
        <TodoFilters
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          sortBy={sortBy}
          onSortByChange={setSortBy}
          sortDesc={sortDesc}
          onSortDescChange={setSortDesc}
        />
        {error && <IonText color="danger"><p>{error}</p></IonText>}
        {isLoading ? (
          <Loading />
        ) : (
          <TodoList
            todos={filteredTodos}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        )}
      </IonContent>
    </IonPage>
  );
} 