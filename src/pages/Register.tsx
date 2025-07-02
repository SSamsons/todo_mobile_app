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

export default function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const history = useHistory();

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 8) errors.push('Минимум 8 символов');
    if (!/[A-Z]/.test(password)) errors.push('Хотя бы одна заглавная буква');
    if (!/[a-z]/.test(password)) errors.push('Хотя бы одна строчная буква');
    if (!/\d/.test(password)) errors.push('Хотя бы одна цифра');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push('Хотя бы один спецсимвол (!@#$%^&*(),.?":{}|<>)');
    return errors;
  };

  const handlePasswordChange = (e: CustomEvent) => {
    const newPassword = e.detail.value || '';
    setPassword(newPassword);
    setPasswordErrors(validatePassword(newPassword));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (passwordErrors.length > 0) {
      setError('Пароль не соответствует требованиям безопасности');
      return;
    }
    if (password !== confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }
    if (firstName.trim().length < 2) {
      setError('Имя должно содержать минимум 2 символа');
      return;
    }
    if (firstName.trim().length > 50) {
      setError('Имя не должно превышать 50 символов');
      return;
    }
    if (lastName.trim().length < 2) {
      setError('Фамилия должна содержать минимум 2 символа');
      return;
    }
    if (lastName.trim().length > 50) {
      setError('Фамилия не должна превышать 50 символов');
      return;
    }
    if (username.trim().length < 3) {
      setError('Имя пользователя должно содержать минимум 3 символа');
      return;
    }
    setLoading(true);
    try {
      await register(username.trim(), password, firstName.trim(), lastName.trim());
      history.push('/');
    } catch (err: any) {
      if (err.response?.data?.detail) {
        setError(err.response.data.detail);
      } else if (err.response?.status === 400) {
        setError('Проверьте правильность введённых данных');
      } else if (err.response?.status === 409) {
        setError('Пользователь с таким именем уже существует');
      } else if (err.message) {
        setError(err.message);
      } else {
        setError('Ошибка при регистрации. Попробуйте ещё раз.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Регистрация</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Имя</IonLabel>
              <IonInput
                value={firstName}
                onIonChange={e => setFirstName(e.detail.value!)}
                required
                minlength={2}
                maxlength={50}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Фамилия</IonLabel>
              <IonInput
                value={lastName}
                onIonChange={e => setLastName(e.detail.value!)}
                required
                minlength={2}
                maxlength={50}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Имя пользователя</IonLabel>
              <IonInput
                value={username}
                onIonChange={e => setUsername(e.detail.value!)}
                required
                minlength={3}
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">Пароль</IonLabel>
              <IonInput
                value={password}
                onIonChange={handlePasswordChange}
                required
                type="password"
                minlength={8}
              />
            </IonItem>
            {passwordErrors.length > 0 && (
              <IonText color="danger">
                <p>Требования к паролю:</p>
                <ul>
                  {passwordErrors.map((err, idx) => (
                    <li key={idx}>{err}</li>
                  ))}
                </ul>
              </IonText>
            )}
            <IonItem>
              <IonLabel position="stacked">Подтвердите пароль</IonLabel>
              <IonInput
                value={confirmPassword}
                onIonChange={e => setConfirmPassword(e.detail.value!)}
                required
                type="password"
              />
            </IonItem>
            {confirmPassword && password !== confirmPassword && (
              <IonText color="danger">
                <p>Пароли не совпадают</p>
              </IonText>
            )}
          </IonList>
          {error && <IonText color="danger"><p>{error}</p></IonText>}
          <IonButton
            expand="block"
            type="submit"
            className="ion-margin-top"
            disabled={passwordErrors.length > 0 || password !== confirmPassword}
          >
            Зарегистрироваться
          </IonButton>
        </form>
        <div style={{ marginTop: 16, textAlign: 'center' }}>
          Уже есть аккаунт?{' '}
          <Link to="/login">Войти</Link>
        </div>
        <IonLoading isOpen={loading} message="Регистрация..." />
      </IonContent>
    </IonPage>
  );
} 