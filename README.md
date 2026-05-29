# 놀퀴즈 점프맵

GitHub Pages 같은 웹 호스팅에 바로 올릴 수 있는 독립 점프맵 게임입니다.

## 포함 범위
- 로그인, 학급, 랭킹, 저장 화면 없음
- 플레이 인원은 전자칠판 플레이 화면 가독성을 위해 1-4명 지원
- 결과는 저장하지 않고 화면에서 바로 확인
- 선택한 1-10분 타이머가 끝나면 즉시 결과 화면으로 이동
- `assets/maps/jumpmap-01.json`의 원본 맵 구조와 히트박스를 그대로 사용
- 키보드와 터치 버튼으로 좌/우 이동, 점프 조작 지원

## 실행
```bash
cd /Users/baekjiyun/Desktop/WAN/apps/knolquiz-jumpmap-local
python3 -m http.server 4271 --bind 127.0.0.1
```

브라우저에서 `http://127.0.0.1:4271/`을 엽니다.

## 검증
```bash
node --check app.js
```

반응형 화면은 1920x1080, 1366x768, 1024x768, 820x1180, 390x844에서 시작/플레이/결과 화면을 확인합니다.

## 배포
이 디렉터리 전체를 GitHub Pages, Netlify, Cloudflare Pages 같은 웹 호스팅에 배포하면 됩니다.
