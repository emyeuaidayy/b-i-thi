import { gql } from '@apollo/client';

export const UPLOAD_IMAGE = gql`
  mutation UploadImage($input: ImageInput!) {
    uploadImage(input: $input) {
      _id
      filename
      url
      description
    }
  }
`;
module.exports = UPLOAD_IMAGE
