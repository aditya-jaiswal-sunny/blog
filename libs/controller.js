module.exports = app => {

  // Imports
  const Post = require('../models/Post');
  const User = require('../models/user');

app.get('/', (req, res) => {
    Post.find({}).then(posts => {
      res.render('index', {posts});
    })
  })
  app.get('/signup', function (req, res, next) {
  return res.render('signup.ejs');
});
  app.post('/signup', function(req, res, next) {
  console.log(req.body);
  var personInfo = req.body;


  if(!personInfo.email || !personInfo.username || !personInfo.password || !personInfo.passwordConf){
    res.send();
  } else {
    if (personInfo.password == personInfo.passwordConf) {

      User.findOne({email:personInfo.email},function(err,data){
        if(!data){
          User.findOne({},function(err,data){
            var newPerson = new User({
              email:personInfo.email,
              username: personInfo.username,
              password: personInfo.password,
              passwordConf: personInfo.passwordConf
            });

            newPerson.save(function(err, Person){
              if(err)
                console.log(err);
              else
                console.log('Success');
            });

          });
          res.send({"Success":"You are regestered,You can login now."});
        }else{
          res.send({"Success":"Email is already used."});
        }

      });
    }else{
      res.send({"Success":"password is not matched"});
    }
  }
});

app.get('/login', function (req, res, next) {
  return res.render('login.ejs');
});

app.post('/login', function (req, res, next) {
  User.findOne({email:req.body.email},function(err,data){
    if(data){
      
      if(data.password==req.body.password){
        res.send({"Success":"Success!"});        
      }else{
        res.send({"Success":"Wrong password!"});
      }
    }else{
      res.send({"Success":"This Email Is not registered!"});
    }
  });
});

  app.get('/write', (req, res) => res.render('write'));

  app.get('/article/:title', (req, res) => {
    let title = req.params.title;
    Post.findOne({title: title}).then(post => {
      res.render('article', {post});
    }).catch(err => console.log('Error getting the article'));

  });

app.post('/create', (req, res) => {

            let post = new Post({ title: req.body.title, content: req.body.content, creator: req.body.name })
            post.save().then(() => {
              console.log('Post Saved!');
              res.redirect('/');
            }).catch(err => console.log(err));
        } // Finish mimetype statement
     // Finish all

)
} // Finish module
