import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonList,
  IonText,
  IonLoading
} from '@ionic/react';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      history.push('/');
    } catch (err: any) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.response?.status === 401) {
        setError('Неверное имя пользователя или пароль');
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Ошибка при входе. Попробуйте еще раз.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Вход</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Имя пользователя</IonLabel>
              <IonInput
                value={username}
                onIonChange={e => setUsername(e.detail.value!)}
                required
                type="text"
                autocomplete="username"
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Пароль</IonLabel>
              <IonInput
                value={password}
                onIonChange={e => setPassword(e.detail.value!)}
                required
                type="password"
                autocomplete="current-password"
              />
            </IonItem>
          </IonList>
          {error && <IonText color="danger"><p>{error}</p></IonText>}
          <IonButton expand="block" type="submit" className="ion-margin-top">
            Войти
          </IonButton>
        </form>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          Нет аккаунта?{' '}
          <Link to="/register">Зарегистрироваться</Link>
        </div>
        <IonLoading isOpen={loading} message="Вход..." />
      </IonContent>
    </IonPage>
  );
} 