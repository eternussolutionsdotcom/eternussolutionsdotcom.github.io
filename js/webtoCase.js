
const serveraddress = window.location.hash.substr(1) || "bNAhQZwBobKLBvVkxz8KvaJRpf9TPZoajx";
var NodeApiEndpoint = 'http://192.168.100.61:8083/';
var product;
window.onload = function () {
  var url_string = window.location.href;
  var url = new URL(url_string);
  // console.log(url.href);
  product = url.searchParams.get("product");
  if (product == 'enterceptor') {
    document.getElementById("00N2w000001RSOO").selectedIndex = '1';
  } else if (product === 'gokarma') {
    document.getElementById("00N2w000001RSOO").selectedIndex = '2';
  } else if (product === 'ecowork') {
    document.getElementById("00N2w000001RSOO").selectedIndex = '3';
  } else if (product === 'ufht'){
    document.getElementById("00N2w000001RSOO").selectedIndex = '4';
  } else {
    document.getElementById("00N2w000001RSOO").disabled = false;
  }
}

var b = new Bugout(serveraddress);
//00N2w0000046mx2EAA
var screenshotRef = '00N2w000006SYb1';
var ticketNumber;
var uploadedFileName;
b.on("message", function (address, msg) {
  console.log("message:", address, msg);
  document.getElementById("uploadBtn").value = "Upload";
  NodeApiEndpoint += uploadedFileName;
  console.log(NodeApiEndpoint);
  document.getElementById(screenshotRef).value = NodeApiEndpoint;
  document.getElementById("submitBtn").disabled = false;
  b.destroy(function () {
    console.log("Closed connection");
  });
  $('#fileUploadModel').modal();
  //window.alert("File has been uploaded Successfully");
});

// if a wire join or leave
b.on("wireseen", updateWires);
b.on("wireleft", updateWires);

function updateWires(count) {
  if (count)
    document.getElementById("ui").style.display = "block";
}

preview_image = (event) => {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("imgPreView");
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
  var fileToLoad = event.target.files[0];
  uploadedFileName = fileToLoad.name;
  seedFile(fileToLoad);
  document.getElementById("uploadBtn").disabled = false;
  document.getElementById("submitBtn").disabled = true;
}

seedFile = (file) => {
  var client = new WebTorrent();
  client.on('error', function (err) {
    console.error('ERROR: ' + err.message)
  })
  client.seed(file, function (torrent) {
    console.log('Client is seeding ' + torrent.magnetURI)
    document.getElementById(screenshotRef).value = torrent.magnetURI;
    torrent.on('upload', function (bytes) {
      console.log('just uploaded: ' + bytes)
      console.log('total uploaded: ' + torrent.uploaded);
      console.log('upload speed: ' + torrent.uploadSpeed);
    })

  })
}

uploadFile = (event) => {
  var m = document.getElementById(screenshotRef);
  if (m.value) {
    //msglist.textContent = "Sending Magnetic URI";
    console.log("Sending Magnetic URI");
    b.rpc("post", m.value, function () {
      document.getElementById("uploadBtn").value = "Uploading";
      document.getElementById("uploadBtn").disabled = true;
      console.log("Magnetic URI has been sent");
    });
    document.getElementById("inputFileToLoad").disabled = true;
  }
  else
    window.alert("Please choose the image and then click on upload");

}

sendAlertMessageAtFormSubmit = () => {
  // if (document.getElementById(screenshotRef).value == "") {
  //   alert("Please upload your image");
  //   return false;
  // } else {
  //document.getElementById('submitBtn').data-target = "#myModal"
  document.getElementById("retURL").value= "http://help.eternussolutions.com/index.html?product="+product;  //setting up path after submitting form
  document.getElementById('ticketDisplay').innerHTML = ticketNumber;
  onsubmit = $('#myModal').modal();
  document.getElementById('closeBtn').onclick = () => {
    document.getElementById("webToCaseForm").submit();
  }
  return false;
}

generateTicket = () => {
  let product = document.getElementById('00N2w000001RSOO').value;
  let name = document.getElementById('name').value;
  if (product != '' && name != '') {
    if (product === 'enterceptor') {
      product = 'ente'
    } else if (product === 'gokarma') {
      product = 'goka'
    } else if (product === 'ecowork') {
      product = 'ecow'
    } else {
      product = 'ufht'
    }
    //var timeInMillisec = Math.floor(Date.now() / 1000);
    var randomNumber = Math.floor(1000 + Math.random() * 9000)
    name = name.replace(/\s/g, "") // removed white spaces
    let randomNameString = '';
    for (var i = 0; i < 4; i++) {
      var rnum = Math.floor(Math.random() * name.length);
      randomNameString += name.substring(rnum, rnum + 1);
    }
    ticketNumber = product + randomNumber + randomNameString;
    console.log(ticketNumber)
    document.getElementById('00N2w000006SUTr').value = ticketNumber;
  }
}







