"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var giftCertificateActionTypes = require("./gift-certificate-action-types");
var data_store_1 = require("../../data-store");
/**
 * @param {GiftCertificateState} state
 * @param {Action} action
 * @return {GiftCertificateState}
 */
function giftCertificateReducer(state, action) {
    if (state === void 0) { state = {}; }
    var reducer = data_store_1.combineReducers({
        errors: errorsReducer,
        statuses: statusesReducer,
    });
    return reducer(state, action);
}
exports.default = giftCertificateReducer;
/**
 * @private
 * @param {Object} errors
 * @param {Action} action
 * @return {Object}
 */
function errorsReducer(errors, action) {
    if (errors === void 0) { errors = {}; }
    switch (action.type) {
        case giftCertificateActionTypes.APPLY_GIFT_CERTIFICATE_REQUESTED:
        case giftCertificateActionTypes.APPLY_GIFT_CERTIFICATE_SUCCEEDED:
            return tslib_1.__assign({}, errors, { applyGiftCertificateError: undefined });
        case giftCertificateActionTypes.APPLY_GIFT_CERTIFICATE_FAILED:
            return tslib_1.__assign({}, errors, { applyGiftCertificateError: action.payload });
        case giftCertificateActionTypes.REMOVE_GIFT_CERTIFICATE_REQUESTED:
        case giftCertificateActionTypes.REMOVE_GIFT_CERTIFICATE_SUCCEEDED:
            return tslib_1.__assign({}, errors, { removeGiftCertificateError: undefined });
        case giftCertificateActionTypes.REMOVE_GIFT_CERTIFICATE_FAILED:
            return tslib_1.__assign({}, errors, { removeGiftCertificateError: action.payload });
        default:
            return errors;
    }
}
/**
 * @private
 * @param {Object} statuses
 * @param {Action} action
 * @return {Object}
 */
function statusesReducer(statuses, action) {
    if (statuses === void 0) { statuses = {}; }
    switch (action.type) {
        case giftCertificateActionTypes.APPLY_GIFT_CERTIFICATE_REQUESTED:
            return tslib_1.__assign({}, statuses, { isApplyingGiftCertificate: true });
        case giftCertificateActionTypes.APPLY_GIFT_CERTIFICATE_SUCCEEDED:
        case giftCertificateActionTypes.APPLY_GIFT_CERTIFICATE_FAILED:
            return tslib_1.__assign({}, statuses, { isApplyingGiftCertificate: false });
        case giftCertificateActionTypes.REMOVE_GIFT_CERTIFICATE_REQUESTED:
            return tslib_1.__assign({}, statuses, { isRemovingGiftCertificate: true });
        case giftCertificateActionTypes.REMOVE_GIFT_CERTIFICATE_SUCCEEDED:
        case giftCertificateActionTypes.REMOVE_GIFT_CERTIFICATE_FAILED:
            return tslib_1.__assign({}, statuses, { isRemovingGiftCertificate: false });
        default:
            return statuses;
    }
}
//# sourceMappingURL=gift-certificate-reducer.js.map