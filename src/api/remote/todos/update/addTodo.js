import { GET_INCOMPLETE_TODOS as query } from '../queries'

const addTodo = (cache, { data: { createTodo } }) => {
    const { todoes } = cache.readQuery({ query })
    cache.writeQuery({ query, data: { todoes: [...todoes, createTodo] } })
}

export default addTodo