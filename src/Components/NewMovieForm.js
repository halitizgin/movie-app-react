import React, { Component } from 'react';

import { Query, Mutation } from 'react-apollo';
import { getDirectorsQuery, getMoviesQuery, newMovieMutation } from '../Queries/Queries';

class NewMovieForm extends Component {
    state = {
        title: '',
        description: '',
        year: null,
        director: null
    }

    onChange = (e) =>
    {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    render() {
        return (
            <Mutation mutation={newMovieMutation}>
                {
                    (addMovie, { loading, error, data }) => (
                        <div>
                            <form onSubmit={ e => {
                                e.preventDefault();
                                addMovie({
                                    variables: {
                                        title: this.state.title,
                                        description: this.state.description,
                                        year: parseInt(this.state.year),
                                        directorId: this.state.director
                                    },
                                    refetchQueries: [{ query: getMoviesQuery }]
                                });
                                } }>
                                <label>Title</label>
                                <input name="title" onChange={this.onChange} placeholder="Title" type="text"/>
                                <br/>
                                <label>Description</label>
                                <textarea name="description" onChange={this.onChange} placeholder="Description" id="" cols="30" rows="10"></textarea>
                                <br/>
                                <label>Year</label>
                                <input name="year" maxLength="4" onChange={this.onChange} placeholder="Year" type="number"/>
                                <br/>
                                <select name="director" onChange={this.onChange}>
                                    <option key={null} value="null">Choose Director</option>
                                    <Query query={getDirectorsQuery}>
                                        {
                                            ({ loading, error, data }) => {
                                                if (loading) return <option disabled>Loading...</option>
                                                if (error) return <option disabled>Error!</option>

                                                return data.directors.map(({ id, name }) => (
                                                    <option key={id} value={id}>{name}</option>
                                                ));
                                            }
                                        }
                                    </Query>
                                </select>
                                <br/>
                                <button type="submit">Add</button>
                            </form>

                            { loading && <div>Loading...</div> }
                            { error && <div>Error!</div> }
                        </div>
                    )
                }
            </Mutation>
        );
    }
}

export default NewMovieForm;