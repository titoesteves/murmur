var React = require('react');
var moment = require('moment');
var Face = require('./face');

var url = 'http://107.170.240.99:4000/';

module.exports = React.createClass({
  getInitialState: function() {
    return {
      commentBox: 'false',
    }
  },
  upVote: function(event){

    $.ajax({
      type: 'POST',
      url: url + 'voteComment' ,
      contentType: 'application/json',
      data: JSON.stringify({
        "messageId": this.props.messageId,
        "commentId": this.props.commentId,
        "vote": true,
        "token": this.props.token,
      }),
      success: function(){
      }
    })
  },
  downVote: function(event){

    $.ajax({
      type: 'POST',
      url: url + 'voteComment' ,
      contentType: 'application/json',
      data: JSON.stringify({
        "messageId": this.props.messageId,
        "commentId": this.props.commentId,
        "vote": false,
        "token": this.props.token,
      }),
      success: function(){
      }
    })
  },
  render: function() {
    return (
      <div id={ this.props.commentId } key={ this.props.commentId }>
        <div className="conatiner" style={{float: 'left', clear: 'both', marginBottom: '5px'}}>
          <div style={ this.styles.commentContainer }>
            <span style={{float: "left"}}>
              <Face baseId={ this.props.baseId } hairId={ this.props.hairId } key={ this.props.commentId }/>
            </span>
            <span style={{float: "left"}}>
              <p style={{fontFamily: 'Roboto', color: 'black', fontSize: '1em'}}>
                { this.props.commentMessage }
              </p>
              <span style={{fontStyle: "italic", fontSize: '.8em', float: "left"}}>
                ({ moment(this.props.commentTimestamp).fromNow() })
              </span>
            </span>
          </div>
        </div>
        <div style={ this.styles.voteContainer }>
          <img src="./src/img/glyphicons-601-chevron-up.png" style={ this.styles.arrows } alt="Up Vote" onClick={ this.upVote }/>
            <span className="count"  style={ this.styles.voteCount }> { this.props.commentVotes } </span>
          <img src="./src/img/glyphicons-602-chevron-down.png" style={ this.styles.arrows } alt="Down Vote" onClick={ this.downVote }/>
        </div>
      </div>
    )
  },
  styles: {
    timestamp: {
      float: "left",
      marginLeft: '10px',
      position: 'relative',
      top: '1.5px'
    },
    votes: {
      float: "right",
      fontSize: "19px"
    },
    writeButton: {
      float: "left",
      position: "relative",
      top: "4px"
    },
    arrows: {
      float: "right"
    },
    iconStyle: {
      marginLeft: "10px",
      marginRight: "10px",
    },
    voteContainer: {
      width: "20px",
      float: "right"
    },
    voteCount: {
      margin: 'auto',
      fontSize: '1.3em'
    }
  }
});