import React from 'react'
import {Text, Modal,ActivityIndicator, TextInput, View, StyleSheet, TouchableOpacity, Image, Alert, Dimensions } from 'react-native'
import {Card, Button, Snackbar, RadioButton} from 'react-native-paper';
import {Feather, AntDesign, FontAwesome, FontAwesome5} from 'react-native-vector-icons';
import { AuthContext } from '../../context';
import User from '../../models/users';
import AuthService from '../../services/Auth';
import AsyncStorage from '@react-native-community/async-storage';

export default function Login() {
    const [visible, setVisible] = React.useState({
        snack: false,
        loading: false
    });

    const _onDismissSnackBar = () => setVisible({snack: false});
    
    const [modalVisible, setModalVisible] = React.useState(false);
    const [checked, setChecked] = React.useState('user');


    const [data, setData] = React.useState({
        username: '',
        password: '',
        checkInputChange: false,
        securePassEntry: true
    });

    const [email, setEmail] = React.useState('');
    const [pass, setPass] = React.useState('');

    //use conext
    const { signIn } = React.useContext(AuthContext);


    //validation InputText
    const textInputChange=(val)=>{
        if(val.trim().match('@')){
            setData({
                ...data,
                username: val,
                check_TextInputChange: true
            })
        }else{
            setData({
                ...data,
                email: val,
                check_TextInputChange: false
            })
        }
    }

    const passwdInputChange=(val)=>{
            setData({
                ...data,
                password: val
            })
    }
    const updateSecureEntryPasswd=()=>{
        setData({
            ...data,
            securePassEntry: !data.securePassEntry 
        })
    }

    function isValidate(){
        setVisible({
            loading: true,
            snack: true
        })
    }

    const login =async()=>{
        let us=new User(); 
        if(email.length == 0 && pass.length == 0){
            return (
                isValidate()
                //setModalVisible(true)
            );
        }
        let user = await AuthService.signIn(email, pass, checked);
        console.log(user.status)
        console.log(user.role)

        if(!user){
            return(
                isValidate()
            )
        }

        if(user.status===true){
            setModalVisible(true)
            setTimeout(() => {
                signIn(user);
            }, 4000)
            //console.log(user);
        }else{
            return(isValidate() )
        }  
    }

    const init = () =>{
        login();
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.imageContent}>
                <Image
                    style={styles.logo} resizeMode='stretch'
                    source={require('../../../assets/osticket.png')}/>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.action}>
                    <FontAwesome name='user-circle' color='#006' size={25}/>
                    <TextInput placeholder='Usuario / Correo Electrónico' style={styles.textInput}
                        autoCapitalize='none'onChangeText={(val)=> setEmail(val)}
                    ></TextInput>
                    {email.match('@') ?
                    <Feather name='check' color='green' size={20}/>
                    : 
                    <FontAwesome name='exclamation-circle' color='gray' size={20}/>
                    }
                </View>

                <View style={styles.action}>
                    <FontAwesome5 name='lock' color='#006' size={25}/>
                    <TextInput placeholder='Contraseña' 
                        secureTextEntry={data.securePassEntry ? true : false}
                        style={styles.textInput} autoCapitalize='none'
                        onChangeText={(val)=> setPass(val)}
                    ></TextInput>
                    <TouchableOpacity onPress={updateSecureEntryPasswd} >
                        {data.securePassEntry ?
                        <Feather name='eye-off' color='gray' size={20}/>
                        :
                        <Feather name='eye' color='green' size={20}/>
                        }
                    </TouchableOpacity>
                </View>
                
                <View style={styles.radioButton}>
                <RadioButton
                    value="user"
                    status={ checked === 'user' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('user')}
                    color='#0277bd' uncheckedColor='#76BDE7'
                    />
                    <Text>Usuario</Text>
                <RadioButton 
                    value="staff"
                    status={ checked === 'staff' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('staff')}
                    color='#0277bd' uncheckedColor='#76BDE7'
                />
                <Text>Agente</Text>
                </View>

                <View style={styles.actionContent}>
                    <Button style={styles.btnSingIn} mode="contained" 
                    loading={visible.loading} onPress={init}>INICIAR SESIÓN</Button>
                </View>
                
            </View>

            <Snackbar
                style={{backgroundColor: '#ffcdd2', width: '70%',position: 
                'absolute', right: 0, marginHorizontal: 0}}
                wrapperStyle={{position: 'absolute', top: 20}}
                visible={visible.snack}
                duration={2000}
                onDismiss={_onDismissSnackBar}
                action={{
                    label: <FontAwesome
                    name='exclamation-circle' color='#E31500' size={25}/>,
                    onPress: () => {}
                }}
            >
          <Text style={{color: '#E31500', fontWeight: 'bold'}}>
              Credenciales Incorrectas! </Text>
        </Snackbar>
            {/* <View style={styles.footer}>

            </View> */}
            <View style={styles.centeredView}>
                <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");}}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Image resizeMode='center' source={require("../../../assets/loadingSpinWhite.gif")}></Image>
                            <Text style={styles.please}>Por favor espere...</Text>
                        </View>
                    </View>
                </Modal>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContent: {
        minWidth: 200,
        maxWidth: 220,
        minHeight: 100,
        maxHeight: 120,
    },
    logo: {
       minWidth: 200,
       maxWidth: 200,
       minHeight: 100,
       maxHeight: 140,
    },
    header:{
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    alert:{
        color: '#ff8'
    },  
    /* logo:{
        minWidth: 200,
        maxHeight: 500,
        marginVertical: 20,
        paddingVertical: 10
    }, */
    main:{
        flex: 3,
        //justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginHorizontal: 20
        
    },
    action:{
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        marginVertical: 10,
        minWidth: 300,
        backgroundColor: '#fff',
        marginVertical: 10,
        paddingHorizontal: 5
        //borderBottomColor: 'FF7713'
    },
    radioButton:{
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        minWidth: 300,
        paddingHorizontal: 5,
        height: 50
    },
    actionContent:{
        flexDirection: 'row',
        display: 'flex',
        alignItems: 'center',
        marginVertical: 10,
        minWidth: 300,
        marginVertical: 10,
        paddingHorizontal: 5
        //borderBottomColor: 'FF7713'
    },
    textInput: {
        flex: 1,
        paddingLeft: 10,
        color: '#05375a',
        marginLeft: 10,
        backgroundColor: '#fff',
        paddingVertical:10
        //width: 300
    },
    btnSingIn:{
        paddingVertical: 5,
        minWidth: 300,
        backgroundColor: '#0277bd',
        elevation: 3
    },
    footer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },

    //MODAL
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //marginTop: 22,
        backgroundColor: '#002949',
        opacity: 0.8
      },
      modalView: {
        margin: 20,
        backgroundColor: "#0277bd",
        //opacity: 0,
        borderRadius: 15,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        borderWidth: 1,
        borderColor: '#01579b'
      },
      please: {
          marginTop: -10,
          color: '#fff'
      },
      

});