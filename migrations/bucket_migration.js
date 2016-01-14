// migration to new bucket

var images = Images.find().fetch();

function convertImage(image) {
  var OLD_BUCKET = "vocativ-darknet-images-bucket-development";
  var NEW_BUCKET = "vocativ-darknet-test";

  var newImageUrl = image.image.replace(OLD_BUCKET, NEW_BUCKET);
  Images.update({_id: image._id}, {$set: { image: newImageUrl}});
}

images.forEach(convertImage);
