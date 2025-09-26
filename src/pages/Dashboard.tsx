import React, { useEffect, useState } from "react";
import {  useFetchAccounts } from "../services/api";
import AccountInfo from "../components/AccountInfo";
import styled from "styled-components";
import { Title1 } from "../textStyles";
import StyledInput from "../components/StyledInput";
import CreateAccount from "../components/CreateAccount";
import TransferMoney from "../components/TransferMoney";


const Dashboard: React.FC = () => {

	const {data} = useFetchAccounts()
	
	const [accounts, setAccounts] = useState([])
	const [loading, setLoading] = useState(true);


	useEffect(() => {
    if (data){
			setAccounts(data)
		}
  }, [data]);

	return(
		<>
		<Header>PAW Financials</Header>
		<Container>
			<ActionsWrapper>
				<CreateAccount />
				<TransferMoney />
			</ActionsWrapper>
			

			<DatabaseWrapper>
				<Title1>Account Ledger</Title1>

				<DatabaseList>
				{accounts?.map((acc) => {
					return(
						<AccountInfo 
							account={acc}
						/>
					)
				})}
				</DatabaseList>
			</DatabaseWrapper>

			
		</Container>
		</>
	)
}

export default Dashboard;

const Container = styled.div`
  display: grid;
  grid-template-columns: calc(50% - 8px) calc(50% - 8px);
  gap: 16px;
  align-items: center;
	align-items: start;
	padding: 36px;
`;

const ActionsWrapper = styled.div`
	display: grid;
	gap: 20px;
`

const DatabaseWrapper = styled.div`
	display: grid;
	gap: 8px;

	border: 1px solid black;
	border-radius: 16px;
	padding: 8px;
	width: fit-content;
	justify-items: center;
	justify-self: center;
`;

const DatabaseList = styled.div`
	display: grid;
	gap: 8px;

	max-height: 700px;
	overflow-y: scroll;
`;

const Header = styled.h1`
	padding: 36px;
`;