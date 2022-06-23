import {
    createServer,
    Model
} from "miragejs"

createServer({
    models: {
        movie: Model
    },
    seeds(server) {
        server.create("movie", { name: "In Five and a Half Steps" })
        server.create("movie", { name: "The Definitive Guide to Visual Branding" })
        server.create("movie", { name: "The Search for Belonging in a World Shaped by Branding" })
        server.create("movie", { name: "A Guide for Designers" })
        server.create("movie", { name: "The Shape of Brands to Come" })
    },
    routes() {
        this.namespace = "api"
        this.passthrough();

        this.get("/books/brand", (schema, request) => {
            return schema.movies.all()
        })

        this.post("/books/brand", (schema, request) => {
            let attrs = JSON.parse(request.requestBody)

            return schema.movies.create(attrs)
        })

        this.patch("/books/brand/:id", (schema, request) => {
            let newAttrs = JSON.parse(request.requestBody)
            let id = request.params.id
            let movie = schema.movies.find(id)

            return movie.update(newAttrs)
        })

        this.delete("/books/brand/:id", (schema, request) => {
            let id = request.params.id

            return schema.movies.find(id).destroy()
        })
    },
})