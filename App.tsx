import { ExercisesProvider } from './src/context/ExercisesContext';
import { UserProvider } from './src/context/UserContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <UserProvider>
      <ExercisesProvider>
        <AppNavigator />
      </ExercisesProvider>
    </UserProvider>
  );
}