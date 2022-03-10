
import React, { Component } from "react";
import "./index.css";

export default class StockData extends Component {
  state = {
    stockData: null,
    appInput: ''
  };

  componentDidMount() {
    
  }

  submitInput = (event) => {
    event.preventDefault();
    const { appInput } = this.state;
    this.state.isLoading = false;
    // In a real app i keep base api url in enviorment file and create thunk action 
    // for api requests.
    let ApiUrl = "https://jsonmock.hackerrank.com/api/stocks?date=";
    fetch(ApiUrl + appInput)
    .then(response => response.json())
    .then(result => {
      this.state.isLoading = true;
      const { data } = result;
      if(data && !!data.length) {
        this.setState({
          stockData: data[0]
        });
      } else {
        this.setState({
          stockData: null
        });
      }
    });
  }

  onChange = (event) => {
    this.setState({
      appInput: event.target.value
    });
  }

  render() {
    const { stockData } = this.state;
    const { isLoading } = this.state;
    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input type="text" className="large" placeholder="5-January-2000" onChange={this.onChange} id="app-input" data-testid="app-input"/>
          <button className="" id="submit-button" data-testid="submit-button" onClick={this.submitInput}>Search</button>
        </section>
        {
          stockData &&
        <ul className="mt-50 slide-up-fade-in styled" id="stockData" data-testid="stock-data" >
          <li className="py-10">Open: {stockData.open}</li>
          <li className="py-10">Close: {stockData.close}</li>
          <li className="py-10">High: {stockData.high}</li>
          <li className="py-10">Low: {stockData.low}</li>
        </ul>
          !stockData && isLoading &&
        <div className="mt-50 slide-up-fade-in" id="no-result" data-testid="no-result">No Results Found</div>
      }
        
      </div>
    );
  }
}
