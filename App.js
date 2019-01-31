import React, { Component } from "react";
import {
  FiLoader,
  FiFastForward,
  FiTwitter,
  FiRefreshCw
} from "react-icons/fi";

class App extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      quote: {}
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    fetch("https://quote-express.glitch.me/api/randomquote")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          loading: false,
          quote: data
        });
      });
  }

  handleClick() {
    this.setState({ loading: true });
    fetch("https://quote-express.glitch.me/api/randomquote")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({
          loading: false,
          quote: data
        });
      });
  }

  render() {
    const text = this.state.loading ? (
      <FiLoader className="loader" />
    ) : (
      this.state.quote.quoteText
    );
    const citation = this.state.loading ? (
      <FiLoader className="loader" />
    ) : (
      this.state.quote.citation
    );
    const where = encodeURIComponent(location.href);
    // console.log(where);
    const tweetIntent = `https://twitter.com/intent/tweet?hashtags=codingquotes&text=${encodeURIComponent(
      text
    )}&url=${where}&via=phatbhoy67`;
    return (
      <div id="quote-box" className="quote-container">
        <blockquote
          style={{
            animation: !this.state.loading && "appear linear 1.5s forwards"
          }}
        >
          <p id="text">{text}</p>
          <cite id="author" className="author">
            <i>{citation}</i>
          </cite>
        </blockquote>
        <div className="button-container">
          <a
            role="button"
            tabindex="0"
            aria-roledescription="get new quote button"
            aria-keyboardshorcut="spacebar"
            id="new-quote"
            onClick={this.handleClick}
            onKeyPress={this.handleClick}
          >
            <FiRefreshCw
              style={{
                animation:
                  !this.state.loading && "spinner ease-out 0.75s forwards"
              }}
            />
          </a>
          <a
            id="tweet-quote"
            role="button"
            tabindex="0"
            aria-roledescription="tweet quote button"
            href={tweetIntent}
            target="_blank"
          >
            <FiTwitter />
          </a>
        </div>
        <br />
      </div>
    );
  }
}

export default App;
