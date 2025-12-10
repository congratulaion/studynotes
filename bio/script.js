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

  "03. 물질 이동": `
## 수동수송
- 단순확산  
- 촉진확산  
- 삼투(물 이동)

## 능동수송
- ATP 필요  
- Na+/K+ 펌프  

## 세포내수송
- 엔도시토시스(음·식세포작용)  
- 엑소시토시스  
`,

  "04. 효소": `
## 효소의 성질
- 생체 촉매  
- 활성화 에너지 감소  
- 기질 특이성  
- 최적 pH·온도 존재  

## 저해
- 경쟁적 저해(활성부위 경쟁)  
- 비경쟁적 저해(입체 변화)  
`,

  "05. 세포 호흡": `
## 해당과정
- 포도당 → 피루브산 + 2ATP

## 크렙스 회로
- NADH, FADH₂ 생성

## 전자전달계
- 산화적 인산화 → 34ATP 생성  

총 약 36~38 ATP 생성  
`,

  "06. 광합성": `
## 명반응(틸라코이드)
- 물 분해 → O₂  
- ATP·NADPH 생성

## 암반응(캘빈 회로)
- CO₂ → 포도당 합성  
- 명반응의 ATP·NADPH 사용  
`,

  "07. DNA와 유전 정보": `
## DNA 구조
- 이중 나선  
- 염기쌍: A-T, G-C

## 복제
- 반보존적 복제  
- DNA polymerase 이용

## 전사
- DNA → mRNA

## 번역
- mRNA → 단백질  
- 리보솜, tRNA, 코돈  
`,

  "08. 단백질 합성": `
## 전사 (핵)
- mRNA 생성

## RNA 가공
- 스플라이싱(인트론 제거)

## 번역 (세포질)
- tRNA가 아미노산 운반  
- 폴리펩타이드 형성  
`,

  "09. 생식과 발생": `
## 감수분열
- 염색체 수 n  
- 유전적 다양성 증가 (교차, 독립분리)

## 발생
- 수정 → 분열 → 포배 → 낭배 → 기관형성  
`,

  "10. 항상성": `
## 체온 조절
- 발한, 혈관 확장/수축

## 혈당 조절
- 인슐린(↓), 글루카곤(↑)

## 삼투압 조절
- ADH: 물 재흡수 증가  
`,

  "11. 생태계": `
## 구성
- 생산자 → 소비자 → 분해자  
- 에너지는 흐르고, 물질은 순환

## 개체군
- J형/S형 성장 곡선  
- 상호작용: 경쟁, 포식, 기생, 공생  
`
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
