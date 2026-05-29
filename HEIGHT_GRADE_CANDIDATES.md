# Jumpmap Height Grade Candidates

This is a planning reference. The "Current In-Game Title Badge System" section mirrors the live result screen.

## Current Map Scale Notes

- Current app display formula: `displayMeters = climbPixels / 100`.
- Current `jumpmap-01.json` supports about `115.5m` by the app display formula.
- If the character is treated as `1.5m` tall using the current runtime-scaled hitbox, the same map is about `108.9m`.
- Before implementation, choose one height system and keep all grade labels in that same system.

## Band Rule

- Use continuous bands with no empty gaps.
- Lower bound is inclusive, upper bound is exclusive: `0 <= h < 4`, `4 <= h < 10`.
- The final band can include its upper bound if needed.
- Remove amusement rides from the candidate pool.
- Prefer Korean cultural heritage, historical landmarks, natural monuments, and well-known Korean buildings.

## Current In-Game Title Badge System

The live result screen currently treats the character-specific title as the actual grade. The visual grade badge stays on the result card, but separate abstract names such as `첫 도약급` are not shown as the player-facing grade.

| Height band | Sejong grade title | Yi Sun-sin grade title |
| --- | --- | --- |
| `0m ~ 4m` | `집현전 새내기` | `수군 훈련병` |
| `4m ~ 10m` | `별을 헤아린 학자` | `항로를 익힌 수군` |
| `10m ~ 15m` | `글을 다듬는 학자` | `바다를 읽는 장수` |
| `15m ~ 25m` | `훈민정음 연구자` | `수군 훈련대장` |
| `25m ~ 35m` | `백성을 살핀 임금` | `판옥선 지휘관` |
| `35m ~ 50m` | `집현전의 별` | `한산도 전략가` |
| `50m ~ 70m` | `나라를 세운 지혜` | `나라를 지킨 장수` |
| `70m ~ 90m` | `문치를 펼친 성군` | `불패의 수군 지휘관` |
| `90m ~ 115m` | `한글을 밝힌 대왕` | `바다를 지킨 충무공` |
| `115m+` | `새 하늘을 연 대왕` | `정상에 선 충무공` |

The live badge image set has five pixel-game jumpmap subjects shared across the existing title bands: first platform, platform tower, highland ledges, summit flag, and new-record crown.

## Era-Symbol Candidate Pool

These candidates are useful when the grade name should remind players of a historical period, not just a height.

| Period or theme | Candidate labels | Height | Fit |
| --- | --- | --- | --- |
| Paleolithic | `주먹도끼급` | specimen-dependent, usually under `0.3m` | Good as a symbolic starter, but too small for a height milestone unless a specific museum specimen is selected. |
| Neolithic | `빗살무늬토기급` | specimen-dependent, usually under `1m` | Good historical symbol. Pick a specific artifact if this becomes a real grade. |
| Bronze Age | `고인돌급` | `2.6m` for Ganghwa Bugeun-ri dolmen | Strongest early-period candidate. Easy to understand and visually clear. |
| Bronze Age | `반달돌칼급` / `비파형동검급` | specimen-dependent, usually under `1m` | Better for quiz or badge flavor than height grades unless a specific specimen is chosen. |
| Silla / Unified Silla | `성덕대왕신종급` | `3.75m` | Strong 0m~4m candidate. Represents Unified Silla craftsmanship well. |
| Silla / Unified Silla | `첨성대급` | `9.17m` | Very strong 4m~10m candidate. Period symbol and height work well together. |
| Unified Silla | `다보탑급` / `석가탑급` | `10.4m~10.75m` | Strong 10m~15m candidates. Familiar and height-appropriate. |
| Baekje | `정림사지 오층석탑급` | `8.33m` | Good 4m~10m Baekje candidate. |
| Baekje | `미륵사지 석탑급` | `14.24m` | Good 10m~15m Baekje candidate. |
| Goryeo | `월정사 팔각구층석탑급` | `15.2m` | Good Goryeo candidate at the 15m boundary. |
| Goryeo | `청자 상감운학문 매병급` | `0.421m` | Good symbolic starter, but visually less height-like. |
| Joseon | `수원화성 성벽급` | `4m~6m` | Strong Joseon architecture candidate for the 4m~10m band. |
| Joseon | `독립문급` | `14.28m` | Late Joseon / modern transition symbol. Good 10m~15m candidate. |
| Joseon | `근정전급` | `25m` | Strong palace architecture candidate at the 25m boundary. |
| Modern Korea | `겨레의탑급` | `51m` | Strong modern historical-symbol candidate. |
| Modern Korea | `삼일빌딩급` | `약 110m` | Good current-map ceiling candidate, but modern-building tone is different from heritage labels. |

