const LocalStorage = require('node-localstorage').LocalStorage;
localStorage = new LocalStorage('./scratch');

/**
 * export the module inorder to use it in the server.js file
 */
module.exports = {
    /**
     * Add to the Local Storage array and return the hash key
     * @param {*} item 
     */
    setLocalStorage: (item)=>{
        //set storage as array
        let storage = [];
        //checks if the localStorage has anything in it
        if(localStorage.length > 1){
            storage = JSON.parse(localStorage.getItem("array"));
        }
        //make uniqe HASH(with timestamp)
        let hash = new Date().getTime();
        //push the localStorage new url
        storage.push({hash,url:item});
        //re-set the localStorage array
        localStorage.setItem("array",JSON.stringify(storage));
        //return the hash
        return hash;
    },

    /**
     * get from the localstorage array by hash key
     * and return the Url
     * @param hash - string
     */
    getLocalStorage: (hash)=>{
    //parse from the localStorage(comes as String);
    let arr;
    //try and catch to make sure the localStorage parse well(an array)
    try {
        arr = JSON.parse(localStorage.getItem("array"));
            //using ES6 find() to return the HASH that match
        return arr.find(res=>res.hash == hash).url;      
    } catch (error) {
        //if there is an error/no such hash return null
        return null;
    }

    }
}
