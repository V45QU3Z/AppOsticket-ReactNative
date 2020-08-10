import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NewTScreen from '../screens/NewTScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

export default function NewTStack({navigation}){
    return(
        <HomeStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#0277bd',
                headerTintColor: '#fff'
                }
            }}>
            <HomeStack.Screen name="NewTicket" component={NewTScreen} options={{
                title: 'Nuevo Ticket',
                headerTintColor: '#fff',
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={30} backgroundColor="#0277bd"
                    onPress={() => navigation.openDrawer()}
                    ></Icon.Button>
                )
                }}/>
        </HomeStack.Navigator>
    );
}
