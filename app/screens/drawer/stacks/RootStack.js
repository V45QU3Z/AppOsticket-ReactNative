import React from 'react'

import Login from '../../login/Login'
import { createStackNavigator } from '@react-navigation/stack'

const RootStacks = createStackNavigator();

export default function RootStack({navigation}) {
    return (
        <RootStacks.Navigator headerMode='none'>
            <RootStacks.Screen name="Login" component={Login}></RootStacks.Screen>
        </RootStacks.Navigator>
    )
}
