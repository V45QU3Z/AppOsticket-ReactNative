import React, { useEffect } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Alert, Modal,
  TouchableHighlight, ScrollView, Image, Picker
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextInput, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import TicketService from '../../../services/TicketsService';
import {Feather, FontAwesome} from 'react-native-vector-icons';
import { useFocusEffect } from '@react-navigation/native';

export default function NewTicket({navigation}) {
  const [visible, setVisible] = React.useState({
    snack: false,
    loading: false,
    snackError: false
  });
  const _onDismissSnackBar = () => setVisible({snack: false});
  const _onDismissSnackBarError = () => setVisible({snackError: false});

  const [role, setRole] = React.useState('');
  const [modalVisible, setModalVisible] = React.useState(true);
  const [created, setCreated] = React.useState(false);
  const [numCreated, setNumCreated] = React.useState();

  let location = '8';
  let sede = '4';
  let source = 'API';
  const [data, setData] = React.useState({
    source: source,
    name: '',
    email: '',
    sucursal: sede,
    phone: '',
    priority: '2',
    location: location,
    subject: '',
    message: ''
  });
    
    useEffect(() =>{
      async function async(){
        try {
          let getName = await AsyncStorage.getItem('name');
          let getMail = await AsyncStorage.getItem('email');
          let rol = await AsyncStorage.getItem('rol');
          setData({
            ...data,
            name: getName,
            email: getMail
          });
          setRole(rol)
        } catch (error) {
          console.log('Error:', error)
        }
      }
      async();
    }, [])

    useFocusEffect(
      React.useCallback(() => {
        AsyncStorage.getItem('email').then(mail =>{
          AsyncStorage.getItem('name').then(nam => {
            setData({
              ...data,
              source: source,
              sucursal: sede,
              phone: '',
              name: nam,
              email: mail,
              priority: '2',
              location: location,
              subject: '',
              message: ''
            })
          })
        })
        return () => {
          //alert('other unfocused');
        };
      }, [])
  ); 
  
  //const info_user = getEmailAndName();
    const [isLoading, setIsLoading] = React.useState(false);
    function isCreated(){
      setIsLoading(false)
      setVisible({
        snack: true
      })
    }
    function isError(){
      setIsLoading(false)
      setVisible({
        snackError: true
      })
    }
    function isErrorOnServer(){
      setIsLoading(false)
      setModalVisible(!modalVisible);
      Alert.alert('Error', 'Server not conected!',[{
        text: 'CLOSE', onPress: () => {}
      }]);
    }

  async function createTicket(){
    if(!isNaN(data.phone) && (data.phone.length > 6 && data.phone.length <= 9)){
      setIsLoading(true)
      if(data.subject=='' || data.message=='' || data.phone==''){
        return(
          isError()
        )
      }else{
        try {
          let user = await TicketService.create(data);  
            if(user != null || user != undefined){
              setNumCreated(user);
              setIsLoading(false)
              setCreated(true)
              isCreated();
              setTimeout(() => {
                Alert.alert('Operación Completada','El número de ticket creado es: '+user, [{
                  text: 'Cerrar'
                }])
              }, 1000)
              console.log(user)
            }else{
              setIsLoading(false)
              setCreated(false)
              isCreated();
            }
            let mail = await AsyncStorage.getItem('email');
            let nam = await AsyncStorage.getItem('name');
            setData({
              ...data,
              source: source,
              sucursal: sede,
              phone: '',
              name: nam,
              email: mail,
              priority: '2',
              location: location,
              subject: '',
              message: ''
            })
          
        } catch (error) {
          isErrorOnServer()
          console.log('Error create: ', error);
        }
      }
    }else if(data.phone.length==0){
      return(isError())
    }else{
      return Alert.alert('Error!', 'Por favor, ingrese un número válido', [{
        text: 'Ok'
      }])
    }
    
    
  }

  useFocusEffect(
    React.useCallback(() => {
      let isSuscribed = true;
      if(isSuscribed){
        /* setData({
          phone: '',
          subject: '',
          message: ''
        }) */
      }
      return () => isSuscribed = false;
    }, [])
  );
    return (
        <View style={styles.viewContainer}>

            {isLoading== true ?
               <View style={styles.contentLoading}>
               <Image
                   style={styles.logo} resizeMode='center'
                   source={require('../../../../assets/loadingDual.gif')}/>
                   <Text style={{marginTop: -5, color: '#4caf50'}}>Creando Ticket...</Text>
               </View>
            :
            <View style={styles.centeredView}>
            <View style={styles.contentForm}>
                <ScrollView>
                <Text style={styles.modalText}>Crear un nuevo Ticket</Text>

                <View style={styles.contentPickers}>
                <Picker itemStyle={styles.itemStyle}
                        prompt='Seleccione Sede'
                        selectedValue={data.sucursal}
                        style={styles.pickerSede}
                        onValueChange={(itemValue, itemIndex) => setSede(itemValue)}>
                        <Picker.Item label="San Borja" value="4" key='san borja'/>
                    </Picker>
                    <Picker itemStyle={styles.itemStyle}
                        prompt='Seleccione Prioridad'
                        selectedValue={data.priority}
                        style={styles.pickerPriority}
                        onValueChange={(itemValue, itemIndex) => {setData({
                          ...data, priority: itemValue
                        })}}>
                        <Picker.Item label="Normal" value="2" key='normal'/>
                        <Picker.Item label="Emergencia" value="4" key='emergency'/>
                        <Picker.Item label="Alta" value="3" key='alta'/>
                        <Picker.Item label="Baja" value="1" key='baja'/>
                    </Picker>
                </View>

                <TextInput label='Nombres Completos' placeholder='Fullname' style={styles.inputText}
                  value={data.name} mode='flat' disabled={role=='user' ? true : false}
                ></TextInput>
                <TextInput label='Correo Electrónico' placeholder='Email' style={styles.inputText}
                  value={data.email} mode='flat' disabled={role=='user' ? true : false}
                ></TextInput>
                <TextInput label='Teléfono' mode='flat' placeholder='Teléfono' style={styles.inputText}
                 onChangeText={(val) => setData({...data, phone: val})} value={data.phone}
                ></TextInput>
                <TextInput label='Asunto' mode='flat' placeholder='Tema de Ayuda' style={styles.inputText}
                  onChangeText={(val)=> setData({...data, subject: val})} value={data.subject}
                  
                ></TextInput>
                <TextInput label='Descripción' mode='flat' placeholder='Escribe una Descripción...' style={styles.inputMessage}
                  underlineColorAndroid='transparent' multiline={true} numberOfLines={5}
                  onChangeText={(val)=> setData({...data, message: val})} value={data.message}
                 
                ></TextInput>
                </ScrollView>

                <View style={styles.contentFooter}>
              <TouchableHighlight
                style={{ ...styles.openButton}}
                onPress={() => {
                  createTicket()

                }}>
              <Text style={styles.textStyle, {marginLeft: 8}}><Icon color='#fff' name='send' size={25}></Icon> </Text>
              </TouchableHighlight>
              </View>
              </View>

              
          </View>
            }

            <Snackbar
                style={{backgroundColor: '#ffecb3', width: '70%', marginTop: 10}}
                wrapperStyle={{position: 'absolute', top: 0, alignItems: 'flex-end'}}
                visible={visible.snackError}
                duration={2000}
                onDismiss={_onDismissSnackBarError}
                action={{
                    label: <FontAwesome
                    name='warning' color='#ff9800' size={25}/>,
                    onPress: () => {}
                }}
            >
            <Text style={{color: '#ff9800', fontWeight: 'bold'}}>Complete los campos!</Text>
          </Snackbar>
            
          <Snackbar
                style={created==true ? {backgroundColor: '#c8e6c9', marginTop: 10} : {backgroundColor: '#ffcdd2', marginTop: 10}}
                wrapperStyle={{position: 'absolute', top: 0, }}
                //wrapperStyle={{position: 'absolute', top: 15}}
                visible={visible.snack}
                duration={3000}
                onDismiss={_onDismissSnackBar}
                action={created==true ?
                  {label: <Feather
                    name='check' color='#4caf50' size={25}/>,
                    onPress: () => {setVisible(false)}}
                    :
                    {label: <FontAwesome
                      name='exclamation-circle' color='#E31500' size={25}/>,
                      onPress: () => {}}
                  }
            >
          {created==true ?
          <Text style={{color: 'green', fontWeight: 'bold'}}>OK! Ticket Creado Correctamente...</Text>
          :
          <Text style={{color: '#E31500', fontWeight: 'bold'}}>Error! El ticket no ha sido creado</Text>
          }
          </Snackbar>

      </View>
      );
}

