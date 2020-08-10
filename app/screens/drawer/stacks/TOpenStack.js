import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import TOpenScreen from '../screens/TOpenScreen';
import TOpenDet from '../tickets/TOpenDet';
import Icon from 'react-native-vector-icons/Ionicons';

const OpenStack = createStackNavigator();
const OpenStackDet = createStackNavigator();
export default function TOpenStack({navigation}) {
    return (
        <OpenStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#0277bd',
                headerTintColor: '#fff'
                }
        }} initialRouteName='TOpen'>
            <OpenStack.Screen name="TOpen" component={TOpenScreen} options={{
                title: 'Tickets Abiertos',
                headerTintColor: '#fff',
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={30} backgroundColor="#0277bd"
                    onPress={() => navigation.openDrawer()}
                    ></Icon.Button>
                )
                }}/>

                <OpenStackDet.Screen name="TOpenDet" component={TOpenDet} options={{
                    title: 'Detalle Tickets Abiertos',
                    headerTintColor: '#fff',
                }}/>

        </OpenStack.Navigator>
    )
}
