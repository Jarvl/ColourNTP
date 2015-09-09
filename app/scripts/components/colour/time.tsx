///<reference path='../../types/react.d.ts' />

import React = require('react');


interface IProps {
    hourFormat24: boolean;
}

interface IState {
    hour   : string;
    minute : string;
    second : string;
}

class Time extends React.Component<IProps, IState> {
    private interval;

    constructor (props) {
        super(props);

        let nowDate = new Date(),
            hour    = nowDate.getHours();

        if (!this.props.hourFormat24 && hour >= 12) {
            hour -= 12;     
        }

        this.state = {
            hour   : this.pad(hour),
            minute : this.pad(nowDate.getMinutes())
            second : this.pad(nowDate.getSeconds())
        };

        this.tick = this.tick.bind(this);
    }

    // TODO: fix ticking...
    tick () {
        let nowDate = new Date(),
            hour    = nowDate.getHours();

        if (!this.props.hourFormat24 && hour >= 12) {
            hour -= 12;     
        }

        this.state = {
            hour   : this.pad(hour),
            minute : this.pad(nowDate.getMinutes())
            second : this.pad(nowDate.getSeconds())
        };
    }

    componentDidMount () {
        this.interval = setInterval(this.tick, 1000);
    }

    componentWillUnmount () {
        clearInterval(this.interval);
    }

    pad (n) {
        return (n < 10) ? `0${n}` : n.toString();
    }

    render () {
        return (
            // TODO: add AM/PM
            <h1 className='colours__time'>{this.state.hour} : {this.state.minute} : {this.state.second}</h1>
        );
    }
}

export = Time;


/*
<div id='contents'>
    <a class='opt' id='options' href='options.html' target='_blank'><span>Options</span></a>
    <a class='opt' id='download' target='_blank'><span>Open image</span></a>

    <div id='time'>
      <h1 id='t'></h1>
      <h2 id='h'></h2>

      <p id='panel-toggles'>
        <a id='panel-toggle-visited'>Most visited</a>
        <a id='panel-toggle-closed'>Recently closed</a>
        <a id='panel-toggle-apps'>Apps</a>
        <a id='panel-toggle-shortcuts'>Shortcuts</a>
      </p>

      <div id='panel'>
        <ul id='visited'></ul>
        <ul id='closed'></ul>
        <ul id='apps'></ul>
        <ul id='shortcuts'></ul>
      </div>
    </div>

    <div id='history'></div>
  </div>
  */
