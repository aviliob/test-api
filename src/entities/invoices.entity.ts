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
  invoiceTotal: string;
  paymentTotal: string;
  creditTotal: string;
  bankId: number;

  constructor(data: any) {
    this.invoiceId = data.invoiceId;
    this.vendorId = data.vendorId;
    this.invoiceNumber = data.invoiceNumber;
    this.bankId = data.bankId;

    this.setAmounts(data);
  }

  private setAmounts(data: any) {
    this.invoiceTotal = data.currencyInfo
      ? `${data.invoiceTotal * data.currencyInfo.rates[data.currency]} ${
          data.currencyInfo.base
        }`
      : `${data.invoiceTotal} ${data.currency} `;

    this.paymentTotal = data.currencyInfo
      ? `${data.paymentTotal * data.currencyInfo.rates[data.currency]} ${
          data.currencyInfo.base
        }`
      : `${data.paymentTotal} ${data.currency}`;

    this.creditTotal = data.currencyInfo
      ? `${data.creditTotal * data.currencyInfo.rates[data.currency]} ${
          data.currencyInfo.base
        }`
      : `${data.creditTotal} ${data.currency}`;
  }
}
