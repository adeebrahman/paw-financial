### Instructions

1. Download All Dependencies
2. Start frontend server by `npm start` in main directory
3. Inside backend directory, start backend server by `npm run dev`


Open [http://localhost:3000](http://localhost:3000) to view app in the browser.


### Frontend Features

1. Add new accounts
2. Transfer money between various accounts
3. View account transaction history by clicking on account name

### Backend APIs

#### GET `/api/v1/accounts` : Fetch all account data
#### POST `/api/v1/accounts` : Create new account
#### GET `/api/v1/accounts/:id` : Fetch account data by ID
#### POST `/api/v1/transfer` : Transfer between two accounts
#### GET `/api/v1/transactions` : Fetch all transactions
#### GET `/api/v1/transactions/:id` : Fetch account specific transactions


### Things to add / Improvements:
1. Implement an actual Database 
2. Better error handling on backend/frontend
3. Pagination + Ordering for accounts and transactions
4. Search feature



