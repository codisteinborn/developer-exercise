import React, { Component } from 'react';
import _ from 'underscore';
import './App.css';
import QuoteList from './components/QuoteList';
import quotes from "./quotes.json";

class App extends Component {
  state = {
    quotes,
    filtQuotes: [],
    quoteChunks: [],
    pageQuotes: [],
    totalPages: 0,
    currentPage: 1,
    search: ''
  };

  componentDidMount = () =>{
    const pages = Math.round(this.state.quotes.length / 15);
    const chunks = _.chunk(this.state.quotes, 15);
    const page1 = chunks[0]
    this.setState({pageQuotes : page1 , quoteChunks : chunks, totalPages : pages , currentPage : 1 });
  }
  nextPage = () =>{
    const nxtPage = Math.min(this.state.currentPage + 1, this.state.totalPages);
    const nxtPageQuotes = this.state.quoteChunks[nxtPage - 1];
    this.setState({pageQuotes : nxtPageQuotes , currentPage : nxtPage });
  }
  prevPage = () =>{
    const prevPage = Math.max(this.state.currentPage - 1, 1);
    const nxtPageQuotes = this.state.quoteChunks[prevPage - 1];
    this.setState({pageQuotes : nxtPageQuotes , currentPage : prevPage });
  }
  filterMovieQuotes = theme => {
    const filtQuotes = this.state.quotes.filter(quotes => quotes.theme === 'movies');
    const pages = Math.ceil(filtQuotes.length / 15);
    const chunks = _.chunk(filtQuotes, 15);
    const page1 = chunks[0];
    this.setState({quoteChunks: chunks, pageQuotes: page1 , totalPages: pages, currentPage : 1});
  };
  filterGameQuotes = theme => {
    const filtQuotes = this.state.quotes.filter(quotes => quotes.theme === 'games');
    const pages = Math.ceil(filtQuotes.length / 15);
    const chunks = _.chunk(filtQuotes, 15);
    const page1 = chunks[0];
    this.setState({quoteChunks: chunks, pageQuotes: page1 , totalPages: pages, currentPage : 1});
  };
  handleInputChange = event => {
    // Getting the value and name of the input which triggered the change
    const { search, value } = event.target;
    // Updating the input's state
    this.setState({
      search: value
    });
  };
//   searchQuote = () =>{
// this.setState({})
//   }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Quotes</h1>
          <div className='filter'>
          <h2>Filter Options</h2>
          <p onClick={this.componentDidMount}>View All</p>
          <p onClick={this.filterMovieQuotes} theme='movies'>Movie Quotes</p>
          <p onClick={this.filterGameQuotes} theme='games'>Game Quotes</p>
          <form>
            Search for quotes: <input onChange={this.handleInputChange} value={this.state.search}/>
          </form>
          </div>
        </header>
        {this.state.pageQuotes.map(quotes => (
          <QuoteList
            theme={quotes.theme}
            context={quotes.context}
            quote={quotes.quote}
            id={quotes.id}
            key={quotes.id}
          />
        ))}
        <div>Total Pages: {this.state.totalPages} Current Page: {this.state.currentPage}</div>
        <button onClick={this.prevPage}>Previous page</button>
        <button onClick={this.nextPage}>Next page</button>
      </div>
    );
  }
}

export default App;
