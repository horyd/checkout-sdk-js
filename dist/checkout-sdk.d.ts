import { createTimeout } from '@bigcommerce/request-sender';
import { Timeout } from '@bigcommerce/request-sender';

declare interface AmazonPayCustomerInitializeOptions {
    container: string;
    color?: string;
    size?: string;
    onError?(error: AmazonPayWidgetError | StandardError): void;
}

declare interface AmazonPayOrderReference {
    getAmazonBillingAgreementId(): string;
    getAmazonOrderReferenceId(): string;
}

declare interface AmazonPayPaymentInitializeOptions {
    container: string;
    onError?(error: AmazonPayWidgetError | StandardError): void;
    onPaymentSelect?(reference: AmazonPayOrderReference): void;
    onReady?(reference: AmazonPayOrderReference): void;
}

declare interface AmazonPayShippingInitializeOptions {
    container: string;
    onAddressSelect?(reference: AmazonPayOrderReference): void;
    onError?(error: AmazonPayWidgetError | StandardError): void;
    onReady?(): void;
}

declare interface AmazonPayWidgetError extends Error {
    getErrorCode(): string;
}

declare interface BraintreePaymentInitializeOptions {
    threeDSecure?: BraintreeThreeDSecureOptions;
}

declare interface BraintreeThreeDSecureOptions {
    addFrame(error: Error | undefined, iframe: HTMLIFrameElement, cancel: () => Promise<BraintreeVerifyPayload> | undefined): void;
    removeFrame(): void;
}

declare interface BraintreeVerifyPayload {
    nonce: string;
    details: {
        cardType: string;
        lastFour: string;
        lastTwo: string;
    };
    description: string;
    liabilityShiftPossible: boolean;
    liabilityShifted: boolean;
}

declare interface BraintreeVisaCheckoutCustomerInitializeOptions {
    container: string;
    onError?(error: Error): void;
}

declare interface BraintreeVisaCheckoutPaymentInitializeOptions {
    onError?(error: Error): void;
    onPaymentSelect?(): void;
}

declare interface CheckoutSelectors {
    checkout: CheckoutStoreSelector;
    errors: CheckoutStoreErrorSelector;
    statuses: CheckoutStoreStatusSelector;
}

