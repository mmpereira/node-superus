/**
 * Get data use static data only for tests
 */

var xml2object= require('xml2object');
var request = require('request');

var feeds=[
    {
        id:1,
        weight:1,
        type:"rss",
        name:"Enerzine",
        url:"http://www.enerzine.com/rss2news.xml"
    },
    {
        id:2,
        weight:1,
        type:"rss",
        name:"MAKE Magazine",
        url:"http://blog.makezine.com/index.xml"
    },
    {
        id:3,
        weight:1,
        type:"rss",
        name:"OWNI.fr",
        url:"http://owni.fr/feed/"
    },
    {
        id:4,
        weight:1,
        name:"Infosud.ORG",
        type:"rss",
        url:"http://www.infosud.org/spip.php?page=backend"
    },
    {
        id:5,
        weight:1,
        name:"Le hunffington post",
        type:"feed",
        url:"http://www.huffingtonpost.com/feeds/verticals/france/news.xml"
    },
    {
    		id:6,
    		weight:1,
    		name:"Sur les épaules de Darwin",
    		type:"rss",
    		url:"http://radiofrance-podcast.net/podcast09/rss_11549.xml"
    }
];


exports.findStreamById = function(id, cb){
		
		var parser = new xml2object([feeds[id-1].type]);


		// Bind to the object event to work with the objects found in the XML file
		parser.on('object', function(name, post) {
				//console.log(JSON.stringify(post));
				cb(post);
		});

		// Bind to the file end event to tell when the file is done being streamed
		parser.on('end', function(name, obj) {
				//console.log('Finished parsing xml!');
		});

		// Pipe a request into the parser
		request.get(feeds[id-1].url).pipe(parser.saxStream);


    return ;
};


exports.findFeedById = function(id, cb){
    return cb(feeds[id-1]);
};


exports.findFeedByName = function(name, cb){
    for (var id in feeds){
        if(feeds[id].name.toLowerCase().indexOf(name.toLowerCase())>-1)
            cb(feeds[id]);
    }
    return;
};

exports.findAllFeedByName = function(name, cb){
    var ls=[];
    for (var id in feeds){
        if(feeds[id].name.toLowerCase().indexOf(name.toLowerCase())>-1)
            ls.push(feeds[id]);
    }
    
    return cb({feeds:ls,count:ls.length});
};
