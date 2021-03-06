import { createAction } from '@bigcommerce/data-store';
import { createRequestSender } from '@bigcommerce/request-sender';
import { Observable } from 'rxjs';

import { createCheckoutStore, CheckoutRequestSender, CheckoutStore, CheckoutValidator } from '../../checkout';
import { OrderActionCreator, OrderActionType, OrderRequestSender, SubmitOrderAction } from '../../order';
import { getOrderRequestBody } from '../../order/internal-orders.mock';

import LegacyPaymentStrategy from './legacy-payment-strategy';

describe('LegacyPaymentStrategy', () => {
    let orderActionCreator: OrderActionCreator;
    let store: CheckoutStore;
    let strategy: LegacyPaymentStrategy;
    let submitOrderAction: Observable<SubmitOrderAction>;

    beforeEach(() => {
        store = createCheckoutStore();
        orderActionCreator = new OrderActionCreator(
            new OrderRequestSender(createRequestSender()),
            new CheckoutValidator(new CheckoutRequestSender(createRequestSender()))
        );
        submitOrderAction = Observable.of(createAction(OrderActionType.SubmitOrderRequested));

        jest.spyOn(orderActionCreator, 'submitOrder')
            .mockReturnValue(submitOrderAction);

        jest.spyOn(store, 'dispatch');

        strategy = new LegacyPaymentStrategy(store, orderActionCreator);
    });

    it('submits order with payment data', async () => {
        await strategy.execute(getOrderRequestBody());

        expect(orderActionCreator.submitOrder).toHaveBeenCalledWith(getOrderRequestBody(), undefined);
        expect(store.dispatch).toHaveBeenCalledWith(submitOrderAction);
    });

    it('returns checkout state', async () => {
        const output = await strategy.execute(getOrderRequestBody());

        expect(output).toEqual(store.getState());
    });
});
