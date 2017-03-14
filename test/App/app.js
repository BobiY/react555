import React,{ Component } from "react";
import { render } from "react-dom";
import "./index.less";


class App extends Component{
	constructor(props){
		super();
	}
	render(){
		return (
			<div>
                {"Hello World!"}
			</div>
			)
	}
};


render(<App/>,document.getElementById("app"));