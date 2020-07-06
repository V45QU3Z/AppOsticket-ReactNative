import React from 'react'
import {Text, Modal,ActivityIndicator, View, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import {Card, Button, Snackbar} from 'react-native-paper';
import {Feather, AntDesign, FontAwesome, FontAwesome5} from 'react-native-vector-icons';
import { AuthContext } from '../../context';
import User from '../../models/users';
import AuthService from '../../services/Auth';
import SplashScreen from '../../components/SplashScreen';
import { color } from 'react-native-reanimated';

export default function Login({navigation}) {

    const [alert, useAlert] = React.useState(false);
    const [dismiss, setDismiss] = React.useState(false);
    
    const [visible, setVisible] = React.useState(true);
    const _onToggleSnackBar = () => setVisible(visible ? false : true)
    const _onDismissSnackBar = () => setVisible(false);

    const [modalVisible, setModalVisible] = React.useState(false);

    const [data, setData] = React.useState({
        username: '',
        password: '',
        checkInputChange: false,
        securePassEntry: true
    });
    const [loading, setLoading] = React.useState(false);
    //use conext
    const { signIn } = React.useContext(AuthContext);


    //validation InputText
    const textInputChange=(val)=>{
        if(val.trim().length >= 3){
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

    /* const loginHandle = (username, password) => {
        signIn(username, password);
    } */

    const login =async(username, password)=>{
        let us=new User(); 
        
        if(username.length == 0 && password.length == 0){
            setModalVisible(true);
            setTimeout(() => {
                 return(
                    Alert.alert(
                        'Error!','Username or Password is invalid!!',[
                          {text: 'Ok', onPress: () => setModalVisible(false), style:'destructive'},
                          
                    ]) 
                 );   
            }, 2000)
        }

        let user = await AuthService.signIn(username, password);
        //console.log(user)
        if(username==user.email && password==password){
            setModalVisible(true)
            setTimeout(() => {
                signIn(user);
            }, 3000)
            console.log(user);
            //signIn(user);
        }else{
            setModalVisible(true);
            setTimeout(() => {
                 return(
                    Alert.alert(
                        'Error!','Username or Password is empty!!',[
                          {text: 'Ok', onPress: () => setModalVisible(false), style:'destructive'},     
                    ]) 
                 );   
            }, 2000)
            console.log('Error: datos incorrectos')
        } 
       
    }

    const init = () =>{
        login(data.username, data.password);
    }
    

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                {/* <Text style={{fontSize: 40}}>SIGN IN</Text> */}
                <View>
                <Image
                    style={styles.logo}
                    source={require('../../../assets/osticket.png')}/>
                </View>
            </View>
            <View style={styles.main}>
                <View style={styles.action}>
                    <FontAwesome
                        name='user-circle' color='#006' size={25}
                    />
                    <TextInput
                        placeholder='Email' 
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(val)=> textInputChange(val)}
                    ></TextInput>

                    {data.check_TextInputChange ?
                    <Feather
                     name='check' color='green' size={20}
                    />
                    : 
                    <FontAwesome
                     name='exclamation-circle' color='gray' size={20}/>
                    }

                </View>
                <View style={styles.action}>
                    <FontAwesome5
                        name='lock' color='#006' size={25}
                    />
                    <TextInput
                        placeholder='Password' 
                        secureTextEntry={data.securePassEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize='none'
                        onChangeText={(val)=> passwdInputChange(val)}
                    ></TextInput>

                    <TouchableOpacity onPress={updateSecureEntryPasswd} >
                        {data.securePassEntry ?
                        <Feather name='eye-off' color='gray' size={20}/>
                        :
                        <Feather name='eye' color='green' size={20}/>
                        }
                    </TouchableOpacity>

                </View>
                <View style={styles.action}>
                    <Button 
                        style={styles.btnSingIn}
                        mode="contained" loading={loading} 
                        onPress={init}
                    >Sign In</Button>
                </View>
                
            </View>
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
                            <ActivityIndicator size='large' color='orange'></ActivityIndicator>
                            <Text style={styles.please}>Please await...</Text>
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
    logo: {
        minWidth: 200,
        maxWidth: 220,
        minHeight: 80,
        maxHeight: 90
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
        paddingVertical: 4,
        minWidth: 300,
        backgroundColor: '#FF7713'
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
        backgroundColor: '#000',
        opacity: 0.7
      },
      modalView: {
        margin: 20,
        backgroundColor: "#000",
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
        elevation: 5
      },
      please: {
          marginVertical: 10,
          color: 'orange'
      },
      

});