declare class CheckoutService {
    private _store;
    private _billingAddressActionCreator;
    private _cartActionCreator;
    private _configActionCreator;
    private _countryActionCreator;
    private _couponActionCreator;
    private _customerStrategyActionCreator;
    private _giftCertificateActionCreator;
    private _instrumentActionCreator;
    private _orderActionCreator;
    private _paymentMethodActionCreator;
    private _paymentStrategyActionCreator;
    private _quoteActionCreator;
    private _shippingCountryActionCreator;
    private _shippingOptionActionCreator;
    private _shippingStrategyActionCreator;
    private _state;
    getState(): CheckoutSelectors;
    notifyState(): void;
    subscribe(subscriber: (state: CheckoutSelectors) => void, ...filters: Array<(state: CheckoutSelectors) => any>): () => void;
    loadCheckout(options?: RequestOptions): Promise<CheckoutSelectors>;
    loadConfig(options?: RequestOptions): Promise<CheckoutSelectors>;
    loadCart(options?: RequestOptions): Promise<CheckoutSelectors>;
    loadOrder(orderId: number, options?: RequestOptions): Promise<CheckoutSelectors>;
    submitOrder(payload: OrderRequestBody, options?: RequestOptions): Promise<CheckoutSelectors>;
    finalizeOrderIfNeeded(options?: RequestOptions): Promise<CheckoutSelectors>;
    loadPaymentMethods(options?: RequestOptions): Promise<CheckoutSelectors>;
    loadPaymentMethod(methodId: string, options: RequestOptions): Promise<CheckoutSelectors>;
    initializePayment(options: PaymentInitializeOptions): Promise<CheckoutSelectors>;
    deinitializePayment(options: PaymentRequestOptions): Promise<CheckoutSelectors>;
    loadBillingCountries(options?: RequestOptions): Promise<CheckoutSelectors>;
    loadShippingCountries(options?: RequestOptions): Promise<CheckoutSelectors>;
    loadBillingAddressFields(options?: RequestOptions): Promise<CheckoutSelectors>;
    loadShippingAddressFields(options?: RequestOptions): Promise<CheckoutSelectors>;
    initializeCustomer(options?: CustomerInitializeOptions): Promise<CheckoutSelectors>;
    deinitializeCustomer(options?: CustomerRequestOptions): Promise<CheckoutSelectors>;
    signInCustomer(credentials: CustomerCredentials, options?: CustomerRequestOptions): Promise<CheckoutSelectors>;
    signOutCustomer(options?: CustomerRequestOptions): Promise<CheckoutSelectors>;
    loadShippingOptions(options?: RequestOptions): Promise<CheckoutSelectors>;
    initializeShipping(options?: ShippingInitializeOptions): Promise<CheckoutSelectors>;
    deinitializeShipping(options?: ShippingRequestOptions): Promise<CheckoutSelectors>;
    selectShippingOption(addressId: string, shippingOptionId: string, options?: ShippingRequestOptions): Promise<CheckoutSelectors>;
    updateShippingAddress(address: InternalAddress, options?: ShippingRequestOptions): Promise<CheckoutSelectors>;
    updateBillingAddress(address: InternalAddress, options?: RequestOptions): Promise<CheckoutSelectors>;
    applyCoupon(code: string, options?: RequestOptions): Promise<CheckoutSelectors>;
    removeCoupon(code: string, options?: RequestOptions): Promise<CheckoutSelectors>;
    applyGiftCertificate(code: string, options?: RequestOptions): Promise<CheckoutSelectors>;
    removeGiftCertificate(code: string, options?: RequestOptions): Promise<CheckoutSelectors>;
    loadInstruments(): Promise<CheckoutSelectors>;
    vaultInstrument(instrument: Instrument): Promise<CheckoutSelectors>;
    deleteInstrument(instrumentId: string): Promise<CheckoutSelectors>;
}

declare interface CheckoutServiceOptions {
    locale?: string;
    shouldWarnMutation?: boolean;
}

declare interface CheckoutSettings {
    enableOrderComments: boolean;
    enableTermsAndConditions: boolean;
    guestCheckoutEnabled: boolean;
    isCardVaultingEnabled: boolean;
    isPaymentRequestEnabled: boolean;
    isPaymentRequestCanMakePaymentEnabled: boolean;
    orderTermsAndConditions: string;
    orderTermsAndConditionsLink: string;
    orderTermsAndConditionsType: string;
    shippingQuoteFailedMessage: string;
    realtimeShippingProviders: string[];
    remoteCheckoutProviders: any[];
}

declare class CheckoutStoreErrorSelector {
    private _billingAddress;
    private _cart;
    private _config;
    private _countries;
    private _coupons;
    private _customerStrategies;
    private _giftCertificates;
    private _instruments;
    private _order;
    private _paymentMethods;
    private _paymentStrategies;
    private _quote;
    private _shippingCountries;
    private _shippingOptions;
    private _shippingStrategies;
    getError(): Error | undefined;
    getLoadCheckoutError(): Error | undefined;
    getSubmitOrderError(): Error | undefined;
    getFinalizeOrderError(): Error | undefined;
    getLoadOrderError(): Error | undefined;
    getLoadCartError(): Error | undefined;
    getVerifyCartError(): Error | undefined;
    getLoadBillingCountriesError(): Error | undefined;
    getLoadShippingCountriesError(): Error | undefined;
    getLoadPaymentMethodsError(): Error | undefined;
    getLoadPaymentMethodError(methodId?: string): Error | undefined;
    getInitializePaymentError(methodId?: string): Error | undefined;
    getSignInError(): Error | undefined;
    getSignOutError(): Error | undefined;
    getInitializeCustomerError(methodId?: string): Error | undefined;
    getLoadShippingOptionsError(): Error | undefined;
    getSelectShippingOptionError(): Error | undefined;
    getUpdateBillingAddressError(): Error | undefined;
    getUpdateShippingAddressError(): Error | undefined;
    getInitializeShippingError(methodId?: string): Error | undefined;
    getApplyCouponError(): Error | undefined;
    getRemoveCouponError(): Error | undefined;
    getApplyGiftCertificateError(): Error | undefined;
    getRemoveGiftCertificateError(): Error | undefined;
    getLoadInstrumentsError(): Error | undefined;
    getVaultInstrumentError(): Error | undefined;
    getDeleteInstrumentError(instrumentId?: string): Error | undefined;
    getLoadConfigError(): Error | undefined;
}

