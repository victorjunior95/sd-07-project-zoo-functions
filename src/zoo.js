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

const data = require('./data');

const { animals } = data;
const { employees } = data;
const { prices } = data;
const { hours } = data;

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
  return employees.some(item => item.managers.includes(id));
}

/*

6- Implemente a função addEmployee:

Adiciona um funcionário no fim da lista

*/

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
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

const createArrAnimalsForLocation = (arrOfLocation) => {
  const arrAnimalsFromNE = [];
  const arrAnimalsFromNW = [];
  const arrAnimalsFromSE = [];
  const arrAnimalsFromSW = [];

  animals.forEach((object) => {
    if (object.location === arrOfLocation[0]) arrAnimalsFromNE.push(object.name);
    if (object.location === arrOfLocation[1]) arrAnimalsFromNW.push(object.name);
    if (object.location === arrOfLocation[2]) arrAnimalsFromSE.push(object.name);
    if (object.location === arrOfLocation[3]) arrAnimalsFromSW.push(object.name);
  });

  return [arrAnimalsFromNE, arrAnimalsFromNW, arrAnimalsFromSE, arrAnimalsFromSW];
};

const createArrLocal = () => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set (Hamaji);

  const arrOfLocation = new Set();
  animals.forEach(object => arrOfLocation.add(object.location));
  return [...arrOfLocation];
};

const getSex = (arrOfObjects, sex) => {
  let sexArr = arrOfObjects.map((animal) => {
    if (animal.sex === sex) return animal;
    return false;
  });
  sexArr = sexArr.filter(element => element);
  return sexArr;
};

const arrForNames = (animal, sex) => {
  let arrOfObjects = animals.filter(item => item.name === animal);

  arrOfObjects = arrOfObjects[0];
  arrOfObjects = arrOfObjects.residents;
  if (sex !== undefined) arrOfObjects = getSex(arrOfObjects, sex);
  return arrOfObjects.map(item => item.name);
};

const initialObject = (arrOfNames, arrOfLocation) => arrOfLocation
.reduce((result, local, index) => {
  result[local] = arrOfNames[index];
  return result;
}, {});

const functionForIncludeNames = (arrOfLocation, testOne, sorted, sex) => {
  const expectedInArr = arrOfLocation.map((local) => {
    const animalsForLocation = testOne[local];

    return animalsForLocation.map((animal) => {
      const expectedObject = {};
      const expectedValue = arrForNames(animal, sex);
      if (sorted) expectedValue.sort();
      expectedObject[animal] = expectedValue;
      return expectedObject;
    });
  });
  return initialObject(expectedInArr, arrOfLocation);
};

function animalMap(options) {
  let result;

  const arrOfLocation = createArrLocal();
  const arrNamesForLocation = createArrAnimalsForLocation(arrOfLocation);

  if (options === undefined) return initialObject(arrNamesForLocation, arrOfLocation);

  const { includeNames } = options;

  if (includeNames) {
    const { sorted } = options;
    const { sex } = options;

    result = functionForIncludeNames(
      arrOfLocation,
      initialObject(arrNamesForLocation, arrOfLocation),
      sorted,
      sex,
    );
  } else {
    result = initialObject(arrNamesForLocation, arrOfLocation);
  }
  return result;
}

/*

10- Implemente a função schedule:

Sem parâmetros, retorna um cronograma legível para humanos

Se um único dia for passado, retorna somente este dia em um formato legível para humanos

*/

const withoutParameters = (days) => {
  const expectedValues = Object.values(days);
  const exepectedKeys = Object.keys(days);

  expectedValues.forEach(({ open, close }, index) => {
    expectedValues[index] = `Open from ${open}am until ${close - 12}pm`;
    if (open + close === 0) expectedValues[index] = 'CLOSED';
  });

  return exepectedKeys.reduce((result, keys, index) => {
    result[keys] = expectedValues[index];
    return result;
  }, {});
};

function schedule(dayName) {
  if (dayName === undefined) return withoutParameters(hours);

  const expectedValue = Object.values(hours[dayName]);
  const [open, close] = expectedValue;
  const result = {};

  result[dayName] = `Open from ${open}am until ${close - 12}pm`;

  if (open + close === 0) result[dayName] = 'CLOSED';

  return result;
}

/*

11- Implemente a função oldestFromFirstSpecies:

Passado o id de um funcionário, encontra a primeira espécie de animal gerenciado pelo funcionário,
e retorna um array com nome, sexo e idade do animal mais velho dessa espécie

*/

const getSpecie = (id) => {
  const employ = employees.find(objects => objects.id === id);
  const specie = animals.find(object => object.id === employ.responsibleFor[0]);
  const { residents } = specie;
  return residents;
};

function oldestFromFirstSpecies(id) {
  const residents = getSpecie(id);

  const expectedInfo = residents.reduce((result, object) => {
    if (object.age > result.age) return object;
    return result;
  });
  return Object.values(expectedInfo);
}

/*

12- Implemente a função increasePrices:

Ao passar uma porcentagem, incrementa todos os preços, arrendondados em
duas casas decimais

*/

function increasePrices(percentage) {
  const arrOfPrices = Object.values(prices);
  const arrOfType = Object.keys(prices);

  arrOfPrices.forEach((currentPrice, index) => {
    currentPrice += (currentPrice * percentage) / 100;
    currentPrice = Math.round(currentPrice * 100) / 100;
    prices[arrOfType[index]] = currentPrice;
  });
}

/*

13- Implemente a função employeeCoverage:

Sem parâmetros, retorna uma lista de funcionários e os animais pelos quais eles são responsáveis

Com o id de um funcionário, retorna os animais pelos quais o funcionário é responsável

Com o primeiro nome de um funcionário, retorna os animais pelos quais o funcionário é responsável

Com o último nome de um funcionário, retorna os animais pelos quais o funcionário é responsável

*/

const createExpectedObject = (employee, result) => {
  const valuesForResult = [];

  employee.responsibleFor.forEach((id) => {
    const currentAnimal = animals.find(animal => animal.id === id);

    valuesForResult.push(currentAnimal.name);

    result[`${employee.firstName} ${employee.lastName}`] = valuesForResult;
  });
  return result;
};

const getAllEmployessAndAnimals = () => employees
.reduce((result, employee) => createExpectedObject(employee, result), {});

const getRealParameter = (idOrName) => {
  const currentObject = employees.find(employee => employee.id === idOrName
  || employee.firstName === idOrName
  || employee.lastName === idOrName);

  const result = {};
  return createExpectedObject(currentObject, result);
};

function employeeCoverage(idOrName) {
  if (!idOrName) return getAllEmployessAndAnimals();

  return getRealParameter(idOrName);
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
