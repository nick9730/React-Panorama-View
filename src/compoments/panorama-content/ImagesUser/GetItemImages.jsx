

import React, { useEffect, useState } from 'react'
import styled,{css } from 'styled-components'
import { useGetImages } from './useGetImages'
import { NavLink, useParams } from 'react-router-dom'
import Button from '../../ui/Button'
import { useDeleteImage } from './useDeleteImage'
import Infos from './Infos'

const Container = styled.div`
        

    display: flex;
    flex-direction: row;
`

const Info = styled.div`
    
    padding: 10px;
    display: flex;
    flex-direction: column;
  
  
    

`

// const Img = styled.img`
//      width:1000px ;
//      height: 400px;
//      transition: 2s;

//      &:hover{
//       filter: blur(3px);
//       background-color: gray;
//       color: gray;
//      }


// `

const StyledName = styled.div`
   text-decoration: solid;
    line-height: 12px;
    color: black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 5px;
    border-bottom: 5px solid blueviolet;
    margin: 6px;
`


const StyledImageContainer = styled.div`
   width: 100%;
   height: 100%;
position: relative;


`



const ButtonPosition = styled.div`
   
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   width: 30px;
   height: 20px;
   gap: 20px;
   position: absolute;
   left: -150px;
   top: 80px;
z-index:10;
`


const StyledNavLinkj = styled(NavLink)`
  
  color: var(--color-brand-50);
    background-color: #00838E;
    width: 180px;
     font-weight: 700;
     font-family: 'Roboto';
     font-size: 1.4rem;
    padding: 1.2rem 1.6rem;
      display: flex;
   
      justify-content: center;
    border: none;
border-radius: var(--border-radius-sm);
box-shadow: var(--shadow-sm);
    &:hover {
      background-color: var(--color-brand-700);
      color: black;
    }
  
`
// const ButtonInfo = styled.button`
//  position: absolute;
//   top: 50%;
//   left: 30%;
//   transform: translate(+50%, -50%);
//   -ms-transform: translate(-50%, -50%);
//   background-color: #555;
//   color: white;
//   font-size: 16px;
//   padding: 20px 80px;
//   border: none;
//   cursor: pointer;
//   border-radius: 5px;
//   transition: 3s;

// `


// const ButtonEdit= styled(NavLink)`
//  position: absolute;
//   top: 50%;
//   left: 60%;
//   transform: translate(+50%, -50%);
//   -ms-transform: translate(-50%, -50%);
//   background-color: #555;
//   color: white;
//   font-size: 16px;
//   padding: 20px 80px;
//   border: none;
//   cursor: pointer;
//   border-radius: 5px;
//   transition: 3s;

// `


const Img  = styled.img`
  /* ${(props) =>
    props.type === "regular" &&
    css`
    
     transition: 2s;

    
    `} */

 /* ${  (props)=>
 props.type === "hoverImage" &&
    css`

      filter: blur(3px);    
        background-color: gray;
   color: gray;
  
`} */
    transition: 2s;
    width:800px ;
     height: 400px;
  `
// Img.defaultProps= {
//   type: "hoverImage"
// }





export default function GetItemImages({images,index}) {

  const [hover,setHover] = useState(false)
  const [show,setShow] = useState(false) 
  const [id,setId] = useState()
  const {deletedImage} = useDeleteImage()
  const{Images} = useGetImages()
  const {id:ParamsID} = useParams()
  const {id:ImageId,name } = images
  


useEffect(() => {
  localStorage.setItem('project_id', JSON.stringify(ParamsID));
}, [ParamsID]);

// useEffect(() => {
//   localStorage.setItem('index', JSON.stringify(index));
// }, []);





function MouseOver(){
    setHover(true)
   console.log(hover)

}
 function MouseDown(){
  setHover(false)
  console.log(hover)
 }

 function Edit(){ 
  console.log(index)
  localStorage.setItem('index', JSON.stringify(index));
 }
  return (

    <>
    <Container>
     
       
        <Info >
        <StyledName>
         {name}
        </StyledName>
        
          <StyledImageContainer onMouseOver={MouseOver}
           onMouseOut={MouseDown} >
          <Img type={hover? 'hoverImage' : 'regular'}   
          src={Images[index]?.image} 
          alt={`${Images[index]?.name}`} />
       

<ButtonPosition onEdit = {Edit}>

         <Button onClick={()=>deletedImage(ImageId)}>
          Delete
         </Button>
        
         <Button onClick={()=>{setShow(true);setId(ImageId)}} >
         Info
         </Button>

  

          <StyledNavLinkj onClick={Edit} to= {`/projects/${ParamsID}/gallery/${ImageId}`}>
          Add Hotspots
          </StyledNavLinkj>
       
</ButtonPosition>
   
        


         
         </StyledImageContainer>
         </Info>
          
    </Container>
     {show && <Infos id={id} setShow={setShow}/>}
          </>
  )
}