import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0
}

export default class App extends React.Component {
  state = {
    ...initialState
  }

  addDigit = n => {


    const clearDisplay = this.state.displayValue === '0'
        || this.state.clearDisplay

    if (n === '.' && !clearDisplay && this.state.displayValue.includes('.'))
      return

    const currentValue = clearDisplay ? '' : this.state.displayValue
    const displayValue = currentValue + n

    this.setState({
        displayValue,
        clearDisplay: false
    })

    if (n !== '.') {
        const i = this.state.current;
        const newValue = parseFloat(displayValue);
        const values = [...this.state.values];
        values[i] = newValue;

        this.setState({values})
    }
  }

  clearMemory = () => {
    this.setState({ ...initialState })
  }

  setOperation = operation => {
    if (this.state.current === 0) {
      this.setState({operation, current: 1, clearDisplay: true})
  } else {
      let equals = operation === '=';
      const currentOperation = this.state.operation;

      const values = [...this.state.values];

      switch (currentOperation) {
          case '+':
              values[0] = values[0] + values[1]
              break;

          case '-':
              values[0] = values[0] - values[1]
              break;

          case '*':
              values[0] = values[0] * values[1]
              break;

          case '/':
              if(values[1] == 0){
                values[0] = "INVALID OPERATION"
                equals = false
              }else{
                values[0] = values[0] / values[1]
              } 
                
              break;

          default:
              values[0] = "INVALID OPERATION"
              break;
      }

      values[1] = 0;

      this.setState({
          displayValue: `${values[0]}`,
          operation: equals ? null : operation,
          current: equals ? 0 : 1,
          clearDisplay: !equals,
          values
      })

  }
  }

  render () {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} />
        <View style={styles.buttons}>
          <Button label={'AC'} triple onClick={this.clearMemory}/>
          <Button label={'/'} operation onClick={this.setOperation}/>
          <Button label={'7'} onClick={this.addDigit}/>
          <Button label={'8'} onClick={this.addDigit}/>
          <Button label={'9'} onClick={this.addDigit}/>
          <Button label={'*'} operation onClick={this.setOperation}/>
          <Button label={'4'} onClick={this.addDigit}/>
          <Button label={'5'} onClick={this.addDigit}/>
          <Button label={'6'} onClick={this.addDigit}/>
          <Button label={'-'} operation onClick={this.setOperation}/>
          <Button label={'1'} onClick={this.addDigit}/>
          <Button label={'2'} onClick={this.addDigit}/>
          <Button label={'3'} onClick={this.addDigit}/>
          <Button label={'+'} operation onClick={this.setOperation}/>
          <Button label={'0'} double onClick={this.addDigit}/>
          <Button label={'.'}  onClick={this.addDigit}/>
          <Button label={'='} operation onClick={this.setOperation}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
