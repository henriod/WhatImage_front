import React, { Component } from 'react';
import axios from 'axios'
import Image from './Image';
import { Button, Spinner } from 'react-bootstrap';

class ImageList extends Component {
    state = {
        images: [],
        visible: 2,
        isLoading: true,
        newLoaded: false,
        status: false,
    }
    componentDidMount() {
        setTimeout(this.getImages, 1500)
    }

    getImages = () => {
        axios.get('http://127.0.0.1:8000/api/images/', {
            headers: {
                'accept': 'application/json'
            }
        }).then(resp => {
            this.setState({
                images: resp.data,
                status: true
            })
        })
        this.setState({ isLoading: false })
    }
    handleVisible = () => {
        const visible = this.state.visible
        const new_visible = visible + 2
        this.setState({ newLoaded: true })
        setTimeout(() => {
            this.setState({ visible: new_visible, newLoaded: false })
        }, 300)

    }
    render() {
        const images = this.state.images.slice(0, this.state.visible).map(img => {
            return <Image key={img.id} pic={img.picture} name={img.classfied} />
        })
        return (
            <div>
                {this.state.isLoading ?
                    <Spinner animation="border" role="status"></Spinner>
                    :
                    <React.Fragment>
                        {(this.state.images.length === 0) && (this.state.status) &&
                            <h3>No Images classified</h3>
                        }
                        {images}
                        {this.state.newLoaded &&
                            <Spinner animation="border" role="status"></Spinner>
                        }
                        <br />
                        {(this.state.images.length > this.state.visible) && (this.state.images.length > 2) &&
                            <Button variant="primary" size="lg" className="mb-3" onClick={this.handleVisible}>Load More</Button>
                        }
                        {(this.state.images.length <= this.state.visible) && (this.state.images.length > 0) &&
                            <h3 className="mb-3">No more images to Load</h3>
                        }

                    </React.Fragment>
                }
            </div>
        );
    }
}

export default ImageList;