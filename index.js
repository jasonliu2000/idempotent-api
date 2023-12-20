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

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/orders', (req, res) => {
  res.json(orders)
})

app.get('/api/orders/:id', (req, res) => {
  const id = req.params.id
  const order = orders.find(order => order.id == id)
  res.json(order)
})

app.post('/api/orders', (req, res) => {
  const body = req.body

  if (!body.product) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }

  const order = {
    id: generateId(),
    product: body.product,
    price: body.price
  }

  orders = orders.concat(order)
  res.json(order)
})

app.patch('/api/orders/:id', (req, res) => {
  const id = req.params.id
  const order = orders.find(order => order.id == id)
  const updateData = req.body

  Object.keys(updateData).forEach(patchedField => {
    order[patchedField] = updateData[patchedField]
  })

  res.json(order)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})