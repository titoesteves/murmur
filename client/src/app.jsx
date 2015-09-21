var React = require('react');
var Message = require('./message');
var TopBar = require('./topbar');
var InputBox = require('./messageBox');
var LoginSignupModal = require('./loginSignupModal');
var Map = require('./map');
var url = 'http://0.0.0.0:3000/';


// var getCookies = function(){
//   var pairs = document.cookie.split(";");
//   var cookies = {};
//   for (var i=0; i<pairs.length; i++){
//     pairs
//     var pair = pairs[i].trim().split("=");
//     cookies[pair[0]] = unescape(pair[1]);
//   }
//   return cookies;
// }

window.sessionStorage.userId = "Dylan";

// var cookies = getCookies();
// var token = document.token = cookies.token;
// var auth = document.auth = cookies.auth;

var mainView = React.createClass({

  messages: [],
  getInitialState: function(){
    this.getMessages();
    return {
      messages: '',
      sort: 'recent'
    };
  },

  getMessages: function(){
    $.ajax({
      type: 'GET',
      url: url + 'message',
      contentType: 'application/json',
      success: function(messages){
        var messages = JSON.parse(messages);
        var messageRows = [];
        for(var i=0; i<messages.length; i++) {
          var message = messages[i];
          //this is utilizing the message component and setting message properties for use in the message view.
          // baseId={ message.baseId}
          // hairId={ message.hairId}
          messageRows.push(
            <Message
              messageId={ message._id }
              message={ message.message }
              comments={ message.comments }
              totalVotes={ message.totalVotes }
              downVotes={ message.downVotes }
              upVotes={ message.upVotes }
              comments={ message.comments }
              favorites={ message.favorites }
              timestamp={ message.timestamp } />
          );
        }
        // this.setState({messages: "easy"});
        this.setState({messages:messageRows});
      }.bind(this)
    });
  },

  messagesUpdate: function(message) {
    console.log("messageUPDATEEEE", message);
    this.state.messages.push(
      <Message
        messageId={ message._id }
        message={ message.message }
        comments={ message.comments }
        totalVotes={ message.totalVotes }
        downVotes={ message.downVotes }
        upVotes={ message.upVotes }
        comments={ message.comments }
        favorites={ message.favorites }
        timestamp={ message.timestamp } />
    );
    this.setState({messages: this.state.messages});
  },

  // Retrieve the messages data from Firebase
  // componentWillMount: function(){
  //   if(token){
  //     var context = this;
  //     this.firebaseRef = new Firebase('https://resplendent-inferno-6476.firebaseio.com/');
  //     this.firebaseRef.authWithCustomToken(token, function(error, authData){
  //       if(error){
  //         console.log('Problem connecting to Database', error)
  //       } else {
  //         console.log('Connected to Databse')
  //         context.setState({
  //           token: authData.token,
  //           auth: authData.auth,
  //         });
  //       }
  //     })
  //     this.messageRef = this.firebaseRef.child('Fresh Post');
  //     this.messageRef.on('value', function(dataSnapshot){
  //       this.messages.push(dataSnapshot.val());
  //       this.setState({
  //         messages: dataSnapshot.val()
  //       });
  //       console.log('inFreshPost', dataSnapshot.val())
  //     }.bind(this));

  //     this.sessionsRef = this.firebaseRef.child('sessions');
  //     this.sessionsRef.on('value', function(dataSnapshot){
  //       this.messages.push(dataSnapshot.val());
  //       this.setState({
  //         sessions: dataSnapshot.val()
  //       });
  //     // console.log('SESSSSSSSSSSSSSSSSionREF', this.sessionRef.toString())
  //       console.log('inSession', dataSnapshot.val())
  //     }.bind(this));
  //   }
  // },

  handleSortRecent: function(){
    this.setState({sort: 'recent'});
  },
  handleSortPopular: function(){
    this.setState({sort: 'popular'});
  },
  handleFavorites: function(){
    this.setState({sort: 'favorites'});
  },
  handleMyPosts: function(){
    this.setState({sort: 'myPosts'});
  },
  toggleInputBox: function(){
    this.setState({ input: !this.state.input })
  },

  styles: {
    filter: {
      paddingTop: '80px',
      width: '100%',
      textAlign: 'center'
    },
    messageRows: {
      padding: '10px',
      width: '50%',
      height: '100px',
      float: 'left'
    },
    inputBox: {
      marginTop: '200px'
    }
  },
  render: function(){
    return (
      <div>
        <TopBar/>
        <LoginSignupModal/>
        <div>
          <div style={this.styles.filter}>
            <Map />
            <div className="btn-group" style={{display: 'inline-block', right: '300px'}}>
              <button className="btn btn-default" style={{fontFamily: 'Roboto'}} onClick={ this.handleSortRecent }> New </button>
              <button className="btn btn-default" style={{fontFamily: 'Roboto'}} onClick={ this.handleSortPopular }> Hot </button>
              <button className="btn btn-default" style={{fontFamily: 'Roboto'}} onClick={ this.handleFavorites }>Favorites</button>
              <button className="btn btn-default" style={{fontFamily: 'Roboto'}} onClick={ this.handleMyPosts }>My Posts</button>
            </div>
            <InputBox style={this.styles.style} messagesUpdate={this.messagesUpdate} />
          </div>
          <div style={ this.styles.messageRows }>        
            {this.state.messages}
          </div>
        </div>

      </div>
    )
  }
})


var element = React.createElement(mainView);
React.render(element, document.querySelector('.container'));
