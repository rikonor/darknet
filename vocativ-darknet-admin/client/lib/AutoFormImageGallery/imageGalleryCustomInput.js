/*
  AutoForm - Image Gallery Input Type
*/

AutoForm.addInputType('imageGallery', {
  template: 'afImageGallery',
  valueOut: function() {
    return this.val();
  }
});

/*
  Template - Image Gallery
*/

// onCreated
Template.afImageGallery.onCreated(function() {
  this.selectedImage = new ReactiveVar(null);
  this.currentQuery = new ReactiveVar(null);

  this.childImages = [];

  this.addImage = function(imageTemplate) {
    this.childImages.push(imageTemplate);
  };

  this.getAllImages = function() {
    return this.childImages;
  };

  this.setSelectedImage = function(imageId) {
    this.selectedImage.set(imageId);
  };

  this.setCurrentQuery = function(query) {
    this.currentQuery.set(query);
  };
});

// helpers
Template.afImageGallery.helpers({
  selectedValue: function() {
    var selectedValue = Template.instance().selectedImage.get();
    if (selectedValue) {
      return selectedValue;
    }
  },

  schemaKey: function() {
    return this.atts['data-schema-key'];
  },

  images: function(query) {
    var gallery = Template.instance();

    // default query (show the selected image and the query)
    var dbQuery = {};

    if (gallery.selectedImage.get()) {
      dbQuery._id = gallery.selectedImage.get();
    }

    // Search the images based on the query
    var currentQuery = gallery.currentQuery.get();
    if (currentQuery) {
      dbQuery.name = new RegExp(currentQuery, 'i');
    }

    // Even when filter is active, should still show the selected image
    if (dbQuery._id && dbQuery.name) {
      dbQuery = {
        $or: [
          { _id: dbQuery._id },
          { name: dbQuery.name }
        ]
      };
    }

    // In any case, if no filter was inputted, just show everything
    if (dbQuery._id && ! dbQuery.name) {
      dbQuery = {};
    }

    var dbOptions = {
      sort: { createdAt: -1 }
    };

    if (_.isEmpty(dbQuery)) {
      // Don't return the whole db
      dbOptions.limit = 10;
    }

    var images = Images.find(dbQuery, dbOptions).fetch();
    var rawImages = getAssociatedEntities(images, 'image', ImagesRaw);
    images = embedChildrenInParents(images, 'image', rawImages, 'rawImage');

    return images;
  }
});

// events
Template.afImageGallery.events({
  'keydown .search-filter': _.debounce(function(e, t) {
    // extract query
    var text = e.target.value;

    // set it on template
    t.setCurrentQuery(text);
  }, 0.5 * 1000)
});

/*
  Template - Image Gallery Image
*/

// onCreated
Template.afImageGalleryImage.onCreated(function(a) {
  this.gallery = this.parent();
  this.gallery.addImage(this);

  this.isSelected = new ReactiveVar(false);

  this.setSelected = function() {
    // Call setSelectedImage on parent
    this.gallery.setSelectedImage(this.data._id);

    // deselect all other images
    var allImages = this.gallery.getAllImages();
    _.each(allImages, function(image) {
      image.setUnselected();
    });

    this.isSelected.set(true);
  };

  this.setUnselected = function() {
    this.isSelected.set(false);
  };
});

Template.afImageGalleryImage.onRendered(function() {
  // Check if this image is already selected
  var t = this;
  this.autorun(function() {
    if (Template.parentData().value === t.data._id) {
      t.setSelected();
    }
  });
});

// helpers
Template.afImageGalleryImage.helpers({
  isSelected: function() {
    return Template.instance().isSelected.get() ? "selected" : "";
  },

  imageUrl: function() {
    return Template.instance().data.rawImage.url();
  }
});

// events
Template.afImageGalleryImage.events({
  'click .image': function(e, t) {
    t.setSelected();
  }
});
