var express =require('express')
var router = express.Router()
var arrayofurls = []
var url_key = require('../apikey')
var axios = require('axios')


var queryhistory = []

router.get('/',function(req,res){
	res.render('index')
})

router.get('/queryhistory',function(req,res){
	res.send(queryhistory)
})
router.get('/api/*',function(req,res){
	var query = req.url.substring(5,req.url.length)
	var queriedtimestamp = new Date()

	var offset = req.query.offset
	var googlerequest = url_key+query
	if(offset){
		googlerequest = url_key+query+"&start="+offset*10
	}else{
		googlerequest = url_key+query	
	}

	
	axios.get(googlerequest).then(function(response){
		var items = response.data.items

	var newitems = []
	items.map(function(item){
		newitems.push({
			link:item.link,
			snippet:item.snippet,
			context:item.image.contextLink,
			thumbnail:item.image.thumbnailLink

		})
	})
	queryhistory.push({query:query,time:queriedtimestamp})
	res.send(newitems)
		


	}).catch(function(error){
		res.send(error)
	})

})


module.exports = router