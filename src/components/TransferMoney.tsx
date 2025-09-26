import { useState } from "react"
import { ErrorMessage, Title1 } from "../textStyles"
import StyledInput from "./StyledInput"
import { transferMoney } from "../services/api"
import styled from "styled-components"
import { useQueryClient } from "@tanstack/react-query"



const TransferMoney: React.FC = () => {
  const [from, setfrom] = useState("")
  const [to, setTo] = useState("")
  const [deposit, setDeposit] = useState("")

  const [err, setErr] = useState("")
	const queryClient = useQueryClient()

  const handleTransfer = async () => {
		//basic error handling
		setErr("")
		if (!from || !to || !deposit){
			setErr("Missing fields")
			return
		}

		if (from === to){
			setErr("Cannot transfer to same account")
			return
		}
		
		const amount = parseFloat(deposit)
		if (!amount || amount < 0){
			setErr("Transfer amount must be a positive number")
			return
		}

		const strDeposit = amount.toString().split(".")
		if (strDeposit[1] && strDeposit[1].length > 2){
			setErr("Cannot have more than 2 decimal places")
			return
		}

		try{
			const res = await transferMoney(
				from, 
				to,
				amount
			)


      if (res.error){
        setErr(res.error)
      }
      else {
        queryClient.invalidateQueries({ queryKey: ['accounts'] })
        queryClient.invalidateQueries({ queryKey: ['accounts-by-id'] })
        queryClient.invalidateQueries({ queryKey: ['transactions-by-id'] })
      }

			
			
		} catch (err){
			console.log(err)
		}
      
  }
  
  return(
    <Container>
      <Title1>Transfer Money</Title1>
      
      <StyledInput 
				id={"from-acc"}
				value={from}
				setValue={setfrom}
				placeholder={"Enter Account Number"}
        label={"From:"}
			/>

      <StyledInput 
				id={"to-acc"}
				value={to}
				setValue={setTo}
				placeholder={"Enter Account Number"}
        label={"To:"}
			/>

      <StyledInput 
				id={"deposit"}
				value={deposit}
				setValue={setDeposit}
				placeholder={"Enter Deposit Amount"}
        label={"Deposit Amount"}
        type={"number"}
			/>

      <Button 
				onClick={handleTransfer}
			> 
				Transfer Money
			</Button>

      {err && <ErrorMessage>{err}</ErrorMessage>}
    
    </Container>
  )
}

export default TransferMoney


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