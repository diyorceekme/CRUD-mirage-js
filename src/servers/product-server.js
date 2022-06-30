import { belongsTo, createServer, hasMany, Model } from "miragejs";

createServer({
  models: {
    products: Model.extend({
      actors: hasMany(),
    }),
    actor: Model.extend({
      products: belongsTo(),
    }),
  },

  seeds(server) {
    server.create("product", {
      name: "Apple iPhone 12 Pro Max 256GB ROM 6GB RAM",
      short_name: "iPhone 12 Pro Max",
      availability: true,
      discount: 5,
      price: 12500000,
      register_date: "2020-12-20",
      view_count: 10,
      brand_id: 1000,
      category_id: 1002,
    });
    server.create("product", {
      name: "Apple iPhone 13 Pro Max 256GB ROM 6GB RAM",
      short_name: "iPhone 13 Pro Max",
      availability: true,
      discount: 10,
      price: 16500000,
      register_date: "2021-12-20",
      view_count: 25,
      brand_id: 1000,
      category_id: 1002,
    });
  },

  routes() {
    this.namespace = "api";
    this.passthrough()

    this.get("/products", (schema, request) => {
      return schema.products.all();
    });
    this.post("/products", (schema, request) => {
      let attrs = JSON.parse(request.requestBody)
      return schema.movies.create(attrs)
    })
  },
});