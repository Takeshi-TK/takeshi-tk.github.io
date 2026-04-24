import csv
from pathlib import Path


CSV_PATH = Path("data/learning-items.csv")

FUNCTION_WORDS = {
    "i", "you", "he", "she", "it", "we", "they", "this", "that", "these", "those",
    "here", "there", "who", "what", "when", "where", "why", "how", "yes", "no", "not",
    "all", "some", "any", "many", "much", "few", "more", "most", "other", "another",
    "same", "different", "one", "two", "three", "four", "five", "six", "seven",
    "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen",
    "sixteen", "seventeen", "eighteen", "nineteen", "twenty", "first", "second",
    "third", "and", "but", "or", "because", "if", "then", "so", "with", "without",
    "for", "from", "to", "at", "in", "on", "under", "near", "between", "about",
    "before", "after", "a", "an", "the",
}

ADJECTIVE_WORDS = {
    "good", "bad", "new", "old", "big", "small", "large", "little", "long", "short",
    "high", "low", "early", "late", "easy", "difficult", "hard", "important",
    "necessary", "possible", "impossible", "safe", "dangerous", "free", "busy",
    "ready", "empty", "full", "open", "closed", "sure", "sorry", "happy", "sad",
    "tired", "hungry", "thirsty", "hot", "cold", "warm", "cool", "clean", "dirty",
    "quiet", "loud", "bright", "dark", "expensive", "cheap", "useful", "popular",
    "available", "careful", "healthy", "sick", "sleepy", "scared", "strong", "weak",
    "better", "pretty", "simple", "rainy", "windy", "kind", "nice", "friendly",
    "comfortable", "honest", "polite", "serious", "exact", "common", "local",
    "public", "private", "traditional", "modern", "famous", "convenient", "specific",
    "abstract", "logical", "practical", "realistic", "comprehensive", "subtle",
}

VERB_WORDS = {
    "watch", "look", "listen", "talk", "call", "help", "ride", "drive", "travel", "visit",
    "stay", "return", "sell", "cook", "clean", "carry", "study", "learn", "teach",
    "meet", "check", "reserve", "book", "arrive", "leave", "sleep", "wake", "hope",
    "plan", "prepare", "try on", "exchange", "download", "upload", "click", "tap",
    "scan", "confirm", "recycle", "repair", "replace", "organize", "host", "exercise",
    "reply", "respond", "describe", "mention", "pronounce", "translate", "introduce",
    "greet", "promise", "suggest", "recommend", "agree", "disagree", "argue",
    "complain", "warn", "advise", "save", "delete", "compare", "persuade", "justify",
    "evaluate", "interpret",
}

VERB_SUFFIXES = (
    "する", "行く", "来る", "見る", "聞く", "言う", "話す", "使う", "買う", "売る", "払う",
    "待つ", "働く", "学ぶ", "教える", "読む", "書く", "始める", "終える", "忘れる", "覚える",
    "選ぶ", "決める", "調べる", "説明する", "検索する", "確認する", "紹介する", "運転する",
    "注文する", "予約する", "招待する", "謝る", "戻る", "出発する", "到着する", "滞在する",
    "掃除する", "勉強する", "返信する", "応答する", "発音する", "翻訳する", "提案する",
    "同意する", "反対する", "警告する", "助言する", "保存する", "削除する", "比較する",
)

ADJECTIVE_SUFFIXES = ("な", "い", "の", "た")

