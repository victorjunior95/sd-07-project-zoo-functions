
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

const { animals, hours, employees, prices } = require('./data');


function animalsByIds(...ids) {
  // por causa dos ... é necessario o index para capturar o elemento correto
  // se passar um id ou varios vai dar no mesmo
  if (ids.length === 0) return [];
  return animals.filter((busca, index) => busca.id === ids[index]);
}

function animalsOlderThan(animal, age) {
  const nomes = animals.find(busca => busca.name === animal);
  // o metodo find vai me retornar o objeto correspondente a condição
  // filter vai me retornar cada objeto especifico que satisfez a condiçao
  // map vai me retornar true ou false para cada ojeto que satisfez
  return nomes.residents.every(idade => idade.age >= age);
  // de residents para age eu entro em um objeto e portando preciso de um loop para
  // acessá lo
  // every vai aplicar para todos os elementos dentro daquele objeto a seguinte condição
  // e se todos os elementos cumprirem aquela condiçao me retorna true se nao false
  /*
   OUTRA FORMA
   let v = true DEVE SE ATRIBUIR PARA INCREMNTAR NO FOR EACH
   nomes.residents.forEach((element) => {
    if (element.age < age) {
      v = false;
    }
  });
  return v
  */
}

function employeeByName(employeeName) {
  if (typeof employeeName === 'undefined') return {};
  return employees.find(nome =>
    (nome.firstName === employeeName) || (nome.lastName === employeeName));
  // find encontra os elementos que atendem à expressão solicitada que
  // sejam descendentes do seletor.
  // filter, por outro lado, filtra e devolve todos
  // os elementos que coincidam com o seletor e também a expressão filtrada.
  // outra diferençaa é que o filter me retorna um  objeto dentro de um array
  // e o find me devolve uma copia identica do objeto selecionado
}

function createEmployee(personalInfo, associatedWith) {
  return { ...personalInfo, ...associatedWith };
  // vai criar um objeto,  contendo as informaçoes passadas
  // para cada duas informaços forma um objeto,
  // essas duas informaços nao precisao ter um tamanho especificado e irao formar
  // um unico objeto contendo as duas informaçoes juntas
}

function isManager(id) {
  let administradores = employees.find(busca => busca.managers);
  // tenho como retorno desse map todos os managers em um array dentro de um array
  // o filter me retorna o objeto inteiro
  // o find vai me retornar somente o primeiro
  administradores = administradores.reduce((acc, item) => {
    item.forEach(elemento => acc.push(elemento));
    return acc;
  }, []).includes(id);
  // O método includes() determina se um array contém um determinado elemento,
  // retornando true ou false apropriadamente.
  // administradores vai conter exatamento os managers com um array dentro de outro
  // depois com o reduce eu vou percorrer o primeiro array e cada item desse array
  // representa outro array com os ids , vou percorrer esse segundo array com um foreach
  // e acrescentar no acumulador cada id formando um array unico com todos os ids
  // e utilizando o includes eu verifico se o array pssado consta na lista e me retorna
  // true ou false
  return administradores;
  }

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  employees.push({ id, firstName, lastName, managers, responsibleFor });
}

function animalCount(species) {
/*
const vazio = {}
animals.forEach(elemento => {
  vazio[elemento.name] = elemento.residents.length
})
*/
  if (typeof species === 'undefined') {
    return animals.reduce((acumulador, item) => {
      acumulador[item.name] = item.residents.length;
    // desta forma o acumulador recebe os nomes dos animais
    // desta forma acumulador.item.name ele tenta buscar os nomes mais ainda
    // nao tem nada no acumulador para ser buscado
    // o acumulador sempre recebe ele mesmo e o proximo item
      return acumulador;
    }, {});
  }
  const umaEspecie = animals.find(busca => busca.name === species);
  // o find me retorna o objeto exato
  // o filter e o map me retornam dentro de arrays
  return umaEspecie.residents.length;
}

function entryCalculator(entrants) {
  if (typeof entrants === 'undefined') return 0;
  const { Adult = 0, Child = 0, Senior = 0 } = entrants;
  // desse modo eu preciso passar os mesmos nomes das variaveis internas
  // essas variaves vao ser numericas começando com o valor 0 inicialmente
  // const vai {variaveis } vai receber a entrada e atribuir um novo valor a cada uma
  const precoAdulto = prices.Adult * Adult;
  const precoIdoso = prices.Senior * Senior;
  const precoCrianca = prices.Child * Child;
  const total = precoAdulto + precoIdoso + precoCrianca;
  return total;
  // FOREAC NAO RETORNA NADA
  if (entrants === undefined || Object.entries(entrants).length === 0) return 0;
  return Object.entries(entrants).map((busca) => {
    if (busca[0] === 'Adult') return busca[1] * 49.99;
    if (busca[0] === 'Senior') return busca[1] * 24.99;
    return busca[1] * 20.99;
  }).reduce((acumulador, item) => {
    acumulador += item;
    return acumulador;
  }, 0)
}

function animalMap(options) {
  // seu código aqui
}

function schedule(...dayName) {
  // map reduce e filter so funcionam com arrays e não objetos
  if (dayName.length === 0) {
    dayName = Object.keys(hours);
  }
  return dayName.reduce((acc, elemento) => {
    acc[elemento] = `Open from ${hours[elemento].open}am until ${hours[elemento].close - 12}pm`;
    if (elemento === 'Monday') {
      acc[elemento] = 'CLOSED';
    }
    return acc;
  }, {});
}

function oldestFromFirstSpecies(id) {
  const funcionario = employees.find(busca => (busca.id === id));
  const animalComMesmoID = animals.find(busca => busca.id === funcionario.responsibleFor[0]);
  const maisVelho = animalComMesmoID.residents.reduce((acc, item) => {
    if (acc.age < item.age) { // vai comparar o acumulador com todos os itens e retornar sempre
    // o maior item e se esse item for maior que todos os outros
    // ele é retornado se nao o acc retorna
      return item;
    }
    return acc;
  });
  const arrayFinal = Object.values(maisVelho);
  return arrayFinal;
}

function increasePrices(percentage) {
  /*
  const valores = Object.values(prices)
  const chaves = Object.keys(prices)
  return valores.reduce((acc, item, index) => {
    return acc[chaves[index]] = (Math.round(item*percentage)/100 + item).toPrecision(4)
  }, {})
  */
  // o for each acrescenta no objeto diretamente , sobrescreve o array original
  const modificaValor = Object.values(prices);
  const chaves = Object.keys(prices);
  modificaValor.forEach((elemento, indice) => {
    const novoValor = elemento + (elemento * (percentage / 100));
    prices[chaves[indice]] = Math.round(novoValor * 100) / 100;
  });
}

function employeeCoverage(idOrName) {
  if (idOrName === undefined) idOrName = employees;
  else if (idOrName.split('').length > 20) {
    idOrName = employees.filter(busca => busca.id === idOrName);
  } else {
    idOrName = employees.filter(busca => busca.firstName === idOrName ||
       busca.lastName === idOrName);
  }
  return idOrName.reduce((acc, item) => {
    acc[`${item.firstName} ${item.lastName}`] = item.responsibleFor.map(cadaid =>
      animals.find(busca => busca.id === cadaid).name);
      // com o map eu vou conseguir  comparar exatamente cada item dentro de responsibleFor
      // e para cada comparação eu vou buscar usando o  find um objeto inteiro do animal
      // que se relaciona com aquele id dentro  de responsibleFor , e então trazer o nome do animal
    return acc;
  }, {});
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
