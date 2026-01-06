import React, { useState, useEffect } from 'react';
import { ChevronLeft, Star, MapPin, Signal, Sparkles, Compass, X, Search, Navigation, Calendar, Map as MapIcon, Link, Lightbulb, Church, Landmark, ShoppingBasket, Mail, Music2, Library, Ship, Tent, CheckCircle2, Plane, Car, Train, Bus, Flag, Coffee, Palette, Trees, ArrowRight, Clock, DollarSign, Utensils, Camera, Gem, Building2, Flower, Beer, BookOpen, Palmtree, Anchor, Mountain, School, HeartPulse, Stethoscope, Eye, Leaf } from 'lucide-react';
import { TranslationStructure, User, Hotel as HotelType, ESim, Lang } from '../../types';
import Button from '../ui/Button';
import PinModal from '../ui/PinModal';
import NotificationToast from '../ui/NotificationToast';

interface UtilitiesViewProps {
    type: string;
    onBack: () => void;
    t: TranslationStructure;
    theme: 'light' | 'dark';
    balance: number;
    setBalance: React.Dispatch<React.SetStateAction<number>>;
    user: User | null;
    lang: Lang;
}

const UtilitiesView: React.FC<UtilitiesViewProps> = ({ type, onBack, t, theme, balance, setBalance, user, lang }) => {
    const isDark = theme === 'dark';
    const bgClass = isDark ? 'bg-gray-900 text-white' : 'bg-[#F5F7FA] text-[#1A1F36]';
    
    // Booking State
    const [bookingState, setBookingState] = useState<'form' | 'searching' | 'results' | 'success'>('form');
    const [bookingData, setBookingData] = useState<any>({});
    const [searchResults, setSearchResults] = useState<any[]>([]);
    
    // Existing States
    const [selectedLoc, setSelectedLoc] = useState<any>(null); 
    const [selectedHotel, setSelectedHotel] = useState<HotelType | null>(null);
    const [aiNotification, setAiNotification] = useState(false);
    const [showPinModal, setShowPinModal] = useState(false);
    const [pendingPurchase, setPendingPurchase] = useState<any>(null);
    const [pinAttempts, setPinAttempts] = useState(0);
    const [isLocked, setIsLocked] = useState(false);
    const [lockoutEnd, setLockoutEnd] = useState<number | null>(null);
    const [notification, setNotification] = useState<{sender: string, title: string, message: string} | null>(null);
    
    // Search for Culture
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const lockTime = localStorage.getItem('pinLockUntil');
        if (lockTime && parseInt(lockTime) > Date.now()) {
            setIsLocked(true);
            setLockoutEnd(parseInt(lockTime));
        } else {
            setIsLocked(false);
            setLockoutEnd(null);
            if (lockTime) localStorage.removeItem('pinLockUntil');
        }
    }, [showPinModal]);

    // Data for eSIMs
    const esims: ESim[] = [
        { id: 1, name: "VN Unlimited 7 Days", data: "Unlimited", calls: "No", validity: "7 Days", price: "250,000 VND", val: 250000, type: "Data Only" },
        { id: 2, name: "VN 5GB/Day 10 Days", data: "5GB/Day", calls: "20 Mins", validity: "10 Days", price: "180,000 VND", val: 180000, type: "Data + Call" },
        { id: 3, name: "VN 10GB 30 Days", data: "10GB Total", calls: "No", validity: "30 Days", price: "150,000 VND", val: 150000, type: "Data Only" },
        { id: 4, name: "VN Flexi 15 Days", data: "2GB/Day", calls: "No", validity: "15 Days", price: "120,000 VND", val: 120000, type: "Data Only" },
        { id: 5, name: "VN Super Data 30 Days", data: "4GB/Day", calls: "50 SMS", validity: "30 Days", price: "300,000 VND", val: 300000, type: "Data + SMS" },
    ];
    
    // Hotel Data
    const hotels: HotelType[] = [
        { id: 1, name: "Park Hyatt Saigon", rating: 5, price: "6,500,000 VND", numericPrice: 6500000, oldPrice: "8,000,000 VND", img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80", address: "2 Lam Son Square, Ben Nghe, Q1", locationUrl: "https://www.google.com/maps/search/?api=1&query=Park+Hyatt+Saigon" },
        { id: 2, name: "Caravelle Saigon", rating: 5, price: "3,500,000 VND", numericPrice: 3500000, oldPrice: "5,000,000 VND", img: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80", address: "19-23 Lam Son Square, Ben Nghe, Q1", locationUrl: "https://www.google.com/maps/search/?api=1&query=Caravelle+Saigon" },
        { id: 3, name: "Rex Hotel", rating: 5, price: "2,800,000 VND", numericPrice: 2800000, oldPrice: "4,200,000 VND", img: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80", address: "141 Nguyen Hue, Ben Nghe, Q1", locationUrl: "https://www.google.com/maps/search/?api=1&query=Rex+Hotel+Saigon" },
        { id: 4, name: "Hotel Majestic Saigon", rating: 5, price: "3,200,000 VND", numericPrice: 3200000, oldPrice: "4,500,000 VND", img: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=800&q=80", address: "1 Dong Khoi, Ben Nghe, Q1", locationUrl: "https://www.google.com/maps/search/?api=1&query=Hotel+Majestic+Saigon" },
        { id: 5, name: "Liberty Central", rating: 4, price: "1,500,000 VND", numericPrice: 1500000, oldPrice: "2,500,000 VND", img: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80", address: "59 Pasteur, Ben Nghe, Q1", locationUrl: "https://www.google.com/maps/search/?api=1&query=Liberty+Central+Saigon" },
    ];

    // Culture Locations with Icons - Spaced Out Coordinates
    const cultureLocations = [
        { 
            id: 1, icon: Church, color: "text-red-500", bg: "bg-red-50",
            name_vi: "Nhà thờ Đức Bà", name_en: "Notre Dame Cathedral",
            x: 52, y: 38, 
            desc_vi: "Biểu tượng du lịch nổi tiếng của Sài Gòn với kiến trúc độc đáo kết hợp giữa phong cách Roman và Gothic...", 
            desc_en: "A Symbol of the City. Notre Dame Cathedral is a famous tourist symbol of Saigon with its unique architecture combining Roman and Gothic styles.",
            tip_vi: "Lưu ý: Nhà thờ đang trùng tu.", tip_en: "Note: Currently under renovation.",
            url: "https://www.google.com/maps/search/?api=1&query=Notre+Dame+Cathedral+Saigon" 
        },
        { 
            id: 2, icon: Landmark, color: "text-yellow-600", bg: "bg-yellow-50",
            name_vi: "Dinh Độc Lập", name_en: "Independence Palace",
            x: 42, y: 45, 
            desc_vi: "Di tích quốc gia đặc biệt, gắn liền với lịch sử và văn hóa dân tộc...", 
            desc_en: "Reunification Hall. Independence Palace is a special national monument, closely associated with the history and culture of the nation.",
            tip_vi: "Mua vé tham quan cả khu trưng bày.", tip_en: "Buy full access ticket.",
            url: "https://www.google.com/maps/search/?api=1&query=Independence+Palace" 
        },
        { 
            id: 3, icon: ShoppingBasket, color: "text-blue-500", bg: "bg-blue-50",
            name_vi: "Chợ Bến Thành", name_en: "Ben Thanh Market",
            x: 48, y: 55, 
            desc_vi: "Khu chợ sầm uất bậc nhất Sài Gòn...", 
            desc_en: "Saigon's Busiest Market. Located right in the city center with four prime frontages, Ben Thanh Market is a bustling market.",
            tip_vi: "Nhớ trả giá!", tip_en: "Remember to bargain!",
            url: "https://www.google.com/maps/search/?api=1&query=Ben+Thanh+Market" 
        },
        {
            id: 4, icon: Mail, color: "text-orange-500", bg: "bg-orange-50",
            name_vi: "Bưu điện TP", name_en: "HCMC Post Office",
            x: 58, y: 36,
            desc_vi: "Tuyệt tác kiến trúc độc đáo được thiết kế bởi Gustave Eiffel...", 
            desc_en: "This unique architectural masterpiece was designed by Gustave Eiffel and built from 1886 to 1891.",
            tip_vi: "Gửi bưu thiếp về nhà.", tip_en: "Send a postcard home.",
            url: "https://www.google.com/maps/search/?api=1&query=Saigon+Central+Post+Office"
        },
        {
            id: 5, icon: Music2, color: "text-pink-500", bg: "bg-pink-50",
            name_vi: "Nhà hát Lớn", name_en: "Opera House",
            x: 65, y: 48,
            desc_vi: "Công trình kiến trúc đồ sộ với diện tích hơn 2000m2...", 
            desc_en: "The Ho Chi Minh City Opera House is a majestic architectural structure with an area of ​​over 2,000m2.",
            tip_vi: "Chụp ảnh buổi tối rất đẹp.", tip_en: "Great for night photos.",
            url: "https://www.google.com/maps/search/?api=1&query=Saigon+Opera+House"
        },
        {
            id: 6, icon: Library, color: "text-green-600", bg: "bg-green-50",
            name_vi: "Bảo tàng Lịch sử", name_en: "History Museum",
            x: 75, y: 25,
            desc_vi: "Lưu giữ hàng chục ngàn hiện vật giá trị...", 
            desc_en: "Built in 1929, the museum currently houses tens of thousands of valuable artifacts.",
            tip_vi: "Xem múa rối nước.", tip_en: "Watch water puppetry.",
            url: "https://www.google.com/maps/search/?api=1&query=Museum+of+Vietnamese_History"
        },
        {
            id: 7, icon: Ship, color: "text-indigo-500", bg: "bg-indigo-50",
            name_vi: "Bến Nhà Rồng", name_en: "Nha Rong Wharf",
            x: 62, y: 75,
            desc_vi: "Chứng nhân lịch sử quan trọng...", 
            desc_en: "Nha Rong Wharf is an important historical witness, preserving many memories and artifacts associated with the great life of President Ho Chi Minh.",
            tip_vi: "Ngắm hoàng hôn sông Sài Gòn.", tip_en: "Watch sunset on Saigon river.",
            url: "https://www.google.com/maps/search/?api=1&query=Nha+Rong+Wharf"
        },
        {
            id: 8, icon: Tent, color: "text-emerald-700", bg: "bg-emerald-50",
            name_vi: "Địa đạo Củ Chi", name_en: "Cu Chi Tunnels",
            x: 10, y: 10,
            desc_vi: "Di tích lịch sử quốc gia nổi tiếng...", 
            desc_en: "A famous national historical site, the Cu Chi Tunnels were once a heroic resistance base with a strong underground defense system.",
            tip_vi: "Thử món khoai mì.", tip_en: "Try the boiled cassava.",
            url: "https://www.google.com/maps/search/?api=1&query=Cu+Chi+Tunnels"
        },
        {
            id: 9, icon: Coffee, color: "text-amber-700", bg: "bg-amber-50",
            name_vi: "The Workshop Coffee", name_en: "The Workshop Coffee",
            x: 55, y: 42,
            desc_vi: "Quán cà phê specialty đầu tiên tại Sài Gòn.", desc_en: "The first specialty coffee shop in Saigon. A great place to work and enjoy high-quality beans.",
            tip_vi: "Thử món Cold Brew.", tip_en: "Try their Cold Brew.",
            url: "https://www.google.com/maps/search/?api=1&query=The+Workshop+Coffee"
        },
        {
            id: 10, icon: Trees, color: "text-green-500", bg: "bg-green-100",
            name_vi: "Công viên Tao Đàn", name_en: "Tao Dan Park",
            x: 32, y: 48,
            desc_vi: "Lá phổi xanh của thành phố.", desc_en: "The green lung of the city. Ideal for morning walks and witnessing local culture.",
            tip_vi: "Đi dạo buổi sáng.", tip_en: "Visit in the early morning.",
            url: "https://www.google.com/maps/search/?api=1&query=Tao+Dan+Park"
        },
        {
            id: 11, icon: Palette, color: "text-purple-500", bg: "bg-purple-50",
            name_vi: "Haru Craft Studio", name_en: "Haru Craft Studio",
            x: 82, y: 35,
            desc_vi: "Xưởng gốm thủ công.", desc_en: "Handmade pottery studio. Join a workshop to make your own souvenir.",
            tip_vi: "Cần đặt lịch trước.", tip_en: "Booking required.",
            url: "https://www.google.com/maps/search/?api=1&query=Haru+Craft+Studio"
        },
        {
            id: 12, icon: Utensils, color: "text-orange-600", bg: "bg-orange-100",
            name_vi: "Bánh Mì Huỳnh Hoa", name_en: "Banh Mi Huynh Hoa",
            x: 35, y: 58,
            desc_vi: "Bánh mì nổi tiếng nhất Sài Gòn.", desc_en: "The most famous Banh Mi in Saigon. Expect a line, but it's worth it for the heavy filling!",
            tip_vi: "Nên mua mang về.", tip_en: "Take-away only.",
            url: "https://www.google.com/maps/search/?api=1&query=Banh+Mi+Huynh+Hoa"
        },
        {
            id: 13, icon: Gem, color: "text-yellow-700", bg: "bg-yellow-100",
            name_vi: "Chùa Ngọc Hoàng", name_en: "Jade Emperor Pagoda",
            x: 48, y: 15,
            desc_vi: "Ngôi chùa linh thiêng và cổ kính.", desc_en: "One of the most atmospheric temples in the city, filled with statues and incense smoke.",
            tip_vi: "Thắp nhang cầu bình an.", tip_en: "Light incense for peace.",
            url: "https://www.google.com/maps/search/?api=1&query=Jade+Emperor+Pagoda"
        },
        {
            id: 14, icon: Camera, color: "text-cyan-500", bg: "bg-cyan-50",
            name_vi: "Phố Đi Bộ Nguyễn Huệ", name_en: "Nguyen Hue Walking Street",
            x: 55, y: 62,
            desc_vi: "Điểm vui chơi sầm uất về đêm.", desc_en: "Bustling nightlife spot. Great for people watching and street performances.",
            tip_vi: "Đẹp nhất vào cuối tuần.", tip_en: "Best visited on weekends.",
            url: "https://www.google.com/maps/search/?api=1&query=Nguyen+Hue+Walking+Street"
        },
        // NEW LOCATIONS
        {
            id: 15, icon: Building2, color: "text-sky-600", bg: "bg-sky-50",
            name_vi: "Bitexco Financial Tower", name_en: "Bitexco Skydeck",
            x: 68, y: 65,
            desc_vi: "Tòa nhà biểu tượng hình búp sen.", desc_en: "Iconic lotus-shaped skyscraper. The Skydeck offers 360-degree views of the city.",
            tip_vi: "Ngắm hoàng hôn từ tầng 49.", tip_en: "Watch sunset from 49th floor.",
            url: "https://www.google.com/maps/search/?api=1&query=Bitexco+Financial+Tower"
        },
        {
            id: 16, icon: Building2, color: "text-teal-600", bg: "bg-teal-50",
            name_vi: "Landmark 81", name_en: "Landmark 81",
            x: 88, y: 30,
            desc_vi: "Tòa nhà cao nhất Việt Nam.", desc_en: "The tallest building in Vietnam. Features a luxury hotel, observation deck, and shopping mall.",
            tip_vi: "Trải nghiệm VR tại đài quan sát.", tip_en: "Try VR at the observation deck.",
            url: "https://www.google.com/maps/search/?api=1&query=Landmark+81"
        },
        {
            id: 17, icon: Flower, color: "text-pink-600", bg: "bg-pink-50",
            name_vi: "Chợ Hoa Hồ Thị Kỷ", name_en: "Ho Thi Ky Flower Market",
            x: 20, y: 65,
            desc_vi: "Chợ hoa lớn nhất Sài Gòn.", desc_en: "Saigon's largest flower market. A maze of colors and scents, open 24/7.",
            tip_vi: "Thử món súp cua trong chợ.", tip_en: "Try the crab soup nearby.",
            url: "https://www.google.com/maps/search/?api=1&query=Ho+Thi+Ky+Flower+Market"
        },
        {
            id: 18, icon: Beer, color: "text-purple-600", bg: "bg-purple-50",
            name_vi: "Phố Tây Bùi Viện", name_en: "Bui Vien Walking Street",
            x: 38, y: 72,
            desc_vi: "Khu phố không ngủ.", desc_en: "The backpacker district that never sleeps. Loud music, cheap beer, and street performances.",
            tip_vi: "Sôi động nhất sau 10 giờ tối.", tip_en: "Most lively after 10 PM.",
            url: "https://www.google.com/maps/search/?api=1&query=Bui+Vien+Walking+Street"
        },
        {
            id: 19, icon: BookOpen, color: "text-amber-800", bg: "bg-amber-100",
            name_vi: "Đường Sách Nguyễn Văn Bình", name_en: "Book Street",
            x: 52, y: 32,
            desc_vi: "Thiên đường cho người yêu sách.", desc_en: "A pedestrian street dedicated to books and coffee under the trees, right next to the Post Office.",
            tip_vi: "Mua sách làm quà.", tip_en: "Buy books as gifts.",
            url: "https://www.google.com/maps/search/?api=1&query=Nguyen+Van+Binh+Book+Street"
        },
        {
            id: 20, icon: Palmtree, color: "text-green-700", bg: "bg-green-100",
            name_vi: "Thảo Cầm Viên", name_en: "Saigon Zoo & Botanical Gardens",
            x: 70, y: 18,
            desc_vi: "Một trong những sở thú lâu đời nhất thế giới.", desc_en: "One of the oldest zoos in the world. A peaceful escape with ancient trees and diverse animals.",
            tip_vi: "Picnic cuối tuần.", tip_en: "Great for weekend picnics.",
            url: "https://www.google.com/maps/search/?api=1&query=Saigon+Zoo+and+Botanical+Gardens"
        },
        {
            id: 21, icon: Church, color: "text-rose-500", bg: "bg-rose-100",
            name_vi: "Nhà thờ Tân Định", name_en: "Tan Dinh Church",
            x: 35, y: 25,
            desc_vi: "Nhà thờ màu hồng nổi tiếng.", desc_en: "The famous 'Pink Church'. A stunning example of Roman architecture painted in vibrant pink.",
            tip_vi: "Chụp ảnh từ quán cà phê đối diện.", tip_en: "Photo spot from opposite cafe.",
            url: "https://www.google.com/maps/search/?api=1&query=Tan+Dinh+Church"
        },
        {
            id: 22, icon: Landmark, color: "text-red-800", bg: "bg-red-100",
            name_vi: "Chùa Bà Thiên Hậu", name_en: "Thien Hau Temple",
            x: 12, y: 75,
            desc_vi: "Ngôi chùa cổ kính của người Hoa.", desc_en: "An ancient Chinese temple in Chinatown (Cho Lon), dedicated to the Sea Goddess Mazu.",
            tip_vi: "Ngắm các vòng nhang treo.", tip_en: "Admire the hanging incense coils.",
            url: "https://www.google.com/maps/search/?api=1&query=Thien+Hau+Temple"
        },
        {
            id: 23, icon: Palette, color: "text-yellow-600", bg: "bg-yellow-50",
            name_vi: "Bảo tàng Mỹ Thuật", name_en: "Fine Arts Museum",
            x: 45, y: 68,
            desc_vi: "Kiến trúc thuộc địa tuyệt đẹp.", desc_en: "Stunning colonial architecture housing Vietnamese art pieces from different eras.",
            tip_vi: "Cầu thang xoắn ốc rất đẹp.", tip_en: "The spiral staircase is iconic.",
            url: "https://www.google.com/maps/search/?api=1&query=Ho+Chi+Minh+City+Museum+of+Fine+Arts"
        },
        {
            id: 24, icon: Anchor, color: "text-blue-800", bg: "bg-blue-100",
            name_vi: "Bạch Đằng Waterbus", name_en: "Bach Dang Waterbus Station",
            x: 65, y: 58,
            desc_vi: "Ngắm thành phố từ sông Sài Gòn.", desc_en: "Take a waterbus ride to see the city skyline from the Saigon River.",
            tip_vi: "Đi chuyến hoàng hôn 5PM.", tip_en: "Take the 5PM sunset trip.",
            url: "https://www.google.com/maps/search/?api=1&query=Bach+Dang+Wharf"
        },
        {
            id: 25, icon: Mountain, color: "text-green-800", bg: "bg-green-200",
            name_vi: "Rừng Sác Cần Giờ", name_en: "Can Gio Mangrove Forest",
            x: 88, y: 88,
            desc_vi: "Khu dự trữ sinh quyển thế giới.", desc_en: "UNESCO Biosphere Reserve. Famous for monkey island and crocodile farm.",
            tip_vi: "Cẩn thận khỉ lấy kính mát!", tip_en: "Beware of monkeys stealing glasses!",
            url: "https://www.google.com/maps/search/?api=1&query=Can+Gio+Mangrove+Forest"
        },
        {
            id: 26, icon: School, color: "text-indigo-700", bg: "bg-indigo-100",
            name_vi: "Trường THPT Lê Hồng Phong", name_en: "Le Hong Phong High School",
            x: 22, y: 55,
            desc_vi: "Kiến trúc Pháp cổ điển.", desc_en: "Classic French colonial architecture. One of the most prestigious schools in the city.",
            tip_vi: "Chỉ tham quan bên ngoài.", tip_en: "View from outside only.",
            url: "https://www.google.com/maps/search/?api=1&query=Le+Hong+Phong+High+School+for+the+Gifted"
        },
        {
            id: 27, icon: Tent, color: "text-red-500", bg: "bg-red-50",
            name_vi: "Công viên Văn hóa Đầm Sen", name_en: "Dam Sen Cultural Park",
            x: 8, y: 40,
            desc_vi: "Công viên giải trí lâu đời.", desc_en: "Long-standing amusement and water park with gardens and lakes.",
            tip_vi: "Thử công viên nước.", tip_en: "Try the water park section.",
            url: "https://www.google.com/maps/search/?api=1&query=Dam+Sen+Cultural+Park"
        },
        {
            id: 28, icon: Flag, color: "text-orange-700", bg: "bg-orange-100",
            name_vi: "KDL Suối Tiên", name_en: "Suoi Tien Theme Park",
            x: 92, y: 12,
            desc_vi: "Công viên chủ đề Phật giáo.", desc_en: "Buddhism-themed amusement park. Famous for its giant dragon and Buddha statues.",
            tip_vi: "Hồ Tiên Đồng.", tip_en: "Visit Tien Dong Beach.",
            url: "https://www.google.com/maps/search/?api=1&query=Suoi+Tien+Theme+Park"
        },
        {
            id: 29, icon: Gem, color: "text-blue-400", bg: "bg-blue-50",
            name_vi: "Hồ Con Rùa", name_en: "Turtle Lake",
            x: 42, y: 30,
            desc_vi: "Điểm hẹn cà phê bệt nổi tiếng.", desc_en: "Famous roundabout and hangout spot for locals. Great for street snacks.",
            tip_vi: "Thử bánh tráng nướng.", tip_en: "Try Vietnamese pizza.",
            url: "https://www.google.com/maps/search/?api=1&query=Turtle+Lake+Saigon"
        },
        {
            id: 30, icon: Building2, color: "text-gray-600", bg: "bg-gray-200",
            name_vi: "Bảo tàng Chứng tích Chiến tranh", name_en: "War Remnants Museum",
            x: 28, y: 38,
            desc_vi: "Bảo tàng được ghé thăm nhiều nhất.", desc_en: "Moving and stark exhibits regarding the Vietnam War. A must-visit for history buffs.",
            tip_vi: "Chuẩn bị tâm lý vững.", tip_en: "Emotionally heavy experience.",
            url: "https://www.google.com/maps/search/?api=1&query=War+Remnants+Museum"
        }
    ];

    // Additional Medical Locations
    const medicalLocations = [
        // General Hospitals
        { name: "Cho Ray Hospital", address: "201B Nguyen Chi Thanh, D5", type: "General" },
        { name: "Vinmec Central Park", address: "208 Nguyen Huu Canh, Binh Thanh", type: "International" },
        { name: "FV Hospital", address: "6 Nguyen Luong Bang, D7", type: "International" },
        { name: "University Medical Center", address: "215 Hong Bang, D5", type: "University" },
        { name: "Family Medical Practice", address: "34 Le Duan, D1", type: "International Clinic" },
        { name: "International SOS", address: "167A Nam Ky Khoi Nghia, D3", type: "Emergency" },
        { name: "Hoan My Saigon Hospital", address: "60-60A Phan Xich Long, Phu Nhuan", type: "General" },
        { name: "City International Hospital", address: "3 Duong So 17A, Binh Tan", type: "International" },
        { name: "Tam Anh Hospital", address: "2B Pho Quang, Tan Binh", type: "General" },
        
        // Specialized
        { name: "Tu Du Hospital", address: "284 Cong Quynh, D1", type: "Maternity" },
        { name: "HCMC Eye Hospital", address: "280 Dien Bien Phu, D3", type: "Eye Specialist" },
        { name: "HCMC Odonto-Stomatology", address: "201A Nguyen Chi Thanh, D5", type: "Dental" },
        { name: "Dermatology Hospital", address: "2 Nguyen Thong, D3", type: "Skin" },
        { name: "Traditional Medicine Institute", address: "273 Nguyen Van Troi, Phu Nhuan", type: "Traditional" },
        
        // Dental Clinics
        { name: "Worldwide Dental", address: "244A Cong Quynh, D1", type: "Dental Clinic" },
        { name: "Elite Dental", address: "51A Tu Xuong, D3", type: "Dental Clinic" }
    ];

    useEffect(() => {
        if(type === 'culture') {
            setTimeout(() => setAiNotification(true), 2000);
        }
    }, [type]);
    
    // Auto-select location if search term matches exactly
    useEffect(() => {
        if (searchTerm.length > 2) {
            const match = cultureLocations.find(l => 
                l.name_en.toLowerCase().includes(searchTerm.toLowerCase()) || 
                l.name_vi.toLowerCase().includes(searchTerm.toLowerCase())
            );
            if (match) {
                // Optional: Automatically open details for strong match
                // setSelectedLoc(match);
            }
        }
    }, [searchTerm]);

    // Handle generic purchases (eSIM, Hotel, Utilities)
    const handlePurchaseInit = (item: any, purchaseType: string) => {
        setPendingPurchase({ item, type: purchaseType });
        setShowPinModal(true);
    };

    const handlePinSubmit = (pin: string) => {
        if (isLocked) return;

        if (pin !== user?.pin) {
            const newAttempts = pinAttempts + 1;
            setPinAttempts(newAttempts);
            if (newAttempts >= 5) {
                const lockUntil = Date.now() + 5 * 60 * 1000;
                setIsLocked(true);
                setLockoutEnd(lockUntil);
                localStorage.setItem('pinLockUntil', lockUntil.toString());
            } else {
                alert(t.validation.pinWrong);
            }
            return;
        }
        
        setShowPinModal(false);
        setPinAttempts(0);
        
        if (pendingPurchase) {
            let amount = 0;
            let name = "";
            
            if (pendingPurchase.type === 'hotel') {
                amount = pendingPurchase.item.numericPrice;
                name = pendingPurchase.item.name;
                setSelectedHotel(null);
            } else if (pendingPurchase.type === 'esim') {
                amount = pendingPurchase.item.val;
                name = pendingPurchase.item.name;
            } else if (['flight', 'taxi', 'train', 'bus', 'golf', 'boat'].includes(pendingPurchase.type)) {
                // Calculate Total for Utility Bookings
                const unitPrice = pendingPurchase.item.price;
                const quantity = parseInt(bookingData.passengers || bookingData.players || '1') || 1;
                amount = unitPrice * quantity;
                name = pendingPurchase.item.title;
                setBookingState('success'); // Move utility to success screen
            }
            
            if (balance >= amount) {
                setBalance(prev => prev - amount);
                
                // Show notification for Hotel and eSIM
                if (['hotel', 'esim'].includes(pendingPurchase.type)) {
                    setNotification({
                        sender: "System",
                        title: t.deposit.success,
                        message: `-${amount.toLocaleString()} VND. ${name}`
                    });
                }
            } else {
                setNotification({
                    sender: "System",
                    title: "Giao dịch thất bại",
                    message: t.esim.fail
                });
                if (['flight', 'taxi', 'train', 'bus', 'golf', 'boat'].includes(pendingPurchase.type)) {
                     setBookingState('form'); // Go back if failed
                }
            }
            // Do not clear pendingPurchase immediately if it's a utility, as we need it for the receipt
            if (!['flight', 'taxi', 'train', 'bus', 'golf', 'boat'].includes(pendingPurchase.type)) {
                setPendingPurchase(null);
            }
        }
    };

    // New Booking Flow
    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setBookingState('searching');
        
        // Simulate Search Delay & Generate Mock Results
        setTimeout(() => {
            const results = generateMockResults(type);
            setSearchResults(results);
            setBookingState('results');
        }, 1500);
    };

    const generateMockResults = (type: string) => {
        // Helpers for random data
        const randomPrice = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min) * 1000;
        
        if (type === 'flight') return [
            { id: 1, title: 'Vietnam Airlines VN123', time: '08:00 - 10:00', price: 1500000, desc: 'Direct • Economy • Airbus A321' },
            { id: 2, title: 'VietJet Air VJ456', time: '09:30 - 11:30', price: 980000, desc: 'Direct • Economy • No Meal' },
            { id: 3, title: 'Bamboo Airways QH789', time: '11:00 - 13:00', price: 1250000, desc: 'Direct • Economy Plus' },
            { id: 4, title: 'Vietnam Airlines VN125', time: '14:00 - 16:00', price: 1650000, desc: 'Direct • Economy Flex' },
            { id: 5, title: 'Vietravel Airlines VU300', time: '16:30 - 18:30', price: 850000, desc: 'Direct • Economy' },
            { id: 6, title: 'Vietnam Airlines VN129', time: '19:00 - 21:00', price: 2500000, desc: 'Direct • Business Class' },
            { id: 7, title: 'VietJet Air VJ458', time: '21:30 - 23:30', price: 750000, desc: 'Direct • Promo Fare' },
            { id: 8, title: 'Bamboo Airways QH791', time: '06:00 - 08:00', price: 1100000, desc: 'Direct • Early Bird' }
        ];
        if (type === 'taxi') return [
            { id: 1, title: 'Xanh SM Luxury', time: '2 mins away', price: 180000, desc: 'VinFast VF8 • Electric • Premium' },
            { id: 2, title: 'Xanh SM Taxi', time: '4 mins away', price: 135000, desc: 'VinFast VF e34 • Electric • Eco' },
            { id: 3, title: 'GrabCar 4 Seats', time: '2 mins away', price: 150000, desc: 'Vios/Accent • Standard' },
            { id: 4, title: 'GrabCar 7 Seats', time: '5 mins away', price: 200000, desc: 'Innova/Xpander • Spacious' },
            { id: 5, title: 'Vinasun Taxi 4 cho', time: '3 mins away', price: 145000, desc: 'Metered Taxi • Reliable' },
            { id: 6, title: 'Mai Linh Taxi 7 cho', time: '6 mins away', price: 195000, desc: 'Metered Taxi • Green Cab' },
            { id: 7, title: 'BeCar 4 Seats', time: '4 mins away', price: 140000, desc: 'Standard Ride' },
            { id: 8, title: 'Luxury Private Car', time: 'Pre-book', price: 450000, desc: 'Mercedes E-Class • Chauffeur' }
        ];
        if (type === 'train') return [
            { id: 1, title: 'SE1 Reunification', time: '06:00 - 14:00', price: 450000, desc: 'Soft Seat • Air Con' },
            { id: 2, title: 'SE3 Express', time: '22:00 - 06:00', price: 850000, desc: 'Sleeper Cabin • 4 Berths' },
            { id: 3, title: 'SE7 Fast Train', time: '08:30 - 16:30', price: 500000, desc: 'Soft Seat • Premium' },
            { id: 4, title: 'SPT1 Phan Thiet', time: '06:40 - 10:40', price: 280000, desc: 'Soft Seat • Air Con' },
            { id: 5, title: 'The Vietage', time: '09:00 - 15:00', price: 6500000, desc: 'Luxury Carriage • Quy Nhon' },
            { id: 6, title: 'SE5 Reunification', time: '15:30 - 23:30', price: 780000, desc: 'Sleeper Cabin • 6 Berths' },
            { id: 7, title: 'SNT2 Nha Trang', time: '20:30 - 05:00', price: 920000, desc: 'Sleeper Cabin • 4 Berths VIP' }
        ];
        if (type === 'bus') return [
            { id: 1, title: 'VinBus Green Line', time: 'Every 15 mins', price: 7000, desc: 'Electric Bus • City Tour • Eco' },
            { id: 2, title: 'Phuong Trang (Futa)', time: '08:00 Departing', price: 280000, desc: 'Sleeper Bus • 34 Seats' },
            { id: 3, title: 'Thanh Buoi', time: '09:00 Departing', price: 320000, desc: 'VIP Cabin • Private Curtain' },
            { id: 4, title: 'Limousine Amazing', time: '10:00 Departing', price: 450000, desc: '9 Seats • Massage Chair' },
            { id: 5, title: 'Kumho Samco', time: '11:00 Departing', price: 260000, desc: 'Sleeper Bus • Standard' },
            { id: 6, title: 'VinBus Airport', time: 'Every 30 mins', price: 15000, desc: 'Electric Bus • Airport Link' },
            { id: 7, title: 'Thien Phu Limousine', time: '15:30 Departing', price: 380000, desc: '11 Seats • Luxury' }
        ];
        if (type === 'boat') return [
            { id: 1, title: 'Greenlines DP Vung Tau', time: '08:00 - 10:00', price: 320000, desc: 'High Speed Hydrofoil' },
            { id: 2, title: 'Greenlines DP Vung Tau', time: '10:00 - 12:00', price: 320000, desc: 'High Speed Hydrofoil' },
            { id: 3, title: 'Greenlines DP Vung Tau', time: '12:00 - 14:00', price: 320000, desc: 'High Speed Hydrofoil' },
            { id: 4, title: 'Greenlines DP Vung Tau', time: '14:00 - 16:00', price: 320000, desc: 'High Speed Hydrofoil' },
            { id: 5, title: 'Saigon Waterbus', time: '16:00 - 17:00', price: 15000, desc: 'River Sightseeing • Roundtrip' },
            { id: 6, title: 'Saigon Princess Dinner', time: '19:00 - 21:00', price: 1200000, desc: 'Dinner Cruise • Luxury' },
            { id: 7, title: 'Indochina Queen', time: '18:30 - 20:30', price: 650000, desc: 'Buffet Dinner • Music' }
        ];
        if (type === 'golf') return [
            { id: 1, title: 'Tan Son Nhat Golf Course', time: '06:00 Tee Time', price: 2800000, desc: '18 Holes • Caddie & Buggy' },
            { id: 2, title: 'Vietnam Golf & CC', time: '07:30 Tee Time', price: 2500000, desc: '18 Holes • East Course' },
            { id: 3, title: 'Long Thanh Golf Club', time: '09:00 Tee Time', price: 2200000, desc: '18 Holes • Scenic View' },
            { id: 4, title: 'Tan Son Nhat Night Golf', time: '17:00 Tee Time', price: 3100000, desc: '18 Holes • Floodlit' },
            { id: 5, title: 'Twin Doves Golf Club', time: '10:00 Tee Time', price: 2400000, desc: '18 Holes • Weekend Rate' },
            { id: 6, title: 'Song Be Golf Resort', time: '08:00 Tee Time', price: 2100000, desc: '18 Holes • Standard' }
        ];
        return [];
    };

    const renderBookingForm = (title: string, fields: {key: string, label: string, type?: string}[], icon: any) => {
        const Icon = icon;
        
        if (bookingState === 'success') {
            const unitPrice = pendingPurchase?.item?.price || 0;
            const quantity = parseInt(bookingData.passengers || bookingData.players || '1') || 1;
            const totalPaid = unitPrice * quantity;

            return (
                <div className="flex flex-col items-center justify-center p-8 h-full animate-in zoom-in">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                        <CheckCircle2 size={40}/>
                    </div>
                    <h3 className="text-xl font-bold mb-2">Booking Confirmed!</h3>
                    <p className="text-center opacity-60 mb-8 text-sm">Your {title} booking has been processed successfully.</p>
                    
                    <div className={`w-full p-4 rounded-xl mb-6 text-sm space-y-2 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
                         <div className="flex justify-between border-b pb-2 mb-2">
                             <span className="font-bold uppercase text-[#0056D2]">{pendingPurchase?.item?.title}</span>
                         </div>
                        <div className="flex justify-between">
                            <span className="opacity-60">Time</span>
                            <span className="font-bold">{new Date().toLocaleString([], {year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'})}</span>
                        </div>
                        {fields.map(f => (
                            <div key={f.key} className="flex justify-between">
                                <span className="opacity-60">{f.label}</span>
                                <span className="font-bold">{bookingData[f.key] || 'N/A'}</span>
                            </div>
                        ))}
                         <div className="flex justify-between border-t pt-2 mt-2">
                            <span className="opacity-60">Total Paid ({quantity}x)</span>
                            <span className="font-bold text-[#0056D2]">{totalPaid.toLocaleString()} VND</span>
                        </div>
                    </div>

                    <Button fullWidth onClick={() => { setBookingState('form'); setBookingData({}); setPendingPurchase(null); onBack(); }}>Back to Home</Button>
                </div>
            );
        }

        if (bookingState === 'results') {
            return (
                <div className="p-4 h-full flex flex-col">
                    <h4 className="font-bold text-lg mb-4">Select Option ({searchResults.length} found)</h4>
                    <div className="space-y-3 flex-1 overflow-y-auto">
                        {searchResults.map((item) => (
                            <div key={item.id} onClick={() => handlePurchaseInit(item, type)} className={`p-4 rounded-xl border cursor-pointer hover:border-blue-500 transition-all ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <div className="flex items-center gap-2">
                                        <h5 className="font-bold">{item.title}</h5>
                                        {item.desc.includes('Electric') && <span className="text-[9px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5"><Leaf size={8}/> ECO</span>}
                                    </div>
                                    <span className="text-[#0056D2] font-bold">{item.price.toLocaleString()} ₫</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs opacity-70">
                                    <span className="flex items-center gap-1"><Clock size={12}/> {item.time}</span>
                                    <span>•</span>
                                    <span>{item.desc}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Button variant="secondary" onClick={() => setBookingState('form')} fullWidth className="mt-4">Back</Button>
                </div>
            );
        }
        
        return (
            <div className="p-6 h-full flex flex-col">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-[#0056D2]">
                        <Icon size={24}/>
                    </div>
                    <div>
                        <h4 className="font-bold text-2xl uppercase tracking-tight truncate max-w-[280px]">{title}</h4>
                        <p className="text-xs opacity-60">Fill details to book</p>
                    </div>
                </div>

                {bookingState === 'searching' ? (
                     <div className="flex-1 flex flex-col items-center justify-center">
                         <div className="w-12 h-12 border-4 border-[#0056D2] border-t-transparent rounded-full animate-spin mb-4"></div>
                         <p className="font-bold animate-pulse">Searching available trips...</p>
                     </div>
                ) : (
                    <form onSubmit={handleSearch} className="space-y-4 flex-1">
                        {fields.map((f, i) => (
                            <div key={i}>
                                <label className="block text-xs font-bold opacity-60 mb-1">{f.label}</label>
                                <input 
                                    required
                                    type={f.type || 'text'}
                                    value={bookingData[f.key] || ''}
                                    onChange={e => setBookingData({...bookingData, [f.key]: e.target.value})}
                                    className={`w-full p-3 rounded-xl border outline-none ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`} 
                                    placeholder={`Enter ${f.label}...`} 
                                />
                            </div>
                        ))}
                        <div className="pt-4">
                            <Button type="submit" fullWidth>Search</Button>
                        </div>
                    </form>
                )}
            </div>
        );
    };

    const renderContent = () => {
        if (type === 'esim') return (
            <div className="space-y-4 p-4">
                {esims.map((sim) => (
                    <div key={sim.id} className={`p-4 rounded-xl shadow-sm border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600"><Signal size={20}/></div>
                                <div>
                                    <h4 className="font-bold text-sm text-[#0056D2] dark:text-blue-400">{sim.name}</h4>
                                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded text-gray-600 font-bold uppercase dark:bg-gray-700 dark:text-gray-300">{sim.type}</span>
                                </div>
                            </div>
                            <p className="font-bold text-lg">{sim.price}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2 mb-4">
                             <div className="bg-white shadow-md border border-gray-100 p-2 rounded-lg text-center">
                                 <p className="text-[10px] text-gray-500 uppercase font-bold">{t.esim.dataCap}</p>
                                 <p className="font-bold text-xs text-black">{sim.data}</p>
                             </div>
                             <div className="bg-white shadow-md border border-gray-100 p-2 rounded-lg text-center">
                                 <p className="text-[10px] text-gray-500 uppercase font-bold">{t.esim.calls}</p>
                                 <p className="font-bold text-xs text-black">{sim.calls}</p>
                             </div>
                             <div className="bg-white shadow-md border border-gray-100 p-2 rounded-lg text-center">
                                 <p className="text-[10px] text-gray-500 uppercase font-bold">{t.esim.validity}</p>
                                 <p className="font-bold text-xs text-black">{sim.validity}</p>
                             </div>
                        </div>
                        <Button onClick={() => handlePurchaseInit(sim, 'esim')} fullWidth className="text-xs h-10">{t.esim.buy}</Button>
                    </div>
                ))}
            </div>
        );
        if (type === 'hotel') return (
            <div className="space-y-4 p-4">
                {selectedHotel && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6" onClick={() => setSelectedHotel(null)}>
                        <div className={`w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`} onClick={e => e.stopPropagation()}>
                            <div className="h-48 relative">
                                <img src={selectedHotel.img} className="w-full h-full object-cover"/>
                                <button onClick={() => setSelectedHotel(null)} className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full"><X size={20}/></button>
                            </div>
                            <div className="p-5">
                                <h4 className="font-bold text-xl mb-1">{selectedHotel.name}</h4>
                                <div className="flex items-center gap-1 text-yellow-500 text-sm mb-2"><Star size={14} fill="currentColor"/> {selectedHotel.rating} • Hotel</div>
                                <div className="flex items-center gap-2 text-sm opacity-70 mb-4"><MapPin size={14}/> {selectedHotel.address}</div>
                                <div className="flex gap-2 mb-6">
                                     <Button variant="secondary" onClick={() => window.open(selectedHotel.locationUrl, '_blank')} className="flex-1 text-xs">{t.culture.openMap}</Button>
                                     {selectedHotel.websiteUrl && <Button variant="secondary" onClick={() => window.open(selectedHotel.websiteUrl, '_blank')} className="flex-1 text-xs">Website</Button>}
                                </div>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                                    <div>
                                        <p className="text-xs line-through opacity-50">{selectedHotel.oldPrice}</p>
                                        <p className="font-bold text-[#0056D2] text-lg">{selectedHotel.price}</p>
                                    </div>
                                    <Button onClick={() => handlePurchaseInit(selectedHotel, 'hotel')} className="px-6">{t.utils.book}</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {hotels.map((h) => (
                    <div onClick={() => setSelectedHotel(h)} key={h.id} className={`rounded-xl overflow-hidden shadow-sm border cursor-pointer hover:shadow-md transition-shadow ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <div className="h-40 bg-gray-300 relative">
                            <img src={h.img} className="w-full h-full object-cover" alt={h.name} />
                            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">-30%</div>
                        </div>
                        <div className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-bold text-lg">{h.name}</h4>
                                    <div className="flex items-center gap-1 text-yellow-500 text-xs"><Star size={12} fill="currentColor"/> {h.rating}</div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs line-through opacity-50">{h.oldPrice}</p>
                                    <p className="font-bold text-[#0056D2] text-lg">{h.price}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 mt-3">
                                <button onClick={(e) => {e.stopPropagation(); window.open(h.locationUrl, '_blank');}} className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200"><MapPin size={18}/></button>
                                <Button onClick={(e) => { e.stopPropagation(); handlePurchaseInit(h, 'hotel'); }} fullWidth className="text-sm py-2">{t.utils.book}</Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
        if (type === 'culture') return (
            <div className="h-full flex flex-col relative">
                {/* Search Bar */}
                <div className="absolute top-4 left-4 right-4 z-20 flex gap-2">
                    <div className={`flex-1 shadow-lg rounded-full flex items-center px-4 h-12 transition-all ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}>
                        <Search className="text-gray-400 mr-2" size={20}/>
                        <input 
                            className="flex-1 outline-none text-sm bg-transparent" 
                            placeholder="Search places (e.g. Ben Thanh, Coffee...)" 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button onClick={() => setSearchTerm('')}><X size={16} className="text-gray-400 mr-2"/></button>
                        )}
                        <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">A</div>
                    </div>
                </div>

                {/* Map View */}
                <div className="flex-1 relative overflow-hidden bg-[#f0f4f8]">
                    {/* Light Grey with Green Grid Texture */}
                    <div className="absolute inset-0" style={{
                        backgroundImage: `linear-gradient(#d1e7dd 1px, transparent 1px), linear-gradient(90deg, #d1e7dd 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}>
                    </div>
                    
                    <div className="absolute bottom-24 right-4 z-10 flex flex-col gap-2">
                        <button className="bg-white p-3 rounded-full shadow-lg text-blue-600" onClick={() => window.open('https://www.google.com/maps', '_blank')}><Navigation size={24} fill="currentColor"/></button>
                        <button className="bg-white p-3 rounded-full shadow-lg text-gray-600"><Compass size={24}/></button>
                    </div>

                    {aiNotification && (
                        <div className="absolute top-20 left-4 right-4 z-20 bg-white/95 backdrop-blur p-3 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-top duration-500 border-l-4 border-purple-500">
                            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0"><Sparkles size={16}/></div>
                            <div className="flex-1">
                                <p className="text-xs font-bold text-purple-700">{t.culture.discovery}</p>
                                <p className="text-xs text-gray-600">{lang === 'VIE' ? 'Gợi ý: Khu vực Phố Cổ đang ở rất gần!' : 'Tip: Old Quarter is nearby!'}</p>
                            </div>
                            <button onClick={() => window.open('https://www.google.com/maps/search/?api=1&query=Old+Quarter+Hanoi', '_blank')} className="bg-purple-600 text-white text-[10px] px-3 py-1.5 rounded-lg font-bold shadow-md active:scale-95 transition-transform">
                                {t.culture.openMap}
                            </button>
                        </div>
                    )}

                    {/* Markers as Relevant Icons */}
                    {cultureLocations.map(m => {
                        const Icon = m.icon;
                        const isMatch = searchTerm.length > 0 && (
                            m.name_en.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            m.name_vi.toLowerCase().includes(searchTerm.toLowerCase())
                        );
                        const isDimmed = searchTerm.length > 0 && !isMatch;
                        
                        return (
                        <div 
                            key={m.id} 
                            onClick={() => setSelectedLoc(m)}
                            className={`absolute flex flex-col items-center cursor-pointer transition-all duration-300 z-10 group ${isMatch ? 'scale-125 z-50' : ''} ${isDimmed ? 'opacity-30 scale-75 blur-[1px]' : 'opacity-100'}`} 
                            style={{ top: `${m.y}%`, left: `${m.x}%` }}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 border-white ${m.bg} ${m.color} ${isMatch ? 'animate-bounce shadow-blue-500/50' : ''}`}>
                                <Icon size={20} fill="currentColor" fillOpacity={0.2} />
                            </div>
                            <div className="w-2 h-2 bg-white rotate-45 -mt-1 shadow-sm"></div>
                            
                            <div className={`bg-white px-2 py-1 rounded-md text-[10px] font-bold shadow-md whitespace-nowrap mt-1 text-gray-800 border border-gray-200 transition-opacity absolute top-12 z-20 ${isMatch ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                {lang === 'VIE' ? m.name_vi : m.name_en}
                            </div>
                        </div>
                        )
                    })}
                </div>

                {/* Detail View */}
                {selectedLoc && (
                    <div className={`absolute bottom-0 left-0 right-0 p-5 rounded-t-3xl shadow-[0_-5px_20px_rgba(0,0,0,0.1)] animate-in slide-in-from-bottom z-30 ${isDark ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}`}>
                        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-bold text-xl flex items-center gap-2">
                                <selectedLoc.icon className={selectedLoc.color} size={24}/>
                                {lang === 'VIE' ? selectedLoc.name_vi : selectedLoc.name_en}
                            </h4>
                            <button onClick={() => setSelectedLoc(null)} className={`p-1 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}><X size={20}/></button>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500 text-sm mb-3">
                            <Star size={14} fill="currentColor"/> <Star size={14} fill="currentColor"/> <Star size={14} fill="currentColor"/> <Star size={14} fill="currentColor"/> <span className="text-gray-400 ml-1">(128)</span>
                        </div>
                        <p className={`text-sm mb-4 leading-relaxed max-h-40 overflow-y-auto ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                            {lang === 'VIE' ? selectedLoc.desc_vi : selectedLoc.desc_en}
                        </p>
                        
                        <div className={`p-3 rounded-lg mb-4 text-xs ${isDark ? 'bg-blue-900/30 text-blue-200' : 'bg-blue-50 text-blue-800'}`}>
                            <span className="font-bold mr-1">💡 {t.culture.tip}:</span>
                            {lang === 'VIE' ? selectedLoc.tip_vi : selectedLoc.tip_en}
                        </div>

                        <div className="flex gap-3">
                            <Button onClick={() => window.open(selectedLoc.url, '_blank')} variant="secondary" className="flex-1">
                                <MapIcon size={16} className="mr-2"/>
                                {t.culture.openMap}
                            </Button>
                            <Button className="flex-1">
                                <Music2 size={16} className="mr-2"/>
                                {t.culture.playAudio}
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        );
        
        if (type === 'medical') return (
            <div className="p-4 space-y-4">
                <div className="flex items-center gap-2 mb-4">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center text-pink-600"><HeartPulse size={20}/></div>
                    <div>
                        <h4 className="font-bold text-xl uppercase tracking-tight">{t.utils.medical}</h4>
                        <p className="text-xs opacity-60">Hospitals, Clinics & Emergency</p>
                    </div>
                </div>
                {medicalLocations.map((loc, i) => (
                    <div key={i} className={`p-4 rounded-xl border flex items-center justify-between shadow-sm ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <div className="flex items-start gap-3">
                            <div className={`mt-1 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${loc.type === 'International' ? 'bg-blue-100 text-blue-700' : (loc.type === 'Emergency' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600')}`}>
                                {loc.type === 'Dental' ? <CheckCircle2 size={16}/> : (loc.type === 'Eye Specialist' ? <Eye size={16}/> : <Stethoscope size={16}/>)}
                            </div>
                            <div>
                                <p className="font-bold text-sm">{loc.name}</p>
                                <p className="text-xs opacity-60 mb-1">{loc.address}</p>
                                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-500'}`}>{loc.type}</span>
                            </div>
                        </div>
                        <Button variant="secondary" className="text-xs h-8 px-3" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.name + ' ' + loc.address)}`, '_blank')}>Map</Button>
                    </div>
                ))}
            </div>
        );

        // Functional Booking Forms
        if (type === 'flight') return renderBookingForm(t.utils.flight, [
            {key: 'from', label: 'From'}, {key: 'to', label: 'To'}, {key: 'date', label: 'Date', type: 'date'}, {key: 'passengers', label: 'Passengers', type: 'number'}
        ], Plane);
        
        if (type === 'taxi') return renderBookingForm(t.utils.taxi, [
            {key: 'pickup', label: 'Pickup Location'}, {key: 'dest', label: 'Destination'}, {key: 'type', label: 'Vehicle Type'}
        ], Car);
        
        if (type === 'train') return renderBookingForm(t.utils.train, [
            {key: 'from', label: 'From'}, {key: 'to', label: 'To'}, {key: 'date', label: 'Date', type: 'date'}, {key: 'seat', label: 'Seat Type'}, {key: 'passengers', label: 'Passengers', type: 'number'}
        ], Train);
        
        if (type === 'bus') return renderBookingForm(t.utils.bus, [
            {key: 'from', label: 'From'}, {key: 'to', label: 'To'}, {key: 'date', label: 'Date', type: 'date'}, {key: 'company', label: 'Bus Company'}, {key: 'passengers', label: 'Passengers', type: 'number'}
        ], Bus);
        
        if (type === 'golf') return renderBookingForm(t.utils.golf, [
            {key: 'location', label: 'Golf Course'}, {key: 'date', label: 'Date', type: 'date'}, {key: 'players', label: 'Number of Players', type: 'number'}
        ], Flag);
        
        if (type === 'boat') return renderBookingForm(t.utils.boat, [
            {key: 'from', label: 'From'}, {key: 'to', label: 'To'}, {key: 'date', label: 'Date', type: 'date'}, {key: 'ticket', label: 'Ticket Type'}, {key: 'passengers', label: 'Passengers', type: 'number'}
        ], Ship);

        return null;
    };

    return (
        <div className={`flex flex-col h-full ${bgClass} relative`}>
            {notification && (
                <NotificationToast 
                    sender={notification.sender}
                    title={notification.title}
                    message={notification.message}
                    visible={!!notification}
                    onClose={() => setNotification(null)}
                />
            )}
            <PinModal 
                isOpen={showPinModal}
                onClose={() => setShowPinModal(false)}
                onSubmit={handlePinSubmit}
                attempts={pinAttempts}
                isLocked={isLocked}
                lockoutEnd={lockoutEnd}
                t={t}
                isDark={isDark}
            />
            <div className="p-4 pt-12 border-b flex items-center gap-3 shadow-sm bg-inherit relative z-10">
                <button onClick={() => { 
                    if (bookingState === 'results' || bookingState === 'success' || bookingState === 'searching') {
                         setBookingState('form');
                         setBookingData({});
                         setSearchResults([]);
                         setPendingPurchase(null);
                    } else {
                        onBack();
                    }
                }}><ChevronLeft/></button>
                <h3 className="font-bold text-2xl uppercase tracking-tight truncate max-w-[280px]">{type === 'culture' ? t.culture.title : (type === 'esim' ? t.esim.title : type === 'medical' ? t.utils.medical : type)}</h3>
            </div>
            <div className="flex-1 overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
};

export default UtilitiesView;