const styles = StyleSheet.create({
  viewContainer:{
    flex: 1,
    //paddingVertical: 10,
    width: '100%',
},
btnContent: {
    position: 'absolute',
    right: 0,
    marginTop: 15
    //top: 15
},
contentLoading: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center'
},
//MODAL
centeredView: {
  flex: 1,
  //justifyContent: "center",
  alignItems: "center",
  opacity: 1,
},

contentForm: {
  //flex: 1,
  width: '90%',
  height: '95%',
  borderRadius: 5,
  borderWidth: 1,
  borderColor: '#E0E0E0',
  padding: 15,
  marginVertical: 10,
  backgroundColor: '#EBEDF8'
},
contentPickers: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderWidth: 1,
  borderColor: '#E0E0E0',
  shadowOpacity: 0.25,
},
pickerSede: {
  height: 50, 
  width: '50%',
  color: '#474747'
},
pickerPriority: {
  height: 50, 
  width: '50%',
  color: '#474747'
},
inputText: {
  //flex: 1,
  color: 'gray',
  marginVertical: 5,
  backgroundColor: '#fff',
  height: 50,
  paddingHorizontal: 10,
},
inputMessage: {
  color: '#05375a',
  marginVertical: 5,
  backgroundColor: '#fff',
  height: 100,
  paddingHorizontal: 10,
},
openButton: {
  backgroundColor: "#4caf50",
  borderRadius: 200,
  //padding: 10,
  elevation: 10,
  width: 50,
  height: 50,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
},
textStyle: {
  color: "#fff",
  fontWeight: "bold",
  textAlign: "center",
},
modalText: {
  marginBottom: 15,
  textAlign: "center",
  fontSize: 20,
  fontWeight: 'bold',
  color: '#4caf50'
},
contentFooter: {
  width: 280,
  height: 50,
  alignSelf: 'center',
  alignItems: 'flex-end'
}

});






{/* <Button title="Home" onPress={()=>navigation.navigate("Home")}></Button> */}
          {/*<Button title="To home" onPress={()=>navigation.navigate("Home")}></Button>
          <Button title="back" onPress={()=>navigation.goBack()}></Button>
        <Button title="firts screen" onPress={()=>navigation.popToTop()}></Button>*/}
