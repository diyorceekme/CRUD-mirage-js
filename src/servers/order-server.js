import { createServer, Model, hasMany, belongsTo } from 'miragejs'

createServer({
  models: {
    orders: Model.extend({
      actors: hasMany(),
    }),
    actor: Model.extend({
      orders: belongsTo(),
    }),
  },
seeds(server) {
    server.create('order', {
      name: "Jumanazarov Diyorceek",
      phone: "+998935047320",
      state: "67/kvartal Olmaliq",
      transaction: "Naqd",
      product_id: 1000,
      productName: "Samsung s22 ultra",
      productPrice: 1600,
      quantity: 1,
      total_price: 1600
    })
    server.create('order', {
      name: "Ali Abdullayev",
      phone: "+998935556775",
      state: "Oydin Olmaliq",
      transaction: "Plastik karta",
      product_id: 1000,
      productName: "Iphone 11 pro",
      productPrice: 800,
      quantity: 4,
      total_price: 3200
    })
    server.create('order', {
      name: "Muhammadaziz Esonboyev",
      phone: "+998937775889",
      state: "DSK Olmaliq",
      transaction: "Bo'lib to'lash",
      product_id: 1000,
      productName: "Televizor",
      productPrice: 300,
      quantity: 8,
      total_price: 2400
    })
},
  routes() {
    this.namespace = 'api'
    this.passthrough()

    this.post('/order', (schema, request) => {
      let attrs = JSON.parse(request.requestBody)
      return schema.orders.create(attrs)
    })

    this.patch('/order/:id', (schema, request) => {
      let newAttrs = JSON.parse(request.requestBody)
      let id = request.params.id
      let movie = schema.orders.find(id)

      return movie.update(newAttrs)
    })

    this.get('/order')
    this.get('/order/:id', (schema, request) => {
      let id = request.params.id
      return schema.orders.find(id)
    })
    this.del('/order/:id')
  },
})