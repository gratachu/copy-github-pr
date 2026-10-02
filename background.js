// アイコンのクリックとショートカット（_execute_action）の両方でここに来る
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({ target: { tabId: tab.id }, func: copyPr });
});

// ページ内で実行されるため、外の変数は参照できない
async function copyPr() {
  // タブタイトル例: "Fix login bug by octocat · Pull Request #12 · owner/repo · GitHub"
  const url = location.href.match(/^https:\/\/github\.com\/[^/]+\/[^/]+\/pull\/\d+/)?.[0];
  const title = document.title.match(/^(.+) by \S+ · Pull Request #\d+ · /)?.[1] ?? document.title;

  let message = "PR ページではありません";
  if (url) {
    await navigator.clipboard.writeText(`${title}\n${url}`);
    message = "✓ PR のタイトルと URL をコピーしました";
  }

  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.cssText =
    "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:2147483647;" +
    "padding:10px 16px;border-radius:8px;background:#1f2328;color:#fff;font:14px system-ui;" +
    "box-shadow:0 4px 12px rgba(0,0,0,.3)";
  document.body.append(toast);
  setTimeout(() => toast.remove(), 1500);
}
