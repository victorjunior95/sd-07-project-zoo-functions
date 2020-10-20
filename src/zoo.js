/*
eslint no-unused-vars: [
  'error',
  {
    'args': 'none',
    'vars': 'local',
    'varsIgnorePattern': 'data'
  }
]
*/

const data = require('./data');

const { animals } = data;

function animalsByIds(...ids) {
  return animals.filter((animal, index) => animal.id === ids[index]);
}
// console.log(animalsByIds())

function animalsOlderThan(animal, age) {
  const myAnimal = animals.find(animalName => animalName.name === animal);
  const compareResult = myAnimal.residents.every(
    animalGroup => animalGroup.age > age,
  );
  return compareResult;
}
// console.log(animalsOlderThan('otters', 7));

function employeeByName(employeeName) {
  const { employees } = data;
  let object = {};
  if (employeeName) {
    object = employees.filter(
      objectEmployer =>
        objectEmployer.firstName === employeeName ||
        objectEmployer.lastName === employeeName,
    )[0];
  }
  return object;
}
// console.log(employeeByName());

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  return { id, firstName, lastName, managers, responsibleFor };
}
// console.log(createEmployee(personalInfo, associatedWith));

function isManager(id) {
  const { employees } = data;
  return employees.some((employer, index) => employer.managers[index] === id);
}
// console.log(isManager('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'))

function addEmployee(
  id,
  firstName,
  lastName,
  managers = [],
  responsibleFor = [],
) {
  const { employees } = data;
  const newEmployee = { id, firstName, lastName, managers, responsibleFor };
  employees.push(newEmployee);
  return employees;
}
// console.log(addEmployee('4141da1c-a6ed-4cf7-90c4-99c657ba4ef3', 'Jane', 'Doe'));
// console.log(data.employees.length);

function animalCount(species) {
  const object = {};
  animals.forEach(animal => (object[animal.name] = animal.residents.length));
  return species === undefined ? object : object[species];
}
// console.log(animalCount('lions'));

function entryCalculator(entrants) {
  const { prices } = data;
  let value = 0;
  // for (let i in entrants) {
  //   value += entrants[i] * prices[i];
  // }
  for (let i = 0; i < Object.entries(entrants).length; i += 1) {
    if (prices[Object.keys(entrants)[i]]) {
      value += Object.values(entrants)[i] * prices[Object.keys(entrants)[i]];
    }
  }
  return value;
}
// console.log(entryCalculator({}));
// console.log(entryCalculator({ 'Child': 1, 'Senior': 1 }));

const namesResidentsLocation = (name, sex) => {
  const array = [];
  const arrayAll = [];

  animals
    .find(animal => animal.name === name)
    .residents.forEach((info) => {
      arrayAll.push(info.name);
      if (info.sex === sex) {
        array.push(info.name);
      }
    });
  if (sex) {
    return array;
  }
  return arrayAll;
};
// console.log(namesResidentsLocation('lions', 'female'));

const nameAnimals = (region, sort = false, sex) => {
  const array = [];
  let object;

  animals
    .filter(animal => animal.location === region)
    .forEach((animal) => {
      object = {};
      object[animal.name] = namesResidentsLocation(animal.name, sex);
      if (sort) {
        object[animal.name] = namesResidentsLocation(animal.name, sex).sort();
      }
      array.push(object);
    });

  return array;
};
// console.log(nameAnimals('NE'));

function animalMap(options) {
  const location = ['NE', 'NW', 'SE', 'SW'];
  const object = {};

  location.forEach(
    local =>
      (object[local] = animals
        .filter(animal => animal.location === local)
        .map(objectAnimal => objectAnimal.name)),
  );

  if (options !== undefined && options.includeNames !== undefined) {
    location.forEach(
      local =>
        (object[local] = nameAnimals(local, options.sorted, options.sex)),
    );
  }
  return object;
}
// console.log(animalMap());
// console.log(animalMap({ includeNames: true }).NE);
// console.log(animalMap({ includeNames: true, sorted: true }).NE);
// console.log(animalMap({ includeNames: true, sex: 'female', sorted: false}).NE);
// console.log(animalMap({ sex: 'female' }).NE[0]);

const dayNameExist = (dayName, result) => {
  for (let i = 0; i < Object.entries(result).length; i += 1) {
    if (Object.keys(result)[i] === dayName) {
      result = { [dayName]: result[dayName] };
    }
  }
  // for (let i in result) {
  //   if (i === dayName) {
  //     result = { [i]: result[i] };
  //   }
  // }
  return result;
};

function schedule(dayName) {
  const { hours } = data;
  // console.log(Object.values(hours[Object.keys(hours)[0]]))
  const result = {};
  for (let i = 0; i < Object.entries(hours).length; i += 1) {
    result[Object.keys(hours)[i]] = `Open from ${Object.values(hours[Object.keys(hours)[i]])[0]}am until ${Object.values(hours[Object.keys(hours)[i]])[1] - 12}pm`;

    if (Object.keys(result)[i] === 'Monday') {
      result[Object.keys(hours)[i]] = 'CLOSED';
    }
  }
  return dayName ? dayNameExist(dayName, result) : result;
}
// console.log(schedule());
// console.log(schedule('Tuesday'));

