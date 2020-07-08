import React, { useEffect } from 'react';
import { Text, View, Button, StyleSheet, TouchableOpacity, Alert, Modal,
  TouchableHighlight, ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { TextInput, Snackbar } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import TicketService from '../../../services/Tickets';
import {Feather, FontAwesome} from 'react-native-vector-icons';

export default function NewTicket({navigation}) {
  const [visible, setVisible] = React.useState({
    snack: false,
    loading: false,
    snackError: false
  });
  const _onDismissSnackBar = () => setVisible({snack: false});
  const _onDismissSnackBarError = () => setVisible({snackError: false});

  const [modalVisible, setModalVisible] = React.useState(false);
  const [data, setData] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const titleInputChange=(val)=>{
    if(val.trim().length >= 1){
        setData({
            ...data,
            subject: val
        })
    }
  }

  const messageInputChange=(val)=>{
        setData({
            ...data,
            message: val
        })
  }

    
    useEffect(() =>{
      async function async(){
        try {
          let getName = await AsyncStorage.getItem('name');
          let getMail = await AsyncStorage.getItem('email');
          setData({
            ...data,
            name: getName,
            email: getMail
          });
        } catch (error) {
          console.log('Error:', error)
        }
      }
      async();
    }, [])
  
  //const info_user = getEmailAndName();

    function isCreated(){
      setVisible({
        snack: true
      })
    }
    function isError(){
      setVisible({
        snackError: true
      })
    }
    function isErrorOnServer(){
      setModalVisible(!modalVisible);
      Alert.alert('Error', 'Server not conected!',[{
        text: 'CLOSE', onPress: () => {}
      }]);
    }

  async function saveTicket() {
    //console.log(data);
    if(data.subject=='' || data.message==''){
      return(
        isError()
      )
    }else{
      try {
        let user = await TicketService.create(data);
        if(!user){
          return(
            isErrorOnServer()
          )
        }else{
          setModalVisible(!modalVisible);
          isCreated();
        }
      } catch (error) {
        console.log('Error create: ', error);
      }
    }
    
  }

    return (
        <View style={styles.viewContainer}>
          <View style={styles.viewHeader}>
                    <Text style={styles.titleMyTicket}>My Tickets</Text>
                    <TouchableOpacity style={styles.btnContent} onPress={() =>{setModalVisible(true)}}>
                        <Icon style={styles.btnNew} size={30} color='#0DB454' name='note-plus'></Icon>
                    </TouchableOpacity>
          </View>

          <Snackbar
                style={{backgroundColor: '#dcedc8'}}
                //wrapperStyle={{position: 'absolute', top: 15}}
                visible={visible.snack}
                duration={3000}
                onDismiss={_onDismissSnackBar}
                action={{
                    label: <Feather
                    name='check' color='#4caf50' size={25}/>,
                    onPress: () => {}
                }}
            >
          <Text style={{color: '#4caf50', fontWeight: 'bold'}}>Created successfully, refresh your screen</Text>
          </Snackbar>

          <Modal animationType="slide" transparent={true} visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Please close the modal...!");
            }}>

            <View style={styles.centeredView}>
              <View style={styles.modalView}>

                <View style={styles.contentForm}>
                  <ScrollView>
                  <Text style={styles.modalText}>Create New Ticket</Text>
                  <TextInput label='Fullname' placeholder='Fullname' style={styles.inputText}
                    value={data.name} disabled={true}
                  ></TextInput>
                  <TextInput label='Email' placeholder='Email' style={styles.inputText}
                    value={data.email} disabled={true}
                  ></TextInput>
                  <TextInput label='Title' mode='outlined' placeholder='Help Topic' style={styles.inputText}
                    onChangeText={(val)=> titleInputChange(val)}
                  ></TextInput>
                  <TextInput label='Descriptión' mode='outlined' placeholder='Write a description...' style={styles.inputMessage}
                    underlineColorAndroid='transparent' multiline={true} numberOfLines={5}
                    onChangeText={(val)=> messageInputChange(val)}
                  ></TextInput>
                  </ScrollView>
                </View>

                <View style={styles.contentFooter}>
                <TouchableHighlight
                  style={{ ...styles.openButton, backgroundColor: '#FF4C4C'}}
                  onPress={() => {setModalVisible(!modalVisible)}}>
                <Text style={styles.textStyle}><Icon name='close' size={25}></Icon></Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={{ ...styles.openButton}}
                  onPress={() => {
                    saveTicket()

                  }}>
                <Text style={styles.textStyle, {marginLeft: 8}}><Icon color='#fff' name='send' size={25}></Icon> </Text>
                </TouchableHighlight>
                </View>
              </View>
            </View>

            <Snackbar
                style={{backgroundColor: '#ffecb3', width: '70%', marginHorizontal: 20, marginTop: 20}}
                wrapperStyle={{position: 'absolute', top: 60, alignItems: 'flex-end'}}
                visible={visible.snackError}
                duration={2000}
                onDismiss={_onDismissSnackBarError}
                action={{
                    label: <FontAwesome
                    name='warning' color='#ff9800' size={25}/>,
                    onPress: () => {}
                }}
            >
            <Text style={{color: '#ff9800', fontWeight: 'bold'}}>Fill in the empty fields </Text>
          </Snackbar>

        </Modal>

      </View>
      );
}

const styles = StyleSheet.create({
  viewContainer:{
    //flex: 1,
    paddingVertical: 10,
    width: '100%',
},
viewHeader:{
    marginHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
},
titleMyTicket:{
   //fontSize: 18,
   //fontWeight: 'normal'
},
btnContent: {
    position: 'absolute',
    right: 0,
},

//MODAL
centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 55,
  backgroundColor: '#212121',
  opacity: 1
},
modalView: {
  margin: 20,
  backgroundColor: "#fff",
  borderRadius: 5,
  padding: 20,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 15
},
contentForm: {
  flex: 1,
  //backgroundColor: 'red',
  width: 280,
  height: 150,
  borderRadius: 5,
  //borderWidth: 1,
  borderColor: '#E0E0E0',
  padding: 5,
},
inputText: {
  //flex: 1,
  color: 'gray',
  marginVertical: 5,
  backgroundColor: '#fff',
  height: 50,
  paddingHorizontal: 0,
},
inputMessage: {
  color: '#05375a',
  marginVertical: 5,
  backgroundColor: '#fff',
  height: 100,
  paddingHorizontal: 0,
  justifyContent: 'flex-start'
},
openButton: {
  backgroundColor: "#0DB454",
  borderRadius: 200,
  //padding: 10,
  elevation: 10,
  marginLeft: 20,
  marginTop: 10,
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
  fontWeight: 'bold'
},
contentFooter: {
  //flex: 1,
  flexDirection: 'row',
  //backgroundColor: 'red',
  alignSelf: 'flex-end'
}

});






{/* <Button title="Home" onPress={()=>navigation.navigate("Home")}></Button> */}
          {/*<Button title="To home" onPress={()=>navigation.navigate("Home")}></Button>
          <Button title="back" onPress={()=>navigation.goBack()}></Button>
        <Button title="firts screen" onPress={()=>navigation.popToTop()}></Button>*/}
