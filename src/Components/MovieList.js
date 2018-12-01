import React, { Component } from 'react';

import { Query } from 'react-apollo';
import { getMoviesQuery, getMovieQuery } from '../Queries/Queries';
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';
import { flattenSelections } from 'apollo-utilities';
import NewMovieForm from './NewMovieForm';

class MovieList extends Component {
    state = { 
        visible: false,
        id: null
    }

    showModal = id => {
        this.setState({
            visible: true,
            id
        });
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    handleCancel = (e) => {
        this.setState({
            visible: false
        });
    }
    render() {
        return (
            <div className="container" data-state="Movie App">
                <Modal
                title="Movie Details"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={
                    <Button type="primary" onClick={this.handleOk}>Kapat</Button>
                }
                >
                <div>
                    <Query query={getMovieQuery} variables={{ id: this.state.id }}>
                        {({ loading, error, data }) => {
                            if (loading) return <div>Loading...</div>
                            if (error) return <div>Error!</div>
                            console.log(data.movie);
                            return (
                                <div>
                                    <h2>{data.movie.title}</h2>
                                    <p>{data.movie.year}</p>
                                    <p>{data.movie.description}</p>
                                    <br/>
                                    <h3>{data.movie.director.name}</h3>
                                    {
                                        data.movie.director.movies.map((movie) => (
                                            <ul className="director-list">
                                                <li className="content">
                                                    <div className="bg"></div>
                                                    <div className="title">{movie.title}</div>
                                                </li>
                                            </ul>
                                        ))
                                    }
                                </div>
                                )
                        }}
                    </Query>
                </div>
                </Modal>
                <div className="device" data-view="list">
                    <ul className="layer" data-view="list">
                        <Query query={getMoviesQuery}>
                            {
                                ({ loading, error, data }) => {
                                    if (loading) return <h3>Loading...</h3>

                                    if (error) return <h4>Error!</h4>

                                    return data.movies.map(movie => (
                                        <li key={movie.id} className="content" onClick={() => {
                                            this.showModal(movie.id);
                                        }}>
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