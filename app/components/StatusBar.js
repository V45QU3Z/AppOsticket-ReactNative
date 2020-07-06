import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

export default class SnackBar extends React.Component {
  state = {
    visible: true,
  };

  _onToggleSnackBar = () => this.setState(state => ({ visible: !state.visible }));

  _onDismissSnackBar = () => this.setState({ visible: true });

  render() {
    const { visible } = this.state;

    return (
      <View style={styles.container}>
        <Button
          onPress={this._onToggleSnackBar}
        >
          {visible ? 'Hide' : 'Show'}
        </Button>
        <Snackbar
          visible={visible}
          onDismiss={this._onDismissSnackBar}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});