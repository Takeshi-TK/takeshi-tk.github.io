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

function itemForLang(row, lang) {
  const indexes = { ko: 1, zh: 2, fr: 3 };
  return { jp: row[0], target: row[indexes[lang]] };
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
      rows.push([pattern.target(item), pattern.jp(item)]);
    }
  }
  return rows;
}

function basicWordPatterns(lang) {
  if (lang === "ko") {
    return [
      ["근처", "の近く"], ["앞", "の前"], ["뒤", "の後ろ"], ["옆", "の横"], ["안", "の中"], ["밖", "の外"],
      ["입구", "の入口"], ["출구", "の出口"], ["위치", "の場所"], ["이름", "の名前"], ["사진", "の写真"], ["시간", "の時間"],
      ["새", "新しい"], ["오래된", "古い"], ["작은", "小さい"], ["큰", "大きい"], ["깨끗한", "きれいな"], ["중요한", "重要な"],
      ["첫", "最初の"], ["다음", "次の"]
    ].map(([prefixOrSuffix, jp]) => {
      const isAdjective = ["새", "오래된", "작은", "큰", "깨끗한", "중요한", "첫", "다음"].includes(prefixOrSuffix);
      return {
        target: ({ target }) => isAdjective ? `${prefixOrSuffix} ${target}` : `${target} ${prefixOrSuffix}`,
        jp: ({ jp: label }) => isAdjective ? `${jp}${label}` : `${label}${jp}`
      };
    });
  }

  if (lang === "zh") {
    return [
      ["附近", "の近く"], ["前面", "の前"], ["后面", "の後ろ"], ["旁边", "の横"], ["里面", "の中"], ["外面", "の外"],
      ["入口", "の入口"], ["出口", "の出口"], ["位置", "の場所"], ["名字", "の名前"], ["照片", "の写真"], ["时间", "の時間"],
      ["新", "新しい"], ["旧", "古い"], ["小", "小さい"], ["大", "大きい"], ["干净的", "きれいな"], ["重要的", "重要な"],
      ["第一个", "最初の"], ["下一个", "次の"]
    ].map(([part, jp]) => {
      const isPrefix = ["新", "旧", "小", "大", "干净的", "重要的", "第一个", "下一个"].includes(part);
      return {
        target: ({ target }) => isPrefix ? `${part}${target}` : `${target}${part}`,
        jp: ({ jp: label }) => isPrefix ? `${jp}${label}` : `${label}${jp}`
      };
    });
  }

  return [
    ["près de", "の近く"], ["devant", "の前"], ["derrière", "の後ろ"], ["à côté de", "の横"], ["dans", "の中"],
    ["hors de", "の外"], ["l'entrée de", "の入口"], ["la sortie de", "の出口"], ["l'emplacement de", "の場所"],
    ["le nom de", "の名前"], ["la photo de", "の写真"], ["l'heure de", "の時間"], ["avant", "の前に"], ["après", "の後に"],
    ["avec", "と一緒に"], ["sans", "なしで"], ["pour", "のために"], ["autour de", "の周り"], ["en face de", "の向かい"], ["près d'ici avec", "近くの"]
  ].map(([prefix, jp]) => ({
    target: ({ target }) => `${prefix} ${target}`,
    jp: ({ jp: label }) => jp === "近くの" ? `${jp}${label}` : `${label}${jp}`
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
  const index = { ko: 1, zh: 2, fr: 3 }[lang];
  return actionLabels[category].map((action) => ({
    target: ({ target }) => {
      if (lang === "ko") return `${target} ${action[index]}`;
      if (lang === "zh") return `${action[index]}${target}`;
      return `${action[index]} ${target}`;
    },
    jp: ({ jp }) => `${jp}を${action[0]}`
  }));
}

function phrasePatterns(lang, category) {
  if (category === "basic") {
    if (lang === "ko") {
      return [
        { target: ({ target }) => `${target}${koSubject(target)} 필요해요.`, jp: ({ jp }) => `${jp}が必要です` },
        { target: ({ target }) => `${target}${koObject(target)} 찾고 있어요.`, jp: ({ jp }) => `${jp}を探しています` },
        { target: ({ target }) => `${target}${koObject(target)} 주세요.`, jp: ({ jp }) => `${jp}をください` },
        { target: ({ target }) => `${target}${koTopic(target)} 어디에 있어요?`, jp: ({ jp }) => `${jp}はどこにありますか` },
        { target: ({ target }) => `오늘 ${target}${koObject(target)} 봤어요.`, jp: ({ jp }) => `今日${jp}を見ました` },
        { target: ({ target }) => `${target}${koTopic(target)} 좋아요.`, jp: ({ jp }) => `${jp}は良いです` }
      ];
    }
    if (lang === "zh") {
      return [
        { target: ({ target }) => `我需要${target}。`, jp: ({ jp }) => `${jp}が必要です` },
        { target: ({ target }) => `我在找${target}。`, jp: ({ jp }) => `${jp}を探しています` },
        { target: ({ target }) => `请给我${target}。`, jp: ({ jp }) => `${jp}をください` },
        { target: ({ target }) => `${target}在哪里？`, jp: ({ jp }) => `${jp}はどこですか` },
        { target: ({ target }) => `我今天看到了${target}。`, jp: ({ jp }) => `今日${jp}を見ました` },
        { target: ({ target }) => `${target}很好。`, jp: ({ jp }) => `${jp}は良いです` }
      ];
    }
    return [
      { target: ({ target }) => `J'ai besoin de ${target}.`, jp: ({ jp }) => `${jp}が必要です` },
      { target: ({ target }) => `Je cherche ${target}.`, jp: ({ jp }) => `${jp}を探しています` },
      { target: ({ target }) => `Je voudrais ${target}.`, jp: ({ jp }) => `${jp}が欲しいです` },
      { target: ({ target }) => `Où est ${target} ?`, jp: ({ jp }) => `${jp}はどこですか` },
      { target: ({ target }) => `J'ai vu ${target} aujourd'hui.`, jp: ({ jp }) => `今日${jp}を見ました` },
      { target: ({ target }) => `${target} est pratique.`, jp: ({ jp }) => `${jp}は便利です` }
    ];
  }

  if (lang === "ko") {
    return [
      { target: ({ target }) => `${target}${koObject(target)} 확인해 주세요.`, jp: ({ jp }) => `${jp}を確認してください` },
      { target: ({ target }) => `${target}${koObject(target)} 다시 보내 주세요.`, jp: ({ jp }) => `${jp}をもう一度送ってください` },
      { target: ({ target }) => `${target}${koTopic(target)} 나중에 볼게요.`, jp: ({ jp }) => `${jp}はあとで見ます` },
      { target: ({ target }) => `${target}${koSubject(target)} 필요합니다.`, jp: ({ jp }) => `${jp}が必要です` },
      { target: ({ target }) => `${target}${koObject(target)} 먼저 정리하겠습니다.`, jp: ({ jp }) => `${jp}を先に整理します` },
      { target: ({ target }) => `${target}${koObject(target)} 쉽게 설명해 주세요.`, jp: ({ jp }) => `${jp}を簡単に説明してください` }
    ];
  }
  if (lang === "zh") {
    return [
      { target: ({ target }) => `请确认${target}。`, jp: ({ jp }) => `${jp}を確認してください` },
      { target: ({ target }) => `请再发送一次${target}。`, jp: ({ jp }) => `${jp}をもう一度送ってください` },
      { target: ({ target }) => `${target}我稍后再看。`, jp: ({ jp }) => `${jp}はあとで見ます` },
      { target: ({ target }) => `需要${target}。`, jp: ({ jp }) => `${jp}が必要です` },
      { target: ({ target }) => `我先整理${target}。`, jp: ({ jp }) => `${jp}を先に整理します` },
      { target: ({ target }) => `请简单说明${target}。`, jp: ({ jp }) => `${jp}を簡単に説明してください` }
    ];
  }
  return [
    { target: ({ target }) => `Vérifiez ${target}, s'il vous plaît.`, jp: ({ jp }) => `${jp}を確認してください` },
    { target: ({ target }) => `Renvoyez ${target}, s'il vous plaît.`, jp: ({ jp }) => `${jp}をもう一度送ってください` },
    { target: ({ target }) => `Je regarderai ${target} plus tard.`, jp: ({ jp }) => `${jp}はあとで見ます` },
    { target: ({ target }) => `Il faut ${target}.`, jp: ({ jp }) => `${jp}が必要です` },
    { target: ({ target }) => `Je vais d'abord organiser ${target}.`, jp: ({ jp }) => `${jp}を先に整理します` },
    { target: ({ target }) => `Expliquez simplement ${target}, s'il vous plaît.`, jp: ({ jp }) => `${jp}を簡単に説明してください` }
  ];
}

function generatedGroupsFor(lang, kind) {
  return Object.fromEntries(categories.map((category) => {
    const items = conceptBanks[category].map((row) => itemForLang(row, lang));
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
