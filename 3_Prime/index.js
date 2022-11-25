console.log("Raunak Mishra");
// function to check whether X is prime or not
function isPrime(x) {
  if (x <= 1) return false;
  if (x <= 3) return true;

  if (x % 2 == 0 || x % 3 == 0) {
    return false;
  }

  for (let i = 5; i * i <= x; i = i + 6) {
    if (x % i == 0 || x % (i + 2) == 0) {
      return false;
    }
  }
  return true;
}

// function to find next prime number after x
function nextPrime(x) {
  if (x <= 1) return 2;

  let prime = x;
  let found = false;

  while (!found) {
    prime++;

    if (isPrime(prime)) {
      found = true;
    }
  }

  return prime;
}

let x = 13;

// now Checking whether X is prime or not :-
if (isPrime(x) == true) {
  console.log("It is a Prime number");
} else {
  console.log("It is not a Prime number");
}

// next Prime number is :-
console.log("Next Prime number is : " + nextPrime(x));
// Difference between next Prime number after X and X is :-
console.log(
  "Difference between next Prime number after X axd X is : " +
    (nextPrime(x) - x)
);
