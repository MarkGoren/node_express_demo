import * as graphql from "graphql";

const QueryRoot = {
  hello() {
    return {
      text: "hello world",
      views: 1234,
    };
  },
};

export default QueryRoot;
