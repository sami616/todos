import { GET_DRAWER as query } from '../queries'

const toggleDrawer = (_, __, { cache }) => {
    const read = cache.readQuery({ query })
    const data = { drawer: {...read.drawer, open: !read.drawer.open } }
    cache.writeQuery({ query, data })
    return { ...data.drawer }
}

export default toggleDrawer