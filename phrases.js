function parsePhrases(block) {
  return block
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"))
    .map((line) => {
      const [english, japanese] = line.split("|").map((item) => item.trim());
      return { english, japanese };
    });
}

export const phrases = {
  beginner: {
    label: "初級",
    description: "まずはそのまま口に出しやすい基本フレーズから練習",
    words: parsePhrases(`
How are you?|元気ですか
I am fine.|元気です
Nice to meet you.|はじめまして
Thank you very much.|どうもありがとうございます
You're welcome.|どういたしまして
Excuse me.|すみません
I'm sorry.|ごめんなさい
No problem.|大丈夫です
Please help me.|手伝ってください
I don't know.|わかりません
I understand.|わかりました
Could you say that again?|もう一度言ってもらえますか
Please speak slowly.|ゆっくり話してください
What does this mean?|これはどういう意味ですか
How much is this?|これはいくらですか
I would like this.|これをください
Can I try it on?|試着してもいいですか
Where is the station?|駅はどこですか
Where is the restroom?|トイレはどこですか
I am looking for this place.|この場所を探しています
Can you take a picture?|写真を撮ってもらえますか
I need some water.|水が必要です
I'm hungry.|お腹がすきました
I'm tired.|疲れました
Let's go.|行きましょう
Please wait a moment.|少し待ってください
See you later.|またあとで
Have a nice day.|よい一日を
What time is it?|何時ですか
I live in Japan.|私は日本に住んでいます
Do you speak Japanese?|日本語を話せますか
I am studying English.|英語を勉強しています
This is delicious.|これはおいしいです
I like this song.|この歌が好きです
Can I sit here?|ここに座ってもいいですか
Is this seat taken?|この席は空いていますか
Please call me later.|あとで電話してください
I will be right back.|すぐ戻ります
Take care.|気をつけて
Could you write it down?|書いてもらえますか
Please show me on the map.|地図で見せてください
Which one do you recommend?|どれがおすすめですか
Can I use Wi-Fi here?|ここで Wi-Fi は使えますか
I need to go now.|もう行かないといけません
I'll be back soon.|すぐ戻ります
May I ask your name?|お名前を伺ってもいいですか
I'm not sure.|よくわかりません
That sounds good.|よさそうですね
One more, please.|もう一つお願いします
Could I have the menu?|メニューをいただけますか
I don't eat meat.|肉は食べません
Can I get this to go?|これを持ち帰りにできますか
It's too expensive for me.|私には少し高すぎます
Can you help me find this?|これを探すのを手伝ってもらえますか
I left my bag on the train.|電車にかばんを置き忘れました
Please tell me the way.|道を教えてください
How do I get there?|そこへはどう行けばいいですか
I'm here for sightseeing.|観光で来ています
What do you do?|お仕事は何ですか
I'm just practicing English.|英語を練習しているだけです
Could you wait here?|ここで待っていてもらえますか
I'm a little nervous.|少し緊張しています
That was fun.|楽しかったです
`)
  },
  intermediate: {
    label: "中級",
    description: "旅行・日常生活・雑談でそのまま使いやすい会話表現",
    words: parsePhrases(`
Could you recommend something popular?|人気のものをおすすめしてもらえますか
I have a reservation under this name.|この名前で予約しています
Can I change my order?|注文を変更できますか
I'd like to pay by card.|カードで支払いたいです
Could you make it a little less spicy?|少し辛さを控えてもらえますか
What do you usually do on weekends?|週末はたいてい何をしますか
I'm on my way now.|今向かっています
I might be a little late.|少し遅れるかもしれません
Can we meet somewhere else?|別の場所で会えますか
Please let me know when you arrive.|着いたら知らせてください
I haven't decided yet.|まだ決めていません
That sounds like a good idea.|それはよさそうですね
I'll think about it.|考えてみます
Could you give me a hand?|ちょっと手を貸してもらえますか
I'm not used to this yet.|まだこれに慣れていません
How long does it take from here?|ここからどれくらいかかりますか
Do I need to transfer?|乗り換えは必要ですか
Can I leave my luggage here?|荷物をここに置いてもいいですか
I'm just looking around.|見ているだけです
Could I get a receipt, please?|レシートをもらえますか
I'd like to return this item.|この商品を返品したいです
My phone battery is almost dead.|スマホの電池がもうすぐ切れます
Can I charge my phone here?|ここでスマホを充電できますか
I think I left my wallet somewhere.|どこかに財布を置き忘れたと思います
I'll call you back later.|あとでかけ直します
Thanks for checking.|確認してくれてありがとう
Could you explain it in simple words?|簡単な言葉で説明してもらえますか
I totally forgot about that.|それをすっかり忘れていました
That happens all the time.|それはよくあります
I'm feeling much better now.|今はだいぶよくなりました
Can we move to another seat?|別の席に移れますか
I'm looking forward to it.|楽しみにしています
Let's keep in touch.|また連絡を取り合いましょう
Could you show me how to use this?|これの使い方を見せてもらえますか
I need to cancel my appointment.|予約をキャンセルする必要があります
Would tomorrow work for you?|明日は都合がいいですか
It depends on the weather.|天気次第です
I didn't expect it to be so crowded.|こんなに混んでいるとは思いませんでした
Can you drop me off here?|ここで降ろしてもらえますか
Sorry for the late reply.|返信が遅くなってすみません
I just got home.|今ちょうど帰宅しました
Can we talk for a minute?|少し話せますか
What do you mean by that?|それはどういう意味ですか
I didn't catch the last part.|最後のところが聞き取れませんでした
Could you tell me what happened?|何があったのか教えてもらえますか
I'm trying to figure it out.|今理解しようとしているところです
Let me check my schedule.|予定を確認させてください
I may need a little more time.|もう少し時間が必要かもしれません
Would you mind waiting a bit?|少し待ってもらえますか
Can we split the bill?|割り勘にできますか
I'll send you the details later.|詳細は後で送ります
Could you keep this for me?|これを預かってもらえますか
I'm still on the train.|まだ電車の中です
The line is really long.|列がかなり長いです
I have a few questions.|いくつか質問があります
That reminds me.|それで思い出しました
I'm glad to hear that.|それを聞けてうれしいです
I'm sorry to bother you.|お手数をおかけしてすみません
It'll be ready in about ten minutes.|あと10分ほどでできます
Can you save me a seat?|席を取っておいてもらえますか
Let's grab a coffee sometime.|今度コーヒーでも行きましょう
I'll text you when I arrive.|着いたらメッセージします
Can we make it a bit earlier?|少し早められますか
`)
  },
  advanced: {
    label: "上級",
    description: "理由説明や調整、自然な返答で使いやすい実用フレーズ",
    words: parsePhrases(`
From my point of view, this is the best option.|私の見方では、これが最善の選択です
I'm not completely convinced yet.|まだ完全には納得していません
That makes sense to me.|それは筋が通っていると思います
I see where you're coming from.|言いたいことはわかります
Let me think it through for a moment.|少し整理して考えさせてください
Could we go over the details once more?|詳細をもう一度確認できますか
I may have misunderstood the situation.|状況を誤解していたかもしれません
We should take that possibility into account.|その可能性も考慮すべきです
I'd rather not make a quick decision.|急いで決めたくはありません
Could you be a bit more specific?|もう少し具体的に言ってもらえますか
That's not exactly what I meant.|それは私の意図とは少し違います
I don't want to jump to conclusions.|早合点したくありません
Let's take a step back for a second.|少し引いて考えてみましょう
There seems to be a misunderstanding.|何か誤解があるようです
I appreciate your honesty.|率直に話してくれて感謝します
I can handle it on my own.|自分で対処できます
I should have mentioned that earlier.|それは先に言うべきでした
This could cause problems later on.|これは後で問題になるかもしれません
We're getting closer to a solution.|解決に近づいています
I want to make sure we're on the same page.|認識をそろえておきたいです
That approach sounds more realistic.|そのやり方の方が現実的に聞こえます
We need to strike a balance.|バランスを取る必要があります
I'd like to avoid unnecessary confusion.|余計な混乱は避けたいです
Can you walk me through your thinking?|考え方を順に説明してもらえますか
I don't have enough information yet.|まだ十分な情報がありません
That doesn't necessarily mean it's wrong.|だからといって間違いとは限りません
Let's focus on what matters most.|いちばん大事な点に集中しましょう
I'm still getting used to this process.|まだこの流れに慣れている途中です
It turned out better than I expected.|思ったよりうまくいきました
I'd like a little more time to decide.|決めるまでにもう少し時間が欲しいです
I don't think that's the main issue here.|それが主な問題ではないと思います
We're probably looking at this differently.|私たちはたぶん違う見方をしています
I'd like to hear your side of the story.|あなたの側の話も聞きたいです
That might work in theory, but not in practice.|理屈ではそうでも実際には難しいかもしれません
I get the idea, but I'm not fully convinced.|言いたいことはわかりますが、完全には納得していません
Let's not overcomplicate things.|必要以上に複雑にしないようにしましょう
We should deal with the urgent part first.|まず緊急の部分から対応すべきです
I'm trying to be realistic about this.|これについて現実的に考えようとしています
That explanation doesn't quite add up.|その説明は少しつじつまが合いません
It depends on how we define success.|成功をどう定義するかによります
I'd rather be clear than polite here.|ここでは遠回しより明確さを優先したいです
We may need to revisit that later.|その点は後で見直す必要があるかもしれません
I'm open to other suggestions.|ほかの提案にも前向きです
That could easily lead to confusion.|それは簡単に混乱につながり得ます
Let's keep the long-term impact in mind.|長期的な影響も意識しておきましょう
I don't want this to become a bigger problem.|これがもっと大きな問題になるのは避けたいです
We're not quite there yet.|まだそこまでは到達していません
I think we're making steady progress.|着実に進んでいると思います
That's a fair point.|もっともな指摘です
`)
  },
  business: {
    label: "ビジネス",
    description: "会議・メール・調整でそのまま使いやすい実務フレーズ",
    words: parsePhrases(`
Could we schedule a meeting for next week?|来週会議を設定できますか
Thank you for your quick response.|迅速なご返信ありがとうございます
Please find the attached file.|添付ファイルをご確認ください
Let me share the latest update.|最新状況を共有します
We are currently reviewing the proposal.|現在提案書を確認中です
Could you confirm your availability?|ご都合を確認いただけますか
I'll get back to you by tomorrow.|明日までに折り返します
Please let me know if you have any questions.|ご質問があればお知らせください
We need to adjust the schedule slightly.|日程を少し調整する必要があります
The meeting has been moved to Friday.|会議は金曜日に変更になりました
Could you send me the revised version?|修正版を送ってもらえますか
We're working on it internally.|社内で対応中です
I'd appreciate your feedback.|ご意見をいただけると助かります
Let's keep this simple and practical.|シンプルで実務的に進めましょう
Could you walk us through the numbers?|数字を順に説明してもらえますか
We're on track so far.|今のところ予定通りです
We're slightly behind schedule.|少し予定より遅れています
I'd like to clarify one point.|一点確認したいです
Let's align on the next steps.|次のステップをそろえましょう
Could you handle this part?|この部分を対応してもらえますか
I'll take care of the follow-up.|フォロー対応は私が行います
We need approval before moving forward.|進める前に承認が必要です
Please review the contract once again.|契約書をもう一度ご確認ください
The client is waiting for our response.|顧客がこちらの返答を待っています
Let's prioritize the urgent items first.|まず緊急項目を優先しましょう
Could we reduce the cost on this part?|この部分のコストを下げられますか
The figures look reasonable.|数字は妥当に見えます
I'll share the meeting minutes later.|後ほど議事録を共有します
Thank you for your continued support.|引き続きよろしくお願いいたします
Please keep me posted.|進捗を共有してください
Could you review this by end of day?|本日中に確認いただけますか
We need to finalize the scope today.|今日中に範囲を確定する必要があります
I'll prepare a draft and share it shortly.|草案を作ってすぐ共有します
Could you join the call for ten minutes?|10分だけ通話に参加できますか
Let's move this discussion offline.|この話は別で続けましょう
We need to get everyone aligned.|全員の認識をそろえる必要があります
I'll follow up after the meeting.|会議後にフォローします
Can you send over the latest figures?|最新の数字を送ってもらえますか
The client would like a quick update.|顧客が簡単な進捗共有を求めています
Let's keep the client in the loop.|顧客にも状況を共有し続けましょう
We'll need a clear timeline.|明確なスケジュールが必要です
Could you take ownership of this task?|このタスクの担当をお願いできますか
This needs to be escalated.|これは上位対応が必要です
Let's circle back on this tomorrow.|この件は明日また確認しましょう
We're waiting on approval from finance.|経理の承認待ちです
Please prioritize this request.|この依頼を優先してください
I'll coordinate with the rest of the team.|残りのチームと調整します
We may have to revise the estimate.|見積もりを修正する必要があるかもしれません
Let's keep the solution as simple as possible.|解決策はできるだけシンプルにしましょう
Can you confirm the delivery date?|納期を確認いただけますか
We should avoid any further delay.|これ以上の遅延は避けるべきです
I'd like to propose an alternative plan.|別案を提案したいです
Please share your feedback by Friday.|金曜日までにご意見を共有してください
Thank you for your flexibility.|柔軟にご対応いただきありがとうございます
`)
  }
};
