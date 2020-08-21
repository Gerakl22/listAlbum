import React from 'react';



class ListAlbums extends React.Component {
    
    state = {
        users: null,
        albums: null,
        isLoading: false,
        error: null,
    } 


        async componentDidMount() {
            try {
                const responseAlbums = await fetch(
                `http://jsonplaceholder.typicode.com/albums`
            );

                const responseUsers = await fetch(
                    `http://jsonplaceholder.typicode.com/users`,
                );

            const albums = await responseAlbums.json();
            const users = await responseUsers.json();
                    console.log(users)

            this.setState({ albums, users, isLoading: false });
            
            } catch (error) {
                this.setState({error, isLoading: false});
                }
            }
            
        
    
    render() {
        if(this.state.isLoading) {
            return "...Loading...albums..."
        }

        if(this.state.error) {
            return `...Error occupied ${this.state.error.message}`
        }


        return (
            <>
            <ul>
                {this.state.albums && this.state.albums.map((album) => (
                    <li key={album.id}
                        id={album.id}>
                        <span>{album.title}: {this.state.users.find(u => u.id === album.userId).name}</span>
                       
                        </li>
                    
                ))}
            </ul>
            
            </>
        );
    }
}

export class Toggle extends React.Component{
    state = {
        isVisible: false,
    }

    render() {
        return (
            <>
            <button onClick={() => this.setState({
                isVisible: !this.state.isVisible
            })}>
                Toggle
            </button>
            {this.state.isVisible && <ListAlbums />}
            </>
        )
    }
}
