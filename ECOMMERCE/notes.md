## Configuration ##
1.First Clone repo
git clone --single-branch -b react-mini https://github.com/safak/youtube.git
2.install yarn and check version
3.install all node modules - yarn / npm i
5.run - yarn start
6.yarn add styled-components

## Styled Components ##
* Normal Html and css
  <div>
  Navbar     
  </div>
* styled components
   const Container = styled.div`
   height : 60px;
  background-color : black;
  `
   <Container>Navbar</Container>
* in styled component we can give same className for
  every component like for 
  1.home : className = container
  2.Login : className = container
  but in normal html we cant give same name it will override in child

## To divide the left,right and center in equal part
    even left container have more content like text it should not enter into other contaier
* give : flex : 1 -> 1 unit to every container


## to center Arrow in slideer
top: 0;
bottom: 0;
margin: auto;

## to give left and right side space to arrow
 <Arrow direction="left">
          <ArrowLeftOutlinedIcon/>
 </Arrow>
 left : ${props => props.direction === "left" && "10px"};
 right : ${props => props.direction === "right" && "10px"};

# transperent
opacity: 0.5;

# how to put title and button image
 <Container>
      <Image src={item.img} />
      <Info>
        <Title>{item.title}</Title>
        <Button>SHOP NOW</Button>
      </Info>
  </Container>

const Container = styled.div`
  position: relative;
`; 

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

-------------


