var deferredPrompt;

if (!window.Promise) {
  window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
      console.log('Service worker registered!');
    })
    .catch(function (err) {
      console.log(err);
    });
}

window.addEventListener('beforeinstallprompt', function (event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  return false;
});

var promise = new Promise(function (resolve, reject) {
  setTimeout(function () {
    //resolve('This is executed once the timer is done!');
    reject({
      code: 500,
      message: 'An error occurred!'
    });
    //console.log('This is executed once the timer is done!');
  }, 3000);
});

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://httpbin.org/ip');
xhr.responseType = 'json';

xhr.onload = function () {
  console.log(xhr.response);
};

xhr.onerror = function () {
  console.log('Error!');
};

xhr.send();

fetch('https://httpbin.org/ip')
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });

fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({
      message: 'Does this work?'
    })
  })
  .then(function (response) {
    console.log(response);
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (err) {
    console.log(err);
  });

// promise.then(function(text) {
//   return text;
// }, function(err) {
//   console.log(err.code, err.message)
// }).then(function(newText) {
//   console.log(newText);
// });

promise.then(function (text) {
  return text;
}).then(function (newText) {
  console.log(newText);
}).catch(function (err) {
  console.log(err.code, err.message);
});

console.log('This is executed right after setTimeout()');

var map;


function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 59.3772200,
      lng: 28.1902800
    },
    zoom: 8
  });
}

function searchBlogger(){
  // console.log("buttun is pressed");
  var country = $("#country").val();
  var network = $("#network").val();
  var gender = $("#gender").val();
  var age = $("#age").val();
  var keywords = $("#keywords").val();
  console.log(country +" "+ network +" "+ gender +" "+ age +" "+ keywords);
  var whatToPutOnTable = '<tr> <td>Anna Pavlova</td> <td>@an.pvlv</td> <td>Narva</td> <td>'+country+'</td> <td>'+gender+'</td><td>'+age+'</td></tr>';
  document.getElementById("searchResults").insertRow(-1).innerHTML = whatToPutOnTable;
  //  $('#searchResults').append('<tr> td>Anna Pavlova</td> <td>@an.pvlv</td> <td>Narva</td> <td>Country</td> <td>Female</td><td>25-34</td></tr>');
  // '<tr> <td>1</td> <td>Anna Pavlova</td> <td>@an.pvlv</td> <td>Narva</td> <td>country</td> <td>Female</td><td>25-34</td></tr>';
 } 