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
  return (data.animals.filter(species => ids.some(id => id === species.id)));
}

function animalsOlderThan(animal, age) {
  return data.animals.find(species => species.name === animal)
              .residents.every(resident => resident.age > age);
}

function employeeByName(employeeName) {
  return data.employees.reduce((returnObj, item) => {
    if ((item.firstName === employeeName) || (item.lastName === employeeName)) {
      return item;
    }
    return returnObj;
  }, {});
}

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
}

function isManager(id) {
  return data.employees.some(employee => employee.managers.some(managerId => managerId === id));
}

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  });
}

function animalCount(species) {
  if (data.animals.some(specieName => specieName.name === species)) {
    return data.animals.find(animal => animal.name === species).residents.length;
  }

  return (data.animals.reduce((objReturn, objCurrent) =>
    Object.assign(objReturn, { [objCurrent.name]: objCurrent.residents.length })
  , {}));
}

function entryCalculator(entrants = {}) {
  return (Object.keys(entrants).reduce((sum, currentValue) =>
    sum + (entrants[currentValue] * data.prices[currentValue])
  , 0));
}

function animalMap(options = {}) {
  const { includeNames = false, sorted = false, sex = false } = options;
  const objReturn = {};
  data.animals.forEach((specie) => {
    // if (!objReturn.hasOwnProperty(specie.location)) {
    if (!Object.hasOwnProperty.call(objReturn, specie.location)) {
      Object.assign(objReturn, { [specie.location]: [] });
    }

    if (!includeNames) {
      objReturn[specie.location].push(specie.name);
    } else {
      const arrayResidents = specie.residents.filter(resident => (resident.sex === sex) || (!sex));
      const names = arrayResidents.map(resident => resident.name);
      if (sorted) {
        names.sort();
      }
      const objAnimals = { [specie.name]: names };
      objReturn[specie.location].push(objAnimals);
    }
  });
  return (objReturn);
}

function ampm(hour) {
  if (hour > 12) {
    return (`${hour - 12}pm`);
  }
  return (`${hour}am`);
}

function schedule(dayName = false) {
  const schedules = {};
  const arrSchedules = Object.entries(data.hours);
  arrSchedules.forEach((element) => {
    if (element[1].open === element[1].close) {
      Object.assign(schedules, { [element[0]]: 'CLOSED' });
    } else {
      Object.assign(schedules, { [element[0]]: `Open from ${ampm(element[1].open)} until ${ampm(element[1].close)}` });
    }
  });
  if (Object.hasOwnProperty.call(schedules, dayName)) {
    return { [dayName]: schedules[dayName] };
  }
  return (schedules);
}

function oldestFromFirstSpecies(id) {
  const firstAnimalId = data.employees.find(employee => employee.id === id)
                  .responsibleFor[0];
  const oldestAnimal = data.animals.find(animal => animal.id === firstAnimalId)
                  .residents.reduce((maxAgeElement, element) => {
                    if (element.age > maxAgeElement.age) {
                      return element;
                    }
                    return maxAgeElement;
                  });
  return [oldestAnimal.name, oldestAnimal.sex, oldestAnimal.age];
}

function increasePrices(percentage) {
  const increaseAdult = data.prices.Adult * (percentage / 100);
  const adult = Math.round((data.prices.Adult + increaseAdult) * 100) / 100;
  data.prices.Adult = adult;

  const increaseSenior = data.prices.Senior * (percentage / 100);
  const senior = Math.round((data.prices.Senior + increaseSenior) * 100) / 100;
  data.prices.Senior = senior;

  const increaseChild = data.prices.Child * (percentage / 100);
  const child = Math.round((data.prices.Child + increaseChild) * 100) / 100;
  data.prices.Child = child;
}

function returnObjEmployee(employee) {
  const obj = {};
  Object.assign(obj, {
    [`${employee.firstName} ${employee.lastName}`]: employee.responsibleFor.map(animalsId =>
      data.animals.find(animal => animal.id === animalsId).name,
    ),
  });
  return obj;
}

function findEmployee(key, idOrName) {
  return data.employees.find(employee => employee[key] === idOrName);
}

function findByIdOrName(idOrName) {
  let objEmployee = {};
  objEmployee = findEmployee('id', idOrName);

  if (objEmployee === undefined) {
    objEmployee = findEmployee('firstName', idOrName);
  }

  if (objEmployee === undefined) {
    objEmployee = findEmployee('lastName', idOrName);
  }

  return objEmployee;
}

function employeeCoverage(idOrName) {
  const obj = {};
  if (idOrName === undefined) {
    data.employees.forEach((employee) => {
      Object.assign(obj, returnObjEmployee(employee));
    });
  } else {
    const objEmployee = findByIdOrName(idOrName);
    Object.assign(obj, returnObjEmployee(objEmployee));
  }
  return obj;
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
