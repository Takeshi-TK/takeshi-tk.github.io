const categories = ["basic", "practical", "business", "travel"];

const conceptBanks = {
  basic: [
    ["家", "집", "家", "la maison"], ["学校", "학교", "学校", "l'école"], ["駅", "역", "车站", "la gare"],
    ["店", "가게", "商店", "le magasin"], ["公園", "공원", "公园", "le parc"], ["市場", "시장", "市场", "le marché"],
    ["病院", "병원", "医院", "l'hôpital"], ["薬局", "약국", "药店", "la pharmacie"], ["銀行", "은행", "银行", "la banque"],
    ["郵便局", "우체국", "邮局", "la poste"], ["図書館", "도서관", "图书馆", "la bibliothèque"], ["会社", "회사", "公司", "l'entreprise"],
    ["部屋", "방", "房间", "la chambre"], ["台所", "부엌", "厨房", "la cuisine"], ["机", "책상", "桌子", "le bureau"],
    ["椅子", "의자", "椅子", "la chaise"], ["窓", "창문", "窗户", "la fenêtre"], ["ドア", "문", "门", "la porte"],
    ["水", "물", "水", "l'eau"], ["お茶", "차", "茶", "le thé"], ["コーヒー", "커피", "咖啡", "le café"],
    ["牛乳", "우유", "牛奶", "le lait"], ["パン", "빵", "面包", "le pain"], ["ご飯", "밥", "米饭", "le riz"],
    ["卵", "계란", "鸡蛋", "l'œuf"], ["りんご", "사과", "苹果", "la pomme"], ["本", "책", "书", "le livre"],
    ["ノート", "공책", "笔记本", "le cahier"], ["ペン", "펜", "笔", "le stylo"], ["かばん", "가방", "包", "le sac"],
    ["服", "옷", "衣服", "les vêtements"], ["靴", "신발", "鞋子", "les chaussures"], ["電話", "전화", "电话", "le téléphone"],
    ["写真", "사진", "照片", "la photo"], ["名前", "이름", "名字", "le nom"], ["友だち", "친구", "朋友", "l'ami"],
    ["家族", "가족", "家人", "la famille"], ["先生", "선생님", "老师", "le professeur"], ["学生", "학생", "学生", "l'étudiant"],
    ["子ども", "아이", "孩子", "l'enfant"], ["天気", "날씨", "天气", "le temps"], ["雨", "비", "雨", "la pluie"],
    ["雪", "눈", "雪", "la neige"], ["朝", "아침", "早上", "le matin"], ["昼", "낮", "白天", "la journée"],
    ["夜", "밤", "晚上", "la nuit"], ["週末", "주말", "周末", "le week-end"], ["時間", "시간", "时间", "le temps"],
    ["道", "길", "路", "la route"], ["通り", "거리", "街道", "la rue"], ["車", "차", "车", "la voiture"],
    ["バス", "버스", "公交车", "le bus"], ["電車", "기차", "火车", "le train"], ["自転車", "자전거", "自行车", "le vélo"],
    ["音楽", "음악", "音乐", "la musique"], ["映画", "영화", "电影", "le film"], ["運動", "운동", "运动", "le sport"],
    ["料理", "요리", "菜", "le plat"], ["色", "색", "颜色", "la couleur"], ["番号", "번호", "号码", "le numéro"],
    ["値段", "가격", "价格", "le prix"]
  ],
  practical: [
    ["予定", "일정", "日程", "le planning"], ["約束", "약속", "约定", "le rendez-vous"], ["理由", "이유", "理由", "la raison"],
    ["方法", "방법", "方法", "la méthode"], ["説明", "설명", "说明", "l'explication"], ["質問", "질문", "问题", "la question"],
    ["答え", "대답", "回答", "la réponse"], ["意味", "뜻", "意思", "le sens"], ["例", "예", "例子", "l'exemple"],
    ["内容", "내용", "内容", "le contenu"], ["情報", "정보", "信息", "l'information"], ["住所", "주소", "地址", "l'adresse"],
    ["メール", "메일", "邮件", "l'e-mail"], ["メッセージ", "메시지", "消息", "le message"], ["通知", "알림", "通知", "la notification"],
    ["設定", "설정", "设置", "le réglage"], ["パスワード", "비밀번호", "密码", "le mot de passe"], ["画面", "화면", "屏幕", "l'écran"],
    ["ファイル", "파일", "文件", "le fichier"], ["記録", "기록", "记录", "la note"], ["練習", "연습", "练习", "l'exercice"],
    ["復習", "복습", "复习", "la révision"], ["発音", "발음", "发音", "la prononciation"], ["文", "문장", "句子", "la phrase"],
    ["単語", "단어", "单词", "le mot"], ["会話", "대화", "对话", "la conversation"], ["生活", "생활", "生活", "la vie quotidienne"],
    ["健康", "건강", "健康", "la santé"], ["気分", "기분", "心情", "l'humeur"], ["心配", "걱정", "担心", "l'inquiétude"],
    ["ミス", "실수", "错误", "l'erreur"], ["違い", "차이", "区别", "la différence"], ["選択", "선택", "选择", "le choix"],
    ["検索", "검색", "搜索", "la recherche"], ["保存", "저장", "保存", "l'enregistrement"], ["削除", "삭제", "删除", "la suppression"],
    ["接続", "연결", "连接", "la connexion"], ["充電", "충전", "充电", "la charge"], ["バッテリー", "배터리", "电池", "la batterie"],
    ["手順", "절차", "步骤", "la procédure"], ["優先順位", "우선순위", "优先级", "la priorité"], ["進み具合", "진행 상황", "进展", "l'avancement"]
  ],
  business: [
    ["会議", "회의", "会议", "la réunion"], ["議題", "안건", "议题", "l'ordre du jour"], ["資料", "자료", "资料", "le document"],
    ["報告", "보고", "报告", "le rapport"], ["共有", "공유", "共享", "le partage"], ["確認", "확인", "确认", "la vérification"],
    ["担当者", "담당자", "负责人", "le responsable"], ["部署", "부서", "部门", "le service"], ["チーム", "팀", "团队", "l'équipe"],
    ["顧客", "고객", "客户", "le client"], ["取引先", "거래처", "合作方", "le partenaire"], ["契約", "계약", "合同", "le contrat"],
    ["見積もり", "견적", "报价", "le devis"], ["請求書", "청구서", "发票", "la facture"], ["納品", "납품", "交付", "la livraison"],
    ["在庫", "재고", "库存", "le stock"], ["品質", "품질", "质量", "la qualité"], ["費用", "비용", "费用", "le coût"],
    ["予算", "예산", "预算", "le budget"], ["売上", "매출", "销售额", "le chiffre d'affaires"], ["締切", "마감", "截止日期", "la date limite"],
    ["日程", "일정", "日程", "le calendrier"], ["進捗", "진행 상황", "进度", "l'avancement"], ["リスク", "위험 요소", "风险", "le risque"],
    ["問題点", "문제점", "问题点", "le point faible"], ["改善", "개선", "改善", "l'amélioration"], ["提案", "제안", "提案", "la proposition"],
    ["承認", "승인", "批准", "l'approbation"], ["権限", "권한", "权限", "l'autorisation"], ["セキュリティ", "보안", "安全", "la sécurité"],
    ["マニュアル", "매뉴얼", "手册", "le manuel"], ["フォーム", "양식", "表格", "le formulaire"], ["添付ファイル", "첨부파일", "附件", "la pièce jointe"],
    ["最終版", "최종본", "最终版", "la version finale"], ["修正", "수정", "修改", "la modification"], ["返信", "회신", "回信", "la réponse"],
    ["依頼", "요청", "请求", "la demande"], ["検収", "검수", "验收", "la recette"], ["成果物", "결과물", "成果物", "le livrable"],
    ["運用", "운영", "运营", "l'exploitation"], ["更新", "업데이트", "更新", "la mise à jour"], ["公開", "공개", "发布", "la publication"]
  ],
  travel: [
    ["空港", "공항", "机场", "l'aéroport"], ["駅", "역", "车站", "la gare"], ["ホテル", "호텔", "酒店", "l'hôtel"],
    ["部屋", "방", "房间", "la chambre"], ["予約", "예약", "预订", "la réservation"], ["受付", "프런트", "前台", "la réception"],
    ["パスポート", "여권", "护照", "le passeport"], ["荷物", "짐", "行李", "les bagages"], ["預け荷物", "수하물", "托运行李", "les bagages enregistrés"],
    ["搭乗口", "탑승구", "登机口", "la porte d'embarquement"], ["チケット", "표", "票", "le billet"], ["座席", "좌석", "座位", "le siège"],
    ["窓側", "창가", "靠窗", "le côté fenêtre"], ["通路側", "통로 쪽", "靠过道", "le côté couloir"], ["地図", "지도", "地图", "la carte"],
    ["道案内", "길 안내", "问路", "l'itinéraire"], ["バス停", "버스 정류장", "公交车站", "l'arrêt de bus"], ["タクシー", "택시", "出租车", "le taxi"],
    ["地下鉄", "지하철", "地铁", "le métro"], ["乗り換え", "환승", "换乘", "le changement"], ["入口", "입구", "入口", "l'entrée"],
    ["出口", "출구", "出口", "la sortie"], ["レストラン", "식당", "餐厅", "le restaurant"], ["メニュー", "메뉴", "菜单", "le menu"],
    ["注文", "주문", "点餐", "la commande"], ["会計", "계산", "结账", "l'addition"], ["レシート", "영수증", "收据", "le reçu"],
    ["カード", "카드", "卡", "la carte bancaire"], ["現金", "현금", "现金", "les espèces"], ["両替", "환전", "换钱", "le change"],
    ["おつり", "잔돈", "零钱", "la monnaie"], ["お土産", "기념품", "纪念品", "le souvenir"], ["サイズ", "사이즈", "尺码", "la taille"],
    ["薬", "약", "药", "le médicament"], ["病院", "병원", "医院", "l'hôpital"], ["警察署", "경찰서", "警察局", "le poste de police"],
    ["忘れ物", "분실물", "失物", "l'objet perdu"], ["緊急連絡先", "긴급 연락처", "紧急联系人", "le contact d'urgence"], ["保険", "보험", "保险", "l'assurance"],
    ["営業時間", "영업 시간", "营业时间", "les horaires d'ouverture"], ["売り切れ", "매진", "卖完", "complet"], ["静かな部屋", "조용한 방", "安静的房间", "une chambre calme"]
  ]
};

