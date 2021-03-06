import React, { Component } from 'react';

import { Query, Mutation } from 'react-apollo';
import { getDirectorsQuery, getMoviesQuery, newMovieMutation } from '../Queries/Queries';
import { Button, message } from 'antd';
import 'antd/dist/antd.css';

class NewMovieForm extends Component {
    state = {
        title: '',
        description: '',
        year: null,
        director: null,
        loading: false
    }

    onChange = (e) =>
    {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    render() {
        return (
            <Mutation mutation={newMovieMutation} onCompleted={() => {
                this.formRef.reset();
                message.success('Movie added!');
                }}>
                {
                    (addMovie, { loading, error, data }) => (
                        <div className="container" data-state="New Movie">
                            <div className="device" data-view="list">
                                <form 
                                ref={el => {
                                    this.formRef = el;
                                }}
                                onSubmit={ e => {
                                    e.preventDefault();
                                    this.setState({
                                        title: "",
                                        description: "",
                                        year: "",
                                        directorId: ""
                                    });
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
                                    <div>
                                        <input name="title" onChange={this.onChange} placeholder="Title" type="text"/>
                                    </div>
                                    <div>
                                        <textarea name="description" onChange={this.onChange} placeholder="Description" id="" cols="30" rows="10"></textarea>
                                    </div>
                                    <div>
                                        <input name="year" maxLength="4" onChange={this.onChange} placeholder="Year" type="number"/>
                                    </div>
                                    <div>
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
                                    </div>
                                    <div>
                                         <Button type="primary" htmlType="submit" loading={loading}>Add</Button>
                                    </div>
                                </form>
                            </div>
                            { error && <div>Error!</div> }
                        </div>
                    )
                }
            </Mutation>
        );
    }
}

export default NewMovieForm;