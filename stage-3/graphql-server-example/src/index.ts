import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = `#graphql
  type Country {
    name: String
    code: String
    currency: String
    phone: Int
  }

  type Continent {
    code: String
    name: String
  }

  type Query {
    getOneContinent: Continent
    Countries: [country]
    country(code: String): Country
  }
`;
const SampleCountries = [
  {
    code: 'BA',
    phone: 387,
    name: 'Bosnia and Herzegovina',
    currency: 'BAM',
  },
  {
   code: 'BB',
   phone:  1246,
   name: 'Barbados',
   currency: 'BBD'
  },
  {
    code: 'BD',
    phone:  880,
    name: 'Bangladesh',
    currency: 'BDT'
   },
   {
    code: 'BE',
    phone:  32,
    name: 'Belgium',
    currency: 'EUR'
   },
   {
    code: 'BF',
    phone:  226,
    name: 'Burkina Faso',
    currency: 'XOF'
   },
];

const resolvers = {
  Query: {
    getOneContinent: () => {
        return null;
    },
    countries: () => {
        return SampleCountries
    },
    country: (_, args) => {
        console.log({args})
        return SampleCountries.find((country) => country.code ===args.code)
    }
  },
};

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