const basicTagSets = {
  place: new Set(["家", "学校", "駅", "店", "公園", "市場", "病院", "薬局", "銀行", "郵便局", "図書館", "会社", "部屋", "台所", "道", "通り"]),
  person: new Set(["友だち", "家族", "先生", "学生", "子ども"]),
  food: new Set(["水", "お茶", "コーヒー", "牛乳", "パン", "ご飯", "卵", "りんご", "料理"]),
  object: new Set(["机", "椅子", "窓", "ドア", "本", "ノート", "ペン", "かばん", "服", "靴", "電話", "写真", "名前", "色", "番号", "値段"]),
  tangible: new Set(["机", "椅子", "窓", "ドア", "本", "ノート", "ペン", "かばん", "服", "靴", "電話", "写真"]),
  time: new Set(["天気", "雨", "雪", "朝", "昼", "夜", "週末", "時間"]),
  transport: new Set(["車", "バス", "電車", "自転車"]),
  media: new Set(["音楽", "映画", "運動"])
};
basicTagSets.publicPlace = new Set(["学校", "駅", "店", "公園", "市場", "病院", "薬局", "銀行", "郵便局", "図書館", "会社"]);

function inferTags(category, japanese) {
  if (category !== "basic") {
    return new Set([category, "abstract"]);
  }

  const tags = new Set(["basic"]);
  for (const [tag, values] of Object.entries(basicTagSets)) {
    if (values.has(japanese)) {
      tags.add(tag);
    }
  }
  if (tags.size === 1) {
    tags.add("object");
  }
  return tags;
}

function hasTag(item, tag) {
  return item.tags?.has(tag);
}

function frJoin(prefix, target) {
  if (prefix.endsWith("de")) {
    if (target.startsWith("le ")) return `${prefix.replace(/\bde$/, "du")} ${target.slice(3)}`;
    if (target.startsWith("les ")) return `${prefix.replace(/\bde$/, "des")} ${target.slice(4)}`;
    if (target.startsWith("l'")) return `${prefix} ${target}`;
  }
  if (prefix.endsWith("à")) {
    if (target.startsWith("le ")) return `${prefix.slice(0, -1)}au ${target.slice(3)}`;
    if (target.startsWith("les ")) return `${prefix.slice(0, -1)}aux ${target.slice(4)}`;
    if (target.startsWith("l'")) return `${prefix} ${target}`;
  }
  return `${prefix} ${target}`;
}

function itemForLang(row, lang, category) {
  const indexes = { ko: 1, zh: 2, fr: 3 };
  return { jp: row[0], target: row[indexes[lang]], tags: inferTags(category, row[0]) };
}

function hasKoreanBatchim(text) {
  const hangul = [...text].reverse().find((char) => {
    const code = char.charCodeAt(0);
    return code >= 0xac00 && code <= 0xd7a3;
  });
  if (!hangul) {
    return false;
  }

  return (hangul.charCodeAt(0) - 0xac00) % 28 !== 0;
}

function koSubject(term) {
  return hasKoreanBatchim(term) ? "이" : "가";
}

function koObject(term) {
  return hasKoreanBatchim(term) ? "을" : "를";
}

function koTopic(term) {
  return hasKoreanBatchim(term) ? "은" : "는";
}

function buildRows(items, patterns) {
  const rows = [];
  for (const item of items) {
    for (const pattern of patterns) {
      if (pattern.applies && !pattern.applies(item)) {
        continue;
      }
      rows.push([pattern.target(item), pattern.jp(item)]);
    }
  }
  return rows;
}

function basicWordPatterns(lang) {
  const isPlace = (item) => hasTag(item, "place");
  const isPlaceOrTransport = (item) => hasTag(item, "place") || hasTag(item, "transport");
  const isPerson = (item) => hasTag(item, "person");
  const isObject = (item) => hasTag(item, "object") || hasTag(item, "food") || hasTag(item, "transport") || hasTag(item, "media");
  const isTangible = (item) => hasTag(item, "tangible");
  const isFood = (item) => hasTag(item, "food");
  const isTime = (item) => hasTag(item, "time");
  const isPublicPlace = (item) => hasTag(item, "publicPlace");
  const isMedia = (item) => hasTag(item, "media");
  const isTransport = (item) => hasTag(item, "transport");
  const isWeather = (item) => ["天気", "雨", "雪"].includes(item.jp);
  const isClockTime = (item) => ["朝", "昼", "夜", "週末", "時間"].includes(item.jp);
  const isCleanable = (item) => ["机", "椅子", "窓", "ドア", "本", "ノート", "ペン", "かばん", "服", "靴", "写真"].includes(item.jp);
  const all = () => true;
  const quotedWord = (suffix) => (label) => `「${label}」${suffix}`;

  if (lang === "ko") {
    return [
      ["뜻", quotedWord("の意味"), all], ["발음", quotedWord("の発音"), all], ["예문", quotedWord("の例文"), all], ["설명", quotedWord("の説明"), all],
      ["복습", quotedWord("の復習"), all], ["연습", quotedWord("の練習"), all], ["메모", quotedWord("のメモ"), all], ["관련 표현", quotedWord("の関連表現"), all],
      ["질문", quotedWord("についての質問"), all], ["기본 표현", quotedWord("の基本表現"), all], ["듣기 연습", quotedWord("の聞き取り練習"), all], ["말하기 연습", quotedWord("の発話練習"), all],
      ["근처", "の近く", isPlaceOrTransport], ["앞", "の前", isPlaceOrTransport], ["뒤", "の後ろ", isPlaceOrTransport], ["옆", "の横", isPlaceOrTransport],
      ["안", "の中", isPlace], ["밖", "の外", isPlace], ["입구", "の入口", isPlace], ["출구", "の出口", isPlace],
      ["위치", "の場所", isPlaceOrTransport], ["이름", "の名前", (item) => isPerson(item) || isPlace(item)], ["사진", "の写真", (item) => isPerson(item) || isPlaceOrTransport(item) || isTangible(item)],
      ["시간", "の利用時間", (item) => isPublicPlace(item) || isTransport(item) || isMedia(item)],
      ["새", "新しい", (item) => isPlace(item) || isTangible(item)], ["작은", "小さい", (item) => isPlace(item) || isTangible(item)],
      ["큰", "大きい", (item) => isPlace(item) || isTangible(item)], ["깨끗한", "きれいな", isCleanable],
      ["첫", "最初の", (item) => isPlace(item) || isTransport(item) || isMedia(item) || isClockTime(item)], ["다음", "次の", (item) => isPlace(item) || isTransport(item) || isMedia(item) || isClockTime(item)],
      ["좋아하는", "好きな", (item) => isPerson(item) || isFood(item) || isMedia(item) || isTransport(item)],
      ["찾는", "探している", (item) => isPerson(item) || isPlace(item) || isObject(item) || isTransport(item)],
      ["사용할", "使う予定の", (item) => isTangible(item) || isTransport(item) || isMedia(item)],
      ["준비", "の準備", (item) => isPlace(item) || isObject(item) || isFood(item) || isTransport(item) || isWeather(item)],
      ["목록", "の一覧", (item) => isPlace(item) || isTangible(item) || isTransport(item) || isMedia(item)],
      ["예보", "の予報", isWeather], ["기록", "の記録", (item) => isClockTime(item) || isWeather(item) || isMedia(item)]
    ].map(([prefixOrSuffix, jp, applies]) => {
      const isAdjective = ["새", "작은", "큰", "깨끗한", "첫", "다음", "좋아하는", "찾는", "사용할"].includes(prefixOrSuffix);
      return {
        applies,
        target: ({ target }) => isAdjective ? `${prefixOrSuffix} ${target}` : `${target} ${prefixOrSuffix}`,
        jp: ({ jp: label }) => isAdjective ? `${jp}${label}` : typeof jp === "function" ? jp(label) : `${label}${jp}`
      };
    });
  }

  if (lang === "zh") {
    return [
      ["意思", quotedWord("の意味"), all], ["发音", quotedWord("の発音"), all], ["例句", quotedWord("の例文"), all], ["说明", quotedWord("の説明"), all],
      ["复习", quotedWord("の復習"), all], ["练习", quotedWord("の練習"), all], ["笔记", quotedWord("のメモ"), all], ["相关表达", quotedWord("の関連表現"), all],
      ["问题", quotedWord("についての質問"), all], ["基本表达", quotedWord("の基本表現"), all], ["听力练习", quotedWord("の聞き取り練習"), all], ["口语练习", quotedWord("の発話練習"), all],
      ["附近", "の近く", isPlaceOrTransport], ["前面", "の前", isPlaceOrTransport], ["后面", "の後ろ", isPlaceOrTransport], ["旁边", "の横", isPlaceOrTransport],
      ["里面", "の中", isPlace], ["外面", "の外", isPlace], ["入口", "の入口", isPlace], ["出口", "の出口", isPlace],
      ["位置", "の場所", isPlaceOrTransport], ["名字", "の名前", (item) => isPerson(item) || isPlace(item)], ["照片", "の写真", (item) => isPerson(item) || isPlaceOrTransport(item) || isTangible(item)],
      ["时间", "の利用時間", (item) => isPublicPlace(item) || isTransport(item) || isMedia(item)],
      ["新", "新しい", (item) => isPlace(item) || isTangible(item)], ["小", "小さい", (item) => isPlace(item) || isTangible(item)],
      ["大", "大きい", (item) => isPlace(item) || isTangible(item)], ["干净的", "きれいな", isCleanable],
      ["第一个", "最初の", (item) => isPlace(item) || isTransport(item) || isMedia(item) || isClockTime(item)], ["下一个", "次の", (item) => isPlace(item) || isTransport(item) || isMedia(item) || isClockTime(item)],
      ["喜欢的", "好きな", (item) => isPerson(item) || isFood(item) || isMedia(item) || isTransport(item)],
      ["正在找的", "探している", (item) => isPerson(item) || isPlace(item) || isObject(item) || isTransport(item)],
      ["要用的", "使う予定の", (item) => isTangible(item) || isTransport(item) || isMedia(item)],
      ["准备", "の準備", (item) => isPlace(item) || isObject(item) || isFood(item) || isTransport(item) || isWeather(item)],
      ["列表", "の一覧", (item) => isPlace(item) || isTangible(item) || isTransport(item) || isMedia(item)],
      ["预报", "の予報", isWeather], ["记录", "の記録", (item) => isClockTime(item) || isWeather(item) || isMedia(item)]
    ].map(([part, jp, applies]) => {
      const isPrefix = ["新", "小", "大", "干净的", "第一个", "下一个", "喜欢的", "正在找的", "要用的"].includes(part);
      return {
        applies,
        target: ({ target }) => isPrefix ? `${part}${target}` : `${target}${part}`,
        jp: ({ jp: label }) => isPrefix ? `${jp}${label}` : typeof jp === "function" ? jp(label) : `${label}${jp}`
      };
    });
  }

  return [
    ["le sens de", quotedWord("の意味"), all], ["la prononciation de", quotedWord("の発音"), all], ["un exemple avec", quotedWord("の例文"), all], ["l'explication de", quotedWord("の説明"), all],
    ["la révision de", quotedWord("の復習"), all], ["l'exercice de", quotedWord("の練習"), all], ["une note sur", quotedWord("のメモ"), all], ["une expression liée à", quotedWord("の関連表現"), all],
    ["une question sur", quotedWord("についての質問"), all], ["l'expression de base pour", quotedWord("の基本表現"), all], ["l'écoute de", quotedWord("の聞き取り練習"), all], ["la pratique orale de", quotedWord("の発話練習"), all],
    ["près de", "の近く", isPlaceOrTransport], ["devant", "の前", isPlaceOrTransport], ["derrière", "の後ろ", isPlaceOrTransport], ["à côté de", "の横", isPlaceOrTransport],
    ["dans", "の中", isPlace], ["hors de", "の外", isPlace], ["l'entrée de", "の入口", isPlace], ["la sortie de", "の出口", isPlace],
    ["l'emplacement de", "の場所", isPlaceOrTransport], ["le nom de", "の名前", (item) => isPerson(item) || isPlace(item)], ["la photo de", "の写真", (item) => isPerson(item) || isPlaceOrTransport(item) || isTangible(item)],
    ["l'heure de", "の利用時間", (item) => isPublicPlace(item) || isTransport(item) || isMedia(item)],
    ["avec", "と一緒に", (item) => isPerson(item) || isFood(item) || isMedia(item)], ["sans", "なしで", (item) => isFood(item) || isObject(item) || isTransport(item)],
    ["autour de", "の周り", isPlaceOrTransport], ["en face de", "の向かい", isPlaceOrTransport],
    ["prévu pour", "用の", (item) => isTangible(item) || isTransport(item) || isMedia(item)],
    ["la préparation de", "の準備", (item) => isPlace(item) || isObject(item) || isFood(item) || isTransport(item) || isWeather(item)],
    ["la liste de", "の一覧", (item) => isPlace(item) || isTangible(item) || isTransport(item) || isMedia(item)],
    ["la météo de", "の予報", isWeather], ["l'enregistrement de", "の記録", (item) => isClockTime(item) || isWeather(item) || isMedia(item)]
  ].map(([prefix, jp, applies]) => ({
    applies,
    target: ({ target }) => frJoin(prefix, target),
    jp: ({ jp: label }) => typeof jp === "function" ? jp(label) : `${label}${jp}`
  }));
}

