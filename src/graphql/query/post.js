import { gql } from "@apollo/client";

export const GET_POST = gql`
  query ($input: ID!) {
    post(input: $input) {
      _id
      title
      content
      backgroundPic
    }
  }
`;

export const GET_POSTS = gql`
  query {
    posts {
      _id
      title
      backgroundPic
      createdAt
      categories {
        _id
        name
      }
      createdBy {
        _id
        username
        profilePic
      }
    }
  }
`;
