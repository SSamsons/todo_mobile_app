import { useState } from 'react';
import { IonInput, IonButton, IonItem, IonLabel, IonList, IonDatetime, IonSelect, IonSelectOption, IonText } from '@ionic/react';
import type { Todo } from '../types';

interface AddTodoProps {
  onAdd: (todo: Omit<Todo, 'id'>) => void;
}

export default function AddTodo({ onAdd }: AddTodoProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState(1);
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    if (!dueDate) {
      setError('Пожалуйста, укажите срок выполнения задачи.');
      return;
    }
    setError('');
    onAdd({
      title: text.trim(),
      description: '',
      is_completed: false,
      status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      category_id: undefined,
      priority: priority,
      due_date: dueDate || undefined,
      user_id: 1, // This will be set by the backend based on the authenticated user
    });
    setText('');
    setPriority(1);
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <IonList>
        <IonItem>
          <IonLabel position="stacked">Название задачи</IonLabel>
          <IonInput
            value={text}
            onIonChange={e => setText(e.detail.value!)}
            placeholder="Добавить новую задачу..."
            required
          />
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Приоритет</IonLabel>
          <IonSelect value={priority} onIonChange={e => setPriority(Number(e.detail.value))}>
            <IonSelectOption value={1}>Низкий</IonSelectOption>
            <IonSelectOption value={2}>Средний</IonSelectOption>
            <IonSelectOption value={3}>Высокий</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Срок выполнения</IonLabel>
          <IonDatetime
            value={dueDate}
            onIonChange={e => {
              const val = e.detail.value;
              setDueDate(Array.isArray(val) ? val[0] : val || '');
            }}
          />
        </IonItem>
      </IonList>
      {error && <IonText color="danger"><p>{error}</p></IonText>}
      <IonButton expand="block" type="submit" className="ion-margin-top">
        Добавить
      </IonButton>
    </form>
  );
} 