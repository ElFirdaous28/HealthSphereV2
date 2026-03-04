import { ExercisesProvider } from './src/context/ExercisesContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <ExercisesProvider>
      <AppNavigator />
    </ExercisesProvider>
  );
}