import React from 'react';
import ReactDOM from 'react-dom';

import { shallow } from 'enzyme';

import Board from './Board';


describe('Board tests', () => {
    it('should renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Board />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('should start red', () => {
        const status = shallow(<div className="status">Player: red</div>);
        const wrapper = shallow(<Board/>);
        expect(wrapper.state().redIsNext).toEqual(true);
        expect(wrapper.find('div.status')).toEqual(status);
    });


    it('should win red vertical', () => {
        const wrapper = shallow(<Board/>);
        let boardMock = Array.from(Array(6), () => new Array(7).fill('white'));
        boardMock[0][0] = 'red';
        boardMock[1][0] = 'red';
        boardMock[2][0] = 'red';
        boardMock[3][0] = 'red';
        expect( wrapper.instance().calculateWinner(boardMock,0, 0)).toEqual('red');
    });

    it('should win red horizontal', () => {
        const wrapper = shallow(<Board/>);
        let boardMock = Array.from(Array(6), () => new Array(7).fill('white'));
        boardMock[4][3] = 'red';
        boardMock[4][4] = 'red';
        boardMock[4][5] = 'red';
        boardMock[4][6] = 'red';
        expect(wrapper.instance().calculateWinner(boardMock,4,6)).toEqual('red');
    });


    it('should win red diagonal', () => {
        const wrapper = shallow(<Board/>);
        let boardMock = Array.from(Array(6), () => new Array(7).fill('white'));
        boardMock[2][3] = 'red';
        boardMock[3][4] = 'red';
        boardMock[4][5] = 'red';
        boardMock[5][6] = 'red';
        expect(wrapper.instance().calculateWinner(boardMock,2,3)).toEqual('red');
    });

    it('should win yellow vertical', () => {
        const wrapper = shallow(<Board/>);
        let boardMock = Array.from(Array(6), () => new Array(7).fill('white'));
        boardMock[1][4] = 'yellow';
        boardMock[2][4] = 'yellow';
        boardMock[3][4] = 'yellow';
        boardMock[4][4] = 'yellow';
        expect( wrapper.instance().calculateWinner(boardMock,1,4)).toEqual('yellow');
    });


    it('should win yellow horizontal', () => {
        const wrapper = shallow(<Board/>);
        let boardMock = Array.from(Array(6), () => new Array(7).fill('white'));
        boardMock[0][1] = 'yellow';
        boardMock[0][2] = 'yellow';
        boardMock[0][3] = 'yellow';
        boardMock[0][4] = 'yellow';
        expect( wrapper.instance().calculateWinner(boardMock,0,1)).toEqual('yellow');
    });

    it('should win yellow diagonal', () => {
        const wrapper = shallow(<Board/>);
        let boardMock = Array.from(Array(6), () => new Array(7).fill('white'));
        boardMock[2][5] = 'yellow';
        boardMock[3][4] = 'yellow';
        boardMock[4][3] = 'yellow';
        boardMock[5][2] = 'yellow';
        expect( wrapper.instance().calculateWinner(boardMock,2,5)).toEqual('yellow');
    });


    it('should be Tied Game', () => {
        const status = shallow(<div className="status">Tied Game</div>);
        const wrapper = shallow(<Board/>);
        wrapper.setState({ pieces: 42 });
        expect(wrapper.find('div.status')).toEqual(status);
    });


    it('should be 4 moves', () => {
        const wrapper = shallow(<Board/>);
        wrapper.instance().handleClickCallback(5,6);
        wrapper.instance().handleClickCallback(5,6);
        wrapper.instance().handleClickCallback(5,6);
        wrapper.instance().handleClickCallback(5,6);
        expect(wrapper.state().pieces).toEqual(4);
    });

    it('payer should changes', () => {
        const status = shallow(<div className="status">Player: yellow</div>);
        const wrapper = shallow(<Board/>);
       
        wrapper.instance().handleClickCallback(5,6);
        expect(wrapper.state().redIsNext).toEqual(false);
        expect(wrapper.find('div.status')).toEqual(status);

        const status2 = shallow(<div className="status">Player: red</div>);
        wrapper.instance().handleClickCallback(5,6);
        expect(wrapper.state().redIsNext).toEqual(true);
        expect(wrapper.find('div.status')).toEqual(status2);
    });


    it('should win red horizontal real situation', () => {
        const status = shallow(<div className="status">Winner red!!!</div>);
        const wrapper = shallow(<Board/>);
    
        wrapper.instance().handleClickCallback(5,6);
        wrapper.instance().handleClickCallback(5,6);
        wrapper.instance().handleClickCallback(5,5);
        wrapper.instance().handleClickCallback(5,5);
        wrapper.instance().handleClickCallback(5,4);
        wrapper.instance().handleClickCallback(5,4);
        wrapper.instance().handleClickCallback(5,3);

        expect(wrapper.find('div.status')).toEqual(status);

    });

    it('should win yellow vertical real situation', () => {
        const status = shallow(<div className="status">Winner yellow!!!</div>);
        const wrapper = shallow(<Board/>);
    
        wrapper.instance().handleClickCallback(5,6);
        wrapper.instance().handleClickCallback(5,5);
        wrapper.instance().handleClickCallback(5,6);
        wrapper.instance().handleClickCallback(5,5);
        wrapper.instance().handleClickCallback(5,6);
        wrapper.instance().handleClickCallback(5,5);
        wrapper.instance().handleClickCallback(5,4);
        wrapper.instance().handleClickCallback(5,5);

        expect(wrapper.find('div.status')).toEqual(status);

    });
    
});