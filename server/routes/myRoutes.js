var fs       = require("fs");
var mysql   = require('mysql');
var config   = require("../config.js");
var myRoutes = {};
  myRoutes.register = function(req,res){
  var userdet = {};
  var userInfo = {};
  var response = {};
    console.log("Register");
    var username = req.params.uname;
    var lname = req.params.lname;
    var dob = req.params.dob;
    var depa = req.params.depa;
    var deg = req.params.deg;
    var sslc  = req.params.sslc;
    var hsc = req.params.hsc;
    var loc = req.params.loc;
    try
    {
      var connection = mysql.createConnection({
      host:'localhost',
      user:'root',
      password:'',
      database:'bug'
      });
        connection.connect(function(error){
        if(error){
          console.log('Error connecting to database');
          console.log(error);
        }
        else{
          console.log('Database connected');
        }
        });  
        var flag;
        var post = {name : username, lname : lname ,dob : dob,department : depa,per_deg :deg,per_sslc : sslc,per_hsc : hsc,location : loc};
        connection.query('INSERT INTO register SET ?',post,function(err,rows){
        if(err) throw err;
          console.log('Data received from Db:\n');
        });
        var content='First name of the Candidate : '+username +'\n'+'Last Name of the Candidate : '+
        lname+'\n'+'Date of Birth : '+dob+'\n'+'Department : '+depa+'\n'+'Degree of the Candidate : '+
        deg+'\n'+'Sslc Percentage : '+sslc+'\n'+'Hsc Percentage : '+hsc+'\nLocation : '+loc;
        var fs = require('fs');
        var PDFDocument = require('pdfkit');
        var pdf = new PDFDocument({
                size: 'LEGAL', 
                info: {
                    Title: 'Hallticket Copy',
                    Author: 'Bug Bounties',
                }
        });
      pdf.text(content);
      pdf.pipe(
        fs.createWriteStream('file.pdf')
      )
      .on('finish', function () {
          console.log('PDF closed');
      });
      pdf.end();
      response.responseMessage = 'Succesfully Register...';
      response.responseStatus  = 200; 
      res.send(response); 
      
    }
    catch(err) {
          console.log('Server error:', err);
          response.responseMessage = 'Internal server error';
          response.responseStatus  = 500; 
          res.send(response);
      }    
  };
  myRoutes.signup = function(req,res){
      var userdet = {};
      var resp = {};
      console.log("Signup");
      var username = req.params.uname;
      var pass = req.params.pswd;
      var fname = req.params.fname;
      var lname= req.params.lname;
      var phn  = req.params.phn;
      var add = req.params.add;
      try
      {
        var connection = mysql.createConnection({
          host:'localhost',
          user:'root',
          password:'',
          database:'bug'
        });
        connection.connect(function(error){
        if(error){
          console.log('Error connecting to database');
          console.log(error);
        }
        else{
          console.log('Database connected');
        }
        });  
        var flag;
        var post = {fname : fname, lname : lname ,email : username,passwrd : pass,phone_num :phn,address : add};
        connection.query('INSERT INTO signup SET ?',post,function(err,rows){
        if(err) throw err;
          console.log('Data received from Db:\n');
        });   
    // console.log(req.body);
    // console.log(req.query);
    // console.log(req.params);
    }
    catch(err) {
          console.log('Server error:', err);
          response.responseMessage = 'Internal server error';
          response.responseStatus  = 500; 
          res.send(response);
      }    
  };
  //to check login based on parameters
  myRoutes.login = function(req, res){
  var userInfo = {};
  var response = {};
  console.log('Server Connected. . .');
    try
    {
      userInfo.Username = req.params.username;
      console.log("Uname : " + userInfo.Username);
      userInfo.Password = req.params.password;
      console.log("Pswd : " + userInfo.Password);
      var connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'bug'
      });
      //console.log(connection);
      connection.connect(function(error){
        if(error){
          console.log('Error connecting to database');
          console.log(error);
        }
        else{
          console.log('Database connected');
        }
      });
      var flag;
      var logins={
        username:req.params.username,
        password:req.params.password
      };
      connection.query('select email from signup where email=?',logins.username, function (error,result)
      {
        if(error)
        {
          console.error(error);
        }
        else
        {
          if(result.length>0)
          {
            connection.query('select passwrd from signup where passwrd=?',logins.password, function (error,result)
            {
              if(error)
              {
                console.error(error);
              }
              else
              {
                if(result.length>0){
                console.log('Succesfull login');
                response.responseMessage = 'Success';
                response.responseStatus  = 202; 
                res.send(response);
                }
                else{
                  console.log('check password');
                  response.responseMessage = 'Invalid Password';
                  response.responseStatus  = 202; 
                  res.send(response);
                }
              }}
             );
            }
            else{
            console.log('UnSuccesfull Login');
            response.responseMessage = 'UnSuccesfull Login...';
            response.responseStatus  = 200; 
            res.send(response);
            }
          }
        }); 
      }
      catch(err) {
          console.log('Server error:', err);
          response.responseMessage = 'Internal server error';
          response.responseStatus  = 500; 
          res.send(response);
      }
  };
  myRoutes.defaultPage = function(req, res) {
    res.send('Error: 404,Page not found :-(');
  };

  module.exports = myRoutes;