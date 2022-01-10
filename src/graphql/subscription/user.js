import { gql } from "@apollo/client";

export const UPLOADED_PROFILEPIC = gql`
  subscription {
    uplodedProfilePic{
      user_id,
      image
    }
  }
`;
