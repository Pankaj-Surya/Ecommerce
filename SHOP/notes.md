git clone --single-branch -b react-mini https://github.com/safak/youtube.git


## How to display Products and Filtered Products List ?
1. ProductList page :  capture the filter and sort value using onchange event and value attribute. cat from url using useLocation 
hook
2. pass prop cat,filter,sort to Products component 
3. create the products and filtered products useState
4. useEffects run when cat changes
5. fetch products list using axios get method http://localhost:5000/api/products/

img png
https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg
https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg
https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg
https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg
https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg

https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg



## How to filter product 
1.Backend API : Get All Product cat wise query - http://localhost:5000/api/products?category=pant - (category=pant) is query 
2.so we will use this in get req

## Problem in Products.js comp it is used in two pages 1.Home page 2.ProductList page but we need filtered product only in ProductList page?
 const res = await axios.get(
          cat ? "http://localhost:5000/api/products" :
          `http://localhost:5000/api/products?category=${cat}`)







1.products = [{p1},{p2},{},{},{},{},{},{},] filter => {p1} 

 item = {p1} => {
         title :"puma tshirt"
         desc : "test"
         img : "text"
         categories : Array
         size : "M"
         color : "red"
         price : 300
         createdAt : 2022-12-27T03:50:52.996+00:00
         updatedAt : 2022-12-27T03:50:52.996+00:00
         }

2.Object.entries(filters) 
   - filters Obj => {color: 'blue', size: 'M'}
   - .entries -> covert object key value pairs array =>
    {[color: 'blue'], [size: 'M']}
   - .every(([key, value]) => [color,blue]
   - item[color].include[blue]
      
      products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )

=======================

## How to filter product array on the basis of filter object

products = [
    {
        'title' :"puma tshirt",
        'desc' : "test",
        'img' : "https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg",
        'categories' : ["Puma","tshire"],
        'size' : "M",
        'color' : "yellow",
        'price' : 250,
    },
    {
        "title" :"puma jeans",
        "desc" : "test",
        "img" : "https://assets.myntassets.com/f_webp,dpr_1.5,q_60,w_210,c_limit,fl_progressive/assets/images/16658260/2022/1/3/0442db57-8026-4211-a21b-4b84bd6bb9241641200990655HIGHLANDERMenBlueTaperedFitHighlyDistressedHeavyFadeStretcha1.jpg",
        "categories" : ["puma","Pant"],
        "size" : "M",
        "color" : "blue",
        "price" : 300,
    },
     {
        "title" :"nike shirt",
        "desc" : "test",
        "img" : "https://www.prada.com/content/dam/pradanux_products/U/UCS/UCS319/1YOTF010O/UCS319_1YOT_F010O_S_182_SLF.png",
        "categories" : ["nike","shirt"],
        "size" : "S",
        "color" : "red",
        "price" : 200,
    },
     {
        "title" :"nike bag",
        "desc" : "test",
        "img" : "https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png",
        "categories" : ["Nike","bag"],
        "size" : "XL",
        "color" : "yellow",
        "price" : 100,
    },
   ]

const filters = {color: 'blue', size: 'M'}

const filterProducts = products.filter((item) =>
Object.entries(filters).every(([key, value]) =>
  item[key].includes(value)
)
)

## how to show only 8 item on Home page
products
      .slice(0, 8)
      .map((item) => <Product item={item} key={item.id} />)

## how to show product Page data
1.from products comp will pass product id in url
2.getLocation hook we will get pid
3.api product/find/+pid will get product information


## how to show notification increase when click on addToCart button
1. we user redux toolkit created reducer 
2. reducer has 1.name : cart 2,intitalState : {product : [],quantity, price }
3. cofigured store. store has reducer info and pass to index.js using provider
4. in product.js page when on click AddToCart button we dispatch action addCart method and it will send to store
5. get cart data from store using useSelect hook and give to badge notification


## how to login user redux setup
1. userslice - 1.name : user 
               2.initialState :{  user : null ,isFetching : false ,error:false 
               3.reducer action : 3.1.   loginStart   3.2.loginSuccess 3.3loginFail
2. giver userSlice to store
3. apiCall : login (dispatch,user) -> axios    post call
4. onclick on login function : call login(dispatch,{username,password})
 



=====================06-01-2023=============

## onclick on addToCart button-> check user logged in or not-> 
1.if logged in -> cart checkout page
2.else -> alert msg pleasee login 

## problem on loading login && register 

## login user show there cart data even logout and again login show previous car data ?