Avoid using `종묘 정전급` as a height grade until a reliable height is selected. It is historically excellent, but the commonly cited dimension is length, not height.

## Height-Ordered Era-Symbol Candidates

This table sorts the era-symbol candidates by height so the final grade list can be chosen from low to high.

| Height band | Candidate | Height | Period or theme | Grade-label fit |
| --- | --- | --- | --- | --- |
| `0m ~ 1m` | `청자 상감운학문 매병급` | `0.421m` | Goryeo | Strong period symbol, but too small for a physical height milestone unless used as the very first grade. |
| `0m ~ 1m` | `금동미륵보살반가사유상급` | `0.935m` | Three Kingdoms / Silla-Baekje Buddhist art | Recognizable in textbooks, but long as a label. |
| `0m ~ 1m` | `주먹도끼급` / `빗살무늬토기급` / `반달돌칼급` / `비파형동검급` | specimen-dependent | Paleolithic / Neolithic / Bronze Age | Good for badges or quiz flavor. Use as height grades only after selecting exact specimens. |
| `1m ~ 4m` | `고인돌급` | `2.6m` | Bronze Age | Best early-grade label. Short, visual, and period-representative. |
| `1m ~ 4m` | `보신각종급` | `3.18m` | Joseon | Good city-history option. Less period-representative than `고인돌급`. |
| `1m ~ 4m` | `석굴암 본존불급` | `3.26m~3.45m` | Unified Silla | Strong cultural heritage label, but may overlap with Buddhist sculpture content. |
| `1m ~ 4m` | `성덕대왕신종급` | `3.75m` | Unified Silla | Very good 0m~4m upper label. |
| `4m ~ 10m` | `수원화성 성벽급` | `4m~6m` | Joseon | Good architecture label. Height varies by section. |
| `4m ~ 10m` | `포항 보경사 승탑급` | `4.5m` | Goryeo / Buddhist heritage | Good but less widely known. |
| `4m ~ 10m` | `세종대왕 동상급` | `6.2m` | Modern monument / Joseon figure | Good because the game uses historical figures. |
| `4m ~ 10m` | `이순신 장군 동상급` | `6.5m` | Modern monument / Joseon figure | Good because the game uses historical figures. |
| `4m ~ 10m` | `정림사지 오층석탑급` | `8.33m` | Baekje | Strong Baekje architecture candidate. |
| `4m ~ 10m` | `첨성대급` | `9.17m` | Silla | Best 4m~10m label. Familiar, short, and height-appropriate. |
| `4m ~ 10m` | `세종대왕 동상 전체급` | `9.5m` | Modern monument / Joseon figure | Useful alternative if monument height includes pedestal. |
| `10m ~ 15m` | `주문진 등대급` | `10m` | Modern / Gangneung landmark | Good local-flavor option, but less historical. |
| `10m ~ 15m` | `다보탑급` | `10.4m` | Unified Silla | Strong and familiar. |
| `10m ~ 15m` | `석가탑급` | `10.4m~10.75m` | Unified Silla | Strong and familiar. |
| `10m ~ 15m` | `예천 석송령급` | `11m` | Natural monument | Good tree option, but less famous nationally. |
| `10m ~ 15m` | `원각사지 십층석탑급` | `약 12m` | Joseon | Good Seoul heritage option. |
| `10m ~ 15m` | `경천사지 십층석탑급` | `13.5m` | Goryeo | Strong museum-linked Goryeo option. |
| `10m ~ 15m` | `미륵사지 석탑급` | `14.24m` | Baekje | Best Baekje upper-early grade. |
| `10m ~ 15m` | `독립문급` | `14.28m` | Late Joseon / modern transition | Strong history-classroom label. |
| `10m ~ 15m` | `정이품송급` | `14.5m` | Natural monument | Very memorable tree candidate. |
| `15m ~ 25m` | `월정사 팔각구층석탑급` | `15.2m` | Goryeo | Good Goryeo grade, but label is long. |
| `15m ~ 25m` | `이순신 장군 동상 전체급` | `17m` | Modern monument / Joseon figure | Good if using total monument height. |
| `15m ~ 25m` | `은진미륵급` | `18.12m` | Goryeo | Visually memorable, but may be less familiar to younger students. |
| `15m ~ 25m` | `보은 삼년산성 성벽급` | `최고 22m` | Silla | Good fortress candidate, but exact grade needs wording because it is the highest wall section. |
| `15m ~ 25m` | `팔상전급` | `22.7m` | Joseon / Buddhist architecture | Strong wooden-architecture candidate. |
| `15m ~ 25m` | `세계평화의문급` | `24m` | Modern landmark | Good modern option, but less aligned with ancient-to-Joseon flow. |
| `25m ~ 35m` | `근정전급` | `25m` | Joseon | Best palace-architecture candidate. |
| `25m ~ 35m` | `DDP급` | `29m` | Modern Seoul landmark | Familiar, but modern tone differs from heritage labels. |
| `25m ~ 35m` | `반계리 은행나무급` | `32m` | Natural monument | Strong tree option. |
| `35m ~ 50m` | `용문사 은행나무급` | `42m` | Natural monument | Strong high tree option. |
| `35m ~ 50m` | `국립중앙박물관급` | `43.08m` | Modern cultural institution | Good cultural-institution option. |
| `35m ~ 50m` | `겨레의집급` | `45m` | Modern historical memorial | Good modern-history option. |
| `50m ~ 70m` | `겨레의탑급` | `51m` | Modern historical memorial | Best 50m-level historical label. |
| `50m ~ 70m` | `국회의사당급` | `약 64m` | Modern national institution | Familiar but civic-building tone. |
| `70m ~ 90m` | `황룡사 구층목탑급` | `추정 약 80m` | Silla | Best high-grade historical label, but mark as estimated. |
| `70m ~ 90m` | `경주타워급` | `82m` | Modern / Silla-inspired landmark | Good fallback if estimated ancient height feels risky. |
| `90m ~ 115m` | `삼일빌딩급` | `약 110m` | Modern Korean architecture | Fits current map ceiling. |

