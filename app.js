// ═══════════════════════════════════════════════════
// 눈치 100단 선물 추천소 (app.js)
// ═══════════════════════════════════════════════════

// 1. 상태 관리 객체
const state = {
  budget: 5,
  relation: null,
  taste: null,
  occasion: null
};

// 2. DOM 요소 참조
const screenIntro = document.getElementById('screen-intro');
const screenInput = document.getElementById('screen-input');
const screenResult = document.getElementById('screen-result');

const btnStart = document.getElementById('btn-start');
const btnSubmit = document.getElementById('btn-submit');
const btnRetry = document.getElementById('btn-retry');

const budgetSlider = document.getElementById('budget-slider');
const budgetValueText = document.getElementById('budget-value');
const validationMsg = document.getElementById('validation-msg');
const loadingOverlay = document.getElementById('loading');

// 결과 화면 요소들
const resultTags = document.getElementById('result-tags');
const coachMentEl = document.getElementById('coach-ment');
const giftEmojiEl = document.getElementById('gift-emoji');
const giftNameEl = document.getElementById('gift-name');
const giftPriceEl = document.getElementById('gift-price');
const mineItemEl = document.getElementById('mine-item');
const mineTextEl = document.getElementById('mine-text');
const reasonTextEl = document.getElementById('reason-text');
const giftMentEl = document.getElementById('gift-ment');

