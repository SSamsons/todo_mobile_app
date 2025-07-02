import { useState } from 'react';
import { IonList, IonItem, IonLabel, IonCheckbox, IonButton, IonCard, IonCardHeader, IonCardContent, IonInput, IonText } from '@ionic/react';
import type { Todo } from '../types';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: number, updates: Partial<Todo>) => void;
  onDelete: (id: number) => void;
}

export default function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editText, setEditText] = useState('');

  const handleCheckboxChange = (todo: Todo) => {
    onUpdate(todo.id, { is_completed: !todo.is_completed });
  };

  const handleDelete = (todo: Todo) => {
    onDelete(todo.id);
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(todo.id);
    setEditText(todo.title);
  };

  const handleSave = (todo: Todo) => {
    if (editText.trim()) {
      onUpdate(todo.id, { title: editText.trim() });
    }
    setEditingId(null);
    setEditText('');
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditText('');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityText = (priority: number) => {
    switch (priority) {
      case 1: return 'Низкий';
      case 2: return 'Средний';
      case 3: return 'Высокий';
      default: return 'Не указан';
    }
  };

  const getPriorityColor = (priority: number) => {
    switch (priority) {
      case 1: return 'success';
      case 2: return 'warning';
      case 3: return 'danger';
      default: return 'medium';
    }
  };

  return (
    <IonList>
      {todos.map((todo) => (
        <IonCard key={todo.id} color={todo.is_completed ? 'light' : undefined}>
          <IonCardHeader>
            <IonItem lines="none">
              <IonCheckbox
                checked={todo.is_completed}
                onIonChange={() => handleCheckboxChange(todo)}
                slot="start"
              />
              {editingId === todo.id ? (
                <IonInput
                  value={editText}
                  onIonChange={e => setEditText(e.detail.value!)}
                  onKeyDown={e => {
                    if ((e as any).key === 'Enter') handleSave(todo);
                    if ((e as any).key === 'Escape') handleCancel();
                  }}
                  className="edit-input"
                  autofocus
                />
              ) : (
                <IonLabel
                  style={{ textDecoration: todo.is_completed ? 'line-through' : 'none', cursor: 'pointer' }}
                  onClick={() => handleEdit(todo)}
                >
                  {todo.title}
                </IonLabel>
              )}
              <IonButton color="danger" fill="clear" slot="end" onClick={() => handleDelete(todo)}>
                Удалить
              </IonButton>
            </IonItem>
          </IonCardHeader>
          <IonCardContent>
            <IonText color={getPriorityColor(todo.priority || 1)}>
              <b>Приоритет:</b> {getPriorityText(todo.priority || 1)}
            </IonText>
            <br />
            <IonText>
              <b>Создано:</b> {formatDate(todo.created_at)}
            </IonText>
            {todo.due_date && (
              <>
                <br />
                <IonText color="medium">
                  <b>Срок:</b> {formatDate(todo.due_date)}
                </IonText>
              </>
            )}
          </IonCardContent>
        </IonCard>
      ))}
    </IonList>
  );
} 