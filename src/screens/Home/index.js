import * as React from 'react';
import { View, Text, Image, Colors } from 'react-native-ui-lib';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeTab from './Home'
import MapTab from './Map'
import ProfileTab from './Profile'
import OrderTab from './Orders'
const Tab = createBottomTabNavigator();


export default function MainScreen({ navigation }) {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: Colors.orange,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapTab}
        options={{
          tabBarLabel: 'Near Me',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={'google-maps'}
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrderTab}
        options={{
          tabBarLabel: 'Orders',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name={'food-turkey'}
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
              name="account-circle"
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
