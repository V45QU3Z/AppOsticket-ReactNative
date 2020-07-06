import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Snackbar } from 'react-native-paper';

export default class SnackBar extends Component {

    state = {
        visible: false,
        title: '',
        type: 'success',
    };

    showErrorMessage(title) {
        this.setState({ visible: true, title: title, type: 'error' });
    }

    showSuccessMessage(title) {
        this.setState({ visible: true, title: title, type: 'success' });
    }

    _onToggleSnackBar = () => this.setState(state => ({ visible: !state.visible }));

    _onDismissSnackBar = () => this.setState({ visible: false });

    render() {
        const { visible } = this.state;

        if (this.state.type == 'error') {
            return (
                <Snackbar
                    visible={visible}
                    onDismiss={this._onDismissSnackBar}
                    duration={1500}
                    wrapperStyle={{ width: 300, justifyContent: 'flex-end', }}
                    style={{ backgroundColor: '#d50000' }}
                >
                    {this.state.title}
                </Snackbar>
            );
        }
        return (
            <Snackbar
                visible={visible}
                onDismiss={this._onDismissSnackBar}
                duration={1500}
                wrapperStyle={{ width: 300, justifyContent: 'flex-end', }}
                style={{ backgroundColor: '#304ffe' }}
            >
                {this.state.title}
            </Snackbar>
        );
    }

}