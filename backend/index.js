const express = require('express');
const cors = require('cors');

const app = express();
const port = 8888
const { v4: uuidv4 } = require("uuid")

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const db = [
  {id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", owner: "John Doe", name: "savings account", balance: 50.00},
  {id: "5b9d6ycd-bbfd-4b2d-9b5d-ab8dfbbd4bed", owner: "John Doe", name: "chequings", balance: 1520.00},
]

const transactions = [
  {type: "create", id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", amount: 50 },
  {type: "create", id: "5b9d6ycd-bbfd-4b2d-9b5d-ab8dfbbd4bed", amount: 1520 },
]

const trimToTwoDecimals = (num) => {
  return Math.floor(num * 100) / 100;
}

app.get("/api/v1/accounts", (req, res) => {
  res.json(db)
})

app.get("/api/v1/accounts/:id", (req, res) => {
  const accId = req.params.id

  db.map((account) => {
    if (account.id === accId){
      res.json(account)
    }
  })
  res.status(404).json({message: 'this account does not exist'})
})

app.post("/api/v1/accounts", (req, res) => {
  const {name, deposit, owner} = req.body

  if (!name || !deposit || !owner){
    res.status(400).json({
      error: 'Missing required fields'
    })
  }

  let uuid = uuidv4();      //Todo: add check for collision

  const newAccount = {
    id: uuid,
    owner: owner,
    name: name,
    balance: parseFloat(deposit)
  }

  db.push(newAccount)
  transactions.push({
    type: "create", 
    id: uuid,
    amount: parseFloat(deposit)
  })
  res.status(201).json(newAccount)

})

app.post("/api/v1/transfer", (req, res) => {
  const {sender, receiver, deposit} = req.body

  if (!sender || !deposit || !receiver){
    res.status(400).json({
      error: 'Missing required fields'
    })
  }

  const senderAcc = db.find(account => account.id === sender)
  const receiverAcc = db.find(account => account.id === receiver)


  if (!senderAcc || !receiverAcc){
    res.status(404).json({error: 'Account does not exist'})
  }
  
  if (senderAcc.balance < deposit){
    res.status(400).json({error: 'Insufficeint funds'})
  }
  else{
    senderAcc.balance = trimToTwoDecimals(senderAcc.balance - deposit);
    receiverAcc.balance = trimToTwoDecimals(receiverAcc.balance + deposit);

    transactions.push({
      type: "transfer", 
      sender: sender,
      receiver: receiver,
      amount: deposit
    })
  }

  res.status(200).json({message: "Transfer successful"})

})

app.get("/api/v1/transactions", (req, res) => {
  res.json(transactions)
})

app.get("/api/v1/transactions/:id", (req, res) => {
  const accId = req.params.id

  const results = [

  ]

  transactions.map((t) => {
    if (t.type === "create" && t.id === accId){
      results.push(t)
    }
    else if (t.sender === accId || t.receiver === accId){
      results.push(t)
    }
  })
  res.json(results)
})



app.get("/", (req, res) => {
    res.send("Welcome to Paw Financial")
});

app.get('/api/v1/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});


app.listen(port, () => {
    console.log(`Server's port: ${port}`)
})

