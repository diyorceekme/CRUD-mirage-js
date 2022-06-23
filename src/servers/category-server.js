import {
    createServer,
    Model
} from "miragejs"

createServer({
    models: {
        movie: Model
    },
    seeds(server) {
        server.create("movie", { name: "Romanlar" })
        server.create("movie", { name: "Fantastik" })
        server.create("movie", { name: "Biografiya" })
        server.create("movie", { name: "Biznes" })
        server.create("movie", { name: "Ilmiy" })
    },
    routes() {
        this.namespace = "api"
        this.passthrough();

        this.get("/books/category", (schema, request) => {
            return schema.movies.all()
        })

        this.post("/books/category", (schema, request) => {
            let attrs = JSON.parse(request.requestBody)

            return schema.movies.create(attrs)
        })

        this.patch("/books/category/:id", (schema, request) => {
            let newAttrs = JSON.parse(request.requestBody)
            let id = request.params.id
            let movie = schema.movies.find(id)

            return movie.update(newAttrs)
        })

        this.delete("/books/category/:id", (schema, request) => {
            let id = request.params.id

            return schema.movies.find(id).destroy()
        })
    },
})