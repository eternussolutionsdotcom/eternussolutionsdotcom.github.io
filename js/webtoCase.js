
const serveraddress = window.location.hash.substr(1) || "bMmtg6aKznssLDY6RxzHxcjEvKD7dNmht5";
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
  //console.log(NodeApiEndpoint);
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
  document.getElementById("retURL").value= "/index.html?product="+product;  //setting up path after submitting form
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

