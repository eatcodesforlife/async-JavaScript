// AJAX  Requests or Asynchronous JavaScript And XML(nowadays JSON is preferred than XML)
//  - communicates w/ a server by making an HTTP request to a server
//  -

// vanilla js method
// window.onload = () => {
//   let http = new XMLHttpRequest();
//   http.onreadystatechange = () => {
//     if (http.readyState === 4 && http.status === 200) {
//       //   console.log(JSON.parse(http.response));
//     }
//   };
//   http.open("GET", "data/tweets.json", true);
//   http.send();
//   //   console.log("test");

//   // jquery method

//   $.get("data/tweets.json", (data) => {
//     console.log(data);
//   });
// };
// console.log("test");

/* ready states

0 - request is initialized
1 - request state has been setup
2 - request has been sent
3 - request is in process
4 - request is complete

*/

// callback functions are functions that are passed in as parameters

// synchronous callback:

// let fruits = ["apple", "banana", "mango"];

// fruits.forEach((fruit) => console.log(fruit));

// async callbacks
/*
window.onload = () => {
  function errorHandler(jqXHR, textStatus, error) {
    console.log(error);
  }
  $.ajax({
    type: "GET",
    url: "data/tweets.json",
    success: cbTweets,
    error: errorHandler,
  });

  function cbTweets(data) {
    console.log(data);
    $.ajax({
      type: "GET",
      url: "data/friends.json",
      success: cbFriends,
      error: errorHandler,
    });
  }

  function cbFriends(data) {
    console.log(data);
    $.ajax({
      type: "GET",
      url: "data/videos.json",
      success: (data) => {
        console.log(data);
      },
      error: errorHandler,
    });
  }
};

*/

// promises are place holder object in which we can register our callbacks for success or failure
/* vanilla 

function get(url) {
  return new Promise((resolve, reject) => {
    let http = new XMLHttpRequest();

    http.open("GET", url, true);
    http.onload = () => {
      if (http.status == 200) {
        resolve(JSON.parse(http.response));
      } else {
        reject(http.statusText);
      }
    };

    http.onerror = () => {
      reject(http.statusText);
    };
    http.send();
  });
}

let promise = get("data/tweets.json");

promise
  .then((tweets) => {
    console.log(tweets);
    return get("data/friends.json");
  })
  .then((friends) => {
    console.log(friends);
    return get("data/videos.json");
  })
  .then((videos) => {
    console.log(videos);
  })
  .catch((error) => {
    console.log(error);
  });

*/

/*

*** promise using jquery

$.get("data/tweets.json")
  .then((tweets) => {
    console.log(tweets);
    return $.get("data/friends.json");
  })
  .then((friends) => {
    console.log(friends);
    return $.get("data/videos.json");
  })
  .then((videos) => {
    console.log(videos);
  })
  .catch((error) => {
    console.log(error);
  });

*/

/* Generators


genWrap(function* () {
  let tweets = yield $.get("data/tweets.json");
  let friends = yield $.get("data/friends.json");
  let videos = yield $.get("data/videos.json");

  console.log(tweets);
  console.log(friends);

  console.log(videos);
});

function genWrap(generator) {
  let gen = generator();

  function handle(yielded) {
    if (!yielded.done) {
      yielded.value.then((data) => {
        return handle(gen.next(data));
      });
    }
  }

  return handle(gen.next());
}


*/

// async-await
// - async keyword is part of es8 or es2017
// - you can declare any function in JS as async
// - aync functions always return a promise
// - inside async functions, you can write code that looks synchronous even if isn't

// - inside async function, we can use the await keyword
// - await pauses the execution of the async function
// - can await any async operation returning a promise(eg other async functions)
// - the await keyword waits for promise to resolve & extracts its resolved value
// - it then resumes the async function's execution
// - think of await keyword like a pause button

async function getStarWarsData() {
  console.log("start!");

  let movieData = await $.getJSON("https://swapi.dev/api/people/");

  console.log("done");

  console.log(movieData);
}

// getStarWarsData();

let starWars = {
  genre: "Sci-fi",
  async logMovie() {
    let url = "https://swapi.dev/api/films/";
    let movies = await $.getJSON(url);
    console.log(movies.results);
  },
};

// starWars.logMovie();

// async-await in class

class Planets {
  constructor(id) {
    this.id = id;
  }

  async logPlanet() {
    let url = `https://swapi.dev/api/planets/${this.id}/`;
    let planet = await $.getJSON(url);
    console.log(planet.name);
  }
}

let planetOne = new Planets(1);

// planetOne.logPlanet();

//handling errors

async function getUser(user) {
  try {
    let url = `https://api.github.com/users/${user}`;
    let logUser = await $.getJSON(url);
    console.log(`${logUser.name}: ${logUser.bio}`);
  } catch (e) {
    console.log("No user found!");
  }
}

// refactoring

let baseURL = "https://swapi.dev/api/planets";

/* ugly code - callback hell

$.getJSON(`${baseURL}/1/`, (p1) => {
  console.log(`The first planet is ${p1.name}`);
  $.getJSON(`${baseURL}/2/`, (p2) => {
    console.log(`The first planet is ${p2.name}`);
    $.getJSON(`${baseURL}/3/`, (p3) => {
      console.log(`The first planet is ${p3.name}`);
    });
  });
});

*/

// refactoring w/ promises and .then
/*
  $.getJSON(`${baseURL}/1/`, (p1) => {
    console.log(`The first planet is ${p1.name}`);
    return $.getJSON(`${baseURL}/2/`);
  })
    .then((p2) => {
      console.log(`The second planet is ${p2.name}`);
      return $.getJSON(`${baseURL}/3/`);
    })
    .then((p3) => {
      console.log(`The 3rd planet is ${p3.name}`);
      return $.getJSON(`${baseURL}/3/`);
    });

*/

// async-await

async function starWarsPlanet(url) {
  let p1Promise = $.getJSON(`${url}/1/`);
  let p2Promise = $.getJSON(`${url}/2/`);
  let p3Promise = $.getJSON(`${url}/3/`);

  let p1 = await p1Promise;
  let p2 = await p2Promise;
  let p3 = await p3Promise;

  console.log(`The 1st planet is ${p1.name}`);
  console.log(`The 2nd planet is ${p2.name}`);
  console.log(`The 3rd planet is ${p3.name}`);
}

// starWarsPlanet(baseURL);

function pause(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function doSomething() {
  let p1 = pause(1000);
  let p2 = pause(1000);
  let p3 = pause(1000);

  await p1;
  await p2;
  await p3;

  console.log("all done");
}

doSomething();
