import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

export default function DetTicketScreen({ route }) {

    const { ticket_number } = route.params;

    useEffect(() => {
        /* let n = navigation.params.number;
        console.log(n) */
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Detail of tickets</Text>
            <Text>number: {ticket_number}</Text>
        </View>
    )
}
