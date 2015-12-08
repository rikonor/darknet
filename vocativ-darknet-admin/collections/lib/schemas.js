Schemas = {};

Schemas.createdAt = {
  type: Date,
  label: 'Date',
  autoValue: function () {
    if (this.isInsert) {
      return new Date();
    }
  },
  autoform: {
    type: "hidden"
  }
};
