import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const Container = styled.div`
height : 60px;
`

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
 `

const Left = styled.div`
  flex : 1;
  display: flex;
  align-items: center;
  /* border: 0.5px solid green; */
 `

const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
`

const SearchContainer = styled.div`
 border: 1px solid lightgrey;
 display: flex;
 align-items: center;
 margin-left: 25px;
 padding: 5px;

`
const Input = styled.input`
border: none;
`

 const Center = styled.div`
  flex : 1;
  text-align: center;
  /* border: 0.5px solid orange; */
 `
 const Logo = styled.h1`
 font-weight: bold;
 `
 const Right = styled.div`
  flex : 1;  
  display: flex;
  justify-content: flex-end;
  /* border: 0.5px solid green; */
`

const MenuItem = styled.div`
 font-size : 14px;
 cursor: pointer;
 margin-left: 25px;
`

const Navbar = () => {
  return (
    <Container>
        <Wrapper>
           <Left>
            <Language>EN</Language>
            <SearchContainer>
               <Input/>
              <SearchIcon style={{color:"grey",fontSize:"16px"}}/>
            </SearchContainer>
           </Left>
           <Center>
            <Logo>Lama</Logo>
           </Center>
            <Right>
                <MenuItem>REGISTER</MenuItem>
                <MenuItem>SIGN IN</MenuItem>
                <MenuItem>
                <Badge badgeContent={4} color="secondary">
                  <ShoppingCartOutlinedIcon/>
                </Badge>
                </MenuItem>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar