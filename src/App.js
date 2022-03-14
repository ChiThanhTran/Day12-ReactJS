import { React, useState } from 'react' 
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css' ;
import HomePage  from './component/home';
import PostPage from './component/post';
import ProfilePage from './component/profile';
import LoginPage from './component/login';
import PostDetailPage from './component/postdetail';
import { Navbar, Container , Button } from 'react-bootstrap';
export default function App(){
  const [buttonContent, setButtonContent] = useState('Login')
  const [isLogined, setIsLogined] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    setButtonContent('Login')
    setIsLogined(false)
  }

  return (
    <BrowserRouter>
      <div>
          <Navbar bg="dark" expand="lg">
            <Container>
              <Navbar.Brand >
                <Link to="/" className='link_Navbar' >Home</Link>
                <Link to="/posts" className='link_Navbar'>Posts</Link>
                <Link to="/profile" className='link_Navbar'>Profiles</Link>
                <Link to="/login" className='link_Navbar'>
                  {buttonContent === 'Logout' ? <Button variant='outline-light'  onClick={handleLogout}>{buttonContent}</Button> : buttonContent}
                </Link>
              </Navbar.Brand>
            </Container>
          </Navbar>

        </div>
      <Routes>
          <Route path="/" element={<HomePage/>}>     </Route>
          <Route path="/posts" element={<PostPage/>}>     </Route>
          <Route path="/posts/:id" element={<PostDetailPage/>}>     </Route>
          <Route path="/profile" element={<ProfilePage setButtonContent={setButtonContent} isLogined={isLogined} setIsLogined={setIsLogined}/>}>     </Route>
          <Route path="/login" element={<LoginPage setButtonContent={setButtonContent} isLogined={isLogined} setIsLogined={setIsLogined}/>}>     </Route>
      </Routes>
    </BrowserRouter>
     
  );
}

