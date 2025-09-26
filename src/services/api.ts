import { useQuery } from "@tanstack/react-query";

const BASE_URL = "http://localhost:8888/api/v1"



export const useFetchAccounts = () => {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: getAccounts,
  })
}

export const useFetchAccountsById = (id: string) => {
  return useQuery({
    queryKey: ["accounts-by-id"],
    queryFn: () => getAccountsbyId(id),
    enabled: !!id
  })
}

export const useFetchTransactionsById = (id: string) => {
  return useQuery({
    queryKey: ["transactions-by-id"],
    queryFn: () => getTransactionsById(id),
    enabled: !!id
  })
}



const getAccounts = async () => {
  const url = `${BASE_URL}/accounts`
  const res = await fetch(url)

  if (res.ok){
    const data = await res.json()
    return data
  }
  else{
    throw new Error("Could not fetch account info")
  }

}

const getAccountsbyId = async (id: string) => {
  const url = `${BASE_URL}/accounts/${id}`
  const res = await fetch(url)

  if (res.ok){
    const data = await res.json()
    return data
  }
  else{
    throw new Error("Could not fetch account info")
  }

}

const getTransactionsById = async (id: string) => {
  const url = `${BASE_URL}/transactions/${id}`
  const res = await fetch(url)

  if (res.ok){
    const data = await res.json()
    return data
  }
  else{
    throw new Error("Could not fetch account info")
  }

}

export const addAccount = async (name: string, deposit: number, owner: string) => {
  const url = `${BASE_URL}/accounts`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      deposit: deposit,
      owner: owner
    })
  })

  if (res.ok){
    const data = await res.json()
    return data
  }
  else{
    throw new Error("Could not add account")
  }

}

export const transferMoney = async (from: string, to: string, deposit: number ) => {
  const url = `${BASE_URL}/transfer`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: from,
      receiver: to,
      deposit: deposit
    })
  })

  if (res.ok){
    const data = await res.json()
    return data
  }
  else{
    const data = await res.json()
    return data
  }

}