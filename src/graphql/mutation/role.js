import { gql } from "@apollo/client";

export const UPDATE_USER_FROM_ROLE = gql`
  mutation ($input: userUpdateFromRoleInput) {
    updateUserFromRole(input: $input) {
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
`;
