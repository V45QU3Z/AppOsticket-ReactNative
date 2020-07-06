import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

export default function MyComponent() {

 const [visible, setVisible] = React.useState(true);
  const _onToggleSnackBar = () => setVisible(visible ? false : true)

  const _onDismissSnackBar = () => setVisible(false);

    return (
      <View style={styles.container}>
        <Button
          onPress={_onToggleSnackBar}
        >
          {visible ? 'Hide' : 'Show'}
        </Button>
        <Snackbar
          visible={visible}
          onDismiss={_onDismissSnackBar}
          duration={2000}
          action={{
            label: 'Undo',
            onPress: () => {
              // Do something
            },
          }}
        >
          Hey there! I'm a Snackbar.
        </Snackbar>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});