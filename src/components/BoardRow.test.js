import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';

import BoardRow from './BoardRow';

describe('BoardRow tests', () => {
    it('should renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BoardRow />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
  
    it('should create 7 buttons', () => {
        const status = shallow(<div className="status">Player: Red</div>);
        const wrapper = shallow(
        <BoardRow 
            board={new Array(2).fill('white')}
            cols={7}
            row={0}
        />);
        expect(wrapper.findWhere(node => node.key() == '0,0' ).exists()).toEqual(true);
        expect(wrapper.findWhere(node => node.key() == '0,1' ).exists()).toEqual(true);
        expect(wrapper.findWhere(node => node.key() == '0,2' ).exists()).toEqual(true);
        expect(wrapper.findWhere(node => node.key() == '0,3' ).exists()).toEqual(true);
        expect(wrapper.findWhere(node => node.key() == '0,4' ).exists()).toEqual(true);
        expect(wrapper.findWhere(node => node.key() == '0,5' ).exists()).toEqual(true);
        expect(wrapper.findWhere(node => node.key() == '0,6' ).exists()).toEqual(true);
        expect(wrapper.findWhere(node => node.key() == '0,7' ).exists()).toEqual(false);
    });

});