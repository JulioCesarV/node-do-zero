import { randomUUID } from "node:crypto"

export class DatabaseMemory {
    #videos = new Map() //Método Map utilizado para mapear o array #videos e trazer as funções de CRUD atribuindo dois parâmetro (Key, Value)

    list(search) {
        return Array.from(this.#videos.entries()) // O "Array.from" converte uma estrutura de dados que não é um array para um array. O "this.#videos.entries()" era uma classe
            .map((videoArray) => { // O "map()"" está mapeando o array, assim podemos resgatar o que tem em cada posição do array
                const id = videoArray[0] // O Id está na primeira posição do array que o "entries()" está retornando
                const data = videoArray[1] // O restante dos dados está na segunda posição do array que o "entries()" está retornando

                return {
                    id,
                    ...data, // Os três pontos retornam todo o valor que está atribuído dentro do objeto
                }
            })
            .filter(video => { 
                if (search) { // Se houver um filtro, apenas o resultado filtrado será retornado
                    return video.title.includes(search)           
                }

                return true // Senão, retorna toddas as informações
            })

    }

    create(video) {
        const videoId = randomUUID()
        // Criando um ID aleatório para usar na cração do vídeo

        this.#videos.set(videoId, video)
    }

    update(id, video) {
        this.#videos.set(id, video)
        //Não foi criado um ID porque o ID já está vindo através do parâmetro, ele foi criado no momento da criação do vídeo com o método UUID
    }

    delete(id) {
        this.#videos.delete(id)
        // Para deletar, utilizamos apenas o ID do vídeo
    }

}