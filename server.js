import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js' // Linha comentada porque estamos utilizando o database postgres
import { DatabasePostgres } from './database-postgres.js'

const server = new fastify()

// const database = new DatabaseMemory() // A linha de código foi comentada porque utilizaremos o postgres, antes estávamos utilizando o database em memória

const database = new DatabasePostgres()

server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.list(search) // A busca pela lista para ser filtrada é opcional. Se passado um parâmetro de filtro, ele será colocado dentro de "search"


    return videos
})

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body

    await database.create({
        title: title, // Os dados estão vido através da const criada para o request.body
        description: description,
        duration, // Short sintax, posso deixar assim já que o nome da chave é igual ao nome passado para o valor
    })

    return reply.status(201).send()
})

server.put('/videos/:id', async (request, reply) => {
    const videosId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videosId, {
        title,
        description,
        duration,
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async (request, reply) => {
    const videosId = request.params.id

    await database.delete(videosId)

    return reply.status(204).send()
})

server.listen({
    port: process.env.PORT ?? 3333,
})
