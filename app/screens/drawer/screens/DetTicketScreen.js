import React, { useEffect } from 'react'
import { Text, ActivityIndicator, StyleSheet, View, FlatList, ScrollView, Alert } from 'react-native'
import TicketsService from '../../../services/Tickets';
import AsyncStorage from '@react-native-community/async-storage';
import { List, Button } from 'react-native-paper';
import TicketsScreen from '../screens/TicketsScreen';
import { CommonActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

export default function DetTicketScreen({ route }) {

    const {ticket_number, subject, department} = route.params;

    const [data, setData] = React.useState({
        isLoading: true,
        data: [],
        refreshing: false
    });
    
    const showTickets = async(number) => {
        try {
            let result = await TicketsService.getAllTicketsNumber(number);
            setData({
                isLoading: false,
                data: result.ticket.thread_entries,
                refreshing: false
            })
            console.log(result.ticket.thread_entries);
            
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        showTickets(ticket_number);
    }, [data.refreshing])

    const refreshList = () =>{
        setData({
            isLoading: true,
            refreshing: true
        }); 
    }

        return (
           <View style={styles.container}>
            {data.isLoading ? 
            <View style={styles.contentLoading}> 
                <ActivityIndicator size='large' color='#4caf50'></ActivityIndicator>
                <Text style={{marginVertical: 10, color: '#4caf50'}}>Loading messages...</Text>
            </View>
            :
            
            <View style={styles.container}>
               {/*  <ScrollView style={{width: '100%'}}> */}
                {/* <View style={styles.helpContainer}>
                <Text style={{fontWeight: 'bold'}}>{'Help topic: '}<Text style={{fontWeight: 'normal'}}>{subject}</Text></Text>
                <Text style={{fontWeight: 'bold'}}>{'Department: '}<Text style={{fontWeight: 'normal'}}>{department}</Text></Text>
                </View> */}
                <FlatList style={styles.flatlist} data={data.data} extraData={data} 
                refreshing={data.refreshing} onRefresh={refreshList} renderItem={({item}) => (
                <View style={styles.contentview}>
                    <Text style={styles.itemtitle}>{item.poster}</Text>
                    <List.Item style={styles.listitem} title={item.body.replace('<p>', '').replace('</p>', '')} 
                    titleStyle={{color: '#2C2C2C', fontSize: 15}}
                    descriptionStyle={{fontSize: 12}}
                    description={'Responded '+item.created}
                    onPress={() => Alert.alert('Description:', item.body.replace('<p>', '').replace('</p>', ''),
                    [{text: 'Close'}]
                    )}
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
    helpContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '100%',
        top: 10,
        fontWeight: 'bold',
        fontSize: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
    flatlist: {
        //flex: 1,
        paddingHorizontal: 10,
        paddingVertical: 10,
        width: '100%',
        marginVertical: 10
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
        fontSize: 15,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#DADADA'
    },
    listitem: {
        //backgroundColor: 'gray',
        paddingTop: 0,    
    }
})