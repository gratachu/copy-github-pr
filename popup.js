// タブタイトル例: "Fix login bug by octocat · Pull Request #12 · owner/repo · GitHub"
const PR_URL = /^https:\/\/github\.com\/[^/]+\/[^/]+\/pull\/\d+/;
const PR_TITLE = /^(.+) by \S+ · Pull Request #\d+ · /;

function format(tab) {
  const url = tab.url.match(PR_URL)?.[0];
  if (!url) return null;
  const title = tab.title.match(PR_TITLE)?.[1] ?? tab.title;
  return `${title}\n${url}`;
}

chrome.tabs.query({ active: true, currentWindow: true }, async ([tab]) => {
  const msg = document.getElementById("msg");
  const text = format(tab);
  if (!text) {
    msg.textContent = "PR ページではありません";
    return;
  }
  await navigator.clipboard.writeText(text);
  msg.textContent = "✓ コピーしました";
  setTimeout(() => window.close(), 800);
});
