var Firebase = require('firebase');
var myDataRef = new Firebase('https://fiery-heat-3376.firebaseio.com/');
var freshPost = myDataRef.child('Fresh Post');

//this function keeps a updates the comment total, whenever a 
//comment is added
var updateCommentTotal = function(messageId, commentId){

  var commentTotal = freshPost.child(messageId + '/totalComments');
  commentTotal.transaction(function (value){
    if(commentId){
      return value + 1
    }
  })
}

var updateVoteTotal = function(messageId, voteDirection){
  
  var vote = freshPost.child(messageId + '/votes');
  vote.transaction(function (value){ 
    //each voteDirection is sent in as either true or false
    if (voteDirection === 'true'){       
      return value + 1;              
    }
    else {
      return value - 1;
    }
  });
}

//this function serves two purposes
//the first being that it updates the sessID of each voter in our
//DB, then updates our vote counter based off of their voteDirection
var updateVoterIDs = function(sessId, voteDirection, voterId, messageId){
  var setVoterId = {};
  setVoterId[sessId] = voteDirection;
  //use update instead of set because set will erase the
  //already stored voterIds with this current ID
  voterId.update(setVoterId);
  updateVoteTotal(messageId, voteDirection);
}

exports.insertPost = function(request, callback){
  var postMessage = request.message;
  
  if(postMessage !== {}){
    var post = freshPost.push();  //ID generator
    var postId = post.key();      //Grabs the ID
    post.set({                    //Pushes the post data into the database
      messageId : postId,
      message : postMessage,
      timestamp : Firebase.ServerValue.TIMESTAMP,
      comments : "no comments",
      totalComments: 0,
      voterId: "no voters yet",
      votes : 0,
    });

    callback(201);
  }
  else{
    callback(404);
  }
}

//this function is used to add comments to their
//respective message
exports.comment = function(request, callback){
  var messageId = request.messageId;      //The post/message ID where the comment resides
  var commentMessage = request.comment;
  var comments = freshPost.child(messageId + '/comments');
  var comment = comments.push();  //ID generator
  var commentId = comment.key();  //Grabs the ID
  
  comment.set({                   //Pushes the comment data into the post/message
    commentId : commentId,
    comment : commentMessage,
    timestamp : Firebase.ServerValue.TIMESTAMP,
    voterId: "no voters yet",
    votes : 0,
  })

  updateCommentTotal(messageId, commentId);
  callback(201);
}

//this function checks to see whether or not our voter has already 
//voted. If they haven't, they are added to our voterId store and 
//the vote total is updated
//if they have voted before, it checks to see if this new vote is 
//different from the last vote. Their voteDirection and the vote
//total will only be updated if the voteDirection is different

exports.votePost = function(requestBody, callback){

  var sessId = requestBody.sessionID;
  var messageId = requestBody.messageId;
  var voteDirection = requestBody.vote;
  var messageTable = freshPost.child(messageId);
  //if the vote request comes with a commentId then we know that its
  //vote on a comment not a message
  var commentId = (requestBody.commentId) ? requestBody.commentId: undefined;
  var voterId = (!commentId) ? freshPost.child(messageId + '/voterId'):
                freshPost.child(messageId + '/comments' + commentId+ '/voterId')


  voterId.once('value', function(snap){
    if(!snap.hasChild(sessId)){
      updateVoterIDs(sessId, voteDirection, voterId, messageId);
    }
    else {
      snap.forEach(function(voter){
        if(voter.key() === sessId){
          if(voter.val() !== voteDirection){
            updateVoterIDs(sessId, voteDirection, voterId, messageId);
          }
        }
      })
    }

  });

  callback(201);
}

//this function is used to check is the session ID already exists in our DB
//Up to you to chose how you want to implement it
exports.checkSessionId = function(sessId, cb){
  //if sessionId is in our storage, return true
  //else return false
  sessionStorage.child(sessId).once('value', function(snapshot){
    if(snapshot.val() === null){
      return false;
    }
    return true;
  })
}