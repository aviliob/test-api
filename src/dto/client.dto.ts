import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';

export class ClientModificationDTO {
  @ApiProperty({
    description: 'ID del cliente',
    example: 1,
  })
  @IsNumber()
  clientId: number;

  @ApiProperty({
    description: 'ID tributario',
    example: 433,
  })
  @IsNumber()
  tributaryId: number;

  @ApiProperty({
    description: 'Moneda en la que opera (USD, EUR o CLP)',
    example: 'USD',
  })
  @IsEnum({ USD: 'USD', EUR: 'EUR', CLP: 'CLP' })
  currency: 'USD' | 'EUR' | 'CLP';
}

export class ClientDTO {
  @ApiProperty({
    description: 'ID del cliente',
    example: 1,
  })
  @IsNumber()
  clientId: number;

  @ApiProperty({
    description: 'Nombre del cliente',
    example: 'Cliente Prueba',
  })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Código interno',
    example: 'CP10',
  })
  @IsString()
  internalCode: string;

  @ApiProperty({
    description: 'ID tributario',
    example: 433,
  })
  @IsNumber()
  tributaryId: number;

  @ApiProperty({
    description: 'Moneda en la que opera (USD, EUR o CLP)',
    example: 'USD',
  })
  @IsEnum({ USD: 'USD', EUR: 'EUR', CLP: 'CLP' })
  currency: 'USD' | 'EUR' | 'CLP';

  @ApiProperty({
    description: 'Cuota mensual de llamadas a la API',
    example: 1000,
  })
  @IsNumber()
  quota: number;

  @ApiProperty({
    description:
      'Conjunto de registros de bancos a los que tiene acceso (representados como un arreglo de enteros',
    type: [Number],
    example: [12, 233, 422],
  })
  @IsArray()
  banks: number[];
}
