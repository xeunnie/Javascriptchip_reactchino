import './App.css';
import { Navbar, Container, Nav } from 'react-bootstrap';
import {useEffect, useState} from 'react';
import shoeData from './data.js';
import{Routes, Route, useNavigate, Outlet} from 'react-router-dom'
import Detail from './pages/detail.jsx'
import Cart from "./pages/cart";
import axios from 'axios';
import {useQuery} from 'react-query'

function App() {

  useEffect(()=>{
    localStorage.setItem('watched', JSON.stringify([]))
  }, [])
  // Jotai, reduct persisit, zustand

  let [shoes,setShoes] = useState(shoeData)
  let [stock] = useState([10,11,12])
  let navigate =useNavigate()

  let result = useQuery('', ()=>
     axios.get('https://codingapple1.github.io/userdata.json').then((a)=>{
      return a.data
    }),
    {staleTime : 2000} // 타이머 기능
  )
  //

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Shoe Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=> {navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=> {navigate(-1)}}>Rollback</Nav.Link>
            <Nav.Link onClick={()=> {navigate('/detail')}}>Detail</Nav.Link>
            <Nav.Link onClick={()=> {navigate('/about')}}>About</Nav.Link>
            <Nav.Link onClick={()=> {navigate('/cart')}}>Cart</Nav.Link>
          </Nav>
          <Nav className='ms-auto'>
            {/* { result.isLoading ? 'Loading' : result.data.name } */}
            { result.isLoading && 'Loading' }
            { result.error && 'error' }
            { result.data && result.data.name }
          </Nav>
        </Container>
      </Navbar>


      
      <Routes>
        <Route path="/" element={
          <div>
            <img className='main-bg'src={process.env.PUBLIC_URL + '/img/mainPic.png'} alt="shoe1" width='80%'/>
            <div className='container'>
              <div className='row'>
                {
                  shoes.map((a,i)=>{
                    return(
                      <Card shoes={shoes[i]} i={i} onClick={()=> navigate('/detail/'+i)}></Card>
                    )
                  })
                }
              </div>
              <button onClick={()=>{
                console.log('loading')
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((db)=>{ 
                  console.log(db.data)
                  let copy = [...shoes, ...db.data]
                  setShoes(copy)
                })
                .catch(()=>{
                  console.log('111')
                })
              }}>bonjour</button>
              <button onClick={()=> {navigate('/detail/0')}}> 0 </button>
              <button onClick={()=> {navigate('/detail/1')}}> 1 </button>
              <button onClick={()=> {navigate('/detail/2')}}> 2 </button>
            </div>
          </div>
        }/>
        <Route path="/detail/:id" element={<Detail shoes={shoes}/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path= "/about" element={<About/>}>
          <Route path= "member" element={<div>members</div>}/>
          <Route path= "location" element={<div>location</div>}/>
        </Route>
        <Route path= "*" element={<div>You're Wrong</div>}/>
      </Routes>

    </div>
  );
}

function About(){
  return(
    <div>
      <h4>company info</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props){
  return (
    <div className='col-md-4'>
      <img 
      src={process.env.PUBLIC_URL + '/img/shoe'+(props.i+1)+'.png'} alt="shoe1" width='80%'
      />
      <h5>{props.shoes.title}</h5>
      <p>{props.shoes.price}</p> 
    </div>
  )
}

export default App;
