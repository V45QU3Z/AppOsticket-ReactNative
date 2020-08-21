import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Picker, Text, ActivityIndicator, Alert } from 'react-native'
import { DataTable, ProgressBar, Colors } from 'react-native-paper';
import DashboardService from '../../../services/DashboardService';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function DTickets({navigation}) {
    
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
        return day+'/'+month+'/'+year;
    }

    function addYearInPicker(){
        let year=new Date().getFullYear();
        let yy=new Array();
        for(let i=1950; i<=year; i++){
            yy.push(i);
            yy.sort((a, b) => b - a);
        }
        return yy;
    }

    /* const date = dateCurrent();
    const fullYearInPicker = addYearInPicker(); */

    let Listmonths = new Array("enero","febrero","marzo","abril","mayo","junio",
                        "julio","agosto","septiembre","octubre","noviembre","diciembre");
    let mm = new Date();
    let month = Listmonths[mm.getMonth()]
    let year = new Date().getFullYear();
    const [selectDate, setSelectDate] = useState({
        month: month,
        year: year
    })

    const [data, setData] = useState({
        open: '',
        open_month: '',
        resolved: '',
        total: '',
        total_month: '',
        reg_today: '',
        closed_today: ''
    });

    const [data_user, setDataUser] = useState({
        open: '',
        open_month: '',
        resolved: '',
        total: '',
        total_month: '',
        reg_today: '',
        closed_today: ''
    });

    const [data_other, setDataOther] = useState({
        open: '',
        open_month: '',
        resolved: '',
        total: '',
        total_month: '',
        reg_today: '',
        closed_today: ''
    });

    const [loading, setLoading] = useState(true);

    async function showMainTickets(mes, anio, apikey){
        try {
            let result = await DashboardService.getAllDashboard(mes, anio, apikey);
            setData({
                //...data,
                open: result.t_open_tickets,
                open_month: result.t_open_month,
                resolved: result.t_resolved_tickets,
                total: result.t_tickets,
                total_month: result.t_tickets_month,
                reg_today: result.t_registered_today,
                closed_today: result.t_closed_today
            })
            setDataUser({
                open: result.t_open_user,
                open_month: result.t_open_month_user,
                resolved: result.t_resolved_user,
                total: result.t_user,
                total_month: result.t_month_user,
                reg_today: result.t_reg_today_user,
                closed_today: result.t_closed_today_user
            });
            setDataOther({
                open: result.t_open_others,
                open_month: result.t_open_month_other,
                resolved: result.t_resolved_others,
                total: result.t_others,
                total_month: result.t_month_others,
                reg_today: result.t_reg_today_others,
                closed_today: result.t_closed_today_others
            });
            setLoading(false)
            //console.log(ticket)
        } catch (error) {
          console.log(error);  
        }   
    }
    
    //no used....
    async function showUserTickets(mes, anio, email, apikey){
        try {
            let result = await DashboardService.getAllDashboardForUser(mes, anio, email, apikey);
            setDataUser({
                open: result.t_open_user,
                open_month: result.t_open_month_user,
                resolved: result.t_resolved_user,
                total: result.t_user,
                total_month: result.t_month_user,
                reg_today: result.t_reg_today_user,
                closed_today: result.t_closed_today_user
            });
            setDataOther({
                open: result.t_open_others,
                open_month: result.t_open_month_other,
                resolved: result.t_resolved_others,
                total: result.t_others,
                total_month: result.t_month_others,
                reg_today: result.t_reg_today_others,
                closed_today: result.t_closed_today_others
            });
            setLoading(false)
            //console.log(result)
        } catch (error) {
          console.log(error);  
        }   
    }
    //.........

    useEffect(()=>{
        if(selectDate.month != '' && selectDate.year != ''){
            refreshTable();
        }
       
    }, [selectDate.month, selectDate.year])

    useFocusEffect(
        React.useCallback(() => {
          //alert('Screen was focused');
          let isSuscribed = true;
          if(isSuscribed){
            refreshTable();
          }
          return () => isSuscribed = false;
        }, [])
      );

    useEffect(() => {
        let isSuscribed = true;
        AsyncStorage.getItem('userToken')
            .then(apikey => {
                if(isSuscribed){
                    showMainTickets(selectDate.month, selectDate.year, apikey);
                }
                /* AsyncStorage.getItem('email')
                    .then(email => {
                        if(isSuscribed){
                            showUserTickets(selectDate.month, selectDate.year, email, apikey);
                            console.log(selectDate.month);
                        }
                        
                    }) */
            })
            .catch(err => {
                console.log(err)
            })

            return () => isSuscribed = false;
    }, []);

    function refreshTable(){
        //console.log(selectDate.month)
        setLoading(true)
            AsyncStorage.getItem('userToken')
                .then(apikey => {
                    showMainTickets(selectDate.month, selectDate.year, apikey);
                    /* AsyncStorage.getItem('email')
                        .then(email => {
                            showUserTickets(selectDate.month, selectDate.year, email, apikey);
                        }) */
                })
                .catch(err => {
                    console.log(err);
                })
    }
   

    return (
        <View style={styles.container}>
            <View style={styles.contentHeader}>
                <View style={styles.contentPickers}>
                    <Text style={styles.titleDate}>Fecha</Text>
                    <Text style={styles.titleMonth}>Mes</Text>
                    <Text style={styles.titleYear}>Año</Text>
                </View>
                <View style={styles.contentPickers}>
                    <View style={{marginLeft: 5, width: 70}}>
                        <Text style={{color: '#474747'}}>{dateCurrent()}</Text>
                    </View>
                    <Picker itemStyle={styles.itemStyle}
                        prompt='Seleccione el mes'
                        selectedValue={selectDate.month}
                        style={styles.pickerMonth}
                        onValueChange={(itemValue, itemIndex) => {
                            setSelectDate({
                                ...selectDate,
                                month: itemValue})
                        }}>
                        <Picker.Item label="Enero" value="enero" key='enero'/>
                        <Picker.Item label="Febrero" value="febrero" key='febrero'/>
                        <Picker.Item label="Marzo" value="marzo" key='marzo'/>
                        <Picker.Item label="Abril" value="abril" key='abril'/>
                        <Picker.Item label="Mayo" value="mayo" key='mayo'/>
                        <Picker.Item label="Junio" value="junio" key='jun io'/>
                        <Picker.Item label="Julio" value="julio" key='julio'/>
                        <Picker.Item label="Agosto" value="agosto" key='maragostozo'/>
                        <Picker.Item label="Septiembre" value="septiembre" key='septiembre'/>
                        <Picker.Item label="Octubre" value="octubre" key='octubre'/>
                        <Picker.Item label="Noviembre" value="noviembre" key='noviembre'/>
                        <Picker.Item label="Diciembre" value="diciembre" key='diciembre'/>
                    </Picker>
                    <Picker
                        selectedValue={selectDate.year}
                        prompt='Seleccione el año'
                        style={styles.pickerYear}
                        onValueChange={(itemValue) => {
                            setSelectDate({
                                ...selectDate,
                                year: itemValue})
                        }}>
                        {/* <Picker.Item label='2020' value='2020'></Picker.Item>
                        <Picker.Item label='2019' value='2019'></Picker.Item>
                        <Picker.Item label='2018' value='2018'></Picker.Item> */}
                        {addYearInPicker().map(item => {
                            return (<Picker.Item label={item.toString()} value={item} key={item}/>) 
                        })}
                    </Picker>
                </View>
            </View>
            {loading == true ? 
            <View style={styles.contentLoading}> 
                <ActivityIndicator size='large' color='#4caf50'></ActivityIndicator>
                <Text style={{marginVertical: 10, color: '#4caf50'}}>Cargando...</Text>
            </View>
            :
            <View>
                <DataTable style={styles.table}>
                <DataTable.Header style={styles.tableRowHeader}>
                    <DataTable.Title><Text style={styles.titleHeader}>Estado</Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={styles.titleHeader}>General</Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={styles.titleHeader}>N2</Text></DataTable.Title>
                    <DataTable.Title numeric><Text style={styles.titleHeader}>N3</Text></DataTable.Title>
                </DataTable.Header>

                <DataTable.Row style={styles.tableRow}>
                    <DataTable.Cell><Text style={styles.badgeOpen}>Tot. Abiertos</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data.open}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data_user.open}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data_other.open}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableRow}>
                    <DataTable.Cell><Text style={styles.badgeOpen}>Tot. Abi. Mes</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data.open_month}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data_user.open_month}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data_other.open_month}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableRowAtt}>
                    <DataTable.Cell><Text style={styles.badgeAttended}>Tot. Att. Mes</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeAttended}>{data.resolved}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeAttended}>{data_user.resolved}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeAttended}>{data_other.resolved}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableRowTotal}>
                    <DataTable.Cell><Text style={styles.badgeTotal}>Total Tickets</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeTotal}>{data.total}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeTotal}>{data_user.total}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeTotal}>{data_other.total}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableRowMonth}>
                    <DataTable.Cell><Text style={styles.badgeMonth}>Tot. Tks. Mes</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeMonth}>{data.total_month}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeMonth}>{data_user.total_month}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeMonth}>{data_other.total_month}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableRowToday}>
                    <DataTable.Cell><Text style={styles.badgeRegToday}>Tot. Reg. Hoy</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeRegToday}>{data.reg_today}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeRegToday}>{data_user.reg_today}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeRegToday}>{data_other.reg_today}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableRowClsToday}>
                    <DataTable.Cell><Text style={styles.badgeClsToday}>Tot. Cds. Hoy</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeClsToday}>{data.closed_today}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeClsToday}>{data_user.closed_today}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeClsToday}>{data_other.closed_today}</Text></DataTable.Cell>
                </DataTable.Row>

                {/* <DataTable.Pagination
                    page={1}
                    numberOfPages={3}
                    onPageChange={(page) => { console.log(page); }}
                    label="1-2 of 6"
                /> */}
            </DataTable>
            </View>  
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#009',
        width: '100%',
        marginTop: 10
    },
    contentLoading: {
        flex: 1,
        //height: '100%',
        //marginVertical: 200,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    contentHeader: {
        marginBottom: 20
    },
    contentPickers: {
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowOpacity: 0.25,
    },
    titleDate:{
        paddingVertical: 5, 
        color: '#474747',
        //backgroundColor: 'red', 
        marginLeft: 5, 
        width: 70
    },
    titleMonth:{
        paddingVertical: 5, 
        color: '#474747',
        //: 'green', 
        marginLeft: 10, 
        width: 130,
    },
    titleYear:{
        paddingVertical: 5, 
        color: '#474747',
        //backgroundColor: 'red', 
        marginHorizontal: 10, 
        width: 65
    },
    pickerMonth: {
        height: 50, 
        width: 140,
        color: '#474747',
    },
    pickerYear: {
        height: 50, 
        width: 110,
        color: '#474747'
    },
    itemStyle: {
        
    },
    table: {
        borderWidth: 1,
        borderColor: '#b3e5fc',
        shadowColor: '#b3e5fc',
        shadowOffset: {
            width: 1,
            height: 2
        },
        shadowRadius: 5,
        shadowOpacity: 0.25,
        elevation: 1
    },
    titleHeader: {
        fontWeight: 'bold',        //fontSize: 15
    },
    tableRowHeader: {
        backgroundColor: '#b3e5fc'
    },

    /* tableRow: {
        backgroundColor: '#fff3e0'
    },
    tableRowAtt: {
        backgroundColor: '#e8f5e9'
    },
    tableRowTotal: {
        backgroundColor: '#e1f5fe'
    },
    tableRowMonth: {
        backgroundColor: '#e1f5fe'
    },
    tableRowToday: {
        backgroundColor: '#e0f2f1'
    },
    tableRowClsToday: {
        backgroundColor: '#ffebee'
    }, */
    cellOpen: {
        //marginLeft: 50
    },
    badgeOpen: {
        color: '#ff9800',
        fontWeight: 'bold',
        fontSize: 12
    },
    badgeAttended: {
        color: '#4caf50',
        fontWeight: 'bold',
        fontSize: 12
    },
    badgeTotal: {
        color: '#2196f3',
        fontWeight: 'bold',
        fontSize: 12
    },
    badgeMonth: {
        color: '#2196f3',
        fontWeight: 'bold',
        fontSize: 12
    },
    badgeRegToday: {
        color: '#009688',
        fontWeight: 'bold',
        fontSize: 12
    },
    badgeClsToday: {
        color: '#f44336',
        fontWeight: 'bold',
        fontSize: 12
    }
});
