const express = require("express")
const app = express();

// id aleatorio
const uuid = require('uuid')
app.use(express.json())

// porta 3000
const port = 3000;
const orders = [];

app.listen(port, ()=>{
  console.log(`Porta rodando na ${port}`)
})

// MOSTRANDO VALORES
app.get("/orders", (request, response)=>{
  return response.json(orders);
})

// CRIAÇÃO
app.post("/orders", (request, response)=>{
  const { order, clientName, price, status } = request.body

  const newOrder = {id: uuid.v4(), order, clientName, price, status}

  orders.push(newOrder)

  return response.status(201).json(newOrder) 
})

// ATUALIZANDO 
app.put("/orders/:id", (request, response)=>{
  const {id} = request.params;
  const {order, clientName, price, status} = request.body;

  const updateOrder = {id, order, clientName, price, status}

  const index = orders.findIndex((order) => order.id === id)

  updateOrder[index] = updateOrder;

  if(index < 0){
    return response.status(400).json({message: "Order not Found"})
  }

  return response.status(200).json(updateOrder)
})


app.patch("/orders/:id", (request, response)=>{
  const {id} = request.params;
  const { order, clientName, price, status } = request.body

  const updateOrderPatch = { order, clientName, price, status } 

  // Verificando se o id existe 
  const index = orders.findIndex(order => order.id === id)


  // Atualizando o indice especifico
  updateOrderPatch[index] 
  

  // Caso nao exista 
  if(index < 0){
    return response.status(404).json({message: "Orders not Found"})
  }

  return response.status(200).json({status: "Pronto"})
})

// DELETANDO VALORES 
app.delete("/orders/:id", (request, response)=>{
  const { id } = request.params;

  const index = orders.findIndex((order) => order.id === id)

  if(index < 0){
    return response.status(404).json({menssage: "Order not Found"})
  }

  orders.splice(index, 1)
  return response.status(204).json();

})

