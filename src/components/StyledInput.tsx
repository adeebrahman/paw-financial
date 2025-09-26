import styled from "styled-components";
import { Label, SecondaryText } from "../textStyles";



interface StyledInputProps {
  id: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>
  placeholder: string;
  label: string;
  type?: string;
}

const StyledInput: React.FC<StyledInputProps> = ({
  id,
  value,
  setValue,
  placeholder,
  label,
  type
}) => {


  return(
    <Container>
      <Label>{label}</Label>
      <Input
        id={id}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        type={type ?? "text"}
      />
    </Container>
    
  )
}


export default StyledInput

const Container = styled.div`
  display: grid;
  grid-template-rows: 20px auto;
  gap: 8px;
  align-items: center;
`

const Input = styled.input`
	height: 20px;
	padding: 8px 12px;
	border-radius: 8px;
	border: 1px solid black;
	outline: none;
	font-size: 14px;
`;

