import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ExercisesProvider } from './src/context/ExercisesContext';
import { UserProvider } from './src/context/UserContext';

import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <UserProvider>
        <ExercisesProvider>
          <AppNavigator />
        </ExercisesProvider>
      </UserProvider>
    </SafeAreaProvider>
  );
}