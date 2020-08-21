import React, { useEffect } from 'react'
import { Text, ActivityIndicator, StyleSheet, View, FlatList, Image} from 'react-native'
import TicketsService from '../../../services/TicketsService';
import { List, Button } from 'react-native-paper';
import HTMLView from 'react-native-htmlview';

export default function TicketDet({ route }) {
    
    const {ticket_number, subject, priority,department} = route.params;
    const [expanded, setExpanded] = React.useState(true);

    const [data, setData] = React.useState({
        isLoading: true,
        data: [],
        refreshing: false
    });
    const page = 0;
    const limit = 25;
    
    const getTDetailTicket = async() => {
        try {
            let result = await TicketsService.getAllTicketForParameter(ticket_number,'open', page, limit);
            setData({
                isLoading: false,
                data: result.tickets[0].thread_entries,
                refreshing: false
            })
            console.log(result.tickets[0].thread_entries); 
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getTDetailTicket();
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
                <Image resizeMode='center' source={require("../../../../assets/loadingSpinnerGreen.gif")}></Image>
                    <Text style={{marginTop: -20, color: '#4caf50'}}>Cargando Respuestas...</Text>
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
                <View style={(priority=='Emergencia' || priority=='Alta') ? 
                            styles.contentviewEmerg
                            :
                            styles.contentview
                            }>
                     <List.Section title={item.poster} style={styles.sectionList} titleStyle={(
                                        priority=='Emergencia' || priority=='Alta') ?
                                        styles.sectionTitleEmerg
                                        :
                                        styles.sectionTitle 
                                        }>
                        <List.Accordion titleStyle={{color: '#7E7E7E', fontWeight: 'bold', fontSize: 15}} 
                                        title={subject} description={'Respondido - '+item.created}
                        >
                        <Text style={styles.itemtitle}>Número de Ticket: <Text style={styles.itemDetails}>{ticket_number}</Text></Text>
                        <Text style={styles.itemtitle}>Asunto: <Text style={styles.itemDetails}>{subject}</Text></Text>
                        <Text style={styles.itemtitle}>Descripción:</Text>
                        <View style={styles.itemtitle}>
                            <HTMLView stylesheet={styleshtml} value={item.body}/>
                        </View>
                        
                        <List.Item style={styles.itemDetails} title={item.source} 
                        titleStyle={{color: '#7E7E7E', fontSize: 15, fontWeight: 'bold'}}
                        descriptionStyle={{fontSize: 12}}
                        description={'Actualización '+item.updated}/>
                        </List.Accordion>
                    </List.Section> 
                </View>
                )} keyExtractor={(item, index) => index.toString()}>
            </FlatList>
                {/* </ScrollView> */}
            </View>
            }
            
           </View>
        )
    }

const styleshtml = StyleSheet.create({
    p:{
        //color: 'red'
    }
})

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
        marginVertical: 10,
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
    contentviewEmerg: {
        elevation: 1,
        marginVertical: 10,
        shadowColor: '#FFCDD2',
        shadowRadius: 3,
        shadowOffset: {
            width: 1,
            height: 1
        },
        shadowOpacity: 0.5,
        borderRadius: 3,
        borderColor: '#FFCDD2',
        borderWidth: 1,
    },
    sectionList: {
        marginVertical: -7
    },
    sectionTitle:{
        backgroundColor: '#b3e5fc',
        paddingHorizontal: 18,
        paddingVertical: 7,
        fontSize: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#DADADA',
        color: '#353535',
        fontWeight: 'bold',   
    },
    sectionTitleEmerg:{
        backgroundColor: '#FFCDD2',
        paddingHorizontal: 18,
        paddingVertical: 7,
        fontSize: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#FFCDD2',
        color: '#353535',
        fontWeight: 'bold',   
    },
    itemtitle:{
        //backgroundColor: '#b3e5fc',
        paddingVertical: 5,
        paddingHorizontal: 18,
        fontSize: 15,
        color: '#7E7E7E',
        fontWeight: 'bold'
    },
    itemMessage: {
        textAlign: 'justify',
        paddingVertical: 5,
        paddingHorizontal: 18,
        fontSize: 15,
        color: '#7E7E7E',
        //fontWeight: 'bold'
    },
    itemDetails: {
        color: '#7E7E7E',
    },
    listitem: {
        //backgroundColor: 'gray',
        paddingTop: 0,    
    }
})