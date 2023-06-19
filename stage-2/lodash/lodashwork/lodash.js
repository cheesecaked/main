var _ = require("lodash");
// Fourteenth
// let products = [
//     { product: "banana", hasGMO: true },
//     { product: "apple", hasGMO: false },
//     { product: "orange", hasGMO: false },
//   ];
// console.log(_.values(products))
// Thirteenth
// let products = [
//     { product: "banana", hasGMO: true },
//     { product: "apple", hasGMO: false },
//     { product: "orange", hasGMO: false },
//   ];

// let ans = _.findKey(products, { hasGMO: true });
// console.log(ans)
// Twelth
// var a = {a: 1}
// var b = {b: 2}

// var combine = _.merge(a, b)
// console.log(combine)

// Eleventh
// var interception = _.random(1, 7)
// console.log(interception)

// Tenth
// var numbers = [10, 4]
// var sum = _.sumBy(numbers)
// console.log(sum)

//Ninth
//var val = [1, 2, 3, 4]

// var max_val = _.max(val)
// console.log(max_val)

// Eighth
// var numbers = [1, 1]
// var numbers2 = [1, 1]
// var compare = ''
// compare = _.isEqual(numbers, numbers2)
// console.log(compare)

// Seventh
// var numbers = [1, 2, 3];
// var numbers2 = [1, 2, 4]
// var listOfNumbers = '';
// listOfNumbers = _.xor(numbers, numbers2);;
// console.log(listOfNumbers);

// Sixth
// var arr1 = [1, 2, 3, 4]
// var arr2 = [5, 6, 7, 8]

// var listOfNumbers = _.union(arr1, arr2)
// console.log(listOfNumbers);

// Fifth
// var arr = [1, 2, 3, 4]
// var arr2 = [2, 5, 6, 7]

// var listOfNumbers = _.intersectionWith(arr, arr2, _.isEqual)
// console.log(listOfNumbers)

// Fourth
// var numbers = [1, 2, 3, 4]

// _.fill(numbers, '0');
// console.log(numbers);

// Third
// var Products = [
//   { product: "banana", hasGMO: true },
//   { product: "apple", hasGMO: false },
//   { product: "orange", hasGMO: false },
// ];

// var listOfFruits = _.findIndex(Products, function (product) {
//   return !product.hasGMO;
// });

// listOfFruits = _.findIndex(Products, ["hasGMO", true]);
// console.log(listOfFruits);

// Second
// var products = [
//   { product: "banana", hasGMO: true },
//   { product: "apple", hasGMO: false },
//   { product: "orange", hasGMO: false },
// ];
// var listOfFruits = '';
// listOfFruits = _.differenceWith(products, [{ product: "banana", hasGMO: true }], _.isEqual);
// console.log(listOfFruits);

// First
var numbers = [1, 2, 3];
var numbers2 = [1, 2, 4]
var listOfNumbers = '';
listOfNumbers = _.difference(numbers,numbers2);
console.log(listOfNumbers);
