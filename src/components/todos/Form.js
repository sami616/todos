import styled from 'styled-components'

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  input {
    outline: none;
    padding: 20px;
    width: 100%;
    border-radius: 4px;
    border: 1px solid #ccc;
    margin: 0 0 5px 0;
    font-size: 16px;
    font-family: Roboto;
    font-weight: 300;
  }
  h2 {
    margin: 0 0 20px 0;
    width: 100%;
    font-weight: 300;
  }
  button {
    cursor: pointer;
    padding: 20px;
    border: none;
    flex: 1 0 auto;
    outline: none;
    border-radius: 4px;
    &.inputButton {
      background: ${props => props.theme.secondaryColor};
      border-radius: 0 4px 4px 0;
      width: 100px;
    }
    &.green {
      background: ${props => props.theme.secondaryColor};
    }

    &.blue {
      background: ${props => props.theme.primaryColor};
    }
    color: #fff;
    font-family: 'Roboto';
    font-size: 16px;
  }
`
const FormDiv = Form.withComponent('div')

export default Form
export { FormDiv }
