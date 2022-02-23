const { Neo4jGraphQL } = require("@neo4j/graphql");
const { ApolloServer, gql } = require("apollo-server");
const neo4j = require("neo4j-driver");

const typeDefs = gql`
   type User {
       id: ID! @id
       username: String!
       friend: [Friends!]! @relationship(type: "Friends_With",direction:OUT)
   }
   type Friends {
       id: ID! @id
        name: String!
        user:[User!]! @relationship(type: "Friends_With",direction:IN)
   }
`;

const driver = neo4j.driver(
    "neo4j+s://e1f386b2.production-orch-0064.neo4j.io:7687",
    neo4j.auth.basic("neo4j", "k8D-Ss-uk9MuRcS0giGMSE_kE7A6OZ5KTNqHO8zg33s")
);

const neoSchema = new Neo4jGraphQL({ typeDefs, driver });

neoSchema.getSchema().then((schema) => {
    const server = new ApolloServer({
        schema,
    });
  
    server.listen().then(({ url }) => {
        console.log(`🚀 Server ready at😂 ${url}`);
    });
  })