const actionLabels = {
  practical: [
    ["確認する", "확인하기", "确认", "vérifier"], ["記録する", "기록하기", "记录", "noter"], ["保存する", "저장하기", "保存", "enregistrer"],
    ["探す", "찾기", "寻找", "chercher"], ["変える", "바꾸기", "改变", "changer"], ["整理する", "정리하기", "整理", "organiser"],
    ["説明する", "설명하기", "说明", "expliquer"], ["送る", "보내기", "发送", "envoyer"], ["比べる", "비교하기", "比较", "comparer"],
    ["練習する", "연습하기", "练习", "pratiquer"], ["覚える", "기억하기", "记住", "mémoriser"], ["削除する", "삭제하기", "删除", "supprimer"],
    ["おすすめする", "추천하기", "推荐", "recommander"], ["始める", "시작하기", "开始", "commencer"], ["やめる", "그만두기", "停止", "arrêter"]
  ],
  business: [
    ["確認する", "확인하기", "确认", "vérifier"], ["共有する", "공유하기", "共享", "partager"], ["提出する", "제출하기", "提交", "soumettre"],
    ["承認する", "승인하기", "批准", "approuver"], ["調整する", "조정하기", "调整", "ajuster"], ["修正する", "수정하기", "修改", "modifier"],
    ["報告する", "보고하기", "汇报", "signaler"], ["依頼する", "요청하기", "请求", "demander"], ["検討する", "검토하기", "审查", "examiner"],
    ["準備する", "준비하기", "准备", "préparer"], ["更新する", "업데이트하기", "更新", "mettre à jour"], ["整理する", "정리하기", "整理", "organiser"],
    ["管理する", "관리하기", "管理", "gérer"], ["催促する", "재촉하기", "催促", "relancer"], ["完了する", "완료하기", "完成", "terminer"]
  ],
  travel: [
    ["探す", "찾기", "寻找", "chercher"], ["予約する", "예약하기", "预订", "réserver"], ["変更する", "변경하기", "更改", "modifier"],
    ["確認する", "확인하기", "确认", "vérifier"], ["見せる", "보여 주기", "出示", "montrer"], ["支払う", "결제하기", "支付", "payer"],
    ["受け取る", "받기", "领取", "récupérer"], ["預ける", "맡기기", "寄存", "laisser"], ["交換する", "교환하기", "交换", "échanger"],
    ["返金する", "환불하기", "退款", "rembourser"], ["案内する", "안내하기", "指路", "indiquer"], ["乗り換える", "갈아타기", "换乘", "changer de transport"],
    ["注文する", "주문하기", "点餐", "commander"], ["借りる", "빌리기", "借", "emprunter"], ["連絡する", "연락하기", "联系", "contacter"]
  ]
};

function actionWordPatterns(lang, category) {
  if (category === "practical") {
    return practicalWordPatterns(lang);
  }
  if (category === "business") {
    return businessWordPatterns(lang);
  }
  if (category === "travel") {
    return travelWordPatterns(lang);
  }

  const index = { ko: 1, zh: 2, fr: 3 }[lang];
  return actionLabels[category].map((action) => ({
    applies: (item) => actionApplies(category, action[0], item.jp),
    target: ({ target }) => {
      if (lang === "ko") return `${target} ${action[index]}`;
      if (lang === "zh") return `${action[index]}${target}`;
      return `${action[index]} ${target}`;
    },
    jp: ({ jp }) => `${jp}を${action[0]}`
  }));
}

function patternTarget(lang, pattern, target) {
  if (pattern.prefix) {
    return lang === "fr" ? frJoin(pattern.prefix, target) : `${pattern.prefix}${target}`;
  }
  return `${target}${lang === "ko" ? " " : ""}${pattern.suffix}`;
}

