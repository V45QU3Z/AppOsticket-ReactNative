import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DTickets from '../tickets/DTickets';
import DTOnline from '../tickets/DTOnline';  
import DTHistory from '../tickets/DTHistory';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sett</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

export default function TabScreen() {
  return (
      <Tab.Navigator tabBarOptions={{
        activeTintColor: '#0277bd'
      }} >
        <Tab.Screen name="En Línea" component={DTOnline}/>
        <Tab.Screen name="Histórico" component={DTHistory} />
      </Tab.Navigator>
  );
}
