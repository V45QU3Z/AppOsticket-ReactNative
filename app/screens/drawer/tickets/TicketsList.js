import React, { useEffect } from 'react'
import { Text, ActivityIndicator, StyleSheet, View, FlatList, ScrollView } from 'react-native'
import TicketsService from '../../../services/Tickets';
import AsyncStorage from '@react-native-community/async-storage';
import { List, Button } from 'react-native-paper';
import NewTicket from './NewTicket';
import TicketsScreen from '../screens/TicketsScreen';
import { CommonActions } from '@react-navigation/native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { set } from 'react-native-reanimated';

export default function TicketsList() {

    const navigation = useNavigation();

    const [data, setData] = React.useState({
        isLoading: true,
        data: [],
        expanded: true,
        refreshing: false
    });

    const showTickets = async(email, apikey) => {
        try {
            let result = await TicketsService.getAllTickets(email, apikey);
            //let Tickets = result.tickets;
            setData({
                isLoading: false,
                data: result.tickets,
                refreshing: false
            })
            //console.log(result.tickets);
            
        } catch (error) {
            console.log(error)
        }
    }

     useEffect(() => {
        AsyncStorage.getItem('userToken')
            .then(apikey => {
                AsyncStorage.getItem('email')
                    .then(email => {
                        showTickets(email, apikey);
                    })
            })
            .catch(e => {console.log(e)})
    }, [data.refreshing])

    const refreshList = () =>{
        setData({
            isLoading: true,
            //data: data.data,
            refreshing: true
        }); 
    }

    useFocusEffect(
        React.useCallback(() => {
            setData({
                isLoading: true
            })
            AsyncStorage.getItem('userToken')
            .then(apikey => {
                AsyncStorage.getItem('email')
                    .then(email => {
                        showTickets(email, apikey);
                    })
            })
            .catch(e => {console.log(e)})
          return () => {
            //alert('other unfocused');
           refreshList
          };
        }, [])
    );
    
    function add(){
        return(
            <NewTicket></NewTicket>
        )
    }

    function dateCurrent(){
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear().toString().substr(-2);
        if (month<10){
                month = '0'+month;
        }
        if(day<10){
            day= '0' +day
        }
        return year+'-'+month+'-'+day;
    }
       
    
    //newAdded()

        return (
           <View style={styles.container}>
            {data.isLoading ? 
            <View style={styles.contentLoading}> 
                <ActivityIndicator size='large' color='#4caf50'></ActivityIndicator>
                <Text style={{marginVertical: 10, color: '#4caf50'}}>Loading tickets...</Text>
            </View>
            :
            
            <View style={styles.container}>
                {add()}
               {/*  <ScrollView style={{width: '100%'}}> */}
                <FlatList style={styles.flatlist} data={data.data} extraData={data} 
                refreshing={data.refreshing} onRefresh={refreshList} renderItem={({item}) => (
                <View style={styles.contentview}>
                    <View style={styles.itemtitle}>
                    <Text style={styles.t_number}>{item.ticket_number}</Text>
                    <View style={styles.newContent}> 
                        {item.create_timestamp.match(dateCurrent()) ? 
                        <Text style={styles.new}>New</Text> 
                        : 
                        <Text style={styles.qunatity}>{item.thread_entries.length}</Text>
                        }
                    </View>
                    </View>
                    <List.Item style={styles.listitem} title={item.subject} 
                    titleStyle={{color: '#2C2C2C', fontSize: 15}}
                    descriptionStyle={{fontSize: 12}}
                    description={'Created - '+item.create_timestamp+'    Status - '+item.ticket_status}
                    onPress={() => navigation.navigate('TicketDetail', item)}
                    //left={props => <List.Icon {...props} icon="folder" />}
                    />
                </View>
                )} keyExtractor={(item, index) => index.toString()}>
            </FlatList>
                {/* </ScrollView> */}
            </View>
            }
            
           </View>
        )
    }


const styles = StyleSheet.create({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 10
    },
    contentLoading: {
        display: 'flex',
        //height: '100%',
        marginVertical: 250,
        justifyContent: 'center',
        alignItems: 'center'
    },
    flatlist: {
        //flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        //backgroundColor: 'green',
        width: '100%',
        top: 0
    },
    contentview: {
        elevation: 1,
        //borderColor: 'gray',
        marginVertical: 5,
        shadowColor: '#b3e5fc',
        shadowRadius: 3,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.5,
        borderRadius: 3,
        borderColor: '#b3e5fc',
        borderWidth: 1,
    },
    itemtitle:{
        backgroundColor: '#b3e5fc',
        paddingVertical: 5,
        paddingHorizontal: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#DADADA',
        //flexDirection: 'row',
        //alignSelf: 'stretch' 
        justifyContent:'center'
    },
    t_number: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    newContent: {
        position: 'absolute',
        right: 10,
    },
    new: {
        backgroundColor: '#4caf50',
        color: '#fff',
        borderRadius: 3,
        fontSize: 12,
        paddingHorizontal: 4,
        paddingVertical: 3,
        fontWeight: 'bold',
    },
    qunatity: {
        backgroundColor: '#0277bd',
        color: '#fff',
        borderRadius: 100,
        width: 20,
        height: 20,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    listitem: {
        //backgroundColor: 'gray',
        paddingTop: 0,    
    }
})