function oldestFromFirstSpecies(id) {
  const { employees } = data;

  let highestAge = 0;

  const arrayIdAnimals = employees.filter(employe => employe.id === id)[0]
    .responsibleFor;

  const arrayAnimal = animals.filter(
    animal => animal.id === arrayIdAnimals[0],
  );

  arrayAnimal[0].residents.forEach((info) => {
    if (info.age > highestAge) {
      highestAge = info.age;
    }
  });

  const result = arrayAnimal[0].residents.filter(
    info => info.age === highestAge,
  );

  return Object.values(result[0]);
}
// console.log(oldestFromFirstSpecies('9e7d4524-363c-416a-8759-8aa7e50c0992'));
// console.log(oldestFromFirstSpecies('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));

function increasePrices(percentage) {
  const { prices } = data;
  const result = {};
  Object.entries(prices).forEach((price, index) => {
    // console.log(price);
    result[Object.keys(prices)[index]] = Object.values(prices)[index];
    result[Object.keys(prices)[index]] += (Object.values(prices)[index] * percentage) / 100;
    result[Object.keys(prices)[index]] = Math.round(result[Object.keys(prices)[index]] * 100) / 100;
  });
  // for (const i in result) {
  //   result[i] += (result[i] * percentage) / 100;
  //   result[i] = Math.round(result[i] * 100) / 100;
  // }
  return result;
}
// console.log(increasePrices(50));

const arraysId = (index) => {
  const { employees } = data;
  const result = [];
  const arrayId = employees.map(employe => employe.responsibleFor);

  arrayId[index].forEach((id) => {
    result.push(animals.filter(animal => animal.id === id)[0].name);
  });

  return result;
};
// console.log(arraysId())

const firstAndLastName = (idOrName, result) => {
  let name2;
  for (let i = 0; i < Object.entries(result).length; i += 1) {
    name2 = Object.keys(result)[i].split(' ');
    for (let j = 0; j < name2.length; j += 1) {
      if (name2[j] === idOrName) {
        result = { [Object.keys(result)[i]]: result[Object.keys(result)[i]] };
      }
    }
    // name2.forEach((names) => {
    // console.log(name);
    // if (names === idOrName) {
    //   result = { [Object.keys(result)[i]]: result[Object.keys(result)[i]] };
    // }
    // });
  }
  return result;
};
// console.log(firstAndLastName('Wilburn', {
//     'Nigel Nelson': ['lions', 'tigers'],
//     'Burl Bethea': ['lions', 'tigers', 'bears', 'penguins'],
//     'Ola Orloff': ['otters', 'frogs', 'snakes', 'elephants'],
//     'Wilburn Wishart': ['snakes', 'elephants'],
//     'Stephanie Strauss': ['giraffes', 'otters'],
//     'Sharonda Spry': ['otters', 'frogs'],
//     'Ardith Azevado': ['tigers', 'bears'],
//     'Emery Elser': ['elephants', 'bears', 'lions']
//   }))

const nameId = (idOrName, result) => {
  const { employees } = data;
  const name = `${employees.find(employe => employe.id === idOrName)
    .firstName} ${employees.find(employe => employe.id === idOrName).lastName}`;
  // console.log(name);

  for (let i = 0; i < Object.entries(result).length; i += 1) {
    if (Object.keys(result)[i] === name) {
      result = { [name]: result[name] };
    }
  }
  // for (const i in result) {
  //   if (i === name) {
  //     result = { [i]: result[i] };
  //   }
  // }
  return result;
};
// console.log(nameId('4b40a139-d4dc-4f09-822d-ec25e819a5ad', {
//   'Nigel Nelson': ['lions', 'tigers'],
//   'Burl Bethea': ['lions', 'tigers', 'bears', 'penguins'],
//   'Ola Orloff': ['otters', 'frogs', 'snakes', 'elephants'],
//   'Wilburn Wishart': ['snakes', 'elephants'],
//   'Stephanie Strauss': ['giraffes', 'otters'],
//   'Sharonda Spry': ['otters', 'frogs'],
//   'Ardith Azevado': ['tigers', 'bears'],
//   'Emery Elser': ['elephants', 'bears', 'lions']
// }))


const idOrNameExist = (idOrName, result) => {
  const { employees } = data;

  if (employees.find(employe => employe.id === idOrName)) {
    result = nameId(idOrName, result);
  }

  result = firstAndLastName(idOrName, result);
  return result;
};

function employeeCoverage(idOrName) {
  const { employees } = data;
  const result = {};

  employees.forEach((employe, index) => {
    result[`${employe.firstName} ${employe.lastName}`] = arraysId(index);
  });

  if (idOrName !== undefined) {
    return idOrNameExist(idOrName, result);
  }
  return result;
}
// console.log(employeeCoverage());
// console.log(employeeCoverage('4b40a139-d4dc-4f09-822d-ec25e819a5ad'));
// console.log(employeeCoverage('Stephanie'));
// console.log(employeeCoverage('Azevado'));

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
