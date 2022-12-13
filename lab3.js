//problem 1
let handler = {
  set(obj, prop, value) {
    if (prop in obj) {
      if (prop === "name") {
        if (value.length == 7) {
          obj[prop] = value;
        } else {
          throw "Name must be 7 char";
        }
      }
      if (prop === "address") {
        if (typeof value === "string") {
          obj[prop] = value;
        } else {
          throw "Address must be string only";
        }
      }
      if (prop === "age") {
        if (typeof value === "number" && value > 25 && value < 60) {
          obj[prop] = value;
        } else {
          throw "Age must be number and between 25 and 60";
        }
      }
    } else {
      throw "This prop not exit";
    }
  },
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    } else {
      throw "This prop not exit";
    }
  },
};
let obj = {
  name: "selviaa",
  address: "cairo",
  age: 26,
};
let objProxy = new Proxy(obj, handler);
objProxy.name = "sara so";
objProxy.address = "Giza";
console.log(objProxy);
//objProxy.ag = 27; //throw exception prop not exist
//console.log(objProxy.n); //throw exception prop not exist

//problem 2
class shape {
  constructor(w, h) {
    this.width = w;
    this.height = h;
  }
  GetArea() {
    return `calculate area`;
  }
  GetParameter() {
    return `calculate parameter`;
  }
}
class rectangle extends shape {
  static count = 0;
  constructor(w, h) {
    rectangle.count++;
    super(w, h);
  }
  GetArea() {
    return `Rectangle Area = ${this.width * this.height}`;
  }
  GetParameter() {
    return `Rectangle Parameter = ${2 * (this.width + this.height)}`;
  }
  static getcount() {
    return rectangle.count;
  }
}
rectangle.prototype.toString = function () {
  console.log(
    `I'm Rectangle with width=${this.width}, height=${
      this.height
    }, ${this.GetArea()}, ${this.GetParameter()}`
  );
};
class square extends shape {
  constructor(len) {
    super(len, len);
  }
  GetArea() {
    return `Square Area = ${this.width * this.height}`;
  }
  GetParameter() {
    return `Square Parameter = ${4 * this.width}`;
  }
}
square.prototype.toString = function () {
  console.log(
    `I'm Square with length=${
      this.width
    }, ${this.GetArea()}, ${this.GetParameter()}`
  );
};

class circle extends shape {
  constructor(w, h, r) {
    super(w, h);
    this.radius = r;
  }
  GetArea() {
    return `Circle Area = ${Math.PI * this.radius * this.radius}`;
  }
  GetParameter() {
    return `Circle Parameter = ${2 * Math.PI * this.radius}`;
  }
}
circle.prototype.toString = function () {
  console.log(
    `I'm Circle with raduis=${
      this.radius
    }, ${this.GetArea()}, ${this.GetParameter()}`
  );
};
/* Q2: a)
display area and parameter for each shape
*/
let rectangle1 = new rectangle(4, 5);
let square1 = new square(6);
let circle1 = new circle(4, 5, 3);

/* Q2: b)
overriding toString()
*/
rectangle1.toString();
square1.toString();
circle1.toString();

/* Q2: c)
display count of objects created from rectangle class 
*/
let rectangle2 = new rectangle(4, 5);
console.log(`count= ${rectangle.getcount()}`); //will display 2

//problem 3
//a)
function* Fibonacci1(num, current = 0, next = 1) {
  let i = 0;
  while (i < num) {
    yield current;
    [current, next] = [next, current + next];
    i++;
  }
}
let res1 = Fibonacci1(6); //will display 0, 1, 1, 2, 3, 5
for (let i of res1) {
  console.log(i);
}

//b)
function* Fibonacci2(num, current = 0, next = 1) {
  while (current <= num) {
    yield current;
    [current, next] = [next, current + next];
  }
}
let res2 = Fibonacci2(100); //will display 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89
for (let i of res2) {
  console.log(i);
}

//problem 4
let o = {
  name: "selvia",
  age: 22,
  address: "cairo-egypt",
};
o[Symbol.iterator] = function () {
  let keys = Object.keys(this);
  let values = Object.values(this);
  let i = 0;
  return {
    next: () => {
      if (i < keys.length) {
        let res = { value: `${keys[i]} : ${values[i]}`, done: false };
        i++;
        return res;
      } else {
        return { value: undefined, done: true };
      }
    },
  };
};
for (let item of o) {
  console.log(item);
}

//problem 5
var fruits = ["apple", "strawberry", "banana", "orange", "mango"];
/* 1)
	test that every element in the array is a string 
 */
fruits.forEach(function (fruit) {
  if (typeof fruit == "string") {
    console.log(`${fruit} is a string`);
  } else {
    console.log(`${fruit}  is not a string`);
  }
});

/* 2)
	test that some of array elements starts with "a" 
 */
fruits.map((fruit) => {
  if (fruit.startsWith("a")) {
    console.log(`${fruit} starts with a`);
  }
});

/** 3)
 	generate new array filtered from the given array with only elements that starts with "b" or "s"
 */
let newarr = fruits.filter((fruit) => {
  if (fruit.startsWith("b") || fruit.startsWith("s")) {
    return fruit;
  }
});
console.log(newarr); //will display strawberry & banana
