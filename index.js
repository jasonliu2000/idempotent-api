const express = require('express')
const app = express()

let orders = [
  {
    "id": 1,
    "product": "pencil",
    "price": 0.99
  },
  {
    "id": 2,
    "product": "laptop",
    "price": 999.99
  },
  {
    "id": 3,
    "product": "hamburger",
    "price": 5.99
  }
]

const generateId = () => {
  const maxId = orders.length > 0
    ? Math.max(...orders.map(n => n.id))
    : 0
  return maxId + 1
}

app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/orders', (request, response) => {
  response.json(orders)
})

app.get('/api/orders/:id', (request, response) => {
  const id = request.params.id
  const order = orders.find(order => order.id == id)
  response.json(order)
})

app.post('/api/orders', (request, response) => {
  const body = request.body

  if (!body.product) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const order = {
    id: generateId(),
    product: body.product,
    price: body.price
  }

  orders = orders.concat(order)

  response.json(order)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})