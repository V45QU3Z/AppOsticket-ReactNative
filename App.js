import 'react-native-gesture-handler';

import React, { useState } from 'react';
import Login from './app/screens/login/Login';
import Navigation from './app/screens/drawer/navigation/Nagivation';
import { View } from 'react-native';
import SnackBar from './app/components/SnackBar'
import SplashScreen from './app/components/SplashScreen'
import SnackBarr from './app/components/SnackBarr';

export default function App() {

    return ( 
      
            <Navigation></Navigation>
        
    );
}

