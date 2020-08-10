import React from 'react'

const scaleNames: any = {
  c: 'Celsius',
  f: 'Fahrenheit',
}

const toCelsius = (fahrenheit: number) => ((fahrenheit - 32) * 5) / 9
const toFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32

const tryConvert = (temperature: string, convert: Function) => {
  const input = parseFloat(temperature)
  if (Number.isNaN(input)) return ''
  const output = convert(input)
  const rounded = Math.round(output * 1000) / 1000
  return rounded.toString()
}

interface BoilingProps {
  celsius: number
}

interface ITempProps {
  onTemperatureChange: Function
  temperature: string
  scale: string
}

const BoilingVerdict: React.FC<BoilingProps> = ({ celsius }) => {
  if (celsius >= 100) return <p>물이 끓을 거에요</p>
  return <p>물이 안 끓을 거에요</p>
}

class TemperatureInput extends React.Component<ITempProps> {
  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.onTemperatureChange(e.target.value)
  }

  render() {
    const temperature = this.props.temperature
    const scale = this.props.scale
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]} :</legend>
        <input value={temperature} onChange={this.handleChange}></input>
      </fieldset>
    )
  }
}

interface ICalculatorState {
  temperature: string
  scale: string
}

class Calculator extends React.Component<{}, ICalculatorState> {
  state = {
    temperature: '',
    scale: 'c',
  }

  handleCelsiusChange = (temperature: string) => {
    this.setState({ scale: 'c', temperature })
  }

  handleFahrenheitChange = (temperature: string) => {
    this.setState({ scale: 'f', temperature })
  }

  render() {
    const scale = this.state.scale
    const temperature = this.state.temperature
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature
    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    )
  }
}

class PracticePresenter extends React.Component {
  render() {
    return <Calculator />
  }
}

export default PracticePresenter
