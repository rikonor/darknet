Images = new Meteor.Collection("images");

Schemas.Images = new SimpleSchema({
  createdAt: Schemas.createdAt,
  name: {
    type: String,
    max: 60,
    autoform: {
      placeholder: "Image name"
    }
  },
  image: {
    type: String,
    optional:true,
    autoform: {
      type: 'slingshotFileUpload',
      afFieldInput:{
        slingshotdirective: 'imageUploads'
      }
    }
  }
});

Images.attachSchema(Schemas.Images);

// Helpers
Images.helpers({
  url: function() {
    return this.image;
  }
});

// Admin Panel options

ImagesAdminOptions = {
  icon: 'image',
  tableColumns: [
    { label: 'Image', name: '_id', template: 'tableImage' },
    { label: 'Name', name: 'name' }
  ],
  routes: adminRoutesWaitOnOptions(['images']),
  showInSideBar: false,
  showWidget: false
};
