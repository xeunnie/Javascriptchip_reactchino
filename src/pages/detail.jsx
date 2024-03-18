import React, { useEffect, useState  } from "react"
import { useParams, useNavigate} from "react-router-dom"
import { styled } from "styled-components"
import { Nav } from "react-bootstrap"
import { addItem } from "../store";
import { useDispatch } from "react-redux";

let YellowBtn = styled.button`
    background : ${props => props.bg};
    color : ${props => props.bg === 'purple'? 'white' : 'black'};
    padding : 10px;
`

function Detail(props){
    
    let [count, setCount] = useState(0)
    let [alert, setAlert] = useState(true)
    let [tabs, setTabs] = useState(0)
    let [fade2, setFade2] = useState('')

    let dispatch = useDispatch()

    let foundProduct = props.shoes.find(x => x.id === id)
    useEffect(() => {
        // 로컬스토리지에 내용 추가하기(수정 문법 사용, get 으로 꺼내서 set 으로 넣기) -> 꺼내기
        let foundItem = localStorage.getItem('watched')
        // 꺼낸 JSON 자료를 어레이로 가지고 온 것을 변수에 똑같이 저장하기
        foundItem = JSON.parse(foundItem)
        // 어레이에다가 찾은 내용 추가하기
        foundItem.push(foundProduct.id)
        //이미 꺼냈던 내용이 있으면 추가하지 말라고 코드짜기 -> if 문 써도 됨
        //근데 Set 자료형을 쓰면 중복 제거가 쉬움(중복을 알아서 다 제거해줌)
        foundItem = new  Set(foundItem)
        // 다시 어레이형으로 넣어줌
        foundItem = Array.from(foundItem)
        // 꺼낸 내용을 JSON 으로 다시 만들어서 로컬스토리지에다가 저장하기
        localStorage.setItem('watched', JSON.stringify(foundItem))
    },[])

    useEffect(()=> {
        setTimeout(()=> {setFade2('end')},200)
        return () => {
            setFade2('')
        }
    }, [])

    useEffect(()=>{
        console.log('bonjour')
        setTimeout(()=> {setAlert(false)},1000)
        let a = setTimeout(()=>{ setAlert(false)}, 2000)
        return()=>{
            clearTimeout(a)
            console.log('merci')
        }
    })
    // 어려운 연산, 서버에서 데이터 가져오기, 타이머 같은 것들 만들때 씀

    let {id} = useParams()

    let navigate =useNavigate()

    return (
        <div className={'container start' + fade2}>
            {
                alert === true
                ? <div className="alert alert-warning">
                    chloe you can do it
                </div>
                : null
            }
            <div className='row'>
                <div className='col-md-4'>
                    <img src={'/img/shoe'+ (props.shoes[id].id+1) +'.png'} alt="shoe1" width='80%'/>
                    <h5>{props.shoes[id].title}</h5>
                    <p>{props.shoes[id].content}</p>
                    <p>{props.shoes[id].price}won</p>
                    <button className='btn btn-danger' onClick={()=>{
                        dispatch(addItem({ id : props.shoes[id].id, name : props.shoes[id].title, count : props.shoes[id].count }))
                    }}>order</button>
                </div>
            </div>
            <button onClick={()=> {navigate('/detail/0')}}> 0 </button>
            <button onClick={()=> {navigate('/detail/1')}}> 1 </button>
            <button onClick={()=> {navigate('/detail/2')}}> 2 </button>
            <YellowBtn bg="purple" onClick={()=>{ setCount(count+1)}}>button</YellowBtn>
            <YellowBtn bg="plum">button</YellowBtn>
            {count}
            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTabs(0)}} eventKey="link0">버튼0</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={()=>{setTabs(1)}} eventKey="link1">버튼1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                <Nav.Link onClick={()=>{setTabs(2)}} eventKey="link2">버튼2</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent tabs={tabs}/>

      </div>

    )
}

function TabContent({tabs}){
    
    let [fade, setFade] = useState('')

    useEffect(()=>{
        setTimeout(()=>{ setFade('end') }, 200)

        return()=>{
            setFade('')
        }
    },[tabs])

    return (<div className={'start' + fade}>
    {[ <div>contents1</div>, <div>contents2</div>,<div>contents3</div>][tabs]}
    </div>)
}



export default Detail