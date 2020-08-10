import React, { useEffect } from 'react'
import { Button, StyleSheet, View, ImageBackground, Alert, ActivityIndicator } from 'react-native';
import { createDrawerNavigator, DrawerItem, DrawerContentScrollView } from '@react-navigation/drawer';
import { Caption, Avatar, Title, Paragraph, Drawer, Text, TouchableRipple, Switch, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-community/async-storage';
//use context
import { AuthContext } from '../../../context';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function DrawerContent(props) {

  const { signOut } = React.useContext(AuthContext);

  const [role, setRole] = React.useState('');

  function Logout() {
    return(
      Alert.alert("Cerrar Sesión","¿Desea cerrar sesión?",[{
        text: "NO",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "SI", onPress: () => {signOut()} }],
      { cancelable: false }
    )
    )
  }

  function Setting() {
    return(
      Alert.alert("Configuracion","No disponible",[{
        text: "CLOSE",
        onPress: () => console.log("Cancel Pressed")
      }]
    ))
  }


  function showProfile(){
    /* let email = await AsyncStorage.getItem('email');
    return email; */
    const [email, setEmail] = React.useState();
    const [name, setName] = React.useState();

    useEffect(() =>{
      AsyncStorage.getItem('email')
          .then(res =>{
            setEmail(res);
          })
      AsyncStorage.getItem('name')
          .then(res => {
            setName(res);
          })
    }, [])
    return {email, name};
  }
  const info_user = showProfile();

  AsyncStorage.getItem('rol').then(res => {
    setRole(res);
  })

    return (
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.DrawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'column', marginTop: 0}}>
                        <Card style={{backgroundColor: '#ff9800'}}>
                            <Card.Cover style={styles.img} source={{ uri: 'https://picsum.photos/700' }} />
                            <Text style={styles.textName} >{info_user.name}</Text>
                            <Text style={styles.textEmail} >{info_user.email}</Text>
                        </Card>
                        </View>
                    </View>
                    
                    {/* <View style={styles.row}>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>80</Paragraph>
                                <Caption style={styles.caption}>Following</Caption>
                            </View>
                            <View style={styles.section}>
                                <Paragraph style={[styles.paragraph, styles.caption]}>100</Paragraph>
                                <Caption style={styles.caption}>Followers</Caption>
                            </View>
                    </View> */}
                </View>

                {role==='staff' ?
                  <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem 
                      icon={({color, size}) => (
                        <Icon name="chart-bar" color='#0277bd' size={size}/>
                      )}
                      label="Estadística" labelStyle={{color:'#0277bd'}}
                      onPress={() => {props.navigation.navigate('Home')}}
                  />
                  <DrawerItem 
                    icon={({color, size}) => (
                        <Icon name="open-in-app" color='#0277bd' size={size}/>
                    )}
                    label="Tickets Abiertos" labelStyle={{color:'#0277bd'}}
                    onPress={() => {props.navigation.navigate('TOpen')}}
                  />
                  <DrawerItem 
                    icon={({color, size}) => (
                        <Icon name="ticket-account" color='#0277bd' size={size}/>
                    )}
                    label="Mis Tickets" labelStyle={{color:'#0277bd'}}
                    onPress={() => {props.navigation.navigate('Tickets')}}
                  />
                  <DrawerItem 
                    icon={({color, size}) => (
                        <Icon name="lock" color='#0277bd' size={size}/>
                    )}
                    label="Tickets Cerrados" labelStyle={{color:'#0277bd'}}
                    onPress={() => {props.navigation.navigate('TClosed')}}
                  />
                  <DrawerItem 
                    icon={({color, size}) => (
                        <Icon name="note-plus" color='#0277bd' size={size}/>
                    )}
                    label="Nuevo Ticket" labelStyle={{color:'#0277bd'}}
                    onPress={() => {props.navigation.navigate('NewTicket')}}
                  />
                  <DrawerItem 
                    icon={({color, size}) => (
                        <Icon name="settings" color='#0277bd' size={size}/>
                    )}
                    label="Configuración" labelStyle={{color:'#0277bd'}}
                    onPress={() => {Setting()}}
                  />
                </Drawer.Section>
                :
                role==='user' ?
                <Drawer.Section style={styles.drawerSection}>
                    <DrawerItem 
                        icon={({color, size}) => (
                        <Icon name="note-plus" color='#0277bd' size={size}/>
                        )}
                        label="Nuevo Ticket" labelStyle={{color:'#0277bd'}}
                        onPress={() => {props.navigation.navigate('NewTicket')}}
                    />
                  </Drawer.Section>:null
                }


            </DrawerContentScrollView>

            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size}) => (
                    <FontAwesome5 name="power-off" color='#0277bd' size={size}></FontAwesome5>
                    )}
                    label='Cerrar Sesión' labelStyle={{color:'#0277bd'}} onPress={() => {Logout()}}
                >
                </DrawerItem>
            </Drawer.Section>

        </View>
    )
}


const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      //paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    img:{
      opacity: 0.9
    },
    textName:{
      position: 'absolute',
      bottom: '20%',
      left: '5%',
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold'
    },
    textEmail:{
      position: 'absolute',
      bottom: '10%',
      left: '5%',
      color: '#fff',
      fontSize: 15,
      //fontWeight: 'bold'
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
      paddingLeft: 20
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });