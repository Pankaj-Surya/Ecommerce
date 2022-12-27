import styled from "styled-components"
import Send from '@mui/icons-material/Send';
import { mobile } from "../responsive";

const Conatiner = styled.div`
  height: 30vh;
  background-color : #fcf5f5 ;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
` 
const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
` 
const Description = styled.div`
  font-size: 20px;
  font-weight: 300;
  margin-bottom: 20px ;
  ${mobile({ textAlign: "center" })}

` 
const InputContainer = styled.div`
   width: 50%;
   height: 40px;
   background-color: white ;
   display: flex;
   justify-content: space-between;
  border: 1px solid lightgray;
` 
const Input = styled.input`
 border: none;
  flex: 8;
  padding-left: 20px;
` 
const Button = styled.button`
  flex: 1;
  border: none;
  background-color: teal;
  color: white;
` 

const NewsLetter = () => {
  return (
    <Conatiner>
        <Title>NewsLetter</Title>
        <Description>Get Timely updates from your favourites products.</Description>
        <InputContainer>
         <Input placeholder="Your Email"/>
         <Button>
            <Send/>
         </Button>
        </InputContainer>
    </Conatiner>
  )
}

export default NewsLetter