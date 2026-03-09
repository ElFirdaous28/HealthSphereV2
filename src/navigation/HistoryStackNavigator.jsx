import { createStackNavigator } from '@react-navigation/stack';
import HistoryScreen from '../screens/HistoryScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';

const Stack = createStackNavigator();

export default function HistoryStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="HistoryList" component={HistoryScreen} />
            <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
        </Stack.Navigator>
    );
}