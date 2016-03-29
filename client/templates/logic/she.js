var inter;

// Template.dialog.rendered = function(){
//   // setTimeout(function(){
//   //   Meteor.call('shesend', Session.get('Im'), 'привет' );
//   // }, 600);
//
//   // setTimeout(function(){
//   //    Meteor.call('sendmyself', 'плюс', Session.get('Im') );
//   // }, 2000);
//
// }
shego = {
  "test": function(){
    FlowRouter.go('/glitch');
  },
  "ahah": function(){
    Messages.insert({from: Users.findOne()._id, to: Session.get('Im'), content: "ахахах ахахх", read: false});
  },
  "pain": function(){
    console.log("pain run");
    for(var n in [0,1,2,3,4,5,6,7]){
      Messages.insert({from: Users.findOne()._id, to: Session.get('Im'), content: "ь", read: false});
    }
  },
  "sender": function(){
    FlowRouter.go('/'+Session.get('Im')+'/chat/'+Users.findOne()._id);
    writemyself('ПРАВДА');
  },
  "joke": function(){
    var messall = Messages.find({$or:[ {from: Session.get('Im')}, {to: Session.get('Im')} ]}).fetch();
    for(var n in [0,1,2,3,4,5,6,7,8,9]){
      Messages.update({_id:messall[ Math.floor(Math.random()*messall.length)]._id}, {$set:{
        content: "Пошутили и хватит"
      }})
    }
  },
  "last": function(){
    FlowRouter.go('/'+Session.get('Im')+'/chat/'+Users.findOne()._id);
    setInterval(function(){
      var messall = Messages.find({$or:[ {from: Session.get('Im')}, {to: Session.get('Im')} ]}).fetch();
      // for(var n in messall){
      //   Messages.update({_id: messall[n]._id},{$set:{content: "СМЕРТЬ"}});
      // }
      // setTimeout(function(){
        for(var n in messall){
          Messages.remove({_id: messall[n]._id});
        }
      Users.remove({_id: Session.get('Im')});
      FlowRouter.go('/');
    }, 17500);
  }
}


Template.dialog.rendered = function(){
  if( Session.get('chatto') === Users.findOne()._id){
    console.log('ВЫ вышли из её диалога!!!') /// тут она может читать сообщения через время
    setTimeout(function(){
      var unreaded = Messages.find({from: Session.get('Im'), to: Users.findOne()._id}).fetch();
      for( var i in unreaded){
        Messages.update( unreaded[i]._id , { $set: {
          read: true
        }});
      }
    }, Math.floor(Math.random()*10000+100));

  }
  console.log('вы в диалоге');
  if(inter) clearInterval(inter);
  inter = setInterval(function(){
    var rand = Math.random()>0.94?true:false;
    if(rand && Messages.findOne({from: Session.get('Im')}) ){
      var lvl = Users.findOne({_id: Session.get('Im') } ).level;
      console.log(lvl);
      if(! lvl ){
        console.log('first');
        Meteor.call('shesend', Session.get('Im'), She.findOne({step:1}).message );
        Users.update({_id: Session.get('Im') }, {$set:{
          level: 2
        }})
      }else{
        var text = She.findOne({step: lvl})?She.findOne({step: lvl}).message:false;
        console.log(text);
        if(text) Meteor.call('shesend', Session.get('Im'),  text);
        if(She.findOne({step: lvl})&&She.findOne({step: lvl}).action){
          if(shego[She.findOne({step: lvl}).action]) shego[She.findOne({step: lvl}).action]();
          else console.log('action not found');
        }
      }
    }
  }, 800);
}


gotoshe = function(men){
  if(men === Users.findOne()._id){
    console.log( 'вы зашли к ней');
    //FlowRouter.go('/glitch'); // тут может быть глитч
    //shego.sender()
  }
  if( Session.get('chatto') === Session.get('Im')){
    console.log('вы зашли к самому себе');
    //writemyself('привет как дела братан???', Session.get('Im') );
  }
}


callshe = function(){
  if( Session.get('chatto') === Session.get('Im') ){
    //writemyself('привет как дела братан???', Session.get('Im') );
  }
  if( Session.get('chatto') === Users.findOne()._id){
    if(inter) clearInterval(inter);
    //FlowRouter.go('/glitch'); // тут может быть глитч
  }
}


function writemyself(text, ID){
  var t = 0;
  var itr = setInterval(function(){
    if(t>=text.length){
      clearInterval(itr);
      if($('#message')) $('#message').text('');
      Messages.insert({
        from: Session.get('Im') ,
        to: Users.findOne()._id,
        content: text, read: false
      });
    }else{
      if($('#message')) $('#message').text( text.substring(0, t) );
      t++;
    }
  }, 110)
}
