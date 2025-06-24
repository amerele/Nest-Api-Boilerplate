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
            {
                //CREATES DTO
                type: 'add',
                path: '../src/microsservico/application/components/{{camelCase name}}/dto/{{camelCase name}}.dto.ts',
                templateFile: './templates/microsservico/dto/index.generator.dto.hbs',
                skipIfExists: true,
            },
            {
                //CREATES MODULE
                type: 'add',
                path: '../src/microsservico/application/components/{{camelCase name}}/{{camelCase name}}.module.ts',
                templateFile: './templates/microsservico/index.generator.module.hbs',
                skipIfExists: true,
            },
            {
                //CREATES CONTROLLER
                type: 'add',
                path: '../src/microsservico/application/components/{{camelCase name}}/controller/{{camelCase name}}.controller.ts',
                templateFile: './templates/microsservico/controller/index.generator.controller.hbs',
                skipIfExists: true,
            },
            {
                //CREATES REPOSITORY
                type: 'add',
                path: '../src/microsservico/application/components/{{camelCase name}}/repository/{{camelCase name}}.repository.ts',
                templateFile: './templates/microsservico/repository/index.generator.repository.hbs',
                skipIfExists: true,
            },
            {
                //CREATE SERVICE
                type: 'add',
                path: '../src/microsservico/application/components/{{camelCase name}}/service/{{camelCase name}}.service.ts',
                templateFile: './templates/microsservico/service/index.generator.service.hbs',
                skipIfExists: true,
            },
            {
                //CREATE SCHEMA
                type: 'add',
                path: '../src/microsservico/application/components/{{camelCase name}}/schema/{{camelCase name}}.schema.ts',
                templateFile: './templates/microsservico/schema/index.generator.schema.hbs',
                skipIfExists: true,
            },
            {
                //CREATE INTERFACE
                type: 'add',
                path: '../src/microsservico/application/infraestructure/interfaces/I{{titleCase name}}.interface.ts',
                templateFile: './templates/microsservico/interface/index.generator.interface.hbs',
                skipIfExists: true,
            },

            {
                //CREATE ROUTES NO MONÓLITO
                type: 'add',
                path: '../src/monolito/{{camelCase name}}/routes.js',
                templateFile: './templates/monolito/route/index.generator.routes.hbs',
                skipIfExists: true,
            },

            {
                //CREATE CONTROLLER NO MONÓLITO
                type: 'add',
                path: '../src/monolito/{{camelCase name}}/controller.js',
                templateFile: './templates/monolito/controller/index.generator.controller.hbs',
                skipIfExists: true,
            },

        ],
    });
};
