import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import { Colors } from '../constants/Colors';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={({ route }) => ({
                    headerTintColor: Colors.primary,
                    drawerActiveTintColor: Colors.primary,
                    drawerInactiveTintColor: Colors.textLight,
                    drawerLabelStyle: {
                        fontWeight: '700',
                        fontSize: 15,
                    },
                    drawerIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === 'Home') {
                            iconName = 'home';
                        } else if (route.name === 'Profile') {
                            iconName = 'account';
                        } else if (route.name === 'Settings') {
                            iconName = 'cog';
                        } else if (route.name === 'About') {
                            iconName = 'information';
                        }
                        return iconName ? <MaterialCommunityIcons name={iconName} size={size} color={color} /> : null;
                    },
                })}
            >
                <Drawer.Screen name="Home" component={TabNavigator} />
                <Drawer.Screen name="Profile" component={ProfileScreen} />
                <Drawer.Screen name="Settings" component={SettingsScreen} />
                <Drawer.Screen name="About" component={AboutScreen} />

                {/* Hidden Route for Detail Navigation */}
                <Drawer.Screen
                    name="ExerciseDetail"
                    component={ExerciseDetailScreen}
                    options={{
                        drawerItemStyle: { display: 'none' },
                        title: 'Exercise Detail'
                    }}
                />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}