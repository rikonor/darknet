// migration to new bucket

var images = Images.find().fetch();

var OLD_BUCKET = "vocativ-darknet-images-bucket";
var NEW_BUCKET = "vocativ-darknet";

function convertImage(image) {
  var newImageUrl = image.image.replace(OLD_BUCKET, NEW_BUCKET);
  // console.log(newImageUrl);
  Images.update({_id: image._id}, {$set: { image: newImageUrl}});
}

images.forEach(convertImage);

// Test it worked

var images = Images.find().fetch();

function testImage(image) {
  if (image.image.indexOf(NEW_BUCKET) === -1) {
    console.log("Failed for", image._id, image.image);
  }
}

images.forEach(testImage);
