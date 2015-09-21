var React = require('react');
var moment = require('moment');

var Face = require('./face.jsx');

var url = 'http://0.0.0.0:3000/';

module.exports = React.createClass({
  getInitialState: function() {
    console.log("loading message!");
    return {
      commentBox: 'false'
    }
  },
  render: function() {
    return (
      <div id={ this.props.commentId } key={this.props.commentId} >
        <div className="conatiner" style={{float: 'left', clear: 'both', marginBottom: '5px'}}>
          <div style={ this.styles.commentContainer }>
            <span style={{float: "left"}}>
              
            </span>
            <span style={{float: "left"}}>
              <p style={{fontFamily: 'Alegreya', color: 'black', fontSize: '1em'}}>
                { this.props.comment }
              </p>
              <span style={{fontFamily: 'Alegreya', fontStyle: "italic", fontSize: '.8em', float: "left"}}>
                ({ moment(this.props.timestamp).fromNow() })
              </span>
            </span>
          </div>
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
      fontSize: "19px",
      textAlign: 'center'
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
    }
  }
});
