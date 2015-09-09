var React = require('react');
var Message = require('./message');

require("./viewAllMessage.css");

var ViewAllMessages = React.createClass({
  render: function() {
    var messagesObject = this.props.messages;
    var messageRows = [];

    for(messageKey in messagesObject){
      var commentRows = [];
      var message = messagesObject[messageKey];

      messageRows.push(
        <Message
          messageId={ message.messageId }
          key={ message.messageId }
          message={ message.message }
          comments={ message.comments }
          votes={ message.votes }
          messageId={ message.messageId }
          timestamp={ message.timestamp }/>
      )
    }
<<<<<<< HEAD
    var messageRowsSortedOptions = {
      recent: messageRows.slice().sort(function(a,b){
        return b.props.timestamp - a.props.timestamp;
      }),
      popular: messageRows.slice().sort(function(a,b){
        return b.props.votes - a.props.votes;
      }),
    }
    return (
      <div style={ this.styles.messageRows }>
        { messageRowsSortedOptions[this.props.sortBy] }
      </div>
=======
    return (
          <div style={this.styles.messageRows}>
            { messageRows }
          </div>
>>>>>>> [feat] update to voteMessage
    )
  },
  styles: {
    messageRows: {
<<<<<<< HEAD
      padding: '10px',
=======
      padding: '60px',
>>>>>>> [feat] update to voteMessage
    },
  },
});

module.exports = ViewAllMessages;
