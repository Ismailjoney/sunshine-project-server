const express = require(`express`)
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express()
//middleware
app.use(cors())
app.use(express.json());

//sunshine
//E9oAU3FVB1eFK7KS

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.i8hxp3j.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const fresherCollection = client.db('sunshinejobportal').collection('fresherjob')
        const exprienceCollection = client.db('sunshinejobportal').collection('expriencejobs')
        const  topCompanyCollection = client.db('sunshinejobportal').collection('topcompany')
        

        //limit 6
       app.get('/fresherjobs', async(req,res) => {
        const query ={}
        const result = await fresherCollection.find(query).limit(6).toArray()
        res.send(result)
       })
       //no limit
       app.get('/fresheralljobs', async(req,res) => {
        const query ={}
        const result = await fresherCollection.find(query).toArray()
        res.send(result)
       })

       //exprience
       app.get('/expriencejob', async(req,res) => {
        const query ={}
        const result = await  exprienceCollection.find(query).limit(6).toArray()
        res.send(result)
       })

        //exprience
        app.get('/expriencejobs', async(req,res) => {
            const query ={}
            const result = await  exprienceCollection.find(query).toArray()
            res.send(result)
           })
        //no limit
       app.get('/topcompany', async(req,res) => {
        const query ={}
        const result = await topCompanyCollection.find(query).toArray()
        res.send(result)
       })

    }
    finally {

    }
}
run().catch(err => console.log(err))







app.get('/', (req, res) => {
    res.send(`sunshine service running`)
})

app.listen(port, () => {
    console.log(`the port is running ${port}`);
})