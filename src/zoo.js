/*
eslint no-unused-vars: [
  "error",
  {
    "args": "none",
    "vars": "local",
    "varsIgnorePattern": "data"
  }
]
*/

const { animals } = require('./data');
const data = require('./data');

/*

1- Implemente a função animalsByIds:

  Caso receba nenhum parâmetro, necessário retornar um array vazio
  Ao receber como parâmetro um único id, retorna os animais com este id
  Ao receber mais de um id, retorna os animais que têm um desses ids

*/

// HoF includes = (Murilo Wolf);
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes

function animalsByIds(...rest) {
  return animals.filter(objects => rest.includes(objects.id));
}

/*

2- Implemente a função animalsOlderThan:

Ao passar o nome de uma espécie e uma idade, testa se todos os animais desta espécie
possuem a idade mínima especificada

*/

function animalsOlderThan(animal, age) {
  const currentAnimal = animals.find(animalsObject => animalsObject.name === animal);
  const { residents } = currentAnimal;
  return residents.every(item => item.age > age);
}

/*

3- Implemente a função employeeByName:

Sem parâmetros, retorna um objeto vazio

Quando provido o primeiro nome do funcionário, retorna o objeto do funcionário

Quando provido o último nome do funcionário, retorna o objeto do funcionário

*/

function employeeByName(employeeName) {
  const { employees } = data;
  const [expectedObject = {}] = employees.filter(item => item
    .firstName === employeeName || item.lastName === employeeName);
  return expectedObject;
}

/*

4- Implemente a função createEmployee:

Cria um novo colaborador a partir de objetos contendo informações pessoais
e gerentes e animais gerenciados.

*/

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const expectedObject = { id, firstName, lastName, managers, responsibleFor };
  return expectedObject;
}

/*

5- Implemente a função isManager:

Testa se o id passado é de um gerente

*/

function isManager(id) {
  const { employees } = data;
  return employees.some(item => item.managers.includes(id));
}

/*

6- Implemente a função addEmployee:

Adiciona um funcionário no fim da lista

*/

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  const { employees } = data;
  const newEmployee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  employees.push(newEmployee);
}

/*

7- Implemente a função animalCount:

Sem parâmetros, retorna animais e suas quantidades

Com o nome de uma espécie de animal, retorna somente a quantidade

*/
  // resident.length
function animalCount(species) {
  if (species) {
    const expectedObject = animals.find(item => item.name === species);
    return expectedObject.residents.length;
  }
  return animals.reduce((result, item) => {
    const currentName = item.name;
    const currentLength = item.residents.length;
    result[currentName] = currentLength;
    return result;
  }, {});
}

/*

8- Implemente a função entryCalculator:

Retorna 0 se nenhum argumento for passado

Retorna 0 se um objeto vazio for passado

Retorna o preço total a ser cobrado dado o número de adultos, crianças e idosos

*/

function entryCalculator(entrants = {}) {
  if (Object.keys(entrants).length === 0) return 0;
  const { prices } = data;
  const keysOfEntrants = Object.keys(entrants);
  return keysOfEntrants.reduce((result, item) => {
    const valueByAge = entrants[item] * prices[item];
    result += valueByAge;
    return result;
  }, 0);
}

/*

9- Implemente a função animalMap:

-> Sem parâmetros, retorna animais categorizados por localização

-> Com a opção includeNames: true especificada, retorna nomes de animais

-> Com a opção sorted: true especificada, retorna nomes de animais ordenados

-> Com a opção sex: 'female' ou sex: 'male' especificada, retorna
  somente nomes de animais macho/fêmea

-> Com a opção sex: 'female' ou sex: 'male' especificada e
  a opção sort: true especificada, retorna somente nomes de
  animais macho/fêmea com os nomes dos animais ordenados

-> Só retorna informações ordenadas e com sexo se a opção includeNames: true for especificada

*/

const getNames = () => {
  return animals.reduce((result, item) => {
    result[item.location] = animals.reduce((valueResult, position) => {
      if (item.location === position.location) valueResult.push(position.name);
      return valueResult;
    }, []);
    return result;
  }, {});
}

const includesTrue = () => {
  const names = getNames();
  const lions = animals.reduce((result, item) => {
    const { residents } = animals;
    if(item.name === 'lions') residents.forEach((position) => result.push(position.name));
    return result;
  }, []);
  // const { NE, NW, SE, SW } = names
  // const { residents } = animals;
  // console.log(residents.);
  // console.log(NE);
  // console.log(NW);
  // console.log(SE);
  // console.log(SW);
  // const expectedResult = animals.reduce((result, item) => {
  //   result[item.location] = animals.reduce((valueResult, position) => {
  //     if (item.location === position.location) valueResult.push(position.name);
  //   }, []);
  //   return result;
  // }, {});
  // console.log(expectedResult);
}

const haveOptions = (options) => {
  if (options.includeNames) includesTrue();
  if (options.sorted) sortedTrue();
  if (options.sex === 'female') sexFemale();
  if (options.sex === 'male') sexMale();
}

function animalMap(options) { 
  if (options === undefined) return getNames();
  return haveOptions(options);
}

/*

10- Implemente a função schedule:

Sem parâmetros, retorna um cronograma legível para humanos

Se um único dia for passado, retorna somente este dia em um formato legível para humanos

*/

const withoutParameters = (hours) => {
  const expectedValues = Object.values(hours);
  const exepectedKeys = Object.keys(hours);
  
  expectedValues.forEach(({ open, close }, index) => {
    expectedValues[index] = `Open from ${open}am until ${close - 12}pm`
    if (open + close === 0) expectedValues[index] = 'CLOSED';
  });

  return exepectedKeys.reduce((result, keys, index) => {
    result[keys] = expectedValues[index];
    return result;
  }, {});
}


function schedule(dayName) {
  const { hours } = data;
  if (dayName === undefined) return withoutParameters(hours);

  const expectedValue = Object.values(hours[dayName]);
  const [open, close] = expectedValue;
  const result = {};

  result[dayName] = `Open from ${open}am until ${close - 12}pm`;

  if (open + close === 0) result[dayName] = 'CLOSED';

  return result;
}

function oldestFromFirstSpecies(id) {
  // seu código aqui
}

function increasePrices(percentage) {
  // seu código aqui
}

function employeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  entryCalculator,
  schedule,
  animalCount,
  animalMap,
  animalsByIds,
  employeeByName,
  employeeCoverage,
  addEmployee,
  isManager,
  animalsOlderThan,
  oldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
