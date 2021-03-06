Service({
  name: 'Heroku App operations',
  url: 'https://status.heroku.com/api/v3/current-status',
  dataType: "json",
  status: function(response) {
    return response["status"]["Production"].toLowerCase() == "green";
  }
});

Service({
  name: 'Heroku Tools',
  url: 'https://status.heroku.com/api/v3/current-status',
  dataType: "json",
  status: function(response) {
    return response["status"]["Development"].toLowerCase() == "green";
  }
});

Service({
  name: 'EC2 N.Virginia',
  url: 'http://status.aws.amazon.com/',
  status: function(response) {
    td = $(response).find('.yui-content table tr:nth(5) td:nth(2)');
    var text = td.text();
    return (text == "Service is operating normally." || text.match(/(RESOLVED)/).length > 0);
  }
});

Service({
  name: 'MongoHQ Rose',
  url: 'http://status.mongohq.com/api/v1/services/rose/events',
  status: function(response) {
    var parsed_response = JSON.parse(response)["events"];

    if( parsed_response.length !== 0 ){
      var level =  parsed_response[0]["status"]["level"];
      return level == "NORMAL" || level == "INFO";
    }
    return true;
  }
});

Service({
  name: 'Pusher',
  url: 'http://status.pusherapp.com/',
  status: function(response) {
    return $(response).find('#answer').hasClass('up');
  }
});

Service({
  name: 'Rackspace Email',
  url: 'http://status.apps.rackspace.com',
  timeout: 7500,
  status: function(response) {
    return $(response).find('#current #current-group-3 .field-group-message').text().match(/normally/).length > 0;
  }
});

Service({
  name: 'Github',
  url: 'https://status.github.com/api/status.json',
  dataType: "json",
  status: function(response) {
    return response["status"] == "good";
  }
});

Service({
  name: 'CloudMailin',
  url: 'http://cloudmailin-status.herokuapp.com/',
  status: function(response) {
    var status = response["status"];
    return  (status == "up" || status == "reduced_capacity");
  }
});

// http://tubeupdates.com/documentation/
Service({
  name: 'Jubilee Line',
  url: "http://api.tubeupdates.com/?method=get.status&lines=jubilee",
  status: function(response) {
    var status = response["response"]["lines"][0]["status"];
    return status == "good service";
  }
});

Service({
  name: 'Exceptional',
  url: 'http://status.getexceptional.com/',
  status: function(response) {
    return $(response).find("#Currently strong").first().html() < 5000;
  }
});

Service({
  name: 'Twilio',
  url: 'http://status.twilio.com',
  status: function(response) {
    $(response).find(".status.highlight .sym").map(function(idx, img){
      if( !$(img).attr("src").match(/tick/) ){
        return false;
      }
    });
    return true;
  }
});

Service({
  name: 'Plex',
  url: 'http://your.plex.server:32400',
  dataType: "xml",
  status: function(response) {
    return $(response).find('MediaContainer').size() > 0;
  }
});

Service({
  name: 'SickBeard',
  url: 'https://your.sickbeard.server/api/your-api-key/?cmd=sb.ping',
  dataType: "jsonp",
  status: function(response) {  
    return response["result"].toLowerCase() == "success";
  }
});

Service({
  name: 'Couch Potato',
  url: 'https://your.couchpotato.server/api/your-api-key/app.available',
  dataType: "jsonp",
  jsonp: 'callback_func',
  status: function(response) {
    return response["success"];
  }
});

Service({
  name: 'SABnzbd',
  url: 'https://your.sabnzbd.server/sabnzbd/api?mode=qstatus&output=json&apikey=your-api-key',
  dataType: "jsonp",
  status: function(response) {
    return response["state"] != '';
  }
});


