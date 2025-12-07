// 📌 Markdown 텍스트 (일반화학 상세 정리)
const md = `
# 🔬 일반화학(General Chemistry) 핵심 정리

---

## 📌 1. 원자의 구조 (Atomic Structure)

### 원자 구성 입자
- **양성자(p⁺)** : +1 전하, 질량 1 amu
- **중성자(n⁰)** : 전하 없음, 질량 1 amu
- **전자(e⁻)** : -1 전하, 질량 거의 0

### 핵자수(질량수)
\`A = Z + N\`
- **Z** = 원자번호(양성자 수)
- **N** = 중성자 수

### 동위원소(isotopes)
- **양성자 수는 같고, 중성자 수만 다른 원자**
- 예: \`¹²C, ¹³C, ¹⁴C\`

### 평균 원자량 계산
\`원자량 = Σ(동위원소비 × 질량)\`

---

## 📌 2. 전자배치 (Electron Configuration)

### 오비탈 배치 순서
\`1s → 2s → 2p → 3s → 3p → 4s → 3d → 4p...\`

### 헌트 규칙
- 같은 에너지의 오비탈은 **홀전자 우선 배치**

### 파울리 배타 원리
- 하나의 오비탈에는 **반대 스핀 전자 2개만 존재**

### 안정한 전자배치
- 8족 원소는 \`ns² np⁶\` (완전 안정)
- 전이금속은 \`d 오비탈이 예외적\`
  - 예: Cr, Cu

---

## 📌 3. 주기율표와 원소 성질 (Periodic Trends)

### 주기적 성질 변화 (왼→오, 위→아래)

| 성질 | 주기(→) | 족(↓) |
|------|----------|---------|
| 원자반지름 | 감소 | 증가 |
| 이온화에너지 | 증가 | 감소 |
| 전기음성도 | 증가 | 감소 |
| 금속성 | 감소 | 증가 |

### 전기음성도 (EN)
- F > O > N > Cl > Br > S > C > H

---

## 📌 4. 화학 결합 (Chemical Bonding)

### 이온 결합
- 금속(양이온) + 비금속(음이온)
- 전자를 **완전히 이동**

### 공유 결합
- 비금속 + 비금속  
- 전자를 **공유**

### 극/무극 판단
- EN 차이로 결정
- EN 차이 0.5~1.7 → **극성 공유**
- 0~0.5 → **무극성 공유**

### 루이스 구조 그리기 순서
1. 전자 수 계산
2. 중심원자 결정(EN 낮은 것)
3. 단일결합 배치
4. 옥텟 완성
5. 부족하면 다중결합

---

## 📌 5. 분자 구조와 VSEPR 이론

### 전자쌍 배치 vs 분자 기하
| 전자쌍 형태 | 분자 형태 | 예시 |
|-------------|--------------|---------|
| AX2 | 선형 | CO2 |
| AX3 | 평면삼각형 | BF3 |
| AX4 | 정사면체 | CH4 |
| AX3E | 삼각뿔 | NH3 |
| AX2E2 | 굽은형 | H2O |

---

## 📌 6. 기체의 성질 (Gas Laws)

### 이상기체 상태방정식
\`PV = nRT\`

- P: 압력
- V: 부피
- n: 몰수
- R: 기체상수 (0.08206 L·atm/mol·K)
- T: 절대온도(K)

### 개별 법칙
- **보일 법칙**: $begin:math:text$ P ∝ 1\/V $end:math:text$
- **샤를의 법칙**: $begin:math:text$ V ∝ T $end:math:text$
- **아보가드로 법칙**: $begin:math:text$ V ∝ n $end:math:text$

---

## 📌 7. 용액과 농도 (Solutions)

### 농도 단위
- 몰농도(M) = mol / L
- 몰분율(X)
- % 농도 (w/w, w/v)
- 몰랄농도(m) = mol / kg

### 콜리게이티브 성질
- 끓는점 상승
- 어는점 내림
- 삼투압

### 어는점 내림
\`ΔTf = Kf × m\`

---

## 📌 8. 열화학 (Thermochemistry)

### 엔탈피 변화(ΔH)
- ΔH < 0 → 발열
- ΔH > 0 → 흡열

### 헤스의 법칙
반응의 전체 ΔH = 여러 단계의 ΔH 합

### 결합에너지 계산
\`ΔH ≈ (끊는 결합 에너지 합) - (생성 결합 에너지 합)\`

---

## 📌 9. 화학 평형 (Equilibrium)

### 평형상수 K
\`K = [생성물]^계수 / [반응물]^계수\`

### Q vs K
- Q < K → 우측 진행
- Q > K → 좌측 진행

### 르샤틀리에 원리
- 농도 변화
- 압력 변화
- 온도 변화

---

## 📌 10. 산과 염기 (Acid–Base)

### 아레니우스 정의
- 산: H⁺ 생성
- 염기: OH⁻ 생성

### 브뢴스테드–로우리 정의
- 산: H⁺ 공여
- 염기: H⁺ 수용

### 루이스 정의
- 산: **전자쌍 받음**
- 염기: **전자쌍 줌**

### pH 계산
\`pH = -log[H⁺]\`

강산의 예:
- 강산: HCl, HBr, HI, HNO3, H2SO4
- 강염기: NaOH, KOH

---

## 📌 11. 산화·환원 (Redox)

### 산화수 정의
- 산화: 산화수 증가
- 환원: 산화수 감소

### 산화제/환원제
- 산화제: 전자를 받는 물질
- 환원제: 전자를 주는 물질

### 반쪽 반응식
예: Zn + Cu²⁺ → Zn²⁺ + Cu  
- Zn: 산화  
- Cu²⁺: 환원  

---

## 📌 12. 반응 속도

### 반응 속도에 영향을 주는 요인
- 농도
- 온도
- 촉매
- 표면적

### 속도식
\`rate = k[A]^m[B]^n\`

---

## 📌 13. 화학반응의 자발성

### 깁스 자유에너지
\`ΔG = ΔH - TΔS\`

- ΔG < 0 → **자발적**
- ΔG > 0 → **비자발적**

---

## 📌 14. 핵화학 (Nuclear Chemistry)

### 방사선 종류
- α: 헬륨핵(2⁺)
- β: 전자
- γ: 고에너지 광자

### 반감기
\`N = N₀(1/2)^{t/t₁/₂}\`

---

`;

// ----------------------------
// 📌 목차 생성
// ----------------------------
function buildTOC(mdText) {
  const lines = mdText.split("\n");
  let toc = "";
  lines.forEach(line => {
    if (line.startsWith("## ")) {
      const title = line.replace("## ", "");
      toc += `<li data-target="${title}">${title}</li>`;
    }
  });
  document.querySelector(".toc ul").innerHTML = toc;
}


// ----------------------------
// 📌 Markdown → HTML 변환
// ----------------------------
function renderMarkdown(mdText) {
  const html = marked.parse(mdText);
  document.querySelector(".markdown-body").innerHTML = html;
}


// ----------------------------
// 📌 검색 기능
// ----------------------------
function setupSearch() {
  const input = document.querySelector("#search");
  input.addEventListener("input", () => {
    const q = input.value.toLowerCase();
    document.querySelectorAll(".toc li").forEach(li => {
      const t = li.textContent.toLowerCase();
      li.style.display = t.includes(q) ? "" : "none";
    });
  });
}


// ----------------------------
// 📌 초기 실행
// ----------------------------
function init() {
  document.querySelector("#rawText").textContent = md;
  renderMarkdown(md);
  buildTOC(md);
  setupSearch();
}

init();