function practicalWordPatterns(lang) {
  const linguistic = new Set(["意味", "例", "説明", "質問", "答え", "発音", "文", "単語", "会話", "違い", "選択"]);
  const digital = new Set(["メール", "メッセージ", "通知", "設定", "パスワード", "画面", "ファイル", "検索", "保存", "削除", "接続", "充電", "バッテリー"]);
  const process = new Set(["予定", "約束", "理由", "方法", "内容", "情報", "住所", "記録", "練習", "復習", "生活", "健康", "気分", "心配", "ミス", "手順", "優先順位", "進み具合"]);
  const all = () => true;
  const confirmLabel = (jp) => jp === "確認" ? "確認事項" : `${jp}の確認`;
  const infoLabel = (jp) => jp === "情報" ? "情報の整理" : `${jp}の情報`;
  const questionLabel = (jp) => jp === "質問" ? "質問表現" : `${jp}についての質問`;
  const memoLabel = (jp) => jp === "記録" ? "記録用メモ" : `${jp}についてのメモ`;
  const basicsLabel = (jp) => jp === "意味" ? "意味の基本" : `${jp}の基本`;
  const reviewLabel = (jp) => jp === "復習" ? "復習内容の見直し" : `${jp}の見直し`;
  const pronunciationLabel = (jp) => jp === "発音" ? "発音練習" : `${jp}の発音`;
  const exampleLabel = (jp) => jp === "例" ? "例文" : `${jp}の例文`;
  const paraphraseLabel = (jp) => jp === "違い" ? "違いの説明" : `${jp}の言い換え`;
  const practiceLabel = (jp) => jp === "練習" ? "練習方法" : `${jp}の練習`;
  const settingLabel = (jp) => jp === "設定" ? "設定方法" : `${jp}の設定`;
  const saveLabel = (jp) => jp === "保存" ? "保存のしかた" : `${jp}の保存方法`;
  const deleteLabel = (jp) => jp === "削除" ? "削除のしかた" : `${jp}の削除方法`;
  const connectionLabel = (jp) => jp === "接続" ? "接続状態の確認" : `${jp}の接続確認`;
  const procedureLabel = (jp) => jp === "手順" ? "手順の確認" : `${jp}の手順`;
  const priorityLabel = (jp) => jp === "優先順位" ? "優先順位の決め方" : `${jp}の優先順位`;
  const recordLabel = (jp) => jp === "記録" ? "記録方法" : `${jp}の記録`;

  const definitions = {
    ko: [
      { suffix: "확인", jp: ({ jp }) => confirmLabel(jp), applies: ({ jp }) => jp !== "確認" },
      { suffix: "정보", jp: ({ jp }) => infoLabel(jp), applies: all },
      { suffix: "질문", jp: ({ jp }) => questionLabel(jp), applies: ({ jp }) => jp !== "質問" },
      { suffix: "메모", jp: ({ jp }) => memoLabel(jp), applies: all },
      { suffix: "주의점", jp: ({ jp }) => `${jp}の注意点`, applies: all },
      { suffix: "기본", jp: ({ jp }) => basicsLabel(jp), applies: all },
      { suffix: "관련 표현", jp: ({ jp }) => `${jp}の関連表現`, applies: all },
      { suffix: "다시 보기", jp: ({ jp }) => reviewLabel(jp), applies: all },
      { suffix: "발음", jp: ({ jp }) => pronunciationLabel(jp), applies: ({ jp }) => linguistic.has(jp) && jp !== "発音" },
      { suffix: "예문", jp: ({ jp }) => exampleLabel(jp), applies: ({ jp }) => linguistic.has(jp) && jp !== "例" },
      { suffix: "바꿔 말하기", jp: ({ jp }) => paraphraseLabel(jp), applies: ({ jp }) => linguistic.has(jp) },
      { suffix: "연습", jp: ({ jp }) => practiceLabel(jp), applies: ({ jp }) => linguistic.has(jp) && jp !== "練習" },
      { suffix: "설정", jp: ({ jp }) => settingLabel(jp), applies: ({ jp }) => digital.has(jp) && jp !== "設定" },
      { suffix: "저장 방법", jp: ({ jp }) => saveLabel(jp), applies: ({ jp }) => digital.has(jp) && jp !== "保存" },
      { suffix: "삭제 방법", jp: ({ jp }) => deleteLabel(jp), applies: ({ jp }) => digital.has(jp) && jp !== "削除" },
      { suffix: "연결 확인", jp: ({ jp }) => connectionLabel(jp), applies: ({ jp }) => digital.has(jp) && jp !== "接続" },
      { suffix: "절차", jp: ({ jp }) => procedureLabel(jp), applies: ({ jp }) => process.has(jp) && jp !== "手順" },
      { suffix: "우선순위", jp: ({ jp }) => priorityLabel(jp), applies: ({ jp }) => process.has(jp) && jp !== "優先順位" },
      { suffix: "기록", jp: ({ jp }) => recordLabel(jp), applies: ({ jp }) => process.has(jp) && jp !== "記録" }
    ],
    zh: [
      { suffix: "确认", jp: ({ jp }) => confirmLabel(jp), applies: all },
      { suffix: "信息", jp: ({ jp }) => infoLabel(jp), applies: all },
      { suffix: "问题", jp: ({ jp }) => questionLabel(jp), applies: ({ jp }) => jp !== "質問" },
      { suffix: "笔记", jp: ({ jp }) => memoLabel(jp), applies: all },
      { suffix: "注意点", jp: ({ jp }) => `${jp}の注意点`, applies: all },
      { suffix: "基础", jp: ({ jp }) => basicsLabel(jp), applies: all },
      { suffix: "相关表达", jp: ({ jp }) => `${jp}の関連表現`, applies: all },
      { suffix: "复盘", jp: ({ jp }) => reviewLabel(jp), applies: all },
      { suffix: "发音", jp: ({ jp }) => pronunciationLabel(jp), applies: ({ jp }) => linguistic.has(jp) && jp !== "発音" },
      { suffix: "例句", jp: ({ jp }) => exampleLabel(jp), applies: ({ jp }) => linguistic.has(jp) && jp !== "例" },
      { suffix: "换一种说法", jp: ({ jp }) => paraphraseLabel(jp), applies: ({ jp }) => linguistic.has(jp) },
      { suffix: "练习", jp: ({ jp }) => practiceLabel(jp), applies: ({ jp }) => linguistic.has(jp) && jp !== "練習" },
      { suffix: "设置", jp: ({ jp }) => settingLabel(jp), applies: ({ jp }) => digital.has(jp) && jp !== "設定" },
      { suffix: "保存方法", jp: ({ jp }) => saveLabel(jp), applies: ({ jp }) => digital.has(jp) && jp !== "保存" },
      { suffix: "删除方法", jp: ({ jp }) => deleteLabel(jp), applies: ({ jp }) => digital.has(jp) && jp !== "削除" },
      { suffix: "连接确认", jp: ({ jp }) => connectionLabel(jp), applies: ({ jp }) => digital.has(jp) && jp !== "接続" },
      { suffix: "步骤", jp: ({ jp }) => procedureLabel(jp), applies: ({ jp }) => process.has(jp) && jp !== "手順" },
      { suffix: "优先级", jp: ({ jp }) => priorityLabel(jp), applies: ({ jp }) => process.has(jp) && jp !== "優先順位" },
      { suffix: "记录", jp: ({ jp }) => recordLabel(jp), applies: ({ jp }) => process.has(jp) && jp !== "記録" }
    ],
    fr: [
      { prefix: "vérification de", jp: ({ jp }) => confirmLabel(jp), applies: all },
      { prefix: "information sur", jp: ({ jp }) => infoLabel(jp), applies: all },
      { prefix: "question sur", jp: ({ jp }) => questionLabel(jp), applies: ({ jp }) => jp !== "質問" },
      { prefix: "note sur", jp: ({ jp }) => memoLabel(jp), applies: all },
      { prefix: "point d'attention pour", jp: ({ jp }) => `${jp}の注意点`, applies: all },
      { prefix: "base de", jp: ({ jp }) => basicsLabel(jp), applies: all },
      { prefix: "expression liée à", jp: ({ jp }) => `${jp}の関連表現`, applies: all },
      { prefix: "révision de", jp: ({ jp }) => reviewLabel(jp), applies: all },
      { prefix: "prononciation de", jp: ({ jp }) => pronunciationLabel(jp), applies: ({ jp }) => linguistic.has(jp) && jp !== "発音" },
      { prefix: "phrase d'exemple pour", jp: ({ jp }) => exampleLabel(jp), applies: ({ jp }) => linguistic.has(jp) && jp !== "例" },
      { prefix: "reformulation de", jp: ({ jp }) => paraphraseLabel(jp), applies: ({ jp }) => linguistic.has(jp) },
      { prefix: "exercice de", jp: ({ jp }) => practiceLabel(jp), applies: ({ jp }) => linguistic.has(jp) && jp !== "練習" },
      { prefix: "réglage de", jp: ({ jp }) => settingLabel(jp), applies: ({ jp }) => digital.has(jp) && jp !== "設定" },
      { prefix: "méthode d'enregistrement de", jp: ({ jp }) => saveLabel(jp), applies: ({ jp }) => digital.has(jp) && jp !== "保存" },
      { prefix: "méthode de suppression de", jp: ({ jp }) => deleteLabel(jp), applies: ({ jp }) => digital.has(jp) && jp !== "削除" },
      { prefix: "vérification de connexion de", jp: ({ jp }) => connectionLabel(jp), applies: ({ jp }) => digital.has(jp) && jp !== "接続" },
      { prefix: "procédure de", jp: ({ jp }) => procedureLabel(jp), applies: ({ jp }) => process.has(jp) && jp !== "手順" },
      { prefix: "priorité de", jp: ({ jp }) => priorityLabel(jp), applies: ({ jp }) => process.has(jp) && jp !== "優先順位" },
      { prefix: "enregistrement de", jp: ({ jp }) => recordLabel(jp), applies: ({ jp }) => process.has(jp) && jp !== "記録" }
    ]
  };

  return definitions[lang].map((pattern) => ({
    applies: pattern.applies,
    target: ({ target }) => patternTarget(lang, pattern, target),
    jp: pattern.jp
  }));
}