## Suggested Grade Bands And Candidates

| Band | Candidate labels | Notes |
| --- | --- | --- |
| `0m ~ 4m` | `청자 상감운학문 매병급` `0.421m` / `금동미륵보살반가사유상급` `0.935m` / `강화 부근리 지석묘급` `2.6m` / `보신각종급` `3.18m` / `석굴암 본존불급` `3.26m~3.45m` / `성덕대왕신종급` `3.75m` | Small-object band. Good early feedback. `고인돌급` and `성덕대왕신종급` are the most readable historical labels here. |
| `4m ~ 10m` | `포항 보경사 승탑급` `4.5m` / `석굴암 본존불 대좌 포함급` `약 5m` / `수원화성 성벽급` `4m~6m` / `세종대왕 동상급` `6.2m` / `이순신 장군 동상급` `6.5m` / `부여 정림사지 오층석탑급` `8.33m` / `첨성대급` `9.17m` / `세종대왕 동상 전체급` `9.5m` | `첨성대급` is the strongest recognizable label. `수원화성 성벽급` adds a Joseon architecture option. |
| `10m ~ 15m` | `주문진 등대급` `10m` / `다보탑급` `10.4m` / `석가탑급` `10.4m~10.75m` / `예천 석송령급` `11m` / `원각사지 십층석탑급` `약 12m` / `경천사지 십층석탑급` `13.5m` / `익산 미륵사지 석탑급` `14.24m` / `독립문급` `14.28m` / `정이품송급` `14.5m` | Dense heritage band. Pick one or two, not all. `다보탑급`, `석가탑급`, `미륵사지 석탑급`, `독립문급`, `정이품송급` are the best candidates. |
| `15m ~ 25m` | `월정사 팔각구층석탑급` `15.2m` / `이순신 장군 동상 전체급` `17m` / `은진미륵급` `18.12m` / `보은 삼년산성 성벽급` `최고 22m` / `법주사 팔상전급` `22.7m` / `세계평화의문급` `24m` | `월정사 팔각구층석탑급` gives this band a clear Goryeo option. `은진미륵급` is visually memorable. |
| `25m ~ 35m` | `근정전급` `25m` / `DDP급` `29m` / `반계리 은행나무급` `32m` | Good breathing band. `근정전급` is the strongest historical architecture label here. |
| `35m ~ 50m` | `용문사 은행나무급` `42m` / `국립중앙박물관급` `43.08m` / `독립기념관 겨레의집급` `45m` | Strong mid-high band. `용문사 은행나무급` and `겨레의집급` are both readable. |
| `50m ~ 70m` | `독립기념관 겨레의탑급` `51m` / `국회의사당급` `약 64m` | `겨레의탑급` is the better history-oriented label. |
| `70m ~ 90m` | `황룡사 구층목탑급` `추정 약 80m` / `경주타워급` `82m` | Good upper band. `황룡사 구층목탑급` is the most culturally coherent label, but mark it as estimated. |
| `90m ~ 115m` | `삼일빌딩급` `약 110m` | Fits current map ceiling. It is a modern landmark rather than ancient heritage. |
| `115m+` | `부산타워급` `120m` / `N서울타워급` `236.7m` / `63빌딩급` `249m` / `롯데월드타워급` `555m` | Future map expansion only. These exceed the current practical map height. |

