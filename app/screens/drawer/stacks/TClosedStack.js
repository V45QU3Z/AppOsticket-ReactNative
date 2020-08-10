import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import TClosedScreen from '../screens/TClosedScreen';
import TClosedDet from '../tickets/TClosedDet';
import Icon from 'react-native-vector-icons/Ionicons';

const ClosedStack = createStackNavigator();
const ClosedStackDet = createStackNavigator();
export default function TClosedStack({navigation}) {
    return (
        <ClosedStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#0277bd',
                headerTintColor: '#fff'
                }
        }} initialRouteName='TClosed'>
            <ClosedStack.Screen name="TClosed" component={TClosedScreen} options={{
                title: 'Tickets Cerrados',
                headerTintColor: '#fff',
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={30} backgroundColor="#0277bd"
                    onPress={() => navigation.openDrawer()}
                    ></Icon.Button>
                )
                }}/>

                <ClosedStackDet.Screen name="TClosedDet" component={TClosedDet} options={{
                    title: 'Detalle Tickets Cerrados',
                    headerTintColor: '#fff',
                }}/>

        </ClosedStack.Navigator>
    )
}
