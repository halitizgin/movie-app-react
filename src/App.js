import React, { Component } from 'react';
import './App.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import MovieList from './Components/MovieList';
import NewMovieForm from './Components/NewMovieForm';

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql"
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="App">
          <MovieList/>
          <NewMovieForm/>
        </div>
      </ApolloProvider>
    );
  }
}

export default App;