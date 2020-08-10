import 'react-native-gesture-handler';

import React, { useState } from 'react';
import Login from './app/screens/login/Login';
import Navigation from './app/screens/drawer/navigation/Nagivation';
import { View } from 'react-native';
import SnackBar from './app/components/SnackBar'
import SplashScreen from './app/components/SplashScreen'
import SnackBarr from './app/components/SnackBarr';
import TabScreen from './app/screens/drawer/stacks/TabStack';

export default function App() {

    return ( 
      
            <Navigation></Navigation>
        
    );
}

