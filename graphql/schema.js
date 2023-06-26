import * as graphql from "graphql";

const Schema = graphql.buildSchema(
  `
    type TestData {
        text: String!
        views: Int!
    }

    type RootQuery {
        hello: TestData!
    }

    schema {
        query: RootQuery
    }
    `
);

export default Schema;
