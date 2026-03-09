import { createStackNavigator } from '@react-navigation/stack';
import FavoritesScreen from '../screens/FavoritesScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';

const Stack = createStackNavigator();

export default function FavoritesStackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="FavoritesList" component={FavoritesScreen} />
            <Stack.Screen name="ExerciseDetail" component={ExerciseDetailScreen} />
        </Stack.Navigator>
    );
}
