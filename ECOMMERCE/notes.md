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
## how to show all product with proper space iirespective of screen size
 flex-wrap: wrap;


## how to show icon on prodct on hover 

const Info = styled.div`
  opacity: 0;
  z-index: 3;
  transition: all 0.5s ease;
`;

const Container = styled.div`
  &:hover ${Info}{
    opacity: 1;
  }
`;

const Icon = styled.div`
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

## InputContainer divede flex : 1-8
const InputContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Input = styled.input`
flex: 8;  
`;

const Button = styled.button`
  flex: 1;
`;




