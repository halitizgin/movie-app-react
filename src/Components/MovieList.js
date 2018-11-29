import React, { Component } from 'react';

import { gql } from 'apollo-boost';
import { graphql } from 'react-apollo';

const getMoviesQuery = gql`
{
    movies{
        id,
        title,
        description,
        year
    }
}
`;

class MovieList extends Component {
    listMovies(){
        const { data } = this.props;

        if (data.loading)
        {
            return (<div>Loading...</div>)
        }
        else
        {
            return data.movies.map(movie => 
            <div className="movie">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-description">{movie.description}</p>
            </div>
            );
        }
    }

    render() {
        return (
            <div>
                {
                    this.listMovies()
                }
            </div>
        );
    }
}

export default graphql(getMoviesQuery)(MovieList);