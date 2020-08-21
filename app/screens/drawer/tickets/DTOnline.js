import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Picker, Text, ActivityIndicator, Image } from 'react-native'
import { DataTable, ProgressBar, Colors } from 'react-native-paper';
import DashboardService from '../../../services/DashboardService';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { List } from 'react-native-paper';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
export default function DTOnline({navigation}) {

    let Listmonths = new Array("Enero","Febrero","Marzo","Abril","Mayo","Junio",
                        "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    let mm = new Date();
    let month = Listmonths[mm.getMonth()]
    let year = new Date().getFullYear();

    const [childOpen, setChildOpen] = useState(false);
    const [childAtt, setChildAtt] = useState(false);

    const [data, setData] = useState({
        open: '',
        open_month: '',
        open_other_month: '',
        resolved: '',
        res_month: '', 
        res_other_month: '',
        registered: '',
        reg_today: '',
        closed_today: ''
    });

    const [data_user, setDataUser] = useState({
        open: '',
        open_month: '',
        open_other_month: '',
        resolved: '',
        res_month: '', 
        res_other_month: '',
        registered: '',
        reg_today: '',
        closed_today: ''
    });

    const [data_other, setDataOther] = useState({
        open: '',
        open_month: '',
        open_other_month: '',
        resolved: '',
        res_month: '', 
        res_other_month: '',
        registered: '',
        reg_today: '',
        closed_today: ''
    });

    const [loading, setLoading] = useState(true);

    async function getOnlineTickets(){
        try {
            let result = await DashboardService.getAllDTOnline();
            setData({
                open: result.t_open_tickets,
                open_month: result._t_open_month,
                open_other_month: result._t_open_other_month,
                resolved: result.t_resolved_tickets,
                res_month: result._t_resolved_month,
                res_other_month: result._t_resolved_other_month,
                registered: result.t_registered_tickets,
                reg_today: result.t_registered_today,
                closed_today: result.t_closed_today
            })
            setDataUser({
                open: result.t_open_user,
                open_month: result._t_open_month_user,
                open_other_month: result._t_open_o_month_user,
                resolved: result.t_resolved_user,
                res_month: result._t_resolved_month_user,
                res_other_month: result._t_resolved_o_month_user,
                registered: result.t_registered_user,
                reg_today: result.t_registered_today_user,
                closed_today: result.t_closed_today_user
            });
            setDataOther({
                open: result.t_open_other,
                open_month: result._t_open_month_other,
                open_other_month: result._t_open_o_month_other,
                resolved: result.t_resolved_other,
                res_month: result._t_resolved_month_other,
                res_other_month: result._t_resolved_o_month_other,
                registered: result.t_registered_other,
                reg_today: result.t_registered_today_other,
                closed_today: result.t_closed_today_other
            });
            setLoading(false)
            //console.log(ticket)
        } catch (error) {
          console.log(error);  
        }   
    }
    

    useFocusEffect(
        React.useCallback(() => {
          //alert('Screen was focused');
          let isSuscribed = true;
          if(isSuscribed){
            refreshTable();
            setChildOpen(false);
            setChildAtt(false);
          }
          return () => isSuscribed = false;
        }, [])
      );

    function refreshTable(){
        //console.log(selectDate.month)
        setLoading(true)
        getOnlineTickets();
    }
   
    const _onPressOpn = () => {
        setChildOpen(!childOpen)
    }

    const _onPressAtt = () => {
        setChildAtt(!childAtt)
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentHeader}>
                {/* <Text style={styles.titleDate}>Fecha</Text>
                <Text style={styles.titleMonth}>Mes</Text> */}
                <Text style={styles.titleYear}>{month} - {year}</Text>
            </View>
            {loading == true ? 
            <View style={styles.contentLoading}> 
                <Image resizeMode='center' source={require("../../../../assets/loadingSpinnerGreen.gif")}></Image>
                <Text style={{marginTop: -20, color: '#4caf50'}}>Cargando Estadística...</Text>
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

               
                <DataTable.Row onPress={_onPressOpn} style={styles.tableRow}>
                    <DataTable.Cell><Text style={styles.badgeOpen}>
                        {childOpen ? 
                            <FontAwesome5 name='minus' style={{marginRight: 2}}></FontAwesome5>
                        :
                            <FontAwesome5 name='plus' style={{marginRight: 2}}></FontAwesome5>
                        }
                          T. Abiertos</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data.open}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data_user.open}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data_other.open}</Text></DataTable.Cell>
                </DataTable.Row>
            
                {childOpen ? 
                <View>
                    <DataTable.Row style={styles.tableRow}>
                    <DataTable.Cell><Text style={styles.badgeOpenChild}>
                         - Ab. Mes</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data.open_month}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data_user.open_month}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data_other.open_month}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.tableRowAtt}>
                    <DataTable.Cell><Text style={styles.badgeOpenChild}>
                         - Ots. Meses</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data.open_other_month}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data_user.open_other_month}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data_other.open_other_month}</Text></DataTable.Cell>
                </DataTable.Row>
                </View>
                : null}
                <DataTable.Row onPress={_onPressAtt} style={styles.tableRowTotal}>
                    <DataTable.Cell><Text style={styles.badgeAttended}>
                        {childAtt ? 
                            <FontAwesome5 name='minus' style={{marginRight: 2}}></FontAwesome5>
                        :
                            <FontAwesome5 name='plus' style={{marginRight: 2}}></FontAwesome5>
                        }
                        T. Atends.</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeAttended}>{data.resolved}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeAttended}>{data_user.resolved}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeAttended}>{data_other.resolved}</Text></DataTable.Cell>
                </DataTable.Row>
                {childAtt ? 
                <View>
                    <DataTable.Row style={styles.tableRowMonth}>
                    <DataTable.Cell><Text style={styles.badgeAttendedChild}>- At. Mes</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeAttended}>{data.res_month}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeAttended}>{data_user.res_month}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeAttended}>{data_other.res_month}</Text></DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row style={styles.tableRowToday}>
                    <DataTable.Cell><Text style={styles.badgeAttendedChild}>- Ots. Meses</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeAttended}>{data.res_other_month}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeAttended}>{data_user.res_other_month}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeAttended}>{data_other.res_other_month}</Text></DataTable.Cell>
                </DataTable.Row>
                </View>
                : null}
                <DataTable.Row style={styles.tableRowClsToday}>
                    <DataTable.Cell><Text style={styles.badgeTotal}>T. Regds.</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeTotal}>{data.registered}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeTotal}>{data_user.registered}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeTotal}>{data_other.registered}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableRowClsToday}>
                    <DataTable.Cell><Text style={styles.badgeRegToday}>T.Reg. Hoy</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeRegToday}>{data.reg_today}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeRegToday}>{data_user.reg_today}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeRegToday}>{data_other.reg_today}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableRowClsToday}>
                    <DataTable.Cell><Text style={styles.badgeClsToday}>T. Cds. Hoy</Text></DataTable.Cell>
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
        //marginTop: 10,
        paddingHorizontal: 15
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
        //flexDirection: 'row',
        alignItems: 'flex-end',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowOpacity: 0.25,
        marginVertical: 15
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
        marginHorizontal: 10, 
        //width: 65
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
    badgeOpenChild: {
        color: '#ff9800',
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 8
    },
    badgeAttendedChild:{
        color: '#4caf50',
        fontWeight: 'bold',
        fontSize: 12,
        marginLeft: 8
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
