import { describe, expect, it } from 'vitest';
import {
  calculateQuoteProposal,
  calculateSolarFinancialModel,
  getPreviousQuoteStep,
  getQuoteStepTransition,
  getQuotePhoneDigits,
  isValidQuoteEmail,
  isValidQuotePhone,
  isValidQuoteZip,
  type QuoteFormValues
} from './quoteLogic';

const validQuoteValues: QuoteFormValues = {
  propertyType: 'Single-Family Home',
  roofCondition: 'Asphalt Shingle • Under 10 Yrs',
  streetAddress: '7420 E Camelback Rd',
  zipCode: '85251',
  fullName: 'Alex Morgan',
  email: 'alex@example.com',
  phone: '(480) 555-0198'
};

describe('HelioGrid quote form', () => {
  it('requires property and roof selections before continuing', () => {
    const result = getQuoteStepTransition(1, {
      ...validQuoteValues,
      propertyType: ''
    });

    expect(result.nextStep).toBe(1);
    expect(result.error).toBe('Please select your property type and roof condition.');
  });

  it('advances from property selection to the energy-bill step', () => {
    expect(getQuoteStepTransition(1, validQuoteValues)).toMatchObject({
      nextStep: 2,
      error: '',
      submitted: false
    });
  });

  it('validates address before ZIP and marks both fields touched', () => {
    const invalidAddress = getQuoteStepTransition(3, {
      ...validQuoteValues,
      streetAddress: '123'
    });
    expect(invalidAddress.error).toContain('street address');
    expect(invalidAddress.touchedFields).toEqual(['streetAddress', 'zipCode']);

    const invalidZip = getQuoteStepTransition(3, {
      ...validQuoteValues,
      zipCode: '8525'
    });
    expect(invalidZip.error).toContain('5-digit');
    expect(invalidZip.nextStep).toBe(3);

    expect(getQuoteStepTransition(3, validQuoteValues).nextStep).toBe(4);
  });

  it('validates contact fields in order before submitting', () => {
    const invalidName = getQuoteStepTransition(4, {
      ...validQuoteValues,
      fullName: 'A'
    });
    expect(invalidName.error).toBe('Please enter your full name.');

    const invalidEmail = getQuoteStepTransition(4, {
      ...validQuoteValues,
      email: 'not-an-email'
    });
    expect(invalidEmail.error).toContain('valid email');

    const invalidPhone = getQuoteStepTransition(4, {
      ...validQuoteValues,
      phone: '555-1234'
    });
    expect(invalidPhone.error).toContain('10-digit');
    expect(invalidPhone.nextStep).toBe(4);

    expect(getQuoteStepTransition(4, validQuoteValues)).toMatchObject({
      nextStep: 5,
      error: '',
      submitted: true
    });
  });

  it('moves backward through the quote flow without leaving the valid step range', () => {
    expect(getPreviousQuoteStep(1)).toBe(1);
    expect(getPreviousQuoteStep(4)).toBe(3);
    expect(getPreviousQuoteStep(5)).toBe(4);
  });

  it('validates ZIP, email and phone with the same rules as the form', () => {
    expect(isValidQuoteZip(' 85251 ')).toBe(true);
    expect(isValidQuoteZip('8525')).toBe(false);
    expect(isValidQuoteEmail(' alex@example.com ')).toBe(true);
    expect(isValidQuoteEmail('alex@')).toBe(false);
    expect(getQuotePhoneDigits('(480) 555-0198')).toBe('4805550198');
    expect(isValidQuotePhone('(480) 555-0198')).toBe(true);
    expect(isValidQuotePhone('555-0198')).toBe(false);
  });
});

describe('HelioGrid proposal calculator', () => {
  it('applies the minimum system size, battery price and tax credit', () => {
    expect(
      calculateQuoteProposal('Single-Family Home', 100, 'None')
    ).toEqual({
      systemSizeKw: 4.8,
      grossSystemCost: 13680,
      federalItcCredit: 4104,
      netSystemCost: 9576,
      estimatedMonthlySavings: 86
    });
  });

  it('scales commercial systems and whole-home battery pricing', () => {
    const proposal = calculateQuoteProposal(
      'Commercial Facility',
      340,
      '2x Whole-Home Backup'
    );

    expect(proposal.systemSizeKw).toBe(15.2);
    expect(proposal.grossSystemCost).toBe(64820);
    expect(proposal.federalItcCredit).toBe(19446);
    expect(proposal.netSystemCost).toBe(45374);
    expect(proposal.estimatedMonthlySavings).toBe(292);
  });
});

describe('HelioGrid 25-year financial calculator', () => {
  it('returns a 25-year cash projection and storage-adjusted reduction', () => {
    const model = calculateSolarFinancialModel(360, 6, 'cash', true);

    expect(model.yearsData).toHaveLength(25);
    expect(model.yearsData[0]?.year).toBe(1);
    expect(model.yearsData[24]?.year).toBe(25);
    expect(model.year1ReductionPct).toBe(91);
    expect(model.federalCredit).toBe(14740);
    expect(model.paybackLabel).toMatch(/ Yrs$/);
    expect(model.yearsData[24]?.noSolarCum).toBeGreaterThan(
      model.yearsData[0]?.noSolarCum ?? 0
    );
  });

  it('shows loan payments and the existing day-one payback label', () => {
    const model = calculateSolarFinancialModel(360, 6, 'loan', false);

    expect(model.yearsData).toHaveLength(25);
    expect(model.year1ReductionPct).toBe(84);
    expect(model.monthlyLoanPayment).toBeGreaterThan(0);
    expect(model.paybackLabel).toBe('Immediate (Day 1)');
  });
});
