import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TabNavigator from './TabNavigator';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import AboutScreen from '../screens/AboutScreen';

const Drawer = createDrawerNavigator();

const drawerScreens = [
    { name: 'Home', component: TabNavigator, icon: 'home' },
    { name: 'Profile', component: ProfileScreen, icon: 'account' },
    { name: 'Settings', component: SettingsScreen, icon: 'cog' },
    { name: 'About', component: AboutScreen, icon: 'information' },
];

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
                drawerIcon: ({ color, size }) => (
                    <MaterialCommunityIcons 
                        name={iconMap[route.name]} 
                        size={size} 
                        color={color} 
                    />
                ),
            })}
        >
            {drawerScreens.map((screen) => (
                <Drawer.Screen 
                    key={screen.name}
                    name={screen.name} 
                    component={screen.component} 
                />
            ))}
        </Drawer.Navigator>
    );
}
