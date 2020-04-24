module.exports = (container, app) => {
  const sp = [
    {
      price: 10000,
      name: 'San pham 1'
    },
    {
      price: 20000,
      name: 'San pham 2'
    },
    {
      price: 30000,
      name: 'San pham 3'
    }
  ]
  app.get('/', (req, res) => {
    res.json(sp)
  })
}
