import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation ($input: createPostInput) {
    createPost(input: $input)
  }
`;
