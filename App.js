import 'react-native-gesture-handler';

import React, { useState } from 'react';
import Login from './app/screens/login/Login';
import Navigation from './app/screens/drawer/navigation/Nagivation';
import { View } from 'react-native';
import Snackbar from './app/components/snackbar'
import SplashScreen from './app/components/SplashScreen'

export default function App() {

    return ( 
      
            <Navigation></Navigation>
        
    );
}

