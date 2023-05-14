/* 1. mongodb theke link code copy kore ene require(mongodb ) sobar upore rakhte hbe 
2..env file baniye DB_USER AND DB_PASS create kore project name and pasword bosate hbe mongodb theke ene 

3.check korte procces.env.DB_USER evabe likhte hbe 

4.url a use korte hole (``) templete string use koete hbe and 
${procces.env.DB_USER} evabe bosate hbe 

5.require('dotenv').config()  must korte hbe uppore

6.await client.close(); comment this line or you will eat errors



7.to show data to the ui we use 'APP.GET'
8.to save data that we recived from the ui we use 'APP.POST'
9.app.use(express.json())





JWT TOKEN
(require('crypto').randomBytes(64).toString('hex')  = it can generate token)
10. npm install jsonwebtoken > 
11.create api code
12.when someone will login to the site the token will be safe somewhere - localstorage is the second best place to save it 

13.in the handle login function inside .then(data
    we will set access token using localstorage.setItem('name')  )
14.when someone logged out the access token will be deleted so, same place in the logout handler we will clear item using  localStorage.removeItem()    

15.after giving access token we will navigate the user , not before that




const corsConfig = {
    origin: '',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE']
}
app.use(cors(corsConfig))
app.options("", cors(corsConfig))
*/
