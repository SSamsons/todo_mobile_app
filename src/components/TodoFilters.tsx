import { IonItem, IonLabel, IonSelect, IonSelectOption, IonCheckbox, IonList } from '@ionic/react';

interface TodoFiltersProps {
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  sortBy: string;
  onSortByChange: (sortBy: string) => void;
  sortDesc: boolean;
  onSortDescChange: (sortDesc: boolean) => void;
}

export default function TodoFilters({
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
  sortDesc,
  onSortDescChange
}: TodoFiltersProps) {
  return (
    <IonList>
      <IonItem>
        <IonLabel>Статус</IonLabel>
        <IonSelect value={statusFilter} onIonChange={e => onStatusFilterChange(e.detail.value)}>
          <IonSelectOption value="">Все</IonSelectOption>
          <IonSelectOption value="pending">Не выполнено</IonSelectOption>
          <IonSelectOption value="completed">Выполнено</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem>
        <IonLabel>Сортировка</IonLabel>
        <IonSelect value={sortBy} onIonChange={e => onSortByChange(e.detail.value)}>
          <IonSelectOption value="created_at">По дате создания</IonSelectOption>
          <IonSelectOption value="due_date">По сроку выполнения</IonSelectOption>
          <IonSelectOption value="priority">По приоритету</IonSelectOption>
        </IonSelect>
      </IonItem>
      <IonItem lines="none">
        <IonLabel>По убыванию</IonLabel>
        <IonCheckbox
          checked={sortDesc}
          onIonChange={e => onSortDescChange(e.detail.checked)}
          slot="end"
        />
      </IonItem>
    </IonList>
  );
} 