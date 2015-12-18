NotFound = React.createClass({
  getDefaultProps() {
    return {
      bgImage: "/images/curtain.jpg"
    };
  },

  getQuote() {
    let quoteText = '"It cannot be seen, cannot be felt,\nCannot be heard, cannot be smelt,\nIt lies behind stars and under hills,\nAnd empty holes it fills,\nIt comes first and follows after,\nEnds life, kills laughter."';
    let quoteSource = 'J.R.R. Tolkien, The Hobbit';

    return {
      text: quoteText,
      source: quoteSource
    };
  },

  render() {
    // Try getting a quote
    let quote = this.getQuote();

    // Fallback to default
    quote = quote || {
      text: "404 Not found"
    };

    return (
      <div className="not-found">
        <div className="background-image">
          <img src={this.props.bgImage}></img>
        </div>

        <Section>
          <div className="not-found-inner">
            <div className="quote">
              <pre className="text">{quote.text}</pre>
              <div className="source">&mdash; {quote.source}</div>
            </div>
            <div className="link-home">
              <a href="/">Go back to DARK NET</a>
            </div>
          </div>
        </Section>
      </div>
    );
  }
});
