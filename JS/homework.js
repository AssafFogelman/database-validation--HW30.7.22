class Computer {
  cpu;
  gpu;
  #ram;
  constructor(cpu, gpu, ram) {
    this.cpu = cpu;
    this.gpu = gpu;
    if (ram > 0) {
      this.#ram = ram;
    }
  }
}

class Laptop extends Computer {
  screenSize;
  keyBoard;
  battery;
}

let lenovo = new Computer(1, 2, -40);
console.log(lenovo);

///*********************************************** */

class UserCard {
  //defining the class
  firstName;
  lastName;
  password;
  email;
  static isValidPassword(password) {
    if (password.length < 6 || password.length > 12) return undefined;
    if (password.includes("if") === false) return undefined;
    return password;
  }
  static isValidEmail(email) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      return email;
    }
    return undefined;
  }
  constructor(firstName, lastName, password, email) {
    this.firstName = this.isValidFirstname(firstName);
    this.lastName = this.isValidLastname(lastName);
    this.password = password; //the input is being checked by the outside static function
    this.email = email; //the input is being checked by the outside static function
  }
  isValidFirstname(firstName) {
    return /^\d/.test(firstName) ? undefined : firstName; //does the name start with a digit
  }
  isValidLastname(lastName) {
    return /^\d/.test(lastName) ? undefined : lastName; //does the name start with a digit
  }
}

let arrayOfUsers = [];
let currentItemIndex = 0;
let showncardNumber = 0; //is incremented only when a card is shown so it will show a user's number

const handleInput = () => {
  //1.handleInput creates a new object in "arrayOfUsers",
  //2.sends information in, using the static functions and the constructor.
  //3. then it checks if any key is unidentified, and if so, makes all keys unidentified
  //4.if all of the keys are filled, is calls the function "creatcards()"

  let firstNameInput = document.querySelector("#firstnameId");
  let lastNameInput = document.querySelector("#lastnameId");
  let passwordInput = document.querySelector("#passwordId");
  let emailInput = document.querySelector("#emailId");

  //inserting the input using the filters
  arrayOfUsers[currentItemIndex] = new UserCard(
    firstNameInput.value,
    lastNameInput.value,
    UserCard.isValidPassword(passwordInput.value),
    UserCard.isValidEmail(emailInput.value)
  );
  //checking if the user has any undefined (error) keys
  console.log(
    "arrayOfUsers[currentItemIndex]:",
    arrayOfUsers[currentItemIndex]
  );
  arrayOfUsers[currentItemIndex] = arrayOfUsers[currentItemIndex];
  for (let key in arrayOfUsers[currentItemIndex]) {
    console.log("current key:", key);
    console.log(
      "arrayOfUsers[currentItemIndex][key]",
      arrayOfUsers[currentItemIndex][key]
    );

    if (arrayOfUsers[currentItemIndex][key] === undefined) {
      console.log("there was a problem with the input");
      for (let objectKey in arrayOfUsers[currentItemIndex]) {
        arrayOfUsers[currentItemIndex].objectKey = undefined;
      } //if so, cleans the user's data and creates a blank object
      currentItemIndex++; //moves to the next object
      return;
    }
  }
  showCards();
  currentItemIndex++; //moves to the next object
};

//goes from 0 to "currentItemIndex" and checks if the item is undefined. if it's not, it creates a card owith the details.
const showCards = () => {
  let gridDiv = document.querySelector(".usercardsgrid");
  let object = arrayOfUsers[currentItemIndex];

  console.log("we got to showing cards");
  if (isObjectUndefined(object)) return;
  console.log("the current object in the array was not undefined");
  showncardNumber++; //increments the number of cards shown
  gridDiv.innerHTML += `
    <div class="col">
      <div class="card" style="width: 18rem;">
        <img src="http://cdn.onlinewebfonts.com/svg/img_76927.png" class="card-img-top" alt="anonymous person">
        <div class="card-body">
          <h5 class="card-title">User no.${showncardNumber}</h5>
          <p class="card-text">Full Name: ${object.firstName} ${object.lastName}</p>
          <p class="card-text">Password: ${object.password} </p>
          <p class="card-text">Email: ${object.email} </p>
        </div>
      </div>
    </div>`;
};

const isObjectUndefined = (object) => {
  let firstkey;
  for (let key in object) firstkey = object[key]; //gives "firstkey" the value of the first key of the object
  console.log("the first key is:", firstkey);
  return firstkey === undefined ? true : false;
};

const clearDatabase = () => {
  let firstNameInput = document.querySelector("#firstnameId");
  let lastNameInput = document.querySelector("#lastnameId");
  let passwordInput = document.querySelector("#passwordId");
  let emailInput = document.querySelector("#emailId");
  firstNameInput.value =
    lastNameInput.value =
    passwordInput.value =
    emailInput.value =
      "";
  currentItemIndex = 0;
  showncardNumber = 0;
  let gridDiv = document.querySelector(".usercardsgrid");
  gridDiv.innerHTML = "";
};