// ═══════════════════════════════════════════════════
// 3. 선물 및 지뢰 데이터베이스
// ═══════════════════════════════════════════════════
const giftDatabase = {
  "실용주의": {
    low: [
      { name: "프리미엄 드립백 커피 & 머그 세트", emoji: "☕", price: "1~3만 원대", reason: "매일 마시는 커피 한 잔을 홈카페로 업그레이드! 자리 차지 안 하고 매일 쓰게 되는 실용 만점 아이템이야.", ment: "매일 아침 커피 타임에 소소하게 힐링했으면 해서 골랐어 ☕💕" },
      { name: "고속 무선 충전 패드 / 멀티 케이블", emoji: "🔋", price: "2~3만 원대", reason: "실용파에겐 일상의 불편함을 줄여주는 전자 기기가 최고! 책상 위 필수템이라 절대 안 버려져.", ment: "배터리 걱정 없이 든든한 하루 보내길 바라! 번창해라 ⚡" },
      { name: "브랜드 보온·보냉 텀블러 (스탠리/스타벅스)", emoji: "🥤", price: "2~3만 원대", reason: "환경도 챙기고 온도 유지까지 완벽해서 사계절 내내 매일 손이 가는 찐 실속템이야.", ment: "따뜻한 물 챙겨 마시고 감기 조심해! 건강이 최고야 🌿" }
    ],
    mid: [
      { name: "3in1 무선 충전 스탠드 거치대", emoji: "📱", price: "4~7만 원대", reason: "스마트폰, 이어폰, 워치를 한 번에 충전! 책상 위가 마법처럼 깔끔해져서 실용파 심장 저격이야.", ment: "자기 전에 툭 올려놓기만 해! 네 깔끔한 책상을 위해 준비했어 ✨" },
      { name: "브랜드 고급 파자마 & 수면 안대 세트", emoji: "👘", price: "5~8만 원대", reason: "수면의 질을 수직 상승시켜주는 꿀잠 보장템! 내 돈 주고 사긴 아깝지만 받으면 입이 귀에 걸려.", ment: "오늘 하루도 고생 많았어, 이거 입고 푹 꿀잠 자 🌙" },
      { name: "포터블 블루투스 키보드 / 무선 마우스 세트", emoji: "⌨️", price: "4~6만 원대", reason: "태블릿이나 노트북 쓰는 사람에게 생산성 200% 올려주는 든든한 업무 파트너!", ment: "손목 아프지 말고 일도 공부도 술술 풀려라! 파이팅 💪" }
    ],
    high: [
      { name: "목·어깨 저주파 마사지기 / 마사지건", emoji: "💆", price: "9~15만 원대", reason: "피로가 싹 풀리는 힐링 효자템! 뭉친 근육을 시원하게 풀어줘서 만족도 1000% 보장해.", ment: "항상 고생 많은 네 몸을 위한 작은 힐링이야! 아프지 마 💖" },
      { name: "백화점 상품권 (모바일/지류)", emoji: "🎫", price: "10~20만 원대", reason: "실용주의의 끝판왕! 자기가 진짜 필요한 걸 직접 살 수 있어서 실패 확률이 아예 없는 갓벽한 선택.", ment: "고민 많이 했는데 네 맘에 쏙 드는 걸 직접 고르는 게 제일일 것 같았어 🎁" },
      { name: "스마트 보온 텀블러 / 프리미엄 주방 소형가전", emoji: "🫖", price: "10~18만 원대", reason: "삶의 윤택함을 높여주는 프리미엄 생활 가전! 오래오래 질리지 않고 쓰기 딱 좋아.", ment: "따뜻한 온기 가득한 하루하루가 되길 응원해 ✨" }
    ]
  },

  "감성파": {
    low: [
      { name: "감성 오로라 무드등 & 엽서 세트", emoji: "🌙", price: "1~3만 원대", reason: "방 불 끄고 켜는 순간 방구석이 감성 카페로 변신! 은은한 불빛이 마음을 몽글몽글하게 해줘.", ment: "밤마다 이 불빛 보면서 기분 좋은 꿈만 꿨으면 좋겠어 ✨" },
      { name: "핸드메이드 소이 캔들 & 성냥 세트", emoji: "🕯️", price: "2~3만 원대", reason: "따뜻한 불멍과 은은한 향기! 감성파의 방 분위기를 포근하게 채워주는 감성 힐링템이야.", ment: "향기로운 하루 끝에 따뜻한 쉼이 함께하길 바라 🕊️" },
      { name: "레코드 감성 코스터 & 티 코지 세트", emoji: "☕", price: "1~2만 원대", reason: "홈카페를 사랑하는 감성파에게 찰떡! 작은 소품 하나로 일상의 로맨틱함이 채워져.", ment: "따뜻한 차 한 잔 마실 때 내 생각 한 스푼 얹어줘 🍰" }
    ],
    mid: [
      { name: "니치 향수 미니어처 디스커버리 세트", emoji: "🌸", price: "5~8만 원대", reason: "여러 가지 고급스러운 향을 기분 따라 골라 뿌리는 재미! 감성파 취향에 딱 맞는 낭만 선물이야.", ment: "너에게 가장 잘 어울리는 은은하고 특별한 향기를 찾아봐 💐" },
      { name: "프리미엄 우드 디퓨저 & 룸스프레이", emoji: "🌿", price: "4~7만 원대", reason: "공간을 가득 채우는 고급스러운 숲 향기! 인테리어 오브제로도 손색없는 감성 소품.", ment: "네 공간이 언제나 기분 좋은 향기로 가득 채워지길 🌿" },
      { name: "빈티지 턴테이블 블루투스 스피커", emoji: "📻", price: "5~8만 원대", reason: "아날로그 감성의 레트로 디자인과 감미로운 음악! 방 분위기를 단숨에 영화 속 한 장면으로 만들어줘.", ment: "좋은 음악 들으면서 항상 행복한 순간들만 가득하길 🎶" }
    ],
    high: [
      { name: "프리미엄 니치 향수 (르라보/딥티크/바이레도)", emoji: "🧴", price: "12~20만 원대", reason: "지나갈 때마다 뒤돌아보게 만드는 매혹적인 향기! 감성파에게 최고의 설렘을 안겨줄 수 있어.", ment: "너한테서만 날 수 있는 세상에서 가장 매력적인 향이야 🌹" },
      { name: "마샬 감성 블루투스 스피커", emoji: "🔊", price: "14~20만 원대", reason: "감성 인테리어의 종결자! 묵직하고 따뜻한 사운드로 매일을 축제처럼 즐길 수 있어.", ment: "매일 좋아하는 노래와 함께 영화 같은 하루를 보내줘 🎵" },
      { name: "호텔 스파 이용권 / 감성 파인다이닝 코스", emoji: "🍽️", price: "15~20만 원대", reason: "물건보다 감동적인 '특별한 하루의 기억'을 선물하는 방법! 감성파의 가슴을 울리는 최고의 선택이야.", ment: "오늘만큼은 세상에서 가장 특별하고 행복한 주인공이 되길 🌟" }
    ]
  },

  "먹보·미식가": {
    low: [
      { name: "수제 디저트 기프트 박스 (마카롱/휘낭시에)", emoji: "🧁", price: "1~3만 원대", reason: "달달구리는 먹보의 영혼을 춤추게 하지! 비주얼도 예쁘고 한 입 베어물면 극락행이야.", ment: "당 떨어질 때 하나씩 꺼내 먹어! 오늘 하루도 달콤하길 🍰" },
      { name: "유명 로스터리 드립백 & 프리미엄 티 세트", emoji: "🍵", price: "2~3만 원대", reason: "미식가들의 까다로운 입맛도 사로잡는 깊은 풍미! 식후 디저트 타임에 환상적인 짝꿍이야.", ment: "향긋한 티 타임 가지면서 여유로운 하루 보내길 🍃" },
      { name: "수제 초콜릿 & 카라멜 선물세트", emoji: "🍫", price: "1~3만 원대", reason: "고급스러운 풍미와 깔끔한 포장! 먹는 순간 미소가 번지는 확실한 행복 보장템.", ment: "달콤한 초콜릿처럼 오늘 하루도 사르르 녹는 기분 좋은 날 되길 🍫" }
    ],
    mid: [
      { name: "1등급 프리미엄 한우 구이용 세트", emoji: "🥩", price: "6~8만 원대", reason: "미식가에게 소고기 선물은 언제나 진리! 입안 가득 터지는 육즙에 무조건 감탄 나와.", ment: "맛있는 고기 먹고 원기 회복 팍팍 해! 고기 앞엔 언제나 진심인 거 알지? 🔥" },
      { name: "고당도 제철 프리미엄 과일 바구니", emoji: "🍇", price: "5~8만 원대", reason: "샤인머스캣, 애플망고 등 고급 과일의 달콤함! 건강과 미각을 동시에 챙기는 센스 만점 선물.", ment: "달콤하고 싱싱한 과일 먹고 비타민 듬뿍 충전해 🍈" },
      { name: "호텔 베이커리 시그니처 케이크 & 와인 세트", emoji: "🎂", price: "5~8만 원대", reason: "기념일 분위기를 화려하게 띄워주는 미식의 정석! 눈도 즐겁고 입도 황홀해.", ment: "달콤한 케이크와 함께 오늘 하루 세상에서 제일 축하해 🥂" }
    ],
    high: [
      { name: "스시 오마카세 / 한우 파인다이닝 식사권", emoji: "🍣", price: "12~20만 원대", reason: "미식가의 로망 그 자체! 셰프의 정성이 담긴 예술 같은 한 끼로 평생 기억에 남을 감동을 선사해.", ment: "맛있는 음식과 함께 인생 최고의 황홀한 시간을 즐겨봐 🌟" },
      { name: "최고급 와인 & 수제 샤퀴테리 치즈 플래터", emoji: "🍷", price: "10~18만 원대", reason: "깊고 그윽한 풍미의 와인과 미식 치즈 페어링! 특별한 날의 밤을 로맨틱하게 완성해줘.", ment: "좋은 와인처럼 우리 사이도 깊고 향기롭게 익어가길 🍷" },
      { name: "백화점 프리미엄 고메 식품관 상품권", emoji: "🛒", price: "10~20만 원대", reason: "평소 가보고 싶던 식재료와 프리미엄 맛집을 직접 골라 즐기는 미식 투어의 자유!", ment: "네가 좋아하는 진짜 맛있는 것들로만 가득 채워 먹어 🍽️" }
    ]
  },

  "집돌이·집순이": {
    low: [
      { name: "포근한 극세사 룸 슬리퍼 & 수면 양말", emoji: "🩴", price: "1~2만 원대", reason: "집콕러에게 발끝의 따뜻함은 곧 삶의 질! 푹신푹신해서 집안을 걸어 다닐 때마다 힐링이야.", ment: "집에서 뒹굴거릴 때 세상에서 가장 편안하고 포근하길 🏠" },
      { name: "감성 탁상 무드등 & 가습기", emoji: "💡", price: "2~3만 원대", reason: "방안 공기는 촉촉하게, 조명은 은은하게! 침대 옆 필수 아이템으로 집순이 취향 저격.", ment: "촉촉하고 아늑한 방에서 오늘도 편안하게 쉬어 🌙" },
      { name: "홈카페 핫초코 & 마시멜로 힐링 키트", emoji: "☕", price: "1~3만 원대", reason: "이불 밖은 위험해! 침대 속에서 넷플릭스 보며 마시는 달콤한 핫초코의 여유.", ment: "이불 꽁꽁 싸매고 달콤한 여유 제대로 만끽해 봐 🍿" }
    ],
    mid: [
      { name: "대형 모찌 바디필로우 / 삼각 등쿠션", emoji: "🛋️", price: "4~7만 원대", reason: "한번 기대면 절대 일어날 수 없는 마성의 늪! 침대 위 집콕 생활을 10배 더 안락하게 해줘.", ment: "여기 푹 파묻혀서 세상 편하게 쉬어! 눕방 필수템이야 💤" },
      { name: "브랜드 부드러운 순면 홈웨어 파자마 세트", emoji: "👘", price: "5~8만 원대", reason: "집순이·집돌이의 전투복이자 일상복! 촉감이 너무 부드러워서 벗기 싫어질 거야.", ment: "예쁘고 편한 파자마 입고 집콕 힐링 제대로 즐겨줘 🛌" },
      { name: "OTT 6개월 구독권 & 홈팝콘 패키지", emoji: "📺", price: "5~7만 원대", reason: "주말 정주행 준비 끝! 집에서 영화관 기분 내며 스트레스 싹 날려버릴 수 있어.", ment: "주말 동안 맛있는 팝콘 먹으면서 재미난 거 잔뜩 몰아봐 🍿🎬" }
    ],
    high: [
      { name: "스마트 미니 빔 프로젝터", emoji: "🎬", price: "12~20만 원대", reason: "침실 벽면이 나만의 전용 영화관으로 변신! 불 끄고 누워서 영화 볼 때 행복 지수 폭발해.", ment: "집콕 생활의 끝판왕! 방구석 프라이빗 시네마를 선물할게 🎥" },
      { name: "온열 눈마사지기 & 힐링 베개 세트", emoji: "💆", price: "9~15만 원대", reason: "스마트폰과 PC로 피로해진 눈과 머리를 스르륵 녹여주는 집순이 수면 필살기!", ment: "하루의 피로 싹 풀고 매일 밤 꿀잠 예약하자 💤" },
      { name: "캡슐 커피 머신 (네스프레소 등)", emoji: "☕", price: "10~18만 원대", reason: "카페 나갈 필요 없이 버튼 한 번으로 완성되는 갓 내린 커피! 완벽한 홈카페 완성.", ment: "집에서도 매일매일 향기롭고 맛있는 커피 타임 보내 ☕✨" }
    ]
  },

  "모름·상관없음": {
    low: [
      { name: "스타벅스 / 투썸 모바일 기프트카드", emoji: "☕", price: "1~3만 원대", reason: "호불호 0%, 쓸모 100%! 취향을 모를 땐 전국 어디서나 편하게 쓸 수 있는 카페 카드가 절대 실패 안 해.", ment: "출근길이나 나른한 오후에 맛있는 커피 한 잔 마시며 힘내길 ☕" },
      { name: "록시땅 / 탬버린즈 고급 핸드크림", emoji: "🧴", price: "1~3만 원대", reason: "너무 부담스럽지 않으면서도 브랜드 패키지가 센스 있어 보이는 호불호 없는 최고의 안전빵 선물!", ment: "손 씻을 때마다 기분 좋은 향기로 힐링했으면 좋겠어 ✨" },
      { name: "프리미엄 잼 / 스프레드 세트", emoji: "🍯", price: "2~3만 원대", reason: "빵이나 요거트에 곁들이기 좋은 고급 디저트! 취향 타지 않고 누구에게나 기분 좋은 선물이야.", ment: "달콤하고 향긋한 아침 식사 시간이 되길 바라 🍞" }
    ],
    mid: [
      { name: "프리미엄 블렌딩 티 & 머그 기프트 세트", emoji: "🍵", price: "4~6만 원대", reason: "포장도 우아하고 카페인 걱정 없이 누구나 즐길 수 있어 품격과 센스를 동시에 챙길 수 있어.", ment: "따뜻하고 향기로운 차 한 잔과 함께 편안한 여유를 즐겨줘 🍃" },
      { name: "브랜드 보온 텀블러 & 카페 음료 교환권", emoji: "🥤", price: "4~6만 원대", reason: "일상생활에서 누구나 유용하게 쓰는 실용 만점 조합! 실속과 정성이 모두 느껴져.", ment: "매일 들고 다니며 실용적으로 잘 써줬으면 좋겠어 😊" },
      { name: "고급 수제 쿠키 & 과일청 기프트 박스", emoji: "🍪", price: "4~6만 원대", reason: "호불호 없이 가족이나 동료와 나눠 먹기 딱 좋은 호감도 100% 디저트 세트야.", ment: "티타임에 달콤하게 드시면서 기분 좋은 하루 보내세요 🍪" }
    ],
    high: [
      { name: "신세계 / 현대 백화점 상품권", emoji: "🎫", price: "10~20만 원대", reason: "취향을 전혀 모를 때는 상대방에게 선택권을 주는 것이 가장 품격 있고 배려 깊은 최고의 선물이야.", ment: "가장 원하시고 마음에 쏙 드는 선물로 직접 고르셨으면 합니다 💝" },
      { name: "호텔 베이커리 기프트 박스 & 프리미엄 디퓨저", emoji: "🥐", price: "9~15만 원대", reason: "고급스러운 호텔 브랜드의 신뢰감! 누구에게 선물해도 감탄 나오는 센스 만점 구성.", ment: "기분 좋은 향기와 달콤한 디저트로 특별한 날이 되시길 바라요 ✨" },
      { name: "정관장 홍삼 / 프리미엄 비타민 세트", emoji: "💊", price: "10~18만 원대", reason: "상대방의 건강을 기원하는 따뜻하고 든든한 마음! 실패가 없는 무난하고 품격 있는 정석 선물.", ment: "항상 건강하시고 에너지가 넘치시길 진심으로 응원합니다 💪" }
    ]
  }
};

