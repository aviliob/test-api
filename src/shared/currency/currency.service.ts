import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { CurrencyEnum, CURRENCY_CONVERTER_API } from 'src/constants';

@Injectable()
export class CurrencyService {
  constructor(private http: HttpService) {}

  async getCurrencyRates(currency: CurrencyEnum) {
    // const result = await firstValueFrom(this.http.get(CURRENCY_CONVERTER_API));

    let currencyInfo: {
      base: string;
      rates: { EUR: number; USD: number; CLP: number };
    };
    //Mock
    if (currency === CurrencyEnum.CLP) {
      currencyInfo = {
        base: 'CLP',
        rates: {
          EUR: 898.35,
          USD: 865.9,
          CLP: 1,
        },
      };
    } else if (currency === CurrencyEnum.EUR) {
      currencyInfo = {
        base: 'EUR',
        rates: {
          CLP: 0.0011,
          USD: 1.04,
          EUR: 1,
        },
      };
    } else if (currency === CurrencyEnum.USD) {
      currencyInfo = {
        base: 'USD',
        rates: {
          CLP: 0.0012,
          EUR: 0.96,
          USD: 1,
        },
      };
    }

    return currencyInfo;
  }
}