## Recommended Compact Set

If the game needs a clean, memorable list instead of many alternatives:

1. `고인돌급` - about `2.6m`
2. `성덕대왕신종급` - about `3.75m`
3. `첨성대급` - about `9.17m`
4. `다보탑급` - about `10.4m`
5. `미륵사지 석탑급` - about `14.24m`
6. `독립문급` - about `14.28m`
7. `월정사 팔각구층석탑급` - about `15.2m`
8. `은진미륵급` - about `18.12m`
9. `근정전급` - about `25m`
10. `반계리 은행나무급` - about `32m`
11. `용문사 은행나무급` - about `42m`
12. `겨레의탑급` - about `51m`
13. `황룡사 구층목탑급` - about `80m`
14. `삼일빌딩급` - about `110m`

## Implementation Notes For Later

- Keep data as structured config rather than hard-coded text in rendering functions.
- A future config shape could be:

```js
const HEIGHT_GRADES = [
  { min: 0, max: 4, label: '고인돌급', referenceHeightM: 2.6 },
  { min: 4, max: 10, label: '첨성대급', referenceHeightM: 9.17 }
];
```

- If the map is recalibrated from `px / 100` to a character-height-based meter scale, review every threshold before shipping.
- Avoid exact boundary surprises by using `min <= height && height < max`, except the final grade.

## Source Notes

The heights below were collected as planning references and should be rechecked before final release copy.

