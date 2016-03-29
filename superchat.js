if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('Im', 'anonymous');
  Session.setDefault('chatto', 'anonymous');
  Session.setDefault('phone', '');
  Session.setDefault('ava', '');
  Session.setDefault('profile', '');
  Session.setDefault('mobile', 'mfalse');
  Session.setDefault('seed', 0);
  Session.setDefault('searchfield', '');
  //___________ for touch vars_____________
  Session.setDefault("startX", 0);
  Session.setDefault("startY", 0);


  Template.chat.rendered = function(){
    var objDiv = document.getElementById("chat");
    objDiv.scrollTop = objDiv.scrollHeight;
    callshe(); //// она в основном коде
  };

  Template.main.events({
    "mousedown": function(event, template){
      //seeSwipe('down', event);
    },
    "mouseup": function(event, template){
      //alert(seeSwipe('up', event));
    }
  });
  //BlazeLayout.render('hello', { now: ["one", "two"][Session.get('counter')] });

  Template.newmes.rendered = function(){
    $("#chat").scrollTop($("#chat")[0].scrollHeight);
  }

}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log( Meteor.default_server.stream_server.open_sockets.length );
    // if(She.find().fetch() === []){
    //   console.log('she words is empty');
    //   for(var n in shespeak){
    //     She.insert(shespeak[n]);
    //   }
    // }
    if(Users.find().fetch() === []){
      console.log('no users - create she');
      Users.insert({
        username: "Она",
        phone: "89164835827",
        about: "немножко странная",
        ava: "/she.png"
      });
    }
  });
  Meteor.onConnection(function(client){
    Meteor.call('connect', client.id, client.clientAddress, client.httpHeaders );
    client.onClose(function(){
      Meteor.call('disconnect', client.id, client.clientAddress );
    })
  })
}

if (Meteor.isCordova) {
  console.log("Printed only in mobile cordova apps");
}
