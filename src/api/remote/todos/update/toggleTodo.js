import { GET_INCOMPLETE_TODOS, GET_COMPLETE_TODOS, GET_TODOS_WHERE } from '../queries'

const toggleTodo = (cache, { data: { updateTodo } }) => {

    // const { todoes: incomplete } = cache.readQuery({ query: GET_INCOMPLETE_TODOS })
    // const { todoes: complete } = cache.readQuery({ query: GET_COMPLETE_TODOS })

    console.log(cache.readQuery({ query: GET_TODOS_WHERE }))

    // const { todoes } = cache.readQuery({ query: GET_TODOS_WHERE })

    // console.log(updateTodo, todoes)
 
    // cache.writeQuery({   query, data: { todoes: [...todoes, createTodo] } })
}

export default toggleTodo