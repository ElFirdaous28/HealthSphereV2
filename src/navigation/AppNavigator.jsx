import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';

const Drawer = createDrawerNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                screenOptions={({ route }) => ({
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
                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },
                })}
            >
                <Drawer.Screen name="Home" component={TabNavigator} />
                <Drawer.Screen name="Profile" component={ProfileScreen} />
                <Drawer.Screen name="Settings" component={SettingsScreen} />
                <Drawer.Screen name="About" component={AboutScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
}