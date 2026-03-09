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
import DrawerNavigator from './DrawerNavigator';

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <DrawerNavigator />
        </NavigationContainer>
    );
}