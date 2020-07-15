import React from 'react';
import { StyleSheet, View} from 'react-native';
import DTickets from '../tickets/DTickets';

export default function HomeScreen({navigation}) {

    return (
        <View style={styles.container}>
          <DTickets></DTickets>
        </View>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15
  }
})

