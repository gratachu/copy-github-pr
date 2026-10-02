# Copy GitHub PR

GitHub の Pull Request ページで、PR のタイトルと URL をクリップボードにコピーする Chrome 拡張です。

コピーされる内容:

```
Fix login bug
https://github.com/owner/repo/pull/12
```

`/files` や `/commits` タブを開いていても、URL は PR 本体（`/pull/12`）に揃えてコピーします。

## インストール

1. このリポジトリを clone します。
   ```sh
   git clone https://github.com/gratachu/copy-github-pr.git
   ```
2. Chrome で `chrome://extensions` を開きます。
3. 右上の「デベロッパー モード」をオンにします。
4. 「パッケージ化されていない拡張機能を読み込む」を押し、clone したフォルダを選びます。
5. ツールバーのパズルアイコンから「Copy GitHub PR」をピン留めすると使いやすくなります。

## 使い方

1. GitHub の PR ページを開きます。
2. 次のどちらかでコピーします。
   - ツールバーの拡張アイコンをクリックする
   - ショートカット `Alt+Shift+C`（Mac は `Option+Shift+C`）を押す
3. 「✓ コピーしました」と表示されたら、Slack などに貼り付けます。

PR 以外のページでは「PR ページではありません」と表示され、何もコピーしません。

ショートカットは `chrome://extensions/shortcuts` で変更できます。

## 仕組み

ファイルは 3 つだけです。

| ファイル | 役割 |
| --- | --- |
| `manifest.json` | 権限（`activeTab`, `clipboardWrite`）とショートカットの定義 |
| `popup.html` | アイコンを押したときに出る小さなポップアップ |
| `popup.js` | 現在のタブのタイトルと URL を整形してコピー |

ページに content script は差し込みません。タブのタイトル（`<PRタイトル> by <作者> · Pull Request #12 · owner/repo · GitHub`）から PR タイトルを取り出しています。
