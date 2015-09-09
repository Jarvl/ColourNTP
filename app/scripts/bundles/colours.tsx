///<reference path='../types/chrome.d.ts' />
///<reference path='../types/react.d.ts' />

import React = require('react');

import ChromeStorage = require('../modules/chromestorage');

import Time = require('../components/colour/time');

new ChromeStorage().getSettings(function (results) {
    React.render(
    	<div className='colours'>
	    	<Time hourFormat24={true} />
	    </div>, 
	    document.getElementById('colours'));
});
