import { render, screen } from '@testing-library/react';
import React from 'react';
import Create from './components/Create/Create';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

describe('<Create />',() => {

  describe('Estructura', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = shallow(<Create />);
    })
    it('Renderiza un <form>', () => {
      expect(wrapper.find('form')).toHaveLength(1)
    })
  })
})