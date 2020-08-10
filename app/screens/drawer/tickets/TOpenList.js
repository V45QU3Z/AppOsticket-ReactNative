import React, { useEffect } from 'react'
import { Text, ActivityIndicator, StyleSheet, View, FlatList, Image, Alert } from 'react-native'
import TicketsService from '../../../services/Tickets';
import { List, Searchbar } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';

export default function TicketsList() {

    const navigation = useNavigation();

    const [searchQuery, setSearchQuery] = React.useState('');

    const [data, setData] = React.useState({
        isLoading: true,
        data: [],
        expanded: true,
        refreshing: false
    });
    const [page, setPage] = React.useState(0);
    const [loadingMore, setLoadingMore] = React.useState(false);
    const [loadingSearch, setLoadingSearch] = React.useState(false);
    const limit = 25;
    const ticket = 'open';
     useEffect(() => {
         setLoadingMore(true)
         showTickets()
        
    }, []) 

     useEffect(() => {
        try {
            if(searchQuery===''){
                TicketsService.getAllTicketForParameter(ticket,'', page, limit)
                .then(result => {
                    setData({
                        isLoading: false,
                        data: result.tickets,
                        refreshing: false
                    })
                })
            }else{
                console.log('Error')
            }
            
        } catch (error) {
            console.log(error)
        }

    }, [data.refreshing, searchQuery])

     const showTickets = async() => {
        try {
            let result = await TicketsService.getAllTicketForParameter(ticket,'', page, limit);
            //let Tickets = result.tickets;
            setData({
                isLoading: false,
                data: result.tickets,
                refreshing: false
            })
            setLoadingMore(false)
            //console.log(result.tickets);
        } catch (error) {
            console.log(error)
        }
    } 


    const refreshList = () =>{
        setData({
            isLoading: true,
            refreshing: true
        }); 
        setPage(0)
        setSearchQuery('')
        setLoadingSearch(false)
    }

     useFocusEffect(
        React.useCallback(() => {
            setData({
                isLoading: true
            })
            showTickets
            setSearchQuery('')
            setLoadingSearch(false)
          return () => {
            //alert('other unfocused');
           refreshList
          };
        }, [])
    ); 

    const renderFooter = () =>{
        return(
            loadingMore==true ?
            <View style={{marginBottom: 40, marginTop: 30}}>
                <ActivityIndicator color='#4caf50' size='large'></ActivityIndicator>
            </View>
            : null
        )
    }

    const handleLoadMore = async() => {
        //setPage(page+limit);
        setLoadingMore(true)
        //setData({isLoading: true})
        try {
            let result = await TicketsService.getAllTicketForParameter(ticket,'', page+limit, limit);
            setPage(page+limit)
            //setLoadingMore(true)
            setData({
                isLoading: false,
                data: data.data.concat(result.tickets),
                refreshing: false
            })            
        } catch (error) {
            console.log(error)
        }
        //console.log('refe5rescabndo: ', page)
    } 

    const finishedTickets = () => {
        setLoadingMore(false)
       console.log('no hay mas tickets')
       /* setTimeout(() => {
        return(
            Alert.alert('Nota', 'No se econtraron mas tickets')
        )
       }, 2000) */
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
       
     async function searchTickets(){
         setData({isLoading:true})
         setLoadingSearch(true)
        try {
            let result = await TicketsService.getAllTicketForParameter(searchQuery,'open', 0, limit); 
            setData({
                isLoading: false,
                data: result.tickets,
                refreshing: false
            })
            setLoadingMore(false)
            setPage(0)
            console.log(result.tickets)
        } catch (error) {
            
        }
    }
    

        return (
           <View style={styles.container}>
            {data.isLoading ? 
                <View style={styles.contentLoading}> 
                   <Image resizeMode='center' source={loadingSearch==true ? 
                    require("../../../../assets/loadingDual.gif")
                    :
                    require("../../../../assets/loadingSpinnerGreen.gif")
                    }></Image>
                    <Text style={{marginTop: -5, color: '#4caf50'}}>
                        {loadingSearch==true ? 'Buscando ticket... '+searchQuery : 'Cargando Tickets... '}
                    </Text>
                </View>
            :
            
            <View style={styles.container}>
                <Searchbar
                    placeholder="Buscar..."
                    onChangeText={(value) => {setSearchQuery(value)}}
                    value={searchQuery}
                    style={{marginTop: 25, width: '95%'}}
                    onBlur={searchTickets}
                    onIconPress={searchTickets}
                    iconColor='#0277bd' 
                    placeholderTextColor='#76BDE7'
                />
                {data.data !== undefined ?
                    <FlatList style={styles.flatlist} data={data.data} extraData={data} 
                    refreshing={data.refreshing} 
                    onRefresh={refreshList}
                    renderItem={({item}) => (
                    <View style={(item.priority==='Emergencia' || item.priority==='Alta') ? styles.contentEmerg : styles.contentview}>
                        <View style={(item.priority==='Emergencia' || item.priority==='Alta') ? styles.itemNotEmerg : styles.itemtitle}>
                            <Text style={styles.t_number}>{item.ticket_number}</Text>
                            <View style={styles.newContent}> 
                                {item.priority==='Emergencia' ? 
                                    <Text style={styles.emergency}>{item.priority}</Text>
                                    : 
                                    <View>
                                        {item.priority==='Alta' ?
                                        <Text style={styles.priorityHig}>{item.priority}</Text>         
                                        :
                                        <View>
                                            {item.priority==='Normal' ? 
                                            <Text style={styles.qunatity}>{item.priority}</Text>
                                            :
                                            <Text style={styles.qunatity}>{item.priority}</Text>
                                            }
                                        </View>
                                        }
                                    </View>
                                }
                            </View>
                        </View>
                        <List.Item style={styles.listitem} title={item.subject} 
                        titleStyle={{color: '#7E7E7E', fontSize: 15, fontWeight: 'bold'}}
                        descriptionStyle={{fontSize: 12}}
                        description={'Creado - '+item.create_timestamp+'    Estado - '+item.ticket_status}
                        onPress={() => navigation.navigate('TOpenDet', item)}
                        //left={props => <List.Icon {...props} icon="folder" />}
                        />
                    </View>
                    )} keyExtractor={(item, index) => index.toString()}
                    onEndReached={(page+limit) > data.data.length ? finishedTickets : handleLoadMore}
                    onEndReachedThreshold={0.3}
                    ListFooterComponent={renderFooter} 
                    >
                </FlatList>
                :
                <Text style={{color: 'red', marginVertical: 10, fontWeight: 'bold'}}>
                    No se encontro ningún ticket {searchQuery}</Text>
                }
                
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
        paddingBottom: 10,
        //marginBottom: 20
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
        top: 0,
        marginBottom: 20
    },
    contentview: {
        elevation: 1,
        //borderColor: 'gray',
        //marginVertical: 5,
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
        marginBottom: 10
    },
    contentEmerg:{
        elevation: 1,
        marginVertical: 5,
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
    itemNotEmerg:{
        backgroundColor: '#FFCDD2',
        paddingVertical: 5,
        paddingHorizontal: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#FFCDD2',
        justifyContent:'center'
    },
    t_number: {
        fontSize: 15,
        color: '#353535',
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
        borderRadius: 3,
        fontSize: 12,
        /* width: 45, */
        textAlign: 'center',
        paddingHorizontal: 4,
        paddingVertical: 3,
        fontWeight: 'bold',
    },
    emergency: {
        backgroundColor: '#E94343',
        color: '#fff',
        borderRadius: 3,
        fontSize: 12,
        paddingHorizontal: 4,
        paddingVertical: 3,
        fontWeight: 'bold',
    },
    priorityHig: {
        backgroundColor: '#FF841D',
        color: '#fff',
        borderRadius: 3,
        fontSize: 12,
        width: 45,
        paddingHorizontal: 4,
        paddingVertical: 3,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    listitem: {
        //backgroundColor: 'gray',
        paddingTop: 0,    
    }
})