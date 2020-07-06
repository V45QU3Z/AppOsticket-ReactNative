import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import DetTicketScreen from '../screens/DetTicketScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import { View } from 'react-native';

const DetTicketStk = createStackNavigator();

export default function DetTicketStack({navigation}) {
    return (
        <DetTicketStk.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#FF943B',
                headerTintColor: '#fff'
                }
            }}>
            <DetTicketStk.Screen name='TicketDetails' component={DetTicketScreen}
                options={{
                    title: 'Detail of Tickets',
                    headerTintColor: '#fff',
                    headerLeft: () => (
                        <Icon.Button name="ios-arrow-back" size={30} backgroundColor="#FF943B"
                        onPress={() => navigation.goBack()}
                        ></Icon.Button>
                    )
                    }}
            ></DetTicketStk.Screen>
        </DetTicketStk.Navigator>
    )
}