// 4. 지뢰 선물 규칙 (관계, 취향, 예산, 상황별 실패 확률 높은 선물)
const mineGiftRules = [
  {
    condition: (r, t, o, b) => r === "어색한 사이",
    item: "취향 타는 향수나 개인적인 의류·속옷",
    text: "아직 서로 취향을 잘 모르는 단계에서 향수나 의류는 호불호가 극명하게 갈려! 자칫 상대방이 부담스러워할 수 있으니 안전한 브랜드 소품이나 기프티콘으로 가자 🚫"
  },
  {
    condition: (r, t, o, b) => r === "선배·동료",
    item: "성의 없어 보이는 현금 봉투 or 너무 튀는 패션잡화",
    text: "사회생활이나 직장 동료 사이에선 너무 사적인 옷이나 생돈 봉투는 예의에 어긋나 보일 수 있어. 격식 있는 상품권이나 깔끔한 다과 세트가 훨씬 센스 있어 보여 💼"
  },
  {
    condition: (r, t, o, b) => r === "썸·연인" && b >= 10,
    item: "썸 단계에서 지나치게 비싼 명품이나 보석류",
    text: "아직 깊어지지 않은 썸 단계에서 너무 고가의 명품은 상대방에게 큰 심적 부담을 줘! 지금은 가격보다 센스와 정성이 돋보이는 선물이 훨씬 호감이야 💕"
  },
  {
    condition: (r, t, o, b) => o === "사과·화해",
    item: "갈등 원인과 관련된 물건 or 장난기 섞인 유머 상품",
    text: "화해할 때 장난스러운 선물이나 이전 다툼을 연상시키는 아이템은 분노를 부를 수 있어! 진심 어린 편지와 함께 단정하고 정성스러운 선물을 건네자 🕊️"
  },
  {
    condition: (r, t, o, b) => o === "마니또 선물",
    item: "포장도 안 된 성의 없는 저가 공산품 / 다이소 생필품",
    text: "마니또 선물이라도 너무 대충 산 티가 나면 받는 순간 분위기가 싸해져. 가격대가 작아도 포장이 예쁘거나 실속 있는 걸로 골라야 해 🎅"
  },
  {
    condition: (r, t, o, b) => t === "감성파",
    item: "대용량 빨래 세제나 투박한 주방 청소용품",
    text: "감성파에게 감성 0%의 현실적인 생필품은 로맨스를 파괴해! 실용적이더라도 패키지가 예쁘거나 향기가 좋은 감성 아이템을 골라줘 🌙"
  },
  {
    condition: (r, t, o, b) => t === "집돌이·집순이",
    item: "등산 스틱, 야외 캠핑용 텐트 등 과격한 아웃도어 장비",
    text: "집에서 쉬는 걸 제일 사랑하는 집콕러에게 야외 활동 장비는 평생 옷장 속에 방치될 운명이야! 집안에서 안락하게 쓸 수 있는 걸 주자 🏠"
  },
  {
    condition: (r, t, o, b) => t === "실용주의",
    item: "먼지만 쌓이는 부피 큰 장식용 인형이나 플라스틱 피규어",
    text: "실용주의자들은 쓰임새가 불분명한 관상용 소품을 보면 공간 낭비라고 느껴. 실제로 만지고 쓸 수 있는 기능성 아이템을 선택하자 🛠️"
  },
  {
    condition: (r, t, o, b) => r === "부모님·가족",
    item: "조작법이 너무 복잡한 최신 IT 전자기기",
    text: "사용법이 어려우면 매번 자녀에게 물어봐야 해서 부모님께 오히려 스트레스가 될 수 있어. 직관적이고 쉬운 건강용품이나 상품권이 최고야 👨‍👩‍👧"
  }
];

