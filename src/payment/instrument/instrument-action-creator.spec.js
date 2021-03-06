import { Observable } from 'rxjs';
import { createCheckoutStore } from '../../checkout';
import { getConfigState } from '../../config/configs.mock';
import { getInstrumentsState, getInstrumentsMeta } from './instrument.mock';
import { getErrorResponse, getResponse } from '../../common/http-request/responses.mock';
import * as actionTypes from './instrument-action-types';
import InstrumentActionCreator from './instrument-action-creator';
import {
    getVaultAccessTokenResponseBody,
    getLoadInstrumentsResponseBody,
    deleteInstrumentResponseBody,
} from './instrument.mock';
import { getConsignmentsState } from '../../shipping/consignments.mock';
import { getShippingAddress } from '../../shipping/shipping-addresses.mock';
import { getCartState } from '../../cart/carts.mock';

describe('InstrumentActionCreator', () => {
    let instrumentActionCreator;
    let checkoutClient;
    let getVaultAccessTokenResponse;
    let loadInstrumentsResponse;
    let deleteInstrumentResponse;
    let errorResponse;
    let store;
    let storeId;
    let customerId;
    let instrumentId;
    let shippingAddress;
    let vaultAccessExpiry;
    let vaultAccessToken;
    let configState;
    let consignmentsState;
    let cartState;
    let instrumentsState;

    beforeEach(() => {
        errorResponse = getErrorResponse();
        getVaultAccessTokenResponse = getResponse(getVaultAccessTokenResponseBody());
        loadInstrumentsResponse = getResponse(getLoadInstrumentsResponseBody());
        deleteInstrumentResponse = getResponse(deleteInstrumentResponseBody());

        checkoutClient = {
            getVaultAccessToken: jest.fn(() => Promise.resolve(getVaultAccessTokenResponse)),
            loadInstruments: jest.fn(() => Promise.resolve(loadInstrumentsResponse)),
            deleteInstrument: jest.fn(() => Promise.resolve(deleteInstrumentResponse)),
        };

        instrumentActionCreator = new InstrumentActionCreator(checkoutClient);

        configState = getConfigState();
        instrumentsState = getInstrumentsState();
        consignmentsState = getConsignmentsState();
        cartState = getCartState();

        store = createCheckoutStore({
            config: configState,
            cart: cartState,
            consignments: consignmentsState,
            instruments: instrumentsState,
        });

        storeId = configState.data.storeConfig.storeProfile.storeId;
        customerId = cartState.data.customerId;
        shippingAddress = getShippingAddress();
        instrumentId = '123';

        const instrumentsMeta = getInstrumentsMeta();
        vaultAccessToken = instrumentsMeta.vaultAccessToken;
        vaultAccessExpiry = instrumentsMeta.vaultAccessExpiry;
    });

    describe('#loadInstruments()', () => {
        it('sends a request to get a list of instruments', async () => {
            await instrumentActionCreator.loadInstruments()(store).toPromise();

            expect(checkoutClient.getVaultAccessToken).toHaveBeenCalled();
            expect(checkoutClient.loadInstruments).toHaveBeenCalledWith(
                { storeId, customerId, authToken: vaultAccessToken },
                shippingAddress
            );
        });

        it('does not send a request to get a list of instruments if valid token is supplied', async () => {
            store = createCheckoutStore({
                config: configState,
                cart: cartState,
                consignments: consignmentsState,
                instruments: {
                    ...getInstrumentsState(),
                    meta: {
                        ...getInstrumentsMeta(),
                        vaultAccessExpiry: 1816097476098,
                    },
                },
            });

            await instrumentActionCreator.loadInstruments()(store).toPromise();

            expect(checkoutClient.getVaultAccessToken).not.toHaveBeenCalled();
            expect(checkoutClient.loadInstruments).toHaveBeenCalledWith(
                { storeId, customerId, authToken: vaultAccessToken },
                shippingAddress
            );
        });

        it('emits actions if able to load instruments', async () => {
            const actions = await instrumentActionCreator.loadInstruments()(store)
                .toArray()
                .toPromise();

            expect(actions).toEqual([
                {
                    type: actionTypes.LOAD_INSTRUMENTS_REQUESTED,
                },
                {
                    type: actionTypes.LOAD_INSTRUMENTS_SUCCEEDED,
                    meta: { vaultAccessExpiry, vaultAccessToken },
                    payload: loadInstrumentsResponse.body,
                },
            ]);
        });

        it('emits error actions if unable to load instruments', async () => {
            checkoutClient.loadInstruments.mockReturnValue(Promise.reject(errorResponse));

            const errorHandler = jest.fn((action) => Observable.of(action));
            const actions = await instrumentActionCreator.loadInstruments()(store)
                .catch(errorHandler)
                .toArray()
                .toPromise();

            expect(errorHandler).toHaveBeenCalled();
            expect(actions).toEqual([
                { type: actionTypes.LOAD_INSTRUMENTS_REQUESTED },
                { type: actionTypes.LOAD_INSTRUMENTS_FAILED, payload: errorResponse, error: true },
            ]);
        });

        it('emits Missing Data Error if data is missing from the date', async () => {
            store = createCheckoutStore();

            try {
                await instrumentActionCreator.loadInstruments()(store)
                    .toArray()
                    .toPromise();
            } catch (e) {
                expect(e.type).toEqual('missing_data');
            }
        });
    });

    describe('#deleteInstrument()', () => {
        it('deletes an instrument', async () => {
            await instrumentActionCreator.deleteInstrument(instrumentId)(store)
                .toPromise();

            expect(checkoutClient.getVaultAccessToken).toHaveBeenCalled();
            expect(checkoutClient.deleteInstrument).toHaveBeenCalledWith(
                {
                    storeId,
                    customerId,
                    authToken: vaultAccessToken,
                },
                instrumentId,
            );
        });

        it('does not send a request to get a list of instruments if valid token is supplied', async () => {
            store = createCheckoutStore({
                config: configState,
                cart: cartState,
                instruments: {
                    ...getInstrumentsState(),
                    meta: {
                        ...getInstrumentsMeta(),
                        vaultAccessExpiry: 1816097476098,
                    },
                },
            });

            await instrumentActionCreator.deleteInstrument(instrumentId)(store).toPromise();

            expect(checkoutClient.getVaultAccessToken).not.toHaveBeenCalled();
            expect(checkoutClient.deleteInstrument).toHaveBeenCalledWith(
                {
                    storeId,
                    customerId,
                    authToken: vaultAccessToken,
                },
                instrumentId,
            );
        });

        it('emits actions if able to delete an instrument', async () => {
            const actions = await instrumentActionCreator.deleteInstrument(instrumentId)(store)
                .toArray()
                .toPromise();

            expect(actions).toEqual([
                {
                    type: actionTypes.DELETE_INSTRUMENT_REQUESTED,
                    meta: { instrumentId },
                },
                {
                    type: actionTypes.DELETE_INSTRUMENT_SUCCEEDED,
                    meta: { instrumentId, vaultAccessExpiry, vaultAccessToken },
                    payload: loadInstrumentsResponse.body.data,
                },
            ]);
        });

        it('emits error actions if unable to delete an instrument', async () => {
            checkoutClient.deleteInstrument.mockReturnValue(Promise.reject(errorResponse));

            const errorHandler = jest.fn((action) => Observable.of(action));
            const actions = await instrumentActionCreator.deleteInstrument(instrumentId)(store)
                .catch(errorHandler)
                .toArray()
                .toPromise();

            expect(errorHandler).toHaveBeenCalled();
            expect(actions).toEqual([
                {
                    type: actionTypes.DELETE_INSTRUMENT_REQUESTED, meta: { instrumentId },
                },
                {
                    type: actionTypes.DELETE_INSTRUMENT_FAILED, meta: { instrumentId }, payload: errorResponse, error: true,
                },
            ]);
        });

        it('emits Missing Data Error if data is missing from the date', async () => {
            store = createCheckoutStore();

            try {
                await instrumentActionCreator.deleteInstrument()(store)
                    .toArray()
                    .toPromise();
            } catch (e) {
                expect(e.type).toEqual('missing_data');
            }
        });
    });
});