function businessWordPatterns(lang) {
  const documents = new Set(["資料", "報告", "契約", "見積もり", "請求書", "フォーム", "添付ファイル", "最終版", "マニュアル", "成果物"]);
  const people = new Set(["担当者", "部署", "チーム", "顧客", "取引先"]);
  const projects = new Set(["会議", "議題", "納品", "在庫", "品質", "費用", "予算", "売上", "締切", "日程", "進捗", "リスク", "問題点", "改善", "提案", "承認", "権限", "セキュリティ", "修正", "返信", "依頼", "検収", "運用", "更新", "公開"]);
  const all = () => true;
  const confirmLabel = (jp) => jp === "確認" ? "確認事項" : `${jp}の確認`;
  const infoLabel = (jp) => {
    if (jp === "共有") return "共有内容";
    if (jp === "確認") return "確認内容";
    if (jp === "報告") return "報告内容";
    return `${jp}の情報`;
  };
  const questionLabel = (jp) => jp === "確認" ? "確認したい点" : `${jp}についての質問`;
  const memoLabel = (jp) => jp === "報告" ? "報告用メモ" : `${jp}についてのメモ`;
  const procedureLabel = (jp) => jp === "運用" ? "運用手順" : `${jp}の手順`;
  const statusLabel = (jp) => jp === "進捗" ? "進捗状況" : `${jp}の状況`;
  const shareLabel = (jp) => jp === "共有" ? "共有内容" : `${jp}の共有`;
  const reportLabel = (jp) => jp === "報告" ? "報告内容" : `${jp}の報告`;
  const managementLabel = (jp) => jp === "運用" ? "運用管理" : `${jp}の管理`;

  const definitions = {
    ko: [
      { suffix: "확인", jp: ({ jp }) => confirmLabel(jp), applies: all },
      { suffix: "정보", jp: ({ jp }) => infoLabel(jp), applies: all },
      { suffix: "질문", jp: ({ jp }) => questionLabel(jp), applies: all },
      { suffix: "메모", jp: ({ jp }) => memoLabel(jp), applies: all },
      { suffix: "주의점", jp: ({ jp }) => `${jp}の注意点`, applies: all },
      { suffix: "요점", jp: ({ jp }) => `${jp}の要点`, applies: all },
      { suffix: "절차", jp: ({ jp }) => procedureLabel(jp), applies: all },
      { suffix: "상황", jp: ({ jp }) => statusLabel(jp), applies: ({ jp }) => jp !== "進捗" },
      { suffix: "제출", jp: ({ jp }) => `${jp}の提出`, applies: ({ jp }) => documents.has(jp) },
      { suffix: "수정", jp: ({ jp }) => `${jp}の修正`, applies: ({ jp }) => documents.has(jp) || projects.has(jp) },
      { suffix: "공유", jp: ({ jp }) => shareLabel(jp), applies: ({ jp }) => documents.has(jp) || projects.has(jp) },
      { suffix: "최종 확인", jp: ({ jp }) => `${jp}の最終確認`, applies: ({ jp }) => documents.has(jp) },
      { suffix: "연락", jp: ({ jp }) => `${jp}への連絡`, applies: ({ jp }) => people.has(jp) },
      { suffix: "담당 확인", jp: ({ jp }) => `${jp}の担当確認`, applies: ({ jp }) => people.has(jp) },
      { suffix: "검토", jp: ({ jp }) => `${jp}の検討`, applies: ({ jp }) => projects.has(jp) },
      { suffix: "조정", jp: ({ jp }) => `${jp}の調整`, applies: ({ jp }) => projects.has(jp) },
      { suffix: "관리", jp: ({ jp }) => managementLabel(jp), applies: ({ jp }) => projects.has(jp) },
      { suffix: "보고", jp: ({ jp }) => reportLabel(jp), applies: ({ jp }) => projects.has(jp) }
    ],
    zh: [
      { suffix: "确认", jp: ({ jp }) => confirmLabel(jp), applies: ({ jp }) => jp !== "確認" },
      { suffix: "信息", jp: ({ jp }) => infoLabel(jp), applies: all },
      { suffix: "问题", jp: ({ jp }) => questionLabel(jp), applies: all },
      { suffix: "笔记", jp: ({ jp }) => memoLabel(jp), applies: all },
      { suffix: "注意点", jp: ({ jp }) => `${jp}の注意点`, applies: all },
      { suffix: "要点", jp: ({ jp }) => `${jp}の要点`, applies: all },
      { suffix: "流程", jp: ({ jp }) => procedureLabel(jp), applies: all },
      { suffix: "状态", jp: ({ jp }) => statusLabel(jp), applies: ({ jp }) => jp !== "進捗" },
      { suffix: "提交", jp: ({ jp }) => `${jp}の提出`, applies: ({ jp }) => documents.has(jp) },
      { suffix: "修改", jp: ({ jp }) => `${jp}の修正`, applies: ({ jp }) => documents.has(jp) || projects.has(jp) },
      { suffix: "共享", jp: ({ jp }) => shareLabel(jp), applies: ({ jp }) => documents.has(jp) || projects.has(jp) },
      { suffix: "最终确认", jp: ({ jp }) => `${jp}の最終確認`, applies: ({ jp }) => documents.has(jp) },
      { suffix: "联系", jp: ({ jp }) => `${jp}への連絡`, applies: ({ jp }) => people.has(jp) },
      { suffix: "负责人确认", jp: ({ jp }) => `${jp}の担当確認`, applies: ({ jp }) => people.has(jp) },
      { suffix: "讨论", jp: ({ jp }) => `${jp}の検討`, applies: ({ jp }) => projects.has(jp) },
      { suffix: "调整", jp: ({ jp }) => `${jp}の調整`, applies: ({ jp }) => projects.has(jp) },
      { suffix: "管理", jp: ({ jp }) => managementLabel(jp), applies: ({ jp }) => projects.has(jp) },
      { suffix: "汇报", jp: ({ jp }) => reportLabel(jp), applies: ({ jp }) => projects.has(jp) }
    ],
    fr: [
      { prefix: "vérification de", jp: ({ jp }) => confirmLabel(jp), applies: ({ jp }) => jp !== "確認" },
      { prefix: "information sur", jp: ({ jp }) => infoLabel(jp), applies: all },
      { prefix: "question sur", jp: ({ jp }) => questionLabel(jp), applies: all },
      { prefix: "note sur", jp: ({ jp }) => memoLabel(jp), applies: all },
      { prefix: "point d'attention pour", jp: ({ jp }) => `${jp}の注意点`, applies: all },
      { prefix: "point clé de", jp: ({ jp }) => `${jp}の要点`, applies: all },
      { prefix: "procédure de", jp: ({ jp }) => procedureLabel(jp), applies: all },
      { prefix: "état de", jp: ({ jp }) => statusLabel(jp), applies: ({ jp }) => jp !== "進捗" },
      { prefix: "soumission de", jp: ({ jp }) => `${jp}の提出`, applies: ({ jp }) => documents.has(jp) },
      { prefix: "modification de", jp: ({ jp }) => `${jp}の修正`, applies: ({ jp }) => documents.has(jp) || projects.has(jp) },
      { prefix: "partage de", jp: ({ jp }) => shareLabel(jp), applies: ({ jp }) => documents.has(jp) || projects.has(jp) },
      { prefix: "vérification finale de", jp: ({ jp }) => `${jp}の最終確認`, applies: ({ jp }) => documents.has(jp) },
      { prefix: "contact avec", jp: ({ jp }) => `${jp}への連絡`, applies: ({ jp }) => people.has(jp) },
      { prefix: "confirmation du responsable de", jp: ({ jp }) => `${jp}の担当確認`, applies: ({ jp }) => people.has(jp) },
      { prefix: "examen de", jp: ({ jp }) => `${jp}の検討`, applies: ({ jp }) => projects.has(jp) },
      { prefix: "ajustement de", jp: ({ jp }) => `${jp}の調整`, applies: ({ jp }) => projects.has(jp) },
      { prefix: "gestion de", jp: ({ jp }) => managementLabel(jp), applies: ({ jp }) => projects.has(jp) },
      { prefix: "rapport sur", jp: ({ jp }) => reportLabel(jp), applies: ({ jp }) => projects.has(jp) }
    ]
  };

  return definitions[lang].map((pattern) => ({
    applies: pattern.applies,
    target: ({ target }) => patternTarget(lang, pattern, target),
    jp: pattern.jp
  }));
}

function travelWordPatterns(lang) {
  const places = new Set(["空港", "駅", "ホテル", "部屋", "受付", "搭乗口", "バス停", "タクシー", "地下鉄", "入口", "出口", "レストラン", "病院", "警察署"]);
  const documents = new Set(["予約", "パスポート", "チケット", "地図", "レシート", "カード", "保険"]);
  const belongings = new Set(["荷物", "預け荷物", "忘れ物", "お土産", "薬"]);
  const bookable = new Set(["ホテル", "部屋", "予約", "チケット", "座席", "レストラン", "静かな部屋"]);
  const contactable = new Set(["ホテル", "受付", "病院", "警察署", "緊急連絡先", "保険"]);
  const usable = new Set(["空港", "駅", "ホテル", "部屋", "バス停", "タクシー", "地下鉄", "レストラン", "カード", "現金", "地図", "薬"]);
  const changeable = new Set(["予約", "部屋", "チケット", "座席", "窓側", "通路側", "乗り換え", "両替", "サイズ"]);
  const receivable = new Set(["チケット", "荷物", "預け荷物", "レシート", "おつり", "お土産", "薬"]);
  const checkable = (item) => item.jp !== "売り切れ";
  const nearable = (item) => places.has(item.jp);
  const all = () => true;

  const definitions = {
    ko: [
      { suffix: "정보", jp: ({ jp }) => `${jp}の情報`, applies: all },
      { suffix: "확인", jp: ({ jp }) => `${jp}の確認`, applies: checkable },
      { suffix: "안내", jp: ({ jp }) => `${jp}の案内`, applies: all },
      { suffix: "메모", jp: ({ jp }) => `${jp}のメモ`, applies: all },
      { suffix: "여행 표현", jp: ({ jp }) => `${jp}の旅行表現`, applies: all },
      { suffix: "사용법", jp: ({ jp }) => `${jp}の使い方`, applies: all },
      { suffix: "주의점", jp: ({ jp }) => `${jp}の注意点`, applies: all },
      { suffix: "필수 표현", jp: ({ jp }) => `${jp}の必須表現`, applies: all },
      { suffix: "관련 표현", jp: ({ jp }) => `${jp}の関連表現`, applies: all },
      { suffix: "질문", jp: ({ jp }) => `${jp}についての質問`, applies: all },
      { suffix: "위치", jp: ({ jp }) => `${jp}の場所`, applies: (item) => places.has(item.jp) || belongings.has(item.jp) },
      { suffix: "근처", jp: ({ jp }) => `${jp}の近く`, applies: nearable },
      { suffix: "예약", jp: ({ jp }) => `${jp}の予約`, applies: (item) => bookable.has(item.jp) },
      { suffix: "문의", jp: ({ jp }) => `${jp}の問い合わせ`, applies: (item) => contactable.has(item.jp) },
      { suffix: "준비", jp: ({ jp }) => `${jp}の準備`, applies: (item) => documents.has(item.jp) || belongings.has(item.jp) },
      { suffix: "받기", jp: ({ jp }) => `${jp}を受け取る`, applies: (item) => receivable.has(item.jp) },
      { suffix: "보여주기", jp: ({ jp }) => `${jp}を見せる`, applies: (item) => documents.has(item.jp) },
      { suffix: "이용하기", jp: ({ jp }) => `${jp}を利用する`, applies: (item) => usable.has(item.jp) },
      { suffix: "변경", jp: ({ jp }) => `${jp}の変更`, applies: (item) => changeable.has(item.jp) }
    ],
    zh: [
      { suffix: "信息", jp: ({ jp }) => `${jp}の情報`, applies: all },
      { prefix: "确认", jp: ({ jp }) => `${jp}の確認`, applies: checkable },
      { suffix: "指南", jp: ({ jp }) => `${jp}の案内`, applies: all },
      { suffix: "笔记", jp: ({ jp }) => `${jp}のメモ`, applies: all },
      { suffix: "旅行表达", jp: ({ jp }) => `${jp}の旅行表現`, applies: all },
      { suffix: "用法", jp: ({ jp }) => `${jp}の使い方`, applies: all },
      { suffix: "注意点", jp: ({ jp }) => `${jp}の注意点`, applies: all },
      { suffix: "必备表达", jp: ({ jp }) => `${jp}の必須表現`, applies: all },
      { suffix: "相关表达", jp: ({ jp }) => `${jp}の関連表現`, applies: all },
      { suffix: "问题", jp: ({ jp }) => `${jp}についての質問`, applies: all },
      { suffix: "位置", jp: ({ jp }) => `${jp}の場所`, applies: (item) => places.has(item.jp) || belongings.has(item.jp) },
      { suffix: "附近", jp: ({ jp }) => `${jp}の近く`, applies: nearable },
      { suffix: "预订", jp: ({ jp }) => `${jp}の予約`, applies: (item) => bookable.has(item.jp) },
      { suffix: "咨询", jp: ({ jp }) => `${jp}の問い合わせ`, applies: (item) => contactable.has(item.jp) },
      { suffix: "准备", jp: ({ jp }) => `${jp}の準備`, applies: (item) => documents.has(item.jp) || belongings.has(item.jp) },
      { prefix: "领取", jp: ({ jp }) => `${jp}を受け取る`, applies: (item) => receivable.has(item.jp) },
      { prefix: "出示", jp: ({ jp }) => `${jp}を見せる`, applies: (item) => documents.has(item.jp) },
      { prefix: "使用", jp: ({ jp }) => `${jp}を利用する`, applies: (item) => usable.has(item.jp) },
      { suffix: "更改", jp: ({ jp }) => `${jp}の変更`, applies: (item) => changeable.has(item.jp) }
    ],
    fr: [
      { prefix: "information sur", jp: ({ jp }) => `${jp}の情報`, applies: all },
      { prefix: "vérification de", jp: ({ jp }) => `${jp}の確認`, applies: checkable },
      { prefix: "guide de", jp: ({ jp }) => `${jp}の案内`, applies: all },
      { prefix: "note sur", jp: ({ jp }) => `${jp}のメモ`, applies: all },
      { prefix: "expression de voyage pour", jp: ({ jp }) => `${jp}の旅行表現`, applies: all },
      { prefix: "utilisation de", jp: ({ jp }) => `${jp}の使い方`, applies: all },
      { prefix: "point d'attention pour", jp: ({ jp }) => `${jp}の注意点`, applies: all },
      { prefix: "expression essentielle pour", jp: ({ jp }) => `${jp}の必須表現`, applies: all },
      { prefix: "expression liée à", jp: ({ jp }) => `${jp}の関連表現`, applies: all },
      { prefix: "question sur", jp: ({ jp }) => `${jp}についての質問`, applies: all },
      { prefix: "emplacement de", jp: ({ jp }) => `${jp}の場所`, applies: (item) => places.has(item.jp) || belongings.has(item.jp) },
      { prefix: "près de", jp: ({ jp }) => `${jp}の近く`, applies: nearable },
      { prefix: "réservation de", jp: ({ jp }) => `${jp}の予約`, applies: (item) => bookable.has(item.jp) },
      { prefix: "contact pour", jp: ({ jp }) => `${jp}の問い合わせ`, applies: (item) => contactable.has(item.jp) },
      { prefix: "préparation de", jp: ({ jp }) => `${jp}の準備`, applies: (item) => documents.has(item.jp) || belongings.has(item.jp) },
      { prefix: "réception de", jp: ({ jp }) => `${jp}を受け取る`, applies: (item) => receivable.has(item.jp) },
      { prefix: "présentation de", jp: ({ jp }) => `${jp}を見せる`, applies: (item) => documents.has(item.jp) },
      { prefix: "utilisation de", jp: ({ jp }) => `${jp}を利用する`, applies: (item) => usable.has(item.jp) },
      { prefix: "modification de", jp: ({ jp }) => `${jp}の変更`, applies: (item) => changeable.has(item.jp) }
    ]
  };

  return definitions[lang].map((pattern) => ({
    applies: pattern.applies,
    target: ({ target }) => {
      if (pattern.prefix) return lang === "fr" ? frJoin(pattern.prefix, target) : `${pattern.prefix}${target}`;
      return `${target}${lang === "ko" ? " " : ""}${pattern.suffix}`;
    },
    jp: pattern.jp
  }));
}