- 강화 부근리 지석묘: `2.6m` - https://www.segye.com/newsView/20140331001625
- 보신각종: `3.18m` - https://encykorea.aks.ac.kr/Article/E0028001
- 석굴암 본존불: `3.26m~3.45m`, 대좌 포함 about `5m` - https://www.mk.co.kr/news/columnists/9571240, https://buddhaland.dongguk.edu/article?dataId=KBA0006116, https://koreahistoryhub.com/article/bulguksa-seokguram-guide
- 성덕대왕신종: `3.75m` - https://www.okhsnews.com/news/articleView.html?idxno=22146
- 포항 보경사 승탑: `4.5m` - https://dh.aks.ac.kr/~heritage/wiki/index.php/%ED%8F%AC%ED%95%AD_%EB%B3%B4%EA%B2%BD%EC%82%AC_%EC%8A%B9%ED%83%91
- 수원화성 성벽: `4m~6m` - https://openlanguage.org.au/wp-content/uploads/2020/04/SS-01-Suwon-Hwaseong-Fortess.pdf
- 세종대왕 동상: `6.2m`, total with base about `9.5m` - https://www.khan.co.kr/article/200904161311491/
- 이순신 장군 동상: `6.5m`, total with base about `17m` - https://www.donga.com/news/amp/all/20101224/33479292/2, https://designdb.com/usr/upload/board/zboardphotogallery176/20240320115659946_4919.0.pdf
- 부여 정림사지 오층석탑: `8.33m` - https://contents.history.go.kr/mobile/kc/view.do?code=kc_age_10&levelId=kc_r100430
- 첨성대: `9.17m` - https://www.donga.com/news/Society/article/all/20160601/78428504/1
- 주문진 등대: `10m` - https://m.tripinfo.co.kr/info.html?content_id=129179&content_type_id=12
- 다보탑: `10.4m` - https://www.donga.com/news/Culture/article/all/20080204/8541079/1
- 석가탑: `10.4m~10.75m`, source values vary - https://www.korea.kr/news/policyNewsView.do?newsId=75082586, https://yoda.wiki/wiki/Seokgatap
- 예천 석송령: `11m` - https://dh.aks.ac.kr/~heritage/wiki/index.php/%EC%98%88%EC%B2%9C_%EC%B2%9C%ED%96%A5%EB%A6%AC_%EC%84%9D%EC%86%A1%EB%A0%B9
- 원각사지 십층석탑: about `12m` - https://v.daum.net/v/Qr0vOA5T50
- 경천사지 십층석탑: `13.5m` - https://www.chosun.com/national/weekend/2025/09/13/BWUPJ2KLJBA4BAYGDFVE43QMII/?outputType=amp
- 익산 미륵사지 석탑: `14.24m` - https://www.chosun.com/site/data/html_dir/2004/03/20/2004032070040.html
- 독립문: `14.28m` - https://www.tel-co.net/travel/spot/1226
- 정이품송: `14.5m` - https://ent.sbs.co.kr/m/article.do?article_id=E10007740024
- 월정사 팔각구층석탑: `15.2m` - https://senior.chosun.com/site/data/html_dir/2018/03/15/2018031502272.html
- 은진미륵, 논산 관촉사 석조미륵보살입상: `18.12m` - https://nonsan.grandculture.net/nonsan/toc/GC02000317
- 보은 삼년산성 성벽: highest about `22m` - https://dh.aks.ac.kr/~heritage/wiki/index.php/%EB%B3%B4%EC%9D%80_%EC%82%BC%EB%85%84%EC%82%B0%EC%84%B1
- 법주사 팔상전: `22.7m` - https://kf.or.kr/kfNewsletter/mgzinSubViewPage.do?langTy=KOR&mgzinSubSn=2354
- 세계평화의문: `24m` - https://www.ksponco.or.kr/menu.es?mid=a10405060900
- 경복궁 근정전: `25m` - https://www.chosun.com/site/data/html_dir/2003/11/10/2003111070309.html?outputType=amp
- DDP: `29m` - https://korean.visitkorea.or.kr/detail/rem_detail.do?cotid=242ab80d-67e1-4dc8-a07a-4667955c2e59
- 원주 반계리 은행나무: `32m` - https://www.donga.com/news/Society/article/all/20240125/123238303/1
- 용문사 은행나무: `42m` - https://contents.premium.naver.com/namurok/namurok1/contents/251113233457951bd
- 국립중앙박물관 본관: `43.08m` - https://www.museum.go.kr/site/main/content/facilities_overview
- 독립기념관 겨레의탑: `51m` - https://www.i815.or.kr/2017/tour/course_new.php
- 황룡사 구층목탑: estimated about `80m` - https://koya-culture.com/news/article.html?no=134260
- 경주타워: `82m` - https://www.khan.co.kr/article/200706051806481
- 삼일빌딩: about `110m` - https://www.seoul.co.kr/news/plan/seoulgrand/2018/12/13/20181213018005
- 부산타워: `120m` - https://www.koreatriptips.com/tourist-attractions/1277679.html
- N서울타워: `236.7m` - https://encykorea.aks.ac.kr/Article/E0028071
