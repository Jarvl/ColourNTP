///<reference path='../../types/react.d.ts' />
///<reference path='../../types/settings.d.ts' />

import React = require('react');

import ChromeStorage = require('../../modules/chromestorage');


interface IProps {
    label: string;
    value: number;
    optkey: string;
}

interface IState {
    value: number;
}

class Range extends React.Component<IProps, IState> {
    private Storage;

    constructor (props) {
        super(props);

        this.state = {
            value: this.props.value
        };

        this.handleChange = this.handleChange.bind(this);

        this.Storage = new ChromeStorage();
    }

    handleChange (e) {
        let key   = this.props.optkey,
            value = e.target.value;

        this.Storage.set(key, value);

        this.setState({ value: value });
    }

    render () {
        return (
            <label>
                <span>{this.props.label}:</span>
                <input type='range' min='0' max='100' step='1' value={this.state.value.toString()} onChange={this.handleChange} />
                <span>({this.state.value}%)</span>
            </label>
        );
    }
}

export = Range;