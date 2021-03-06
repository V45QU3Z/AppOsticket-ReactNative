import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TicketsScreen from '../screens/TicketsScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import TicketsList from '../tickets/TicketsList';
import TicketDet from '../tickets/TicketDet';
import { useNavigation } from '@react-navigation/native';

const TicketStack = createStackNavigator();
const DetTicketStk = createStackNavigator();

export default function TicketsStack({navigation}){
    return(
        <TicketStack.Navigator initialRouteName='Tickets' screenOptions={{
            headerStyle: {
                backgroundColor: '#0277bd',
                headerTintColor: '#fff'
                }
            }}>
            <TicketStack.Screen name="Tickets" component={TicketsList} options={{
                title: 'Mis Tickets', 
                headerTintColor: '#fff',
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={30} backgroundColor="#0277bd"
                    onPress={() => navigation.openDrawer()}
                    ></Icon.Button>
                )
                }}/>
                <DetTicketStk.Screen name='TicketDetail' component={TicketDet}
                options={{
                    title: 'Detalle Mis Tickets',
                    headerTintColor: '#fff',
                    /* headerLeft: () => (
                        <Icon.Button name="ios-arrow-back" size={30} backgroundColor="#FF943B"
                        onPress={() => navigation.goBack(null)}
                        ></Icon.Button>
                    ) */
                    }}
            ></DetTicketStk.Screen>
        </TicketStack.Navigator>
    );
}
