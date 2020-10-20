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

function animalsByIds(...ids) {
  let listOfAnimals = [];
  if (ids !== undefined) {
    listOfAnimals = data.animals.filter(
      (animal, index) => animal.id === ids[index],
    );
  }

  return listOfAnimals;
}

function animalsOlderThan(animal, age) {
  const requiredAnimal = data.animals.filter(element => element.name === animal);
  return requiredAnimal[0].residents.every(resident => resident.age >= age);
}

function employeeByName(employeeName) {
  let employeeObject = {};
  if (employeeName !== undefined) {
    employeeObject = data.employees.find(employee =>
      (employee.firstName === employeeName || employee.lastName === employeeName));
  }
  return employeeObject;
}

function createEmployee(personalInfo, associatedWith) {
  // const employee = Object.assign({}, personalInfo, associatedWith)
  const employee = { ...personalInfo, ...associatedWith };
  return employee;
}

function isManager(id) {
  return data.employees.some(employee =>
    employee.managers.some(element => element === id));
}

function addEmployee(id, firstName, lastName, managers, responsibleFor) {
  const employee = {};
  employee.id = id;
  employee.firstName = firstName;
  employee.lastName = lastName;
  employee.managers = Array.isArray(managers) ? managers : [];
  employee.responsibleFor = Array.isArray(responsibleFor) ? responsibleFor : [];
  return data.employees.push(employee);
}

function animalCount(species) {
  if (species !== undefined) {
    const specieCount = data.animals.find(animal => animal.name === species);
    return specieCount.residents.length;
  }
  const speciesPopulation = {};
  data.animals.map(animal =>
    Object.assign(speciesPopulation, { [animal.name]: animal.residents.length }),
  );
  return speciesPopulation;
}

function entryCalculator(entrants = Object) {
  return Object.keys(entrants).reduce((acc, currentKey) =>
    acc + (entrants[currentKey] * data.prices[currentKey]), 0);
}

const animalList = location =>
  data.animals.filter(animal => animal.location === location).map(animal => animal.name);

const animalListExtended = (location, sorted, sex) => {
  sorted = (sorted !== undefined) ? sorted : false;
  sex = (sex !== undefined) ? sex : '';

  let animalTypes = animalList(location);
  let doido = {}
  let animalNames = [];

  animalTypes.forEach(specie =>  {
    animalNames = data.animals.find(animal => animal.name === specie).residents.map(redident => redident.name);
    if (sorted === true) {
      animalNames = animalNames.sort()
    }
    Object.assign(doido, { [specie]: animalNames });
  });
    // console.log(doido)
    return doido


};

  // const options = {
  //   includeNames: true,
  //   sorted: false,
  //   sex: 'male', //'female' or 'male'
  // }

function animalMap(...options) {
  let animalLocations = []
  data.animals.map((animal) => {
    if (!animalLocations.some(element => element === animal.location)) {
      animalLocations.push(animal.location)
    }
  });

  let animalMapObject = {};
// ------------------------
  // console.log(`Op: ${options.length} e typeof ${typeof options}`)

 if (options.length > 0) {
  const [{includeNames, sorted, sex}] = options;
  // console.log(`includeNames: ${includeNames}, sorted: ${sorted}, sex: ${sex}.`)

  if (includeNames) {
    animalLocations.map(location => {
      let teste = animalListExtended(location, sorted, sex);
      // console.log(teste)
      Object.assign(
        animalMapObject,
        { [location]: Object.assign(
          {},
            teste
          )
        }
      )
      }
    );
  } else {
    animalLocations.map(location => {
      Object.assign(animalMapObject, { [location]: animalList(location)}));
    }
      
  }
 }

  return animalMapObject
}

// console.log(animalMap(options))

const formatHour = value => ((value > 12) ? `${value - 12}pm` : `${value}am`);

function schedule(dayName) {
  const mensage = {};
  let schArray = [];

  if (Object.entries(data.hours).some(schDay => schDay[0] === dayName)) {
    schArray.push([dayName, data.hours[dayName]]);
  } else {
    schArray = Object.entries(data.hours);
  }

  schArray.map((element) => {
    let value = 'CLOSED';
    if (element[1].open !== 0) {
      value = `Open from ${formatHour(element[1].open)} until ${formatHour(element[1].close)}`;
    }
    return Object.assign(mensage, { [element[0]]: value });
  });

  return mensage;
}

function oldestFromFirstSpecies(id) {
  const requireEmployee = data.employees.find(employee => employee.id === id);
  const animals = data.animals.filter(animal => animal.id === requireEmployee.responsibleFor[0]);
  return (
    Object.values(animals[0].residents.reduce(
      (acc, current) => (acc.age > current.age ? acc : current)))
  );
}

function increasePrices(percentage) {
  const tax = 1 + (percentage / 100);
  Object.entries(data.prices).map(price =>
    (data.prices[price[0]] = Math.round((data.prices[price[0]] * tax) * 100) / 100),
  );
}

const animalCoverage = arrayEmployerr =>
  arrayEmployerr.responsibleFor.map(animalId =>
    (data.animals.find(animal => animal.id === animalId).name));

function employeeCoverage(idOrName) {
  if (idOrName !== undefined) {
    const requiredEmployee = data.employees.find(employee => (
      employee.id === idOrName ||
      employee.firstName === idOrName ||
      employee.lastName === idOrName
    ));
    return { [`${requiredEmployee.firstName} ${requiredEmployee.lastName}`]: animalCoverage(requiredEmployee) };
  }

  const listEmployeeCoverage = {};
  data.employees.map(employee =>
    Object.assign(listEmployeeCoverage, { [`${employee.firstName} ${employee.lastName}`]: animalCoverage(employee) }),
  );
  return listEmployeeCoverage;
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
