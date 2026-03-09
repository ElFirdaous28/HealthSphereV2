import { createStackNavigator } from '@react-navigation/stack';
import ExercisesScreen from '../screens/ExercisesScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';

const Stack = createStackNavigator();

export default function ExercisesStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="ExercisesList" component={ExercisesScreen} />
            <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
        </Stack.Navigator>
    );
}
