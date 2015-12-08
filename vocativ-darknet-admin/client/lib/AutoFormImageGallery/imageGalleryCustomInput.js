/*
  AutoForm - Image Gallery Input Type
*/

AutoForm.addInputType('imageGallery', {
  template: 'afImageGallery',
  valueOut: function() {
    console.log("returning", this.val());
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

  this.setSelectedImage = function(image) {
    this.selectedImage.set(image);
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
      return selectedValue._id;
    }
  },

  schemaKey: function() {
    return this.atts['data-schema-key'];
  },

  images: function(query) {
    var dbQuery = {};

    // Search the images based on the query
    var currentQuery = Template.instance().currentQuery.get();
    if (currentQuery) {
      dbQuery.name = new RegExp(currentQuery, 'i');
    }

    var images = Images.find(dbQuery).fetch();
    var rawImages = getAssociatedEntities(images, 'image', ImagesRaw);
    images = embedObjects(images, rawImages, 'rawImage');

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

  this.isSelected = new ReactiveVar(false);
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
    // Call setSelectedImage on parent
    t.gallery.setSelectedImage(t.data);

    // Set the selected status
    t.isSelected.set(true);
  }
});
