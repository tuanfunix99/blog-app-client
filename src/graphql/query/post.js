import { gql } from "@apollo/client";

export const GET_POST = gql`
  query ($input: ID!) {
    post(input: $input) {
      _id
      title
      content
      backgroundPic
      categories{
        _id
      }
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

export const GET_POSTS_PAGE = gql`
  query($input: Int!){
  postsPage(input: $input) {
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

export const GET_MY_POST = gql`
query($input: ID!){
  myPost(input: $input) {
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
`
