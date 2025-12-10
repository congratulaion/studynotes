// 전체 단원 내용
const bioPages = {
  "01. 생명체의 특성": `
## 생명체의 7가지 특징
1. **세포로 구성**  
- 모든 생명체는 1개 이상의 세포로 이루어짐  
2. **물질대사**  
- 동화/이화 반응 수행  
3. **항상성 유지**  
- 체온, 삼투압, pH 조절  
4. **자극에 반응**  
5. **성장과 발달**  
6. **생식** (유성·무성)  
7. **유전·진화**  
`,
  "02. 세포 구조와 기능": `
## 세포의 종류
- **원핵세포**: 핵막 없음, 소기관 단순  
- **진핵세포**: 핵막 있음, 다양한 세포소기관(동물·식물)

## 세포소기관 기능
- 핵: DNA 저장  
- 리보솜: 단백질 합성  
- 미토콘드리아: ATP 합성  
- 엽록체: 광합성  
- 소포체: 단백질·지질 합성  
- 골지체: 가공·분비  
- 리소좀: 분해  
- 중심체: 방추사 형성  
- 액포(식물): 저장  

## 세포막
- 인지질 이중층 + 막단백질  
- 선택적 투과  
`,
  ...
};

// Markdown → HTML 변환
function renderMarkdown(md) {
  return md
    .replace(/^### (.*)$/gm, "<h3>$1</h3>")
    .replace(/^## (.*)$/gm, "<h2>$1</h2>")
    .replace(/^# (.*)$/gm, "<h1>$1</h1>")
    .replace(/\n- (.*)/g, "<li>$1</li>")
    .replace(/(<li>.*<\/li>)/gs, "<ul>$1</ul>")
    .replace(/\n\n/g, "<br><br>");
}

// 페이지 로드 후 실행
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("#bio-nav");
  const content = document.querySelector("#bio-content");

  Object.keys(bioPages).forEach((title, idx) => {
    const btn = document.createElement("button");
    btn.textContent = title;
    btn.className = "bio-nav-item";

    btn.addEventListener("click", () => {
      content.innerHTML = renderMarkdown(bioPages[title]);

      document.querySelectorAll(".bio-nav-item")
        .forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    });

    if (idx === 0) {
      btn.classList.add("active");
      content.innerHTML = renderMarkdown(bioPages[title]);
    }

    nav.appendChild(btn);
  });
});
