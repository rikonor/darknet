Template.tableImage.helpers({
  tableImage: function() {
    // This sucks cause it's a repeating query (this get's called for each row in a table)
    var imageId = this.value;
    var image = Images.findOne(imageId, {reactive: false});
    return image.url();
  }
});
