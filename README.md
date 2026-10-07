# asazora.com のサイト

LP・プライバシーポリシー・PCでメールを開かれた時の受け皿の3つを、`asazora.com` に置く静的サイト。
判断の根拠はゴール「LPとメール登録の導線を作る」（`goals/8196d391 …`）。検索に載せる作業はゴール「asazora.com を Google 検索に載せる」

## 中身

| ファイル | 公開URL | 何のページか |
| --- | --- | --- |
| `index.html` | `https://asazora.com/` | LP。2つの導線（テスト参加／有料版のお知らせ）。2026-09-16 に v1.2（撮るまで止まらないアラーム）へ本文を書き換え。2026-10-07 に文章を最新の仕様（自動／カスタムモード・休む道は朝のうちに・最大5人・配布の状態・位置情報は使わない）に合わせ、です・ます調に書き直した（ゴール 5dd79ad8）。アラーム・ホーム・チームの3画面を CSS のモックアップで見せる（画像ファイル無し。文言はアプリの `ja.ts` と同じ）。ローカルで見るなら作業場の `.claude/launch.json` の `asazora-site`（http://localhost:8093/） |
| `privacy/index.html` | `https://asazora.com/privacy/` | プライバシーポリシー。原稿は `../5 公開・ストア・法務/privacy-policy-draft.md` |
| `terms/index.html` | `https://asazora.com/terms/` | 利用規約。**1章に「Android では asazora 自身が鳴る。止めるには選んだ場所の写真を撮る。iPhone は通知だけなので目覚ましを併用」と、鳴らない条件（省電力モード・強制停止・音量ゼロ）を置いている**（鳴らなくて起きられなくても責任を負わないこと）。アプリの登録画面の同意文とセッティングからリンクされている |
| `confirmed/index.html` | `https://asazora.com/confirmed/` | Supabase の確認メール・再設定メールをPCで開かれた時の受け皿 |
| `img/bed.jpg` | `https://asazora.com/img/bed.jpg` | LP に出す整えたベッドの写真（ヒーローのファインダー・チームのカード・名簿のサムネイルで同じ1枚）。オーナーが Google Flow で生成した画像（素材サイトの写真を元にアレンジ）。横 800px・約 74KB。2026-09-16 |
| `favicon-32.png`・`favicon-192.png`・`apple-touch-icon.png` | `https://asazora.com/favicon-32.png` ほか | サイトのアイコン（ブラウザのタブ・Google 検索・iPhone でホーム画面に追加したとき）。アプリのアイコン「頂の光」と同じ絵。作り直しは `node projects/asazora/tools/icons/make-icons.mjs projects/asazora/site site`（作業場の直下で）。4 ページの `<head>` から読んでいる。2026-09-27 |
| `ga.js` | `https://asazora.com/ga.js` | Google Analytics 4。測定 ID を1か所入れると動く（未入力なら何もしない）。ページ表示と LP の2つのボタン（`a[data-ga]`）のクリックを計測。ボタンのクリックは `select_content` イベントの `content_id`（join-test／paid-notify）。どちらが押されたかは、GA のカスタム ディメンション「LPのボタン」（イベント スコープ・`content_id`。2026-10-07 に登録）で見る。登録より前の分は分けて見られない。ポリシーの「12. このサイトのアクセス解析について」とセット |
| `robots.txt` | `https://asazora.com/robots.txt` | 検索エンジン向け。`/confirmed/` だけ除外し、サイトマップの場所を教える |
| `sitemap.xml` | `https://asazora.com/sitemap.xml` | 検索エンジンに載せたい3ページ（LP・プライバシーポリシー・利用規約）。ページを足したらここにも足す |
| `CNAME` | — | GitHub Pages に独自ドメインを教えるファイル。中身は `asazora.com` の1行だけ |
| `.nojekyll` | — | GitHub Pages の Jekyll 処理を止める（素のHTMLをそのまま出す） |

依存ライブラリは無い。CSSはHTMLに直書き。色は `app/src/constants/theme.ts` のデザイントークン（背景 `#000000` / アクセント `#00FFFF` / ガラスモーフィズム）に合わせている。

**1年の中断に耐えることを優先した。**ビルドもnpmも使っていないので、来年開いてもそのまま直せる。

---

## 埋め込みの値（2026-09-12 に確定・埋め済み）

