import * as React from 'react';
import { View, Colors } from 'react-native-ui-lib';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import ListingTab from './listing'
import OrdersTab from './orders'
import ProfileTab from './profile'

const Tab = createBottomTabNavigator();


export default function ({ navigation }) {
    return (
        <Tab.Navigator
            initialRouteName="Feed"
            screenOptions={{
                tabBarActiveTintColor: Colors.orange,
            }}>
            <Tab.Screen
                name="Home"
                component={ListingTab}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Orders"
                component={OrdersTab}
                options={{
                    tabBarLabel: 'Orders',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name={'ballot-outline'}
                            color={color}
                            size={size}
                        />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileTab}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons
                            name={'account'}
                            color={color}
                            size={size}
                        />
                    ),
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}
