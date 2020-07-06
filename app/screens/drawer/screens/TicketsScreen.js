import React, { useEffect } from 'react';
import { View, Button } from 'react-native';
import NewTicket from '../tickets/NewTicket';
import TicketsList from '../tickets/TicketsList';

export default function TicketsScreen({navigation}) {

  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {/* <Button title="TicketDetail" onPress={()=>navigation.navigate("TicketDetail")}></Button>  */}
          <NewTicket></NewTicket>
          
    </View>
  );
    
}


{/* <Button title="Home" onPress={()=>navigation.navigate("Home")}></Button> */}
          {/*<Button title="To home" onPress={()=>navigation.navigate("Home")}></Button>
          <Button title="back" onPress={()=>navigation.goBack()}></Button>
        <Button title="firts screen" onPress={()=>navigation.popToTop()}></Button>*/}
