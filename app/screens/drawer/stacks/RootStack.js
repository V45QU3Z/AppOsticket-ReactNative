import React from 'react'

import Login from '../../login/Login'
import { createDrawerNavigator } from '@react-navigation/drawer'

const RootStacks = createDrawerNavigator();

export default function RootStack({navigation}) {
    return (
        <RootStacks.Navigator>
            <RootStacks.Screen name="Login" component={Login}></RootStacks.Screen>
        </RootStacks.Navigator>
    )
}
