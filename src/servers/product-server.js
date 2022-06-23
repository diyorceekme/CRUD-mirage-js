import {
    createServer,
    Model
} from "miragejs"

createServer({
    models: {
        movie: Model
    },
    seeds(server) {
        server.create("movie", { name: "Boy ota kambag'al ota", category: "Biznes", brand: "In Five and a Half Steps", price: 10 })
        server.create("movie", { name: "Atom odatlari", category: "Ilmiy", brand: "The Definitive Guide to Visual Branding", price: 8 })
        server.create("movie", { name: "Diqqat!", category: "Ilmiy", brand: "The Search for Belonging in a World Shaped by Branding", price: 5 })
        server.create("movie", { name: "Steve Jobs", category: "Biografiya", brand: "A Guide for Designers", price: 12 })
        server.create("movie", { name: "Million dollarlik xatolar", category: "Biznes", brand: "The Shape of Brands to Come", price: 10 })
    },
    routes() {
        this.namespace = "api"
        this.passthrough();

        this.get("/books", (schema, request) => {
            return schema.movies.all()
        })

        this.post("/books", (schema, request) => {
            let attrs = JSON.parse(request.requestBody)

            return schema.movies.create(attrs)
        })

        this.patch("/books/:id", (schema, request) => {
            let newAttrs = JSON.parse(request.requestBody)
            let id = request.params.id
            let movie = schema.movies.find(id)

            return movie.update(newAttrs)
        })

        this.delete("/books/:id", (schema, request) => {
            let id = request.params.id

            return schema.movies.find(id).destroy()
        })
    },
})