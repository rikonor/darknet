SlingshotAutoformFileCache = new Meteor.Collection(null);

AutoForm.addInputType 'slingshotFileUpload',
  template: 'afSlingshot'
  valueIn: (images) ->
    t = Template.instance()
    if t.data and typeof images == 'string' and images.length > 0
      SlingshotAutoformFileCache.upsert {field: t.data.name}, {
        field: t.data.name
        src: images
      }
    else
      _.each images, (image, i) ->
        if typeof image == 'string'
          schema = AutoForm.getFormSchema()
          if schema and schema._schema and t.view.isRendered
            schemaKey = t.$('[data-schema-key]').data('schema-key')
            if schemaKey
              # Replace ".0." with ".$."
              schemaKey = schemaKey.replace(/\.\d+\./g, '.$.')
              directives = schema._schema[schemaKey].autoform.afFieldInput.slingshotdirective
              if directives
                _directives = _.map(directives, (o, k) ->
                  if typeof o == 'string'
                    o = {directive: o}
                  o.key = k
                  return o
                  ).sort((a, b) ->
                    -a.key.localeCompare b.key
                  )
                # debugger
                SlingshotAutoformFileCache.upsert {field: t.data.name, directive: _directives[i].directive}, {
                  field: t.data.name
                  directive: _directives[i].directive
                  key: _directives[i].key
                  src: image
                }
        else
          SlingshotAutoformFileCache.upsert {field: t.data.name, directive: image.directive}, _.extend(image,
           field: t.data.name
          )
    images

  valueOut: ->
    field = $(@context).data('schema-key')
    images = SlingshotAutoformFileCache.find({field: field}, {order: {key: -1}}).fetch()
    images

  valueConverters:
    string: (images)->
      if typeof images == 'object' or typeof images == 'array'
        if typeof images[0] == 'object'
          images[0].src

    stringArray: (images)->
      imgs = _.map( images, (image)-> image.src )
      imgs

clearFilesFromCache = ->
  SlingshotAutoformFileCache.remove({});

getCollection = (context) ->
  if typeof context.atts.collection == 'string'
    context.atts.collection = FS._collections[context.atts.collection] or window[context.atts.collection]
  return context.atts.collection

getTemplate = (filename, parentView) ->
  if filename
    filename = filename.toLowerCase()
    template = 'fileThumbIcon' + (if parentView.name.indexOf('_ionic') > -1 then '_ionic' else '')
    if filename.indexOf('.jpg') > -1 || filename.indexOf('.png') > -1 || filename.indexOf('.gif') > -1
      template = 'fileThumbImg' + (if parentView.name.indexOf('_ionic') > -1 then '_ionic' else '')
    template

AutoForm.addHooks null,
  onSuccess: ->
    clearFilesFromCache()

destroyed = () ->
  name = @data.name

Template.afSlingshot.destroyed = destroyed
Template.afSlingshot_ionic.destroyed = destroyed

uploadWith = (directive, files, name, key) ->
  if typeof directive == 'string'
    directiveName = directive
  else if typeof directive == 'object'
    if !directive.directive
      console.error 'Missing directive in ' + key, directive
    directiveName = directive.directive
    if directive.onBeforeUpload
      onBeforeUpload = directive.onBeforeUpload

  uploader = new Slingshot.Upload(directiveName)

  uploadCallback = (file) ->
    src = ''
    if file.type.indexOf('image') == 0
      urlCreator = window.URL or window.webkitURL;
      src = urlCreator.createObjectURL( file );

    # Add a placeholder for the upload with a Blob data URI, aka Optimistic UI.
    SlingshotAutoformFileCache.upsert {field: name, directive: directiveName}, {
      field: name
      key: key or ''
      directive: directiveName
      filename: file.name,
      src: src
      uploaded: false
    }
    Meteor.defer =>
      uploader.send file, (err, src) ->
        if err
          console.error err
        else
          # Update the status and src of the placeholder for the upload.
          SlingshotAutoformFileCache.upsert {field: name, directive: directiveName}, {$set: {
            src: src
            filename: file.name
            uploaded: true
          }}

  async.map(
    files
    , (file, cb) ->
      if onBeforeUpload
        onBeforeUpload file, uploadCallback
      else
        uploadCallback file
    , (err, results) ->
      if err
        console.error err
  )

