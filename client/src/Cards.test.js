import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Cards from "./components/Cards/Cards";
import Card from "./components/Card/Card";
configure({ adapter: new Adapter() });

describe("<Cards />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Cards />);
  });
  console.log("wrapper")
  it("deberia renderizar 1 componentes <Card />", () => {
    expect(wrapper.find("Card")).toEqual({});
  });
  it("deberia renderizar 1 componentes <div />", () => {
    expect(wrapper.find("div")).toHaveLength(1);
  });

});
