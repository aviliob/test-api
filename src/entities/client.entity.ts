export interface ClientEntity {
  clientId: number;
  name: string;
  internalCode: string;
  tributaryId: number;
  currency: 'USD' | 'EUR' | 'CLP';
  quota: number;
  banks: number[];
  id: string;
}
