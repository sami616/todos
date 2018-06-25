import ApolloClient from "apollo-boost";
import defaults from './defaults'
import resolvers from './resolvers'

const client = new ApolloClient({
    // uri: "https://eu1.prisma.sh/sami-6bb72a/test-service/dev-test-service",
    uri: "https://eu1.prisma.sh/sami-6bb72a/todos/dev",
    clientState: { defaults, resolvers }
});

export default client