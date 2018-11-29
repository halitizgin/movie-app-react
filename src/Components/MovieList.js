import React, { Component } from 'react';

import { Query } from 'react-apollo';
import { getMoviesQuery } from '../Queries/Queries';

class MovieList extends Component {
    render() {
        return (
            <div className="container" data-state="Movie App">
                <div className="device" data-view="list">
                    <ul className="layer" data-view="list">
                        <Query query={getMoviesQuery}>
                            {
                                ({ loading, error, data }) => {
                                    if (loading) return <h3>Loading...</h3>

                                    if (error) return <h4>Error!</h4>

                                    return data.movies.map(movie => (
                                        <li key={movie.id} className="content">
                                            <div class="bg"></div>
                                            <div class="avatar"></div>
                                            <div class="title">{movie.title}</div>
                                            <p>{movie.description}</p>
                                        </li>
                                    ));
                                }
                            }
                        </Query>
                    </ul>
                </div>
            </div>
        );
    }
}

export default MovieList;