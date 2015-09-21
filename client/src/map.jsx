var React = require('react');
var url = 'http://0.0.0.0:3000/';
var message = "<p>Hi this is a message popUp</p>"
var arr = [{messages: 'Hi', lat: 37.77493, lng: -122.41942}, {messages: 'Hello', lat: 37.423021, lng: -122.083739}];
var Message = require('./message.jsx');
var messages;

module.exports = React.createClass({
    componentDidMount: function(){
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
                      message={ message.message } 
                      latitude={ message.latitude }
                      longitude={ message.longitude } />
                  );
                }
                // this.setState({messages: "easy"});
                this.setState({messages:messageRows});
            }.bind(this)
        });
    },
    showMap: function(position){
        localStorage.setItem('latitude', position.coords.latitude);
        localStorage.setItem('longitude', position.coords.longitude);
        var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/'; 
        var mapOptions = {
                center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                zoom: 20
            },
            map = new google.maps.Map(this.getDOMNode(), mapOptions);

        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude), 
            map: map, 
            title: "Where you're at", 
            icon: new google.maps.MarkerImage(iconBase + 'man.png', null, null, null, new google.maps.Size(40, 40)) 
        });

        marker.addListener('click', function(){
            map.setZoom(30);
            map.setCenter(marker.getPosition());
        });
        map.addListener('click', function(){
            map.setZoom(20);
            map.setCenter(marker.getPosition());
        });

        function addInfoWindow(marker, message) {
            var infoWindow = new google.maps.InfoWindow({
                content: message
            });
            marker.addListener('mouseover', function () {
                infoWindow.open(map, marker);
            });
            marker.addListener('mouseout', function () {
                infoWindow.close(map, marker);
            });
        }

        for(var i = 0; i < this.state.messages.length; i++){
            var Newmarker = new google.maps.Marker({       
                position: new google.maps.LatLng(this.state.messages[i]._store.props.latitude, this.state.messages[i]._store.props.longitude), 
                map: map,
                icon: new google.maps.MarkerImage("http://icons.iconarchive.com/icons/custom-icon-design/mono-general-1/512/chat-icon.png", null, null, null, new google.maps.Size(40, 40))     
            }); 
            addInfoWindow(Newmarker, this.state.messages[i]._store.props.message);

        }

    },
    getLocation: function(){
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(this.showMap);
        }
        else{
            alert("Geolocation is not supported by this browser.");
        }
    },
    render: function () {
        this.getLocation();
        return (
            <div className='map-gic'></div>
        );
    }
});