/**
 * TODO: Convert this file into TypeScript properly
 * i.e.: Instrument
 */
declare class CheckoutStoreSelector {
    private _billingAddress;
    private _cart;
    private _config;
    private _countries;
    private _customer;
    private _form;
    private _instruments;
    private _order;
    private _paymentMethods;
    private _quote;
    private _shippingAddress;
    private _shippingCountries;
    private _shippingOptions;
    getOrder(): InternalOrder | InternalIncompleteOrder | undefined;
    getQuote(): InternalQuote | undefined;
    getConfig(): StoreConfig | undefined;
    getShippingAddress(): InternalAddress | undefined;
    getShippingOptions(): InternalShippingOptionList | undefined;
    getSelectedShippingOption(): InternalShippingOption | undefined;
    getShippingCountries(): Country[] | undefined;
    getBillingAddress(): InternalAddress | undefined;
    getBillingCountries(): Country[] | undefined;
    getPaymentMethods(): PaymentMethod[] | undefined;
    getPaymentMethod(methodId: string, gatewayId?: string): PaymentMethod | undefined;
    getSelectedPaymentMethod(): PaymentMethod | undefined;
    getCart(): InternalCart | undefined;
    getCustomer(): InternalCustomer | undefined;
    isPaymentDataRequired(useStoreCredit?: boolean): boolean;
    isPaymentDataSubmitted(methodId: string, gatewayId?: string): boolean;
    getInstruments(): Instrument[] | undefined;
    getBillingAddressFields(countryCode: string): FormField[];
    getShippingAddressFields(countryCode: string): FormField[];
}

declare class CheckoutStoreStatusSelector {
    private _billingAddress;
    private _cart;
    private _config;
    private _countries;
    private _coupons;
    private _customerStrategies;
    private _giftCertificates;
    private _instruments;
    private _order;
    private _paymentMethods;
    private _paymentStrategies;
    private _quote;
    private _shippingCountries;
    private _shippingOptions;
    private _shippingStrategies;
    isPending(): boolean;
    isLoadingCheckout(): boolean;
    isSubmittingOrder(): boolean;
    isFinalizingOrder(): boolean;
    isLoadingOrder(): boolean;
    isLoadingCart(): boolean;
    isVerifyingCart(): boolean;
    isLoadingBillingCountries(): boolean;
    isLoadingShippingCountries(): boolean;
    isLoadingPaymentMethods(): boolean;
    isLoadingPaymentMethod(methodId?: string): boolean;
    isInitializingPayment(methodId?: string): boolean;
    isSigningIn(methodId?: string): boolean;
    isSigningOut(methodId?: string): boolean;
    isInitializingCustomer(methodId?: string): boolean;
    isLoadingShippingOptions(): boolean;
    isSelectingShippingOption(): boolean;
    isUpdatingBillingAddress(): boolean;
    isUpdatingShippingAddress(): boolean;
    isInitializingShipping(methodId?: string): boolean;
    isApplyingCoupon(): boolean;
    isRemovingCoupon(): boolean;
    isApplyingGiftCertificate(): boolean;
    isRemovingGiftCertificate(): boolean;
    isLoadingInstruments(): boolean;
    isVaultingInstrument(): boolean;
    isDeletingInstrument(instrumentId?: string): boolean;
    isLoadingConfig(): boolean;
    isCustomerStepPending(): boolean;
    isPaymentStepPending(): boolean;
}

