var React = require('react');
var Message = require('./message');
var url = 'http://0.0.0.0:3000/';


var ViewAllMessages = React.createClass({

  getInitialState: function() {
    this.getMessages();
    return {
      messages:'' //the messages are initially empty, set later by the call to the messages json file.
    }
  },

  // componentDidMount: function() {
  //   console.log("easy");
  //   console.log("in messages");
  //   $.ajax({
  //     type: 'GET',
  //     url: url + 'message',
  //     contentType: 'application/json',
  //     success: function(messages){
  //       var messages = JSON.parse(messages);
  //       console.log(messages);
  //       var messageRows = [];
  //       console.log("mrow1", messageRows);
  //       for(var i=0; i<messages.length; i++) {
  //         var message = messages[i];
  //         console.log(messages[i]);
  //         //this is utilizing the message component and setting message properties for use in the message view.
  //         // baseId={ message.baseId}
  //         // hairId={ message.hairId}
  //         messageRows.push(
  //           <Message
  //             message={ message.message } 
  //             comments={ message.comments } />
  //         );
  //       }
  //       console.log(messageRows);
  //       // this.setState({messages: "easy"});
  //       this.setState({messages:messageRows});
  //     }.bind(this)
  //   });
  // },
  
 

  


  render: function() {

    //fetch the messages from the db. They get set to messages state to be displayed.

    // Push messages from Firebase to messageRows
    

    // Sort Messages by time or popularity (ie number of votes)
    

  },

});

module.exports = ViewAllMessages;