events =
  "change .file-upload": (e, t) ->
    files = e.target.files
    if typeof files is "undefined" || (files.length is 0) then return

    # Support single and multiple directives.
    directives = t.data.atts.slingshotdirective;
    name = $(e.target).attr('file-input')

    # If single directive upload.
    if typeof directives == 'string'
      uploadWith directives, files, name

    # If singe directive as object.
    else if typeof directives == 'object' and 'directive' of directives
      uploadWith directives, files, name

    # If multiple directive upload with keys.
    else if typeof directives == 'object'
      _.each directives, (directive, key) ->
        uploadWith directive, files, name, key

  'click .file-upload-clear': (e, t)->
    name = $(e.currentTarget).attr('file-input')
    SlingshotAutoformFileCache.remove({field: name});

Template.afSlingshot.events events
Template.afSlingshot_ionic.events events

helpers =
  label: ->
    @atts.label or 'Choose file'
  removeLabel: ->
    @atts['removeLabel'] or 'Remove'
  accept: ->
    @atts.accept or '*'
  schemaKey: ->
    @atts['data-schema-key']

  fileUpload: ->
    t = Template.instance()
    console.log t, @atts;
    select =
      field: @atts.name
    # Allow selection of the directive for the thumbnail by key.
    if @atts.thumbnail
      select.$or = [{directive: @atts.thumbnail}, {key: @atts.thumbnail}]
    file = SlingshotAutoformFileCache.findOne(select)
    if file
      data: file
      template: getTemplate file.filename or file.src, t.view

Template.afSlingshot.helpers helpers
Template.afSlingshot_ionic.helpers helpers

Template.fileThumbIcon.helpers
  icon: ->
    if @filename
      file = @filename.toLowerCase()
      icon = 'document'
      if file.indexOf('youtube.com') > -1
        icon = 'youtube'
      else if file.indexOf('vimeo.com') > -1
        icon = 'vimeo-square'
      else if file.indexOf('.pdf') > -1
        icon = 'file-pdf-o'
      else if file.indexOf('.doc') > -1 || file.indexOf('.docx') > -1
        icon = 'file-word-o'
      else if file.indexOf('.ppt') > -1
        icon = 'file-powerpoint-o'
      else if file.indexOf('.avi') > -1 || file.indexOf('.mov') > -1 || file.indexOf('.mp4') > -1
        icon = 'file-movie-o'
      else if file.indexOf('.png') > -1 || file.indexOf('.jpg') > -1 || file.indexOf('.gif') > -1 || file.indexOf('.bmp') > -1
        icon = 'file-image-o'
      else if file.indexOf('http://') > -1 || file.indexOf('https://') > -1
        icon = 'link'
      icon

Template.fileThumbIcon_ionic.helpers
  filename: ->
    if @filename
      filename = @filename
      if filename.length > 25
        filename = filename.slice(0, 25) + '...'
      filename
    else if @src
      filename = @src.replace(/^.*[\\\/]/, '');
      if filename.length > 25
        filename = filename.slice(0, 25) + '...'
      filename
  icon: ->
    if @filename
      file = @filename.toLowerCase()
      icon = 'file-o'
      if file.indexOf('youtube.com') > -1
        icon = 'social-youtube'
      else if file.indexOf('vimeo.com') > -1
        icon = 'social-vimeo'
      else if file.indexOf('.pdf') > -1
        icon = 'document-text'
      else if file.indexOf('.doc') > -1 || file.indexOf('.docx') > -1
        icon = 'document-text'
      else if file.indexOf('.ppt') > -1
        icon = 'document'
      else if file.indexOf('.avi') > -1 || file.indexOf('.mov') > -1 || file.indexOf('.mp4') > -1
        icon = 'ios-videocam-outline'
      else if file.indexOf('.png') > -1 || file.indexOf('.jpg') > -1 || file.indexOf('.gif') > -1 || file.indexOf('.bmp') > -1
        icon = 'image'
      else if file.indexOf('http://') > -1 || file.indexOf('https://') > -1
        icon = 'link'
      icon

Template.fileThumbImg_ionic.events(
  'click [data-action=showActionSheet]': (event) ->
    IonActionSheet.show(
      buttons: []
      destructiveText: 'Delete'
      cancelText: 'Cancel'
      destructiveButtonClicked: (()->
        SlingshotAutoformFileCache.remove({field: this.field});
        true
      ).bind(this)
    )
)
