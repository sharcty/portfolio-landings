export type QuoteStep = 1 | 2 | 3 | 4 | 5;
export type QuoteField = 'streetAddress' | 'zipCode' | 'fullName' | 'email' | 'phone';
export type QuotePropertyType =
  | 'Single-Family Home'
  | 'Commercial Facility'
  | 'Luxury Estate';
export type QuoteBatteryOption =
  | 'None'
  | '1x Powerwall (13.5 kWh)'
  | '2x Whole-Home Backup';

export const quotePropertyOptions = [
  {
    id: 'Single-Family Home',
    sub: 'Pitched or Flat Roof',
    iconName: 'home'
  },
  {
    id: 'Luxury Estate',
    sub: 'High-Load + EV / Pool',
    iconName: 'landmark'
  },
  {
    id: 'Commercial Facility',
    sub: 'Warehouse / Office / HOA',
    iconName: 'building'
  }
] as const satisfies readonly {
  id: QuotePropertyType;
  sub: string;
  iconName: string;
}[];

export const quoteBatteryOptions = [
  {
    id: 'None',
    title: 'Solar Only (Grid-Tied Net Metering)',
    badge: 'Lowest Upfront Cost'
  },
  {
    id: '1x Powerwall (13.5 kWh)',
    title: '1x Powerwall (13.5 kWh Essential Backup)',
    badge: 'Most Popular'
  },
  {
    id: '2x Whole-Home Backup',
    title: '2x Whole-Home Backup (27 kWh + Central AC)',
    badge: '100% Off-Grid Ready'
  }
] as const satisfies readonly {
  id: QuoteBatteryOption;
  title: string;
  badge: string;
}[];

export type QuoteFormValues = {
  propertyType: QuotePropertyType | '';
  roofCondition: string;
  streetAddress: string;
  zipCode: string;
  fullName: string;
  email: string;
  phone: string;
};

export type QuoteStepTransition = {
  nextStep: QuoteStep;
  error: string;
  touchedFields: QuoteField[];
  submitted: boolean;
};

export function isValidQuoteZip(zipCode: string): boolean {
  return /^\d{5}$/.test(zipCode.trim());
}

export function isValidQuoteAddress(address: string): boolean {
  return address.trim().length >= 5;
}

export function isValidQuoteName(name: string): boolean {
  return name.trim().length >= 2;
}

