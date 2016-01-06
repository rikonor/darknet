/*
 Helpers
*/

parseSectionsContent = function(sections) {
  // Parse a `sections` string

  const typeCollMap = {
    'article': Articles,
    'video': Videos,
    'dataviz': DataViz
  };

  // iterate over each of the sections and process it
  // then iterate over the section contents and retrieve the actual item
  function processSection(section) {
    section.content = _.map(section.content, (item) => {
      let parsedItem = JSON.parse(item);
      let value = typeCollMap[parsedItem.type].findOne(parsedItem._id);

      return {
        type: parsedItem.type,
        value: value
      };
    });

    return section;
  }

  return _.map(sections, processSection);
};

renderSection = function(section, i) {
  let sectionTop = (
    <div className="section-top-text">
      <div className="header">{section.header}</div>
      <div className="description">{section.description}</div>
    </div>
  );

  let sectionDiscussionInvite = null;
  if (section.discussionInviteText) {
    sectionDiscussionInvite = (
      <DiscussionInvite
        discussionInviteText={section.discussionInviteText}
        discussionInviteLink={section.discussionInviteLink} />
    );
  }

  return (
    <Section key={i} type={getSectionType(section)}>
      {sectionTop}
      <Grid>
        {_.map(section.content, renderSectionItem)}
      </Grid>
      {sectionDiscussionInvite}
    </Section>
  );
};

renderSectionItem = function(sectionItem, i) {
  switch(sectionItem.type) {
    case 'video':
      item = <VideoCard video={sectionItem.value} />;
      break;

    case 'article':
      item = <ArticleCard article={sectionItem.value} />;
      break;

    case 'dataviz':
      item = <DataVisualization dataviz={sectionItem.value} />;
      break;
  }

  return (
    <GridItem key={i}>
      {item}
    </GridItem>
  );
};

/*
 JSX Templates
*/

Section = React.createClass({
  render() {
    let sectionClasses = "section";
    if (this.props.type) sectionClasses += ` ${this.props.type}`;

    return (
      <div className={sectionClasses}>
        {this.props.children}
      </div>
    );
  }
});

DiscussionInvite = React.createClass({
  trackClick() {
    let discussionMetaData = this.props.discussionInviteText;
    GAnalytics.event("Navigation", "Join the discussion", discussionMetaData, this.props.discussionInviteLink);
  },

  render() {
    return (
      <div className="discussion-invite-container">
        <div className="discussion-invite">
          <div className="header">What do you think?</div>
          <div className="text">{this.props.discussionInviteText}</div>
          <a href={this.props.discussionInviteLink} target="_blank" onClick={this.trackClick}><div className="button">Add to the conversation</div></a>
        </div>
      </div>
    );
  }
});
