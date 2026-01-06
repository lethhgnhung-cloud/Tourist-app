import { TranslationStructure } from './types';

export const TRANSLATIONS: Record<string, TranslationStructure> = {
  VIE: {
    welcomeTitle: "Vietnam\nTourist Card",
    welcomeSlogan: "Trải nghiệm du lịch & thanh toán không tiền mặt trọn vẹn.",
    login: "Đăng nhập",
    register: "Mở tài khoản ngay",
    loginWelcome: "Chào mừng trở lại!",
    loginSubtitle: "Đăng nhập để tiếp tục giao dịch.",
    accountNum: "Số tài khoản",
    password: "Mật khẩu",
    forgotPass: "Quên mật khẩu?",
    noAccount: "Chưa có tài khoản? ",
    registerNow: "Đăng ký ngay",
    regTitle: "Mở tài khoản trực tuyến",
    steps: ['Thông tin cá nhân', 'Xác thực thông tin', 'Đăng ký dịch vụ', 'Hoàn thành'],
    fullName: "Họ và tên",
    gender: "Giới tính",
    email: "Email xác thực",
    sendOtp: "Gửi OTP",
    resendOtp: "Gửi lại",
    otpPlaceholder: "Nhập mã OTP",
    verifyContinue: "Xác thực & Tiếp tục",
    scanTitle: "Xác thực giấy tờ",
    confirmInfo: "Xác nhận thông tin",
    serviceReg: "Đăng ký dịch vụ",
    yourAccount: "Số tài khoản của bạn",
    createPass: "Tạo mật khẩu đăng nhập",
    createPin: "Tạo mã PIN giao dịch (4 số)",
    pinPlaceholder: "1234",
    enterPin: "Nhập mã PIN để xác nhận",
    agreeTerm: "Tôi đồng ý với chính sách.",
    finish: "Gửi thông tin",
    successTitle: "Cảm ơn Quý khách!",
    successDesc: "Tài khoản của bạn đã được tạo thành công. Vui lòng đăng nhập để bắt đầu sử dụng.",
    backLogin: "Tiếp tục (Về Đăng nhập)",
    home: "Trang chủ",
    exchange: "Quy đổi",
    aiNav: "Trợ lý AI",
    profile: "Cá nhân",
    utilities: "Tiện ích TP.HCM",
    otherUtilities: "Các tiện ích khác",
    ad: "Giảm 50% phí dịch vụ hôm nay",
    validation: {
        reqAll: "Vui lòng điền đủ thông tin", 
        reqOtp: "Vui lòng nhấn 'Gửi OTP' trước",
        otpExpired: "Mã OTP đã hết hạn. Vui lòng gửi lại",
        otpWrong: "Mã OTP không đúng",
        otpSent: "Đã gửi mã OTP!",
        cardAnalyzing: "Đang phân tích thẻ...",
        cardValid: "Ảnh hợp lệ",
        cardInvalid: "Ảnh mờ hoặc mất góc. Vui lòng chụp lại.",
        passWeak: "Mật khẩu cần > 8 ký tự, bao gồm chữ, số và ký tự đặc biệt.",
        pinInvalid: "Mã PIN phải gồm đúng 4 chữ số.",
        pinWrong: "Mã PIN không chính xác.",
        pinLocked: "Đã nhập sai quá 5 lần. Vui lòng thử lại sau 5 phút.",
        loginFail: "Sai số tài khoản hoặc mật khẩu.",
        accNotFound: "Tài khoản không tồn tại.",
        emailNotFound: "Email không tồn tại trong hệ thống.",
        agreeReq: "Vui lòng đồng ý với chính sách để tiếp tục.",
        resetSuccess: "Đổi mật khẩu thành công! Vui lòng đăng nhập lại.",
        cardNumLen: "Số thẻ phải có 16 hoặc 19 chữ số.",
        cardExpInvalid: "Tháng hết hạn không hợp lệ (01-12)."
    },
    emailSim: {
        sender: "vnx.noreply@gmail.com",
        subject: "Mã xác thực",
        bodyPrefix: "Mã xác thực của Quý khách là",
        bodySuffix: "(gồm 4 số). Hiệu lực 2 phút."
    },
    step2: {
        introTitle: "Xác nhận giấy tờ",
        introDesc: "Xác nhận thẻ Visa/Mastercard để giảm thiểu nguy cơ bị giả mạo và gian lận tài chính.",
        continue: "Tiếp tục",
        guideTitle: "Nhận diện giấy tờ",
        guideDesc: "Vui lòng chuẩn bị thẻ Visa/Mastercard có gắn chip.",
        guideNote: [
            "Chụp đủ 2 mặt: Trước & Sau",
            "Không bị mờ, lóa sáng",
            "Thẻ phải còn hạn sử dụng",
            "Rõ số thẻ và tên chủ thẻ"
        ],
        frontCam: "Chụp Mặt Trước",
        backCam: "Chụp Mặt Sau",
        tapCam: "Chạm để chụp / Tải ảnh",
        retake: "Chụp lại",
        usePhoto: "Dùng ảnh này",
        ocrTitle: "Thông tin trích xuất",
        legalTitle: "Chính sách & Quy định",
        confirmPolicy: "Tôi đã đọc và đồng ý",
        personalInfo: "Thông tin cá nhân",
        cardInfo: "Thông tin thẻ (OCR)",
        legalHeader: "TERMS OF SERVICE & PRIVACY POLICY",
        legalIntro: 'Khi truy cập và sử dụng dịch vụ của chúng tôi, bạn ("Người dùng") xác nhận rằng bạn đã đọc, hiểu và đồng ý bị ràng buộc về mặt pháp lý bởi các Điều khoản này. Tài liệu này chịu sự điều chỉnh của pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.',
        legalContent: [
            {
                title: "PHẦN I: ĐIỀU KHOẢN DỊCH VỤ",
                text: ""
            },
            {
                title: "1. Hoạt động Đổi ngoại tệ được Ủy quyền",
                text: "Tham chiếu: Pháp lệnh Quản lý Ngoại hối số 28/2005/PL-UBTVQH11 (Sửa đổi 2013).\nHỗ trợ được cấp phép: Tất cả các dịch vụ đổi tiền tệ được cung cấp thông qua nền tảng này được thực hiện độc quyền thông qua các tổ chức tài chính và đối tác được Ngân hàng Nhà nước Việt Nam (NHNN) cấp phép.\nMục đích Hợp pháp: Người dùng tuyên bố rằng tất cả các nhu cầu ngoại hối (như du lịch, du học hoặc kinh doanh) là hợp pháp và tuân thủ các chính sách quản lý ngoại hối của Việt Nam."
            },
            {
                title: "2. Minh bạch, Giá cả & Ràng buộc Pháp lý",
                text: "Tham chiếu: Bộ luật Dân sự số 91/2015/QH13.\nTỷ giá Thời gian thực: Tỷ giá hối đoái và phí xử lý được hiển thị theo thời gian thực.\nHình thành Hợp đồng: Khi Người dùng nhấp vào \"Xác nhận\" hoặc \"Ủy quyền\", giao dịch cấu thành một hợp đồng ràng buộc về mặt pháp lý. Bất kỳ yêu cầu hủy bỏ nào sau đó đều phải tuân theo chính sách hoàn tiền và đảo ngược của chúng tôi và có thể phải chịu phí hành chính."
            },
            {
                title: "3. Trách nhiệm & Tuyên bố của Người dùng",
                text: "Tham chiếu: Nghị định 144/2021/NĐ-CP.\nTính xác thực: Người dùng đảm bảo rằng tất cả các tài liệu nhận dạng, thông tin cá nhân và chữ ký số được cung cấp là xác thực và thuộc về Người dùng.\nHành vi Bị cấm: Sử dụng tài liệu giả mạo, mạo danh người khác hoặc cung cấp thông tin sai lệch là vi phạm pháp luật. Chúng tôi có quyền chấm dứt dịch vụ ngay lập tức và báo cáo các hoạt động đó cho các cơ quan có thẩm quyền của Việt Nam để truy tố."
            },
            {
                title: "PHẦN II: CHÍNH SÁCH QUYỀN RIÊNG TƯ",
                text: ""
            },
            {
                title: "1. Xử lý & Bảo vệ Dữ liệu Cá nhân",
                text: "Tham chiếu: Nghị định 13/2023/NĐ-CP về Bảo vệ Dữ liệu Cá nhân.\nThu thập Dữ liệu: Chúng tôi thu thập dữ liệu cá nhân bao gồm, nhưng không giới hạn ở: Họ tên đầy đủ, Chi tiết Hộ chiếu/CCCD và Dữ liệu sinh trắc học (nhận diện khuôn mặt).\nMục đích & Mã hóa: Dữ liệu được thu thập chỉ nhằm mục đích cho các thủ tục Nhận biết Khách hàng Điện tử (eKYC) và xác minh giao dịch. Tất cả dữ liệu nhạy cảm đều được mã hóa và lưu trữ tuân thủ các tiêu chuẩn an ninh mạng của Việt Nam.\nQuyền của Chủ thể Dữ liệu: Người dùng có quyền truy cập, chỉnh sửa hoặc yêu cầu xóa dữ liệu cá nhân của họ, miễn là các yêu cầu đó không mâu thuẫn với luật lưu trữ hồ sơ tài chính bắt buộc."
            },
            {
                title: "2. Chống Rửa tiền (AML) & Chống Tài trợ Khủng bố",
                text: "Tham chiếu: Luật Phòng, chống rửa tiền số 14/2022/QH15.\nXác minh: Để tuân thủ các quy định AML quốc gia, chúng tôi có quyền xác minh Nguồn tiền cho bất kỳ giao dịch nào.\nĐình chỉ: Chúng tôi có quyền tạm ngưng hoặc khóa vĩnh viễn các tài khoản và giao dịch bị nghi ngờ gian lận, rửa tiền hoặc liên quan đến các hoạt động bị cấm mà không cần thông báo trước, theo yêu cầu của pháp luật."
            },
            {
                title: "PHẦN III: CÁC ĐIỀU KHOẢN CHUNG",
                text: "Sửa đổi: Chúng tôi có quyền sửa đổi các điều khoản này bất cứ lúc nào để phản ánh những thay đổi trong luật pháp Việt Nam. Việc tiếp tục sử dụng dịch vụ ngụ ý chấp nhận các điều khoản đã cập nhật.\nGiải quyết Tranh chấp: Bất kỳ tranh chấp nào phát sinh từ hoặc liên quan đến các điều khoản này trước tiên sẽ được giải quyết thông qua thương lượng. Nếu không đạt được thỏa thuận, tranh chấp sẽ được đệ trình lên các Tòa án có thẩm quyền của nước Cộng hòa Xã hội Chủ nghĩa Việt Nam.\nĐồng ý: Bằng cách nhấp vào \"Đồng ý và Tiếp tục\", bạn xác nhận rằng bạn có đủ năng lực pháp lý để tham gia thỏa thuận này và đồng ý với việc xử lý dữ liệu cá nhân của bạn như được mô tả ở trên."
            }
        ]
    },
    step3: {
        accSetup: "Thiết lập tài khoản",
        paymentSetup: "Visa/Mastercard", 
        passReq: "Yêu cầu: >8 ký tự, Chữ + Số + Ký tự đặc biệt",
        pinReq: "Dùng để xác thực giao dịch (Nạp/Rút/QR)",
        cardHolder: "Chủ thẻ Visa/Mastercard (Họ và Tên)",
        cardNum: "Số thẻ Visa/Mastercard",
        cardExp: "Mã hết hạn (MM/YY)",
        cardCvv: "Mã Bảo Mật (CVV)",
        addCard: "Thêm thẻ Visa/Mastercard khác",
        addCardTitle: "Thêm thẻ mới",
        editCardTitle: "Chỉnh sửa thẻ",
        saveCard: "Lưu thẻ",
        cancel: "Hủy bỏ",
        linkedCards: "Thẻ đã liên kết (Nhấp để xem/sửa):"
    },
    forgot: {
        title: "Quên mật khẩu?",
        desc: "Nhập email (username) để nhận mã OTP.",
        resetTitle: "Đặt lại mật khẩu",
        newPass: "Mật khẩu mới",
        confirmOtp: "Xác nhận OTP",
        updatePass: "Cập nhật mật khẩu"
    },
    genderOpt: { male: "Nam", female: "Nữ", other: "Khác" },
    dashboard: {
       greeting: "Xin chào,",
       balance: "Số dư khả dụng",
       actions: {
           deposit: "Nạp/Rút",
           receive: "Nhận tiền",
           pay: "Thanh toán",
           account: "Tài khoản"
       },
       rates: {
           title: "Tỷ giá quy đổi",
           live: "Live",
           currency: "Đơn vị",
           buy: "Mua vào",
           sell: "Bán ra",
           rate: "Tỷ giá"
       },
       utilities: "Tiện ích TP.HCM",
       otherUtilities: "Các tiện ích khác",
       ads: {
           hotel: { title: "Đặt phòng khách sạn", subtitle: "Giảm tới 50%", btn: "Đặt ngay" },
           tour: { title: "Tour Hạ Long", subtitle: "Ưu đãi mùa hè", btn: "Khám phá" },
           esim: { title: "eSIM Du lịch", subtitle: "Data tốc độ cao", btn: "Mua ngay" },
           culture: { title: "Văn hóa & Lịch sử", subtitle: "Bản đồ tương tác & Mẹo", btn: "Khám phá" }
       },
       notifications: {
           title: "Thông báo",
           empty: "Không có thông báo mới",
           list: [
               { id: 1, title: 'Hoàn tiền 50%', desc: 'Ưu đãi hoàn tiền khi thanh toán QR tại Starbucks.', time: '2 phút trước' },
               { id: 2, title: 'Giao dịch thành công', desc: 'Bạn đã nạp 500,000 VND vào ví.', time: '1 giờ trước' },
               { id: 3, title: 'Cảnh báo đăng nhập', desc: 'Phát hiện đăng nhập lạ từ thiết bị iPhone 15.', time: '1 ngày trước' }
           ]
       }
    },
    deposit: {
        title: "Nạp / Rút / Quy đổi",
        tabDeposit: "Nạp tiền",
        tabWithdraw: "Rút tiền",
        labelDeposit: "Số tiền muốn nạp",
        labelWithdraw: "Số tiền rút (VND)",
        availBalance: "Số dư khả dụng",
        rate: "Tỷ giá quy đổi",
        fee: "Phí chuyển đổi",
        receive: "Thực nhận",
        totalDeduct: "Tổng trừ",
        otherTrans: "Giao dịch khác",
        infoDeposit: "Số tiền VND sẽ được cộng vào ví ngay sau khi xác nhận. Tỷ giá được cập nhật theo thời gian thực.",
        infoWithdraw: "Số tiền VND sẽ được trừ từ ví và quy đổi sang ngoại tệ để hoàn về thẻ Visa liên kết.",
        confirmDeposit: "Xác nhận Nạp tiền",
        confirmWithdraw: "Xác nhận Rút tiền",
        success: "Giao dịch thành công!",
        successDeposit: "Bạn đã nạp thành công",
        successWithdraw: "Yêu cầu rút đang được xử lý cho",
        backHome: "Về trang chủ",
        alertAmount: "Vui lòng nhập số tiền hợp lệ",
        alertBalance: "Số dư không đủ"
    },
    receive: {
        title: "Nhận Tiền",
        zoom: "Phóng to",
        placeholder: "Nhập nội dung (tùy chọn)",
        amountPlace: "Nhập số tiền (tùy chọn)",
        copy: "Sao chép Link",
        share: "Chia sẻ",
        download: "Lưu ảnh",
        info: "Quét mã để chuyển khoản nhanh 24/7.",
        bankName: "Ngân hàng TMCP Ngoại thương Việt Nam"
    },
    scan: {
        title: "Quét mã QR",
        instruction: "Di chuyển camera đến vùng chứa mã QR",
        gallery: "Thư viện",
        myCode: "Mã của tôi",
        sim: "Mô phỏng Camera",
        simSuccess: "Thanh toán thành công! (Giả lập)"
    },
    account: {
        title: "Tài khoản",
        info: "Thông tin cá nhân",
        management: "Quản lý Thẻ & Tài khoản",
        security: "Cài đặt bảo mật",
        logout: "Đăng xuất",
        phone: "Số điện thoại",
        dob: "Ngày sinh",
        address: "Địa chỉ",
        changePass: "Đổi mật khẩu",
        currentPass: "Mật khẩu hiện tại",
        newPass: "Mật khẩu mới",
        confirmPass: "Xác nhận mật khẩu mới",
        biometric: "Đăng nhập sinh trắc học",
        twoFa: "Xác thực 2 lớp (2FA)",
        save: "Lưu",
        cancel: "Huỷ"
    },
    ai: {
        placeholder: "Hỏi Gemini về tỷ giá, lịch sử, du lịch...",
        welcome: "Xin chào! Mình là Trợ lý AI Du lịch. Mình có thể giúp gì cho bạn hôm nay? 😊",
        btnSend: "Gửi",
        responseIntro: "Tôi có thể giúp bạn bằng tiếng Việt.",
        suggestions: ["Tỷ giá USD hôm nay?", "Khách sạn nào tốt ở Q1?", "Chỗ nào ăn phở ngon?", "Lịch sử Chợ Bến Thành"]
    },
    culture: {
        title: "Văn hóa & Lịch sử",
        map: "Bản đồ Văn hóa",
        storyteller: "AI Thuyết minh",
        etiquette: "Cẩm nang Ứng xử",
        nearby: "Di tích gần bạn: Nhà thờ Đức Bà (0.5km)",
        playAudio: "Nghe AI kể chuyện",
        playing: "Đang phát...",
        tip: "Mẹo: Nên ăn mặc kín đáo khi tham quan nơi tôn nghiêm.",
        discovery: "AI Phát hiện địa điểm gần bạn",
        etiquetteTitle: "Lưu ý văn hóa",
        openMap: "Mở Google Map"
    },
    esim: {
        title: "Tourist eSIM",
        buy: "Mua ngay",
        success: "Kích hoạt eSIM thành công!",
        fail: "Số dư không đủ. Vui lòng nạp thêm.",
        validity: "Hạn dùng",
        dataCap: "Dung lượng",
        calls: "Gọi thoại"
    },
    utils: {
        flight: "Vé máy bay",
        taxi: "Taxi",
        train: "Tàu hỏa",
        bus: "Xe khách",
        golf: "Golf",
        boat: "Tàu thủy",
        medical: "Y tế",
        book: "Đặt ngay"
    }
  },
  ENG: {
    welcomeTitle: "Vietnam\nTourist Card",
    welcomeSlogan: "Seamless cashless travel & payment experience.",
    login: "Login",
    register: "Open Account Now",
    loginWelcome: "Welcome Back!",
    loginSubtitle: "Login to continue transactions.",
    accountNum: "Account Number",
    password: "Password",
    forgotPass: "Forgot Password?",
    noAccount: "No account? ",
    registerNow: "Register now",
    regTitle: "Online Registration",
    steps: ['Personal Info', 'Identity Check', 'Service Reg', 'Complete'], 
    fullName: "Full Name",
    gender: "Gender",
    email: "Verification Email",
    sendOtp: "Send OTP",
    resendOtp: "Resend",
    otpPlaceholder: "Enter OTP",
    verifyContinue: "Verify & Continue",
    scanTitle: "Identity Verification",
    confirmInfo: "Confirm Info",
    serviceReg: "Service Registration",
    yourAccount: "Your Account Number",
    createPass: "Create Login Password",
    createPin: "Create Transaction PIN (4 digits)",
    pinPlaceholder: "1234",
    enterPin: "Enter PIN to confirm",
    agreeTerm: "I agree to the policies.",
    finish: "Submit Information",
    successTitle: "Thank You!",
    successDesc: "Your account has been created successfully. Please login to start.",
    backLogin: "Continue (To Login)",
    home: "Home",
    exchange: "Exchange",
    aiNav: "AI Assistant", 
    profile: "Profile",
    utilities: "HCMC Utilities",
    otherUtilities: "Other Utilities",
    ad: "50% off service fees today",
    validation: {
        reqAll: "Please fill in all information",
        reqOtp: "Please click 'Send OTP' first",
        otpExpired: "OTP has expired. Please resend",
        otpWrong: "Incorrect OTP",
        otpSent: "OTP sent!",
        cardAnalyzing: "Analyzing card...",
        cardValid: "Card Valid",
        cardInvalid: "Chip missing or blurry. Please retake.",
        passWeak: "Password must be > 8 characters, include letters, numbers & special characters.",
        pinInvalid: "PIN must be exactly 4 digits.",
        pinWrong: "Incorrect PIN.",
        pinLocked: "Incorrect PIN limit reached. Please try again in 5 minutes.",
        loginFail: "Invalid Account Number or Password.",
        accNotFound: "Account not found.",
        emailNotFound: "Email not found in system.",
        agreeReq: "You must agree to the policies to continue.",
        resetSuccess: "Password reset successfully! Please login again.",
        cardNumLen: "Card number must be 16 or 19 digits.",
        cardExpInvalid: "Invalid Expiry Month (01-12)."
    },
    emailSim: {
        sender: "vnx.noreply@gmail.com",
        subject: "Account Verification Code",
        bodyPrefix: "Your verification code is",
        bodySuffix: "(4 digits). Valid for 2 minutes."
    },
    step2: {
        introTitle: "Document Verification",
        introDesc: "Verify Visa/Mastercard to minimize fraud risk.",
        continue: "Continue",
        guideTitle: "Document Recognition",
        guideDesc: "Please prepare your Chip-enabled Visa/Mastercard.",
        guideNote: [
            "Capture both Front & Back",
            "Ensure no glare or blur",
            "Card must be valid",
            "Clear text and numbers"
        ],
        frontCam: "Capture Front",
        backCam: "Capture Back",
        tapCam: "Tap to capture / Upload",
        retake: "Retake",
        usePhoto: "Use Photo",
        ocrTitle: "Extracted Information",
        legalTitle: "Legal & Policies",
        confirmPolicy: "I have read and agree",
        personalInfo: "Personal Info",
        cardInfo: "Card Info (OCR)",
        legalHeader: "TERMS OF SERVICE & PRIVACY POLICY",
        legalIntro: 'By accessing and using our services, you (the "User") acknowledge that you have read, understood, and agreed to be legally bound by these Terms. This document is governed by the laws of the Socialist Republic of Vietnam.',
        legalContent: [
            {
                title: "PART I: TERMS OF SERVICE",
                text: ""
            },
            {
                title: "1. Authorized Exchange Operations",
                text: "Ref: Ordinance on Foreign Exchange Control No. 28/2005/PL-UBTVQH11 (Amended 2013).\nLicensed Facilitation: All currency exchange services offered through this platform are facilitated exclusively through financial institutions and partners licensed by the State Bank of Vietnam (SBV).\nLegal Purpose: The User declares that all foreign exchange demands (such as travel, study abroad, or business) are legitimate and comply with Vietnam’s foreign exchange management policies."
            },
            {
                title: "2. Transparency, Pricing & Legal Binding",
                text: "Ref: Civil Code No. 91/2015/QH13.\nReal-time Rates: Exchange rates and processing fees are displayed in real-time.\nContract Formation: Once the User clicks \"Confirm\" or \"Authorize,\" the transaction constitutes a legally binding contract. Any subsequent requests for cancellation are subject to our refund and reversal policies and may incur administrative fees."
            },
            {
                title: "3. User Liability & Declarations",
                text: "Ref: Decree 144/2021/ND-CP.\nAuthenticity: The User warrants that all identification documents, personal information, and digital signatures provided are authentic and belong to the User.\nProhibited Conduct: Using forged documents, impersonating others, or providing false information is a violation of the law. We reserve the right to terminate services immediately and report such activities to the relevant Vietnamese authorities for prosecution."
            },
            {
                title: "PART II: PRIVACY POLICY",
                text: ""
            },
            {
                title: "1. Personal Data Processing & Protection",
                text: "Ref: Decree 13/2023/ND-CP on Personal Data Protection.\nData Collection: We collect personal data including, but not limited to: Full name, Passport/ID details, and Biometric data (facial recognition).\nPurpose & Encryption: Data is collected solely for Electronic Know Your Customer (eKYC) procedures and transaction verification. All sensitive data is encrypted and stored in compliance with Vietnam’s cybersecurity standards.\nData Subject Rights: Users have the right to access, rectify, or request the deletion of their personal data, provided such requests do not conflict with mandatory financial record-keeping laws."
            },
            {
                title: "2. Anti-Money Laundering (AML) & Counter-Terrorist Financing",
                text: "Ref: Law on Anti-Money Laundering No. 14/2022/QH15.\nVerification: To comply with national AML regulations, we reserve the right to verify the Source of Funds for any transaction.\nSuspension: We reserve the right to temporarily suspend or permanently block accounts and transactions suspected of fraud, money laundering, or involvement in prohibited activities without prior notice, as required by law."
            },
            {
                title: "PART III: GENERAL PROVISIONS",
                text: "Amendments: We reserve the right to modify these terms at any time to reflect changes in Vietnamese law. Continued use of the service implies acceptance of the updated terms.\nDispute Resolution: Any disputes arising from or relating to these terms shall first be settled through negotiation. If no settlement is reached, the dispute shall be submitted to the competent Courts of the Socialist Republic of Vietnam.\nConsent: By clicking \"Agree and Continue,\" you confirm that you have the full legal capacity to enter into this agreement and consent to the processing of your personal data as described above."
            }
        ]
    },
    step3: {
        accSetup: "Account Setup",
        paymentSetup: "Visa/Mastercard", 
        passReq: "Strong password: >8 characters, letters, numbers & symbols",
        pinReq: "Used for transactions (Deposit/Withdraw/QR)",
        cardHolder: "Cardholder Name",
        cardNum: "Card Number",
        cardExp: "Expiry Date (MM/YY)",
        cardCvv: "Security Code (CVV)",
        addCard: "Add another Visa/Mastercard",
        addCardTitle: "Add New Card",
        editCardTitle: "Edit Card",
        saveCard: "Save Card",
        cancel: "Cancel",
        linkedCards: "Linked Cards (Click to edit):"
    },
    forgot: {
        title: "Forgot Password?",
        desc: "Enter email (username) to receive OTP.",
        resetTitle: "Reset Password",
        newPass: "New Password",
        confirmOtp: "Verify OTP",
        updatePass: "Update Password"
    },
    genderOpt: { male: "Male", female: "Female", other: "Other" },
    dashboard: {
       greeting: "Hello,",
       balance: "Available Balance",
       actions: {
           deposit: "Deposit/Withdraw",
           receive: "Receive",
           pay: "Pay",
           account: "Account"
       },
       rates: {
           title: "Exchange Rate",
           live: "Live",
           currency: "Currency",
           buy: "Buy",
           sell: "Sell",
           rate: "Rate"
       },
       utilities: "Travel Utilities",
       otherUtilities: "Other Utilities",
       ads: {
           hotel: { title: "Book Hotels", subtitle: "Up to 50% Off", btn: "Book Now" },
           tour: { title: "Ha Long Tour", subtitle: "Summer Deal", btn: "Explore" },
           esim: { title: "Tourist eSIM", subtitle: "High Speed Data", btn: "Buy Now" },
           culture: { title: "Culture & History", subtitle: "Interactive Map & Tips", btn: "Discover" }
       },
       notifications: {
           title: "Notifications",
           empty: "No new notifications",
           list: [
               { id: 1, title: '50% Cashback', desc: 'Cashback offer for QR payments at Starbucks.', time: '2 mins ago' },
               { id: 2, title: 'Transaction Successful', desc: 'You deposited 500,000 VND.', time: '1 hour ago' },
               { id: 3, title: 'Login Alert', desc: 'New login detected from iPhone 15.', time: '1 day ago' }
           ]
       }
    },
    deposit: {
        title: "Deposit / Withdraw / Exchange",
        tabDeposit: "Deposit",
        tabWithdraw: "Withdraw",
        labelDeposit: "Deposit Amount",
        labelWithdraw: "Withdraw Amount (VND)",
        availBalance: "Available Balance",
        rate: "Exchange Rate",
        fee: "Exchange Fee",
        receive: "You Receive",
        totalDeduct: "Total Deducted",
        otherTrans: "Other Transaction",
        infoDeposit: "VND amount will be credited immediately. Rates are updated in real-time.",
        infoWithdraw: "VND amount will be deducted and converted to foreign currency refunded to your linked Visa card.",
        confirmDeposit: "Confirm Deposit",
        confirmWithdraw: "Confirm Withdraw",
        success: "Transaction Successful!",
        successDeposit: "You have successfully deposited",
        successWithdraw: "Withdrawal request processing for",
        backHome: "Back to Home",
        alertAmount: "Please enter a valid amount",
        alertBalance: "Insufficient balance"
    },
    receive: {
        title: "Receive Money",
        zoom: "Zoom",
        placeholder: "Content (optional)",
        amountPlace: "Amount (optional)",
        copy: "Copy Link",
        share: "Share",
        download: "Save Image",
        info: "Scan to transfer money 24/7.",
        bankName: "Joint Stock Commercial Bank for Foreign Trade of Vietnam"
    },
    scan: {
        title: "Scan QR Code",
        instruction: "Align camera with QR code",
        gallery: "Gallery",
        myCode: "My Code",
        sim: "Camera Feed Simulator",
        simSuccess: "Payment Successful! (Simulated)"
    },
    account: {
        title: "Account",
        info: "Personal Information",
        management: "Card & Account Management",
        security: "Security Settings",
        logout: "Logout",
        phone: "Phone",
        dob: "Date of Birth",
        address: "Address",
        changePass: "Change Password",
        currentPass: "Current Password",
        newPass: "New Password",
        confirmPass: "Confirm New Password",
        biometric: "Biometric Login",
        twoFa: "2-Factor Auth (2FA)",
        save: "Save",
        cancel: "Cancel"
    },
    ai: {
        placeholder: "Ask Gemini about rates, history, travel...",
        welcome: "Hello! I am your Travel AI Assistant. How can I help you today?",
        btnSend: "Send",
        responseIntro: "I can help you with that in English.",
        suggestions: ["Exchange rates today?", "Best hotels in Q1?", "Where to eat Pho?", "Ben Thanh History"]
    },
    culture: {
        title: "Culture & History",
        map: "Culture Map",
        storyteller: "AI Storyteller",
        etiquette: "Etiquette Guide",
        nearby: "Nearby: Notre Dame Cathedral (0.5km)",
        playAudio: "Listen to AI",
        playing: "Playing...",
        tip: "Tip: Dress modestly when visiting sacred sites.",
        discovery: "AI Discovered Nearby Place",
        etiquetteTitle: "Cultural Etiquette",
        openMap: "Open Google Map"
    },
    esim: {
        title: "Tourist eSIM",
        buy: "Buy Now",
        success: "eSIM Activated Successfully!",
        fail: "Insufficient balance. Please deposit.",
        validity: "Validity",
        dataCap: "Data",
        calls: "Calls"
    },
    utils: {
        flight: "Flights",
        taxi: "Taxi",
        train: "Train",
        bus: "Bus",
        golf: "Golf",
        boat: "Boat",
        medical: "Medical",
        book: "Book Now"
    }
  }
};