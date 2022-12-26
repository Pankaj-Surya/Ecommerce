## Intial setup
npm init -y --> create package.json
npm i express mongoose dotenv nodemon

mongodb
1.create the user in db access 
2.go to database  -> connect to cluster --> connect to your application
3.copy url
4.mongodb+srv://<username>:<password>@cluster0.62scxyt.mongodb.net/?<DatabaseNAME>nretryWrites=true&w=majority



## crypto js 
encrypt the password

## jwt 
-> verify the user is authorized
-> passed token on any request updating deleting

##  verifyToken fn 
1. get the token from header
const authHeader = req.headers.token;
if(authHeader) {
 const token = authHeader.split(" ")[1];
2. Verify the token using jwt
 jwt.verify(token, process.env.JWT_SEC, (err,user)=>{
          if(err) return res.status(403).json("Token is not valid!")
            req.user = user;
            next();
        })

## verifyTokenAndAuthorization
1. req user id == req param id
 verifyToken(req, res, () =>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next();            
        }else{
            res.status(403).json("You are not allowed to do that!"); 
        }
    })