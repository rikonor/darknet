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
  },
  ssImage: {
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
    // Get the actual image url from the rawImage
    // (We need this because Images is a wrapper of ImagesRaw)

    var rawImageId = this.image;
    var rawImage = ImagesRaw.findOne(rawImageId);

    return rawImage.url();
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
