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
  return data.animals.filter((animal, index) => animal.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  const calledAnimalObject = data.animals.filter(component => component.name === animal);
  return calledAnimalObject[0].residents.every(element => element.age >= age);
}

function employeeByName(employeeName) {
  if (employeeName === undefined) {
    return {};
  }
  const { employees } = data;
  const arrayOfObjects = employees.filter(employee =>
    employee.firstName === employeeName || employee.lastName === employeeName);
  return arrayOfObjects[0];
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}

function isManager(id) {
  const checkIfManager = data.employees.some((employee, index) => employee.managers[index] === id);
  return checkIfManager;
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
  return data.employees;
}

function animalCount(species) {
  if (species === undefined) {
    const list = {};
    data.animals.forEach((element) => {
      list[element.name] = element.residents.length;
    });
    return list;
  }
  const foundObject = data.animals.find(element => element.name === species);
  return foundObject.residents.length;
}

function entryCalculator(entrants) {
  if (entrants === undefined || Object.keys(entrants).length === 0) {
    return 0;
  }
  const { Adult: adult, Child: child, Senior: senior } = data.prices;
  const priceArray = [adult, child, senior];
  const { Adult: entryAdult = 0, Child: entryChild = 0, Senior: entrySenior = 0 } = entrants;
  const entryArray = [entryAdult, entryChild, entrySenior];
  const calculatingPrice = entryArray.map((element, index) => element * priceArray[index]);
  return calculatingPrice.reduce((acc, curr) => acc + curr);
}

function animalMapNoArgument(regions, list) {
  regions.forEach((element) => {
    list[element] = (data.animals.filter((item => 
      item.location === element))).map(item => item.name);
  });
  return list;
}

function animalMapArgument(regions, list, entry) {
  regions.forEach((element) => {
    list[element] = (data.animals.filter(item => 
      item.location === element)).map(item => item.name);
  });
  const { NE, NW, SE, SW } = list;
  const array = [NE, NW, SE, SW];
  let list2 = {'NE': [], 'NW': [], 'SE': [], 'SW': []};
  array.forEach((element, index) => {
    element.forEach(item => {
      let object = {};
      object[item] = ((data.animals.filter(animal => animal.name === item)).map(names => 
        names.residents))[0].map(final => final.name);
      list2[regions[index]].push(object);
    });
  });
  return list2;
}

function animalMapSorted(regions, list) {
  regions.forEach((element) => {
    list[element] = (data.animals.filter(item => 
      item.location === element)).map(item => item.name);
  });
  const { NE, NW, SE, SW } = list;
  const array = [NE, NW, SE, SW];
  let list2 = {'NE': [], 'NW': [], 'SE': [], 'SW': []};
  array.forEach((element, index) => {
    element.forEach(item => {
      let object = {};
      object[item] = (((data.animals.filter(animal => animal.name === item)).map(names => 
        names.residents))[0].map(final => final.name)).sort();
      list2[regions[index]].push(object);
    });
  });
  return list2
}

function animalMapBySex(regions, list, entry) {
  regions.forEach((element) => {
    list[element] = (data.animals.filter(item => 
      item.location === element)).map(item => item.name);
  });
  const { NE, NW, SE, SW } = list;
  const array = [NE, NW, SE, SW];
  let list2 = {'NE': [], 'NW': [], 'SE': [], 'SW': []};
  array.forEach((element, index) => {
    element.forEach(item => {
      let object = {};
      object[item] = ((((data.animals.filter(animal => animal.name === item)).map(names => 
        names.residents))[0]).filter(key => key.sex === entry.sex)).map(final => final.name);
      list2[regions[index]].push(object);
    });
  });
  return list2;
}

function animalMapBySexSorted(regions, list, entry) {
  regions.forEach((element) => {
    list[element] = (data.animals.filter(item => 
      item.location === element)).map(item => item.name);
  });
  const { NE, NW, SE, SW } = list;
  const array = [NE, NW, SE, SW];
  let list2 = {'NE': [], 'NW': [], 'SE': [], 'SW': []};
  array.forEach((element, index) => {
    element.forEach(item => {
      let object = {};
      object[item] = (((((data.animals.filter(animal => animal.name === item)).map(names =>
        names.residents))[0]).filter(key =>
          key.sex === entry.sex)).map(final => final.name)).sort();
      list2[regions[index]].push(object);
    });
  });
  return list2;
}

function animalMap(options) {
  const regions = ['NE', 'NW', 'SE', 'SW'];
  let list = {};

  if (!options) {
    list = animalMapNoArgument(regions, list);
  } 
  else if (options.includeNames === true) {
    if (options.sorted === true) {
      if (options.sex === 'male' || options.sex === 'female') {
        list = animalMapBySexSorted(regions, list, options);
      } else {
      list = animalMapSorted(regions, list);
      }
    }
    else if (options.sex === 'male' || options.sex === 'female') {
      list = animalMapBySex(regions, list, options);
    }
    else {
    list = animalMapArgument(regions, list);
    }
  } else {
    list = animalMapNoArgument(regions, list);
  }
  return list;
}

// console.log(animalMap({ includeNames: true, sex: 'female', sorted: true }));

function listIfNoArgument(week, objImport) {
  const list = {};
  objImport.forEach((element, index) => {
    if (index !== objImport.length - 1) {
      list[week[index]] = `Open from ${element.open}am until ${element.close - 12}pm`;
    } else {
      list[week[index]] = 'CLOSED';
    }
  });
  return list;
}

function listIfArgument(week, objImport, entry) {
  const list = {};
  week.forEach((element, index) => {
    if (element === entry) {
      if (index !== week.length - 1) {
        list[element] = `Open from ${objImport[index].open}am until ${objImport[index].close - 12}pm`;
      } else {
        list[element] = 'CLOSED';
      }
    }
  });
  return list;
}

function schedule(dayName) {
  const daysOfWeek = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Monday'];
  const { Tuesday: tue,
    Wednesday: wed,
    Thursday: thu,
    Friday: fri,
    Saturday: sat,
    Sunday: sun,
    Monday: mon } = data.hours;
  const hours = [tue, wed, thu, fri, sat, sun, mon];
  if (dayName === undefined) {
    return listIfNoArgument(daysOfWeek, hours);
  }
  return listIfArgument(daysOfWeek, hours, dayName);
}

function oldestFromFirstSpecies(id) {
  const { animals, employees } = data;
  let caredForAnimals;
  let residentAnimals;
  employees.forEach((element) => {
    if (element.id === id) {
      caredForAnimals = element.responsibleFor;
    }
  });
  animals.forEach((element) => {
    if (element.id === caredForAnimals[0]) {
      residentAnimals = element.residents;
    }
  });
  const oldestAnimal = residentAnimals.reduce((oldest, animal) =>
    ((oldest.age > animal.age) ? oldest : animal), 0);
  const { name, sex, age } = oldestAnimal;
  return [name, sex, age];
}

function increasePrices(percentage) {
  const mainObject = data.prices;
  const { Adult: adult, Child: child, Senior: senior } = mainObject;
  const priceArray = [adult, senior, child];
  const priceKeys = Object.keys(mainObject);
  const increasedPrices = priceArray.map(element => (
    ((element * ((percentage / 100) + 1)) * 100).toPrecision(4)) / 100);
  increasedPrices.forEach((element, index) => {
    mainObject[priceKeys[index]] = element;
  });
  return mainObject;
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
