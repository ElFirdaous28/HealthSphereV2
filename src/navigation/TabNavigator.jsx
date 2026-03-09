import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import DashboardScreen from '../screens/DashboardScreen';
import ExercisesStackNavigator from './ExercisesStackNavigator';
import FavoritesStackNavigator from './FavoritesStackNavigator';
import HistoryStackNavigator from './HistoryStackNavigator';
import { Colors } from '../constants/Colors';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                headerShown: true,
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => navigation.openDrawer()}
                        style={{ marginLeft: 16 }}
                    >
                        <MaterialCommunityIcons name="menu" size={28} color={Colors.text} />
                    </TouchableOpacity>
                ),
                tabBarIcon: ({ color, size }) => {
                    let iconName;
                    if (route.name === 'Dashboard') {
                        iconName = 'home';
                    } else if (route.name === 'Exercises') {
                        iconName = 'dumbbell';
                    } else if (route.name === 'Favorites') {
                        iconName = 'heart';
                    } else if (route.name === 'History') {
                        iconName = 'history';
                    }
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: Colors.primary,
                tabBarInactiveTintColor: Colors.textLight,
                tabBarStyle: {
                    borderTopWidth: 0,
                    elevation: 10,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: -4 },
                    shadowOpacity: 0.05,
                    shadowRadius: 10,
                }
            })}
        >
            <Tab.Screen name="Dashboard" component={DashboardScreen} />
            <Tab.Screen name="Exercises" component={ExercisesStackNavigator} />
            <Tab.Screen name="Favorites" component={FavoritesStackNavigator} />
            <Tab.Screen name="History" component={HistoryStackNavigator} />
        </Tab.Navigator>
    );
}