declare interface Country {
    code: string;
    name: string;
    hasPostalCodes: boolean;
    subdivisions: Region[];
}

export declare function createCheckoutService(options?: CheckoutServiceOptions): CheckoutService;

export declare function createLanguageService(config?: Partial<LanguageConfig>): LanguageService;

declare interface CreditCardInstrument {
    ccExpiry: {
        month: string;
        year: string;
    };
    ccName: string;
    ccNumber: string;
    ccType: string;
    ccCvv?: string;
    shouldSaveInstrument?: boolean;
    extraData?: any;
}

declare interface Currency {
    code: string;
    decimalPlaces: string;
    decimalSeparator: string;
    symbolLocation: string;
    symbol: string;
    thousandsSeparator: string;
}

declare interface CustomerCredentials {
    email: string;
    password?: string;
}

declare interface CustomerInitializeOptions extends CustomerRequestOptions {
    amazon?: AmazonPayCustomerInitializeOptions;
    braintreevisacheckout?: BraintreeVisaCheckoutCustomerInitializeOptions;
}

declare interface CustomerRequestOptions extends RequestOptions {
    methodId?: string;
}

declare interface DiscountNotification {
    message: string;
    messageHtml: string;
    type: string;
}

declare interface FormField {
    id: string;
    name: string;
    custom: boolean;
    label: string;
    required: boolean;
    default?: string;
    type?: string;
    fieldType?: string;
    itemtype?: string;
    options?: FormFieldOptions;
}

declare interface FormFieldItem {
    value: string;
    label: string;
}

declare interface FormFieldOptions {
    helperLabel?: string;
    items: FormFieldItem[];
}

declare interface FormFields {
    shippingAddressFields: FormField[];
    billingAddressFields: FormField[];
}

declare interface Instrument {
    bigpay_token: string;
    provider: string;
    iin: string;
    last_4: string;
    expiry_month: string;
    expiry_year: string;
    brand: string;
    default_instrument: boolean;
    trusted_shipping_address: boolean;
}

declare interface InternalAddress {
    id: string;
    firstName: string;
    lastName: string;
    company: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    province: string;
    provinceCode: string;
    postCode: string;
    country: string;
    countryCode: string;
    phone: string;
    type: string;
    customFields: Array<{
        fieldId: string;
        fieldValue: string;
    }>;
}

declare interface InternalCart {
    id: string;
    items: InternalLineItem[];
    currency: string;
    subtotal: {
        amount: number;
        integerAmount: number;
    };
    coupon: {
        discountedAmount: number;
        coupons: InternalCoupon[];
    };
    discount: {
        amount: number;
        integerAmount: number;
    };
    discountNotifications: DiscountNotification[];
    giftCertificate: {
        totalDiscountedAmount: number;
        appliedGiftCertificates: InternalGiftCertificate[];
    };
    shipping: {
        amount: number;
        integerAmount: number;
        amountBeforeDiscount: number;
        integerAmountBeforeDiscount: number;
        required: boolean;
    };
    storeCredit: {
        amount: number;
    };
    taxSubtotal: {
        amount: number;
        integerAmount: number;
    };
    taxes: Array<{
        name: string;
        amount: number;
    }>;
    taxTotal: {
        amount: number;
        integerAmount: number;
    };
    handling: {
        amount: number;
        integerAmount: number;
    };
    grandTotal: {
        amount: number;
        integerAmount: number;
    };
}

declare interface InternalCoupon {
    code: string;
    discount: string;
    discountType: number;
    name: string;
}

