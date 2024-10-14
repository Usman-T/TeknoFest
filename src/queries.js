import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

export const CREATE_USER = gql`
  mutation ($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      username
    }
  }
`;

export const ME = gql`
  query {
    me {
      username
      registeredCompetitions {
        title
        description
        seats
        price
        registeredSeats {
          username
        }
        id
      }
      joinedCompetitions {
        title
        description
        seats
        price
        registeredSeats {
          username
        }
        id
      }
    }
  }
`;

export const ALL_COMPETITIONS = gql`
  query {
    allCompetitions {
      description
      id
      price
      registeredSeats {
        username
      }
      title
      seats
    }
  }
`;


export const CREATE_COMPETITION = gql`
  mutation CreateCompetition($title: String!, $description: String!, $seats: Int!, $price: Int!, $category: String!, $image: String!) {
  createCompetition(title: $title, description: $description, seats: $seats, price: $price, category: $category, image: $image) {
    title
  }
  
}
`