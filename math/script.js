const md = `
📘 미분적분학(Calculus) 개념 및 공식 정리

1. 🔹 함수와 극한 (Functions & Limits)

✔ 함수(Function)

입력에 대해 하나의 출력이 대응되는 규칙

표기: ( y = f(x) )

✔ 극한(Limit)

함수값이 특정 ( x ) 값에 가까워질 때의 값을 분석

극한 공식

\\[ \\lim_{x\\to a} c = c \\] 
\\[ \\lim_{x\\to a} x = a \\] 
\\[ \\lim_{x\\to a} [f(x) \\pm g(x)] = \\lim f \\pm \\lim g \\]

유명한 극한

\\[ \\lim_{x\\to 0} \\frac{\\sin x}{x} = 1 \\] 
\\[ \\lim_{x\\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2} \\]

2. 🔹 연속성 (Continuity)

✔ 연속 조건 (3-step)

함수 ( f(x) )가 ( x=a )에서 연속이려면:

( \\lim_{x\\to a} f(x) ) 존재

( f(a) ) 정의됨

두 값이 같다

\\[ \\lim_{x\\to a} f(x) = f(a) \\]

3. 🔹 미분(Differentiation)

✔ 미분의 정의

\\[ f'(x) = \\lim_{h\\to 0} \\frac{f(x+h) - f(x)}{h} \\]

✔ 기본 미분 공식

\\[ \\frac{d}{dx} c = 0 \\] 
\\[ \\frac{d}{dx} x^n = nx^{n-1} \\] 
\\[ \\frac{d}{dx} e^x = e^x \\] 
\\[ \\frac{d}{dx} \\ln x = \\frac{1}{x} \\]

✔ 곱의 미분(Product rule)

\\[ (uv)' = u'v + uv' \\]

✔ 몫의 미분(Quotient rule)

\\[ \\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2} \\]

✔ 합성함수 미분(Chain rule)

\\[ (f(g(x)))' = f'(g(x)) \\cdot g'(x) \\]

4. 🔹 주요 함수의 미분 표

함수미분:
- \\( \\sin x \\) → \\( \\cos x \\)
- \\( \\cos x \\) → \\( -\\sin x \\)
- \\( \\tan x \\) → \\( \\sec^2 x \\)
- \\( a^x \\) → \\( a^x \\ln a \\)

5. 🔹 편미분(Partial Derivatives)

✔ 편미분 정의

여러 변수 중 하나만 변화시켜 미분하는 것.

\\[ \\frac{\\partial f}{\\partial x} = f_x,\\quad \\frac{\\partial f}{\\partial y} = f_y \\]

6. 🔹 적분(Integration)

✔ 부정적분

\\[ \\int x^n dx = \\frac{x^{n+1}}{n+1} + C \\]

✔ 정적분(면적)

\\[ \\int_a^b f(x)\\,dx \\]

✔ 치환적분(변수변환)

\\[ u = g(x) \\] 
\\[ \\int f(g(x))g'(x)\\,dx = \\int f(u)\\,du \\]

✔ 부분적분

\\[ \\int u\\,dv = uv - \\int v\\,du \\]

7. 🔹 다중 적분 (Double/Triple Integrals)

✔ 이중적분

\\[ \\iint_R f(x,y)\\,dA \\]

✔ 구하는 순서 변환도 가능:

\\[ \\int_{x=a}^{b} \\int_{y=g_1(x)}^{g_2(x)} f(x,y)\\,dy\\,dx \\]

8. 🔹 기하 응용

접선의 방정식

\\[ y = f(a) + f'(a)(x-a) \\]

극대/극소

\\[ f'(x) = 0 \\Rightarrow \\text{critical points} \\]

오목/볼록

\\[ f''(x) > 0\\Rightarrow \\text{볼록}, \\quad f''(x)<0\\Rightarrow \\text{오목} \\]
`;

// === DOM 요소 참조 ===
const tocList = document.getElementById("toc-list");
const markdownBody = document.getElementById("markdown-body");
const rawText = document.getElementById("raw-text");
const rawContainer = document.getElementById("raw-container");
const toggleRawBtn = document.getElementById("toggle-raw");
const downloadBtn = document.getElementById("download-md");
const searchToc = document.getElementById("search-toc");
const pageTitle = document.getElementById("page-title");

// 렌더 함수
function renderMarkdown(mdText) {
  // heading id를 만드는 renderer 설정
  const renderer = new marked.Renderer();
  renderer.heading = function(text, level, raw, slugger) {
    const id = slugger.slug(text);
    return `<h${level} id="${id}">${text}</h${level}>`;
  };

  marked.setOptions({
    renderer,
    gfm: true,
    breaks: true,
    highlight: function(code, lang) {
      try {
        return hljs.highlightAuto(code, lang ? [lang] : undefined).value;
      } catch (e) {
        return code;
      }
    }
  });

  const html = marked.parse(mdText);
  markdownBody.innerHTML = html;

  // MathJax 렌더 (비동기)
  if (window.MathJax && MathJax.typesetPromise) {
    MathJax.typesetPromise().catch((err) => console.log("MathJax 에러:", err));
  }
}

// 목차 생성 (헤딩 기반)
function buildTOC(mdText) {
  const lines = mdText.split("\n");
  const headingRE = /^(#{1,6})\s+(.*)$/; // 마크다운 # 형태는 사실 여기 없지만 안전장치
  const headings = [];

  // 대신 marked를 이용해 만들어진 HTML에서 h1..h6 찾아도 됨.
  // 여기서는 rendered DOM에서 추출.
  setTimeout(() => {
    const hs = markdownBody.querySelectorAll("h1, h2, h3, h4");
    tocList.innerHTML = "";
    hs.forEach(h => {
      const li = document.createElement("li");
      li.textContent = h.textContent;
      li.dataset.target = h.id;
      li.style.paddingLeft = (parseInt(h.tagName.replace("H","")) - 1) * 8 + "px";
      li.addEventListener("click", () => {
        document.getElementById(h.id).scrollIntoView({ behavior: "smooth", block: "start" });
      });
      tocList.appendChild(li);
    });
  }, 50);
}

// 토글 원문
toggleRawBtn.addEventListener("click", () => {
  rawContainer.classList.toggle("hidden");
});

// MD 다운로드
downloadBtn.addEventListener("click", () => {
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "calculus.md";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
});

// 목차 검색
searchToc.addEventListener("input", (e) => {
  const q = e.target.value.trim().toLowerCase();
  tocList.querySelectorAll("li").forEach(li => {
    const txt = li.textContent.toLowerCase();
    li.style.display = txt.includes(q) ? "" : "none";
  });
});

// 페이지 초기화
function init() {
  rawText.textContent = md;
  renderMarkdown(md);
  buildTOC(md);
  pageTitle.textContent = "미분적분학 — 개념 정리";
}

init();