declare interface InternalCustomer {
    addresses: InternalAddress[];
    customerId: number;
    customerGroupId: number;
    customerGroupName: string;
    isGuest: boolean;
    phoneNumber: string;
    storeCredit: number;
    email: string;
    firstName: string;
    name: string;
    remote?: {
        customerMessage?: string;
        provider: string;
        useStoreCredit?: boolean;
    };
}

declare interface InternalGiftCertificate {
    code: string;
    discountedAmount: number;
    remainingBalance: number;
    giftCertificate?: {
        balance: number;
        code: string;
        purchaseDate: string;
    };
}

declare interface InternalIncompleteOrder {
    orderId: number;
    token: string;
    payment: {
        id?: string;
        gateway?: string;
        redirectUrl?: string;
        returnUrl?: string;
        status?: string;
        helpText?: string;
    };
    socialData: {
        [key: string]: {
            name: string;
            description: string;
            image: string;
            url: string;
            shareText: string;
            sharingLink: string;
        };
    };
    status: string;
    customerCreated: boolean;
    hasDigitalItems: boolean;
    isDownloadable: boolean;
    isComplete: boolean;
    callbackUrl: string;
}

declare interface InternalLineItem {
    amount: number;
    amountAfterDiscount: number;
    attributes: Array<{
        name: string;
        value: string;
    }>;
    discount: number;
    id: string;
    imageUrl: string;
    integerAmount: number;
    integerAmountAfterDiscount: number;
    integerDiscount: number;
    integerTax: number;
    name: string;
    quantity: number;
    tax: number;
    type: string;
    variantId: number;
}

declare interface InternalOrder extends InternalIncompleteOrder {
    id: number;
    items: InternalLineItem[];
    currency: string;
    customerCanBeCreated: boolean;
    subtotal: {
        amount: number;
        integerAmount: number;
    };
    coupon: {
        discountedAmount: number;
        coupons: InternalCoupon[];
    };
    discount: {
        amount: number;
        integerAmount: number;
    };
    discountNotifications: Array<{
        message: string;
        messageHtml: string;
        type: string;
    }>;
    giftCertificate: {
        totalDiscountedAmount: number;
        appliedGiftCertificates: InternalGiftCertificate[];
    };
    shipping: {
        amount: number;
        integerAmount: number;
        amountBeforeDiscount: number;
        integerAmountBeforeDiscount: number;
        required: boolean;
    };
    storeCredit: {
        amount: number;
    };
    taxSubtotal: {
        amount: number;
        integerAmount: number;
    };
    taxes: Array<{
        name: string;
        amount: number;
    }>;
    taxTotal: {
        amount: number;
        integerAmount: number;
    };
    handling: {
        amount: number;
        integerAmount: number;
    };
    grandTotal: {
        amount: number;
        integerAmount: number;
    };
}

declare interface InternalQuote {
    orderComment: string;
    shippingOption: string;
    billingAddress: InternalAddress;
    shippingAddress: InternalAddress;
}

declare interface InternalShippingOption {
    description: string;
    module: string;
    method: number;
    price: number;
    formattedPrice: string;
    id: string;
    selected: boolean;
    isRecommended: boolean;
    imageUrl: string;
    transitTime: string;
}

declare interface InternalShippingOptionList {
    [key: string]: InternalShippingOption[];
}

declare interface KlarnaLoadResponse {
    show_form: boolean;
    error?: {
        invalid_fields: string[];
    };
}

declare interface KlarnaPaymentInitializeOptions {
    container: string;
    onLoad?(response: KlarnaLoadResponse): void;
}

declare interface LanguageConfig {
    defaultTranslations: Translations;
    locale: string;
    locales: Locales;
    translations: Translations;
}

declare class LanguageService {
    private _logger;
    private _locale;
    private _locales;
    private _translations;
    private _formatters;
    mapKeys(maps?: {
        [key: string]: string;
    }): void;
    getLocale(): string;
    translate(rawKey: string, data?: TranslationData): string;
    private _transformConfig(config?);
    private _flattenObject(object, result?, parentKey?);
    private _transformData(data);
    private _hasTranslations();
}

