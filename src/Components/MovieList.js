import React, { Component } from 'react';

import { Query } from 'react-apollo';
import { getMoviesQuery } from '../Queries/Queries';
import { Button, Modal } from 'antd';
import 'antd/dist/antd.css';

class MovieList extends Component {
    state = { 
        visible: false
    }

    showModal = id => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        this.setState({
        visible: false,
        });
    }
    render() {
        return (
            <div className="container" data-state="Movie App">
                <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk}
                >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
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