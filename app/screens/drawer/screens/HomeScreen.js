import React, {Component} from 'react';
import { Alert, Modal, StyleSheet,Text,TouchableHighlight, View, Button } from 'react-native';
import DTickets from '../tickets/DTickets';

export default function HomeScreen({navigation}) {

    return (
        <View style={styles.container}>
          <DTickets></DTickets>
           {/* <Button title="TicketDetail" onPress={()=>navigation.navigate("TicketDetail")}></Button>  */}
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    //width: '95%',
    //backgroundColor: 'green',
    padding: 15
  }
})

