import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Picker, ActionSheetIOS, 
    Text, Image, Platform, Modal, Alert, TouchableOpacity } from 'react-native'
import { DataTable, ProgressBar, Button } from 'react-native-paper';
import DashboardService from '../../../services/DashboardService';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';
//import { PickerIOS } from '@react-native-community/picker';


export default function DTHistory({navigation}) {
    
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
    const [result, setResult] = useState("aqui text");
    let Listmonths = new Array("enero","febrero","marzo","abril","mayo","junio",
                        "julio","agosto","septiembre","octubre","noviembre","diciembre");
    let mm = new Date();
    let month = Listmonths[mm.getMonth()]
    let year = new Date().getFullYear();
    const [selectDate, setSelectDate] = useState({
        month: month,
        year: year
    })

    const [modalVisibleM, setModalVisibleM] = React.useState(false);
    const [modalVisibleY, setModalVisibleY] = React.useState(false);

    const [data, setData] = useState({
        open: '',
        resolved: '',
        registered: '',
        emergency: '',
        high: '',
        normal: '',
        low: ''
    });

    const [data_user, setDataUser] = useState({
        open: '',
        resolved: '',
        registered: '',
        emergency: '',
        high: '',
        normal: '',
        low: ''
    });

    const [data_other, setDataOther] = useState({
        open: '',
        resolved: '',
        registered: '',
        emergency: '',
        high: '',
        normal: '',
        low: ''
    });

    const [loading, setLoading] = useState(true);
    const [loadingRefresh, setLoadingRefresh] = useState(false);

    async function getHistoryTickets(mes, anio){
        try {
            let result = await DashboardService.getAllDTHistory(mes, anio);
            setData({
                open: result.t_open_tickets,
                resolved: result.t_resolved_tickets,
                registered: result.t_registered_tickets,
                emergency: result.t_emergency_tickets,
                high: result.t_high_tickets,
                normal: result.t_normal_tickets,
                low: result.t_low_tickets
            })
            setDataUser({
                open: result.t_open_user,
                resolved: result.t_resolved_user,
                registered: result.t_registered_user,
                emergency: result.t_emergency_user,
                high: result.t_high_user,
                normal: result.t_normal_user,
                low: result.t_low_user
            });
            setDataOther({
                open: result.t_open_other,
                resolved: result.t_resolved_other,
                registered: result.t_registered_other,
                emergency: result.t_emergency_other,
                high: result.t_high_other,
                normal: result.t_normal_other,
                low: result.t_low_other
            });
            setLoading(false)
            setLoadingRefresh(false)
            //console.log(ticket)
        } catch (error) {
          console.log(error);  
        }   
    }
    

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
            setLoadingRefresh(false)
            setSelectDate({
                year: year,
                month: month
            })
          }
          return () => isSuscribed = false;
        }, [])
      );

    useEffect(() => {
        let isSuscribed = true;
            if(isSuscribed){
                getHistoryTickets(selectDate.month, selectDate.year);
            }
            return () => isSuscribed = false;
    }, []);

    function refreshTable(){
        setLoading(true)
        setLoadingRefresh(true);
        getHistoryTickets(selectDate.month, selectDate.year)   
    }

    const showModalMonth = () => {
        setModalVisibleM(true)
    }
    const showModalYear = () => {
        setModalVisibleY(true)
    }

    return (
        <View style={styles.container}>
            <View style={styles.contentHeader}>
                <View style={styles.contentPickers}>
                    {/* <Text style={styles.titleDate}>Fecha</Text> */}
                    <Text style={styles.titleMonth}>Mes</Text>
                    <Text style={styles.titleYear}>Año</Text>
                </View>

                {Platform.OS==='ios' ?
                <View style={styles.contentPickers}>
                    {/*  <Text style={styles.result}>{result}</Text> */}
                    <TouchableOpacity onPress={showModalMonth} style={{padding: 7}}>
                        <Text>{selectDate.month}
                        <Text style={{fontSize: 15}}> +</Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={showModalYear} style={{padding: 7}}>
                        <Text>{selectDate.year}
                        <Text style={{fontSize: 15}}> +</Text></Text>
                    </TouchableOpacity>

                <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleM}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");}}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Picker itemStyle={styles.itemStyleIOS}
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
                        </View>
                        <Button style={styles.btnClosed} mode='contained' 
                        onPress={() => {setModalVisibleM(false)}}>Cerrar</Button>
                    </View>
                    </Modal>

                
                    <Modal 
                    animationType="slide"
                    transparent={true}
                    visible={modalVisibleY}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");}}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Picker
                            itemStyle={styles.itemStyleIOS}
                            selectedValue={selectDate.year} 
                            prompt='Seleccione el año'
                            style={styles.pickerYear}
                            onValueChange={(itemValue) => {
                            setSelectDate({
                                ...selectDate,
                                year: itemValue})
                        }}>
                    {addYearInPicker().map(item => {
                        return (<Picker.Item label={item.toString()} value={item} key={item}/>) 
                    })}
                </Picker>
                        </View>
                        <Button style={styles.btnClosed} mode='contained' 
                        onPress={() => {setModalVisibleY(false)}}>Cerrar</Button>
                    </View>
                    </Modal>
                
                </View>
                :
                <View style={styles.contentPickers}>
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
                    {addYearInPicker().map(item => {
                        return (<Picker.Item label={item.toString()} value={item} key={item}/>) 
                    })}
                </Picker>
            </View>
                }

            </View>
            {loading == true ? 
            <View style={styles.contentLoading}> 
                <Image resizeMode='center' source={loadingRefresh==true ? 
                require("../../../../assets/loadingDual.gif")
                :
                require("../../../../assets/loadingSpinnerGreen.gif")
                }></Image>
                <Text style={{marginTop: -5, color: '#4caf50'}}>
                    {loadingRefresh==true ? 'Actualizando...' : 'Cargando Estadística...'}
                </Text>
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
                    <DataTable.Cell><Text style={styles.badgeOpen}>T. Abiertos</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data.open}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data_user.open}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data_other.open}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableRow}>
                    <DataTable.Cell><Text style={styles.badgeAttended}>T. Atends.</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeAttended}>{data.resolved}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeAttended}>{data_user.resolved}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeAttended}>{data_other.resolved}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableRowAtt}>
                    <DataTable.Cell><Text style={styles.badgeTotal}>T. Regds.</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeTotal}>{data.registered}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeTotal}>{data_user.registered}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeTotal  }>{data_other.registered}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableRowTotal}>
                    <DataTable.Cell><Text style={styles.badgeClsToday}>T. Emerg.</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeClsToday}>{data.emergency}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeClsToday}>{data_user.emergency}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeClsToday}>{data_other.emergency}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableRowMonth}>
                    <DataTable.Cell><Text style={styles.badgeOpen}>T. P. Alta</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data.high}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data_user.high}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeOpen}>{data_other.high}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableRowToday}>
                    <DataTable.Cell><Text style={styles.badgeRegToday}>T. P. Normal</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeRegToday}>{data.normal}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeRegToday}>{data_user.normal}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeRegToday}>{data_other.normal}</Text></DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row style={styles.tableRowClsToday}>
                    <DataTable.Cell><Text style={styles.badgeTotal}>T. P. Baja</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeTotal}>{data.low}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeTotal}>{data_user.low}</Text></DataTable.Cell>
                    <DataTable.Cell numeric><Text style={styles.badgeTotal}>{data_other.low}</Text></DataTable.Cell>
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
    btnClosed: {
        color: 'white',
        backgroundColor: '#0277bd',
        width: '80%'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        //marginTop: 22,
        //backgroundColor: '#000',
        //opacity: 0.9
      },
      modalView: {
        margin: 10,
        backgroundColor: "#0277bd",
        //opacity: 10,
        width: '80%',
        height: '40%',
        borderRadius: 15,
        padding: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        //borderWidth: 1,
        //borderColor: '#01579b'
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
        marginVertical: 15
    },
    contentPickerHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        shadowOpacity: 0.25,
    },
    contentPickers: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
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
        textAlign: 'center',
        width: '50%'
    },
    titleYear:{
        paddingVertical: 5, 
        color: '#474747',
        textAlign: 'center',
        width: '50%'
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
    itemStyleIOS: {
        color: '#fff'
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
