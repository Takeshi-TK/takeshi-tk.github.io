function parseWords(block) {
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

export const vocabulary = {
  beginner: {
    label: "初級",
    description: "日常会話の土台になる基本語彙を広くカバー",
    words: parseWords(`
# people and daily life
I|私
you|あなた
he|彼
she|彼女
we|私たち
they|彼ら
this|これ
that|それ
these|これら
those|それら
someone|だれか
everyone|みんな
friend|友達
family|家族
mother|母
father|父
sister|姉妹
brother|兄弟
child|子ども
parent|親
baby|赤ちゃん
teacher|先生
student|生徒
doctor|医者
nurse|看護師
driver|運転手
worker|働く人
neighbor|近所の人
guest|お客さん
team|チーム
group|グループ
name|名前
age|年齢
job|仕事
home|家
room|部屋
door|ドア
window|窓
table|テーブル
chair|いす
bed|ベッド
sofa|ソファ
kitchen|台所
bathroom|浴室
floor|床
wall|壁
key|鍵
bag|かばん
phone|電話
computer|コンピューター
screen|画面
book|本
notebook|ノート
pen|ペン
paper|紙
money|お金
card|カード
ticket|切符
map|地図
picture|写真
photo|写真
music|音楽
movie|映画
game|ゲーム
song|歌
story|物語

# time and schedule
time|時間
day|日
week|週
month|月
year|年
today|今日
tomorrow|明日
yesterday|昨日
morning|朝
afternoon|午後
evening|夕方
night|夜
weekend|週末
Monday|月曜日
Tuesday|火曜日
Wednesday|水曜日
Thursday|木曜日
Friday|金曜日
Saturday|土曜日
Sunday|日曜日
early|早く
late|遅く
now|今
soon|すぐに
again|もう一度
always|いつも
usually|たいてい
sometimes|ときどき
often|よく
never|決して
first|最初の
last|最後の
next|次の
before|前に
after|後で
hour|時間
minute|分
second|秒
break|休憩
holiday|休日

# places and movement
school|学校
office|会社
store|店
shop|お店
station|駅
airport|空港
hotel|ホテル
restaurant|レストラン
cafe|カフェ
park|公園
street|通り
road|道
city|都市
town|町
country|国
beach|海辺
river|川
mountain|山
sea|海
bus|バス
train|電車
car|車
taxi|タクシー
bike|自転車
plane|飛行機
walk|歩く
run|走る
go|行く
come|来る
leave|出発する
arrive|着く
stop|止まる
turn|曲がる
cross|渡る
ride|乗る
drive|運転する
travel|旅行する
visit|訪ねる
stay|滞在する
return|戻る

# food and shopping
water|水
tea|お茶
coffee|コーヒー
milk|牛乳
juice|ジュース
bread|パン
rice|ご飯
egg|卵
meat|肉
fish|魚
vegetable|野菜
fruit|果物
apple|りんご
banana|バナナ
orange|オレンジ
cake|ケーキ
lunch|昼食
dinner|夕食
breakfast|朝食
snack|軽食
menu|メニュー
order|注文する
bill|勘定
price|値段
cheap|安い
expensive|高い
buy|買う
pay|支払う
sell|売る
cash|現金
change|お釣り
market|市場
mall|ショッピングモール
clothes|服
shirt|シャツ
pants|ズボン
shoes|靴
hat|帽子
coat|コート
size|サイズ
color|色

# body and feelings
head|頭
face|顔
eye|目
ear|耳
nose|鼻
mouth|口
hand|手
arm|腕
leg|脚
foot|足
heart|心
body|体
health|健康
fever|熱
pain|痛み
tired|疲れた
hungry|お腹がすいた
thirsty|喉が渇いた
sleepy|眠い
happy|うれしい
sad|悲しい
angry|怒った
scared|怖い
busy|忙しい
free|暇な
fine|元気な
good|良い
bad|悪い
great|すばらしい
okay|大丈夫

# common verbs
be|いる
have|持っている
do|する
make|作る
get|得る
take|取る
put|置く
use|使う
need|必要とする
want|欲しい
like|好き
love|大好き
hate|嫌う
know|知っている
think|思う
see|見る
watch|見る
look|見る
hear|聞こえる
listen|聞く
say|言う
speak|話す
talk|話す
ask|尋ねる
answer|答える
call|電話する
help|助ける
find|見つける
give|与える
show|見せる
bring|持ってくる
send|送る
open|開ける
close|閉める
start|始める
finish|終える
try|試す
wait|待つ
keep|保つ
move|動く

# practical adjectives and adverbs
big|大きい
small|小さい
long|長い
short|短い
high|高い
low|低い
hot|暑い
cold|寒い
warm|暖かい
cool|涼しい
new|新しい
old|古い
young|若い
easy|簡単な
hard|難しい
fast|速い
slow|遅い
near|近い
far|遠い
right|正しい
wrong|間違った
clean|きれいな
dirty|汚れた
full|いっぱいの
empty|空の
beautiful|美しい
kind|親切な
nice|感じのよい
ready|準備ができた
safe|安全な
really|本当に
maybe|たぶん
very|とても
quite|かなり
just|ちょうど
around|あたりに
together|一緒に
inside|内側に
outside|外側に
away|離れて
left|左
straight|まっすぐ
favorite|お気に入りの
problem|問題
question|質問
answer|答え
lesson|授業
party|パーティー
weather|天気
rain|雨
sunny|晴れた
cloudy|曇った
windy|風の強い
umbrella|傘
stationery|文房具
wallet|財布
glasses|眼鏡
break|壊れる
fix it|それを直す
carry|運ぶ
hold|持つ
borrow from|から借りる
lend to|に貸す
enjoy|楽しむ
`)
  },
  intermediate: {
    label: "中級",
    description: "旅行・生活・雑談でよく使う語彙と表現を強化",
    words: parseWords(`
# travel and movement
reservation|予約
passport|パスポート
luggage|荷物
suitcase|スーツケース
backpack|リュック
boarding pass|搭乗券
platform|ホーム
departure|出発
arrival|到着
delay|遅延
traffic|交通
route|経路
destination|目的地
direction|方向
corner|角
entrance|入口
exit|出口
bridge|橋
subway|地下鉄
highway|高速道路
local train|各駅電車
express train|急行電車
schedule|予定
plan|計画
trip|旅行
journey|旅
adventure|冒険
tour|観光
guide|案内人
booking|予約
cancel|取り消す
confirm|確認する
miss|逃す
catch|間に合う
transfer|乗り換える
pack|荷造りする
unpack|荷ほどきする
board|乗り込む
land|着陸する
explore|探索する

# home and daily routines
laundry|洗濯
detergent|洗剤
trash|ごみ
recycle|再利用する
vacuum|掃除機をかける
clean up|片づける
wash up|洗い物をする
fold|たたむ
hang|掛ける
repair|修理する
fix|直す
replace|取り替える
borrow|借りる
lend|貸す
share|共有する
store away|しまう
organize|整理する
prepare|準備する
serve|出す
heat|温める
cool down|冷ます
freeze|凍らせる
defrost|解凍する
slice|薄く切る
boil|ゆでる
fry|揚げる
bake|焼く
mix|混ぜる
pour|注ぐ
taste|味見する
smell|においがする
decorate|飾る
invite|招待する
host|主催する
drop by|立ち寄る
hang out|一緒に過ごす
relax|くつろぐ
rest|休む
stretch|伸びをする
exercise|運動する

# communication
message|メッセージ
text|メッセージを送る
reply|返信する
respond|応答する
explain|説明する
describe|描写する
mention|言及する
repeat|繰り返す
pronounce|発音する
spell|つづる
translate|翻訳する
introduce|紹介する
greet|あいさつする
apologize|謝る
forgive|許す
promise|約束する
suggest|提案する
recommend|勧める
agree|賛成する
disagree|反対する
argue|言い争う
discuss|話し合う
chat|おしゃべりする
joke|冗談を言う
complain|不満を言う
warn|警告する
advise|助言する
encourage|励ます
invite over|家に招く
catch up|近況を話す
figure out|理解する
point out|指摘する
bring up|話題に出す
calm down|落ち着く
cheer up|元気を出す
speak up|もっと大きな声で話す
slow down|ゆっくりにする
write down|書き留める
look up|調べる
fill out|記入する

# feelings and opinions
feeling|気持ち
mood|気分
emotion|感情
impression|印象
opinion|意見
idea|考え
choice|選択
reason|理由
result|結果
favorite|お気に入り
surprised|驚いた
nervous|緊張した
embarrassed|恥ずかしい
relieved|ほっとした
excited|わくわくした
proud|誇らしい
lonely|さみしい
upset|動揺した
worried|心配した
curious|興味がある
interested|興味がある
bored|退屈した
comfortable|快適な
uncomfortable|居心地が悪い
confident|自信がある
careful|注意深い
honest|正直な
polite|礼儀正しい
quiet|静かな
loud|うるさい
serious|まじめな
funny|おかしい
strange|変な
useful|役に立つ
helpful|助けになる
important|重要な
special|特別な
possible|可能な
impossible|不可能な
worth it|その価値がある

# work and school basics
project|プロジェクト
task|作業
homework|宿題
report|報告書
presentation|発表
practice|練習
lesson|授業
classmate|クラスメート
coworker|同僚
manager|管理者
customer|顧客
client|取引先
meeting|会議
deadline|締め切り
shift|勤務時間
break time|休憩時間
uniform|制服
training|研修
skill|技能
experience|経験
goal|目標
plan ahead|前もって計画する
review|見直す
check|確認する
update|更新する
arrange|手配する
prepare for|備える
handle|対処する
solve|解決する
improve|改善する
focus on|集中する
finish up|終わらせる
show up|現れる
take care of|面倒を見る
set up|準備する
clean out|片づける
turn in|提出する
pick up|受け取る
drop off|届ける
follow up|追加で確認する

# shopping and services
receipt|レシート
refund|返金
exchange|交換
discount|割引
sale|セール
coupon|クーポン
stock|在庫
service|サービス
counter|窓口
cashier|レジ係
delivery|配達
shipping|発送
package|荷物
post office|郵便局
bank|銀行
account|口座
balance|残高
deposit|預け入れ
withdraw|引き出す
charge|請求する
membership|会員資格
appointment|予約
insurance|保険
prescription|処方箋
medicine|薬
clinic|診療所
pharmacy|薬局
haircut|散髪
salon|美容室
repair shop|修理店
customer service|顧客対応
support desk|サポート窓口
line up|列に並ぶ
sign up|登録する
log in|ログインする
log out|ログアウトする
turn on|電源を入れる
turn off|電源を切る
plug in|差し込む
charge up|充電する

# health and lifestyle
habit|習慣
lifestyle|生活習慣
diet|食事制限
sleep schedule|睡眠のリズム
symptom|症状
cough|せき
sneeze|くしゃみ
headache|頭痛
stomachache|腹痛
injury|けが
recovery|回復
appointment card|診察券
checkup|健康診断
healthy|健康的な
unhealthy|不健康な
fresh|新鮮な
salty|塩辛い
sweet|甘い
sour|すっぱい
bitter|苦い
spicy|辛い
delicious|おいしい
awful|ひどい
crowded|混んだ
empty seat|空席
line|列
seat|席
reservation time|予約時間
flu|インフルエンザ
appointment time|予約時刻
commute|通勤する
rush hour|通勤ラッシュ
neighborhood|近所
delivery box|宅配ボックス
apply for|に申し込む
register for|に登録する
membership card|会員証
return item|返品する
pick a seat|席を選ぶ
window seat|窓側の席
aisle seat|通路側の席
change trains|電車を乗り換える
get lost|道に迷う
look around|見て回る
spend time|時間を過ごす
save money|お金を節約する
run out of|を使い切る
take medicine|薬を飲む
feel better|気分がよくなる
call back|折り返し電話する
show around|案内して回る
stop by|立ち寄る
make sure|確かめる
`
    )
  },
  advanced: {
    label: "上級",
    description: "実用会話を一段深くする抽象語・説明語彙・応答表現",
    words: parseWords(`
# thinking and communication
assume|思い込む
realize|気づく
recognize|認識する
consider|考慮する
compare|比較する
contrast|対比する
judge|判断する
estimate|見積もる
predict|予測する
analyze|分析する
interpret|解釈する
summarize|要約する
clarify|明確にする
emphasize|強調する
highlight|目立たせる
define|定義する
state|述べる
argue that|と主張する
admit|認める
deny|否定する
suggest that|と示唆する
point out that|と指摘する
imply|ほのめかす
meanwhile|その一方で
therefore|したがって
however|しかしながら
otherwise|そうでなければ
instead|その代わりに
in fact|実際には
at least|少なくとも
actually|実際に
basically|基本的には
frankly|率直に言うと
personally|個人的には
apparently|見たところ
obviously|明らかに
especially|特に
generally|一般的に
rarely|めったに
eventually|最終的に

# practical verbs
manage|なんとかやる
deal with|対処する
cope with|うまく対処する
avoid|避ける
reduce|減らす
increase|増やす
maintain|維持する
improve on|さらに良くする
adjust|調整する
adapt|適応する
recover|回復する
prevent|防ぐ
protect|守る
replace|置き換える
combine|組み合わせる
separate|分ける
expand|広げる
limit|制限する
deliver|届ける
achieve|達成する
require|必要とする
allow|許可する
permit|認める
refuse|断る
accept|受け入れる
decline|丁重に断る
hesitate|ためらう
rush|急ぐ
delay|遅らせる
postpone|延期する
reschedule|予定を変更する
cancel out|打ち消す
sort out|整理して解決する
work out|うまくいく
carry on|続ける
leave out|省く
turn out|結果的にそうなる
end up|結局そうなる
make up for|埋め合わせる
run into|偶然出会う

# nuanced daily conversation
awkward|気まずい
smooth|スムーズな
stable|安定した
flexible|柔軟な
reliable|信頼できる
reasonable|妥当な
fair|公平な
appropriate|適切な
effective|効果的な
efficient|効率的な
practical|実用的な
realistic|現実的な
specific|具体的な
general|一般的な
common|よくある
rare|珍しい
formal|形式ばった
casual|気軽な
familiar|なじみのある
unfamiliar|見慣れない
typical|典型的な
unusual|珍しい
convenient|便利な
inconvenient|不便な
comfortable enough|十分に快適な
stressful|負担の大きい
annoying|いらいらする
pleasant|心地よい
impressive|印象的な
disappointing|期待外れの
interesting enough|十分興味深い
complicated|ややこしい
simple enough|十分シンプルな
clear|明確な
unclear|不明確な
accurate|正確な
inaccurate|不正確な
available|利用できる
unavailable|利用できない
necessary|必要な

# relationships and society
relationship|関係
connection|つながり
trust|信頼
respect|尊重
support|支援
encouragement|励まし
responsibility|責任
permission|許可
opportunity|機会
challenge|課題
solution|解決策
decision|決定
discussion|議論
conversation|会話
agreement|合意
disagreement|不一致
conflict|対立
issue|問題
concern|懸念
priority|優先事項
preference|好み
expectation|期待
pressure|圧力
stress|ストレス
balance|バランス
boundary|境界
influence|影響
community|地域社会
environment|環境
culture|文化
tradition|伝統
custom|習慣
behavior|振る舞い
attitude|態度
response|反応
reaction|反応
feedback|意見
advice|助言
apology|謝罪
gratitude|感謝

# abstract but practical
option|選択肢
alternative|代案
possibility|可能性
probability|確率
evidence|根拠
fact|事実
detail|詳細
context|文脈
background|背景
purpose|目的
benefit|利益
drawback|欠点
risk|危険
impact|影響
effect|効果
result in|結果として生じる
lead to|につながる
depend on|次第である
consist of|から成る
belong to|に属する
relate to|関係する
refer to|言及する
apply to|当てはまる
focus on|集中する
base on|基づく
rely on|頼る
stand out|目立つ
fit in|なじむ
catch on|広まる
hold on|少し待つ
go over|見直す
come up with|思いつく
break down|故障する
settle down|落ち着く
back up|支える
step back|一歩引く
move forward|前進する
pay attention|注意を払う
take into account|考慮に入れる
make sense|意味をなす

# service and problem solving
resolve|解決する
arrangement|手配
confirmation|確認
availability|空き状況
alternative plan|別案
replacement|代替品
refund policy|返金方針
warranty|保証
maintenance|保守
inspection|点検
damage|損害
repair cost|修理費
compensation|補償
complaint|苦情
request|依頼
inquiry|問い合わせ
notice|お知らせ
reminder|念押し
announcement|案内
instruction|指示
guideline|指針
procedure|手順
step|手順
condition|条件
requirement|要件
standard|基準
quality|品質
delay notice|遅延連絡
shipping issue|配送トラブル
technical issue|技術的な問題
network issue|通信の問題
access problem|アクセス障害
unexpected|予想外の
urgent|緊急の
immediate|即時の
temporary|一時的な
permanent|恒久的な
overall|全体として
exactly|正確に
roughly|おおよそ

# advanced day-to-day verbs
apologize for|を謝る
appreciate|感謝する
applaud|称賛する
criticize|批判する
blame|責める
forgive someone|人を許す
convince|納得させる
persuade|説得する
remind|思い出させる
warn against|に注意を促す
notify|通知する
inform|知らせる
update someone|人に最新状況を伝える
brief|手短に説明する
consult|相談する
coordinate|調整する
organize properly|きちんと整理する
negotiate|交渉する
request politely|丁寧に頼む
decline politely|丁寧に断る
respond quickly|すばやく返答する
follow through|最後までやり切る
keep track of|追跡する
check in|様子を確認する
check out|確認して出る
drop in|立ち寄る
wrap up|締めくくる
reach out|連絡する
figure things out|物事を理解する
make progress|進歩する
keep in mind|心に留める
on the other hand|一方で
as a result|その結果
to be honest|正直に言うと
from my point of view|私の見方では
in that case|その場合は
for the time being|当面は
in advance|前もって
in detail|詳しく
by mistake|うっかり
on purpose|わざと
make a difference|違いを生む
take responsibility|責任を負う
meet expectations|期待に応える
fall behind|遅れを取る
keep up with|についていく
look into|詳しく調べる
bring about|引き起こす
settle an issue|問題を解決する
come to an agreement|合意に達する
under pressure|プレッシャーの中で
in a hurry|急いで
for now|今のところ
at the moment|現時点では
without a doubt|間違いなく
`)
  },
  business: {
    label: "ビジネス",
    description: "会議・メール・営業・事務で使いやすい実務語彙を集中学習",
    words: parseWords(`
# office basics
agenda|議題
meeting room|会議室
conference call|電話会議
online meeting|オンライン会議
schedule meeting|会議を設定する
minutes|議事録
attendee|出席者
participant|参加者
speaker|発表者
presentation deck|資料
slide|スライド
handout|配布資料
document|文書
file|ファイル
folder|フォルダ
draft|草案
final version|最終版
approval|承認
reviewer|確認者
manager|上司
director|部長
executive|役員
department|部署
division|部門
branch|支店
head office|本社
remote work|在宅勤務
office hours|営業時間
shift schedule|勤務表
attendance|出勤
absence|欠勤
vacation|休暇
day off|休み
overtime|残業
payroll|給与計算
salary|給料
bonus|賞与
benefit package|福利厚生
policy|方針
compliance|法令順守

# email and communication
subject line|件名
attachment|添付ファイル
cc|CC
bcc|BCC
reply all|全員に返信
forward|転送する
follow-up email|追跡メール
confirmation email|確認メール
reminder email|リマインドメール
deadline reminder|締め切り連絡
send over|送る
share with|共有する
loop in|関係者を入れる
touch base|軽く確認する
reach out to|連絡する
keep posted|状況を知らせ続ける
let me know|知らせてください
as discussed|話した通り
for reference|参考までに
for your review|ご確認用
please advise|ご指示ください
appreciate your help|ご協力に感謝します
thanks in advance|よろしくお願いします
best regards|敬具
sincerely|敬具
internal memo|社内メモ
announcement|告知
notice|通知
inquiry|問い合わせ
response time|返答時間

# project management
project plan|計画書
milestone|節目
timeline|日程
deliverable|成果物
scope|範囲
requirement|要件
specification|仕様
task owner|担当者
assignee|割り当て担当
priority|優先度
status update|進捗報告
progress report|進捗レポート
issue tracker|課題管理表
bug report|不具合報告
roadmap|ロードマップ
kickoff|キックオフ
launch|公開する
rollout|展開
implementation|実装
deployment|導入
testing|テスト
quality check|品質確認
revision|修正版
feedback round|フィードバック回
approval flow|承認フロー
resource|リソース
budget|予算
cost estimate|費用見積もり
actual cost|実績費用
budget overrun|予算超過
adjust schedule|日程調整する
move up|前倒しにする
push back|後ろ倒しにする
assign task|タスクを割り当てる
complete task|タスクを完了する
track progress|進捗を追う
meet deadline|締め切りを守る
miss deadline|締め切りに遅れる
on schedule|予定通り
behind schedule|予定より遅れて

# sales and customer communication
client meeting|顧客会議
customer call|顧客との通話
proposal|提案書
quotation|見積書
estimate|見積もり
contract|契約
agreement|合意書
invoice|請求書
purchase order|発注書
payment term|支払条件
renewal|更新
subscription|契約サービス
lead|見込み客
prospect|有望顧客
sales pitch|売り込み
demo|実演
trial|試用
offer|提案
discount|値引き
promotion|販促
campaign|キャンペーン
closing|成約
deal|取引
revenue|売上
profit|利益
margin|利益率
target|目標
sales target|売上目標
pipeline|案件パイプライン
account manager|担当営業
customer success|顧客成功支援
support ticket|問い合わせ票
renew contract|契約更新する
request quote|見積依頼する
send invoice|請求書を送る
process payment|支払いを処理する
close deal|契約を決める
win business|案件を取る
lose business|案件を失う

# meetings and negotiation
open the meeting|会議を始める
wrap up the meeting|会議を締める
share screen|画面共有する
go through|順に確認する
raise a point|論点を出す
make a suggestion|提案する
give an update|最新状況を伝える
report back|報告する
approve budget|予算承認する
request approval|承認依頼する
gain approval|承認を得る
negotiate terms|条件交渉する
counteroffer|対案
compromise|妥協案
mutual benefit|相互利益
partnership|提携
stakeholder|関係者
decision maker|決裁者
consensus|合意
alignment|足並みがそろうこと
next step|次のステップ
action item|対応項目
owner|担当者
due date|期限
follow-up meeting|フォロー会議
reschedule meeting|会議を変更する
cancel meeting|会議を取り消す
attendance list|出席者一覧
discussion point|議論のポイント
objection|異議

# hr and administration
recruitment|採用
job posting|求人票
resume|履歴書
interview|面接
candidate|候補者
onboarding|受け入れ研修
orientation|オリエンテーション
training session|研修会
evaluation|評価
performance review|人事評価
promotion|昇進
transfer|異動
resignation|退職
employment contract|雇用契約
probation period|試用期間
attendance record|勤怠記録
expense report|経費精算
business trip|出張
transportation cost|交通費
reimbursement|払い戻し
facility|設備
equipment|機器
asset|資産
inventory|在庫
procurement|調達
vendor|仕入先
supplier|供給業者
purchase request|購入申請
approval route|承認経路
internal process|社内手続き

# finance and operations
cash flow|資金繰り
operating cost|運営費
expense|費用
fixed cost|固定費
variable cost|変動費
forecast|予測
financial report|財務報告
quarterly result|四半期決算
annual report|年次報告
tax|税金
profit and loss|損益
balance sheet|貸借対照表
investment|投資
return on investment|投資対効果
purchase|購入
shipment|出荷
delivery date|納期
warehouse|倉庫
stock level|在庫水準
order volume|受注量
production|生産
output|生産量
efficiency|効率
workflow|業務フロー
operation|運営
maintenance|保守
troubleshooting|問題切り分け
incident|障害
downtime|停止時間
recovery plan|復旧計画

# business conversation verbs
approve|承認する
reject|却下する
submit|提出する
review|確認する
revise|修正する
finalize|確定する
negotiate|交渉する
coordinate|調整する
escalate|上位に引き上げる
delegate|任せる
prioritize|優先順位をつける
streamline|効率化する
allocate|割り当てる
monitor|監視する
measure|測定する
analyze|分析する
report|報告する
summarize|要約する
confirm|確認する
clarify|明確にする
resolve|解決する
address|対処する
launch a project|案件を始動する
close a project|案件を終了する
sign a contract|契約する
renew a deal|取引を更新する
share feedback|意見を共有する
manage risk|リスクを管理する
reduce cost|コストを削減する
increase revenue|売上を伸ばす
book a meeting|会議を入れる
send a reminder|リマインドを送る
confirm attendance|出席確認する
review the contract|契約書を確認する
revise the proposal|提案書を修正する
prepare an estimate|見積もりを作る
approve the request|申請を承認する
reject the request|申請を却下する
share the schedule|予定を共有する
adjust the budget|予算を調整する
report an issue|問題を報告する
solve the issue|問題を解決する
improve efficiency|効率を改善する
reduce the delay|遅れを減らす
meet the target|目標を達成する
miss the target|目標未達になる
gain trust|信頼を得る
build a relationship|関係を築く
reply promptly|すぐ返信する
keep the deadline|期限を守る
check the figures|数字を確認する
update the client|顧客に状況共有する
arrange delivery|納品を手配する
`)
  }
};
