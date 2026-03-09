import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';
import { Colors } from '../constants/Colors';

const Drawer = createDrawerNavigator();

const iconMap = {
    Home: 'home',
    Profile: 'account',
    Settings: 'cog',
    About: 'information',
};

export default function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={({ route }) => ({
                drawerActiveTintColor: Colors.primary,
                drawerInactiveTintColor: Colors.textLight,
                drawerLabelStyle: {
                    fontWeight: '700',
                    fontSize: 15,
                },
                drawerIcon: ({ color, size }) => (
                    <MaterialCommunityIcons
                        name={iconMap[route.name]}
                        size={size}
                        color={color}
                    />
                ),
            })}
        >
            <Drawer.Screen
                name="Home"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Drawer.Screen name="Profile" component={ProfileScreen} />
            <Drawer.Screen name="Settings" component={SettingsScreen} />
            <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
    );
}
