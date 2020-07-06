import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TicketsScreen from '../screens/TicketsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import TicketsList from '../tickets/TicketsList';
import DetTicketScreen from '../screens/DetTicketScreen';
const TicketStack = createStackNavigator();
const DetTicketStk = createStackNavigator();

export default function TicketsStack({navigation}){
    return(
        <TicketStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#FF943B',
                headerTintColor: '#fff'
                }
            }}>
            <TicketStack.Screen name="Tickets" component={TicketsList} options={{
                title: 'Ticket List', 
                headerTintColor: '#fff',
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={30} backgroundColor="#FF943B"
                    onPress={() => navigation.openDrawer()}
                    ></Icon.Button>
                )
                }}/>
                <DetTicketStk.Screen name='TicketDetail' component={DetTicketScreen}
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
        </TicketStack.Navigator>
    );
}
