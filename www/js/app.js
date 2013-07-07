
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

define(function(require) {
	// Zepto provides nice js and DOM methods (very similar to jQuery,
	// and a lot smaller):
	// http://zeptojs.com/
	var $ = require('zepto');

	// Need to verify receipts? This library is included by default.
	// https://github.com/mozilla/receiptverifier
	require('receiptverifier');

	// Want to install the app locally? This library hooks up the
	// installation button. See <button class="install-btn"> in
	// index.html
	require('./install-button');

	var svgns = "http://www.w3.org/2000/svg";

	function log(msg) {
		var w = $('#logwindow');
		w.removeClass("hidden");
		var item = $('#log');
		item.append(msg+"<br/>");
		item[0].scrollTop = item[0].scrollHeight;
	}

	function subtitle(text) {
		$('#subtitles').animate({opacity:0}, 'fast', 'linear',
				function() {
					$(this)
						.html(text)
						.animate( {opacity:1}, 'fast', 'linear')
						;
				});
	}

	/// For every .loadsvg, loads SVG file specified by the 'src' attribute
	function loadsvgs()
	{
		$.each($(".loadsvg"), function() {
			xhr = new XMLHttpRequest();
			xhr.open("GET",$(this).attr('src'),false);
			// Following line is just to be on the safe side;
			// not needed if your server delivers SVG with correct MIME type
			xhr.overrideMimeType("image/svg+xml");
			xhr.send("");
			$(this).prepend(
				xhr.responseXML.documentElement);
		});
	}

	function faceitsvg()
	{
		var container = $(document).find("#faceit")[0];
		// For object and embed
		if (container.contentDocument)
			return container.contentDocument;


		return $(container).contents();
		// Old browsers have getSVGDocument instead
		try { return container.getSVGDocument(); }
		catch(e) {}
		alert("inline");
		// Inline svg
		return $(container).children()[0];
	}

	function svgNew(elementType)
	{
		svg = faceitsvg();
		try {
			return svg.createElementNS(svgns, elementType);
		}
		catch(e) {
			// When svg is inline, no svg document, use the html document
			return document.createElementNS(svgns, elementType);
		}
	}

	function encodePath(path) {
		return path.map(function(e) {
			if ($.isArray(e)) return e.join(",");
			return e;
			}).join(" ");
		}

	function eyelidsPath(upper, lower) {
		return encodePath([
				"m 46.136643,811.69504 "+
				"c "+
				"0,0 "+
				"7.017614,-26.97479 "+
				"27.2598,-27.60075 "+
				"18.191563,-0.56254 "+
				"31.520667,21.65665 "+
				"31.520667,21.65665 "+
				"0,0 "+
				"-12.548636,20.47409 "+
				"-28.399553,21.13455 "+
				"-15.850926,1.32092 "+
				"-30.380914,-15.19045 "+
				"-30.380914,-15.19045 "+
				"z",
				"m",
				"0.660444,0 ",
				"c",
				[0,0 ],
				[9.362174,4.79914+lower ],
				[25.873535,5.45959+lower ],

				[16.511362,0.66045 ],
				[32.246468,-11.40369-lower ],
				[32.246468,-11.40369-lower ],

				[0,0 ],
				[-15.349074,-18.26053+upper ],
				[-31.199982,-18.26053+upper ],

				[-11.227737,0 ],
				[-26.920021,24.20463-upper ],
				[-26.920021,24.20463-upper ],
				"z"
				]);
		}

	function parpelles(upper, lower) {
		var svg = faceitsvg();
		var eyelid = $(svg).find('#eyelid_r');
		var blinkanimation = $(eyelid).find("#blinkanimation")[0];
		if (blinkanimation !== undefined)
			blinkanimation.endElement();
		$(eyelid).attr("d", eyelidsPath(upper, lower));
	}

	function blink() {
		var svg = faceitsvg();
		var lids = $(svg).find("#eyelid_r");
		var current = lids.attr("d");
		var blinkanimation = $(lids).find("#blinkanimation")[0];
		if (blinkanimation === undefined)
		{
			blinkanimation = svgNew("animate");
			$(blinkanimation).attr({
				'attributeName': 'd',
				'id': 'blinkanimation',
				'begin': 'indefinite',
				'dur': '0.2s',
				'fill': 'remove',
				});
			$(lids).append(blinkanimation);
		}
		$(blinkanimation).attr('values', [
			current, eyelidsPath(30,0), current].join(";")
			);
		blinkanimation.beginElement();
		nextBlink = Math.random()*3000+400;
		window.setTimeout(blink, nextBlink);
	}

	function glance()
	{
		var svg = faceitsvg();
		var eyes = $(svg).find("#pupilas");
		var eyesanimation = $(eyes).find("#eyesanimation")[0];
		if (eyesanimation === undefined)
		{
			eyesanimation = svgNew("animateMotion");
			$(eyesanimation).attr({
				'id': 'eyesanimation',
				'calcMode' : 'linear',
				'begin': 'indefinite',
				'dur': '0.1s',
				'fill': 'freeze',
				});
			$(eyes).append(eyesanimation);
		}
		x = Math.random()*15-7;
		y = Math.random()*10-5;
		$(eyesanimation).attr('path', "M 0,0 "+ [x,y].join(","));
		eyesanimation.beginElement();
		nextGlance = Math.random()*1000+4000;
		window.setTimeout(glance, nextGlance);
	}

	function mouthPath(openness)
	{
		return encodePath([
			"M",
			[173.28125, 249.5],
			"L",
			[71.5625, 250.8125],
			"C",
			[81.799543, 251.14273],
			[103.83158, 253.0+openness],
			[121.25, 253.0+openness],
			"C",
			[138.66843, 253.0+openness],
			[160.7326, 251.48139],
			[173.28125, 249.5],
			"z"
		]);
	}
	function rebla()
	{
//		log("rebla");
		blaaudio = $("#blaaudio");
		blaaudio[0].pause();
		blaaudio[0].currentTime=0;
		blaaudio[0].play();
	}
	function bla() {
		sillabes = Math.floor(Math.random()*4)+1;
		var svg = faceitsvg();
		var mouth = $(svg).find("#mouth");
		var blaanimation = $(mouth).find("#blaanimation")[0];
		if (blaanimation === undefined)
		{
			blaanimation = svgNew("animate");
			$(blaanimation).attr({
				'attributeName': 'd',
				'id': 'blaanimation',
				'begin': 'indefinite',
				'dur': '0.6s',
				'fill': 'freeze',
				});
			$(mouth).append(blaanimation);
		}
		sillabe = [
			mouthPath(0),
			mouthPath(10),
			mouthPath(0),
			].join(";");
		wordseconds = (sillabes+1)*0.3;
		$(blaanimation)
			.off()
			.attr('values', sillabe)
			.attr('dur', 0.3)
			.attr('repeatCount', sillabes)
//			.on('repeat', rebla) // Not workin on webkit 537.36
			;
//		log(Array(sillabes+1).join("bla"));
		subtitle(Array(sillabes).join("bla-")+'bla');
		blaanimation.beginElement();
		rebla();
		// Hack instead of onrepeat to trigger the sillabes
		for (var i=1; i<sillabes; i++)
			window.setTimeout(rebla, i*0.3*1000);
		// Next bla word
		nextBla = Math.random()*2000+wordseconds*1000;
		window.setTimeout(bla, nextBla);
	}

	// Write your app here.
	var upperlid = 8;
	var lowerlid = 8;
	loadsvgs();
	$(document).ready(function(){
		glance();
		blink();
		bla();
		$('#lowerlid').on('change', function(e) {
			var temp = parseFloat($(this).val());
			if (! isNaN(temp)) lowerlid = temp;
			parpelles(upperlid,lowerlid);
			});
		$('#upperlid').change(function(e) {
			var temp = parseFloat($(this).val());
			if (! isNaN(temp)) upperlid = temp;
			parpelles(upperlid,lowerlid);
			});

		$('#sleep').click(function() {
			var svg = faceitsvg();
			parpelles(18,0);
			});

		$('#awake').click(function() {
			var svg = faceitsvg();
			parpelles(0,3);
			});

		$("#mute").click(function() {
			blaaudio = $('#blaaudio')[0];
			blaaudio.muted= ! blaaudio.muted;
			$('#mute').checked=blaaudio.muted;
			});
		$("#logclear").click(function() {
			$('#logwindow').addClass("hidden");
			$('#log').empty();
			});
		$("#showlog").click(function() {
			$('#logwindow').removeClass("hidden");
			});
		
	});







});

