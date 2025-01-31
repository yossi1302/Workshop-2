import React from 'react';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarStyle: {
          backgroundColor: '#1e1e1e',
          height: 80, // Increased height for better spacing
          paddingTop: 10, // Added padding for vertical spacing
          paddingBottom: 10,
        },
        tabBarActiveTintColor: '#f39c12',
        tabBarInactiveTintColor: '#7f8c8d',
        tabBarItemStyle: {
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginHorizontal: 15, // Added horizontal spacing between buttons
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 5,
        },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'API 1' }} />
      <Tabs.Screen name="second" options={{ title: 'API 2' }} />
      <Tabs.Screen name="third" options={{ title: 'Database' }} />
    </Tabs>
  );
}