| 場所 | 入っている値 |
| --- | --- |
| `index.html` テスト参加ボタン | [テスター参加のアンケート](https://docs.google.com/forms/d/e/1FAIpQLSctUfe6soJy6VYiFwO-6R34TzIcpuHMN7pLC-8OYsaSNLHOUg/viewform) |
| `index.html` 有料版ボタン | [有料機能実装へのアンケート](https://docs.google.com/forms/d/e/1FAIpQLSeQR8kTQ1gI83jnXGpF7_khRro9N38dkZQCOT_aqUN8QO_jBA/viewform) |
| `privacy/index.html` 制定日・改定日 | 制定 2026年9月12日・改定 2026年10月7日（9章：アカウントの削除はアプリから） |
| `ga.js` 測定 ID | `G-4BQ9GW8NZM`（GA4 プロパティ `asazora.com` のウェブストリーム。2026-09-15） |

未入力のプレースホルダが残っていないかの確認:

```bash
grep -rn "__[A-Z_]*__" --include="*.html" .
```

---

## 公開のしかた（GitHub Pages）

**なぜ GitHub Pages か。**ムームードメインのネームサーバーを変えずに、Aレコードを足すだけで済む。Cloudflare Pages は独自ドメインの直下（apex）に当てるにはネームサーバーの移管が必要で、**いま動いている ImprovMX のメール（support@asazora.com）をCloudflare側で作り直すことになる**。動いているものを壊さないほうを採った。無料枠・放置耐性もGitHub Pagesが上。

### 1. リポジトリを作る（オーナー操作）

アプリ本体（`kosenapps22-design/asazora`）とは**別のリポジトリ**にする。サイトは公開、アプリは非公開のままにできる。

1. GitHub で新しいリポジトリ `asazora-site` を作る。**Public**（GitHub Pages を無料で使うため）
2. この `site/` の中身をそのまま push する

```bash
cd "C:\Users\中村そーすけ\Desktop\メイン作業場\projects\asazora\site"
git init
git add -A
git commit -m "asazora.com のサイトを作る（LP・プライバシーポリシー・メールの受け皿）"
git branch -M main
git remote add origin https://github.com/kosenapps22-design/asazora-site.git
git push -u origin main
```

3. リポジトリの Settings → Pages → Source を「Deploy from a branch」、Branch を `main` / `/ (root)` にする
4. 同じ画面の Custom domain に `asazora.com` を入れて Save（`CNAME` ファイルがあるので自動で入っていることもある）
5. DNSを設定した後、同じ画面の **Enforce HTTPS** にチェックを入れる（証明書の発行に数十分かかることがある）

### 2. DNSを設定する（オーナー操作・ムームードメイン）

ムームードメインの管理画面 → ドメイン操作 → ムームーDNS → `asazora.com` の「変更」→ カスタム設定。

**いちばん注意すること：ムームーDNSのカスタム設定は1画面で全レコードを管理する。いま入っている ImprovMX の MX レコードを消さないこと。**消すと support@asazora.com が届かなくなる。追加するだけにする。

追加するレコード:

| 種別 | サブドメイン | 内容 |
| --- | --- | --- |
| A | （空欄） | `185.199.108.153` |
| A | （空欄） | `185.199.109.153` |
| A | （空欄） | `185.199.110.153` |
| A | （空欄） | `185.199.111.153` |
| CNAME | `www` | `kosenapps22-design.github.io.` |

4つのAレコードは GitHub Pages の公式のIP。4つ全部入れる（1つが落ちても表示され続けるため）。

反映を確認する:

```bash
nslookup asazora.com
curl -I https://asazora.com
```

`185.199.*` が返り、`200` が返れば通っている。反映は数分〜1時間ほど。

### 3. Supabase に受け皿のURLを登録する（オーナー操作）

**2026-09-12 に案Cで決まった。**確認メール・再設定メールの戻り先を、アプリの `asazora://` ではなく `https://asazora.com/confirmed/` に向ける。受け皿ページが、スマホなら `asazora:///reset-password#…` へフラグメントごと自動転送し、PCなら案内を出して止まる。**スマホの体験は今までと同じ。**

Supabase ダッシュボード → Authentication → URL Configuration:

- **Redirect URLs** に `https://asazora.com/confirmed/` を追加する（既存の `asazora://**` と `http://localhost:8081/**` は残す。開発中は今までどおり `asazora://` / localhost に戻るため）
- **Site URL** はそのまま触らない

アプリ側は `app/src/features/auth/api.ts` の `redirectUrl()` を直した。**本番ビルドだけ** 受け皿ページを返し、開発中（`__DEV__`）は今までどおり `Linking.createURL` を使う。

⚠️ **この変更が入ったAPKを作るのは、上の1と2が終わって `https://asazora.com/confirmed/` が実際に開けるようになってから。**先にビルドすると、戻り先が存在しないURLになる。

→ 詳細は Addness ゴール「パソコンでメールを開かれた場合の戻り先をどうするか決める」（`fcb92fd6-3f45-42da-b68b-576577a801b5`）。

### 更新のしかた（次回以降）

```bash
cd "C:\Users\中村そーすけ\Desktop\メイン作業場\projects\asazora\site"
git add -A && git commit -m "変更の内容" && git push
```

push から1〜2分で公開ページが変わる。

---

## メール登録フォーム（Googleフォーム・2本）

**2本に分ける。**スプレッドシートが2枚に分かれるので、「Play Console に貼るテスターの列」と「来年お知らせを送る有料版待ちの列」が混ざらない。1本にまとめると、あとで人を選り分ける手間が毎回かかる。

### フォームA：asazora のテストに参加する

設定:

- **「回答者のメールアドレスを収集する」を「確認済み」にする。**Play のテスターは Googleアカウント必須なので、確認済みで取れば入力ミスと @icloud.com の混入がゼロになる
- 回答をスプレッドシートに保存する
- 「回答の編集を許可する」をON（端末を変えた人が自分で直せる）
- 送信後のメッセージ：`ありがとうございます。順番にご案内しているので、案内のメールまで数日いただくことがあります。`

質問:

| # | 質問 | 形式 | 必須 |
| --- | --- | --- | --- |
| 1 | Play で使っているアドレスが、上のメールアドレスと違う場合だけ書いてください | 記述式 | — |
| 2 | なんて呼べばいいですか | 記述式 | — |
| 3 | お使いのAndroid端末（例：Pixel 7a / Android 14） | 記述式 | ✓ |
| 4 | 何時に起きたいですか | ラジオ（5時台 / 6時台 / 7時台 / 8時以降） | ✓ |
| 5 | 朝、二度寝することはありますか | ラジオ（ほぼ毎日 / 週に数回 / たまに / ほとんどない） | ✓ |
| 6 | asazora をどこで知りましたか | ラジオ（X / note / 知り合いから / 検索 / その他） | ✓ |
| 7 | 朝の写真（カーテンを開けた窓の外など）を、顔が写らない形で5人に送ることに抵抗はありますか | ラジオ（ない / 少しある / 強くある） | ✓ |
| 8 | 伝えたいことがあれば | 段落 | — |
| 9 | [プライバシーポリシー](https://asazora.com/privacy/) を読みました | チェックボックス（1項目） | ✓ |

質問3〜7は、**招待を1通ずつ手で送るときの材料**。起床時刻（4）が近い人をまとめて入れるとチームが埋まる。5と7は、この設計が刺さる相手かどうかの判断に使う。

### フォームB：有料版のお知らせを受け取る

設定はフォームAと同じ（確認済みメール・スプレッドシート保存）。送信後のメッセージ：`ありがとうございます。使えるようになったらお知らせします。`

| # | 質問 | 形式 | 必須 |
| --- | --- | --- | --- |
| 1 | 月980円について、いまの気持ちに近いものは | ラジオ（使えるようになったら払いたい / 内容次第 / 無料の範囲で使いたい） | ✓ |
| 2 | どこに払う価値を感じますか | チェックボックス（純正の目覚ましを置き換える / 続かなくなる時期を先回りしてくれる / ルーティンを自由に組める / チームを選べる / その他） | — |

**数えるのはボタンのクリック数ではなく、メールを入れた人数。**クリック率は実際の課金率より必ず高く出るので、絶対値としては使わない。上限の把握と、LPの文言を変える前後の比較にだけ使う。

---

## 招待メールの文面（クローズドテストを始めるとき）

フォームAに登録してくれた人へ、1通ずつ送る。Play Console にテスターを追加してから送る。

> 件名：asazora のテストのご案内
>
> 登録ありがとうございます。asazora を作っている中村です。
>
> 下のリンクから、テスターとして参加できます。
> （テスト参加リンク）
>
> **リンクを開いてエラーが出たら、数時間おいてからもう一度お試しください。**テスターの追加が反映されるまで、数時間から1日ほどかかることがあります。
>
> 入れたら、初期設定で**「通知」「アラームとリマインダー」「全画面通知」の3つをオンにしてください。**オフのままだと、鳴っても画面が出なかったり、時間がずれたりします。強い省電力モード（スーパー バッテリー セーバーなど）のまま寝ると鳴らないので、寝る前に切っておいてください。
>
> Android では、asazora 自身が起きる時間に鳴ります。いつもの目覚ましは要りません。止めるには、初期設定で選んだ場所（整えたベッドなど）の写真を撮ります。どうしても無理な朝は、画面の下の「今日は写真をパスする」を5秒長押しすると休めます。
>
> 合わなければ、いつでも抜けてもらってかまいません。感想は support@asazora.com に一行でも。