CUSTOM_EXAMPLES = {
    "help": [
        ("Can you help me with this?", "これをちょっと手伝ってもらえますか。"),
        ("I need some help.", "ちょっと手伝ってほしいです。"),
    ],
    "minute": [
        ("Do you have a minute?", "少し時間ありますか。"),
        ("I'll be back in a minute.", "すぐ戻ります。"),
    ],
    "free": [
        ("Are you free this afternoon?", "今日の午後は空いていますか。"),
        ("I'm free after three.", "3時以降は暇です。"),
    ],
    "safe": [
        ("Please choose a safe password.", "安全なパスワードを選んでください。"),
        ("This road is safe at night.", "この道は夜でも安全です。"),
    ],
    "empty": [
        ("The room is empty now.", "その部屋は今、空です。"),
        ("Please bring an empty bottle.", "空のボトルを持ってきてください。"),
    ],
    "download": [
        ("Please download the file before the meeting.", "会議の前にファイルをダウンロードしてください。"),
        ("I downloaded the app yesterday.", "昨日そのアプリをダウンロードしました。"),
    ],
    "upload": [
        ("Please upload the photo here.", "ここに写真をアップロードしてください。"),
        ("I uploaded the document this morning.", "今朝その書類をアップロードしました。"),
    ],
    "search": [
        ("Search for the address on your phone.", "スマホでその住所を検索してください。"),
        ("I searched for a nearby cafe.", "近くのカフェを検索しました。"),
    ],
    "click": [
        ("Click the blue button to continue.", "続けるには青いボタンをクリックしてください。"),
        ("I clicked the wrong link by mistake.", "間違えて別のリンクをクリックしました。"),
    ],
    "tap": [
        ("Tap the screen twice.", "画面を2回タップしてください。"),
        ("I tapped the wrong icon.", "間違ったアイコンをタップしました。"),
    ],
    "confirm": [
        ("Please confirm the meeting time.", "会議の時間を確認してください。"),
        ("I confirmed the reservation by email.", "メールで予約を確認しました。"),
    ],
    "reply": [
        ("Please reply by tomorrow.", "明日までに返信してください。"),
        ("I replied to her message.", "彼女のメッセージに返信しました。"),
    ],
    "respond": [
        ("He responded quickly.", "彼はすぐに応答しました。"),
        ("Please respond to this email.", "このメールに返信してください。"),
    ],
    "describe": [
        ("Can you describe the problem?", "問題の内容を説明できますか。"),
        ("She described the room in detail.", "彼女はその部屋を詳しく説明しました。"),
    ],
    "pronounce": [
        ("How do you pronounce this word?", "この単語はどう発音しますか。"),
        ("Please pronounce it slowly.", "それをゆっくり発音してください。"),
    ],
    "translate": [
        ("Can you translate this sentence?", "この文を翻訳できますか。"),
        ("I translated the menu into Japanese.", "メニューを日本語に翻訳しました。"),
    ],
    "introduce": [
        ("Let me introduce my friend.", "友だちを紹介させてください。"),
        ("She introduced me to her team.", "彼女は私をチームに紹介しました。"),
    ],
    "suggest": [
        ("Can you suggest a good restaurant?", "よいレストランを提案してくれますか。"),
        ("He suggested a different plan.", "彼は別の計画を提案しました。"),
    ],
    "recommend": [
        ("What do you recommend here?", "ここでは何がおすすめですか。"),
        ("I recommend this book.", "この本をおすすめします。"),
    ],
    "agree": [
        ("I agree with your idea.", "あなたの考えに賛成です。"),
        ("We agreed on the next step.", "次の進め方について合意しました。"),
    ],
    "disagree": [
        ("I disagree with that point.", "その点には反対です。"),
        ("They disagreed about the schedule.", "彼らは予定について意見が合いませんでした。"),
    ],
    "warn": [
        ("The sign warns drivers about the curve.", "その標識は運転者にカーブを警告しています。"),
        ("I warned him about the risk.", "そのリスクについて彼に警告しました。"),
    ],
    "advise": [
        ("The doctor advised me to rest.", "医者は私に休むよう助言しました。"),
        ("Can you advise me on this issue?", "この件について助言してもらえますか。"),
    ],
    "save": [
        ("Save the file before you close it.", "閉じる前にファイルを保存してください。"),
        ("This coupon can save you money.", "このクーポンでお金を節約できます。"),
    ],
    "delete": [
        ("Please delete the old file.", "古いファイルを削除してください。"),
        ("I deleted the message by mistake.", "間違えてメッセージを削除しました。"),
    ],
    "compare": [
        ("Let's compare the two prices.", "2つの価格を比較しましょう。"),
        ("I compared several hotels online.", "オンラインでいくつかのホテルを比較しました。"),
    ],
    "available": [
        ("Is this seat available?", "この席は空いていますか。"),
        ("The room is available after three.", "その部屋は3時以降に利用できます。"),
    ],
    "ready": [
        ("Are you ready to leave?", "出発する準備はできていますか。"),
        ("Dinner is ready.", "夕食の準備ができました。"),
    ],
    "busy": [
        ("I'm busy this morning.", "今朝は忙しいです。"),
        ("The station is busy on Mondays.", "月曜日は駅が混んでいます。"),
    ],
    "early": [
        ("I arrived early today.", "今日は早く到着しました。"),
        ("Let's leave early tomorrow.", "明日は早めに出発しましょう。"),
    ],
    "late": [
        ("I'm sorry I'm late.", "遅れてすみません。"),
        ("The train was late this morning.", "今朝は電車が遅れました。"),
    ],
    "tired": [
        ("I'm tired after work.", "仕事の後で疲れています。"),
        ("She looked tired yesterday.", "昨日、彼女は疲れているように見えました。"),
    ],
    "hungry": [
        ("I'm hungry now.", "今、お腹がすいています。"),
        ("The children were hungry after the trip.", "旅行の後、子どもたちはお腹をすかせていました。"),
    ],
    "thirsty": [
        ("I'm thirsty. Can I have some water?", "喉が渇きました。水をもらえますか。"),
        ("He was thirsty after running.", "走った後で彼は喉が渇いていました。"),
    ],
    "happy": [
        ("I'm happy to hear that.", "それを聞いてうれしいです。"),
        ("She looked happy at the party.", "彼女はパーティーでうれしそうでした。"),
    ],
    "sad": [
        ("I felt sad after the movie.", "その映画の後で悲しくなりました。"),
        ("He sounded sad on the phone.", "電話で彼は悲しそうでした。"),
    ],
    "dangerous": [
        ("This road is dangerous at night.", "この道は夜は危険です。"),
        ("It's dangerous to text while driving.", "運転中にメッセージを打つのは危険です。"),
    ],
    "careful": [
        ("Please be careful on the stairs.", "階段では注意してください。"),
        ("She is careful with money.", "彼女はお金の扱いに慎重です。"),
    ],
    "important": [
        ("This document is important.", "この書類は重要です。"),
        ("It's important to arrive on time.", "時間通りに到着することは重要です。"),
    ],
    "necessary": [
        ("A passport is necessary for this trip.", "この旅行にはパスポートが必要です。"),
        ("Is it necessary to print the ticket?", "チケットを印刷する必要がありますか。"),
    ],
    "convenient": [
        ("This app is convenient for travel.", "このアプリは旅行に便利です。"),
        ("The hotel is in a convenient location.", "そのホテルは便利な場所にあります。"),
    ],
    "useful": [
        ("This phrase is useful at the airport.", "このフレーズは空港で役に立ちます。"),
        ("The map was useful during the trip.", "旅行中、その地図は役に立ちました。"),
    ],
    "quiet": [
        ("This cafe is quiet in the morning.", "このカフェは朝は静かです。"),
        ("Please keep your phone quiet.", "携帯電話を静かにしてください。"),
    ],
    "specific": [
        ("Can you give me a specific example?", "具体的な例を出してもらえますか。"),
        ("Please be more specific.", "もう少し具体的に言ってください。"),
    ],
    "practical": [
        ("This is practical advice.", "これは実用的な助言です。"),
        ("I want to learn practical English.", "実用的な英語を学びたいです。"),
    ],
}


