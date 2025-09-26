import { useState } from "react"
import { ErrorMessage, Title1 } from "../textStyles"
import StyledInput from "./StyledInput"
import { addAccount } from "../services/api"
import styled from "styled-components"
import { useQueryClient } from "@tanstack/react-query"



const CreateAccount: React.FC = () => {
  const [newAccName, setNewAccName] = useState("")
  const [newAccOwner, setNewAccOwner] = useState("")
  const [newAccDeposit, setNewAccDeposit] = useState("")

  const [err, setErr] = useState("")
  const queryClient = useQueryClient()

  const handleAddAccount = async () => {
      //basic error handling
      setErr("")
      if (!newAccDeposit || !newAccOwner || !newAccName){
        setErr("Missing fields")
        return
      }

      if (newAccName.length > 100 || newAccOwner.length > 100){
        setErr("Names can be maximum 100 characters in length")
        return
      }

      const deposit = parseFloat(newAccDeposit)

      if (!deposit || deposit < 0){
        setErr("Initial deposit must be a positive number")
        return
      }

      const strDeposit = deposit.toString().split(".")
      if (strDeposit[1] && strDeposit[1].length > 2){
        setErr("Cannot have more than 2 decimal places")
        return
      }
      

      try{
        await addAccount(
          newAccName, 
          deposit,
          newAccOwner
        )

        queryClient.invalidateQueries({ queryKey: ['accounts'] })
        queryClient.invalidateQueries({ queryKey: ['accounts-by-id'] })
        queryClient.invalidateQueries({ queryKey: ['transactions-by-id'] })
        
      } catch (err){
        console.log(err)
      }
      
    }
  
  return(
    <Container>
      <Title1>Create New Account</Title1>
      
      <StyledInput 
				id={"new-acc-name"}
				value={newAccName}
				setValue={setNewAccName}
				placeholder={"Enter Account Name (Max 100 Characters)"}
        label={"Account Name"}
			/>

      <StyledInput 
				id={"new-acc-owner"}
				value={newAccOwner}
				setValue={setNewAccOwner}
				placeholder={"Enter Customer Name (Max 100 Characters)"}
        label={"Customer Name"}
			/>

      <StyledInput 
				id={"new-acc-deposit"}
				value={newAccDeposit}
				setValue={setNewAccDeposit}
				placeholder={"Enter Deposit Amount"}
        label={"Initial Deposit"}
        type={"number"}
			/>

      <Button onClick={handleAddAccount}> Add Account</Button>

      {err && <ErrorMessage>{err}</ErrorMessage>}
    
    </Container>
  )
}

export default CreateAccount


const Container = styled.div`
  display: grid;
  gap: 8px;
  align-items: center;

  border: 1px solid black;
	border-radius: 16px;
  padding: 16px;
`

const Button = styled.button`
	height: 36px;
	width: 200px;
	border-radius: 8px;
	border: none;
	background-color: #1d8ccdff;
	color: white;
	font-weight: 700;
`