function actionApplies(category, action, jp) {
  if (category !== "travel") {
    return true;
  }

  const reservable = new Set(["ホテル", "部屋", "予約", "レストラン", "チケット", "座席", "静かな部屋"]);
  const payable = new Set(["注文", "会計", "レシート", "カード", "現金", "両替", "おつり", "お土産", "チケット", "薬"]);
  const receivable = new Set(["チケット", "レシート", "荷物", "預け荷物", "忘れ物", "おつり", "カード", "薬", "お土産"]);
  const exchangeable = new Set(["両替", "現金", "おつり", "カード", "チケット", "座席", "部屋"]);
  const transit = new Set(["駅", "空港", "バス停", "タクシー", "地下鉄", "乗り換え", "搭乗口"]);
  const orderable = new Set(["レストラン", "メニュー", "注文", "会計", "お土産", "薬"]);
  const borrowable = new Set(["地図", "薬", "カード", "タクシー"]);
  const contactable = new Set(["ホテル", "受付", "病院", "警察署", "緊急連絡先", "保険"]);
  const showable = new Set(["パスポート", "チケット", "レシート", "カード", "地図", "予約", "保険", "忘れ物"]);
  const guideable = new Set(["空港", "駅", "ホテル", "部屋", "搭乗口", "地図", "道案内", "バス停", "タクシー", "地下鉄", "入口", "出口", "病院", "警察署"]);
  const searchable = new Set(["空港", "駅", "ホテル", "部屋", "受付", "荷物", "預け荷物", "搭乗口", "チケット", "座席", "地図", "道案内", "バス停", "タクシー", "地下鉄", "入口", "出口", "レストラン", "メニュー", "レシート", "カード", "現金", "お土産", "サイズ", "薬", "病院", "警察署", "忘れ物", "緊急連絡先", "営業時間"]);

  if (action === "予約する") return reservable.has(jp);
  if (action === "支払う") return payable.has(jp);
  if (action === "受け取る") return receivable.has(jp);
  if (action === "交換する") return exchangeable.has(jp);
  if (action === "乗り換える") return transit.has(jp);
  if (action === "注文する") return orderable.has(jp);
  if (action === "借りる") return borrowable.has(jp);
  if (action === "連絡する") return contactable.has(jp);
  if (action === "見せる") return showable.has(jp);
  if (action === "案内する") return guideable.has(jp);
  if (action === "探す") return searchable.has(jp);
  if (action === "変更する") return reservable.has(jp) || exchangeable.has(jp) || transit.has(jp);
  if (action === "返金する") return payable.has(jp) || jp === "保険";
  if (action === "確認する") return jp !== "売り切れ";
  return true;
}