/*
CKEDITOR.timestamp = "4.11.2.21";
var protocolAndHost = window.location.protocol + "//" + window.location.host;
var editor = CKEDITOR.replace(screenshotRef, {
  removePlugins:
    "elementspath,maximize,image,tabletools,liststyle,contextmenu,resize",
  baseHref: protocolAndHost + "/ckeditor/ckeditor-4.x/rel/",
  customConfig: "/ckeditor/ckeditor-4.x/rel/sfdc-config.js",
  height: "425",
  bodyId: "00N2w0000046mx2EAA_rta_body",
  toolbar: "SalesforceBasic",
  sfdcLabels: {
    CkeQuickText: { title: "Insert quick text" },
    CkeMediaEmbed: {
      iframeMissing:
        "Invalid &lt;iframe&gt; element. Please use valid code from the approved sites.",
      subtitle: "Paste &amp;lt;iframe&amp;gt; code here:",
      description: "Use &lt;iframe&gt; code from an approved video source.",
      title: "Embed Multimedia Content",
      exampleTitle: "Example:",
      example:
        "\n            \n                &lt;iframe width=&quot;560&quot; height=&quot;315&quot; src=&quot;https://www.youtube.com/embed/KcOm0TNvKBA&quot; frameborder=&quot;0&quot; allowfullscreen&gt;&lt;/iframe&gt;\n            \n        "
    },
    CkeImageMenu: {
      uploadFile: " Browse or Upload",
      uploadUrl: "Web Image",
      title: "Insert images into your message"
    },
    CkeImagePaste: {
      CkeImagePasteWarning:
        "Pasting an image is not working properly with Firefox, please use [Copy Image location] instead."
    },
    CkeImageDialog: {
      infoTab_desc_info:
        "Enter a description of the image for visually impaired users",
      uploadTab_desc: "Description",
      defaultImageDescription: "User-added image",
      uploadTab_file_info: "Maximum size 1 MB. Only png, gif or jpeg",
      uploadTab_desc_info:
        "Enter a description of the image for visually impaired users",
      imageUploadLimit_info: "Max number of upload images exceeded",
      btn_insert_tooltip: "Insert Image",
      httpUrlWarning:
        "Are you sure you want to use an HTTP URL? Using HTTP image URLs may result in security warnings about insecure content. To avoid these warnings, use HTTPS image URLs instead.",
      title: "Insert Image",
      error: "Error:",
      uploadTab: "Upload Image",
      wrongFileTypeError: "You can insert only .gif .jpeg and .png files.",
      infoTab_url: "URL",
      infoTab: "Web Address",
      infoTab_url_info: "Example: http://www.mysite.com/myimage.jpg",
      missingUrlError: "You must enter a URL",
      uploadTab_file: "Select Image",
      btn_update_tooltip: "Update Image",
      infoTab_desc: "Description",
      btn_insert: "Insert",
      btn_update: "Update",
      btn_upadte: "Update",
      invalidUrlError:
        "You can only use http:, https:, data:, //, /, or relative URL schemes."
    },
    sfdcSwitchToText: { sfdcSwitchToTextAlt: "Use plain text" },
    CkeSmartLink: {
      SmartLinkContextMenuEdit: "Edit Smart Link",
      title: "Insert a Smart Link"
    }
  },
  contentsCss: [
    "/ckeditor/ckeditor-4.x/rel/contents.css",
    "/sCSS/47.0/sprites/1573671558000/Theme3/default/gc/CKEditor.css",
    "/sCSS/47.0/sprites/1573671558000/Theme3/default/gc/HtmlDetailElem.css"
  ],
  disableNativeSpellChecker: false,
  language: "en-us",
  allowIframe: false,
  sharedSpaces: { top: "cke_topSpace", bottom: " cke_bottomSpace" },
  filebrowserImageUploadUrl:
    "/_ui/common/request/servlet/RtaImageUploadServlet?_CONFIRMATIONTOKEN=VmpFPSxNakF5TUMwd01TMHhOMVF4TWpveE56b3lNeTQ0TnpsYSxwN1ZsckFYYlp6dVVDbkRyekZHYjE5LE5HRm1NemMy"
});

editor.on("instanceReady", function (evt) {
  try {
    var id = evt.editor.name;
    CKiframe = document.getElementById("cke_" + id).querySelector("iframe");
    meta = document.createElement("meta");
    meta.setAttribute("name", "referrer");
    meta.setAttribute("content", "no-referrer");
    CKiframe.contentDocument.head.appendChild(meta);
  } catch (e) { }
});

 */