declare interface Locales {
    [key: string]: string;
}

declare interface OrderPaymentRequestBody {
    methodId: string;
    gatewayId?: string;
    paymentData?: CreditCardInstrument | VaultedInstrument;
}

declare interface OrderRequestBody {
    payment?: OrderPaymentRequestBody;
    useStoreCredit?: boolean;
    customerMessage?: string;
}

declare interface PasswordRequirements {
    alpha: string;
    numeric: string;
    minlength: number;
    error: string;
}

declare interface PaymentInitializeOptions extends PaymentRequestOptions {
    amazon?: AmazonPayPaymentInitializeOptions;
    braintree?: BraintreePaymentInitializeOptions;
    braintreevisacheckout?: BraintreeVisaCheckoutPaymentInitializeOptions;
    klarna?: KlarnaPaymentInitializeOptions;
    square?: SquarePaymentInitializeOptions;
}

declare interface PaymentMethod {
    id: string;
    config: PaymentMethodConfig;
    method: string;
    supportedCards: string[];
    type: string;
    clientToken?: string;
    gateway?: string;
    logoUrl?: string;
    nonce?: string;
    initializationData?: any;
    returnUrl?: string;
}

declare interface PaymentMethodConfig {
    cardCode?: boolean;
    displayName?: string;
    is3dsEnabled?: boolean;
    merchantId?: string;
    redirectUrl?: string;
    testMode?: boolean;
}

declare interface PaymentRequestOptions extends RequestOptions {
    methodId: string;
    gatewayId?: string;
}

declare interface PaymentSettings {
    bigpayBaseUrl: string;
    clientSidePaymentProviders: string[];
}

declare interface Region {
    code: string;
    name: string;
}

declare interface RequestOptions {
    timeout?: Timeout;
}

declare interface ShippingInitializeOptions extends ShippingRequestOptions {
    amazon?: AmazonPayShippingInitializeOptions;
}

declare interface ShippingRequestOptions extends RequestOptions {
    methodId?: string;
}

declare interface ShopperConfig {
    defaultNewsletterSignup: boolean;
    passwordRequirements: PasswordRequirements;
    showNewsletterSignup: boolean;
}

declare interface ShopperCurrency {
    code: string;
    symbolLocation: string;
    symbol: string;
    decimalPlaces: string;
    decimalSeparator: string;
    thousandsSeparator: string;
    exchangeRate: string;
}

declare interface SquareFormElement {
    elementId: string;
    placeholder?: string;
}

declare interface SquarePaymentInitializeOptions {
    cardNumber: SquareFormElement;
    cvv: SquareFormElement;
    expirationDate: SquareFormElement;
    postalCode: SquareFormElement;
    inputClass?: string;
    inputStyles?: Array<{
        [key: string]: string;
    }>;
}

declare class StandardError extends Error {
    protected type: string;
    constructor(message?: string);
}

declare interface StoreConfig {
    cdnPath: string;
    checkoutSettings: CheckoutSettings;
    currency: Currency;
    formFields: FormFields;
    links: StoreLinks;
    paymentSettings: PaymentSettings;
    shopperConfig: ShopperConfig;
    storeProfile: StoreProfile;
    imageDirectory: string;
    isAngularDebuggingEnabled: boolean;
    shopperCurrency: ShopperCurrency;
}

declare interface StoreLinks {
    cartLink: string;
    checkoutLink: string;
    orderConfirmationLink: string;
}

declare interface StoreProfile {
    orderEmail: string;
    shopPath: string;
    storeCountry: string;
    storeHash: string;
    storeId: string;
    storeName: string;
    storePhoneNumber: string;
    storeLanguage: string;
}

declare interface TranslationData {
    [key: string]: string | number;
}

declare interface Translations {
    [key: string]: string | Translations;
}

declare interface VaultedInstrument {
    instrumentId: string;
    cvv?: number;
}