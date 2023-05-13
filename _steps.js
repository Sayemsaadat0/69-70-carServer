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

*/