function phrasePatterns(lang, category) {
  if (category === "basic") {
    const isPlace = (item) => hasTag(item, "place");
    const isPerson = (item) => hasTag(item, "person");
    const isFood = (item) => hasTag(item, "food");
    const isObject = (item) => hasTag(item, "object");
    const isTangible = (item) => hasTag(item, "tangible");
    const isTransport = (item) => hasTag(item, "transport");
    const isMedia = (item) => hasTag(item, "media");
    const isWeather = (item) => ["天気", "雨", "雪"].includes(item.jp);
    const isClockTime = (item) => ["朝", "昼", "夜", "週末", "時間"].includes(item.jp);
    const needed = (item) => isFood(item) || isTangible(item) || isTransport(item) || isMedia(item);
    const searchable = (item) => isFood(item) || isTangible(item) || isTransport(item) || isPlace(item);
    const usable = (item) => isTangible(item) || isTransport(item) || isMedia(item);
    const nearby = (item) => isPlace(item) || isTransport(item);
    const all = () => true;
    const frFoodAmount = ({ jp, target }) => {
      const amounts = {
        "水": "de l'eau",
        "お茶": "du thé",
        "コーヒー": "du café",
        "牛乳": "du lait",
        "パン": "du pain",
        "ご飯": "du riz",
        "卵": "un œuf",
        "りんご": "une pomme",
        "料理": "un plat"
      };
      return amounts[jp] || target;
    };

    if (lang === "ko") {
      return [
        { applies: needed, target: ({ target }) => `${target}${koSubject(target)} 필요해요.`, jp: ({ jp }) => `${jp}が必要です` },
        { applies: searchable, target: ({ target }) => `${target}${koObject(target)} 찾고 있어요.`, jp: ({ jp }) => `${jp}を探しています` },
        { applies: isFood, target: ({ target }) => `${target}${koObject(target)} 주세요.`, jp: ({ jp }) => `${jp}をください` },
        { applies: isPlace, target: ({ target }) => `${target}${koTopic(target)} 어디에 있어요?`, jp: ({ jp }) => `${jp}はどこにありますか` },
        { applies: isPlace, target: ({ target }) => `오늘 ${target}에 갔어요.`, jp: ({ jp }) => `今日${jp}に行きました` },
        { applies: isPlace, target: ({ target }) => `${target}에서 만나요.`, jp: ({ jp }) => `${jp}で会いましょう` },
        { applies: isPerson, target: ({ target }) => `오늘 ${target}${koObject(target)} 만났어요.`, jp: ({ jp }) => `今日${jp}に会いました` },
        { applies: isPerson, target: ({ target }) => `${target}에게 물어볼게요.`, jp: ({ jp }) => `${jp}に聞いてみます` },
        { applies: nearby, target: ({ target }) => `${target}${koTopic(target)} 가까워요.`, jp: ({ jp }) => `${jp}は近いです` },
        { applies: usable, target: ({ target }) => `${target}${koObject(target)} 사용해요.`, jp: ({ jp }) => `${jp}を使います` },
        { applies: isWeather, target: ({ target }) => `${target}${koTopic(target)} 어때요?`, jp: ({ jp }) => `${jp}はどうですか` },
        { applies: isClockTime, target: ({ target }) => `${target}에 다시 확인할게요.`, jp: ({ jp }) => `${jp}にもう一度確認します` },
        { applies: all, target: ({ target }) => `${target} 발음을 연습해요.`, jp: ({ jp }) => `「${jp}」の発音を練習します` },
        { applies: all, target: ({ target }) => `${target} 뜻을 복습해요.`, jp: ({ jp }) => `「${jp}」の意味を復習します` }
      ];
    }
    if (lang === "zh") {
      return [
        { applies: needed, target: ({ target }) => `我需要${target}。`, jp: ({ jp }) => `${jp}が必要です` },
        { applies: searchable, target: ({ target }) => `我在找${target}。`, jp: ({ jp }) => `${jp}を探しています` },
        { applies: isFood, target: ({ target }) => `请给我${target}。`, jp: ({ jp }) => `${jp}をください` },
        { applies: isPlace, target: ({ target }) => `${target}在哪里？`, jp: ({ jp }) => `${jp}はどこですか` },
        { applies: isPlace, target: ({ target }) => `我今天去了${target}。`, jp: ({ jp }) => `今日${jp}に行きました` },
        { applies: isPlace, target: ({ target }) => `我们在${target}见面吧。`, jp: ({ jp }) => `${jp}で会いましょう` },
        { applies: isPerson, target: ({ target }) => `我今天见了${target}。`, jp: ({ jp }) => `今日${jp}に会いました` },
        { applies: isPerson, target: ({ target }) => `我问一下${target}。`, jp: ({ jp }) => `${jp}に聞いてみます` },
        { applies: nearby, target: ({ target }) => `${target}很近。`, jp: ({ jp }) => `${jp}は近いです` },
        { applies: usable, target: ({ target }) => `我会用${target}。`, jp: ({ jp }) => `${jp}を使います` },
        { applies: isWeather, target: ({ target }) => `${target}怎么样？`, jp: ({ jp }) => `${jp}はどうですか` },
        { applies: isClockTime, target: ({ target }) => `我在${target}再确认一次。`, jp: ({ jp }) => `${jp}にもう一度確認します` },
        { applies: all, target: ({ target }) => `我练习${target}的发音。`, jp: ({ jp }) => `「${jp}」の発音を練習します` },
        { applies: all, target: ({ target }) => `我复习${target}的意思。`, jp: ({ jp }) => `「${jp}」の意味を復習します` }
      ];
    }
    return [
      { applies: needed, target: ({ target }) => `J'ai besoin ${frJoin("de", target)}.`, jp: ({ jp }) => `${jp}が必要です` },
      { applies: searchable, target: ({ target }) => `Je cherche ${target}.`, jp: ({ jp }) => `${jp}を探しています` },
      { applies: isFood, target: (item) => `Je voudrais ${frFoodAmount(item)}.`, jp: ({ jp }) => `${jp}をください` },
      { applies: isPlace, target: ({ target }) => `Où est ${target} ?`, jp: ({ jp }) => `${jp}はどこですか` },
      { applies: isPlace, target: ({ target }) => `Je vais ${frJoin("à", target)} aujourd'hui.`, jp: ({ jp }) => `今日${jp}に行きます` },
      { applies: isPlace, target: ({ target }) => `On se retrouve ${frJoin("à", target)}.`, jp: ({ jp }) => `${jp}で会いましょう` },
      { applies: isPerson, target: ({ target }) => `J'ai rencontré ${target} aujourd'hui.`, jp: ({ jp }) => `今日${jp}に会いました` },
      { applies: isPerson, target: ({ target }) => `Je vais demander ${frJoin("à", target)}.`, jp: ({ jp }) => `${jp}に聞いてみます` },
      { applies: nearby, target: ({ target }) => `${target} est proche.`, jp: ({ jp }) => `${jp}は近いです` },
      { applies: usable, target: ({ target }) => `J'utilise ${target}.`, jp: ({ jp }) => `${jp}を使います` },
      { applies: isWeather, target: ({ target }) => `Comment est ${target} ?`, jp: ({ jp }) => `${jp}はどうですか` },
      { applies: isClockTime, target: ({ target }) => `Je vérifierai encore ${target}.`, jp: ({ jp }) => `${jp}にもう一度確認します` },
      { applies: all, target: ({ target }) => `Je pratique la prononciation ${frJoin("de", target)}.`, jp: ({ jp }) => `「${jp}」の発音を練習します` },
      { applies: all, target: ({ target }) => `Je révise le sens ${frJoin("de", target)}.`, jp: ({ jp }) => `「${jp}」の意味を復習します` }
    ];
  }

  if (category === "travel") {
    return travelPhrasePatterns(lang);
  }
  if (category === "practical") {
    return practicalPhrasePatterns(lang);
  }
  if (category === "business") {
    return businessPhrasePatterns(lang);
  }

  const sendablePhrase = ({ jp }) => new Set([
    "ファイル", "写真", "メール", "リンク", "メモ", "回答", "通知", "予定", "日程", "レポート",
    "資料", "請求書", "見積書", "フォーム", "契約", "提案", "議事録", "注文", "納品", "数字"
  ]).has(jp);
  const neededPhrase = ({ jp }) => new Set([
    "助け", "手伝い", "時間", "ファイル", "メモ", "回答", "通知", "予定", "日程", "意味", "発音",
    "資料", "予算", "承認", "権限", "見積もり", "請求書", "フォーム", "契約", "人員", "情報", "注文", "納品"
  ]).has(jp);

  if (lang === "ko") {
    return [
      { target: ({ target }) => `${target}${koObject(target)} 확인해 주세요.`, jp: ({ jp }) => `${jp}を確認してください` },
      { target: ({ target }) => `${target}에 대해 알려 주세요.`, jp: ({ jp }) => `${jp}について教えてください` },
      { applies: sendablePhrase, target: ({ target }) => `${target}${koObject(target)} 다시 보내 주세요.`, jp: ({ jp }) => `${jp}をもう一度送ってください` },
      { target: ({ target }) => `${target}${koTopic(target)} 나중에 볼게요.`, jp: ({ jp }) => `${jp}はあとで見ます` },
      { applies: neededPhrase, target: ({ target }) => `${target}${koSubject(target)} 필요합니다.`, jp: ({ jp }) => `${jp}が必要です` },
      { target: ({ target }) => `${target}${koObject(target)} 먼저 정리하겠습니다.`, jp: ({ jp }) => `${jp}を先に整理します` },
      { target: ({ target }) => `${target}${koObject(target)} 쉽게 설명해 주세요.`, jp: ({ jp }) => `${jp}を簡単に説明してください` }
    ];
  }
  if (lang === "zh") {
    return [
      { target: ({ target }) => `请确认${target}。`, jp: ({ jp }) => `${jp}を確認してください` },
      { target: ({ target }) => `请告诉我关于${target}的信息。`, jp: ({ jp }) => `${jp}について教えてください` },
      { applies: sendablePhrase, target: ({ target }) => `请再发送一次${target}。`, jp: ({ jp }) => `${jp}をもう一度送ってください` },
      { target: ({ target }) => `${target}我稍后再看。`, jp: ({ jp }) => `${jp}はあとで見ます` },
      { applies: neededPhrase, target: ({ target }) => `需要${target}。`, jp: ({ jp }) => `${jp}が必要です` },
      { target: ({ target }) => `我先整理${target}。`, jp: ({ jp }) => `${jp}を先に整理します` },
      { target: ({ target }) => `请简单说明${target}。`, jp: ({ jp }) => `${jp}を簡単に説明してください` }
    ];
  }
  return [
    { target: ({ target }) => `Vérifiez ${target}, s'il vous plaît.`, jp: ({ jp }) => `${jp}を確認してください` },
    { target: ({ target }) => `Renseignez-moi sur ${target}, s'il vous plaît.`, jp: ({ jp }) => `${jp}について教えてください` },
    { applies: sendablePhrase, target: ({ target }) => `Renvoyez ${target}, s'il vous plaît.`, jp: ({ jp }) => `${jp}をもう一度送ってください` },
    { target: ({ target }) => `Je regarderai ${target} plus tard.`, jp: ({ jp }) => `${jp}はあとで見ます` },
    { applies: neededPhrase, target: ({ target }) => `Il faut ${target}.`, jp: ({ jp }) => `${jp}が必要です` },
    { target: ({ target }) => `Je vais d'abord organiser ${target}.`, jp: ({ jp }) => `${jp}を先に整理します` },
    { target: ({ target }) => `Expliquez simplement ${target}, s'il vous plaît.`, jp: ({ jp }) => `${jp}を簡単に説明してください` }
  ];
}

function practicalPhrasePatterns(lang) {
  const all = () => true;
  const definitions = {
    ko: [
      { target: ({ target }) => `${target}${koObject(target)} 확인해 주세요.`, jp: ({ jp }) => `${jp}を確認してください`, applies: all },
      { target: ({ target }) => `${target}에 대해 알려 주세요.`, jp: ({ jp }) => `${jp}について教えてください`, applies: all },
      { target: ({ target }) => `${target}에 대해 메모할게요.`, jp: ({ jp }) => `${jp}についてメモします`, applies: all },
      { target: ({ target }) => `${target}의 주의점을 확인할게요.`, jp: ({ jp }) => `${jp}の注意点を確認します`, applies: all },
      { target: ({ target }) => `${target}${koObject(target)} 다시 확인할게요.`, jp: ({ jp }) => `${jp}をもう一度確認します`, applies: all },
      { target: ({ target }) => `${target}에 대해 쉽게 설명해 주세요.`, jp: ({ jp }) => `${jp}について簡単に説明してください`, applies: all }
    ],
    zh: [
      { target: ({ target }) => `请确认${target}。`, jp: ({ jp }) => `${jp}を確認してください`, applies: all },
      { target: ({ target }) => `请告诉我关于${target}的信息。`, jp: ({ jp }) => `${jp}について教えてください`, applies: all },
      { target: ({ target }) => `我会记下关于${target}的内容。`, jp: ({ jp }) => `${jp}についてメモします`, applies: all },
      { target: ({ target }) => `我确认一下${target}的注意点。`, jp: ({ jp }) => `${jp}の注意点を確認します`, applies: all },
      { target: ({ target }) => `我再确认一下${target}。`, jp: ({ jp }) => `${jp}をもう一度確認します`, applies: all },
      { target: ({ target }) => `请简单说明一下${target}。`, jp: ({ jp }) => `${jp}について簡単に説明してください`, applies: all }
    ],
    fr: [
      { target: ({ target }) => `Vérifiez ${target}, s'il vous plaît.`, jp: ({ jp }) => `${jp}を確認してください`, applies: all },
      { target: ({ target }) => `Renseignez-moi sur ${target}, s'il vous plaît.`, jp: ({ jp }) => `${jp}について教えてください`, applies: all },
      { target: ({ target }) => `Je vais prendre une note sur ${target}.`, jp: ({ jp }) => `${jp}についてメモします`, applies: all },
      { target: ({ target }) => `Je vais vérifier les points d'attention de ${target}.`, jp: ({ jp }) => `${jp}の注意点を確認します`, applies: all },
      { target: ({ target }) => `Je vais revérifier ${target}.`, jp: ({ jp }) => `${jp}をもう一度確認します`, applies: all },
      { target: ({ target }) => `Expliquez simplement ${target}, s'il vous plaît.`, jp: ({ jp }) => `${jp}について簡単に説明してください`, applies: all }
    ]
  };

  return definitions[lang];
}

