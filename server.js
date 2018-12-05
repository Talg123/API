const express = require('express');
const app = express();
const port = 8888;
const storage = require("./localStorage");

//parse json if needed
app.use(express.json());
//url encoded for "POST" request body params
app.use(express.urlencoded({extended:true}));

//get the hashed key and redirect url if exists
app.get('/:hash', (req, res) => {
    //get the request url paramater
    let url = storage.getLocalStorage(req.params.hash);
    //check if url exists else return status 404 and error
    if(!url){
        res.status(404).json({error:"No Such Url"});
    }
    res.redirect(url);
});

/**
 * add new "url" redirect and return the Hash key
 */
app.post("/add",(req,res)=>{
    let hash = storage.setLocalStorage(req.body.url);
    res.send(JSON.stringify(hash));
})

app.listen(port);

