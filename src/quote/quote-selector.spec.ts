import { BillingAddressSelector } from '../billing';
import { getBillingAddressState } from '../billing/billing-addresses.mock';
import { getCheckoutState } from '../checkout/checkouts.mock';
import { getErrorResponse } from '../common/http-request/responses.mock';
import { getConfig } from '../config/configs.mock';
import { ShippingAddressSelector, ShippingOptionSelector } from '../shipping';
import { getConsignmentsState } from '../shipping/consignments.mock';

import { getQuote } from './internal-quotes.mock';
import QuoteSelector from './quote-selector';

describe('QuoteSelector', () => {
    let quoteSelector;
    let shippingAddressSelector;
    let shippingOptionsSelector;
    let billingAddressSelector;
    let state;

    beforeEach(() => {
        state = {
            checkout: getCheckoutState(),
            consignments: getConsignmentsState(),
            billingAddress: getBillingAddressState(),
            config: getConfig(),
        };

        shippingOptionsSelector = new ShippingOptionSelector(state.consignments);
        shippingAddressSelector = new ShippingAddressSelector(state.consignments, state.config);
        billingAddressSelector = new BillingAddressSelector(state.billingAddress);
        quoteSelector = new QuoteSelector(state.checkout, billingAddressSelector, shippingAddressSelector, shippingOptionsSelector);
    });

    describe('#getQuote()', () => {
        it('returns the current quote', () => {
            expect(quoteSelector.getQuote())
                .toEqual(getQuote());
        });

        it('returns the same instance as the shipping selector', () => {
            expect(quoteSelector.getQuote().shippingAddress)
                .toBe(shippingAddressSelector.getShippingAddress());
        });
    });

    describe('#getLoadError()', () => {
        it('returns error if unable to load', () => {
            const loadError = getErrorResponse();

            quoteSelector = new QuoteSelector({
                ...state.checkout,
                errors: { loadError },
            }, billingAddressSelector, shippingAddressSelector, shippingOptionsSelector);

            expect(quoteSelector.getLoadError()).toEqual(loadError);
        });

        it('does not returns error if able to load', () => {
            expect(quoteSelector.getLoadError()).toBeUndefined();
        });
    });

    describe('#isLoading()', () => {
        it('returns true if loading quote', () => {
            quoteSelector = new QuoteSelector({
                ...state.checkout,
                statuses: { isLoading: true },
            }, billingAddressSelector, shippingAddressSelector, shippingOptionsSelector);

            expect(quoteSelector.isLoading()).toEqual(true);
        });

        it('returns false if not loading quote', () => {
            expect(quoteSelector.isLoading()).toEqual(false);
        });
    });
});