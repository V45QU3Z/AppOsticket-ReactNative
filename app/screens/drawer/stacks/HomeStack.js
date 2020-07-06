import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import Icon from 'react-native-vector-icons/Ionicons';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();

export default function HomesStack({navigation}){
    return(
        <HomeStack.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: '#FF943B',
                headerTintColor: '#fff'
                }
            }}>
            <HomeStack.Screen name="Home" component={HomeScreen} options={{
                title: 'Tickets',
                headerTintColor: '#fff',
                headerLeft: () => (
                    <Icon.Button name="ios-menu" size={30} backgroundColor="#FF943B"
                    onPress={() => navigation.openDrawer()}
                    ></Icon.Button>
                )
                }}/>
        </HomeStack.Navigator>
    );
}
