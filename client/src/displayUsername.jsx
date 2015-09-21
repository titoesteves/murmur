var React = require('react');
var url = 'http://0.0.0.0:3000/';

var DisplayUsername = React.createClass({
  
  getInitialState: function() {
    return {
      username: window.sessionStorage.username
    };
  },

  handleUsername: function(){
    this.setState({
      'username': event.target.value
    });
  },

  render: function() {
    return (
      <span id='username' style={{'float':'right', 'color':'white', 'cursor':'pointer', 'font-size': '16px'}}>{window.sessionStorage.username}</span>
    );
  }
});

module.exports = DisplayUsername;


