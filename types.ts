export interface User {
  name: string;
  email: string;
  generatedAccount: string;
  password: string;
  pin: string;
  cardNumber?: string;
  cardName?: string;
  additionalCards?: Array<{
    cardNumber: string;
    cardName: string;
    cardExp: string;
    cardCvv: string;
  }>;
  balance: number;
}

export interface Hotel {
  id: number;
  name: string;
  rating: number;
  price: string;
  numericPrice: number;
  oldPrice: string;
  img: string;
  address: string;
  locationUrl: string;
  websiteUrl?: string;
}

export interface ESim {
  id: number;
  name: string;
  data: string;
  calls: string;
  validity: string;
  price: string;
  val: number;
  type: string;
}

export type Lang = 'VIE' | 'ENG';
export type Theme = 'light' | 'dark';

export interface TranslationStructure {
  welcomeTitle: string;
  welcomeSlogan: string;
  login: string;
  register: string;
  loginWelcome: string;
  loginSubtitle: string;
  accountNum: string;
  password: string;
  forgotPass: string;
  noAccount: string;
  registerNow: string;
  regTitle: string;
  steps: string[];
  fullName: string;
  gender: string;
  email: string;
  sendOtp: string;
  resendOtp: string;
  otpPlaceholder: string;
  verifyContinue: string;
  scanTitle: string;
  confirmInfo: string;
  serviceReg: string;
  yourAccount: string;
  createPass: string;
  createPin: string;
  pinPlaceholder: string;
  enterPin: string;
  agreeTerm: string;
  finish: string;
  successTitle: string;
  successDesc: string;
  backLogin: string;
  home: string;
  exchange: string;
  aiNav: string;
  profile: string;
  utilities: string;
  otherUtilities: string;
  ad: string;
  validation: {
    reqAll: string;
    reqOtp: string;
    otpExpired: string;
    otpWrong: string;
    otpSent: string;
    cardAnalyzing: string;
    cardValid: string;
    cardInvalid: string;
    passWeak: string;
    pinInvalid: string;
    pinWrong: string;
    pinLocked: string;
    loginFail: string;
    accNotFound: string;
    emailNotFound: string;
    agreeReq: string;
    resetSuccess: string;
    cardNumLen: string;
    cardExpInvalid: string;
  };
  emailSim: {
    sender: string;
    subject: string;
    bodyPrefix: string;
    bodySuffix: string;
  };
  step2: {
    introTitle: string;
    introDesc: string;
    continue: string;
    guideTitle: string;
    guideDesc: string;
    guideNote: string[];
    frontCam: string;
    backCam: string;
    tapCam: string;
    retake: string;
    usePhoto: string;
    ocrTitle: string;
    legalTitle: string;
    confirmPolicy: string;
    personalInfo: string;
    cardInfo: string;
    legalHeader: string;
    legalIntro: string;
    legalContent: Array<{ title: string; text: string }>;
  };
  step3: {
    accSetup: string;
    paymentSetup: string;
    passReq: string;
    pinReq: string;
    cardHolder: string;
    cardNum: string;
    cardExp: string;
    cardCvv: string;
    addCard: string;
    addCardTitle: string;
    editCardTitle: string;
    saveCard: string;
    cancel: string;
    linkedCards: string;
  };
  forgot: {
    title: string;
    desc: string;
    resetTitle: string;
    newPass: string;
    confirmOtp: string;
    updatePass: string;
  };
  genderOpt: { male: string; female: string; other: string };
  dashboard: {
    greeting: string;
    balance: string;
    actions: {
      deposit: string;
      receive: string;
      pay: string;
      account: string;
    };
    rates: {
      title: string;
      live: string;
      currency: string;
      buy: string;
      sell: string;
      rate: string;
    };
    utilities: string;
    otherUtilities: string;
    ads: {
      hotel: { title: string; subtitle: string; btn: string };
      tour: { title: string; subtitle: string; btn: string };
      esim: { title: string; subtitle: string; btn: string };
      culture: { title: string; subtitle: string; btn: string };
    };
    notifications: {
      title: string;
      empty: string;
      list: Array<{ id: number; title: string; desc: string; time: string }>;
    };
  };
  deposit: {
    title: string;
    tabDeposit: string;
    tabWithdraw: string;
    labelDeposit: string;
    labelWithdraw: string;
    availBalance: string;
    rate: string;
    fee: string;
    receive: string;
    totalDeduct: string;
    otherTrans: string;
    infoDeposit: string;
    infoWithdraw: string;
    confirmDeposit: string;
    confirmWithdraw: string;
    success: string;
    successDeposit: string;
    successWithdraw: string;
    backHome: string;
    alertAmount: string;
    alertBalance: string;
  };
  receive: {
    title: string;
    zoom: string;
    placeholder: string;
    amountPlace: string;
    copy: string;
    share: string;
    download: string;
    info: string;
    bankName: string;
  };
  scan: {
    title: string;
    instruction: string;
    gallery: string;
    myCode: string;
    sim: string;
    simSuccess: string;
  };
  account: {
    title: string;
    info: string;
    management: string;
    security: string;
    logout: string;
    phone: string;
    dob: string;
    address: string;
    changePass: string;
    currentPass: string;
    newPass: string;
    confirmPass: string;
    biometric: string;
    twoFa: string;
    save: string;
    cancel: string;
  };
  ai: {
    placeholder: string;
    welcome: string;
    btnSend: string;
    responseIntro: string;
    suggestions: string[];
  };
  culture: {
    title: string;
    map: string;
    storyteller: string;
    etiquette: string;
    nearby: string;
    playAudio: string;
    playing: string;
    tip: string;
    discovery: string;
    etiquetteTitle: string;
    openMap: string;
  };
  esim: {
    title: string;
    buy: string;
    success: string;
    fail: string;
    validity: string;
    dataCap: string;
    calls: string;
  };
  utils: {
    flight: string;
    taxi: string;
    train: string;
    bus: string;
    golf: string;
    boat: string;
    medical: string;
    book: string;
  };
}