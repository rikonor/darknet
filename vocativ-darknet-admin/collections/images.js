Images = new Meteor.Collection("images");

Schemas.Images = new SimpleSchema({
  name: {
    type: String,
    max: 60,
    autoform: {
      placeholder: "Image name"
    }
  },
  image: {
    type: String,
    autoform: {
      type: 'fileUpload',
      collection: 'ImagesRaw',
      accept: 'image/*',
      label: 'Choose file',
      onBeforeInsert: function(fileObj) {
        // TODO: Sanitize filename, use whichever filename you want, etc
        // fileObj.name = ""
        return fileObj;
      }
    }
  }
});

Images.attachSchema(Schemas.Images);

// Admin Panel options

ImagesAdminOptions = {
  icon: 'image',
  tableColumns: [
    { label: 'Name', name: 'name' }
  ]
};
