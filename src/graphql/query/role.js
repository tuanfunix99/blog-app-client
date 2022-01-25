import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query ($options: Option) {
    users(options: $options) {
      count
      users {
        _id
        email
        username
        role
        passportId
        isActive
        profilePic
        createdAt
      }
    }
  }
`;
