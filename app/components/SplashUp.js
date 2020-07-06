import React from 'react'
import {Text, View, Button } from 'react-native'

export default function SplashUp() {
    return (
        <View>
            <Text>Sign Up</Text>
            <Button title="Sing In" onPress={() => alert('clicked')}></Button>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignContent: 'center'
    }
});