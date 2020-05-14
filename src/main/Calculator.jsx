import React, { Component } from "react"
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0' ,
    clearDisplay : false,
    operation : null,
    values : [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = {...initialState} // Criando um clone e iniciando o initialState

    constructor(props) {
        super(props)
        this.clearMemory = this.clearMemory.bind(this)
        this.addDigt = this.addDigt.bind(this)
        this.setOperation = this.setOperation.bind(this)
        // Fazendo com que o This certo seja chamado
    }

    clearMemory() {
        this.setState({...initialState}) //Voltando o estado para o estado inicial do objeto
    }

    setOperation(operation) {
        if(this.state.current === 0 ){
            this.setState({operation, current: 1, clearDisplay: true}) // Testando se o current = 0 quer dizer que estamos na posição 0 do array e queremos passar pra 1, e limpar o display para que o proximo número entre no display da calculadora
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation //Pegando a operação corrente, diferente da primeira operação já executada. ex 2+2(+)2
            
            const values = [...this.state.values] // Clonando o values
            values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`) // Armazenando no indice zero de VALUES, o resultado da operação.
            values[1] = 0 // Zerando o digito 1 do array para pegar o próximo número digitado

            this.setState ({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values

            })
        }
    }

    addDigt(n) {
        if(n === '.' && this.state.displayValue.includes('.')) {
            return // Testando para ver se já existe um '.' no display, se existir não é possível incluir outro, ent return nada. evitar ter dois pontos na calculadora
        }   

        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay === true  
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState ({displayValue, clearDisplay: false}) 

        if(n !== '.') {
            const i = this.state.current // Armazenando o indice do array em que está mexendo 
            const newValue = parseFloat(displayValue) // Transformando o String recebido em displayValue para float
            const values = [...this.state.values] // Clonando valor no values
            values[i] = newValue
            this.setState({ values })
            console.log(values)
        }
    }



    render() {
        return (
            <div className="calculator">
                <Display value={this.state.displayValue} /> {/*this.state.displayValue é a forma de pegar o valor do displayVaule do objeto initialState*/}
                <Button label="AC" click={() => this.clearMemory()} triple /> {/** O clearMemory foi colocado aqui dentro pq só vai ser chamado uma vez, no caso qnd for clicado o AC na calc**/}
                <Button label="/" click={this.setOperation} operation />
                <Button label="7" click={this.addDigt} />
                <Button label="8" click={this.addDigt} />
                <Button label="9" click={this.addDigt} />
                <Button label="*" click={this.setOperation} operation />
                <Button label="4" click={this.addDigt} />
                <Button label="5" click={this.addDigt} />
                <Button label="6" click={this.addDigt} />
                <Button label="-" click={this.setOperation} operation />
                <Button label="1" click={this.addDigt} />
                <Button label="2" click={this.addDigt} />
                <Button label="3" click={this.addDigt} />
                <Button label="+" click={this.setOperation} operation />
                <Button label="0" click={this.addDigt} double />    
                <Button label="." click={this.addDigt} />
                <Button label="=" click={this.setOperation} operation />
            </div>
        )
    }
}