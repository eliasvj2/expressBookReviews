const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
    let userswithsamename = users.filter((user)=>{
      return user.username === username
    });
    if(userswithsamename.length > 0){
      return true;
    } else {
      return false;
    }
  }

public_users.post("/register", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
  
    if (username && password) {
      if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});
//Asynchronous functions
//Tasks 1-4
// const axios = require('axios').default;

// async function asyncCall(url) {
//   console.log('calling');
//   const result = await axios.get(url);
//   console.log(result.data);
// }
// let url = "https://localhost:5000"
// asyncCall(url);

//task 2
// const axios = require('axios').default;

// async function asyncCall(url) {
//   console.log('calling');
//   const result = await axios.get(url);
//   console.log(result.data);
// }
// url = "https://localhost:5000/1"
// asyncCall(url);

//task 3
// const axios = require('axios').default;

// async function asyncCall(url) {
//   console.log('calling');
//   const result = await axios.get(url);
//   console.log(result.data);
// }
// url = "https://localhost:5000/Chichua Achebe"
// asyncCall(url);

//task 4
// const axios = require('axios').default;

// async function asyncCall(url) {
//   console.log('calling');
//   const result = await axios.get(url);
//   console.log(result.data);
// }
// url = "https://localhost:5000/Jane Austen"
// asyncCall(url);



// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books,null,4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  let book = books[isbn];
  return res.send(book);
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  const author = req.params.author;
  let keys = Object.keys(books);
  let ans = "";
  keys.forEach((key)=>{
    if (books[key].author == author){
        ans = key;
    }
  })
  
  return res.send(books[ans]);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  const title = req.params.title;
  let keys = Object.keys(books);
  let ans = "";
  keys.forEach((key) =>{
    if(books[key].title == title){
        ans = key;
    }
    
  })
  return res.send(books[ans]);
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;
  return res.send(books[isbn]);
});

module.exports.general = public_users;
