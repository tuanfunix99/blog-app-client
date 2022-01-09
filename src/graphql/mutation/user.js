import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation ($input: registerInput) {
    register(input: $input)
  }
`;

export const LOGIN = gql`
  mutation ($input: loginInput) {
    login(input: $input)
  }
`;

export const LOGOUT = gql`
mutation{
  logout
}
`;

export const ACTIVE_ACCOUNT = gql`
  mutation ($input: String) {
    activeAccount(input: $input)
  }
`;
