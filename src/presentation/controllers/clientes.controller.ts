import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Ok } from '../responses/success.types';
import { CreateClientesDto } from 'src/application/DTOs/clientes/create-clientes.dto';
import { ClientesService } from 'src/application/services/clientes.service';

@Controller('/clientes')
export class ClientesController {
  constructor( 
    private readonly _clientesService: ClientesService
  ) {}
  
  @Get()
  public async findAllClientes() {
    const clientes = this._clientesService.findAll();
    return Ok(clientes);
  }
  @Get()
  public async findByPrimaryClientes(@Param('id') id: string) {
    const clientes = this._clientesService.findByPrimary(id);
    return Ok(clientes);
  }
  @Post()
  public async add(
    @Body() createclientesDto: CreateClientesDto,
    @Param('id') id:string) {
    const clientes = this._clientesService.createClientes(createClientesDto, id);
    return clientes
  }
  @Delete()
  public async delete(@Param('id') id: string) {
    const clientes = this._clientesService.deleteClientes(
      id,
    );
    return Ok(clientes);
  }
}

