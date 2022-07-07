import './App.css';
import {Sidebar, NavItemsContainer, NavItem} from 'react-sidebar';

function App() {
  return (
    <div className="App">
    <Sidebar>
    <NavItemsContainer>
        <NavItem to='/' label='Home' exact />
        <NavItem to='/explore' label='Explore' exact />
        <NavItem label='Playlists'>
            <NavItem to='/subscription-1' label='Playlist-1' exact />
            <NavItem to='/subscription-2' label='Playlist-2' exact />
        </NavItem>
    </NavItemsContainer>
</Sidebar>
    </div>
  );
}

export default App;