function businessPhrasePatterns(lang) {
  const all = () => true;
  const definitions = {
    ko: [
      { target: ({ target }) => `${target}${koObject(target)} 확인해 주세요.`, jp: ({ jp }) => `${jp}を確認してください`, applies: all },
      { target: ({ target }) => `${target}에 대해 알려 주세요.`, jp: ({ jp }) => `${jp}について教えてください`, applies: all },
      { target: ({ target }) => `${target}에 대해 메모하겠습니다.`, jp: ({ jp }) => `${jp}についてメモします`, applies: all },
      { target: ({ target }) => `${target}의 상황을 확인하겠습니다.`, jp: ({ jp }) => `${jp}の状況を確認します`, applies: ({ jp }) => jp !== "進捗" },
      { target: ({ target }) => `${target}의 요점을 확인하겠습니다.`, jp: ({ jp }) => `${jp}の要点を確認します`, applies: all },
      { target: ({ target }) => `${target}에 대해 쉽게 설명해 주세요.`, jp: ({ jp }) => `${jp}について簡単に説明してください`, applies: all }
    ],
    zh: [
      { target: ({ target }) => `请确认${target}。`, jp: ({ jp }) => `${jp}を確認してください`, applies: all },
      { target: ({ target }) => `请告诉我关于${target}的信息。`, jp: ({ jp }) => `${jp}について教えてください`, applies: all },
      { target: ({ target }) => `我会记下关于${target}的内容。`, jp: ({ jp }) => `${jp}についてメモします`, applies: all },
      { target: ({ target }) => `我确认一下${target}的状态。`, jp: ({ jp }) => `${jp}の状況を確認します`, applies: ({ jp }) => jp !== "進捗" },
      { target: ({ target }) => `我确认一下${target}的要点。`, jp: ({ jp }) => `${jp}の要点を確認します`, applies: all },
      { target: ({ target }) => `请简单说明一下${target}。`, jp: ({ jp }) => `${jp}について簡単に説明してください`, applies: all }
    ],
    fr: [
      { target: ({ target }) => `Vérifiez ${target}, s'il vous plaît.`, jp: ({ jp }) => `${jp}を確認してください`, applies: all },
      { target: ({ target }) => `Renseignez-moi sur ${target}, s'il vous plaît.`, jp: ({ jp }) => `${jp}について教えてください`, applies: all },
      { target: ({ target }) => `Je vais prendre une note sur ${target}.`, jp: ({ jp }) => `${jp}についてメモします`, applies: all },
      { target: ({ target }) => `Je vais vérifier l'état de ${target}.`, jp: ({ jp }) => `${jp}の状況を確認します`, applies: ({ jp }) => jp !== "進捗" },
      { target: ({ target }) => `Je vais vérifier les points clés de ${target}.`, jp: ({ jp }) => `${jp}の要点を確認します`, applies: all },
      { target: ({ target }) => `Expliquez simplement ${target}, s'il vous plaît.`, jp: ({ jp }) => `${jp}について簡単に説明してください`, applies: all }
    ]
  };

  return definitions[lang];
}

function travelPhrasePatterns(lang) {
  const places = new Set(["空港", "駅", "ホテル", "部屋", "受付", "搭乗口", "バス停", "タクシー", "地下鉄", "入口", "出口", "レストラン", "病院", "警察署"]);
  const needed = new Set(["予約", "パスポート", "チケット", "座席", "地図", "カード", "現金", "薬", "保険", "緊急連絡先", "静かな部屋"]);
  const showable = new Set(["予約", "パスポート", "チケット", "地図", "レシート", "カード", "保険"]);
  const receivable = new Set(["チケット", "荷物", "預け荷物", "レシート", "おつり", "お土産", "薬"]);
  const contactable = new Set(["ホテル", "受付", "病院", "警察署", "緊急連絡先", "保険"]);
  const all = () => true;

  if (lang === "ko") {
    return [
      { applies: all, target: ({ target }) => `${target}${koObject(target)} 확인해 주세요.`, jp: ({ jp }) => `${jp}を確認してください` },
      { applies: all, target: ({ target }) => `${target}${koObject(target)} 다시 확인할게요.`, jp: ({ jp }) => `${jp}をもう一度確認します` },
      { applies: all, target: ({ target }) => `${target}에 대해 알려 주세요.`, jp: ({ jp }) => `${jp}について教えてください` },
      { applies: all, target: ({ target }) => `${target} 관련 메모를 남길게요.`, jp: ({ jp }) => `${jp}についてメモします` },
      { applies: ({ jp }) => places.has(jp), target: ({ target }) => `${target}${koTopic(target)} 어디인가요?`, jp: ({ jp }) => `${jp}はどこですか` },
      { applies: ({ jp }) => places.has(jp), target: ({ target }) => `${target}까지 어떻게 가나요?`, jp: ({ jp }) => `${jp}まではどう行きますか` },
      { applies: ({ jp }) => needed.has(jp), target: ({ target }) => `${target}${koSubject(target)} 필요합니다.`, jp: ({ jp }) => `${jp}が必要です` },
      { applies: ({ jp }) => showable.has(jp), target: ({ target }) => `${target}${koObject(target)} 보여 드릴게요.`, jp: ({ jp }) => `${jp}を見せます` },
      { applies: ({ jp }) => receivable.has(jp), target: ({ target }) => `${target}${koObject(target)} 받았어요.`, jp: ({ jp }) => `${jp}を受け取りました` },
      { applies: ({ jp }) => contactable.has(jp), target: ({ target }) => `${target}에 연락해 주세요.`, jp: ({ jp }) => `${jp}に連絡してください` }
    ];
  }
  if (lang === "zh") {
    return [
      { applies: all, target: ({ target }) => `请确认${target}。`, jp: ({ jp }) => `${jp}を確認してください` },
      { applies: all, target: ({ target }) => `我再确认一下${target}。`, jp: ({ jp }) => `${jp}をもう一度確認します` },
      { applies: all, target: ({ target }) => `请告诉我关于${target}的信息。`, jp: ({ jp }) => `${jp}について教えてください` },
      { applies: all, target: ({ target }) => `我会记下${target}。`, jp: ({ jp }) => `${jp}についてメモします` },
      { applies: ({ jp }) => places.has(jp), target: ({ target }) => `${target}在哪里？`, jp: ({ jp }) => `${jp}はどこですか` },
      { applies: ({ jp }) => places.has(jp), target: ({ target }) => `到${target}怎么走？`, jp: ({ jp }) => `${jp}まではどう行きますか` },
      { applies: ({ jp }) => needed.has(jp), target: ({ target }) => `我需要${target}。`, jp: ({ jp }) => `${jp}が必要です` },
      { applies: ({ jp }) => showable.has(jp), target: ({ target }) => `我给您看${target}。`, jp: ({ jp }) => `${jp}を見せます` },
      { applies: ({ jp }) => receivable.has(jp), target: ({ target }) => `我收到了${target}。`, jp: ({ jp }) => `${jp}を受け取りました` },
      { applies: ({ jp }) => contactable.has(jp), target: ({ target }) => `请联系${target}。`, jp: ({ jp }) => `${jp}に連絡してください` }
    ];
  }
  return [
    { applies: all, target: ({ target }) => `Vérifiez ${target}, s'il vous plaît.`, jp: ({ jp }) => `${jp}を確認してください` },
    { applies: all, target: ({ target }) => `Je vais revérifier ${target}.`, jp: ({ jp }) => `${jp}をもう一度確認します` },
    { applies: all, target: ({ target }) => `Renseignez-moi sur ${target}, s'il vous plaît.`, jp: ({ jp }) => `${jp}について教えてください` },
    { applies: all, target: ({ target }) => `Je vais noter ${target}.`, jp: ({ jp }) => `${jp}についてメモします` },
    { applies: ({ jp }) => places.has(jp), target: ({ target }) => `Où est ${target} ?`, jp: ({ jp }) => `${jp}はどこですか` },
    { applies: ({ jp }) => places.has(jp), target: ({ target }) => `Comment aller ${frJoin("à", target)} ?`, jp: ({ jp }) => `${jp}まではどう行きますか` },
    { applies: ({ jp }) => needed.has(jp), target: ({ target }) => `J'ai besoin ${frJoin("de", target)}.`, jp: ({ jp }) => `${jp}が必要です` },
    { applies: ({ jp }) => showable.has(jp), target: ({ target }) => `Je vais montrer ${target}.`, jp: ({ jp }) => `${jp}を見せます` },
    { applies: ({ jp }) => receivable.has(jp), target: ({ target }) => `J'ai reçu ${target}.`, jp: ({ jp }) => `${jp}を受け取りました` },
    { applies: ({ jp }) => contactable.has(jp), target: ({ target }) => `Contactez ${target}, s'il vous plaît.`, jp: ({ jp }) => `${jp}に連絡してください` }
  ];
}

function generatedGroupsFor(lang, kind) {
  return Object.fromEntries(categories.map((category) => {
    const items = conceptBanks[category].map((row) => itemForLang(row, lang, category));
    const patterns = kind === "phrase"
      ? phrasePatterns(lang, category)
      : category === "basic"
        ? basicWordPatterns(lang)
        : actionWordPatterns(lang, category);
    return [category, buildRows(items, patterns)];
  }));
}

function topUpGroup(baseRows, generatedRows, targetCount) {
  const result = [];
  const seen = new Set();
  const add = (row) => {
    const target = String(row?.[0] || "").trim();
    const japanese = String(row?.[1] || "").trim();
    if (!target || !japanese) return false;
    const key = target.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    result.push([target, japanese, row[2]]);
    return true;
  };

  for (const row of baseRows) add(row);
  for (const row of generatedRows) {
    if (result.length >= targetCount) break;
    add(row);
  }
  return result;
}

export function topUpLanguageGroups(lang, kind, baseGroups, targetCounts) {
  const generated = generatedGroupsFor(lang, kind);
  return Object.fromEntries(categories.map((category) => [
    category,
    topUpGroup(baseGroups[category] || [], generated[category] || [], targetCounts[category] || 0)
  ]));
}
