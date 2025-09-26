import styled from "styled-components";
import { useLocation } from 'react-router'
import { useEffect, useState } from "react";
import { useFetchAccountsById, useFetchTransactionsById } from "../services/api";
import AccountInfo from "../components/AccountInfo";
import { SecondaryText, Title2 } from "../textStyles";










const AccountDetails: React.FC = () => {
  let location = useLocation()
  const locators = location.pathname.split("/")
  const accId = locators[1]


  const {data} = useFetchAccountsById(accId)
  const {data: transactions_data} = useFetchTransactionsById(accId)
  const [accountData, setAccountData] = useState(undefined)
  const [tranactionsData, setTransactionsData] = useState([])

  const parseTransaction = (t: any) => {
    if (t?.type === "create"){
      return `Account created with initial balance of ${t?.amount}`
    }
    else {
      if (t.sender === accId ){
        return `Sent $${t?.amount} to Account: ${t.receiver}`
      }
      else {
        return `Recieved $${t?.amount} from Account: ${t.sender}`
      }
    }

  }

  useEffect(() => {
    if (data){
      setAccountData(data)
    }
  }, [data]);

  useEffect(() => {
    if (transactions_data){
      setTransactionsData(transactions_data)
    }
  }, [transactions_data]);

  return(
    <>
      {!accountData ? (
        <>No Account Data Available</>
      ) : (
      <Container>
        <AccountInfo 
          account={accountData}
        />

        <List>
          <Title2>Activity</Title2>
          {tranactionsData?.map((t) => {
            return <SecondaryText>{parseTransaction(t)}</SecondaryText>
          })}
        </List>

      </Container>

      )}
    </>
    
  )
}

export default AccountDetails;

const Container = styled.div`
  display: grid;
  gap: 16px;
  align-items: center;

	padding: 36px;
`;


const List = styled.div`
	display: grid;
	gap: 8px;

	max-height: 700px;
	overflow-y: scroll;

  border: 1px solid black;
  padding: 16px;
  border-radius: 8px;
`;