// 기본 지뢰 선물
const defaultMineGift = {
  item: "호불호 심하게 갈리는 특이한 디자인의 잡화",
  text: "취향이 확실하지 않을 때 너무 독특한 개성 템은 실패 1순위야! 실패 없는 안전하고 대중적인 아이템으로 마음을 전해봐 🚫"
};

// 5. 코치 언니 센스 멘트 템플릿 생성기
function generateCoachSpeech(relation, taste, occasion, budget) {
  const speechMap = {
    "어색한 사이": {
      "생일·기념일": `아직 좀 서먹하고 어색한 사이인데 챙겨주다니 넌 진짜 마음 따뜻한 사람이다! 🎂 부담은 1도 안 주면서 호감도만 200% 팍팍 올라가는 선물로 골라왔어 ✨`,
      "가벼운 감사·응원": `어색한 사이일수록 과한 선물은 서로 민망해지잖아~ 😅 가볍게 마음만 톡 건넬 수 있는 부담 제로 센스 템으로 엄선했어!`,
      "집들이·축하": `아직 어색한 사이인데 집들이에 초대받았어?! 🏡 너무 개인적이지 않으면서 센스 있다는 소리 들을 수 있는 호불호 없는 선물로 가자!`,
      "사과·화해": `어색한 사이에서 생긴 오해는 빨리 푸는 게 최고지 🕊️ 정중하면서도 성의 있어 보이는 단정한 선물로 마음을 녹여보자!`,
      "마니또 선물": `아직 좀 어색한 사이인데 마니또 선물이라니 너무 설렌다! 💕 호불호 전혀 없으면서 센스 있어 보이는 안전빵 아이템으로 골라왔어 ✨`
    },
    "썸·연인": {
      "생일·기념일": `꺄악! 썸·연인 기념일이라니 심장이 콩닥콩닥 두근거리잖아 💓 ${budget}만 원 예산에 딱 맞추면서 '나 센스 대박이지?' 소리 나오는 걸로 골랐어!`,
      "가벼운 감사·응원": `연인에게 무심한 듯 툭 건네는 응원 선물은 완전 호감도 폭발이지! 😍 네 예쁜 마음이 고스란히 전해질 거야 💕`,
      "집들이·축하": `연인 혹은 썸 타는 사람 공간에 초대받았구나! 💘 둘만의 로맨틱한 분위기를 한층 더 무르익게 해줄 달콤한 선물이야 ✨`,
      "사과·화해": `사랑싸움 후 화해는 타이밍과 정성이 전부야! 🥺 진심이 담긴 선물과 따뜻한 포옹이면 서운했던 맘이 눈 녹듯 사라질 거야 💕`,
      "마니또 선물": `썸 타는 사람 마니또에 당첨된 거야?! 이건 하늘이 맺어준 찬스야 🎅 은근슬쩍 내 마음을 흘릴 수 있는 센스 아이템 준비 완료!`
    },
    "찐친": {
      "생일·기념일": `우리 베프 찐친 생일엔 대충 넘어가면 평생 놀림받는 거 알지? 🤣 ${budget}만 원 예산 안에서 진짜 실속 있고 감동할 찐템으로 골라왔어 🎂`,
      "가벼운 감사·응원": `친구끼리 쑥스럽게 고맙다는 말 대신 이런 센스 선물 툭 던져주는 거 너무 멋지다! 👯 분명 좋아 죽을 걸?`,
      "집들이·축하": `찐친 집들이라니 오늘 가서 바닥 뚫리게 놀아야겠네! 🏡 자취방이나 새 보금자리에 꼭 필요했던 실전 꿀템으로 픽했어!`,
      "사과·화해": `찐친이랑 다투면 하루 종일 찝찝하잖아 🥺 맛있는 거 사주면서 이 선물 툭 던져, 그럼 바로 웃으면서 풀릴 거야!`,
      "마니또 선물": `찐친 마니또면 센스와 위트를 동시에 챙겨야지! 🎅 실속 있으면서도 웃음 빵 터지는 갓벽한 아이템이야!`
    },
    "선배·동료": {
      "생일·기념일": `선배님·동료 생일 선물 고민 많았지? 💼 사회생활 100단 코치 언니만 믿어! 격식도 챙기고 센스쟁이로 찍힐 수 있는 아이템이야 ✨`,
      "가벼운 감사·응원": `직장이나 모임에서 감사한 마음 전할 때 너무 과하면 부담스럽잖아~ 딱 기분 좋게 감사함을 전할 수 있는 황금 밸런스야 👍`,
      "집들이·축하": `동료분 축하 자리엔 너무 사적이지 않고 깔끔한 아이템이 최고야! 🏡 받는 분도 부담 없이 활짝 웃을 수 있어.`,
      "사과·화해": `직장 관계에선 오해를 깔끔하게 푸는 게 프로지! 🕊️ 정중하고 담백하게 마음을 건넬 수 있는 좋은 선택이야.`,
      "마니또 선물": `회사나 동아리 마니또야? 🎅 누가 봐도 '와 이 마니또 센스 미쳤다' 소리 듣게 만들어줄게!`
    },
    "부모님·가족": {
      "생일·기념일": `가족 생일 챙기는 우리 동생 너무 기특해 🥹 ${budget}만 원 안에서 정성과 효심이 가득 느껴지는 든든한 선물로 골랐어 💕`,
      "가벼운 감사·응원": `가족에게 소소하게 감사한 마음 표현하는 거 정말 큰 감동이거든! 따뜻한 온기가 온 집안에 퍼질 거야 ✨`,
      "집들이·축하": `가족의 새로운 출발이나 경사를 축하하는 자리! 🏡 실용성과 정성이 가득 담겨서 오래오래 사랑받을 선물이야.`,
      "사과·화해": `가족끼리 서운한 일은 빨리 털어버려야 해 🥰 진심을 담아 건네면 언제 그랬냐는 듯 활짝 웃어주실 거야!`,
      "마니또 선물": `가족 마니또라니 너무 다정하고 훈훈하다 🎅 따뜻한 추억과 행복이 두 배가 될 귀여운 아이템이야!`
    }
  };

  const tasteSuffix = {
    "실용주의": " 실용파 상대에겐 진짜 손이 자주 가는 게 최고야 🛠️",
    "감성파": " 감성파에겐 낭만과 몽글몽글한 분위기를 얹어줬어 🌙",
    "먹보·미식가": " 먹는 것에 진심인 미식가에겐 역시 혀끝의 행복이 진리야 🍰",
    "집돌이·집순이": " 방구석을 사랑하는 집콕러에겐 아늑한 힐링이 보약이지 🏠",
    "모름·상관없음": " 취향을 몰라도 실패할 일 없는 안전빵 만능템이야 🎯"
  };

  let speech = speechMap[relation]?.[occasion] || `소중한 분에게 ${budget}만 원으로 마음을 전할 수 있는 가장 센스 있는 아이템으로 골라왔어 ✨`;
  speech += tasteSuffix[taste] || "";
  return speech;
}

