function buildEntries(items) {
  return items.map(([english, japanese, explanation]) => ({
    english,
    japanese,
    explanation
  }));
}

function dedupeEntries(items) {
  const seen = new Set();

  return items.filter(({ english }) => {
    const key = english.trim().toLowerCase();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

const legacyPhrases = {
  beginner: {
    label: "初級",
    description: "まずは短くて使いやすい基本フレーズから身につけるレベルです。",
    words: buildEntries([
      ["How are you?", "お元気ですか", "相手の体調や近況をたずねる定番のあいさつです。会話の最初に使いやすく、親しい相手にも初対面にも幅広く使えます。"],
      ["I am fine.", "元気です", "体調や気分を聞かれたときの基本的な返答です。短く答えたいときは I'm fine. の形で自然に使えます。"],
      ["Nice to meet you.", "はじめまして", "初対面のあいさつで使う定番表現です。自己紹介の直後に添えると自然で丁寧な印象になります。"],
      ["Thank you very much.", "どうもありがとうございます", "感謝をしっかり伝えたいときの表現です。Thank you. より丁寧で、店員や目上の相手にも使いやすいです。"],
      ["You're welcome.", "どういたしまして", "相手に感謝されたときの基本的な返答です。会話をやわらかく締めるときに便利です。"],
      ["Excuse me.", "すみません", "呼びかけ、軽い謝罪、通してもらうときなど幅広く使える万能表現です。まず相手の注意を引きたいときに使います。"],
      ["I'm sorry.", "ごめんなさい", "自分の非を認めて謝るときの基本表現です。Excuse me. より謝罪の意味が強い場面で使います。"],
      ["No problem.", "大丈夫です", "謝られたりお願いされたりしたときに、気にしなくてよいことを伝える表現です。くだけすぎず日常会話で使いやすいです。"],
      ["Please help me.", "手伝ってください", "困っていて助けが必要なときに直接伝える表現です。緊急時にも通じやすい短い言い方です。"],
      ["I don't know.", "わかりません", "答えがわからないときに使う基本表現です。無理に答えられない場面で自然に使えます。"],
      ["I understand.", "わかりました", "説明を理解したことを伝える表現です。相手の話を受け止めたことを示すのに便利です。"],
      ["Could you say that again?", "もう一度言ってもらえますか", "聞き取れなかった内容を丁寧に言い直してもらう表現です。会話を止めすぎずに確認できます。"],
      ["Please speak slowly.", "ゆっくり話してください", "相手の話す速度が速いときにペースを落としてもらう表現です。英語に不慣れなことを自然に伝えられます。"],
      ["What does this mean?", "これはどういう意味ですか", "言葉や表示の意味をたずねる表現です。この this には単語、文、標識など幅広い対象を置けます。"],
      ["How much is this?", "これはいくらですか", "値段を聞くときの基本表現です。商品を指しながら言うだけで通じやすいので買い物で非常に便利です。"],
      ["I would like this.", "これをください", "欲しいものを指して伝える表現です。注文や買い物で丁寧に希望を伝えたいときに使えます。"],
      ["Where is the station?", "駅はどこですか", "目的地の場所をたずねる基本表現です。station を restroom や bus stop など別の名詞に置き換えて応用できます。"],
      ["Where is the restroom?", "トイレはどこですか", "場所を聞く定番表現で、旅行中にも非常に使用頻度が高いです。急いでいるときでも短くはっきり伝わります。"],
      ["Can I sit here?", "ここに座ってもいいですか", "席を使ってよいか確認する表現です。人の近くに座る前に言うと丁寧です。"],
      ["Can I use Wi-Fi here?", "ここでWi-Fiは使えますか", "店や施設でネット接続の有無を確認する表現です。旅行者には特に実用的なフレーズです。"]
    ])
  },
  intermediate: {
    label: "中級",
    description: "日常会話や予定調整でよく使う表現を扱うレベルです。",
    words: buildEntries([
      ["Could you recommend something popular?", "人気のあるものをおすすめしてもらえますか", "店員や現地の人に定番を聞きたいときの表現です。something popular によって「人気のもの」という幅広い聞き方ができます。"],
      ["I have a reservation under this name.", "この名前で予約しています", "ホテルやレストランで予約を伝える定番表現です。under this name は「この名前で」という予約確認の言い回しです。"],
      ["Can I change my order?", "注文を変更できますか", "注文内容を修正したいときに使う表現です。レストランだけでなくオンライン注文の確認でも使えます。"],
      ["I'd like to pay by card.", "カードで支払いたいです", "支払い方法を伝える自然な表現です。by card を by cash に替えると現金払いにも応用できます。"],
      ["Could you make it a little less spicy?", "少し辛さを控えてもらえますか", "料理の味つけをやわらかく調整してもらいたいときの表現です。less spicy の形で辛さを下げたいことを伝えます。"],
      ["I'm on my way now.", "今向かっています", "待ち合わせ相手に現在移動中だと伝えるときの表現です。到着が近いことを自然に伝えられます。"],
      ["I might be a little late.", "少し遅れるかもしれません", "時間に遅れそうなときに早めに連絡する表現です。might を使うことで断定せず柔らかく伝えられます。"],
      ["Can we meet somewhere else?", "別の場所で会えますか", "待ち合わせ場所を変更したいときの表現です。somewhere else で「ほかのどこか」という自然な言い回しになります。"],
      ["Please let me know when you arrive.", "着いたら知らせてください", "相手の到着連絡をお願いする表現です。待ち合わせや荷物の受け取り時によく使います。"],
      ["That sounds like a good idea.", "それはよさそうですね", "提案に対して前向きに反応するときの自然な表現です。完全に確定ではなく、好意的に受け止めるニュアンスがあります。"],
      ["Could you give me a hand?", "手を貸してもらえますか", "give me a hand は「手伝う」という意味の口語表現です。重い物を持つときや作業を少し助けてほしいときに使います。"],
      ["I'm not used to this yet.", "まだこれに慣れていません", "not used to で「〜に慣れていない」という状態を表します。新しい仕事や環境に慣れていないことを自然に伝えられます。"],
      ["How long does it take from here?", "ここからどのくらいかかりますか", "所要時間をたずねる表現です。徒歩、車、電車など移動手段を問わず使える便利な聞き方です。"],
      ["Do I need to transfer?", "乗り換えは必要ですか", "電車やバスの移動中に使う実用的な表現です。transfer は交通機関の「乗り換え」を指します。"],
      ["Can I leave my luggage here?", "ここに荷物を置いてもいいですか", "ホテルや店で荷物を預けたいときの表現です。leave はこの場合「置いていく、預ける」の意味です。"],
      ["I'm just looking around.", "見ているだけです", "店員に話しかけられたときによく使う表現です。買うかどうか決めていない状態をやわらかく伝えられます。"],
      ["Could I get a receipt, please?", "領収書をもらえますか", "支払い後にレシートや領収書をお願いする表現です。ビジネスでも旅行でも使用頻度が高いです。"],
      ["Could you explain it in simple words?", "簡単な言葉で説明してもらえますか", "難しい説明をもっとわかりやすくしてほしいときの表現です。学習中の会話で特に便利です。"],
      ["I'm looking forward to it.", "楽しみにしています", "未来の予定を前向きに待っていることを伝える定番表現です。会話でもメールでも使えます。"],
      ["Can we split the bill?", "割り勘にできますか", "レストランで会計を分けたいときの定番表現です。split the bill で「勘定を分ける」という意味になります。"]
    ])
  },
  advanced: {
    label: "上級",
    description: "意見交換や説明で役立つ、少し踏み込んだ表現を扱うレベルです。",
    words: buildEntries([
      ["From my point of view, this is the best option.", "私の見方ではこれが最善の選択です", "From my point of view は「私の観点では」という前置きで、自分の意見だと示しつつ丁寧に主張できます。"],
      ["I'm not completely convinced yet.", "まだ完全には納得していません", "相手を強く否定せずに懸念を示す表現です。completely を使うことで「一部は理解しているが十分ではない」と伝えられます。"],
      ["That makes sense to me.", "それは筋が通っていると思います", "相手の説明が理解でき、納得できるときの表現です。会話を前向きに進めるクッションにもなります。"],
      ["I see where you're coming from.", "言いたいことはわかります", "直訳ではなく、相手の立場や発想を理解したときに使う慣用表現です。全面同意ではなく理解を示すときに便利です。"],
      ["Let me think it through for a moment.", "少し整理して考えさせてください", "think it through は「最後までしっかり考える」という意味です。即答を避け、丁寧に時間をもらいたいときに使います。"],
      ["Could we go over the details once more?", "詳細をもう一度確認できますか", "go over は「見直す、確認する」という意味で、内容を再点検したいときに便利な表現です。"],
      ["We should take that possibility into account.", "その可能性も考慮すべきです", "take A into account で「Aを考慮に入れる」という意味です。議論で抜けている視点を足すときに使います。"],
      ["I'd rather not make a quick decision.", "性急に決めたくはありません", "I'd rather not は「できれば〜したくない」という丁寧な断り方です。慎重に進めたい姿勢を示せます。"],
      ["Could you be a bit more specific?", "もう少し具体的に言ってもらえますか", "specific は「具体的な」という意味です。抽象的な説明を深掘りしたいときによく使います。"],
      ["I don't want to jump to conclusions.", "早合点はしたくありません", "jump to conclusions は「十分な情報なしに結論を急ぐ」という意味の熟語です。慎重な姿勢を示すときに使います。"],
      ["Let's take a step back for a second.", "少し立ち止まって考えましょう", "議論が細かくなりすぎたときに、一度視点を引いて整理したいときの表現です。"],
      ["There seems to be a misunderstanding.", "誤解があるようです", "直接的に相手を責めず、状況として誤解が起きていることを示す言い方です。"],
      ["I appreciate your honesty.", "率直に話してくれて感謝します", "率直な意見や厳しい指摘を受けたときでも前向きに受け止める表現です。関係を保ちながら会話できます。"],
      ["This could cause problems later on.", "これは後で問題になるかもしれません", "later on は「この先で、その後に」という意味です。今は小さく見える問題の将来リスクを指摘するときに使います。"],
      ["I want to make sure we're on the same page.", "認識をそろえておきたいです", "on the same page は「同じ理解をしている」という意味の慣用表現です。会議や打ち合わせで非常によく使います。"],
      ["We need to strike a balance.", "バランスを取る必要があります", "strike a balance は「ちょうどよいバランスを見つける」という意味の表現で、複数の要素の調整時に使われます。"]
    ])
  },
  business: {
    label: "ビジネス",
    description: "仕事の会話やメール、会議で使いやすい表現を扱うレベルです。",
    words: buildEntries([
      ["Could we schedule a meeting for next week?", "来週ミーティングを設定できますか", "schedule a meeting は会議日程を入れる定番表現です。next week を変えるだけで日時調整に広く使えます。"],
      ["Thank you for your quick response.", "迅速なご返信ありがとうございます", "メールの冒頭で非常によく使うお礼表現です。quick response により返答の速さへの感謝が明確になります。"],
      ["Please find the attached file.", "添付ファイルをご確認ください", "メールで資料を送るときの定番表現です。ややフォーマルで、ビジネス文書にそのまま使えます。"],
      ["Let me share the latest update.", "最新の状況を共有します", "会議やメールで進捗共有を始めるときに使いやすい一文です。update は「更新情報、進捗」の意味で便利です。"],
      ["We are currently reviewing the proposal.", "現在提案内容を確認中です", "reviewing the proposal で「提案を検討している最中」と伝えられます。即答できないときに自然です。"],
      ["Could you confirm your availability?", "ご都合を確認させてください", "availability は空き状況や対応可能時間を指します。会議設定や訪問日調整でよく使います。"],
      ["I'll get back to you by tomorrow.", "明日までにご連絡します", "get back to you は「折り返し連絡する」という定番表現です。回答期限を添えるとより実務的です。"],
      ["Please let me know if you have any questions.", "ご不明点があればお知らせください", "メールの締めとして非常に自然な表現です。相手に質問しやすい空気を作れます。"],
      ["We need to adjust the schedule slightly.", "スケジュールを少し調整する必要があります", "大きな変更ではなく微調整だと伝えたいときに slightly が効きます。相手への負担感を和らげられます。"],
      ["The meeting has been moved to Friday.", "会議は金曜日に変更になりました", "has been moved は日程変更を伝える受け身の定番表現です。会議、納期、予約などにも応用できます。"],
      ["Could you send me the revised version?", "修正版を送っていただけますか", "revised version は修正済みの版を指します。資料や契約書のやり取りでよく出ます。"],
      ["I'd appreciate your feedback.", "ご意見をいただけると助かります", "I'd appreciate ... は丁寧な依頼表現です。feedback のほか input, advice などにも応用できます。"],
      ["We're on track so far.", "今のところ順調です", "on track は「計画どおりに進んでいる」という意味の慣用表現です。進捗報告で使いやすいです。"],
      ["We're slightly behind schedule.", "少し予定より遅れています", "behind schedule で「予定より遅れている」という意味です。slightly を入れると深刻さを調整できます。"],
      ["I'd like to clarify one point.", "一点確認したいことがあります", "clarify は「明確にする」です。細部の認識違いを防ぐための切り出しとして便利です。"],
      ["Let's align on the next steps.", "次の進め方をそろえましょう", "align on ... は「〜について認識を一致させる」というビジネス頻出表現です。"],
      ["I'll take care of the follow-up.", "フォローは私が対応します", "take care of ... で「〜を引き受ける」という意味です。次のアクションを自分が持つときに便利です。"],
      ["We need approval before moving forward.", "先に承認が必要です", "moving forward は「先へ進む」という意味で、承認待ちの状況説明によく使われます。"],
      ["Please keep me posted.", "進捗を共有してください", "短く自然に「最新状況を知らせてほしい」と伝える表現です。メールでも口頭でも使いやすいです。"],
      ["Could you review this by end of day?", "今日中に確認していただけますか", "by end of day は「本日中に」という意味で、レビュー期限をやわらかく示せます。"]
    ])
  },
  travel: {
    label: "旅行",
    description: "道案内、チェックイン、注文、トラブル対応など旅行でそのまま使える表現です。",
    words: buildEntries([
      ["Where can I buy a train ticket?", "電車の切符はどこで買えますか", "buy a train ticket で切符購入をたずねる表現です。駅員や案内所でそのまま使いやすい質問です。"],
      ["Which platform should I go to?", "どのホームに行けばいいですか", "platform は電車のホームを指します。should I go to の形で「行くべき場所」を自然に聞けます。"],
      ["Does this train stop at the airport?", "この電車は空港に止まりますか", "stop at ... で「〜に停車する」という意味です。目的地に行く電車か確認するのに便利です。"],
      ["How often does the bus come?", "バスはどのくらいの間隔で来ますか", "頻度や間隔を知りたいときの表現です。時刻表が読みにくいときにも使えます。"],
      ["Could you tell me when to get off?", "降りるときに教えてもらえますか", "get off は乗り物を降りるという意味です。目的地が不安なときに運転手や近くの人へ頼めます。"],
      ["Is this the right way to the museum?", "博物館へはこの道で合っていますか", "right way to ... は「〜へ行く正しい道」という意味です。地図を見ながら確認するときに便利です。"],
      ["How far is it from here?", "ここからどのくらい遠いですか", "距離感をたずねる基本表現です。徒歩圏かどうかを判断したいときにも使えます。"],
      ["Can I walk there?", "歩いて行けますか", "歩いて向かえる距離か確認したいときの表現です。タクシーやバスが必要かの判断にも役立ちます。"],
      ["Could you point it out on the map?", "地図で指してもらえますか", "point out は「指し示す」という意味です。言葉だけだとわからないときに視覚的な説明をお願いできます。"],
      ["I'm lost.", "道に迷いました", "短くはっきり助けを求められる表現です。困っていることがすぐ伝わるので旅行中に覚えておくと安心です。"],
      ["Can you call a taxi for me?", "タクシーを呼んでもらえますか", "ホテルや店でタクシー手配を頼む定番表現です。for me を付けることで依頼が明確になります。"],
      ["How much is the fare to downtown?", "市内中心部までの料金はいくらですか", "fare は乗り物の運賃を表します。タクシーやシャトルの目安を確認するのに役立ちます。"],
      ["Please take me to this address.", "この住所までお願いします", "タクシー運転手に目的地を見せながら伝える実用表現です。紙やスマホ画面と一緒に使うと確実です。"],
      ["I have a reservation for tonight.", "今夜の予約があります", "ホテルやレストランで予約を伝えるときに使う表現です。for tonight の部分は日付に変えて応用できます。"],
      ["I'd like to check in.", "チェックインしたいです", "ホテル到着時の基本表現です。短くても十分伝わるので覚えておくと便利です。"],
      ["Could I leave my luggage before check-in?", "チェックイン前に荷物を預けられますか", "到着が早いときによく使う表現です。leave my luggage で荷物を預ける意味になります。"],
      ["What time is breakfast served?", "朝食は何時からですか", "ホテルで朝食時間を確認する定番表現です。served を使うと提供時間を自然に聞けます。"],
      ["Could I get a room with a view?", "景色のいい部屋にできますか", "with a view で「眺めのある、景色のよい」という意味です。部屋の希望を丁寧に伝えられます。"],
      ["The air conditioner isn't working.", "エアコンが動いていません", "設備トラブルを伝える実用表現です。working を使うと「正常に機能していない」ことが自然に伝わります。"],
      ["I'd like to check out.", "チェックアウトしたいです", "ホテルを出るときの定番表現です。請求や荷物確認の流れに入るきっかけになります。"],
      ["Do you have a table for two?", "2人用の席はありますか", "レストラン入店時の定番表現です。人数を変えるだけでそのまま応用できます。"],
      ["What do you recommend here?", "このお店のおすすめは何ですか", "店員に人気メニューや看板料理を聞く自然な表現です。注文で迷ったときに非常に便利です。"],
      ["I'd like this without onions.", "これは玉ねぎ抜きでお願いします", "without ... で「〜なしで」という意味です。苦手な食材やアレルギー対応でよく使います。"],
      ["Can you make it less spicy?", "辛さを控えめにできますか", "less spicy で辛さを下げてもらう表現です。味の調整を頼むときにそのまま使えます。"],
      ["Could I get the bill, please?", "お会計をお願いします", "bill はレストランでの会計を指します。食事が終わったあとに店員へ自然に頼めます。"],
      ["Can I pay separately?", "別々に払えますか", "友人や同僚と会計を分けたいときの表現です。旅行中の食事でよく使います。"],
      ["I'm looking for a pharmacy.", "薬局を探しています", "薬局の場所を聞く前置きとして使える表現です。I’m looking for ... は探し物全般に応用できます。"],
      ["Do you sell medicine for a headache?", "頭痛薬はありますか", "症状に合う薬を探すときの表現です。for a headache の部分を stomachache などに替えて使えます。"],
      ["I need a doctor.", "医者が必要です", "体調不良やけがの際に、短く強く必要性を伝える表現です。緊急時に覚えておく価値があります。"],
      ["I've lost my passport.", "パスポートをなくしました", "重要書類の紛失を伝える表現です。警察やホテル、空港でまず状況説明として使えます。"],
      ["My bag has been stolen.", "かばんを盗まれました", "盗難被害を伝えるときの表現です。has been stolen の受け身で「盗まれた状態」をはっきり示せます。"],
      ["Could you call the police?", "警察を呼んでもらえますか", "トラブル時に第三者へ助けを求める非常に実用的な表現です。call the police は緊急性が高い場面で使います。"],
      ["Is there an ATM nearby?", "近くにATMはありますか", "現金が必要なときに場所を聞く基本表現です。nearby を使うと近くで探していることが伝わります。"],
      ["Can I exchange money here?", "ここで両替できますか", "空港やホテルで両替可能か確認する表現です。exchange money で「お金を両替する」を表します。"],
      ["What time does the museum open?", "その博物館は何時に開きますか", "観光施設の営業時間を確認する表現です。museum を station, store, temple などに替えて応用できます。"],
      ["Are there any tickets left for today?", "今日のチケットはまだありますか", "left はここでは「残っている」という意味です。当日券の有無をたずねるのに便利です。"],
      ["Could you take our picture?", "写真を撮ってもらえますか", "観光地で人に撮影をお願いするときの定番表現です。our picture で自分たちの写真という意味になります。"],
      ["Where is the boarding gate?", "搭乗口はどこですか", "空港で最重要レベルに実用的な表現です。gate 番号がわかっていても方向確認に使えます。"],
      ["Be careful of slippery floors.", "床が滑りやすいので気をつけてください", "be careful of ... は「〜に注意する」「〜に気をつける」という意味の熟語で、人、物、場所、状況など具体的な対象に対して注意を促す際に使われます。危険なものや注意すべき対象の前に置いて使います。ここでは slippery floors で「滑りやすい床」に注意を促しています。"]
    ])
  }
};

const basicPhraseWords = dedupeEntries([
  ...legacyPhrases.beginner.words,
  ...buildEntries([
    ["See you tomorrow.", "また明日ね", "別れ際に次の日また会う予定があるときの自然な一言です。See you later よりも日時がはっきりしています。"],
    ["What time is it now?", "今何時ですか", "時刻をたずねる基本表現です。now を入れることで、今の時刻を知りたい意図がより明確になります。"],
    ["I'm hungry.", "お腹が空きました", "体調や状態を短く伝える基本表現です。食事の提案につなげやすい一言でもあります。"],
    ["I'm tired.", "疲れました", "学校や仕事、移動のあとに気分を素直に伝える表現です。I'm a little tired. とすると少しやわらかく聞こえます。"],
    ["Can you show me?", "見せてもらえますか", "やり方や場所、画面などを実際に見たいときに使える便利な表現です。説明だけで足りないときに役立ちます。"],
    ["Please wait a moment.", "少し待ってください", "相手に短く待ってもらいたいときの丁寧な表現です。a moment を入れると、少しの時間だと伝えられます。"],
    ["This is my friend.", "こちらは私の友だちです", "人を紹介するときの基本表現です。This is my brother. や This is my teacher. にもそのまま応用できます。"],
    ["I like this one.", "私はこれが好きです", "いくつかの選択肢の中から好みを伝えるときの言い方です。買い物や注文でも使いやすい表現です。"],
    ["Where are you from?", "どこの出身ですか", "初対面の会話でよく使う質問です。国、地域、町など相手の背景を自然にたずねられます。"],
    ["What do you do after school?", "放課後は何をしますか", "学生同士の会話で使いやすい質問です。after school を work に変えると仕事後の予定にも応用できます。"],
    ["I'm ready.", "準備できました", "出発や開始の前に自分の状態を短く伝える基本表現です。会話でも行動の区切りでも使いやすいです。"],
    ["Please come in.", "どうぞ入ってください", "家や部屋、教室などに人を迎え入れるときの自然な表現です。"],
    ["Can you hear me?", "聞こえますか", "対面でもオンラインでも使える基本表現です。音声が届いているか確認したいときに便利です。"],
    ["I forgot my umbrella.", "傘を忘れました", "忘れ物を伝える短い実用表現です。my umbrella の部分を入れ替えるだけで応用しやすいです。"],
    ["Let's go together.", "一緒に行きましょう", "友だちや家族を誘うときの基本表現です。会話を前向きに進めやすい一言です。"]
  ])
]);

const practicalPhraseWords = dedupeEntries([
  ...legacyPhrases.intermediate.words,
  ...legacyPhrases.advanced.words,
  ...buildEntries([
    ["Could you write it down for me?", "書いてもらえますか", "聞き取りにくい単語や住所、番号などを文字で確認したいときの表現です。口頭だけでは不安な場面で役立ちます。"],
    ["I need a little more time.", "もう少し時間が必要です", "その場ですぐに決められないときや、準備に少し時間が欲しいときに使える表現です。丁寧で使い回しやすい一言です。"],
    ["That depends on the situation.", "それは状況によります", "一つの答えに決めきれないときに使う自然な表現です。depends on ... で「〜次第だ」という意味になります。"],
    ["I'm trying to remember the word.", "その単語を思い出そうとしています", "言いたいことはあるのに単語が出てこないときのつなぎとして便利です。会話を止めずに続けやすくなります。"],
    ["Can you give me an example?", "例を挙げてもらえますか", "説明をもっと具体的に理解したいときの定番表現です。抽象的な話を実例に落としたい場面で使えます。"],
    ["I didn't catch the last part.", "最後の部分を聞き取れませんでした", "全部ではなく一部だけ聞き逃したときに自然な言い方です。say that again よりも具体的に伝えられます。"],
    ["Let's keep it simple.", "簡単にいきましょう", "話を複雑にしすぎず、分かりやすく進めたいときの表現です。説明や相談の場面で使いやすいです。"],
    ["What's the easiest way to get there?", "そこへ行く一番簡単な方法は何ですか", "移動手段や行き方を比較しながら知りたいときに便利です。fastest ではなく easiest を使うので負担の少ない方法をたずねられます。"],
    ["I may need to change the plan.", "予定を変更する必要があるかもしれません", "確定ではないが、予定変更の可能性を先に伝える表現です。相手に心づもりをしてもらえます。"],
    ["Could you check if it's available?", "利用できるか確認してもらえますか", "空き状況や在庫、対応可否を確認してほしいときの定番表現です。available がとても実用的です。"],
    ["I'm still thinking about it.", "まだ考えています", "即答を避けたいときのやわらかい返しです。断定せずに保留の姿勢を自然に伝えられます。"],
    ["That would make things easier.", "そうすると楽になります", "提案や選択肢について、よりやりやすくなると伝える表現です。things を使って状況全体をまとめて表せます。"],
    ["Could you send me the details later?", "詳細をあとで送ってもらえますか", "その場で全部覚えられないときや、文章で確認したいときに便利な表現です。later によって急ぎではないことも伝わります。"],
    ["Let's focus on the main point first.", "まず要点から見ましょう", "話が広がりすぎたときに、中心となる論点へ戻すための表現です。"]
  ])
]);

const businessPhraseWords = dedupeEntries([
  ...legacyPhrases.business.words,
  ...buildEntries([
    ["Could you share the file with the team?", "そのファイルをチームに共有してもらえますか", "社内の共有作業でよく使う表現です。share A with B で「AをBに共有する」という形になります。"],
    ["Let's confirm the deadline once again.", "締切をもう一度確認しましょう", "日程トラブルを防ぐために、あらためて確認するときの言い方です。once again を入れると再確認の意図が明確です。"],
    ["We need to prioritize the urgent tasks.", "急ぎの作業を優先する必要があります", "タスクが多いときに優先順位をはっきりさせる表現です。prioritize はビジネスで非常によく使います。"],
    ["I'll prepare a short summary.", "短い要約を用意します", "会議後ややり取りのあとで要点を整理して共有するときに自然な一言です。short summary で簡潔さも伝えられます。"],
    ["Could you update the spreadsheet?", "表を更新していただけますか", "数値管理や進捗表の更新を頼む場面で使いやすい表現です。spreadsheet は実務で頻出です。"],
    ["Let's move this discussion offline.", "この件は別で話しましょう", "全体会議の場ではなく、後で個別に詳しく話したいときの表現です。offline は「オフラインで」というより「この場の外で」の意味で使われます。"],
    ["We should clarify the requirements.", "要件を明確にしたほうがよいです", "作業の前提や条件があいまいなときに使う実務表現です。requirements は開発でも事務でも頻出です。"],
    ["I'll send the revised draft this afternoon.", "修正版の下書きを今日の午後に送ります", "修正後の資料送付予定を伝える自然な文です。revised draft はそのまま実務で使えます。"],
    ["Please keep the client informed.", "顧客に状況共有をお願いします", "担当者へ継続的な報告を依頼するときの表現です。keep A informed で「Aに状況を知らせ続ける」となります。"],
    ["Let's review the risks before launch.", "公開前にリスクを確認しましょう", "リリース前の確認で使いやすい表現です。before launch によってタイミングが明確になります。"],
    ["Could you add this to the agenda?", "これを議題に追加してもらえますか", "会議前に話したい項目を入れてほしいときの表現です。agenda は会議運営で頻出です。"],
    ["I'll follow up with the vendor.", "取引先に確認を取ります", "外部先とのやり取りを自分が担当すると伝える表現です。follow up with ... が実務で使いやすい形です。"],
    ["We need a quick status update.", "短い進捗共有が必要です", "長い説明ではなく、要点だけの進捗確認を求める表現です。status update は会議やチャットで非常によく使われます。"],
    ["Could you confirm the final version?", "最終版を確認してもらえますか", "修正版が複数あるときに、最終版で問題ないか見てもらう定番表現です。"],
    ["Let's set a realistic timeline.", "現実的なスケジュールを立てましょう", "無理のない進行計画を作りたいときの表現です。realistic が実務の温度感によく合います。"]
  ])
]);

const travelPhraseWords = dedupeEntries([
  ...legacyPhrases.travel.words,
  ...buildEntries([
    ["Is this seat taken?", "この席は空いていますか", "電車、バス、待合室などで座ってよいか確認する基本表現です。taken は「使われている、埋まっている」という意味です。"],
    ["Could I have a non-smoking room?", "禁煙の部屋をお願いできますか", "ホテルで部屋の希望を伝える定番表現です。smoking room と対で覚えると便利です。"],
    ["Can I leave my bag after check-out?", "チェックアウト後も荷物を預けられますか", "ホテルを出たあとに身軽に行動したいときによく使う表現です。after check-out が実用的です。"],
    ["How long is the wait?", "どのくらい待ちますか", "列、レストラン、窓口などで待ち時間をたずねる短く便利な表現です。"],
    ["Which bus goes to the city center?", "どのバスが市内中心部へ行きますか", "バス移動で路線を確認したいときに使う表現です。goes to ... で目的地へ向かう交通手段を聞けます。"],
    ["Could you tell me the Wi-Fi password?", "Wi-Fiのパスワードを教えてもらえますか", "ホテルやカフェで非常によく使う表現です。password をはっきり入れると伝わりやすいです。"],
    ["I'd like a table near the window.", "窓際の席をお願いします", "レストランで席の希望を丁寧に伝える言い方です。near the window は景色が見たいときに便利です。"],
    ["Can I have this to go?", "これを持ち帰りにできますか", "食べ物や飲み物を持ち帰りたいときの定番表現です。アメリカ英語圏で特によく使われます。"],
    ["Do you have anything without dairy?", "乳製品を使っていないものはありますか", "食事制限やアレルギー対応で便利な表現です。without dairy で乳製品なしを自然に伝えられます。"],
    ["Where can I buy a SIM card?", "SIMカードはどこで買えますか", "海外到着後に通信手段を確保したいときの実用表現です。空港や街中でそのまま使えます。"],
    ["Is it safe to walk here at night?", "このあたりは夜に歩いても安全ですか", "治安を確認したいときの丁寧で実用的な質問です。at night を入れると夜間の安全性に限定できます。"],
    ["Could you help me find my hotel?", "ホテルを探すのを手伝ってもらえますか", "道に迷ったときや現在地が分からないときに使える表現です。find my hotel で目的が明確に伝わります。"],
    ["How much is the entrance fee?", "入場料はいくらですか", "観光施設や展示会で料金を確認する基本表現です。admission fee と言い換えられる場面もあります。"],
    ["Can I take pictures here?", "ここで写真を撮ってもいいですか", "撮影可否を確認したいときの定番表現です。寺社や美術館では特に役立ちます。"],
    ["Where is the nearest convenience store?", "一番近いコンビニはどこですか", "旅行中によく必要になる店を探す実用表現です。nearest によって近場を探していることが明確になります。"],
    ["Could I have another towel?", "タオルをもう一枚もらえますか", "ホテルで追加備品をお願いするときに自然な表現です。another を使うと追加依頼だと伝わります。"],
    ["What time should I check out?", "チェックアウトは何時までですか", "ホテルの退出時刻を確認したいときの表現です。ルールをはっきり確認できて便利です。"],
    ["Can you recommend a local dish?", "地元のおすすめ料理はありますか", "観光先で名物料理を知りたいときの自然な質問です。local dish がその土地らしさを表します。"],
    ["Is breakfast included?", "朝食は含まれていますか", "宿泊予約の内容を確認するときに非常によく使う表現です。included によって料金に入っているかをたずねられます。"],
    ["Which line should I take?", "どの路線に乗ればいいですか", "電車や地下鉄で路線選びに迷ったときの基本表現です。travel でかなり実用的です。"]
  ])
]);

export const phrases = {
  basic: {
    label: "初級",
    description: "中学生レベルの一般会話でまず使いたい短くて基本的なフレーズです。",
    words: basicPhraseWords
  },
  practical: {
    label: "実用単語",
    description: "予定調整、説明、聞き返し、相談など日常を広げる実用フレーズです。",
    words: practicalPhraseWords
  },
  business: {
    label: "ビジネス",
    description: "会議、共有、確認、依頼、進行管理で使いやすい仕事向けのフレーズです。",
    words: businessPhraseWords
  },
  travel: {
    label: "旅行",
    description: "移動、宿泊、注文、買い物、トラブル対応でそのまま使える旅行フレーズです。",
    words: travelPhraseWords
  }
};
