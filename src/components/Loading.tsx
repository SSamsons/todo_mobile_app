import { IonSpinner, IonText } from '@ionic/react';

export default function Loading() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '2rem 0' }}>
      <IonSpinner name="crescent" />
      <IonText style={{ marginTop: 8 }}>Загрузка...</IonText>
    </div>
  );
} 