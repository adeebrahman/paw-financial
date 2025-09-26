import styled from "styled-components";
import { Title2, SecondaryText, Label } from "../textStyles";
import { useNavigate } from "react-router";


interface Account {
	id: string;
	name: string;
	owner: string;
	balance: number;
}

interface AccountInfoProps {
	account: Account
}

const AccountInfo: React.FC<AccountInfoProps> = ({
	account
}) => {
	let navigate = useNavigate();
	return(
		<Container>
			<Info>
				<Link onClick={() => navigate(`/${account.id}`)}>Account: {account.name}</Link>
				<Label>Customer: {account.owner}</Label>
				<SecondaryText>ID: {account.id}</SecondaryText>
			</Info>
			
			<Balance>${account.balance}</Balance>
			
		</Container>

	)
}

export default AccountInfo;

const Container = styled.div`
	border: 1px solid black;
	border-radius: 16px;

	display: grid;
	grid-template-columns: auto 100px;

	padding: 8px;
	width: 400px;
	height: min-content;
`;

const Info = styled.div`

`

const Balance = styled(Title2)`
	color: #0fa327;
	font-weight: normal;
`;

const Link = styled(Title2)`
	text-decoration: underline;
	color: #6490b7ff;

	:hover {
	 cursor: pointer;
	}

`;