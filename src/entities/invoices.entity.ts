export interface InvoiceEntity {
  invoiceId: number;
  vendorId: number;
  invoiceNumber: string;
  invoiceDate: string;
  invoiceDatetime: any;
  invoiceTotal: number;
  creditTotal: number;
  bankId: number;
  invoiceDueDate: string;
  paymentDate: string;
  paymentTotal: number;
  currency: string;
  id: string;
}

export class InvoiceResponse {
  invoiceId: number;
  vendorId: number;
  invoiceNumber: string;
  invoiceTotal: number;
  paymentTotal: number;
  creditTotal: number;
  bankId: number;

  constructor(data: InvoiceEntity) {
    this.invoiceId = data.invoiceId;
    this.vendorId = data.vendorId;
    this.invoiceNumber = data.invoiceNumber;
    this.invoiceTotal = data.invoiceTotal;
    this.paymentTotal = data.paymentTotal;
    this.creditTotal = data.creditTotal;
    this.bankId = data.bankId;
  }
}
