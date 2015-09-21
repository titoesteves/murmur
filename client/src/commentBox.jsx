var React = require('react/addons');
var url = 'http://0.0.0.0:3000/';

var commentBox = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState: function() {
    return {
      comment: ''
    };
  },

  handleSubmit: function(event) {
    event.preventDefault(); //prevent the form from actually submitting.
    this.setState({comment: ''});
    console.log("comment submitted!", this.props.messageId);
    $.ajax({
      type: 'POST',
      url: url + "comment",
      contentType: 'application/json',
      data: JSON.stringify({
        //maybe the userId and username are set on the server side..
        "userId": window.sessionStorage.userId, //this needs to be set by the session.
        "username": window.sessionStorage.username, //this needs to be set by the session.
        "messageId": this.props.messageId,
        "comment": this.state.comment
      }),
      success: function(data, err){
        console.log('POST successful: ', data);
        this.props.commentsUpdate(data);
      }.bind(this)
    });
  },

  // two-way binding commentBox's value and this.state.comment
  render: function() {
    return (
      <div className="input-group" style = {{padding: '15px'}}>
        <form onSubmit={this.handleSubmit} className="clearfix">
          <input type="text" valueLink={this.linkState('comment')} className="form-control" placeholder="Enter your comment here" />
          <span className="input-group-btn">
            <input type="submit" className="btn btn-success"> Submit </input>
          </span>
        </form>
      </div>
    )
  }
});

module.exports = commentBox;
