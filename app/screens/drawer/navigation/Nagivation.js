import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomesStack from '../stacks/HomeStack';
import TicketsStack from '../stacks/TicketsStack';
import DrawerContent from '../navigation/DrawerContent';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../../context';
import User from '../../../models/users';
import RootStack from '../stacks/RootStack';
import AsyncStorage from '@react-native-community/async-storage';
import TOpenStack from '../stacks/TOpenStack';
import TClosedStack from '../stacks/TClosedStack';
import NewTStack from '../stacks/NewTStack';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function Navigation(){
    const initialLoginState = {
        isloading: true,
        username: null,
        userToken: null,
      };
    //function reductor
    const loginReducer = (prevState, action) => {
        switch( action.type ) {
          case 'RETRIEVE_TOKEN': 
            return {
              ...prevState,
              userToken: action.token,
              isloading: false,
            };
          case 'LOGIN': 
            return {
              ...prevState,
              username: action.id,
              userToken: action.token,
              isloading: false,
            };
          case 'LOGOUT': 
            return {
              ...prevState,
              username: null,
              userToken: null,
              isloading: false,
            };
          case 'REGISTER': 
            return {
              ...prevState,
              username: action.id,
              userToken: action.token,
              islading: false,
            };
        }
      };

      const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);
      const [role, setRole] = React.useState('');

      const authContext = React.useMemo(() => ({
        signIn: async(user) => {
          //let userToken=null;
          const userToken = String(user.apikey);
          const email = String(user.email);
          const name = String(user.name);
          const username = String(user.username);
          const rol = String(user.role);
          try {
            await AsyncStorage.setItem('name', name);
            await AsyncStorage.setItem('email', email);
            await AsyncStorage.setItem('username', username);
            await AsyncStorage.setItem('userToken', userToken);
            await AsyncStorage.setItem('rol', rol);
          } catch(e) {
            console.log(e);
          } 
          dispatch({ type: 'LOGIN', email: email, name: name, username: username, token: userToken, rol: rol});
          console.log('token: ', userToken);
          console.log('name: ', name);
          console.log('status: ', user.status);
          console.log('El rol es '+ rol)
        },

        signOut: async() => {
          try {
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('rol');
            await AsyncStorage.removeItem('name');
            await AsyncStorage.removeItem('email');
            await AsyncStorage.removeItem('username');
          } catch(e) {
            console.log(e);
          }
          dispatch({ type: 'LOGOUT'});
          console.log('Session closed!');
        },
        signUp: () => {
        }
      }), []);


    //efecct
    useEffect(() => {
        setTimeout(async() => {
          // setIsLoading(false);
          let userToken; let userRole;
          userToken = null; userRole = null;
          try {
            userToken = await AsyncStorage.getItem('userToken');
            userRole = await AsyncStorage.getItem('rol');
          } catch(e) {
            console.log(e);
          }
          dispatch({ type: 'LOGIN', token: userToken });
          console.log('refresh token: ', userToken);
        }, 1000);
      }, []);

    AsyncStorage.getItem('rol').then(res => {
      setRole(res);
    })
    if( loginState.isloading ) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={40} color="#0277bd"/>
      </View>
    );
  }

    return(
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {(loginState.userToken !== null && role==='staff') ? 
                    <Drawer.Navigator drawerContent={props => <DrawerContent {...props}></DrawerContent>}>
                        <Drawer.Screen name="Home" component={HomesStack} />
                        <Drawer.Screen name="Tickets" component={TicketsStack} />
                        <Drawer.Screen name="TOpen" component={TOpenStack} /> 
                        <Drawer.Screen name="TClosed" component={TClosedStack} /> 
                        <Drawer.Screen name="NewTicket" component={NewTStack} /> 
                    </Drawer.Navigator>
                :
                (loginState.userToken !== null && role==='user') ?
                <Drawer.Navigator drawerContent={props => <DrawerContent {...props}></DrawerContent>}>
                    <Drawer.Screen name="NewTicket" component={NewTStack} /> 
                </Drawer.Navigator>
                  :                      
                  <RootStack/> 
                }
            </NavigationContainer>
        </AuthContext.Provider>
    );
}