def infer_pos(row):
    if row["type"] == "phrase":
        return "phrase"

    english = row["english"].strip().lower()
    japanese = row["japanese"].strip()

    if english in FUNCTION_WORDS:
        return "function"

    if japanese.endswith(VERB_SUFFIXES) or english in VERB_WORDS and japanese.endswith(("する", "る", "う", "く", "す", "つ", "ぶ", "む")):
        return "verb"

    if english in ADJECTIVE_WORDS or japanese.endswith(ADJECTIVE_SUFFIXES):
        return "adjective"

    return "noun"


def main():
    with CSV_PATH.open("r", encoding="utf-8-sig", newline="") as file:
        rows = list(csv.DictReader(file))

    fieldnames = [
        "type",
        "part_of_speech",
        "source_section",
        "line",
        "english",
        "japanese",
        "explanation",
        "example_1_en",
        "example_1_ja",
        "example_2_en",
        "example_2_ja",
        "review_status",
    ]

    for row in rows:
        pos = infer_pos(row)
        row["part_of_speech"] = pos
        key = row["english"].strip().lower()

        if row["type"] == "word" and key in CUSTOM_EXAMPLES:
            (example_1_en, example_1_ja), (example_2_en, example_2_ja) = CUSTOM_EXAMPLES[key]
            row["example_1_en"] = example_1_en
            row["example_1_ja"] = example_1_ja
            row["example_2_en"] = example_2_en
            row["example_2_ja"] = example_2_ja
            row["review_status"] = "reviewed"
            continue

        if row["type"] == "word" and pos == "noun":
            row["example_1_en"] = ""
            row["example_1_ja"] = ""
            row["example_2_en"] = ""
            row["example_2_ja"] = ""
            row["review_status"] = "noun_no_example"
            continue

        if row["type"] == "word" and row.get("review_status") != "reviewed":
            row["example_1_en"] = ""
            row["example_1_ja"] = ""
            row["example_2_en"] = ""
            row["example_2_ja"] = ""
            row["review_status"] = "needs_example_review"
            continue

        if row["type"] == "phrase":
            row["review_status"] = "phrase"

    with CSV_PATH.open("w", encoding="utf-8-sig", newline="") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    reviewed = sum(1 for row in rows if row["review_status"] == "reviewed")
    nouns = sum(1 for row in rows if row["review_status"] == "noun_no_example")
    print(f"updated rows={len(rows)} reviewed_examples={reviewed} noun_no_example={nouns}")


if __name__ == "__main__":
    main()
