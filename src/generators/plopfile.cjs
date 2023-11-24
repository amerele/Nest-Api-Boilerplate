module.exports = function (plop) {
  plop.setGenerator('resource', {
    description: 'creates resources',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'nome do recurso a ser criado:',
      }
    ],
    actions: [
       /* {
        //CREATES CREATE-DTO
        type: 'add',
        path: '../src/resources/{{kebabCase name}}/dto/create-{{kebabCase name}}.dto.ts',
        templateFile: './templates/dto/create.generator.hbs',
        skipIfExists: true,
      }, */
      /*
      {
        //CREATES UPDATE-DTO
        type: 'add',
        path: '../src/resources/{{kebabCase name}}/dto/update-{{kebabCase name}}.dto.ts',
        templateFile: './templates/dto/update.generator.hbs',
        skipIfExists: true,
      },
      */

       {
        //CREATE MODULE
        type: 'add',
        path: '../src/resources/{{kebabCase name}}/{{kebabCase name}}.module.ts',
        templateFile: './templates/index.generator.module.hbs',
        skipIfExists: true,
      },
      /* {
        //CREATES CONTROLLER
        type: 'add',
        path: '../src/resources/{{kebabCase name}}/controller/{{kebabCase name}}.controller.ts',
        templateFile: './templates/controller/index.generator.controller.hbs',
        skipIfExists: true,

      },

      {
        //CREATES ENTITIES
        type: 'add',
        path: '../src/entities/{{kebabCase name}}.entity.ts',
        templateFile: './templates/entities/index.generator.hbs',
        skipIfExists: true,
      },
      {
        //CREATES REPOSITORY
        type: 'add',
        path: '../src/resources/{{kebabCase name}}/repositories/{{kebabCase name}}.repository.ts',
        templateFile: './templates/repositories/index.generator.hbs',
        skipIfExists: true,
      },
      {
        //CREATE SERVICE
        type: 'add',
        path: '../src/resources/{{kebabCase name}}/services/{{kebabCase name}}.service.ts',
        templateFile: './templates/services/index.generator.service.hbs',
        skipIfExists: true,
      }, */
      
    ],
  });
};
