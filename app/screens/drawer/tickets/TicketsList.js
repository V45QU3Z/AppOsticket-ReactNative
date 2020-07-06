import React, { useEffect } from 'react'
import { Text, ActivityIndicator, StyleSheet, View, FlatList, ScrollView } from 'react-native'
import TicketsService from '../../../services/Tickets';
import AsyncStorage from '@react-native-community/async-storage';
import { List, Button } from 'react-native-paper';
import NewTicket from './NewTicket';
import TicketsScreen from '../screens/TicketsScreen';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

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

    const tnumber = async(number) => {
        let result = await TicketsService.getAllTicketsNumber(number);
        let res = result.ticket;
        console.log(res)
    }

    useEffect(() => {
        AsyncStorage.getItem('userToken')
            .then(apikey => {
                AsyncStorage.getItem('email')
                    .then(email => {
                        showTickets(email, apikey);
                        tnumber('129661');
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

    const detail = () => {
        console.log('pressed detail ticket')
        //navigation.navigate('Details');
    }

        return (
           <View style={styles.container}>
            {data.isLoading ? 
            <View style={styles.contentLoading}> 
                <ActivityIndicator size='large' color='#FF7713'></ActivityIndicator>
                <Text style={{marginVertical: 10, color: '#FF7713'}}>Loading...</Text>
            </View>
            :
            
            <View style={styles.container}>
                <NewTicket></NewTicket> 
               {/*  <ScrollView style={{width: '100%'}}> */}
                <FlatList style={styles.flatlist} data={data.data} extraData={data} 
                refreshing={data.refreshing} onRefresh={refreshList} renderItem={({item}) => (
                <View style={styles.contentview}>
                    <Text style={styles.itemtitle}>{item.ticket_number}</Text>
                    <List.Item style={styles.listitem} title={item.subject} 
                    description={item.create_timestamp +' - '+ item.ticket_status}
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
        alignItems: 'center'
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
        top: 15
    },
    contentview: {
        elevation: 1,
        //borderColor: 'gray',
        marginVertical: 5,
        shadowColor: '#E0E0E0',
        shadowRadius: 3,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.5,
        borderRadius: 3,
        borderColor: '#E0E0E0',
        borderWidth: 1,
    },
    itemtitle:{
        backgroundColor: '#FFE0C7',
        paddingVertical: 5,
        paddingHorizontal: 18,
        fontSize: 15,
        fontWeight: 'bold'
    },
    listitem: {
        //backgroundColor: 'gray',
        paddingTop: 0,    
    }
})