// ═══════════════════════════════════════════════════
// 6. 이벤트 리스너 & 사용자 인터랙션
// ═══════════════════════════════════════════════════

// 화면 전환 헬퍼
function switchScreen(targetScreen) {
  [screenIntro, screenInput, screenResult].forEach(s => s.classList.remove('active'));
  targetScreen.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 시작 버튼: 인트로 -> 입력 화면
btnStart.addEventListener('click', () => {
  switchScreen(screenInput);
});

// 다시 골라보기 버튼: 결과 -> 입력 화면
btnRetry.addEventListener('click', () => {
  switchScreen(screenInput);
});

// 예산 슬라이더 조작
budgetSlider.addEventListener('input', (e) => {
  const val = parseInt(e.target.value, 10);
  state.budget = val;
  budgetValueText.textContent = val;
});

// 선택 버튼 클릭 이벤트 (단일 선택)
document.querySelectorAll('.option-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const group = btn.getAttribute('data-group');
    const value = btn.getAttribute('data-value');

    // 해당 그룹의 모든 버튼 선택 해제 후 현재 버튼만 선택
    document.querySelectorAll(`.option-btn[data-group="${group}"]`).forEach(b => {
      b.classList.remove('selected');
    });
    btn.classList.add('selected');

    state[group] = value;

    // 부모 카드 shake 상태 제거
    const parentCard = btn.closest('.card');
    if (parentCard) {
      parentCard.classList.remove('shake');
    }
  });
});

