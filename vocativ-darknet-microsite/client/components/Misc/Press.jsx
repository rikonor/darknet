let logosMap = {
  "newyorktimes": "images/newssites-logos/nyt-logo.svg",
  "hollywoodreporter": "images/newssites-logos/hollywood-reporter-logo.svg",
  "fastcompany": "images/newssites-logos/fast-company-logo.svg",
  "adweek": "images/newssites-logos/adweek-logo.svg",
  "adage": "images/newssites-logos/ad-age-logo.svg",
  "digitalreview": "images/newssites-logos/digitalreviewco-logo.svg",
  "maxim": "images/newssites-logos/maxim-logo.svg",
  "digiday": "images/newssites-logos/digiday-logo.svg"
};

let pressReleases = [
  {
    source: "newyorktimes",
    description: "Review: ‘Dark Net’ Explores the Digital Age’s Toll on Us",
    url: "http://mobile.nytimes.com/2016/01/21/arts/television/review-dark-net-explores-the-digital-ages-toll-on-us.html",
    date: "January 20, 2016"
  },
  {
    source: "hollywoodreporter",
    description: "'Dark Net': TV Review",
    url: "http://www.hollywoodreporter.com/review/dark-net-tv-review-857426",
    date: "January 19, 2016"
  },
  {
    source: "fastcompany",
    description: "Unmasking the \"Dark Net\" with Vocativ's Mati Kochavi",
    url: "http://www.fastcocreate.com/3055605/unmasking-the-dark-net-with-vocativs-mati-kochavi",
    date: "January 21, 2016"
  },
  {
    source: "adweek",
    description: "Vocativ Explores the Deep Web in Its New Showtime Docuseries Dark Net",
    url: "http://www.adweek.com/news/television/vocativ-explores-deep-web-its-new-showtime-docuseries-dark-net-169110",
    date: "January 21, 2016"
  },
  {
    source: "adage",
    description: "Deep-Web Spelunker Vocativ Is Jumping Headfirst Into Television",
    url: "http://adage.com/article/media/vocativ-jumping-headfirst-television/302225/",
    date: "January 20, 2016"
  },
  {
    source: "digitalreview",
    description: "Vocativ uses its data-mining software to create a TV show",
    url: "http://digitalreview.co/vocativ-uses-its-data-mining-software-to-create-a-tv-show/",
    date: "January 19, 2016"
  },
  {
    source: "hollywoodreporter",
    description: "Meet the Company Exploring the Dark Net for Showtime's New Docuseries",
    url: "http://www.hollywoodreporter.com/news/meet-company-exploring-dark-net-855897",
    date: "January 14, 2016"
  },
  {
    source: "maxim",
    description: "Meet Your New Robot Overlords",
    url: "http://www.maxim.com/entertainment/daily-heat-index-new-info-xmen-apocalypse-2016-1",
    date: "January 21, 2016"
  },
  {
    source: "digiday",
    description: "Vocativ uses its data-mining software to create a TV show",
    url: "http://digiday.com/publishers/vocativ-uses-data-mining-software-create-tv-show/",
    date: "January 19, 2016"
  }
];

Press = React.createClass({
  renderPressRelease(pressRelease, key) {
    // Translate source to logo
    pressRelease.logo = logosMap[pressRelease.source];

    return (
      <GridItem key={key}>
        <PressReleaseCard pressRelease={pressRelease} />
      </GridItem>
    );
  },

  render() {
    return (
      <div className="press">
        <Page>
          <Section>
            <div className="header">PRESS</div>

            <Grid>
              {_.map(pressReleases, this.renderPressRelease)}
            </Grid>
          </Section>
        </Page>
      </div>
    );
  }
});

let PressReleaseCard = React.createClass({
  handleClick() {
    GAnalytics.event("Press Releases", "view", this.props.pressRelease.url);
  },

  render() {
    let pressRelease = this.props.pressRelease;

    return (
      <div className="card card-press-release">
        <a href={pressRelease.url} target="_blank" onClick={this.handleClick}>
          <div className="logo">
            <img src={pressRelease.logo} />
          </div>
          <div className="description">{pressRelease.description}</div>
          <div className="date">{pressRelease.date}</div>
        </a>
      </div>
    );
  }
});