export function isValidQuoteEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function getQuotePhoneDigits(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function isValidQuotePhone(phone: string): boolean {
  return getQuotePhoneDigits(phone).length === 10;
}

export function getQuoteStepTransition(
  step: QuoteStep,
  values: QuoteFormValues
): QuoteStepTransition {
  switch (step) {
    case 1:
      return values.propertyType && values.roofCondition
        ? { nextStep: 2, error: '', touchedFields: [], submitted: false }
        : {
            nextStep: 1,
            error: 'Please select your property type and roof condition.',
            touchedFields: [],
            submitted: false
          };
    case 2:
      return { nextStep: 3, error: '', touchedFields: [], submitted: false };
    case 3:
      if (!isValidQuoteAddress(values.streetAddress)) {
        return {
          nextStep: 3,
          error: 'Please enter a valid street address (at least 5 characters).',
          touchedFields: ['streetAddress', 'zipCode'],
          submitted: false
        };
      }
      if (!isValidQuoteZip(values.zipCode)) {
        return {
          nextStep: 3,
          error: 'Please enter a valid 5-digit US ZIP code.',
          touchedFields: ['streetAddress', 'zipCode'],
          submitted: false
        };
      }
      return {
        nextStep: 4,
        error: '',
        touchedFields: ['streetAddress', 'zipCode'],
        submitted: false
      };
    case 4:
      if (!isValidQuoteName(values.fullName)) {
        return {
          nextStep: 4,
          error: 'Please enter your full name.',
          touchedFields: ['fullName', 'email', 'phone'],
          submitted: false
        };
      }
      if (!isValidQuoteEmail(values.email)) {
        return {
          nextStep: 4,
          error: 'Please enter a valid email address for your 3D roof report.',
          touchedFields: ['fullName', 'email', 'phone'],
          submitted: false
        };
      }
      if (!isValidQuotePhone(values.phone)) {
        return {
          nextStep: 4,
          error: 'Please enter a complete 10-digit phone number.',
          touchedFields: ['fullName', 'email', 'phone'],
          submitted: false
        };
      }
      return {
        nextStep: 5,
        error: '',
        touchedFields: ['fullName', 'email', 'phone'],
        submitted: true
      };
    case 5:
      return { nextStep: 5, error: '', touchedFields: [], submitted: false };
  }
}

export function getPreviousQuoteStep(step: QuoteStep): QuoteStep {
  switch (step) {
    case 1:
    case 2:
      return 1;
    case 3:
      return 2;
    case 4:
      return 3;
    case 5:
      return 4;
  }
}

export type QuoteProposalMetrics = {
  systemSizeKw: number;
  grossSystemCost: number;
  federalItcCredit: number;
  netSystemCost: number;
  estimatedMonthlySavings: number;
};

export function calculateQuoteProposal(
  propertyType: QuotePropertyType,
  monthlyBill: number,
  batteryOption: QuoteBatteryOption
): QuoteProposalMetrics {
  const propertyMultiplier =
    propertyType === 'Commercial Facility'
      ? 1.25
      : propertyType === 'Luxury Estate'
      ? 1.12
      : 1;
  const systemSizeKw = Number(
    Math.max(4.8, (monthlyBill / 28) * propertyMultiplier).toFixed(1)
  );
  const batteryCost =
    batteryOption === '2x Whole-Home Backup'
      ? 21500
      : batteryOption === '1x Powerwall (13.5 kWh)'
      ? 11800
      : 0;
  const grossSystemCost = Math.round(systemSizeKw * 2850 + batteryCost);
  const federalItcCredit = Math.round(grossSystemCost * 0.3);

  return {
    systemSizeKw,
    grossSystemCost,
    federalItcCredit,
    netSystemCost: grossSystemCost - federalItcCredit,
    estimatedMonthlySavings: Math.round(monthlyBill * 0.86)
  };
}

export type SolarPaymentMode = 'loan' | 'cash';

export type SolarFinancialModel = {
  estKw: string;
  federalCredit: number;
  netCost: number;
  year1ReductionPct: number;
  net25YearSavings: number;
  paybackLabel: string;
  monthlyLoanPayment: number;
  yearsData: {
    year: number;
    noSolarCum: number;
    solarCum: number;
    netSavings: number;
  }[];
};

export function calculateSolarFinancialModel(
  monthlySpend: number,
  utilityInflationRate: number,
  paymentMode: SolarPaymentMode,
  includeStorage: boolean
): SolarFinancialModel {
  const estKw = Math.max(5.2, monthlySpend / 27);
  const storageAddon = includeStorage ? 11800 : 0;
  const grossCost = estKw * 2800 + storageAddon;
  const federalCredit = Math.round(grossCost * 0.3);
  const netCost = grossCost - federalCredit;
  const year1ReductionPct = includeStorage ? 91 : 84;
  const monthlyLoanPayment = Math.round(netCost * 0.00584);
  const yearsData: SolarFinancialModel['yearsData'] = [];
  let cumulativeUtilityNoSolar = 0;
  let cumulativeHelioGrid = paymentMode === 'cash' ? netCost : 0;
  let paybackYear: number | null = null;

  for (let year = 1; year <= 25; year++) {
    const annualUtilityNoSolar =
      monthlySpend * 12 * Math.pow(1 + utilityInflationRate / 100, year - 1);
    cumulativeUtilityNoSolar += annualUtilityNoSolar;

    const residualUtilityBill =
      annualUtilityNoSolar * (1 - year1ReductionPct / 100);
    const annualSolarCost =
      paymentMode === 'loan'
        ? monthlyLoanPayment * 12 + residualUtilityBill
        : residualUtilityBill;

    cumulativeHelioGrid += annualSolarCost;

    if (paybackYear === null && cumulativeUtilityNoSolar >= cumulativeHelioGrid) {
      paybackYear = year;
    }

    yearsData.push({
      year,
      noSolarCum: Math.round(cumulativeUtilityNoSolar),
      solarCum: Math.round(cumulativeHelioGrid),
      netSavings: Math.round(cumulativeUtilityNoSolar - cumulativeHelioGrid)
    });
  }

  const net25YearSavings = yearsData.reduce(
    (_, year) => year.netSavings,
    0
  );

  return {
    estKw: estKw.toFixed(1),
    federalCredit,
    netCost: Math.round(netCost),
    year1ReductionPct,
    net25YearSavings: Math.max(0, net25YearSavings),
    paybackLabel:
      paymentMode === 'loan' ? 'Immediate (Day 1)' : `${paybackYear || 6}.4 Yrs`,
    monthlyLoanPayment,
    yearsData
  };
}