// 유효성 검사 및 추천 제출
btnSubmit.addEventListener('click', () => {
  const missingItems = [];

  if (!state.relation) missingItems.push({ id: 'card-relation', name: '상대와의 관계' });
  if (!state.taste) missingItems.push({ id: 'card-taste', name: '상대방 취향' });
  if (!state.occasion) missingItems.push({ id: 'card-occasion', name: '선물 상황' });

  if (missingItems.length > 0) {
    const missingNames = missingItems.map(item => `'${item.name}'`).join(', ');
    validationMsg.textContent = `⚠️ 아직 선택하지 않은 항목이 있어요: ${missingNames}을(를) 골라주세요!`;
    validationMsg.classList.add('show');

    // 미선택 카드 흔들기
    missingItems.forEach(item => {
      const cardEl = document.getElementById(item.id);
      if (cardEl) {
        cardEl.classList.remove('shake');
        void cardEl.offsetWidth; // reflow 트리거
        cardEl.classList.add('shake');
      }
    });

    // 첫 번째 미선택 카드로 스크롤 이동
    const firstMissing = document.getElementById(missingItems[0].id);
    if (firstMissing) {
      firstMissing.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  // 유효성 검사 통과 시
  validationMsg.classList.remove('show');
  loadingOverlay.classList.add('show');

  // 로딩 연출 후 결과 화면 표출
  setTimeout(() => {
    buildResult();
    loadingOverlay.classList.remove('show');
    switchScreen(screenResult);
  }, 900);
});

// ═══════════════════════════════════════════════════
// 7. 동적 추천 결과 생성
// ═══════════════════════════════════════════════════
function getBudgetTier(budget) {
  if (budget <= 3) return 'low';
  if (budget <= 8) return 'mid';
  return 'high';
}

function buildResult() {
  const { budget, relation, taste, occasion } = state;
  const tier = getBudgetTier(budget);

  // 선물 풀 선정
  let candidatePool = giftDatabase[taste]?.[tier] || giftDatabase["모름·상관없음"][tier];

  // 상황이 '마니또 선물'이거나 관계가 '어색한 사이'인 경우 안전한 선물과 혼합
  if (occasion === "마니또 선물" || relation === "어색한 사이") {
    const safePool = giftDatabase["모름·상관없음"][tier];
    candidatePool = [...candidatePool, ...safePool];
  }

  // 최종 선물 랜덤 선택 (후보 풀 중 하나)
  const selectedGift = candidatePool[Math.floor(Math.random() * candidatePool.length)];

  // 지뢰 선물 도출
  let matchedMine = mineGiftRules.find(rule => rule.condition(relation, taste, occasion, budget));
  const finalMine = matchedMine ? { item: matchedMine.item, text: matchedMine.text } : defaultMineGift;

  // 코치 멘트 생성
  const coachSpeech = generateCoachSpeech(relation, taste, occasion, budget);

  // 결과 화면 DOM 렌더링
  resultTags.innerHTML = `
    <span class="tag">💰 ${budget}만 원</span>
    <span class="tag">👫 ${relation}</span>
    <span class="tag">🎯 ${taste}</span>
    <span class="tag">🎉 ${occasion}</span>
  `;

  coachMentEl.textContent = coachSpeech;
  giftEmojiEl.textContent = selectedGift.emoji;
  giftNameEl.textContent = selectedGift.name;
  giftPriceEl.textContent = `추천 예산대: ${selectedGift.price}`;
  mineItemEl.textContent = `⚠️ ${finalMine.item}`;
  mineTextEl.textContent = finalMine.text;
  reasonTextEl.textContent = selectedGift.reason;
  giftMentEl.textContent = `"${selectedGift.ment}"`;
}
