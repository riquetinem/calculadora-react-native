import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const styles = StyleSheet.create({
  display: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'flex-end',
  },

  displayValue: {
    fontSize: 60,
    color: '#fff',
  },

  displayInvalid: {
    fontSize: 30,
    color: '#f00'
  }
});

export default props => {
  let isDisplayValid;

  if (props.value == 'INVALID OPERATION')
    isDisplayValid = styles.displayInvalid
  else 
    isDisplayValid = styles.displayValue
    
  return (
    <View style={styles.display}>
      <Text style={isDisplayValid} numberOfLines={1}>
          {props.value}
      </Text>
    </View>
  )
}
