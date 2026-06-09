import './assets/runtime/jumpmap-test-physics-utils.js?v=20260601-runtime-step-lite';
import { JumpmapRuntimeGeometry } from './assets/runtime/jumpmap-runtime-geometry.js?v=20260601-runtime-step-lite';
import { JumpmapRuntimePhysics } from './assets/runtime/jumpmap-runtime-physics.js?v=20260601-runtime-step-lite';

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const PLAYER_COUNTS = [1, 2, 3, 4];
const PHONE_MAX_PLAYERS = 1;
const TABLET_MAX_PLAYERS = 2;
const WIDE_MAX_PLAYERS = 4;
const DISPLAY_MODES = Object.freeze([
  { id: 'auto', label: '자동' },
  { id: 'mobile', label: '모바일' },
  { id: 'tablet', label: '태블릿' },
  { id: 'wide', label: '웹/전자칠판' }
]);
const MULTIPLAYER_KEYBOARD_CONTROLS = Object.freeze([
  { left: ['ArrowLeft'], right: ['ArrowRight'], jump: ['ArrowUp', 'Space'] },
  { left: ['KeyA', 'a', 'A'], right: ['KeyD', 'd', 'D'], jump: ['KeyW', 'w', 'W'] },
  { left: ['KeyJ', 'j', 'J'], right: ['KeyL', 'l', 'L'], jump: ['KeyI', 'i', 'I'] },
  { left: ['Numpad4', '4'], right: ['Numpad6', '6'], jump: ['Numpad8', '8'] }
]);
const PHONE_WIDTH_BREAKPOINT = 640;
const WIDE_WIDTH_BREAKPOINT = 1200;
const PLAY_MINUTES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const FALL_RESPAWN_PAD = 260;
const QUIZ_GAUGE_START_AMOUNT = 100;
const QUIZ_GAUGE_DISPLAY_CAP = 100;
const QUIZ_MOVE_COST_PER_SEC = 4;
const QUIZ_JUMP_COST = 14.5;
const QUIZ_DOUBLE_JUMP_COST = 14.5;
const QUIZ_CORRECT_REWARD = 64;
const QUIZ_WRONG_REWARD = 0;
const QUIZ_BATCH_SIZE = 3;
const QUIZ_AUTO_ADVANCE_MS = 900;
const QUIZ_WRONG_DELAY_MS = 3000;
const QUIZ_OPEN_INPUT_GUARD_MS = 360;
const GAUGE_EPSILON = 0.000001;
const RUNTIME_MOVE_SPEED_SCALE = 0.9;
const RUNTIME_AIRTIME_SCALE = 1.1;
const RUNTIME_VERTICAL_SPEED_SCALE = 1 / RUNTIME_AIRTIME_SCALE;
const JUMP_INPUT_BUFFER_MS = 70;
const PHYSICS_FIXED_STEP_SEC = 1 / 60;
const MAX_FRAME_DELTA_SEC = 0.1;
const MAX_PHYSICS_STEPS_PER_FRAME = 6;
const WALK_FRAME_INTERVAL_SEC = 0.12;
const SPRITE_GROUND_LATCH_SEC = 0.12;
const SPRITE_MOVE_LATCH_SEC = 0.08;
const SPRITE_GROUND_PROBE_INTERVAL_SEC = 1 / 30;
const LANDING_DUST_LIFE_SEC = 0.46;
const LANDING_DUST_MAX_PARTICLES = 28;
const BEST_HEIGHT_NOTICE_MS = 1100;
const PLAY_UI_UPDATE_INTERVAL_MS = 90;
const QUIZ_ACTION_UPDATE_INTERVAL_MS = 90;
const TEST_DATASET_SYNC_INTERVAL_MS = 250;
const MAP_OBJECT_DRAW_BIN_SIZE = 520;
const MAP_OBJECT_CHUNK_SIZE = 512;
const MAP_OBJECT_CHUNK_CACHE_LIMIT = 96;
const MAP_OBJECT_CHUNK_MAX_PROJECTOR_SCALE = 1.08;
const MAP_OBJECT_CHUNK_PREPARE_BUDGET_MS = 5;
const MAP_OBJECT_CHUNK_QUEUE_LIMIT = 72;
const MAP_OBJECT_CHUNK_AHEAD_WIDTH = 2200;
const MAP_OBJECT_CHUNK_AHEAD_HEIGHT = 3600;
const MAP_OBJECT_PREWARM_WIDTH = 3200;
const MAP_OBJECT_PREWARM_ABOVE = 5600;
const MAP_OBJECT_PREWARM_BELOW = 900;
const RENDER_SCALE_MIN = 0.72;
const RENDER_SCALE_MAX = 1;
const RENDER_SCALE_DROP_STEP = 0.1;
const RENDER_SCALE_RECOVER_STEP = 0.05;
const RENDER_PERF_SAMPLE_MS = 1400;
const RENDER_PERF_RECOVER_MS = 4200;
const RENDER_SLOW_FRAME_MS = 26;
const RENDER_VERY_SLOW_FRAME_MS = 38;
const RENDER_STABLE_FRAME_MS = 17.5;
const IDLE_PHYSICS_SPEED_EPS = 0.02;
const MIN_START_LOADING_MS = 7600;
const LOADING_SPRITE_FRAME_MS = 120;
const LOADING_FACT_ROTATE_MS = 4600;
const PRELOAD_IMAGE_DECODE_TIMEOUT_MS = 450;
const PRELOAD_IMAGE_CONCURRENCY = 3;
const PRELOAD_IMAGE_YIELD_EVERY = 6;
const JUMPMAP_BGM_SRC = './assets/music/viacheslavstarostin-game-gaming-video-game-music-471936.mp3';
const JUMPMAP_BGM_VOLUME = 0.45;
const PLAYER_LABEL_COLORS = ['#38bdf8', '#f97316', '#22c55e', '#d946ef'];
const OTHER_PLAYER_SPRITE_ALPHA = 0.28;
const OTHER_PLAYER_LABEL_ALPHA = 0.14;
const DEFAULT_PLAY_MINUTES = 2;
const WEAKNESS_PRACTICE_MIN_READY_MS = 650;
const PLAYER_SPRITE_LOGICAL_SIZE = 256;
const RANDOM_CHARACTER_ID = 'random';
const RANDOM_CHARACTER_OPTION = {
  id: RANDOM_CHARACTER_ID,
  label: '랜덤'
};
const MAP_CANVAS_CONTEXT_OPTIONS = Object.freeze({});
const BACKGROUND_CANVAS_CONTEXT_OPTIONS = Object.freeze({ alpha: false, desynchronized: true });
const CHUNK_CANVAS_CONTEXT_OPTIONS = Object.freeze({ alpha: true, desynchronized: true });

const QUIZ_PACKS = [
  {
    id: 'gugudan',
    label: '구구단',
    kind: 'csv',
    path: './assets/quiz/data/gugudan-2to9.csv'
  },
  {
    id: 'division-gugudan',
    label: '나눗셈(구구단)',
    kind: 'csv',
    path: './assets/quiz/data/division-gugudan-2to9.csv'
  },
  {
    id: 'make-10-addition',
    label: '더해서 10 만들기',
    kind: 'csv',
    path: './assets/quiz/data/make-10-addition.csv'
  },
  {
    id: 'make-100-addition',
    label: '더해서 100 만들기',
    kind: 'csv',
    path: './assets/quiz/data/make-100-addition.csv'
  },
  {
    id: 'make-10-100-1000-multiplication',
    label: '10·100·1000 만들기 곱셈',
    kind: 'csv',
    path: './assets/quiz/data/make-10-100-1000-multiplication.csv'
  },
  {
    id: 'desk-chair-patterns',
    label: '규칙과 대응: 책상과 의자',
    kind: 'json',
    path: './assets/quiz/data/desk-chair-pattern-questions.json'
  },
  {
    id: 'facecolor',
    label: '전개도: 평행한 면',
    kind: 'json',
    path: './assets/quiz/data/facecolor-questions.json'
  },
  {
    id: 'edgecolor',
    label: '전개도: 맞물리는 모서리',
    kind: 'json',
    path: './assets/quiz/data/edgecolor-questions.json'
  },
  {
    id: 'validity',
    label: '전개도: 올바른 전개도',
    kind: 'json',
    path: './assets/quiz/data/validity-questions.json'
  }
];

const PRACTICE_RECORD_CONFIGS = Object.freeze({
  gugudan: Object.freeze({
    key: 'gugudan',
    packId: 'gugudan',
    sourceLabel: '구구단',
    filenamePrefix: '구구단',
    statusTitle: '내 구구단 상태',
    reportTitle: '내 구구단 상태',
    recordTitle: '구구단 학습 기록 저장',
    recordUnavailableText: '구구단 1인 플레이 결과에서만 기록을 저장할 수 있습니다.',
    emptyText: '아직 저장할 구구단 풀이 기록이 없습니다.',
    missingText: '구구단 학습 기록을 찾을 수 없습니다.',
    mergeTitle: '구구단 기록 합치기',
    weakGroupTitle: '많이 틀린 구구단 단수',
    weakFactTitle: '많이 틀린 곱셈',
    groupSectionTitle: '단별 상태',
    groupSectionCaption: '2단부터 9단까지 누적 결과',
    heatmapTitle: '구구단 지도',
    heatmapAria: '2단부터 9단까지 구구단 문항별 상태',
    rowHeader: '×',
    groupLabel: (item) => `${item.dan}단`,
    cellLabel: (dan, multiplier) => `${dan}×${multiplier}`,
    factLabel: (item) => formatGugudanExpression(item.expression)
  }),
  'division-gugudan': Object.freeze({
    key: 'division-gugudan',
    packId: 'division-gugudan',
    sourceLabel: '나눗셈(구구단)',
    filenamePrefix: '나눗셈구구단',
    statusTitle: '내 나눗셈(구구단) 상태',
    reportTitle: '내 나눗셈(구구단) 상태',
    recordTitle: '나눗셈(구구단) 학습 기록 저장',
    recordUnavailableText: '나눗셈(구구단) 1인 플레이 결과에서만 기록을 저장할 수 있습니다.',
    emptyText: '아직 저장할 나눗셈 구구단 풀이 기록이 없습니다.',
    missingText: '나눗셈 구구단 학습 기록을 찾을 수 없습니다.',
    mergeTitle: '나눗셈 기록 합치기',
    weakGroupTitle: '많이 틀린 나누는 수',
    weakFactTitle: '많이 틀린 나눗셈',
    groupSectionTitle: '나누는 수별 상태',
    groupSectionCaption: '2부터 9까지 나누는 수 기준 누적 결과',
    heatmapTitle: '나눗셈 구구단 지도',
    heatmapAria: '나누는 수 2부터 9까지 나눗셈 문항별 상태',
    rowHeader: '÷',
    groupLabel: (item) => `${item.dan}로 나누기`,
    cellLabel: (divisor, quotient) => `${divisor * quotient}÷${divisor}`,
    factLabel: (item) => formatGugudanExpression(item.expression)
  })
});

const MAPS = [
  {
    id: 'jumpmap-01',
    label: '금강 점프맵',
    path: './assets/maps/jumpmap-01.json'
  }
];

const HEIGHT_GRADE_TIERS = [
  {
    minMeters: 115,
    label: '새 기록급',
    rangeLabel: '115m 이상',
    imageKey: 'record',
    titles: {
      sejong: '새 하늘을 연 대왕',
      leesunsin: '정상에 선 충무공',
      heonanseolheon: '새 하늘을 노래한 시인',
      default: '새 기록의 정상'
    }
  },
  {
    minMeters: 90,
    label: '정상권급',
    rangeLabel: '90m ~ 115m',
    imageKey: 'summit',
    titles: {
      sejong: '한글을 밝힌 대왕',
      leesunsin: '바다를 지킨 충무공',
      heonanseolheon: '별을 밝힌 난설헌',
      default: '정상에 닿은 도전자'
    }
  },
  {
    minMeters: 70,
    label: '하늘탑급',
    rangeLabel: '70m ~ 90m',
    imageKey: 'summit',
    titles: {
      sejong: '문치를 펼친 성군',
      leesunsin: '불패의 수군 지휘관',
      heonanseolheon: '하늘에 닿은 문장가',
      default: '높은 하늘의 개척자'
    }
  },
  {
    minMeters: 50,
    label: '기록탑급',
    rangeLabel: '50m ~ 70m',
    imageKey: 'highland',
    titles: {
      sejong: '나라를 세운 지혜',
      leesunsin: '나라를 지킨 장수',
      heonanseolheon: '시로 길을 연 재능',
      default: '굳건한 기록 보유자'
    }
  },
  {
    minMeters: 35,
    label: '푸른 거목급',
    rangeLabel: '35m ~ 50m',
    imageKey: 'highland',
    titles: {
      sejong: '집현전의 별',
      leesunsin: '한산도 전략가',
      heonanseolheon: '초희의 빛난 글',
      default: '오래 버틴 탐험가'
    }
  },
  {
    minMeters: 25,
    label: '궁궐 고지급',
    rangeLabel: '25m ~ 35m',
    imageKey: 'highland',
    titles: {
      sejong: '백성을 살핀 임금',
      leesunsin: '판옥선 지휘관',
      heonanseolheon: '꽃잎을 적은 시인',
      default: '가파른 길의 지휘관'
    }
  },
  {
    minMeters: 15,
    label: '고지 돌파급',
    rangeLabel: '15m ~ 25m',
    imageKey: 'tower-climb',
    titles: {
      sejong: '훈민정음 연구자',
      leesunsin: '수군 훈련대장',
      heonanseolheon: '시를 익힌 문장가',
      default: '발판을 읽는 탐험가'
    }
  },
  {
    minMeters: 10,
    label: '탑 오름급',
    rangeLabel: '10m ~ 15m',
    imageKey: 'tower-climb',
    titles: {
      sejong: '글을 다듬는 학자',
      leesunsin: '바다를 읽는 장수',
      heonanseolheon: '글길을 오른 시인',
      default: '탑을 넘은 도전자'
    }
  },
  {
    minMeters: 4,
    label: '별빛 탐험급',
    rangeLabel: '4m ~ 10m',
    imageKey: 'first-jump',
    titles: {
      sejong: '별을 헤아린 학자',
      leesunsin: '항로를 익힌 수군',
      heonanseolheon: '별빛을 읽는 시인',
      default: '별빛 발판 탐험가'
    }
  },
  {
    minMeters: 0,
    label: '첫 도약급',
    rangeLabel: '0m ~ 4m',
    imageKey: 'first-jump',
    titles: {
      sejong: '집현전 새내기',
      leesunsin: '수군 훈련병',
      heonanseolheon: '난설헌 새내기',
      default: '첫 발판 도전자'
    }
  }
];

const CHARACTERS = [
  {
    id: 'sejong',
    label: '세종',
    front: './assets/characters/sejong/sejiong_front.png',
    right: './assets/characters/sejong/sejong_rightside.png',
    walk: [
      './assets/characters/sejong/sejong_walk1.png',
      './assets/characters/sejong/sejong_walk2.png',
      './assets/characters/sejong/sejong_walk3.png',
      './assets/characters/sejong/sejong_walk4.png'
    ],
    jump: './assets/characters/sejong/sejong_jump.png',
    damaged: './assets/characters/sejong/sejong_damaged.png',
    fall: './assets/characters/sejong/sejong_fall.png'
  },
  {
    id: 'leesunsin',
    label: '이순신',
    front: './assets/characters/leesunsin/leesunsin_front.png',
    right: './assets/characters/leesunsin/leesunsin_rightside.png',
    walk: [
      './assets/characters/leesunsin/leesunsin_walk1.png',
      './assets/characters/leesunsin/leesunsin_walk2.png',
      './assets/characters/leesunsin/leesunsin_walk3.png',
      './assets/characters/leesunsin/leesunsin_walk4.png'
    ],
    jump: './assets/characters/leesunsin/leesunsin_jump.png',
    damaged: './assets/characters/leesunsin/leesunsin_damaged.png',
    fall: './assets/characters/leesunsin/leesunsin_fall.png'
  },
  {
    id: 'heonanseolheon',
    label: '허난설헌',
    front: './assets/characters/hernanseolheon/heonanseolheon_front.png',
    right: './assets/characters/hernanseolheon/heonanseolheon_rightside.png',
    walk: [
      './assets/characters/hernanseolheon/heonanseolheon_walk1.png',
      './assets/characters/hernanseolheon/heonanseolheon_walk2.png',
      './assets/characters/hernanseolheon/heonanseolheon_walk3.png',
      './assets/characters/hernanseolheon/heonanseolheon_walk4.png'
    ],
    jump: './assets/characters/hernanseolheon/heonanseolheon_jump.png',
    damaged: './assets/characters/hernanseolheon/heonanseolheon_damaged.png',
    fall: './assets/characters/hernanseolheon/heonanseolheon_fall.png'
  }
];

const LOADING_FACTS_BY_CHARACTER = Object.freeze({
  sejong: Object.freeze([
    Object.freeze({
      label: '세종대왕 역사 사실',
      text: '세종실록에는 1443년에 훈민정음을 창제했다는 기록이 남아 있어요.',
      source: '조선왕조실록 세종 25년 12월 30일'
    }),
    Object.freeze({
      label: '세종대왕 역사 사실',
      text: '세종실록에는 갑인자라는 새 금속 활자를 주조했다는 기사가 기록되어 있어요.',
      source: '조선왕조실록 세종 16년 7월 2일'
    }),
    Object.freeze({
      label: '세종대왕 역사 이야기',
      text: '장영실과 과학 기술 운영에 관한 기록도 세종실록에서 확인할 수 있어요.',
      source: '조선왕조실록 세종 24년 4월 27일'
    })
  ]),
  leesunsin: Object.freeze([
    Object.freeze({
      label: '이순신 역사 사실',
      text: '선조실록에는 노량해전에서 이순신이 전사했다는 보고가 남아 있어요.',
      source: '조선왕조실록 선조 31년 12월 18일'
    }),
    Object.freeze({
      label: '이순신 역사 사실',
      text: '난중일기는 임진왜란 시기 전황과 일상을 함께 보여주는 대표 1차 사료예요.',
      source: '국가유산포털 난중일기 및 서간첩 임진장초'
    }),
    Object.freeze({
      label: '이순신 역사 이야기',
      text: '숙종실록에는 이순신 사당에 현충이라는 이름을 내렸다는 기록이 있어요.',
      source: '조선왕조실록 숙종 33년 2월 6일'
    })
  ]),
  heonanseolheon: Object.freeze([
    Object.freeze({
      label: '허난설헌 역사 이야기',
      text: '허난설헌은 조선 중기의 시인으로, 이름은 초희였고 호가 난설헌이에요.',
      source: '한국민족문화대백과 허난설헌'
    }),
    Object.freeze({
      label: '허난설헌 문학 이야기',
      text: '허난설헌의 시문은 동생 허균이 정리해 난설헌집으로 전해졌어요.',
      source: '한국민족문화대백과 난설헌집'
    }),
    Object.freeze({
      label: '허난설헌 역사 이야기',
      text: '허난설헌은 강릉을 대표하는 조선 시대 문학 인물로 소개되고 있어요.',
      source: '강릉시 문화관광'
    })
  ])
});

const LOADING_GAME_FACTS = Object.freeze([
  Object.freeze({
    label: '게임 안내',
    text: '퀴즈로 체력을 채운 뒤 발판을 딛고 더 높은 곳에 도전해 보세요.',
    source: '위인 점프맵 안내'
  }),
  Object.freeze({
    label: '게임 안내',
    text: '방향키는 톡 누르기보다 계속 누른 채 점프하세요. 단발성 입력만으로는 장애물 넘기가 어려워요.',
    source: '위인 점프맵 안내'
  })
]);

const elements = {
  setupScreen: $('#setup-screen'),
  playScreen: $('#play-screen'),
  resultScreen: $('#result-screen'),
  currentSummary: $('#current-summary'),
  quizPack: $('#quiz-pack'),
  mapSelect: $('#map-select'),
  playerOptions: $('#player-options'),
  timeOptions: $('#time-options'),
  characterOptions: $('#character-options'),
  startButton: $('#start-button'),
  setupError: $('#setup-error'),
  gugudanStatusCheck: $('#gugudan-status-check'),
  gugudanStatusToggle: $('#gugudan-status-toggle'),
  practiceCurrentStudent: $('#practice-current-student'),
  practiceCurrentStudentHint: $('#practice-current-student-hint'),
  practiceStudentSwitchButton: $('#practice-student-switch-button'),
  practiceRecordManagerButton: $('#practice-record-manager-button'),
  gugudanStatusButton: $('#gugudan-status-button'),
  gugudanStatusFile: $('#gugudan-status-file'),
  gugudanImportRecordsButton: $('#gugudan-import-records-button'),
  gugudanMergeRecordsButton: $('#gugudan-merge-records-button'),
  gugudanMergeRecordsFile: $('#gugudan-merge-records-file'),
  gugudanWeaknessPracticeButton: $('#gugudan-weakness-practice-button'),
  gugudanWeaknessPracticeFile: $('#gugudan-weakness-practice-file'),
  divisionGugudanStatusButton: $('#division-gugudan-status-button'),
  divisionGugudanStatusFile: $('#division-gugudan-status-file'),
  divisionGugudanImportRecordsButton: $('#division-gugudan-import-records-button'),
  divisionGugudanMergeRecordsButton: $('#division-gugudan-merge-records-button'),
  divisionGugudanMergeRecordsFile: $('#division-gugudan-merge-records-file'),
  divisionGugudanWeaknessPracticeButton: $('#division-gugudan-weakness-practice-button'),
  divisionGugudanWeaknessPracticeFile: $('#division-gugudan-weakness-practice-file'),
  gugudanStatusPanel: $('#gugudan-status-panel'),
  gugudanStatusContent: $('#gugudan-status-content'),
  gugudanReportModal: $('#gugudan-report-modal'),
  gugudanReportTitle: $('#gugudan-report-title'),
  gugudanReportCloseButton: $('#gugudan-report-close-button'),
  gugudanReportSubtitle: $('#gugudan-report-subtitle'),
  gugudanReportBody: $('#gugudan-report-body'),
  practiceRecordManagerModal: $('#practice-record-manager-modal'),
  practiceRecordManagerCloseButton: $('#practice-record-manager-close-button'),
  practiceRecordManagerCurrentStudent: $('#practice-record-manager-current-student'),
  practiceRecordManagerSwitchButton: $('#practice-record-manager-switch-button'),
  practiceRecordManagerList: $('#practice-record-manager-list'),
  practiceRecordManagerStatus: $('#practice-record-manager-status'),
  loadingScreen: $('#jump-loading-screen'),
  loadingTitle: $('#jump-loading-title'),
  loadingMessage: $('#jump-loading-message'),
  loadingModeTitle: $('#jump-loading-mode-title'),
  loadingModeText: $('#jump-loading-mode-text'),
  loadingFactLabel: $('#jump-loading-fact-label'),
  loadingFactText: $('#jump-loading-fact-text'),
  loadingFactSource: $('#jump-loading-fact-source'),
  loadingSprite: $('#jump-loading-sprite'),
  loadingProgressFill: $('#jump-loading-progress-fill'),
  loadingGrid: $('#jump-loading-grid'),
  finishGameButton: $('#finish-game-button'),
  playTitle: $('#play-title'),
  timerPill: $('#timer-pill'),
  bgmToggleButton: $('#bgm-toggle-button'),
  gameStage: $('#game-stage'),
  questionArea: $('#question-area'),
  resultTitle: $('#result-title'),
  resultSubtitle: $('#result-subtitle'),
  resultTimePill: $('#result-time-pill'),
  resultGrid: $('#result-grid'),
  playerResults: $('#player-results'),
  gugudanRecordPanel: $('#gugudan-record-panel'),
  gugudanStudentId: $('#gugudan-student-id'),
  gugudanStudentNote: $('#gugudan-student-note'),
  gugudanDownloadCurrentButton: $('#gugudan-download-current-button'),
  gugudanDownloadBackupButton: $('#gugudan-download-backup-button'),
  gugudanMergeCsvButton: $('#gugudan-merge-csv-button'),
  gugudanRecordFile: $('#gugudan-record-file'),
  gugudanRecordStatus: $('#gugudan-record-status'),
  qrModal: $('#qr-modal'),
  qrLarge: $('#qr-large'),
  qrUrlText: $('#qr-url-text'),
  modePromptModal: $('#mode-prompt-modal'),
  modePromptHint: $('#mode-prompt-hint'),
  restartSameButton: $('#restart-same-button'),
  backSetupButton: $('#back-setup-button'),
  displayModeToggle: $('#display-mode-toggle')
};

const QR_SHARE_URL = 'https://knol-jump.lucky20220528.workers.dev/';

const packCache = new Map();
const mapCache = new Map();
const imageCache = new Map();
const LOCAL_RECORD_STORAGE_PREFIX = 'knol-jump-local-learning-record';
const LOCAL_PRACTICE_STORE_KEY = 'knolquiz.practice-records.v1';
const LOCAL_PRACTICE_LEGACY_STORE_KEYS = Object.freeze([
  'knolquiz-jumpmap.practice-records.v1',
  'knolquiz-turtle-defense.practice-records.v1'
]);

let selectedPackId = 'gugudan';
let selectedMapId = 'jumpmap-01';
let selectedPlayers = 1;
let selectedMinutes = DEFAULT_PLAY_MINUTES;
let selectedCharacterIds = Array.from({ length: Math.max(...PLAYER_COUNTS) }, (_, index) => (
  CHARACTERS[index % CHARACTERS.length]?.id || 'sejong'
));
let selectedDisplayMode = 'auto';
let selectedPracticeStudentId = '';
let modePromptResolved = false;
let activeWeaknessPractice = null;
let session = null;
let viewportUpdateRaf = 0;
let startLoadingSpriteTimer = 0;
let startLoadingSpriteCharacterId = '';
let startLoadingSpriteSourcesByPanel = [];
let startLoadingSpriteFrameIndex = 0;
let startLoadingFactTimer = 0;
let startLoadingFactCharacterId = '';
let startLoadingFactPoolsByPanel = [];
let startLoadingFactIndex = 0;
let bgmAudio = null;
let bgmMuted = false;
let bgmRunning = false;
let bgmFallback = null;

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function shuffle(list) {
  const result = list.slice();
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function setTextIfChanged(element, value) {
  if (!element) return;
  const next = String(value);
  if (element.textContent !== next) element.textContent = next;
}

function setDatasetIfChanged(dataset, key, value) {
  const next = String(value);
  if (dataset[key] !== next) dataset[key] = next;
}

function deleteDatasetKey(dataset, key) {
  if (key in dataset) delete dataset[key];
}

function setWidthIfChanged(element, value) {
  if (!element) return;
  const next = `${value}%`;
  if (element.style.width !== next) element.style.width = next;
}

function setHiddenIfChanged(element, hidden) {
  if (!element) return;
  const next = !!hidden;
  if (element.hidden !== next) element.hidden = next;
}

function toggleClassIfChanged(element, className, active) {
  if (!element) return;
  const next = !!active;
  if (element.classList.contains(className) !== next) {
    element.classList.toggle(className, next);
  }
}

function setDisabledIfChanged(element, disabled) {
  if (!element) return;
  const next = !!disabled;
  if (element.disabled !== next) element.disabled = next;
}

function delay(ms) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, Math.max(0, Number(ms) || 0));
  });
}

function getCanvasContext2d(canvas, options = {}) {
  if (!canvas) return null;
  try {
    return canvas.getContext('2d', options);
  } catch (_error) {
    return canvas.getContext('2d');
  }
}

function yieldToBrowser() {
  return new Promise((resolve) => {
    if (typeof window.requestIdleCallback === 'function') {
      window.requestIdleCallback(() => resolve(), { timeout: 80 });
      return;
    }
    window.requestAnimationFrame(() => resolve());
  });
}

async function keepMinimumLoadingTime(startedAt, minimumMs = MIN_START_LOADING_MS) {
  const elapsed = performance.now() - startedAt;
  const remaining = minimumMs - elapsed;
  if (remaining > 0) await delay(remaining);
}

function getLoadingCharacterFromSelection() {
  const selectedCharacter = getSelectedCharacters(selectedPlayers, { resolveRandom: false })[0];
  if (!selectedCharacter || selectedCharacter.id === RANDOM_CHARACTER_ID) return CHARACTERS[0];
  return getCharacter(selectedCharacter.id);
}

function normalizeLoadingCharacter(character, index = 0) {
  if (!character || character.id === RANDOM_CHARACTER_ID) {
    return CHARACTERS[index % CHARACTERS.length] || CHARACTERS[0];
  }
  return getCharacter(character.id);
}

function getLoadingCharactersFromSelection(count = selectedPlayers) {
  const characters = getSelectedCharacters(count, { resolveRandom: false });
  return Array.from({ length: Math.max(1, Number(count) || 1) }, (_, index) => (
    normalizeLoadingCharacter(characters[index], index)
  ));
}

function getLoadingPanelCharacters(options = {}) {
  const source = Array.isArray(options.characters)
    ? options.characters
    : (options.character ? [options.character] : getLoadingCharactersFromSelection(selectedPlayers));
  const count = Math.max(1, selectedPlayers);
  return Array.from({ length: count }, (_, index) => (
    normalizeLoadingCharacter(source[index] || source[0], index)
  ));
}

function getLoadingCharacterId(character) {
  const characterId = character?.id === RANDOM_CHARACTER_ID ? CHARACTERS[0].id : character?.id;
  return CHARACTERS.some((item) => item.id === characterId) ? characterId : CHARACTERS[0].id;
}

function getStartLoadingModeDescription() {
  const totalSeconds = Math.max(60, Math.round((Number(selectedMinutes) || DEFAULT_PLAY_MINUTES) * 60));
  return {
    title: `현재 모드 · 타임어택 (${totalSeconds}초)`,
    text: '제한 시간 종료 시 최종 높이가 기록됩니다. 퀴즈를 푸는 동안에도 시간이 계속 흐릅니다.'
  };
}

function getLoadingSpriteSources(character) {
  const selectedCharacter = character?.id === RANDOM_CHARACTER_ID ? CHARACTERS[0] : (character || CHARACTERS[0]);
  const sprites = Array.isArray(selectedCharacter.walk) && selectedCharacter.walk.length
    ? selectedCharacter.walk
    : [selectedCharacter.right, selectedCharacter.front].filter(Boolean);
  return sprites.length ? sprites : [CHARACTERS[0].walk[0]];
}

function getStartLoadingCards() {
  const root = elements.loadingGrid || elements.loadingScreen;
  return root ? $$('[data-loading-panel]', root) : [];
}

function createStartLoadingCard(index) {
  const baseCard = $('.jump-loading-card', elements.loadingGrid || elements.loadingScreen);
  if (!baseCard) return null;
  const clone = baseCard.cloneNode(true);
  clone.classList.add('jump-loading-card-clone');
  clone.dataset.loadingPanel = String(index);
  $$('[id]', clone).forEach((element) => element.removeAttribute('id'));
  return clone;
}

function syncStartLoadingPanelCount(count = 1) {
  const root = elements.loadingGrid;
  if (!root) return getStartLoadingCards();
  const safeCount = clamp(Math.round(Number(count) || 1), 1, Math.max(...PLAYER_COUNTS));
  root.className = `jump-loading-grid player-count-${safeCount}`;
  root.dataset.loadingCount = String(safeCount);
  elements.loadingScreen?.setAttribute('data-loading-count', String(safeCount));
  const baseCard = $('.jump-loading-card:not(.jump-loading-card-clone)', root) || $('.jump-loading-card', root);
  if (baseCard) {
    baseCard.dataset.loadingPanel = '0';
    baseCard.classList.toggle('is-split-card', safeCount > 1);
  }
  $$('.jump-loading-card-clone', root).forEach((card) => {
    const index = Number(card.dataset.loadingPanel) || 0;
    if (index >= safeCount) card.remove();
  });
  for (let index = 1; index < safeCount; index += 1) {
    let card = $(`.jump-loading-card[data-loading-panel="${index}"]`, root);
    if (!card) {
      card = createStartLoadingCard(index);
      if (card) root.append(card);
    }
    card?.classList.add('is-split-card');
  }
  getStartLoadingCards().forEach((card) => {
    card.classList.toggle('is-split-card', safeCount > 1);
  });
  return getStartLoadingCards();
}

function setStartLoadingFact(fact, card = elements.loadingScreen) {
  setTextIfChanged($('.jump-loading-fact-label', card), fact?.label || '역사 이야기');
  setTextIfChanged($('.jump-loading-fact p', card), fact?.text || '역사 정보를 준비하고 있어요.');
  const source = fact?.source ? `출처: ${fact.source}` : '출처: 놀퀴즈';
  setTextIfChanged($('.jump-loading-fact-source', card), source);
}

function buildStartLoadingFactPool(character) {
  const characterId = getLoadingCharacterId(character);
  const characterFacts = Array.isArray(LOADING_FACTS_BY_CHARACTER[characterId])
    ? LOADING_FACTS_BY_CHARACTER[characterId]
    : [];
  if (characterFacts.length) {
    return [...shuffle(characterFacts), ...shuffle([...LOADING_GAME_FACTS])];
  }
  return shuffle([...LOADING_GAME_FACTS]);
}

function stopStartLoadingSpriteAnimation() {
  if (!startLoadingSpriteTimer) return;
  window.clearInterval(startLoadingSpriteTimer);
  startLoadingSpriteTimer = 0;
  startLoadingSpriteCharacterId = '';
  startLoadingSpriteSourcesByPanel = [];
  startLoadingSpriteFrameIndex = 0;
}

function updateStartLoadingSpriteFrames() {
  const cards = getStartLoadingCards();
  cards.forEach((card, index) => {
    const image = $('.jump-loading-sprite', card);
    const sprites = startLoadingSpriteSourcesByPanel[index] || startLoadingSpriteSourcesByPanel[0] || [];
    if (!(image instanceof HTMLImageElement) || !sprites.length) return;
    image.src = sprites[startLoadingSpriteFrameIndex % sprites.length];
  });
}

function startStartLoadingSpriteAnimation(charactersInput) {
  const characters = Array.isArray(charactersInput) ? charactersInput : [charactersInput || getLoadingCharacterFromSelection()];
  const characterKey = characters.map((character, index) => getLoadingCharacterId(normalizeLoadingCharacter(character, index))).join('|');
  if (startLoadingSpriteTimer && startLoadingSpriteCharacterId === characterKey) {
    updateStartLoadingSpriteFrames();
    return;
  }
  stopStartLoadingSpriteAnimation();
  startLoadingSpriteCharacterId = characterKey;
  startLoadingSpriteSourcesByPanel = characters.map((character, index) => getLoadingSpriteSources(normalizeLoadingCharacter(character, index)));
  startLoadingSpriteSourcesByPanel.forEach((sprites) => preloadImages(sprites));
  updateStartLoadingSpriteFrames();
  startLoadingSpriteTimer = window.setInterval(() => {
    startLoadingSpriteFrameIndex += 1;
    updateStartLoadingSpriteFrames();
  }, LOADING_SPRITE_FRAME_MS);
}

function stopStartLoadingFactRotation() {
  if (!startLoadingFactTimer) return;
  window.clearInterval(startLoadingFactTimer);
  startLoadingFactTimer = 0;
  startLoadingFactCharacterId = '';
  startLoadingFactPoolsByPanel = [];
  startLoadingFactIndex = 0;
}

function updateStartLoadingFacts() {
  const cards = getStartLoadingCards();
  cards.forEach((card, index) => {
    const facts = startLoadingFactPoolsByPanel[index] || startLoadingFactPoolsByPanel[0] || LOADING_GAME_FACTS;
    setStartLoadingFact(facts[(startLoadingFactIndex + index) % facts.length], card);
  });
}

function startStartLoadingFactRotation(charactersInput) {
  const characters = Array.isArray(charactersInput) ? charactersInput : [charactersInput || getLoadingCharacterFromSelection()];
  const characterKey = characters.map((character, index) => getLoadingCharacterId(normalizeLoadingCharacter(character, index))).join('|');
  if (startLoadingFactTimer && startLoadingFactCharacterId === characterKey) {
    updateStartLoadingFacts();
    return;
  }
  stopStartLoadingFactRotation();
  startLoadingFactCharacterId = characterKey;
  startLoadingFactPoolsByPanel = characters.map((character, index) => buildStartLoadingFactPool(normalizeLoadingCharacter(character, index)));
  updateStartLoadingFacts();
  startLoadingFactTimer = window.setInterval(() => {
    startLoadingFactIndex += 1;
    updateStartLoadingFacts();
  }, LOADING_FACT_ROTATE_MS);
}

function setStartLoadingState(loading, message = '', options = {}) {
  const active = !!loading;
  elements.startButton.disabled = active || !selectedMinutes;
  elements.startButton.classList.toggle('is-loading', active);
  elements.startButton.setAttribute('aria-busy', String(active));
  elements.startButton.textContent = active ? '준비 중...' : '도전 시작';
  elements.setupError.classList.toggle('is-loading', active);
  elements.setupError.textContent = message;
  document.documentElement.classList.toggle('start-loading-open', active);
  document.body.classList.toggle('start-loading-open', active);
  if (!elements.loadingScreen) return;

  setHiddenIfChanged(elements.loadingScreen, !active);
  elements.loadingScreen.setAttribute('aria-hidden', String(!active));

  if (!active) {
    stopStartLoadingSpriteAnimation();
    stopStartLoadingFactRotation();
    getStartLoadingCards().forEach((card) => setWidthIfChanged($('.jump-loading-progress i', card), 0));
    syncStartLoadingPanelCount(1);
    return;
  }

  const characters = getLoadingPanelCharacters(options);
  const progress = Number.isFinite(options.progress) ? clamp(options.progress, 0, 1) : 0.12;
  const modeDescription = getStartLoadingModeDescription();
  const cards = syncStartLoadingPanelCount(characters.length);
  cards.forEach((card, index) => {
    const character = characters[index] || characters[0] || CHARACTERS[0];
    const playerLabel = characters.length > 1
      ? `사용자${index + 1} · ${character.label}`
      : '위인 점프맵';
    setTextIfChanged($('.jump-loading-kicker', card), playerLabel);
    setTextIfChanged($('.jump-loading-copy h2', card), options.title || '점프맵 로딩 중');
    setTextIfChanged($('.jump-loading-copy p', card), message || '캐릭터와 맵 데이터를 준비하고 있어요.');
    setTextIfChanged($('.jump-loading-mode strong', card), modeDescription.title);
    setTextIfChanged($('.jump-loading-mode p', card), modeDescription.text);
    setWidthIfChanged($('.jump-loading-progress i', card), Math.max(6, Math.round(progress * 100)));
  });
  startStartLoadingSpriteAnimation(characters);
  startStartLoadingFactRotation(characters);
}

function updateBgmToggleButton() {
  if (!elements.bgmToggleButton) return;
  const audible = bgmRunning && !bgmMuted;
  elements.bgmToggleButton.textContent = bgmMuted ? '음악 켜기' : '음악 끄기';
  elements.bgmToggleButton.setAttribute('aria-pressed', String(audible));
}

function createBgmFallback() {
  const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
  if (typeof AudioContextCtor !== 'function') {
    return {
      start: () => {},
      stop: () => {}
    };
  }

  const leadPattern = [440, 0, 587, 0, 659, 0, 587, 0, 523, 0, 659, 0, 698, 0, 659, 0];
  const bassPattern = [110, 110, 147, 147, 98, 98, 147, 147];
  const stepSec = 0.22;
  let audioCtx = null;
  let masterNode = null;
  let timerId = 0;
  let stepIndex = 0;
  let nextNoteAt = 0;

  const ensureAudio = () => {
    if (!audioCtx) audioCtx = new AudioContextCtor();
    if (!masterNode) {
      masterNode = audioCtx.createGain();
      masterNode.gain.value = JUMPMAP_BGM_VOLUME * 0.18;
      masterNode.connect(audioCtx.destination);
    }
    return { audioCtx, masterNode };
  };

  const playTone = (frequency, when, duration, wave, gain) => {
    if (!audioCtx || !masterNode || !frequency) return;
    const osc = audioCtx.createOscillator();
    const amp = audioCtx.createGain();
    osc.type = wave;
    osc.frequency.setValueAtTime(frequency, when);
    amp.gain.setValueAtTime(0.0001, when);
    amp.gain.exponentialRampToValueAtTime(gain, when + Math.min(0.03, duration * 0.35));
    amp.gain.exponentialRampToValueAtTime(0.0001, when + duration + 0.02);
    osc.connect(amp);
    amp.connect(masterNode);
    osc.start(when);
    osc.stop(when + duration + 0.03);
  };

  const tick = () => {
    if (!timerId || bgmMuted || document.hidden) return;
    const { audioCtx: ctx } = ensureAudio();
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
      return;
    }
    if (nextNoteAt <= 0) nextNoteAt = ctx.currentTime + 0.04;
    while (nextNoteAt < ctx.currentTime + 0.3) {
      const lead = Number(leadPattern[stepIndex % leadPattern.length]) || 0;
      const bass = Number(bassPattern[stepIndex % bassPattern.length]) || 0;
      playTone(lead, nextNoteAt, stepSec * 0.74, 'square', 0.06);
      playTone(bass, nextNoteAt, stepSec * 0.9, 'triangle', 0.05);
      stepIndex += 1;
      nextNoteAt += stepSec;
    }
  };

  return {
    start: () => {
      if (timerId) return;
      ensureAudio();
      tick();
      timerId = window.setInterval(tick, 90);
    },
    stop: () => {
      if (timerId) window.clearInterval(timerId);
      timerId = 0;
      stepIndex = 0;
      nextNoteAt = 0;
    }
  };
}

function getBgmFallback() {
  if (!bgmFallback) bgmFallback = createBgmFallback();
  return bgmFallback;
}

function getBgmAudio() {
  if (bgmAudio) return bgmAudio;
  try {
    bgmAudio = new Audio(JUMPMAP_BGM_SRC);
    bgmAudio.preload = 'auto';
    bgmAudio.loop = true;
    bgmAudio.playsInline = true;
    bgmAudio.volume = JUMPMAP_BGM_VOLUME;
    bgmAudio.addEventListener('error', () => {
      if (bgmRunning && !bgmMuted) getBgmFallback().start();
    });
  } catch (_error) {
    bgmAudio = null;
  }
  return bgmAudio;
}

function pauseBgmOutput(reset = false) {
  if (bgmAudio) {
    bgmAudio.pause();
    if (reset) {
      try {
        bgmAudio.currentTime = 0;
      } catch (_error) {
        // Some browsers block currentTime changes before metadata loads.
      }
    }
  }
  if (bgmFallback) bgmFallback.stop();
}

function startBgm() {
  bgmRunning = true;
  updateBgmToggleButton();
  if (bgmMuted || document.hidden) return;
  const audio = getBgmAudio();
  if (!audio) {
    getBgmFallback().start();
    return;
  }
  audio.volume = JUMPMAP_BGM_VOLUME;
  const maybePromise = audio.play();
  if (maybePromise && typeof maybePromise.catch === 'function') {
    maybePromise.catch(() => {
      if (bgmRunning && !bgmMuted) getBgmFallback().start();
    });
  }
}

function stopBgm() {
  bgmRunning = false;
  pauseBgmOutput(true);
  updateBgmToggleButton();
}

function toggleBgm() {
  bgmMuted = !bgmMuted;
  if (bgmMuted) {
    pauseBgmOutput(false);
  } else if (bgmRunning) {
    startBgm();
  }
  updateBgmToggleButton();
}

function getAutoViewportProfile() {
  const width = Math.max(1, window.innerWidth || document.documentElement.clientWidth || 1);
  const height = Math.max(1, window.innerHeight || document.documentElement.clientHeight || 1);
  const shortSide = Math.min(width, height);
  const longSide = Math.max(width, height);
  const orientation = width >= height ? 'landscape' : 'portrait';

  if (width < PHONE_WIDTH_BREAKPOINT || (shortSide < 520 && longSide < 960)) {
    return {
      width,
      height,
      orientation,
      kind: 'phone',
      maxPlayers: PHONE_MAX_PLAYERS
    };
  }

  if (width < WIDE_WIDTH_BREAKPOINT) {
    return {
      width,
      height,
      orientation,
      kind: 'tablet',
      maxPlayers: TABLET_MAX_PLAYERS
    };
  }

  return {
    width,
    height,
    orientation,
    kind: 'wide',
      maxPlayers: WIDE_MAX_PLAYERS
    };
}

function getResolvedDisplayMode(displayModeId = selectedDisplayMode) {
  if (displayModeId !== 'auto') return displayModeId;
  const profile = getAutoViewportProfile();
  if (profile.kind === 'phone') return 'mobile';
  if (profile.kind === 'tablet') return 'tablet';
  return 'wide';
}

function getDisplayModeLabel(displayModeId = selectedDisplayMode) {
  return DISPLAY_MODES.find((mode) => mode.id === displayModeId)?.label || '자동';
}

function getDisplayModeButtonLabel(displayModeId = selectedDisplayMode) {
  return `모드:${getDisplayModeLabel(displayModeId)}`;
}

function updateDisplayModeToggle(profile = null) {
  if (!elements.displayModeToggle) return;
  const resolvedMode = profile?.resolvedMode || getResolvedDisplayMode();
  const buttonLabel = getDisplayModeButtonLabel();
  const resolvedLabel = getDisplayModeLabel(resolvedMode);
  elements.displayModeToggle.textContent = buttonLabel;
  elements.displayModeToggle.dataset.displayMode = selectedDisplayMode;
  elements.displayModeToggle.dataset.resolvedDisplayMode = resolvedMode;
  elements.displayModeToggle.setAttribute('aria-label', `${buttonLabel}. 현재 적용: ${resolvedLabel}. 누르면 화면 모드가 바뀝니다.`);
  elements.displayModeToggle.title = '화면 모드 전환: 자동 → 모바일 → 태블릿 → 웹/전자칠판';
}

function getViewportProfile() {
  const profile = getAutoViewportProfile();
  const resolvedMode = getResolvedDisplayMode();
  if (resolvedMode === 'mobile') {
    return {
      ...profile,
      kind: 'phone',
      maxPlayers: PHONE_MAX_PLAYERS,
      resolvedMode
    };
  }
  if (resolvedMode === 'tablet') {
    return {
      ...profile,
      kind: 'tablet',
      maxPlayers: TABLET_MAX_PLAYERS,
      resolvedMode
    };
  }
  return {
    ...profile,
    kind: 'wide',
    maxPlayers: WIDE_MAX_PLAYERS,
    resolvedMode
  };
}

function getPlayerLimitLabel(profile) {
  if (profile.kind === 'phone') return '모바일 화면에서는 1인 플레이만 가능합니다.';
  if (profile.kind === 'tablet') return '태블릿 화면에서는 2인 플레이까지 가능합니다.';
  return '넓은 화면에서는 4인 플레이까지 가능합니다.';
}

function getPlayerLimitSummary(profile) {
  if (profile.kind === 'phone') return '모바일 1인 전용';
  if (profile.kind === 'tablet') return '태블릿 최대 2인';
  return '';
}

function getPlayerCountLabel(count, profile) {
  const safeCount = clamp(Math.round(Number(count) || 1), 1, Math.max(...PLAYER_COUNTS));
  if (safeCount === 2 && profile?.kind === 'tablet') return '2명(마주보기)';
  return `${safeCount}명`;
}

function getPlayerCountHint(count, profile) {
  const safeCount = clamp(Math.round(Number(count) || 1), 1, Math.max(...PLAYER_COUNTS));
  if (profile?.kind === 'wide' && safeCount >= 3) return '기기성능, 화면크기 필요';
  return '';
}

function renderPlayerCountButtonLabel(count, profile) {
  const label = getPlayerCountLabel(count, profile);
  const hint = getPlayerCountHint(count, profile);
  return `
    <span class="option-button-main">${escapeHtml(label)}</span>
    ${hint ? `<span class="option-button-note">${escapeHtml(hint)}</span>` : ''}
  `;
}

function syncViewportProfile() {
  const profile = getViewportProfile();
  document.body.dataset.viewportClass = profile.kind;
  document.body.dataset.viewportOrientation = profile.orientation;
  document.body.dataset.maxPlayers = String(profile.maxPlayers);
  document.body.dataset.displayModeChoice = selectedDisplayMode;
  document.body.dataset.displayMode = profile.resolvedMode || getResolvedDisplayMode();
  updateDisplayModeToggle(profile);
  return profile;
}

function applyDisplayMode(displayModeId, { updateSetup = true } = {}) {
  if (!DISPLAY_MODES.some((mode) => mode.id === displayModeId)) return syncViewportProfile();
  selectedDisplayMode = displayModeId;
  markRuntimeLayoutDirty();
  const profile = syncViewportProfile();
  if (!session) {
    clampSelectedPlayersToViewport(profile);
    if (updateSetup) updateSetupSummary();
    return profile;
  }
  drawScene();
  syncTestDataset();
  return profile;
}

function markRuntimeLayoutDirty() {
  if (session?.runtime) {
    session.runtime.canvasSizeDirty = true;
  }
}

function clampSelectedPlayersToViewport(profile = syncViewportProfile()) {
  const nextPlayers = clamp(selectedPlayers, 1, profile.maxPlayers);
  if (nextPlayers === selectedPlayers) return false;
  selectedPlayers = nextPlayers;
  ensureCharacterSelections(selectedPlayers);
  return true;
}

function scheduleViewportUpdate() {
  markRuntimeLayoutDirty();
  if (viewportUpdateRaf) return;
  viewportUpdateRaf = window.requestAnimationFrame(() => {
    viewportUpdateRaf = 0;
    const profile = syncViewportProfile();
    if (!session) {
      clampSelectedPlayersToViewport(profile);
      updateSetupSummary();
      if (elements.modePromptModal && !elements.modePromptModal.classList.contains('is-hidden')) {
        updateModePromptRecommendation();
      }
      return;
    }
    drawScene();
    if (elements.modePromptModal && !elements.modePromptModal.classList.contains('is-hidden')) {
      updateModePromptRecommendation();
    }
  });
}

function selectNextDisplayMode() {
  const screen = document.body.dataset.screen || 'setup';
  const loading = elements.loadingScreen && !elements.loadingScreen.hidden;
  if (session || screen !== 'setup' || loading) return;
  const currentIndex = DISPLAY_MODES.findIndex((mode) => mode.id === selectedDisplayMode);
  const nextMode = DISPLAY_MODES[(currentIndex + 1 + DISPLAY_MODES.length) % DISPLAY_MODES.length]?.id || 'auto';
  applyDisplayMode(nextMode);
}

function getRecommendedPromptMode() {
  const profile = getAutoViewportProfile();
  if (profile.kind === 'phone') return 'mobile';
  if (profile.kind === 'tablet') return 'tablet';
  return 'wide';
}

function updateModePromptRecommendation() {
  if (!elements.modePromptModal) return;
  const recommendedMode = getRecommendedPromptMode();
  const recommendedLabel = getDisplayModeLabel(recommendedMode);
  if (elements.modePromptHint) {
    elements.modePromptHint.textContent = `우측 상단 모드 버튼으로 모바일, 태블릿, 웹/전자칠판을 다시 선택할 수 있습니다. 게임이 시작되면 화면 모드는 고정됩니다. 현재 추천: ${recommendedLabel}`;
  }
  $$('[data-mode-prompt-choice]', elements.modePromptModal).forEach((button) => {
    const recommended = button.dataset.modePromptChoice === recommendedMode;
    button.classList.toggle('is-recommended', recommended);
    const baseLabel = button.querySelector('b')?.textContent?.trim() || button.textContent.trim();
    button.setAttribute('aria-label', recommended ? `${baseLabel}, 현재 화면 추천` : baseLabel);
  });
}

function setModePromptOpen(open) {
  if (!elements.modePromptModal) return;
  elements.modePromptModal.classList.toggle('is-hidden', !open);
  elements.modePromptModal.setAttribute('aria-hidden', String(!open));
  document.body.classList.toggle('mode-prompt-open', !!open);
  if (open) {
    updateModePromptRecommendation();
    const recommendedMode = getRecommendedPromptMode();
    const target = $(`[data-mode-prompt-choice="${recommendedMode}"]`, elements.modePromptModal)
      || $('[data-mode-prompt-choice]', elements.modePromptModal);
    window.requestAnimationFrame(() => target?.focus());
  } else {
    elements.displayModeToggle?.focus?.();
  }
}

function chooseModeFromPrompt(displayModeId) {
  modePromptResolved = true;
  applyDisplayMode(displayModeId);
  setModePromptOpen(false);
}

function showInitialModePrompt() {
  const screen = document.body.dataset.screen || 'setup';
  if (modePromptResolved || !elements.modePromptModal || screen !== 'setup') return;
  setModePromptOpen(true);
}

function formatClock(totalSeconds) {
  const safe = Math.max(0, Math.ceil(totalSeconds));
  const minutes = Math.floor(safe / 60);
  const seconds = safe % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatHeight(value) {
  return `${Math.max(0, Math.floor((Number(value) || 0) / 100))}단계`;
}

function getHeightMeters(value) {
  return Math.max(0, (Number(value) || 0) / 100);
}

function formatHeightMeters(value) {
  const meters = getHeightMeters(value);
  return `${meters.toLocaleString('ko-KR', { maximumFractionDigits: 1 })}m`;
}

function getHeightGrade(value) {
  const meters = getHeightMeters(value);
  return HEIGHT_GRADE_TIERS.find((item) => meters >= item.minMeters)
    || HEIGHT_GRADE_TIERS[HEIGHT_GRADE_TIERS.length - 1];
}

function getHeightGradeImagePath(grade) {
  return `./assets/badges/${grade.imageKey}.png`;
}

function getHeightTitleForPlayer(player, grade = null) {
  const heightGrade = grade || getHeightGrade(player?.bestHeight);
  const characterId = player?.character?.id || 'default';
  return {
    title: heightGrade.titles[characterId] || heightGrade.titles.default,
    caption: heightGrade.rangeLabel,
    minMeters: heightGrade.minMeters
  };
}

function getPlayerAccuracyText(player) {
  const correct = Math.max(0, Number(player?.correct) || 0);
  const attempts = correct + Math.max(0, Number(player?.wrong) || 0);
  const percent = attempts > 0 ? Math.round((correct / attempts) * 100) : 0;
  return `${percent}% (${correct}/${attempts})`;
}

function formatCsvAccuracy(correct, attempts) {
  const safeCorrect = Math.max(0, Number(correct) || 0);
  const safeAttempts = Math.max(0, Number(attempts) || 0);
  return safeAttempts > 0 ? `${Math.round((safeCorrect / safeAttempts) * 1000) / 10}%` : '0%';
}

function formatFileTimestamp(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');
  const second = String(date.getSeconds()).padStart(2, '0');
  return `${year}${month}${day}-${hour}${minute}${second}`;
}

function formatCsvDateTime(date = new Date()) {
  return date.toLocaleString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
}

function escapeCsv(value) {
  const text = String(value ?? '');
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function rowsToCsv(rows) {
  return rows.map((row) => row.map(escapeCsv).join(',')).join('\n');
}

function parseCsvTable(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  const source = String(text || '').replace(/^\uFEFF/, '');
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];
    if (quoted) {
      if (char === '"' && next === '"') {
        cell += '"';
        index += 1;
      } else if (char === '"') {
        quoted = false;
      } else {
        cell += char;
      }
    } else if (char === '"') {
      quoted = true;
    } else if (char === ',') {
      row.push(cell);
      cell = '';
    } else if (char === '\n') {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = '';
    } else if (char !== '\r') {
      cell += char;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((items) => items.some((item) => String(item).trim()));
}

function csvRowsToObjects(text) {
  const rows = parseCsvTable(text);
  if (rows.length < 2) return [];
  const headers = rows[0].map((header) => String(header || '').trim());
  return rows.slice(1).map((row) => {
    const record = {};
    headers.forEach((header, index) => {
      record[header] = row[index] ?? '';
    });
    return record;
  });
}

function getCsvNumber(value) {
  const parsed = Number(String(value ?? '').replace(/[^0-9.-]/g, ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function getSafeStudentId(value) {
  return String(value || '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^0-9A-Za-z_-]/g, '')
    .slice(0, 24);
}

function getPracticeRecordConfig(recordType = 'gugudan') {
  return PRACTICE_RECORD_CONFIGS[recordType] || PRACTICE_RECORD_CONFIGS.gugudan;
}

function getPracticeRecordTypeForPack(packId = session?.packId) {
  return PRACTICE_RECORD_CONFIGS[packId] ? packId : '';
}

function isPracticeRecordPack(packId = session?.packId) {
  return Boolean(getPracticeRecordTypeForPack(packId));
}

function getPracticeGridKey(dan, multiplier, recordType = 'gugudan') {
  const config = getPracticeRecordConfig(recordType);
  return config.key === 'division-gugudan'
    ? `${dan}÷${multiplier}`
    : `${dan}x${multiplier}`;
}

function getPracticeGridExpression(dan, multiplier, recordType = 'gugudan') {
  const config = getPracticeRecordConfig(recordType);
  return config.key === 'division-gugudan'
    ? `${dan * multiplier}÷${dan}`
    : `${dan}x${multiplier}`;
}

function getGugudanFact(question, recordType = 'gugudan') {
  const text = String(question?.text || question?.prompt || '').trim();
  const config = getPracticeRecordConfig(recordType);
  if (config.key === 'division-gugudan') {
    const match = text.match(/(\d+)\s*(?:÷|\/)\s*(\d+)/i);
    if (!match) return null;
    const dividend = Number(match[1]);
    const divisor = Number(match[2]);
    const quotient = divisor ? dividend / divisor : 0;
    if (
      !Number.isFinite(dividend)
      || !Number.isFinite(divisor)
      || !Number.isInteger(quotient)
      || divisor < 2
      || divisor > 9
      || quotient < 1
      || quotient > 9
    ) {
      return null;
    }
    return {
      packId: config.packId,
      dan: divisor,
      multiplier: quotient,
      key: getPracticeGridKey(divisor, quotient, recordType),
      expression: `${dividend}÷${divisor}`
    };
  }

  const match = text.match(/(\d+)\s*(?:x|×|\*)\s*(\d+)/i);
  if (!match) return null;
  const dan = Number(match[1]);
  const multiplier = Number(match[2]);
  if (!Number.isFinite(dan) || !Number.isFinite(multiplier)) return null;
  return {
    packId: config.packId,
    dan,
    multiplier,
    key: getPracticeGridKey(dan, multiplier, recordType),
    expression: `${dan}x${multiplier}`
  };
}

function createEmptyGugudanAggregate(fact) {
  return {
    key: fact.key,
    packId: fact.packId || '',
    dan: fact.dan,
    multiplier: fact.multiplier,
    expression: fact.expression,
    attempts: 0,
    correct: 0,
    wrong: 0,
    lastWrongAt: ''
  };
}

function addGugudanAggregate(map, fact, values = {}) {
  if (!fact?.key) return null;
  if (!map.has(fact.key)) {
    map.set(fact.key, createEmptyGugudanAggregate(fact));
  }
  const item = map.get(fact.key);
  const correct = Math.max(0, Number(values.correct) || 0);
  const wrong = Math.max(0, Number(values.wrong) || 0);
  const attempts = Math.max(0, Number(values.attempts) || 0) || correct + wrong;
  item.attempts += attempts;
  item.correct += correct;
  item.wrong += wrong;
  if (values.lastWrongAt) item.lastWrongAt = String(values.lastWrongAt);
  return item;
}

function canUseLocalLearningStorage() {
  try {
    const key = `${LOCAL_PRACTICE_STORE_KEY}:test`;
    window.localStorage.setItem(key, '1');
    window.localStorage.removeItem(key);
    return true;
  } catch (_error) {
    return false;
  }
}

function getLocalRecordStorageKey(recordType, studentId) {
  return `${LOCAL_RECORD_STORAGE_PREFIX}:${recordType}:${getSafeStudentId(studentId)}`;
}

function getFallbackGugudanExpression(dan, multiplier, recordType = 'gugudan') {
  return getPracticeGridExpression(dan, multiplier, recordType);
}

function getStoredGugudanFact(item, recordType = 'gugudan') {
  const config = getPracticeRecordConfig(recordType);
  const dan = Math.round(Number(item?.dan) || 0);
  const multiplier = Math.round(Number(item?.multiplier) || 0);
  const expression = String(item?.expression || getFallbackGugudanExpression(dan, multiplier, recordType)).trim();
  const fact = getGugudanFact({ text: expression }, recordType) || {
    packId: item?.packId || config.packId,
    dan,
    multiplier,
    key: item?.key || getPracticeGridKey(dan, multiplier, recordType),
    expression
  };
  if (
    !Number.isFinite(fact.dan)
    || !Number.isFinite(fact.multiplier)
    || fact.dan < 2
    || fact.dan > 9
    || fact.multiplier < 1
    || fact.multiplier > 9
  ) {
    return null;
  }
  return {
    ...fact,
    packId: fact.packId || item?.packId || config.packId,
    key: fact.key || item?.key || getPracticeGridKey(fact.dan, fact.multiplier, recordType)
  };
}

function serializeGugudanFactMap(factMap) {
  return getSortedGugudanFacts(factMap).map((item) => ({
    key: item.key,
    packId: item.packId,
    dan: item.dan,
    multiplier: item.multiplier,
    expression: item.expression,
    attempts: Math.max(0, Number(item.attempts) || 0),
    correct: Math.max(0, Number(item.correct) || 0),
    wrong: Math.max(0, Number(item.wrong) || 0),
    lastWrongAt: item.lastWrongAt || ''
  }));
}

function createGugudanFactMapFromStoredItems(items = [], recordType = 'gugudan') {
  const factMap = new Map();
  items.forEach((item) => {
    const fact = getStoredGugudanFact(item, recordType);
    if (!fact) return;
    addGugudanAggregate(factMap, fact, {
      attempts: item.attempts,
      correct: item.correct,
      wrong: item.wrong,
      lastWrongAt: item.lastWrongAt
    });
  });
  return factMap;
}

function parseLocalGugudanRecordPayload(rawValue, recordType = 'gugudan') {
  try {
    const payload = typeof rawValue === 'string' ? JSON.parse(rawValue) : rawValue;
    if (!payload || payload.recordType !== recordType) return null;
    const studentId = getSafeStudentId(payload.studentId || '');
    const factItems = Array.isArray(payload.factItems) ? payload.factItems : [];
    const factMap = createGugudanFactMapFromStoredItems(factItems, recordType);
    return {
      version: Number(payload.version) || 0,
      recordType,
      studentId,
      studentIds: new Set(studentId ? [studentId] : []),
      sourceLabels: new Set([getPracticeRecordConfig(recordType).sourceLabel]),
      createdAt: String(payload.createdAt || ''),
      updatedAt: String(payload.updatedAt || ''),
      factMap
    };
  } catch (_error) {
    return null;
  }
}

function deserializeGugudanFactMap(items = [], recordType = 'gugudan') {
  return createGugudanFactMapFromStoredItems(items, recordType);
}

function createEmptyLocalPracticeStore() {
  return {
    version: 1,
    activeStudentByPack: {},
    records: {}
  };
}

function normalizeLocalPracticeStore(parsed) {
  if (!parsed || typeof parsed !== 'object') return createEmptyLocalPracticeStore();
  return {
    version: 1,
    activeStudentByPack: parsed.activeStudentByPack && typeof parsed.activeStudentByPack === 'object'
      ? parsed.activeStudentByPack
      : {},
    records: parsed.records && typeof parsed.records === 'object'
      ? parsed.records
      : {}
  };
}

function hasLocalPracticeStoreRecords(store) {
  return Object.values(store?.records || {}).some((packRecords) => (
    packRecords && typeof packRecords === 'object' && Object.keys(packRecords).length > 0
  ));
}

function mergeLocalPracticeStore(target, source) {
  Object.entries(source?.activeStudentByPack || {}).forEach(([recordType, studentId]) => {
    const safeStudentId = getSafeStudentId(studentId);
    if (safeStudentId && !target.activeStudentByPack[recordType]) {
      target.activeStudentByPack[recordType] = safeStudentId;
    }
  });

  Object.entries(source?.records || {}).forEach(([recordType, packRecords]) => {
    const config = getPracticeRecordConfig(recordType);
    if (!packRecords || typeof packRecords !== 'object') return;
    if (!target.records[config.key]) target.records[config.key] = {};
    Object.entries(packRecords).forEach(([studentId, entry]) => {
      const safeStudentId = getSafeStudentId(entry?.studentId || studentId);
      if (!safeStudentId || !Array.isArray(entry?.facts)) return;
      const existing = target.records[config.key][safeStudentId];
      if (!existing?.facts) {
        target.records[config.key][safeStudentId] = {
          studentId: safeStudentId,
          sourceLabel: entry.sourceLabel || config.sourceLabel,
          createdAt: String(entry.createdAt || ''),
          updatedAt: String(entry.updatedAt || ''),
          facts: serializeGugudanFactMap(deserializeGugudanFactMap(entry.facts, config.key))
        };
        return;
      }
      const mergedMap = deserializeGugudanFactMap(existing.facts, config.key);
      mergeGugudanFactMap(mergedMap, deserializeGugudanFactMap(entry.facts, config.key), config.key);
      const updatedCandidates = [existing.updatedAt, entry.updatedAt].filter(Boolean).sort();
      const createdCandidates = [existing.createdAt, entry.createdAt].filter(Boolean).sort();
      target.records[config.key][safeStudentId] = {
        ...existing,
        ...entry,
        studentId: safeStudentId,
        sourceLabel: entry.sourceLabel || existing.sourceLabel || config.sourceLabel,
        createdAt: createdCandidates[0] || '',
        updatedAt: updatedCandidates[updatedCandidates.length - 1] || '',
        facts: serializeGugudanFactMap(mergedMap)
      };
    });
  });
  return target;
}

function readLegacyJumpLocalPracticeStore() {
  const store = createEmptyLocalPracticeStore();
  ['gugudan', 'division-gugudan'].forEach((recordType) => {
    const config = getPracticeRecordConfig(recordType);
    const keyPrefix = `${LOCAL_RECORD_STORAGE_PREFIX}:${recordType}:`;
    try {
      for (let index = 0; index < window.localStorage.length; index += 1) {
        const key = window.localStorage.key(index) || '';
        if (!key.startsWith(keyPrefix)) continue;
        const record = parseLocalGugudanRecordPayload(window.localStorage.getItem(key), recordType);
        if (!record?.studentId || !record.factMap.size) continue;
        if (!store.records[config.key]) store.records[config.key] = {};
        store.records[config.key][record.studentId] = {
          studentId: record.studentId,
          sourceLabel: config.sourceLabel,
          createdAt: record.createdAt || '',
          updatedAt: record.updatedAt || '',
          facts: serializeGugudanFactMap(record.factMap)
        };
        if (!store.activeStudentByPack[config.key]) {
          store.activeStudentByPack[config.key] = record.studentId;
        }
      }
    } catch (_error) {
      // Ignore malformed legacy entries and keep any readable records.
    }
  });
  return store;
}

function removeLegacyLocalPracticeStores() {
  if (!canUseLocalLearningStorage()) return;
  const keysToRemove = new Set(LOCAL_PRACTICE_LEGACY_STORE_KEYS);
  try {
    for (let index = 0; index < window.localStorage.length; index += 1) {
      const key = window.localStorage.key(index) || '';
      if (key.startsWith(`${LOCAL_RECORD_STORAGE_PREFIX}:`)) {
        keysToRemove.add(key);
      }
    }
    keysToRemove.forEach((key) => window.localStorage.removeItem(key));
  } catch (_error) {
    // Migration already wrote the shared store; stale legacy keys can remain if cleanup fails.
  }
}

function readLocalPracticeStore() {
  if (!canUseLocalLearningStorage()) return null;
  const store = createEmptyLocalPracticeStore();
  let foundLegacyRecords = false;

  [LOCAL_PRACTICE_STORE_KEY, ...LOCAL_PRACTICE_LEGACY_STORE_KEYS].forEach((key) => {
    let parsed = null;
    try {
      parsed = JSON.parse(window.localStorage.getItem(key) || 'null');
    } catch (_error) {
      parsed = null;
    }
    const normalized = normalizeLocalPracticeStore(parsed);
    if (key !== LOCAL_PRACTICE_STORE_KEY && hasLocalPracticeStoreRecords(normalized)) {
      foundLegacyRecords = true;
    }
    mergeLocalPracticeStore(store, normalized);
  });

  const legacyJumpStore = readLegacyJumpLocalPracticeStore();
  if (hasLocalPracticeStoreRecords(legacyJumpStore)) {
    foundLegacyRecords = true;
    mergeLocalPracticeStore(store, legacyJumpStore);
  }

  if (foundLegacyRecords && hasLocalPracticeStoreRecords(store) && writeLocalPracticeStore(store)) {
    removeLegacyLocalPracticeStores();
  }
  return store;
}

function writeLocalPracticeStore(store) {
  if (!canUseLocalLearningStorage()) return false;
  try {
    window.localStorage.setItem(LOCAL_PRACTICE_STORE_KEY, JSON.stringify(store || createEmptyLocalPracticeStore()));
    return true;
  } catch (_error) {
    return false;
  }
}

function getLocalPracticeEntry(recordType = 'gugudan', studentId = '') {
  const config = getPracticeRecordConfig(recordType);
  const store = readLocalPracticeStore();
  if (!store) return null;
  const safeStudentId = getSafeStudentId(studentId || store.activeStudentByPack?.[config.key] || '');
  if (!safeStudentId) return null;
  const entry = store.records?.[config.key]?.[safeStudentId];
  if (!entry || !Array.isArray(entry.facts)) return null;
  return {
    store,
    config,
    studentId: safeStudentId,
    entry,
    record: {
      version: 1,
      recordType: config.key,
      studentId: safeStudentId,
      studentIds: new Set([safeStudentId]),
      sourceLabels: new Set([entry.sourceLabel || config.sourceLabel]),
      createdAt: String(entry.createdAt || ''),
      updatedAt: String(entry.updatedAt || ''),
      factMap: deserializeGugudanFactMap(entry.facts, config.key)
    }
  };
}

function getLocalPracticeActiveStudent(recordType = 'gugudan') {
  const config = getPracticeRecordConfig(recordType);
  const store = readLocalPracticeStore();
  return getSafeStudentId(store?.activeStudentByPack?.[config.key] || '');
}

function getPreferredPracticeStudentId(recordType = '') {
  const explicit = getSafeStudentId(selectedPracticeStudentId);
  if (explicit) return explicit;
  if (recordType) return getLocalPracticeActiveStudent(recordType);
  return getLocalPracticeActiveStudent('gugudan') || getLocalPracticeActiveStudent('division-gugudan');
}

function getPracticeStudentSummaryText() {
  const preferred = getPreferredPracticeStudentId();
  if (preferred) return `${preferred}번`;
  const gugudanStudent = getLocalPracticeActiveStudent('gugudan');
  const divisionStudent = getLocalPracticeActiveStudent('division-gugudan');
  if (gugudanStudent && divisionStudent && gugudanStudent !== divisionStudent) {
    return `구구단 ${gugudanStudent}번 · 나눗셈 ${divisionStudent}번`;
  }
  return '아직 선택 안 됨';
}

function setLocalPracticeActiveStudent(studentId, recordType = '') {
  const safeStudentId = getSafeStudentId(studentId);
  if (!safeStudentId || !canUseLocalLearningStorage()) return false;
  const store = readLocalPracticeStore();
  if (!store) return false;
  const recordTypes = recordType ? [recordType] : Object.keys(PRACTICE_RECORD_CONFIGS);
  recordTypes.forEach((type) => {
    const config = getPracticeRecordConfig(type);
    store.activeStudentByPack[config.key] = safeStudentId;
  });
  return writeLocalPracticeStore(store);
}

function setPreferredPracticeStudentId(studentId, options = {}) {
  const safeStudentId = getSafeStudentId(studentId);
  selectedPracticeStudentId = safeStudentId;
  if (safeStudentId && options.persist !== false) {
    setLocalPracticeActiveStudent(safeStudentId, options.recordType || '');
  }
  refreshPracticeStudentUi();
  return safeStudentId;
}

function refreshPracticeStudentUi() {
  const summaryText = getPracticeStudentSummaryText();
  const preferred = getPreferredPracticeStudentId();
  if (elements.practiceCurrentStudent) {
    elements.practiceCurrentStudent.textContent = summaryText;
  }
  if (elements.practiceCurrentStudentHint) {
    elements.practiceCurrentStudentHint.textContent = preferred
      ? '저장과 상태 확인은 이 번호 기준으로 시작합니다.'
      : '결과 저장 전에 번호를 확인하세요.';
  }
  if (elements.practiceRecordManagerCurrentStudent) {
    elements.practiceRecordManagerCurrentStudent.textContent = summaryText;
  }
  updateResultRecordStudentUi();
}

function updateResultRecordStudentUi() {
  if (!elements.gugudanRecordPanel || elements.gugudanRecordPanel.classList.contains('is-hidden')) return;
  const preferred = getPreferredPracticeStudentId(getCurrentPracticeRecordType());
  const currentValue = getSafeStudentId(elements.gugudanStudentId?.value || '');
  if (preferred && elements.gugudanStudentId && !currentValue) {
    elements.gugudanStudentId.value = preferred;
  }
  const studentId = getSafeStudentId(elements.gugudanStudentId?.value || preferred || '');
  if (elements.gugudanDownloadCurrentButton) {
    elements.gugudanDownloadCurrentButton.textContent = studentId
      ? `${studentId}번 기록으로 저장하기`
      : '학생번호 입력 후 저장하기';
  }
  if (elements.gugudanStudentNote) {
    const hasMismatch = Boolean(preferred && studentId && preferred !== studentId);
    elements.gugudanStudentNote.classList.toggle('is-warning', hasMismatch);
    if (!studentId) {
      elements.gugudanStudentNote.textContent = '저장할 학생번호를 입력하세요.';
    } else if (hasMismatch) {
      elements.gugudanStudentNote.textContent = `현재 선택은 ${preferred}번입니다. 저장하면 ${studentId}번 기록으로 저장됩니다.`;
    } else {
      elements.gugudanStudentNote.textContent = `${studentId}번 기록으로 저장합니다.`;
    }
  }
}

function promptPracticeStudentSwitch() {
  const current = getPreferredPracticeStudentId();
  const entered = getSafeStudentId(window.prompt(
    '현재 사용할 학생번호를 입력하세요.\n결과 저장과 내 상태 확인이 이 번호 기준으로 시작됩니다.',
    current
  ) || '');
  if (!entered) return;
  if (!window.confirm(
    `${entered}번을 이 기기의 현재 학생번호로 표시합니다.\n\n`
    + '지금 이 기기를 사용하는 학생의 번호가 맞나요?'
  )) {
    return;
  }
  setPreferredPracticeStudentId(entered);
}

function saveLocalPracticeRecord(recordType, studentId, factMap, options = {}) {
  const config = getPracticeRecordConfig(recordType);
  const safeStudentId = getSafeStudentId(studentId);
  if (!safeStudentId || !factMap?.size) return null;
  const store = readLocalPracticeStore();
  if (!store) return null;
  if (!store.records[config.key]) store.records[config.key] = {};
  const existing = store.records[config.key][safeStudentId];
  const mergedMap = options.replace || !existing?.facts
    ? new Map()
    : deserializeGugudanFactMap(existing.facts, config.key);
  mergeGugudanFactMap(mergedMap, factMap, config.key);
  if (!mergedMap.size) return null;

  const nowText = new Date().toISOString();
  store.records[config.key][safeStudentId] = {
    studentId: safeStudentId,
    sourceLabel: config.sourceLabel,
    createdAt: existing?.createdAt || nowText,
    updatedAt: nowText,
    facts: serializeGugudanFactMap(mergedMap)
  };
  store.activeStudentByPack[config.key] = safeStudentId;
  selectedPracticeStudentId = safeStudentId;
  if (!writeLocalPracticeStore(store)) return null;
  return getLocalPracticeEntry(config.key, safeStudentId)?.record || {
    version: 1,
    recordType: config.key,
    studentId: safeStudentId,
    studentIds: new Set([safeStudentId]),
    sourceLabels: new Set([config.sourceLabel]),
    createdAt: store.records[config.key][safeStudentId].createdAt,
    updatedAt: nowText,
    factMap: mergedMap
  };
}

function loadLocalGugudanRecord(studentId, recordType = 'gugudan') {
  const safeStudentId = getSafeStudentId(studentId);
  if (!safeStudentId) return null;
  return getLocalPracticeEntry(recordType, safeStudentId)?.record || null;
}

function getLocalGugudanRecordSummaries(recordType = 'gugudan') {
  const config = getPracticeRecordConfig(recordType);
  const store = readLocalPracticeStore();
  const records = store?.records?.[config.key] || {};
  const summaries = [];
  Object.entries(records).forEach(([studentId, entry]) => {
    const safeStudentId = getSafeStudentId(entry?.studentId || studentId);
    if (!safeStudentId || !Array.isArray(entry?.facts)) return;
    const record = getLocalPracticeEntry(config.key, safeStudentId)?.record;
    if (!record?.factMap?.size) return;
    const stats = getGugudanAggregateStats(record.factMap);
    summaries.push({
      studentId: safeStudentId,
      record,
      updatedAt: record.updatedAt,
      attempts: stats.attempts,
      accuracy: stats.accuracy
    });
  });
  return summaries.sort((left, right) => (
    String(right.updatedAt).localeCompare(String(left.updatedAt))
    || String(left.studentId).localeCompare(String(right.studentId), 'ko-KR')
  ));
}

function selectLocalGugudanRecord(recordType = 'gugudan', purposeText = '확인') {
  const config = getPracticeRecordConfig(recordType);
  const summaries = getLocalGugudanRecordSummaries(recordType);
  if (!summaries.length) return null;
  const preferred = getPreferredPracticeStudentId(recordType);
  if (preferred) {
    const matched = summaries.find((item) => item.studentId === preferred);
    if (matched) return matched;
    renderGugudanStatusPanelError(
      `${preferred}번 ${config.sourceLabel} 로컬 기록이 없습니다. 번호를 바꾸거나 CSV에서 복구한 뒤 다시 시도하세요.`,
      recordType
    );
    return null;
  }
  if (summaries.length === 1) return summaries[0];
  const savedIds = summaries.map((item) => item.studentId).join(', ');
  const requestedId = getSafeStudentId(window.prompt(
    `${config.sourceLabel} 로컬 기록이 여러 개 있습니다.\n${purposeText}할 학생번호를 입력하세요.\n저장된 학생번호: ${savedIds}`,
    summaries[0].studentId
  ) || '');
  const selected = summaries.find((item) => item.studentId === requestedId);
  if (!selected) {
    renderGugudanStatusPanelError('저장된 학생번호 중 하나를 정확히 입력해야 합니다.', recordType);
    return null;
  }
  return selected;
}

function getSingleCsvStudentId(parsed, fallbackStudentId = '') {
  const ids = Array.from(parsed?.studentIds || []).filter(Boolean);
  if (ids.length > 1) {
    return { studentId: '', error: '학생번호가 여러 개인 기록은 로컬 저장으로 불러올 수 없습니다. 한 학생의 기록만 선택하세요.' };
  }
  const studentId = getSafeStudentId(ids[0] || fallbackStudentId);
  if (!studentId) {
    return { studentId: '', error: '학생번호가 없는 기록은 로컬 저장으로 불러올 수 없습니다.' };
  }
  return { studentId, error: '' };
}

function confirmLocalGugudanWrite(studentId, recordType = 'gugudan', actionText = '저장') {
  const config = getPracticeRecordConfig(recordType);
  const activeStudentId = getLocalPracticeActiveStudent(recordType);
  const activeText = activeStudentId && activeStudentId !== studentId
    ? `\n현재 이 기기의 ${config.sourceLabel} 사용자는 ${activeStudentId}번으로 되어 있습니다.`
    : '';
  return window.confirm(
    `${studentId}번 학생의 ${config.sourceLabel} 기록으로 ${actionText}합니다.\n\n`
    + `지금 이 기기를 사용하는 학생이 ${studentId}번이 맞나요?\n`
    + '다른 학생이면 취소하고 번호를 바꾸세요.'
    + activeText
  );
}

function formatGugudanFactMapSummary(factMap) {
  if (!factMap?.size) return '기록 없음';
  const stats = getGugudanAggregateStats(factMap);
  return `풀이 ${stats.attempts}회 · 정답률 ${stats.accuracy} · 오답 ${stats.wrong}회`;
}

function confirmLocalGugudanImportReplace(studentId, recordType = 'gugudan', incomingFactMap = null, sourceText = 'CSV 백업') {
  const config = getPracticeRecordConfig(recordType);
  const activeStudentId = getLocalPracticeActiveStudent(recordType);
  const localRecord = loadLocalGugudanRecord(studentId, recordType);
  const incomingText = formatGugudanFactMapSummary(incomingFactMap);
  const localText = formatGugudanFactMapSummary(localRecord?.factMap);
  const activeText = activeStudentId && activeStudentId !== studentId
    ? `\n현재 이 기기의 ${config.sourceLabel} 사용자는 ${activeStudentId}번으로 되어 있습니다.`
    : '';
  return window.confirm(
    `${sourceText}로 ${studentId}번 ${config.sourceLabel} 상태를 복구합니다.\n\n`
    + `${sourceText}: ${incomingText}\n`
    + `현재 로컬: ${localText}\n\n`
    + `지금 이 기기를 사용하는 학생이 ${studentId}번이 맞나요?\n`
    + '이 기기에 저장된 기존 로컬 기록은 선택한 기록 내용으로 대체됩니다.\n'
    + '오래된 파일이라면 최근 풀이 기록이 사라질 수 있습니다.\n'
    + '다른 학생이면 취소하고 번호를 바꾸세요.'
    + activeText
  );
}

function saveGugudanFactMapToLocal(studentId, recordType = 'gugudan', factMap = new Map(), options = {}) {
  const safeStudentId = getSafeStudentId(studentId);
  if (!safeStudentId) return { ok: false, message: '학생번호가 필요합니다.' };
  if (!canUseLocalLearningStorage()) {
    return { ok: false, message: '이 브라우저에서는 로컬 저장을 사용할 수 없습니다. CSV 백업 저장을 이용하세요.' };
  }
  if (!factMap?.size) {
    return { ok: false, message: `저장할 ${getPracticeRecordConfig(recordType).sourceLabel} 기록이 없습니다.` };
  }

  const record = saveLocalPracticeRecord(recordType, safeStudentId, factMap, {
    replace: options.mergeExisting === false
  });
  if (!record) {
    return { ok: false, message: '로컬 저장 중 오류가 발생했습니다. CSV 백업 저장을 이용하세요.' };
  }
  selectedPracticeStudentId = safeStudentId;
  refreshPracticeStudentUi();
  return {
    ok: true,
    message: '로컬 기록을 업데이트했습니다. CSV 백업도 주기적으로 저장해 두세요.',
    record
  };
}

function createGugudanAggregateFromRecords(records = [], recordType = 'gugudan') {
  const config = getPracticeRecordConfig(recordType);
  const factMap = new Map();
  records.forEach((record) => {
    if (record.recordType && record.recordType !== recordType) return;
    const fact = {
      packId: record.packId || config.packId,
      dan: record.dan,
      multiplier: record.multiplier,
      key: record.factKey || getPracticeGridKey(record.dan, record.multiplier, recordType),
      expression: record.expression || getPracticeGridExpression(record.dan, record.multiplier, recordType)
    };
    addGugudanAggregate(factMap, fact, {
      attempts: 1,
      correct: record.correct ? 1 : 0,
      wrong: record.correct ? 0 : 1,
      lastWrongAt: record.correct ? '' : record.answeredAt
    });
  });
  return factMap;
}

function parseGugudanCsvAggregate(text, recordType = 'gugudan') {
  const rows = csvRowsToObjects(text);
  const factMap = new Map();
  const studentIds = new Set();
  const sourceLabels = new Set();
  rows.forEach((row) => {
    const studentId = String(row['학생번호'] || '').trim();
    if (studentId) studentIds.add(studentId);
    const sourceLabel = String(row['퀴즈팩'] || '').trim();
    if (sourceLabel) sourceLabels.add(sourceLabel);
    const rowType = String(row['행구분'] || '').trim();
    const expression = String(row['식'] || row['문항'] || '').trim();
    if (rowType && rowType !== '문항') return;
    if (!expression) return;
    const fact = getGugudanFact({ text: expression }, recordType);
    if (!fact) return;
    addGugudanAggregate(factMap, fact, {
      attempts: getCsvNumber(row['시도']),
      correct: getCsvNumber(row['정답']),
      wrong: getCsvNumber(row['오답']),
      lastWrongAt: row['최근오답시각']
    });
  });
  return { factMap, studentIds, sourceLabels, recordType };
}

function getWeaknessPracticeLabel(recordType = 'gugudan') {
  return `${getPracticeRecordConfig(recordType).sourceLabel} 취약점 연습`;
}

function getActiveWeaknessPractice(packId = selectedPackId) {
  if (!activeWeaknessPractice) return null;
  return activeWeaknessPractice.packId === packId ? activeWeaknessPractice : null;
}

function clearWeaknessPractice(message = '') {
  if (!activeWeaknessPractice) return;
  activeWeaknessPractice = null;
  if (message && elements.setupError) elements.setupError.textContent = message;
}

function getWeaknessPracticeInput(recordType = 'gugudan') {
  return recordType === 'division-gugudan'
    ? elements.divisionGugudanWeaknessPracticeFile
    : elements.gugudanWeaknessPracticeFile;
}

function openGugudanStatusDetails() {
  setGugudanStatusOpen(true);
}

function setGugudanStatusOpen(open) {
  if (!elements.gugudanStatusCheck) return;
  elements.gugudanStatusCheck.classList.toggle('is-collapsed', !open);
  elements.gugudanStatusToggle?.setAttribute('aria-expanded', String(open));
  if (elements.gugudanStatusToggle) {
    elements.gugudanStatusToggle.textContent = open ? '접기' : '펴기';
  }
}

function renderWeaknessPracticeStatus(message, recordType = 'gugudan', options = {}) {
  if (!elements.gugudanStatusPanel || !elements.gugudanStatusContent) return;
  openGugudanStatusDetails();
  const config = getPracticeRecordConfig(recordType);
  const busy = options.kind === 'busy';
  const error = options.kind === 'error';
  elements.gugudanStatusPanel.classList.remove('is-hidden', 'is-error', 'is-success');
  elements.gugudanStatusPanel.classList.toggle('is-error', error);
  elements.gugudanStatusPanel.classList.toggle('is-success', !error);
  const metrics = Array.isArray(options.metrics) ? options.metrics : [];
  elements.gugudanStatusContent.innerHTML = `
    <div class="gugudan-status-head">
      <b>${escapeHtml(config.sourceLabel)} 취약점 연습</b>
      <span>${escapeHtml(busy ? '분석 중' : (options.fileName || '기록 파일'))}</span>
    </div>
    ${metrics.length ? `
      <div class="gugudan-status-grid">
        ${metrics.map(([label, value]) => `
          <div><span>${escapeHtml(label)}</span><b>${escapeHtml(value)}</b></div>
        `).join('')}
      </div>
    ` : ''}
    <p class="gugudan-status-message${error ? '' : ' is-strong'}">${escapeHtml(message)}</p>
  `;
}

function getPracticeAnswerRange(recordType = 'gugudan') {
  return recordType === 'division-gugudan'
    ? { min: 1, max: 9 }
    : { min: 2, max: 81 };
}

function createPracticeChoiceValues(answer, fact, recordType = 'gugudan') {
  const safeAnswer = Math.round(Number(answer) || 0);
  const range = getPracticeAnswerRange(recordType);
  const values = new Set([safeAnswer]);
  const add = (value) => {
    const next = Math.round(Number(value) || 0);
    if (next >= range.min && next <= range.max) values.add(next);
  };

  if (recordType === 'division-gugudan') {
    add(safeAnswer - 2);
    add(safeAnswer - 1);
    add(safeAnswer + 1);
    add(safeAnswer + 2);
  } else {
    add((fact.dan || 0) * ((fact.multiplier || 0) - 1));
    add((fact.dan || 0) * ((fact.multiplier || 0) + 1));
    add(((fact.dan || 0) - 1) * (fact.multiplier || 0));
    add(((fact.dan || 0) + 1) * (fact.multiplier || 0));
    add(safeAnswer - (fact.dan || 0));
    add(safeAnswer + (fact.dan || 0));
  }

  for (let offset = 1; values.size < 4 && offset <= 12; offset += 1) {
    add(safeAnswer - offset);
    add(safeAnswer + offset);
  }
  for (let value = range.min; values.size < 4 && value <= range.max; value += 1) {
    add(value);
  }
  const distractors = Array.from(values).filter((value) => value !== safeAnswer);
  return shuffle([safeAnswer, ...shuffle(distractors).slice(0, 3)]).map(String);
}

function createWeaknessPracticeQuestion(item, recordType = 'gugudan', index = 0) {
  const config = getPracticeRecordConfig(recordType);
  const dan = Math.round(Number(item?.dan) || 0);
  const multiplier = Math.round(Number(item?.multiplier) || 0);
  const answer = recordType === 'division-gugudan' ? multiplier : dan * multiplier;
  const text = recordType === 'division-gugudan'
    ? `${dan * multiplier} ÷ ${dan} = ?`
    : `${dan} × ${multiplier} = ?`;
  return {
    id: `weakness-${config.key}-${dan}-${multiplier}-${index}`,
    prompt: '취약점 연습 문제',
    text,
    choices: createPracticeChoiceValues(answer, { dan, multiplier }, recordType),
    answer: String(answer),
    asset: false,
    weaknessPractice: true
  };
}

function buildWeaknessPracticeQuestions(factMap, recordType = 'gugudan') {
  const allAttempted = getSortedGugudanFacts(factMap).filter((item) => item.attempts > 0);
  const facts = allAttempted.filter((item) => item.wrong > 0);
  const danger = sortGugudanWeakItems(facts.filter((item) => getGugudanRiskLevel(item) === 'danger'));
  const warning = sortGugudanWeakItems(facts.filter((item) => getGugudanRiskLevel(item) === 'warning'));
  const stable = allAttempted
    .filter((item) => getGugudanRiskLevel(item) === 'ok')
    .sort((left, right) => right.attempts - left.attempts || left.dan - right.dan || left.multiplier - right.multiplier);
  const ordered = [...danger, ...warning];
  const weighted = [];
  danger.forEach((item) => {
    for (let index = 0; index < 4; index += 1) weighted.push(item);
  });
  warning.forEach((item) => {
    for (let index = 0; index < 2; index += 1) weighted.push(item);
  });
  const stableReviewCount = Math.min(stable.length, weighted.length ? Math.max(1, Math.round(weighted.length * 0.08)) : 0);
  stable.slice(0, stableReviewCount).forEach((item) => weighted.push(item));
  if (!weighted.length) return { questions: [], dangerCount: 0, warningCount: 0, stableCount: 0, weakCount: 0 };
  while (weighted.length < Math.min(18, Math.max(6, ordered.length * 3))) {
    ordered.forEach((item) => weighted.push(item));
  }
  return {
    questions: shuffle(weighted).map((item, index) => createWeaknessPracticeQuestion(item, recordType, index + 1)),
    dangerCount: danger.length,
    warningCount: warning.length,
    stableCount: stableReviewCount,
    weakCount: ordered.length
  };
}

async function prepareWeaknessPracticeFromRecord(parsed, recordType = 'gugudan', sourceName = '', startedAt = performance.now()) {
  const config = getPracticeRecordConfig(recordType);
  await keepMinimumLoadingTime(startedAt, WEAKNESS_PRACTICE_MIN_READY_MS);
  if (!parsed?.factMap?.size) {
    activeWeaknessPractice = null;
    renderWeaknessPracticeStatus(config.missingText, recordType, { kind: 'error', fileName: sourceName });
    return;
  }
  const studentIds = Array.from(parsed.studentIds || []).filter(Boolean);
  if (studentIds.length > 1) {
    activeWeaknessPractice = null;
    renderWeaknessPracticeStatus('학생번호가 여러 개인 파일입니다. 한 학생의 종합 기록 파일을 선택해 주세요.', recordType, {
      kind: 'error',
      fileName: sourceName
    });
    return;
  }
  const built = buildWeaknessPracticeQuestions(parsed.factMap, recordType);
  if (!built.questions.length) {
    activeWeaknessPractice = null;
    renderWeaknessPracticeStatus('누적 오답이 없어 취약점 연습 문제를 만들지 않았습니다. 일반 연습으로 진행해도 됩니다.', recordType, {
      kind: 'error',
      fileName: sourceName
    });
    return;
  }

  selectedPackId = config.packId;
  selectedPlayers = 1;
  activeWeaknessPractice = {
    recordType,
    packId: config.packId,
    label: getWeaknessPracticeLabel(recordType),
    fileName: sourceName,
    studentText: studentIds[0] || '학생번호 없음',
    questions: built.questions,
    dangerCount: built.dangerCount,
    warningCount: built.warningCount,
    stableCount: built.stableCount,
    weakCount: built.weakCount
  };
  renderSetupControls();
  renderWeaknessPracticeStatus('준비 완료 · 도전 시작을 누르면 1인 취약점 연습으로 시작합니다.', recordType, {
    fileName: sourceName,
    metrics: [
      ['학생번호', activeWeaknessPractice.studentText],
      ['집중 연습', `${built.dangerCount}문항`],
      ['다시 확인', `${built.warningCount}문항`],
      ['안정 확인', `${built.stableCount}문항`],
      ['출제 목록', `${built.questions.length}문제`]
    ]
  });
}

async function prepareWeaknessPracticeFromFile(file, recordType = 'gugudan') {
  if (!file) return;
  const config = getPracticeRecordConfig(recordType);
  const input = getWeaknessPracticeInput(recordType);
  const startedAt = performance.now();
  elements.setupError.textContent = '';
  elements.startButton.disabled = true;
  renderWeaknessPracticeStatus(`${config.sourceLabel} 기록을 읽고 취약 문항을 고르는 중입니다.`, recordType, {
    kind: 'busy',
    fileName: file.name || ''
  });

  try {
    const text = await file.text();
    const parsed = parseGugudanCsvAggregate(text, recordType);
    await prepareWeaknessPracticeFromRecord(parsed, recordType, file.name || '', startedAt);
  } catch (_error) {
    activeWeaknessPractice = null;
    renderWeaknessPracticeStatus(`${config.sourceLabel} 기록 파일을 읽을 수 없습니다. 파일 형식을 확인하세요.`, recordType, {
      kind: 'error',
      fileName: file.name || ''
    });
  } finally {
    if (input) input.value = '';
    updateSetupSummary();
  }
}

async function prepareWeaknessPracticeFromLocal(recordType = 'gugudan') {
  const config = getPracticeRecordConfig(recordType);
  const startedAt = performance.now();
  const preferred = getPreferredPracticeStudentId(recordType);
  const summaries = getLocalGugudanRecordSummaries(recordType);
  const selected = selectLocalGugudanRecord(recordType, '취약점 연습');
  if (!selected) {
    if (preferred || summaries.length) {
      renderWeaknessPracticeStatus(
        `${preferred ? `${preferred}번 ` : ''}${config.sourceLabel} 로컬 기록이 없습니다. 번호를 바꾸거나 CSV에서 복구한 뒤 다시 시도하세요.`,
        recordType,
        { kind: 'error', fileName: '로컬 기록' }
      );
      updateSetupSummary();
      return;
    }
    renderWeaknessPracticeStatus(`이 기기에 저장된 ${config.sourceLabel} 기록이 없습니다. CSV 백업 파일을 선택해 취약점 연습을 준비합니다.`, recordType, {
      kind: 'busy',
      fileName: 'CSV 백업'
    });
    const input = getWeaknessPracticeInput(recordType);
    if (input) {
      input.value = '';
      input.click();
    }
    return;
  }
  elements.setupError.textContent = '';
  elements.startButton.disabled = true;
  renderWeaknessPracticeStatus(`${config.sourceLabel} 로컬 기록을 읽고 취약 문항을 고르는 중입니다.`, recordType, {
    kind: 'busy',
    fileName: `학생번호 ${selected.studentId}`
  });
  await prepareWeaknessPracticeFromRecord(selected.record, recordType, `로컬 저장 · 학생번호 ${selected.studentId}`, startedAt);
  updateSetupSummary();
}

function getSortedGugudanFacts(factMap) {
  return Array.from(factMap.values()).sort((left, right) => (
    left.dan - right.dan || left.multiplier - right.multiplier
  ));
}

function getGugudanDanSummary(factMap) {
  const danMap = new Map();
  getSortedGugudanFacts(factMap).forEach((item) => {
    if (!danMap.has(item.dan)) {
      danMap.set(item.dan, { dan: item.dan, attempts: 0, correct: 0, wrong: 0 });
    }
    const dan = danMap.get(item.dan);
    dan.attempts += item.attempts;
    dan.correct += item.correct;
    dan.wrong += item.wrong;
  });
  return Array.from(danMap.values()).sort((left, right) => left.dan - right.dan);
}

function buildGugudanCsv(studentId, factMap, options = {}) {
  const config = getPracticeRecordConfig(options.recordType || session?.packId || 'gugudan');
  const createdAt = options.createdAt || new Date();
  const createdText = formatCsvDateTime(createdAt);
  const minutes = options.minutes || session?.minutes || '';
  const playedText = options.playedText || '';
  const sourceLabel = options.sourceLabel || config.sourceLabel;
  const rows = [[
    '행구분',
    '학생번호',
    '생성일시',
    '퀴즈팩',
    '선택시간분',
    '플레이시간',
    '단',
    '식',
    '시도',
    '정답',
    '오답',
    '정답률',
    '최근오답시각'
  ]];
  getGugudanDanSummary(factMap).forEach((item) => {
    rows.push([
      '단요약',
      studentId,
      createdText,
      sourceLabel,
      minutes,
      playedText,
      config.groupLabel(item),
      '',
      item.attempts,
      item.correct,
      item.wrong,
      formatCsvAccuracy(item.correct, item.attempts),
      ''
    ]);
  });
  getSortedGugudanFacts(factMap).forEach((item) => {
    rows.push([
      '문항',
      studentId,
      createdText,
      sourceLabel,
      minutes,
      playedText,
      config.groupLabel(item),
      item.expression,
      item.attempts,
      item.correct,
      item.wrong,
      formatCsvAccuracy(item.correct, item.attempts),
      item.lastWrongAt || ''
    ]);
  });
  return rowsToCsv(rows);
}

function downloadCsvFile(filename, csvText) {
  const blob = new Blob([`\uFEFF${csvText}`], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

function getQrShareUrl() {
  return QR_SHARE_URL;
}

function createQrSvg(text) {
  const qrFactory = window.QRCodeGenerator;
  if (typeof qrFactory !== 'function') return null;
  const qr = qrFactory(text, {
    typeNumber: -1,
    errorCorrectLevel: qrFactory.ErrorCorrectLevel?.M || 0
  });
  const cells = Array.isArray(qr.modules) ? qr.modules : [];
  const size = cells.length;
  if (!size) return null;
  const quiet = 4;
  const viewSize = size + quiet * 2;
  let pathData = '';
  for (let row = 0; row < size; row += 1) {
    for (let col = 0; col < size; col += 1) {
      if (cells[row]?.[col]) pathData += `M${col + quiet} ${row + quiet}h1v1h-1z`;
    }
  }
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svg.setAttribute('viewBox', `0 0 ${viewSize} ${viewSize}`);
  svg.setAttribute('role', 'img');
  svg.setAttribute('aria-label', '접속 QR 코드');
  svg.classList.add('qr-svg');
  const background = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
  background.setAttribute('width', String(viewSize));
  background.setAttribute('height', String(viewSize));
  background.setAttribute('fill', '#ffffff');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathData);
  path.setAttribute('fill', '#000000');
  svg.append(background, path);
  return svg;
}

function renderQrModal() {
  if (!elements.qrLarge || !elements.qrUrlText) return;
  const shareUrl = getQrShareUrl();
  elements.qrLarge.innerHTML = '';
  const svg = createQrSvg(shareUrl);
  if (svg) {
    elements.qrLarge.appendChild(svg);
  } else {
    const fallback = document.createElement('div');
    fallback.className = 'qr-fallback';
    fallback.textContent = 'QR을 만들 수 없습니다. 아래 주소를 직접 입력하세요.';
    elements.qrLarge.appendChild(fallback);
  }
  elements.qrUrlText.textContent = shareUrl;
}

function openQrModal() {
  if (!elements.qrModal) return;
  renderQrModal();
  elements.qrModal.classList.remove('is-hidden');
  document.documentElement.classList.add('qr-modal-open');
  document.body.classList.add('qr-modal-open');
}

function closeQrModal() {
  elements.qrModal?.classList.add('is-hidden');
  document.documentElement.classList.remove('qr-modal-open');
  document.body.classList.remove('qr-modal-open');
}

function recordGugudanAnswer(question, choice, correct, quiz) {
  const recordType = getPracticeRecordTypeForPack(session?.packId);
  if (!session || !recordType || session.players.length !== 1) return;
  const fact = getGugudanFact(question, recordType);
  if (!fact) return;
  const startedAtMs = Number(quiz?.questionStartedAtMs) || 0;
  session.gugudanRecords.push({
    recordType,
    packId: fact.packId || recordType,
    factKey: fact.key,
    dan: fact.dan,
    multiplier: fact.multiplier,
    expression: fact.expression,
    questionText: question?.text || '',
    answer: String(question?.answer ?? ''),
    selectedChoice: String(choice ?? ''),
    correct: Boolean(correct),
    responseMs: startedAtMs ? Math.max(0, Date.now() - startedAtMs) : 0,
    answeredAt: formatCsvDateTime(new Date())
  });
}

function isGugudanSoloRecordResult() {
  return !!session && isPracticeRecordPack(session.packId) && session.players.length === 1;
}

function getCurrentPracticeRecordType() {
  return getPracticeRecordTypeForPack(session?.packId) || 'gugudan';
}

function getCurrentGugudanFactMap() {
  return createGugudanAggregateFromRecords(session?.gugudanRecords || [], getCurrentPracticeRecordType());
}

function getGugudanWeaknessText(factMap, recordType = 'gugudan') {
  const config = getPracticeRecordConfig(recordType);
  const items = getSortedGugudanFacts(factMap);
  const totalAttempts = items.reduce((sum, item) => sum + item.attempts, 0);
  if (!totalAttempts) return config.emptyText;
  const weakItems = items
    .filter((item) => item.wrong > 0)
    .sort((left, right) => right.wrong - left.wrong || left.dan - right.dan || left.multiplier - right.multiplier)
    .slice(0, 3);
  if (!weakItems.length) return '이번 판 오답 없음 · 모든 풀이가 정답입니다.';
  return `오답 확인: ${weakItems.map((item) => `${config.factLabel(item)} (${item.wrong}회)`).join(', ')}`;
}

function setGugudanRecordStatus(message = '', kind = '') {
  if (!elements.gugudanRecordStatus) return;
  elements.gugudanRecordStatus.textContent = message;
  elements.gugudanRecordStatus.classList.toggle('is-error', kind === 'error');
  elements.gugudanRecordStatus.classList.toggle('is-success', kind === 'success');
}

function renderGugudanRecordPanel() {
  const panel = elements.gugudanRecordPanel;
  const resultModal = elements.resultScreen?.querySelector('.result-modal');
  if (!panel) return;
  const visible = isGugudanSoloRecordResult();
  panel.classList.toggle('is-hidden', !visible);
  resultModal?.classList.toggle('has-gugudan-record', visible);
  if (!visible) {
    setGugudanRecordStatus('');
    return;
  }

  const recordType = getCurrentPracticeRecordType();
  const config = getPracticeRecordConfig(recordType);
  const factMap = getCurrentGugudanFactMap();
  const hasRecords = factMap.size > 0;
  const weaknessMode = session?.practiceMode?.type === 'weakness';
  const title = panel.querySelector('.gugudan-record-copy b');
  const copy = panel.querySelector('.gugudan-record-copy p');
  if (title) title.textContent = weaknessMode ? `${config.sourceLabel} 취약점 연습 기록 저장` : config.recordTitle;
  if (copy) {
    if (hasRecords && weaknessMode) {
      copy.textContent = `${getGugudanWeaknessText(factMap, recordType)} 취약점 연습 결과도 로컬 기록에 누적됩니다.`;
    } else {
      copy.textContent = hasRecords
        ? getGugudanWeaknessText(factMap, recordType)
        : '문제를 1개 이상 풀면 로컬 기록에 저장할 수 있습니다. CSV는 백업용입니다.';
    }
  }
  if (elements.gugudanDownloadCurrentButton) elements.gugudanDownloadCurrentButton.disabled = !hasRecords;
  if (elements.gugudanDownloadBackupButton) elements.gugudanDownloadBackupButton.disabled = !hasRecords;
  if (elements.gugudanMergeCsvButton) elements.gugudanMergeCsvButton.disabled = !hasRecords;
  updateResultRecordStudentUi();
  setGugudanRecordStatus(hasRecords ? '로컬 저장이 기본입니다. CSV 백업은 기록이 사라질 때를 대비해 보관하세요.' : `저장할 ${config.sourceLabel} 풀이 기록이 없습니다.`, hasRecords ? '' : 'error');
}

function getStudentIdForCsv() {
  const rawValue = elements.gugudanStudentId?.value || '';
  const studentId = getSafeStudentId(rawValue);
  if (elements.gugudanStudentId) elements.gugudanStudentId.value = studentId;
  updateResultRecordStudentUi();
  if (!studentId) {
    setGugudanRecordStatus('학생번호를 입력해야 기록을 저장할 수 있습니다.', 'error');
    elements.gugudanStudentId?.focus();
    return '';
  }
  return studentId;
}

function getGugudanCsvFilename(studentId, merged = false, recordType = 'gugudan') {
  const config = getPracticeRecordConfig(recordType);
  const stamp = formatFileTimestamp(new Date());
  return merged ? `${config.filenamePrefix}${studentId}-종합.csv` : `${config.filenamePrefix}${studentId}-${stamp}.csv`;
}

function getGugudanCsvOptions() {
  const recordType = getCurrentPracticeRecordType();
  const config = getPracticeRecordConfig(recordType);
  const summary = session ? summarizeSession() : { playedSec: 0 };
  return {
    recordType,
    minutes: session?.minutes || '',
    playedText: formatClock(summary.playedSec || 0),
    sourceLabel: session?.packLabel || config.sourceLabel
  };
}

function hasCurrentGugudanSessionSavedToLocal(studentId, recordType = getCurrentPracticeRecordType()) {
  const marker = session?.localLearningRecordSaved;
  return Boolean(marker && marker.studentId === studentId && marker.recordType === recordType);
}

function markCurrentGugudanSessionSavedToLocal(studentId, recordType = getCurrentPracticeRecordType()) {
  if (!session) return;
  session.localLearningRecordSaved = { studentId, recordType };
}

function clearCurrentGugudanSessionSavedToLocal(recordType = getCurrentPracticeRecordType()) {
  if (!session?.localLearningRecordSaved) return;
  if (!recordType || session.localLearningRecordSaved.recordType === recordType) {
    session.localLearningRecordSaved = null;
  }
}

function saveCurrentGugudanLocal() {
  const recordType = getCurrentPracticeRecordType();
  const config = getPracticeRecordConfig(recordType);
  if (!isGugudanSoloRecordResult()) {
    setGugudanRecordStatus(config.recordUnavailableText, 'error');
    return;
  }
  const studentId = getStudentIdForCsv();
  if (!studentId) return;
  const factMap = getCurrentGugudanFactMap();
  if (!factMap.size) {
    setGugudanRecordStatus(`저장할 ${config.sourceLabel} 풀이 기록이 없습니다.`, 'error');
    return;
  }
  if (hasCurrentGugudanSessionSavedToLocal(studentId, recordType)) {
    setGugudanRecordStatus('이번 기록은 이미 로컬 저장에 반영되어 있습니다. CSV 백업 저장으로 안전하게 보관할 수 있습니다.', 'success');
    return;
  }
  if (!confirmLocalGugudanWrite(studentId, recordType, '저장/업데이트')) {
    setGugudanRecordStatus('로컬 저장을 취소했습니다.', '');
    return;
  }
  const saved = saveGugudanFactMapToLocal(studentId, recordType, factMap);
  if (!saved.ok) {
    setGugudanRecordStatus(saved.message, 'error');
    return;
  }
  markCurrentGugudanSessionSavedToLocal(studentId, recordType);
  setGugudanRecordStatus('로컬 기록에 이번 풀이를 반영했습니다. CSV 백업도 남겨 두면 더 안전합니다.', 'success');
}

function downloadCurrentGugudanCsv() {
  const recordType = getCurrentPracticeRecordType();
  const config = getPracticeRecordConfig(recordType);
  if (!isGugudanSoloRecordResult()) {
    setGugudanRecordStatus(config.recordUnavailableText, 'error');
    return;
  }
  const studentId = getStudentIdForCsv();
  if (!studentId) return;
  const currentMap = getCurrentGugudanFactMap();
  if (!currentMap.size) {
    setGugudanRecordStatus(`백업할 ${config.sourceLabel} 풀이 기록이 없습니다.`, 'error');
    return;
  }
  let localRecord = loadLocalGugudanRecord(studentId, recordType);
  if (!hasCurrentGugudanSessionSavedToLocal(studentId, recordType) || !localRecord?.factMap?.size) {
    if (!confirmLocalGugudanWrite(studentId, recordType, 'CSV 백업 전 먼저 저장/업데이트')) {
      setGugudanRecordStatus('CSV 백업을 취소했습니다. 먼저 이 기기에 저장하면 안전하게 백업할 수 있습니다.', '');
      return;
    }
    const saved = saveGugudanFactMapToLocal(studentId, recordType, currentMap);
    if (!saved.ok) {
      setGugudanRecordStatus(saved.message, 'error');
      return;
    }
    markCurrentGugudanSessionSavedToLocal(studentId, recordType);
    localRecord = saved.record || loadLocalGugudanRecord(studentId, recordType);
  }
  const backupMap = new Map();
  if (localRecord?.factMap?.size) mergeGugudanFactMap(backupMap, localRecord.factMap, recordType);
  if (!backupMap.size) {
    setGugudanRecordStatus(`백업할 ${config.sourceLabel} 풀이 기록이 없습니다.`, 'error');
    return;
  }
  const csvText = buildGugudanCsv(studentId, backupMap, getGugudanCsvOptions());
  downloadCsvFile(getGugudanCsvFilename(studentId, true, recordType), csvText);
  setGugudanRecordStatus('로컬 저장된 내용을 CSV 백업 파일로 저장했습니다. 브라우저 기록이 사라질 때 복구용으로 사용하세요.', 'success');
}

async function loadPreviousGugudanCsv(file) {
  if (!isGugudanSoloRecordResult() || !file) return;
  const recordType = getCurrentPracticeRecordType();
  const config = getPracticeRecordConfig(recordType);
  const studentId = getStudentIdForCsv();
  if (!studentId) return;
  try {
    const parsed = parseGugudanCsvAggregate(await file.text(), recordType);
    const mismatchedStudentIds = Array.from(parsed.studentIds).filter((id) => id !== studentId);
    if (mismatchedStudentIds.length) {
      setGugudanRecordStatus('학생번호가 다른 기록입니다. 같은 학생번호의 기록만 이어 저장할 수 있습니다.', 'error');
      return;
    }
    if (!parsed.factMap.size) {
      setGugudanRecordStatus(config.missingText, 'error');
      return;
    }

    if (!confirmLocalGugudanImportReplace(studentId, recordType, parsed.factMap, 'CSV 백업 파일')) {
      setGugudanRecordStatus('CSV 불러오기를 취소했습니다.', '');
      return;
    }
    const saved = saveGugudanFactMapToLocal(studentId, recordType, parsed.factMap, { mergeExisting: false });
    if (!saved.ok) {
      setGugudanRecordStatus(saved.message, 'error');
      return;
    }
    clearCurrentGugudanSessionSavedToLocal(recordType);
    setGugudanRecordStatus('CSV 백업 내용으로 로컬 상태를 바꿨습니다. 이번 풀이를 더하려면 이 기기에 저장하기를 다시 눌러 주세요.', 'success');
  } catch (_error) {
    setGugudanRecordStatus('기록 파일을 읽지 못했습니다. 이 앱에서 받은 기록 파일인지 확인하세요.', 'error');
  } finally {
    if (elements.gugudanRecordFile) elements.gugudanRecordFile.value = '';
  }
}

function getGugudanAggregateStats(factMap) {
  const facts = getSortedGugudanFacts(factMap);
  const total = facts.reduce((summary, item) => {
    summary.attempts += item.attempts;
    summary.correct += item.correct;
    summary.wrong += item.wrong;
    return summary;
  }, { attempts: 0, correct: 0, wrong: 0 });
  const weakFacts = facts
    .filter((item) => item.wrong > 0)
    .sort((left, right) => right.wrong - left.wrong || left.correct - right.correct || left.dan - right.dan || left.multiplier - right.multiplier)
    .slice(0, 5);
  const danSummary = getGugudanDanSummary(factMap)
    .filter((item) => item.attempts > 0)
    .sort((left, right) => right.wrong - left.wrong || left.correct - right.correct || left.dan - right.dan);
  return {
    ...total,
    accuracy: formatCsvAccuracy(total.correct, total.attempts),
    weakFacts,
    weakDans: danSummary.slice(0, 3)
  };
}

function formatGugudanReportAccuracy(correct, attempts) {
  const safeCorrect = Math.max(0, Number(correct) || 0);
  const safeAttempts = Math.max(0, Number(attempts) || 0);
  const percent = safeAttempts > 0 ? Math.round((safeCorrect / safeAttempts) * 100) : 0;
  return `${percent}% (${safeCorrect}/${safeAttempts})`;
}

function formatGugudanExpression(value) {
  return String(value || '').replace(/x/gi, '×');
}

function getGugudanRiskLevel(item) {
  const attempts = Math.max(0, Number(item?.attempts) || 0);
  const wrong = Math.max(0, Number(item?.wrong) || 0);
  if (!attempts) return 'none';
  const wrongRate = wrong / attempts;
  if (wrongRate >= 0.4 || wrong >= 3) return 'danger';
  if (wrong > 0) return 'warning';
  return 'ok';
}

function getGugudanRiskLabel(level) {
  if (level === 'danger') return '집중 연습';
  if (level === 'warning') return '다시 확인';
  if (level === 'ok') return '안정';
  return '기록 없음';
}

function sortGugudanWeakItems(items) {
  return [...items].sort((left, right) => {
    const leftRate = left.attempts ? left.wrong / left.attempts : 0;
    const rightRate = right.attempts ? right.wrong / right.attempts : 0;
    return (
      right.wrong - left.wrong
      || rightRate - leftRate
      || right.attempts - left.attempts
      || left.dan - right.dan
      || (left.multiplier || 0) - (right.multiplier || 0)
    );
  });
}

function buildGugudanReportSummary(record) {
  const facts = getSortedGugudanFacts(record?.factMap || new Map());
  const total = facts.reduce((summary, item) => {
    summary.attempts += item.attempts;
    summary.correct += item.correct;
    summary.wrong += item.wrong;
    return summary;
  }, { attempts: 0, correct: 0, wrong: 0 });
  const weakDans = sortGugudanWeakItems(
    getGugudanDanSummary(record?.factMap || new Map()).filter((item) => item.attempts > 0 && item.wrong > 0)
  ).slice(0, 4);
  const weakFacts = sortGugudanWeakItems(
    facts.filter((item) => item.attempts > 0 && item.wrong > 0)
  ).slice(0, 6);
  return { ...total, weakDans, weakFacts };
}

function getGugudanReportComment(summary, recordType = 'gugudan') {
  const config = getPracticeRecordConfig(recordType);
  if (!summary.attempts) return config.emptyText;
  if (!summary.wrong) return '누적 오답이 없습니다. 지금 기록에서는 안정적으로 풀고 있습니다.';
  const worstDan = summary.weakDans[0];
  const worstFact = summary.weakFacts[0];
  if (worstDan && worstFact) {
    return `${config.groupLabel(worstDan)}와 ${config.factLabel(worstFact)}을 먼저 다시 보면 효과적입니다.`;
  }
  if (worstDan) return `${config.groupLabel(worstDan)}부터 다시 확인하면 좋습니다.`;
  return '오답이 있는 문항부터 짧게 다시 풀어보면 좋습니다.';
}

function getGugudanDanReportItems(factMap) {
  const danSummary = new Map(getGugudanDanSummary(factMap).map((item) => [item.dan, item]));
  return Array.from({ length: 8 }, (_, index) => {
    const dan = index + 2;
    return danSummary.get(dan) || { dan, attempts: 0, correct: 0, wrong: 0 };
  });
}

function renderGugudanWeakBars(items, type, recordType = 'gugudan') {
  const config = getPracticeRecordConfig(recordType);
  if (!items.length) {
    return '<p class="gugudan-report-empty">누적 오답이 없습니다.</p>';
  }
  const maxWrong = Math.max(1, ...items.map((item) => item.wrong));
  return items.map((item) => {
    const label = type === 'dan' ? config.groupLabel(item) : config.factLabel(item);
    const percent = item.attempts ? Math.round((item.wrong / item.attempts) * 100) : 0;
    const width = Math.max(10, Math.round((item.wrong / maxWrong) * 100));
    const level = getGugudanRiskLevel(item);
    return `
      <div class="gugudan-weak-row risk-${level}">
        <div class="gugudan-weak-meta">
          <strong>${escapeHtml(label)}</strong>
          <span>오답 ${item.wrong}회 · 오답률 ${percent}%</span>
        </div>
        <div class="gugudan-weak-track" aria-hidden="true"><i style="width: ${width}%"></i></div>
      </div>
    `;
  }).join('');
}

function renderGugudanHeatmap(factMap, recordType = 'gugudan') {
  const config = getPracticeRecordConfig(recordType);
  const cells = [`<div class="gugudan-heatmap-cell is-label">${escapeHtml(config.rowHeader)}</div>`];
  for (let multiplier = 1; multiplier <= 9; multiplier += 1) {
    cells.push(`<div class="gugudan-heatmap-cell is-label">${multiplier}</div>`);
  }
  for (let dan = 2; dan <= 9; dan += 1) {
    cells.push(`<div class="gugudan-heatmap-cell is-label">${dan}</div>`);
    for (let multiplier = 1; multiplier <= 9; multiplier += 1) {
      const key = getPracticeGridKey(dan, multiplier, recordType);
      const item = factMap.get(key) || {
        key,
        packId: config.packId,
        dan,
        multiplier,
        expression: getPracticeGridExpression(dan, multiplier, recordType),
        attempts: 0,
        correct: 0,
        wrong: 0
      };
      const level = getGugudanRiskLevel(item);
      const label = config.cellLabel(dan, multiplier);
      const title = item.attempts
        ? `${label}: 시도 ${item.attempts}, 오답 ${item.wrong}, 정답률 ${formatCsvAccuracy(item.correct, item.attempts)}`
        : `${label}: 기록 없음`;
      cells.push(`
        <div class="gugudan-heatmap-cell level-${level}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}">
          <strong>${label}</strong>
          <span>${escapeHtml(getGugudanRiskLabel(level))}</span>
        </div>
      `);
    }
  }
  return cells.join('');
}

function setGugudanReportOpen(open, options = {}) {
  const active = Boolean(open);
  if (!elements.gugudanReportModal) return;
  elements.gugudanReportModal.classList.toggle('is-hidden', !active);
  elements.gugudanReportModal.setAttribute('aria-hidden', String(!active));
  document.body.classList.toggle('gugudan-report-open', active);
  if (active) {
    elements.gugudanReportCloseButton?.focus();
  } else if (options.restoreFocus !== false) {
    (options.restoreElement || elements.gugudanStatusButton)?.focus();
  }
}

function renderGugudanStatusReport(record, fileName = '', options = {}) {
  if (!elements.gugudanReportBody) return;
  const recordType = options.recordType || record?.recordType || 'gugudan';
  const config = getPracticeRecordConfig(recordType);
  if (!record?.factMap?.size) {
    elements.gugudanReportBody.innerHTML = `<p class="gugudan-report-empty">${escapeHtml(config.missingText)}</p>`;
    setGugudanReportOpen(true, { restoreFocus: false });
    return;
  }
  const summary = buildGugudanReportSummary(record);
  const studentIds = Array.from(record.studentIds || []).filter(Boolean).sort((left, right) => left.localeCompare(right, 'ko-KR'));
  const studentText = studentIds.length ? studentIds.join(', ') : '학생번호 없음';
  const danItems = getGugudanDanReportItems(record.factMap);
  const facts = getSortedGugudanFacts(record.factMap);
  const dangerCount = facts.filter((item) => getGugudanRiskLevel(item) === 'danger').length;
  const warningCount = facts.filter((item) => getGugudanRiskLevel(item) === 'warning').length;
  if (elements.gugudanReportTitle) {
    elements.gugudanReportTitle.textContent = config.reportTitle;
  }
  if (elements.gugudanReportSubtitle) {
    elements.gugudanReportSubtitle.textContent = fileName
      ? `${fileName} · ${studentText}`
      : studentText;
  }
  elements.gugudanReportBody.innerHTML = `
    <section class="gugudan-report-hero">
      <div>
        <span>누적 정답률</span>
        <strong>${escapeHtml(formatGugudanReportAccuracy(summary.correct, summary.attempts))}</strong>
      </div>
      <p>${escapeHtml(getGugudanReportComment(summary, recordType))}</p>
    </section>

    <section class="gugudan-report-metrics" aria-label="구구단 누적 요약">
      <div><span>풀이 수</span><strong>${summary.attempts}</strong><em>문제</em></div>
      <div><span>정답 수</span><strong>${summary.correct}</strong><em>개</em></div>
      <div><span>오답 수</span><strong>${summary.wrong}</strong><em>개</em></div>
      <div><span>집중 연습</span><strong>${dangerCount}</strong><em>문항</em></div>
      <div><span>다시 확인</span><strong>${warningCount}</strong><em>문항</em></div>
    </section>

    <section class="gugudan-report-section">
      <div class="gugudan-report-section-head">
        <h3>${escapeHtml(config.weakGroupTitle)}</h3>
        <span>오답 횟수와 오답률 기준</span>
      </div>
      <div class="gugudan-weak-list">${renderGugudanWeakBars(summary.weakDans, 'dan', recordType)}</div>
    </section>

    <section class="gugudan-report-section">
      <div class="gugudan-report-section-head">
        <h3>${escapeHtml(config.weakFactTitle)}</h3>
        <span>먼저 복습할 문항</span>
      </div>
      <div class="gugudan-weak-list">${renderGugudanWeakBars(summary.weakFacts, 'fact', recordType)}</div>
    </section>

    <section class="gugudan-report-section">
      <div class="gugudan-report-section-head">
        <h3>${escapeHtml(config.groupSectionTitle)}</h3>
        <span>${escapeHtml(config.groupSectionCaption)}</span>
      </div>
      <div class="gugudan-dan-strip">
        ${danItems.map((item) => {
          const level = getGugudanRiskLevel(item);
          return `
            <div class="gugudan-dan-card risk-${level}">
              <b>${escapeHtml(config.groupLabel(item))}</b>
              <strong>${escapeHtml(formatCsvAccuracy(item.correct, item.attempts))}</strong>
              <span>${escapeHtml(getGugudanRiskLabel(level))} · 오답 ${item.wrong}회</span>
            </div>
          `;
        }).join('')}
      </div>
    </section>

    <section class="gugudan-report-section">
      <div class="gugudan-report-section-head">
        <h3>${escapeHtml(config.heatmapTitle)}</h3>
        <span>초록 안정 · 노랑 다시 확인 · 빨강 집중 연습</span>
      </div>
      <div class="gugudan-heatmap" role="grid" aria-label="${escapeHtml(config.heatmapAria)}">
        ${renderGugudanHeatmap(record.factMap, recordType)}
      </div>
    </section>

    <p class="gugudan-report-note">${escapeHtml(options.message || '기록을 확인했습니다. 로컬 기록은 사용자가 확인했을 때만 업데이트됩니다.')}</p>
  `;
  setGugudanReportOpen(true, { restoreFocus: false });
}

function renderGugudanStatusPanelError(message, recordType = 'gugudan') {
  if (!elements.gugudanStatusPanel || !elements.gugudanStatusContent) return;
  openGugudanStatusDetails();
  const config = getPracticeRecordConfig(recordType);
  elements.gugudanStatusPanel.classList.remove('is-hidden', 'is-success');
  elements.gugudanStatusPanel.classList.add('is-error');
  elements.gugudanStatusContent.innerHTML = `
    <div class="gugudan-status-head">
      <b>${escapeHtml(config.statusTitle)}</b>
      <span>기록 확인</span>
    </div>
    <p class="gugudan-status-message">${escapeHtml(message)}</p>
  `;
}

function renderGugudanStatusPanel(parsed, fileName = '', options = {}) {
  if (!elements.gugudanStatusPanel || !elements.gugudanStatusContent) return;
  openGugudanStatusDetails();
  const recordType = options.recordType || parsed?.recordType || 'gugudan';
  const config = getPracticeRecordConfig(recordType);
  if (!parsed?.factMap?.size) {
    renderGugudanStatusPanelError(config.missingText, recordType);
    return;
  }
  const stats = getGugudanAggregateStats(parsed.factMap);
  const studentIds = Array.from(parsed.studentIds).filter(Boolean);
  const studentText = studentIds.length ? studentIds.join(', ') : '기록 없음';
  const weakText = stats.weakFacts.length
    ? stats.weakFacts.map((item) => `${config.factLabel(item)} ${item.wrong}회`).join(' · ')
    : '오답 기록 없음';
  const danText = stats.weakDans.length
    ? stats.weakDans.map((item) => `${config.groupLabel(item)} ${formatCsvAccuracy(item.correct, item.attempts)}`).join(' · ')
    : '단별 기록 없음';

  elements.gugudanStatusPanel.classList.remove('is-hidden', 'is-error');
  elements.gugudanStatusPanel.classList.add('is-success');
  elements.gugudanStatusContent.innerHTML = `
    <div class="gugudan-status-head">
      <b>${escapeHtml(options.title || config.statusTitle)}</b>
      <span>${escapeHtml(fileName || '선택한 기록')}</span>
    </div>
    <div class="gugudan-status-grid">
      <div><span>학생번호</span><b>${escapeHtml(studentText)}</b></div>
      <div><span>누적 풀이</span><b>${escapeHtml(String(stats.attempts))}회</b></div>
      <div><span>정답률</span><b>${escapeHtml(stats.accuracy)}</b></div>
      <div><span>오답</span><b>${escapeHtml(String(stats.wrong))}회</b></div>
    </div>
    ${options.message ? `<p class="gugudan-status-message is-strong">${escapeHtml(options.message)}</p>` : ''}
    <p class="gugudan-status-message">더 확인할 식: ${escapeHtml(weakText)}</p>
    <p class="gugudan-status-message">단별 상태: ${escapeHtml(danText)}</p>
  `;
}

function showLocalGugudanStatus(recordType = 'gugudan') {
  const config = getPracticeRecordConfig(recordType);
  const summaries = getLocalGugudanRecordSummaries(recordType);
  const selected = selectLocalGugudanRecord(recordType, '상태 확인');
  if (!selected) {
    if (!summaries.length) {
      renderGugudanStatusPanelError(`이 기기에 저장된 ${config.sourceLabel} 기록이 없습니다. CSV 백업이 있다면 CSV에서 복구 버튼으로 로컬 기록을 업데이트하세요.`, recordType);
    }
    return;
  }
  const label = `로컬 저장 · 학생번호 ${selected.studentId}`;
  renderGugudanStatusPanel(selected.record, label, {
    recordType,
    message: '이 기기에 저장된 로컬 기록입니다. CSV 백업도 주기적으로 남겨 두세요.'
  });
  renderGugudanStatusReport(selected.record, label, {
    recordType,
    message: '이 기기에 저장된 로컬 기록입니다. CSV 백업 파일을 보관하면 기기 변경이나 기록 삭제 때 복구할 수 있습니다.'
  });
}

function getAllPracticeRecordSummaries() {
  return ['gugudan', 'division-gugudan']
    .flatMap((recordType) => getLocalGugudanRecordSummaries(recordType).map((summary) => ({
      ...summary,
      recordType,
      config: getPracticeRecordConfig(recordType)
    })))
    .sort((left, right) => (
      String(left.studentId).localeCompare(String(right.studentId), 'ko-KR')
      || String(left.config.sourceLabel).localeCompare(String(right.config.sourceLabel), 'ko-KR')
    ));
}

function removeLocalPracticeRecord(recordType, studentId) {
  const config = getPracticeRecordConfig(recordType);
  const safeStudentId = getSafeStudentId(studentId);
  const store = readLocalPracticeStore();
  if (!store?.records?.[config.key]?.[safeStudentId]) return false;
  delete store.records[config.key][safeStudentId];
  if (!Object.keys(store.records[config.key]).length) {
    delete store.records[config.key];
  }
  if (store.activeStudentByPack?.[config.key] === safeStudentId) {
    delete store.activeStudentByPack[config.key];
  }
  const stillHasPreferred = Object.values(store.records || {}).some((packRecords) => (
    packRecords && Object.prototype.hasOwnProperty.call(packRecords, selectedPracticeStudentId)
  ));
  if (selectedPracticeStudentId === safeStudentId && !stillHasPreferred) {
    selectedPracticeStudentId = '';
  }
  return writeLocalPracticeStore(store);
}

function setPracticeRecordManagerStatus(message = '', kind = '') {
  if (!elements.practiceRecordManagerStatus) return;
  elements.practiceRecordManagerStatus.textContent = message;
  elements.practiceRecordManagerStatus.classList.toggle('is-error', kind === 'error');
  elements.practiceRecordManagerStatus.classList.toggle('is-success', kind === 'success');
}

function renderPracticeRecordManager() {
  if (!elements.practiceRecordManagerList) return;
  const summaries = getAllPracticeRecordSummaries();
  if (elements.practiceRecordManagerCurrentStudent) {
    elements.practiceRecordManagerCurrentStudent.textContent = getPracticeStudentSummaryText();
  }
  if (!summaries.length) {
    elements.practiceRecordManagerList.innerHTML = `
      <div class="practice-record-empty">
        <b>아직 이 기기에 저장된 기록이 없습니다.</b>
        <span>1인 구구단이나 나눗셈을 플레이한 뒤 결과 화면에서 저장하면 여기에 표시됩니다.</span>
      </div>
    `;
    return;
  }

  const grouped = new Map();
  summaries.forEach((summary) => {
    if (!grouped.has(summary.studentId)) grouped.set(summary.studentId, []);
    grouped.get(summary.studentId).push(summary);
  });

  elements.practiceRecordManagerList.innerHTML = Array.from(grouped.entries()).map(([studentId, records]) => `
    <section class="practice-record-student-card">
      <div class="practice-record-student-head">
        <div>
          <span>학생번호</span>
          <b>${escapeHtml(studentId)}번</b>
        </div>
        <button class="ghost-action" type="button" data-practice-record-action="select" data-student-id="${escapeHtml(studentId)}">이 번호 사용</button>
      </div>
      <div class="practice-record-item-list">
        ${records.map((summary) => `
          <article class="practice-record-item">
            <div class="practice-record-item-main">
              <b>${escapeHtml(summary.config.sourceLabel)}</b>
              <span>풀이 ${escapeHtml(String(summary.attempts))}회 · 정답률 ${escapeHtml(summary.accuracy)}</span>
            </div>
            <div class="practice-record-item-actions">
              <button class="ghost-action" type="button" data-practice-record-action="view" data-record-type="${escapeHtml(summary.recordType)}" data-student-id="${escapeHtml(studentId)}">상태 보기</button>
              <button class="ghost-action" type="button" data-practice-record-action="backup" data-record-type="${escapeHtml(summary.recordType)}" data-student-id="${escapeHtml(studentId)}">CSV 백업</button>
              <button class="ghost-action danger-action" type="button" data-practice-record-action="delete" data-record-type="${escapeHtml(summary.recordType)}" data-student-id="${escapeHtml(studentId)}">삭제</button>
            </div>
          </article>
        `).join('')}
      </div>
    </section>
  `).join('');
}

function setPracticeRecordManagerOpen(open) {
  const active = Boolean(open);
  if (!elements.practiceRecordManagerModal) return;
  if (active) {
    renderPracticeRecordManager();
    setPracticeRecordManagerStatus('');
  }
  elements.practiceRecordManagerModal.classList.toggle('is-hidden', !active);
  elements.practiceRecordManagerModal.setAttribute('aria-hidden', String(!active));
  document.body.classList.toggle('practice-record-manager-open', active);
  if (active) {
    elements.practiceRecordManagerCloseButton?.focus();
  } else {
    elements.practiceRecordManagerButton?.focus();
  }
}

function getLocalPracticeRecordForAction(recordType, studentId) {
  const record = loadLocalGugudanRecord(studentId, recordType);
  if (!record?.factMap?.size) {
    renderGugudanStatusPanelError('해당 로컬 기록을 찾을 수 없습니다.', recordType);
    setPracticeRecordManagerStatus('해당 로컬 기록을 찾을 수 없습니다.', 'error');
    renderPracticeRecordManager();
    return null;
  }
  return record;
}

function handlePracticeRecordManagerAction(action, recordType, studentId) {
  const safeStudentId = getSafeStudentId(studentId);
  if (!safeStudentId) return;
  if (action === 'select') {
    setPreferredPracticeStudentId(safeStudentId);
    renderPracticeRecordManager();
    setPracticeRecordManagerStatus(`${safeStudentId}번을 현재 학생번호로 표시합니다.`, 'success');
    return;
  }
  const config = getPracticeRecordConfig(recordType);
  const record = getLocalPracticeRecordForAction(recordType, safeStudentId);
  if (!record) return;
  if (action === 'view') {
    setPreferredPracticeStudentId(safeStudentId, { recordType });
    const label = `로컬 저장 · 학생번호 ${safeStudentId}`;
    renderGugudanStatusPanel(record, label, {
      recordType,
      message: '이 기기에 저장된 로컬 기록입니다.'
    });
    renderGugudanStatusReport(record, label, {
      recordType,
      message: '이 기기에 저장된 로컬 기록입니다. CSV 백업 파일을 보관하면 기기 변경이나 기록 삭제 때 복구할 수 있습니다.'
    });
    setPracticeRecordManagerOpen(false);
    return;
  }
  if (action === 'backup') {
    const csvText = buildGugudanCsv(safeStudentId, record.factMap, {
      recordType,
      minutes: '',
      playedText: '',
      sourceLabel: config.sourceLabel
    });
    downloadCsvFile(getGugudanCsvFilename(safeStudentId, true, recordType), csvText);
    setPracticeRecordManagerStatus(`${safeStudentId}번 ${config.sourceLabel} CSV 백업을 만들었습니다.`, 'success');
    return;
  }
  if (action === 'delete') {
    if (!window.confirm(
      `${safeStudentId}번 ${config.sourceLabel} 로컬 기록을 이 기기에서 삭제합니다.\n\n`
      + 'CSV 백업이 없다면 이 기록은 복구할 수 없습니다. 삭제할까요?'
    )) {
      return;
    }
    if (removeLocalPracticeRecord(recordType, safeStudentId)) {
      renderPracticeRecordManager();
      refreshPracticeStudentUi();
      setPracticeRecordManagerStatus(`${safeStudentId}번 ${config.sourceLabel} 로컬 기록을 삭제했습니다.`, 'success');
    } else {
      setPracticeRecordManagerStatus('삭제할 로컬 기록을 찾을 수 없습니다.', 'error');
    }
  }
}

function updateLocalGugudanRecordFromCsv(parsed, recordType = 'gugudan', fileName = '') {
  if (!parsed?.factMap?.size) return false;
  const { studentId, error } = getSingleCsvStudentId(parsed);
  if (error) {
    renderGugudanStatusPanel(parsed, fileName, {
      recordType,
      message: `${error} 보고서만 표시했습니다.`
    });
    renderGugudanStatusReport(parsed, fileName, {
      recordType,
      message: `${error} 로컬 기록은 변경하지 않았습니다.`
    });
    return false;
  }
  if (!confirmLocalGugudanImportReplace(studentId, recordType, parsed.factMap, 'CSV 백업 파일')) {
    renderGugudanStatusPanel(parsed, fileName, {
      recordType,
      message: '로컬 업데이트를 취소했습니다. 보고서만 표시했습니다.'
    });
    renderGugudanStatusReport(parsed, fileName, {
      recordType,
      message: '로컬 업데이트를 취소했습니다. CSV 파일 내용은 보고서로만 확인했습니다.'
    });
    return false;
  }
  const saved = saveGugudanFactMapToLocal(studentId, recordType, parsed.factMap, { mergeExisting: false });
  if (!saved.ok) {
    renderGugudanStatusPanel(parsed, fileName, {
      recordType,
      message: saved.message
    });
    renderGugudanStatusReport(parsed, fileName, {
      recordType,
      message: saved.message
    });
    return false;
  }
  const label = `로컬 업데이트 · 학생번호 ${studentId}`;
  renderGugudanStatusPanel(saved.record, label, {
    recordType,
    message: 'CSV 백업 파일 내용으로 이 기기의 로컬 기록을 바꿨습니다.'
  });
  renderGugudanStatusReport(saved.record, label, {
    recordType,
    message: 'CSV 백업 파일 내용으로 이 기기의 로컬 기록을 바꿨습니다. 이전 로컬 기록은 이 CSV 내용으로 대체되었습니다.'
  });
  return true;
}

async function loadGugudanStatusFile(file, recordType = 'gugudan') {
  if (!file) return;
  const config = getPracticeRecordConfig(recordType);
  try {
    const parsed = parseGugudanCsvAggregate(await file.text(), recordType);
    if (parsed.factMap.size) {
      updateLocalGugudanRecordFromCsv(parsed, recordType, file.name || '');
    } else {
      renderGugudanStatusPanel(parsed, file.name || '', { recordType });
    }
  } catch (_error) {
    renderGugudanStatusPanelError(`${config.sourceLabel} 기록 파일을 읽을 수 없습니다. 파일 형식을 확인하세요.`, recordType);
  } finally {
    const input = recordType === 'division-gugudan' ? elements.divisionGugudanStatusFile : elements.gugudanStatusFile;
    if (input) input.value = '';
  }
}

function mergeGugudanFactMap(targetMap, sourceMap, defaultRecordType = 'gugudan') {
  sourceMap.forEach((item) => {
    const recordType = item.packId || defaultRecordType;
    const config = getPracticeRecordConfig(recordType);
    addGugudanAggregate(targetMap, {
      packId: item.packId || config.packId,
      dan: item.dan,
      multiplier: item.multiplier,
      key: item.key || getPracticeGridKey(item.dan, item.multiplier, recordType),
      expression: item.expression || getPracticeGridExpression(item.dan, item.multiplier, recordType)
    }, item);
  });
}

async function mergeSelectedGugudanRecordFiles(files, recordType = 'gugudan') {
  const config = getPracticeRecordConfig(recordType);
  const selectedFiles = Array.from(files || []);
  if (selectedFiles.length < 2) {
    renderGugudanStatusPanelError('합칠 기록 파일을 2개 이상 선택하세요.', recordType);
    return;
  }

  const mergedMap = new Map();
  const studentIds = new Set();
  const invalidFileNames = [];
  try {
    const parsedFiles = await Promise.all(selectedFiles.map(async (file) => ({
      file,
      parsed: parseGugudanCsvAggregate(await file.text(), recordType)
    })));
    parsedFiles.forEach(({ file, parsed }) => {
      if (!parsed.factMap.size) {
        invalidFileNames.push(file.name || '이름 없는 파일');
        return;
      }
      parsed.studentIds.forEach((id) => {
        if (id) studentIds.add(id);
      });
      mergeGugudanFactMap(mergedMap, parsed.factMap, recordType);
    });
  } catch (_error) {
    renderGugudanStatusPanelError('기록 파일을 읽을 수 없습니다. 파일 형식을 확인하세요.', recordType);
    return;
  } finally {
    const input = recordType === 'division-gugudan' ? elements.divisionGugudanMergeRecordsFile : elements.gugudanMergeRecordsFile;
    if (input) input.value = '';
  }

  if (invalidFileNames.length) {
    renderGugudanStatusPanelError(`${config.sourceLabel} 학습 기록을 찾을 수 없는 파일이 있습니다: ${invalidFileNames.join(', ')}`, recordType);
    return;
  }
  if (!mergedMap.size) {
    renderGugudanStatusPanelError(`합칠 ${config.sourceLabel} 학습 기록을 찾을 수 없습니다.`, recordType);
    return;
  }
  if (studentIds.size !== 1) {
    renderGugudanStatusPanelError('학생번호가 서로 다른 기록은 합칠 수 없습니다. 같은 학생번호의 파일만 선택하세요.', recordType);
    return;
  }

  const studentId = Array.from(studentIds)[0];
  const csvText = buildGugudanCsv(studentId, mergedMap, {
    recordType,
    minutes: '',
    playedText: '',
    sourceLabel: config.sourceLabel
  });
  const filename = getGugudanCsvFilename(studentId, true, recordType);
  downloadCsvFile(filename, csvText);
  let localMessage = '새 파일을 보관해 주세요.';
  let reportRecord = {
    factMap: mergedMap,
    studentIds,
    recordType
  };
  if (confirmLocalGugudanImportReplace(studentId, recordType, mergedMap, '합친 CSV 기록')) {
    const saved = saveGugudanFactMapToLocal(studentId, recordType, mergedMap, { mergeExisting: false });
    if (saved.ok) {
      reportRecord = saved.record || reportRecord;
      localMessage = '합친 기록을 이 기기의 로컬 기록에도 반영했습니다. 새 CSV 파일도 보관해 주세요.';
    } else {
      localMessage = `${saved.message} 새 CSV 파일은 보관해 주세요.`;
    }
  } else {
    localMessage = '로컬 기록은 변경하지 않았습니다. 새 CSV 파일은 보관해 주세요.';
  }
  renderGugudanStatusPanel({
    factMap: reportRecord.factMap,
    studentIds: reportRecord.studentIds,
    recordType
  }, filename, {
    recordType,
    title: config.mergeTitle,
    message: `${selectedFiles.length}개 기록을 하나로 합쳐 저장했습니다. ${localMessage}`
  });
  renderGugudanStatusReport({
    factMap: reportRecord.factMap,
    studentIds: reportRecord.studentIds,
    recordType
  }, filename, {
    recordType,
    message: `${selectedFiles.length}개 기록을 하나로 합쳐 저장했습니다. ${localMessage}`
  });
}

function showScreen(name) {
  document.body.dataset.screen = name;
  elements.setupScreen.classList.toggle('is-hidden', name !== 'setup');
  elements.playScreen.classList.toggle('is-hidden', name !== 'play');
  elements.resultScreen.classList.toggle('is-hidden', name !== 'result');
  updateFullscreenButtons();
  syncTestDataset({ force: true });
}

function syncTestDataset({ force = false } = {}) {
  const bodyDataset = document.body.dataset;
  setDatasetIfChanged(bodyDataset, 'knolquizScreen', bodyDataset.screen || '');
  if (!session) {
    [
      'mapLoaded',
      'hitboxes',
      'objects',
      'playerX',
      'playerY',
      'playerSprite',
      'quizOpen',
      'quizOpenCount',
      'quizBatchIndex',
      'quizBatchSize',
      'playerViewCount',
      'character',
      'renderScale',
      'renderQuality'
    ].forEach((key) => deleteDatasetKey(bodyDataset, key));
    return;
  }
  const now = performance.now();
  if (
    !force &&
    session.runtime &&
    now - (Number(session.runtime.lastDatasetSyncAt) || 0) < TEST_DATASET_SYNC_INTERVAL_MS
  ) {
    return;
  }
  if (session.runtime) session.runtime.lastDatasetSyncAt = now;
  syncSessionQuizCompatibility();
  const activePlayer = getActivePlayer();
  setDatasetIfChanged(bodyDataset, 'mapLoaded', !!session.runtime.map);
  setDatasetIfChanged(bodyDataset, 'hitboxes', session.runtime.summary.hitboxCount || 0);
  setDatasetIfChanged(bodyDataset, 'objects', session.runtime.summary.objectCount || 0);
  setDatasetIfChanged(bodyDataset, 'quizOpen', !!session.quizOpen);
  setDatasetIfChanged(bodyDataset, 'quizOpenCount', session.players.filter((player) => player.quiz?.open).length);
  setDatasetIfChanged(bodyDataset, 'quizBatchIndex', session.quizBatchIndex || 0);
  setDatasetIfChanged(bodyDataset, 'quizBatchSize', session.quizBatchSize || QUIZ_BATCH_SIZE);
  setDatasetIfChanged(bodyDataset, 'playerViewCount', session.players.length);
  setDatasetIfChanged(bodyDataset, 'character', activePlayer?.character?.id || session.character?.id || '');
  setDatasetIfChanged(bodyDataset, 'renderScale', Number(session.runtime.renderScale || RENDER_SCALE_MAX).toFixed(2));
  setDatasetIfChanged(
    bodyDataset,
    'renderQuality',
    (Number(session.runtime.renderScale) || RENDER_SCALE_MAX) < RENDER_SCALE_MAX ? 'adaptive' : 'full'
  );
  if (activePlayer) {
    setDatasetIfChanged(bodyDataset, 'playerX', Math.round(activePlayer.state.x));
    setDatasetIfChanged(bodyDataset, 'playerY', Math.round(activePlayer.state.y));
    setDatasetIfChanged(bodyDataset, 'playerSprite', activePlayer.state._spriteSrc || '');
  }
}

function getPackLabel(packId) {
  const weaknessPractice = getActiveWeaknessPractice(packId);
  if (weaknessPractice) return weaknessPractice.label;
  return QUIZ_PACKS.find((pack) => pack.id === packId)?.label || '퀴즈팩';
}

function getMapLabel(mapId) {
  return MAPS.find((map) => map.id === mapId)?.label || '점프맵';
}

function getCharacter(characterId = '') {
  return CHARACTERS.find((character) => character.id === characterId) || CHARACTERS[0];
}

function getCharacterOption(characterId = '') {
  if (characterId === RANDOM_CHARACTER_ID) return RANDOM_CHARACTER_OPTION;
  return getCharacter(characterId);
}

function resolveSelectedCharacter(characterId = '') {
  if (characterId !== RANDOM_CHARACTER_ID) return getCharacter(characterId);
  const index = Math.floor(Math.random() * CHARACTERS.length);
  return CHARACTERS[index] || CHARACTERS[0];
}

function ensureCharacterSelections(count = selectedPlayers) {
  const maxPlayers = Math.max(...PLAYER_COUNTS);
  selectedCharacterIds = Array.from({ length: maxPlayers }, (_, index) => {
    const existing = selectedCharacterIds[index];
    const valid = existing === RANDOM_CHARACTER_ID || CHARACTERS.some((character) => character.id === existing);
    return valid ? existing : (CHARACTERS[index % CHARACTERS.length]?.id || CHARACTERS[0].id);
  });
  return selectedCharacterIds.slice(0, clamp(Number(count) || 1, 1, maxPlayers));
}

function getSelectedPlayerCharacter(index) {
  ensureCharacterSelections();
  return getCharacterOption(selectedCharacterIds[index]);
}

function getSelectedCharacters(count = selectedPlayers, { resolveRandom = true } = {}) {
  return ensureCharacterSelections(count).map((characterId) => (
    resolveRandom ? resolveSelectedCharacter(characterId) : getCharacterOption(characterId)
  ));
}

function getCharacterSummary() {
  const characters = getSelectedCharacters(selectedPlayers, { resolveRandom: false });
  if (characters.length === 1) return characters[0]?.label || '캐릭터';
  return characters.map((character, index) => `사용자${index + 1} ${character.label}`).join(' · ');
}

function basename(path) {
  return String(path || '').split('/').filter(Boolean).pop() || '';
}

function resolveMapAssetPath(source, kind = 'plate') {
  const trimmed = String(source || '').trim();
  if (!trimmed) return '';
  if (trimmed.startsWith('data:') || trimmed.startsWith('blob:') || /^https?:\/\//i.test(trimmed)) return trimmed;
  if (trimmed.includes('/quiz_background/')) return `./assets/quiz_background/${basename(trimmed)}`;
  if (trimmed.includes('/quiz_plate/')) return `./assets/quiz_plate/${basename(trimmed)}`;
  if (trimmed.startsWith('./assets/')) return trimmed;
  if (trimmed.startsWith('./') && kind !== 'plate') return trimmed;
  if (kind === 'background') return `./assets/quiz_background/${basename(trimmed)}`;
  return `./assets/quiz_plate/${basename(trimmed)}`;
}

function getImageEntry(src) {
  if (!src) return null;
  if (imageCache.has(src)) return imageCache.get(src);
  const image = new Image();
  image.decoding = 'async';
  const entry = {
    src,
    image,
    loaded: false,
    failed: false,
    promise: null
  };
  entry.promise = new Promise((resolve) => {
    const finish = () => {
      entry.loaded = true;
      resolve(entry);
    };
    image.onload = () => {
      if (typeof image.decode === 'function') {
        Promise.race([
          image.decode().catch(() => null),
          delay(PRELOAD_IMAGE_DECODE_TIMEOUT_MS)
        ]).then(finish);
        return;
      }
      finish();
    };
    image.onerror = () => {
      entry.failed = true;
      resolve(entry);
    };
  });
  image.src = src;
  imageCache.set(src, entry);
  return entry;
}

function getLoadedImage(src) {
  const entry = getImageEntry(src);
  return entry?.loaded ? entry.image : null;
}

async function preloadImages(sources, options = {}) {
  const unique = [...new Set(sources.filter(Boolean))];
  if (!unique.length) return { total: 0, loaded: 0 };
  const concurrency = clamp(
    Math.round(Number(options.concurrency) || PRELOAD_IMAGE_CONCURRENCY),
    1,
    Math.max(1, unique.length)
  );
  const onProgress = typeof options.onProgress === 'function' ? options.onProgress : null;
  let cursor = 0;
  let loaded = 0;
  const worker = async () => {
    while (cursor < unique.length) {
      const src = unique[cursor];
      cursor += 1;
      const entry = getImageEntry(src);
      if (entry?.promise) await entry.promise;
      loaded += 1;
      if (onProgress) onProgress(loaded, unique.length);
      if (loaded % PRELOAD_IMAGE_YIELD_EVERY === 0) {
        await yieldToBrowser();
      }
    }
  };
  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return { total: unique.length, loaded };
}

function updateSetupSummary() {
  const profile = syncViewportProfile();
  if (!session) {
    clampSelectedPlayersToViewport(profile);
  }
  ensureCharacterSelections();
  const timeText = selectedMinutes ? `${selectedMinutes}분` : '시간 선택 필요';
  const limitSummary = getPlayerLimitSummary(profile);
  renderCharacterControls();
  elements.currentSummary.textContent = [
    getPackLabel(selectedPackId),
    getMapLabel(selectedMapId),
    getPlayerCountLabel(selectedPlayers, profile),
    timeText,
    getCharacterSummary(),
    limitSummary
  ].filter(Boolean).join(' · ');
  elements.startButton.disabled = !selectedMinutes;

  $$('.option-button', elements.playerOptions).forEach((button) => {
    const count = Number(button.dataset.players) || 1;
    const disabled = count > profile.maxPlayers;
    const selected = count === selectedPlayers && !disabled;
    button.disabled = disabled;
    button.classList.toggle('is-disabled', disabled);
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
    button.setAttribute('aria-disabled', String(disabled));
    const hint = getPlayerCountHint(count, profile);
    const label = getPlayerCountLabel(count, profile);
    button.title = disabled ? getPlayerLimitLabel(profile) : hint;
    button.setAttribute('aria-label', hint ? `${label}, ${hint}` : label);
    button.innerHTML = renderPlayerCountButtonLabel(count, profile);
  });
  elements.timeOptions.value = selectedMinutes ? String(selectedMinutes) : '';
  $$('[data-character-player][data-character]', elements.characterOptions).forEach((button) => {
    const playerIndex = Number(button.dataset.characterPlayer) || 0;
    const selected = button.dataset.character === selectedCharacterIds[playerIndex];
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  refreshPracticeStudentUi();
}

function renderCharacterControls() {
  ensureCharacterSelections();
  const characterOptions = [RANDOM_CHARACTER_OPTION, ...CHARACTERS];
  elements.characterOptions.innerHTML = Array.from({ length: selectedPlayers }, (_, playerIndex) => `
    <div class="user-character-card" style="--player-color: ${escapeHtml(PLAYER_LABEL_COLORS[playerIndex % PLAYER_LABEL_COLORS.length])}">
      <div class="user-character-head">
        <b>사용자${playerIndex + 1}</b>
        <span>${escapeHtml(getSelectedPlayerCharacter(playerIndex).label)}</span>
      </div>
      <div class="character-choice-row" role="group" aria-label="사용자${playerIndex + 1} 캐릭터 선택">
        ${characterOptions.map((character) => {
    const random = character.id === RANDOM_CHARACTER_ID;
    return `
          <button class="character-button ${random ? 'character-random-button' : ''} ${selectedCharacterIds[playerIndex] === character.id ? 'is-selected' : ''}"
            type="button"
            data-character-player="${playerIndex}"
            data-character="${character.id}"
            aria-pressed="${selectedCharacterIds[playerIndex] === character.id}">
            ${random
        ? '<span class="random-character-mark" aria-hidden="true">?</span>'
        : `<img src="${character.front}" alt="" />`}
            <span>${escapeHtml(character.label)}</span>
          </button>
        `;
  }).join('')}
      </div>
    </div>
  `).join('');
}

function renderSetupControls() {
  const profile = syncViewportProfile();
  clampSelectedPlayersToViewport(profile);

  elements.quizPack.innerHTML = QUIZ_PACKS
    .map((pack) => `<option value="${pack.id}">${escapeHtml(pack.label)}</option>`)
    .join('');
  elements.quizPack.value = selectedPackId;

  elements.mapSelect.innerHTML = MAPS
    .map((map) => `<option value="${map.id}">${escapeHtml(map.label)}</option>`)
    .join('');
  elements.mapSelect.value = selectedMapId;

  elements.playerOptions.innerHTML = PLAYER_COUNTS
    .map((count) => {
      const disabled = count > profile.maxPlayers;
      return (
        `<button class="option-button ${disabled ? 'is-disabled' : ''}" type="button" data-players="${count}"
          aria-pressed="${count === selectedPlayers && !disabled}"
          aria-disabled="${disabled}"
          aria-label="${escapeHtml(getPlayerCountHint(count, profile) ? `${getPlayerCountLabel(count, profile)}, ${getPlayerCountHint(count, profile)}` : getPlayerCountLabel(count, profile))}"
          title="${disabled ? escapeHtml(getPlayerLimitLabel(profile)) : escapeHtml(getPlayerCountHint(count, profile))}"
          ${disabled ? 'disabled' : ''}>
        ${renderPlayerCountButtonLabel(count, profile)}
      </button>`
      );
    })
    .join('');

  elements.timeOptions.innerHTML = [
    '<option value="">플레이 시간 선택</option>',
    ...PLAY_MINUTES.map((minutes) => `<option value="${minutes}">${minutes}분</option>`)
  ].join('');
  elements.timeOptions.value = selectedMinutes ? String(selectedMinutes) : '';

  updateSetupSummary();
}

function parseCsv(text, packId = 'csv') {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  return lines.slice(1).map((line, index) => {
    const columns = line.split(',').map((value) => value.trim());
    const choices = columns.slice(1, 5).filter(Boolean);
    const answerIndex = Math.max(0, Number(columns[5]) - 1);
    return {
      id: `${packId}-${index + 1}`,
      prompt: '정답을 고르세요',
      text: columns[0],
      choices,
      answer: choices[answerIndex],
      asset: false
    };
  }).filter((question) => question.text && question.choices.length >= 2 && question.answer);
}

function isQuizImageAsset(value) {
  const source = String(value || '').trim();
  return /\.(svg|png|jpe?g|webp|gif)(\?.*)?$/i.test(source);
}

function resolveQuizAssetPath(value) {
  const source = String(value || '').trim();
  if (!source) return '';
  if (/^(https?:|data:|\.\/|\/)/i.test(source)) return source;
  if (/^(assets\/|quiz\/)/i.test(source)) return `./${source}`;
  return `./assets/quiz/nets/${source}`;
}

function collectQuizImageSources(questions) {
  const sources = [];
  (Array.isArray(questions) ? questions : []).forEach((question) => {
    if (question?.hasQuestionImage && question.image) {
      sources.push(question.image);
    }
    (Array.isArray(question?.choices) ? question.choices : []).forEach((choice) => {
      if (isQuizImageAsset(choice)) sources.push(resolveQuizAssetPath(choice));
    });
  });
  return [...new Set(sources.filter(Boolean))];
}

function collectResultBadgeImageSources() {
  return [...new Set(HEIGHT_GRADE_TIERS.map((grade) => getHeightGradeImagePath(grade)).filter(Boolean))];
}

async function preloadQuizImages(questions, options = {}) {
  const sources = collectQuizImageSources(questions);
  if (!sources.length) return;
  await preloadImages(sources, options);
}

function normalizeJsonQuestions(payload) {
  const questions = Array.isArray(payload?.questions) ? payload.questions : [];
  return questions.map((question, index) => {
    const rawQuestion = String(question.question || question.image || '').trim();
    const prompt = String(question.prompt || '정답을 고르세요');
    const choices = Array.isArray(question.choices)
      ? question.choices.slice(0, 4).map((choice) => String(choice).trim()).filter(Boolean)
      : [];
    const choiceOnlyImageQuestion = (
      question.type === 'validity'
      || /올바르지?\s*않은\s*전개도|올바른\s*전개도/.test(prompt)
    );
    const hasQuestionImage = !choiceOnlyImageQuestion && isQuizImageAsset(rawQuestion);
    const hasChoiceImages = choices.some(isQuizImageAsset);
    return {
      id: String(question.id || `json-${index + 1}`),
      prompt,
      text: String(question.text || '').trim(),
      image: hasQuestionImage ? resolveQuizAssetPath(rawQuestion) : '',
      choices,
      answer: String(question.answer || ''),
      asset: hasQuestionImage || hasChoiceImages,
      hasQuestionImage,
      hasChoiceImages
    };
  }).filter((question) => (
    (question.image || question.text || question.prompt)
    && question.choices.length >= 2
    && question.answer
  ));
}

async function loadPack(packId) {
  const weaknessPractice = getActiveWeaknessPractice(packId);
  if (weaknessPractice?.questions?.length) return weaknessPractice.questions;
  if (packCache.has(packId)) return packCache.get(packId);
  const pack = QUIZ_PACKS.find((item) => item.id === packId);
  if (!pack) throw new Error('퀴즈팩을 찾을 수 없습니다.');
  const response = await fetch(pack.path, { cache: 'no-store' });
  if (!response.ok) throw new Error(`${pack.label} 데이터를 불러오지 못했습니다.`);
  const questions = pack.kind === 'csv'
    ? parseCsv(await response.text(), pack.id)
    : normalizeJsonQuestions(await response.json());
  if (!questions.length) throw new Error(`${pack.label}에 사용할 문제가 없습니다.`);
  packCache.set(packId, questions);
  return questions;
}

async function loadMap(mapId) {
  if (mapCache.has(mapId)) return mapCache.get(mapId);
  const config = MAPS.find((item) => item.id === mapId);
  if (!config) throw new Error('맵을 찾을 수 없습니다.');
  const response = await fetch(config.path, { cache: 'no-store' });
  if (!response.ok) throw new Error(`${config.label}을 불러오지 못했습니다.`);
  const map = await response.json();
  const summary = summarizeRuntimeMap(map);
  if (!summary || !summary.objectCount || !summary.hitboxCount) {
    throw new Error(`${config.label}에 사용할 발판 정보가 없습니다.`);
  }
  const obstacles = JumpmapRuntimePhysics.collectObstacleBounds({
    objects: Array.isArray(map.objects) ? map.objects : [],
    localPointToWorld: JumpmapRuntimeGeometry.localPointToWorld
  });
  const value = { config, map, summary, obstacles };
  mapCache.set(mapId, value);
  return value;
}

function summarizeRuntimeMap(map) {
  if (!map || typeof map !== 'object') return null;
  const objects = Array.isArray(map.objects) ? map.objects : [];
  let rectHitboxes = 0;
  let polygonHitboxes = 0;
  objects.forEach((obj) => {
    const list = Array.isArray(obj?.hitboxes) ? obj.hitboxes : [];
    list.forEach((hitbox) => {
      if (hitbox?.type === 'polygon' && Array.isArray(hitbox.points) && hitbox.points.length >= 3) polygonHitboxes += 1;
      else rectHitboxes += 1;
    });
  });
  const mapSize = map.mapSize && typeof map.mapSize === 'object' ? map.mapSize : {};
  const width = Math.max(1, Number(mapSize.width) || Number(mapSize.w) || 1);
  const height = Math.max(1, Number(mapSize.height) || Number(mapSize.h) || 1);
  return {
    width,
    height,
    objectCount: objects.length,
    rectHitboxes,
    polygonHitboxes,
    hitboxCount: rectHitboxes + polygonHitboxes,
    savePointCount: Array.isArray(map.savePoints) ? map.savePoints.length : 0
  };
}

function getPlayerMetrics(runtimeMap) {
  const hitbox = runtimeMap?.playerHitbox && typeof runtimeMap.playerHitbox === 'object'
    ? runtimeMap.playerHitbox
    : { width: 25, height: 192, footInset: 8 };
  const scale = Math.max(0.2, Number(runtimeMap?.playerScale) || 1);
  return {
    scale,
    width: Math.max(10, (Number(hitbox.width) || 25) * scale),
    height: Math.max(10, (Number(hitbox.height) || 192) * scale),
    footInset: Math.max(0, (Number(hitbox.footInset) || 8) * scale)
  };
}

function getPlayerHitboxOffset(runtimeMap) {
  const offset = runtimeMap?.playerHitboxOffset && typeof runtimeMap.playerHitboxOffset === 'object'
    ? runtimeMap.playerHitboxOffset
    : { x: 0, y: 0 };
  return {
    x: Number(offset.x) || 0,
    y: Number(offset.y) || 0
  };
}

function normalizeRuntimePlayerHitboxPolygon(runtimeMap) {
  const source = Array.isArray(runtimeMap?.playerHitboxPolygon?.points)
    ? runtimeMap.playerHitboxPolygon.points
    : (Array.isArray(runtimeMap?.playerHitboxPolygon) ? runtimeMap.playerHitboxPolygon : null);
  if (!Array.isArray(source) || source.length < 3) return null;
  const points = source
    .map((point) => ({
      x: Number(point?.x),
      y: Number(point?.y)
    }))
    .filter((point) => Number.isFinite(point.x) && Number.isFinite(point.y))
    .map((point) => ({
      x: clamp(point.x, 0, 1),
      y: clamp(point.y, 0, 1)
    }));
  return points.length >= 3 ? { points, normalized: true } : null;
}

function getTunedRuntimePhysics(physics = {}) {
  const next = { ...(physics || {}) };
  const jumpSpeed = Math.max(0, Number(physics?.jumpSpeed) || 0);
  const fallSpeed = Math.max(0, Number(physics?.fallSpeed) || 0);
  if (jumpSpeed > 0) next.jumpSpeed = jumpSpeed * RUNTIME_VERTICAL_SPEED_SCALE;
  if (fallSpeed > 0) next.fallSpeed = fallSpeed * RUNTIME_VERTICAL_SPEED_SCALE;
  return next;
}

function getRuntimeMoveSpeed(runtimeMap) {
  const baseMoveSpeed = Math.max(0, Number(runtimeMap?.physics?.moveSpeed) || 420);
  return baseMoveSpeed * RUNTIME_MOVE_SPEED_SCALE;
}

function computePlayerSpawn(runtimeMap, summary, playerIndex = 0, playerCount = 1) {
  const metrics = getPlayerMetrics(runtimeMap);
  const base = runtimeMap?.startPoint || { x: 120, y: summary.height - 80 };
  const offset = getPlayerHitboxOffset(runtimeMap);
  const x = clamp(
    (Number(base.x) || 120) - metrics.width / 2 + (Number(offset.x) || 0),
    0,
    Math.max(0, summary.width - metrics.width)
  );
  const y = clamp(
    (Number(base.y) || summary.height - 80) - metrics.height + (Number(offset.y) || 0),
    0,
    Math.max(0, summary.height - metrics.height)
  );
  return {
    x,
    y,
    basePoint: {
      x: Number(base.x) || 120,
      y: Number(base.y) || summary.height - 80
    },
    metrics
  };
}

function getRuntimeObjects(map) {
  return (Array.isArray(map?.objects) ? map.objects : []).map((object) => {
    const spriteSrc = resolveMapAssetPath(object.sprite, 'plate');
    const runtimeObject = {
      ...object,
      spriteSrc
    };
    runtimeObject.drawInfo = getObjectDrawInfo(runtimeObject, getLoadedImage(spriteSrc));
    return runtimeObject;
  });
}

function buildMapObjectDrawBins(objects) {
  const bins = new Map();
  (Array.isArray(objects) ? objects : []).forEach((object, index) => {
    const rect = object?.drawInfo?.worldRect;
    if (!rect) return;
    const startBin = Math.floor((Number(rect.y) || 0) / MAP_OBJECT_DRAW_BIN_SIZE);
    const endBin = Math.floor(((Number(rect.y) || 0) + Math.max(1, Number(rect.height) || 1)) / MAP_OBJECT_DRAW_BIN_SIZE);
    for (let bin = startBin; bin <= endBin; bin += 1) {
      if (!bins.has(bin)) bins.set(bin, []);
      bins.get(bin).push(index);
    }
  });
  return bins;
}

function buildMapObjectChunkIndex(objects) {
  const chunks = new Map();
  (Array.isArray(objects) ? objects : []).forEach((object, index) => {
    const rect = object?.drawInfo?.worldRect;
    if (!rect) return;
    const x = Number(rect.x) || 0;
    const y = Number(rect.y) || 0;
    const width = Math.max(1, Number(rect.width) || 1);
    const height = Math.max(1, Number(rect.height) || 1);
    const startCol = Math.floor(x / MAP_OBJECT_CHUNK_SIZE);
    const endCol = Math.floor((x + width) / MAP_OBJECT_CHUNK_SIZE);
    const startRow = Math.floor(y / MAP_OBJECT_CHUNK_SIZE);
    const endRow = Math.floor((y + height) / MAP_OBJECT_CHUNK_SIZE);
    for (let row = startRow; row <= endRow; row += 1) {
      for (let col = startCol; col <= endCol; col += 1) {
        const key = `${col},${row}`;
        if (!chunks.has(key)) chunks.set(key, []);
        chunks.get(key).push(index);
      }
    }
  });
  return chunks;
}

function getVisibleMapObjects(runtime, cull) {
  const objects = Array.isArray(runtime?.objects) ? runtime.objects : [];
  const bins = runtime?.objectDrawBins;
  if (!bins?.size) return objects;
  const startBin = Math.floor((Number(cull.y) || 0) / MAP_OBJECT_DRAW_BIN_SIZE);
  const endBin = Math.floor(((Number(cull.y) || 0) + Math.max(1, Number(cull.height) || 1)) / MAP_OBJECT_DRAW_BIN_SIZE);
  const indices = new Set();
  for (let bin = startBin; bin <= endBin; bin += 1) {
    const list = bins.get(bin);
    if (!list) continue;
    list.forEach((index) => indices.add(index));
  }
  return [...indices]
    .sort((a, b) => a - b)
    .map((index) => objects[index])
    .filter(Boolean);
}

function normalizeMapBackground(map) {
  const background = map?.background && typeof map.background === 'object' ? map.background : {};
  return {
    color: typeof background.color === 'string' && background.color.trim() ? background.color : '#d9ecff',
    image: resolveMapAssetPath(background.image, 'background'),
    imageOpacity: Number.isFinite(Number(background.imageOpacity))
      ? clamp(Number(background.imageOpacity), 0, 1)
      : 0.28
  };
}

function createRuntimePlayers(count, runtimeMap, summary, characters = []) {
  return Array.from({ length: count }, (_, index) => {
    const spawn = computePlayerSpawn(runtimeMap, summary, index, count);
    const state = JumpmapRuntimePhysics.createPlayerState();
    const character = characters[index] || characters[0] || CHARACTERS[0];
    state.x = spawn.x;
    state.y = spawn.y;
    state.input.jumpBufferUntil = 0;
    return {
      id: index + 1,
      name: `사용자${index + 1}`,
      labelColor: PLAYER_LABEL_COLORS[index % PLAYER_LABEL_COLORS.length],
      character,
      correct: 0,
      wrong: 0,
      score: 0,
      bestHeight: 0,
      maxClimb: 0,
      respawns: 0,
      summits: 0,
      gauge: QUIZ_GAUGE_START_AMOUNT,
      gaugeEmptyNotified: false,
      bestHeightNoticeUntil: 0,
      dustParticles: [],
      state,
      control: { left: false, right: false },
      quiz: createPlayerQuizState(),
      spawn,
      lastSafe: { x: spawn.x, y: spawn.y },
      damagedUntil: 0
    };
  });
}

function buildSession({ questions, mapBundle, characters: runtimeCharacters = null }) {
  const startedAt = new Date();
  const weaknessPractice = getActiveWeaknessPractice(selectedPackId);
  const runtimeMap = mapBundle.map;
  const summary = mapBundle.summary;
  const objects = getRuntimeObjects(runtimeMap);
  const background = normalizeMapBackground(runtimeMap);
  const metrics = getPlayerMetrics(runtimeMap);
  const physicsObjects = Array.isArray(runtimeMap.objects) ? runtimeMap.objects : [];
  const playerHitboxPolygon = normalizeRuntimePlayerHitboxPolygon(runtimeMap);
  const characters = Array.isArray(runtimeCharacters)
    ? runtimeCharacters
    : getSelectedCharacters(selectedPlayers);
  const obstacles = mapBundle.obstacles || JumpmapRuntimePhysics.collectObstacleBounds({
    objects: physicsObjects,
    localPointToWorld: JumpmapRuntimeGeometry.localPointToWorld
  });

  return {
    packId: selectedPackId,
    packLabel: weaknessPractice?.label || getPackLabel(selectedPackId),
    practiceMode: weaknessPractice ? {
      type: 'weakness',
      recordType: weaknessPractice.recordType,
      fileName: weaknessPractice.fileName,
      studentText: weaknessPractice.studentText,
      weakCount: weaknessPractice.weakCount,
      dangerCount: weaknessPractice.dangerCount,
      warningCount: weaknessPractice.warningCount,
      stableCount: weaknessPractice.stableCount
    } : null,
    mapId: selectedMapId,
    mapLabel: mapBundle.config.label,
    minutes: selectedMinutes,
    durationSec: selectedMinutes * 60,
    startedAt,
    deadlineAt: Date.now() + selectedMinutes * 60 * 1000,
    endedAt: null,
    players: createRuntimePlayers(selectedPlayers, runtimeMap, summary, characters),
    activePlayerIndex: 0,
    questions,
    queue: shuffle(questions),
    currentQuestion: null,
    answerLocked: false,
    quizPlayerIndex: -1,
    quizAnswered: false,
    quizSelectedChoice: '',
    quizCorrect: false,
    quizReward: 0,
    quizNextAllowedAt: 0,
    quizBatchSize: QUIZ_BATCH_SIZE,
    quizBatchIndex: 0,
    quizAutoTimerId: 0,
    pendingQuizPlayerIndexes: [],
    timerId: null,
    feedback: '',
    feedbackKind: '',
    character: characters[0] || CHARACTERS[0],
    characters,
    characterSummary: getCharacterSummary(),
    gugudanRecords: [],
    input: { left: false, right: false },
    keyboardPlayerIndex: -1,
    quizOpen: false,
    runtime: {
      map: runtimeMap,
      summary,
      mapRect: { width: summary.width, height: summary.height },
      metrics,
      hitboxOffset: getPlayerHitboxOffset(runtimeMap),
      playerHitboxPolygon,
      physics: getTunedRuntimePhysics(runtimeMap.physics || {}),
      moveSpeed: getRuntimeMoveSpeed(runtimeMap),
      physicsObjects,
      objects,
      objectDrawBins: buildMapObjectDrawBins(objects),
      objectChunkIndex: buildMapObjectChunkIndex(objects),
      objectChunkCache: new Map(),
      objectChunkPrepareQueue: [],
      objectChunkPrepareQueued: new Set(),
      objectChunkPrepareHandle: 0,
      playerSpriteRenderCache: new Map(),
      playerLabelCache: new Map(),
      sharedStaticLayer: null,
      worldPointToLocal: JumpmapRuntimeGeometry.worldPointToLocal,
      localPointToWorld: JumpmapRuntimeGeometry.localPointToWorld,
      background,
      obstacles,
      canvas: null,
      ctx: null,
      canvases: [],
      contexts: [],
      rafId: 0,
      lastTs: null,
      fixedAccumulator: 0,
      sidePanelSignature: '',
      uiRefs: null,
      playerUiSignatures: [],
      quizButtonSignatures: [],
      canvasSizeCache: new WeakMap(),
      canvasSizeDirty: true,
      renderScale: RENDER_SCALE_MAX,
      renderPerf: {
        sampleStartedAt: 0,
        sampleCount: 0,
        sampleTotalMs: 0,
        sampleMaxMs: 0,
        stableStartedAt: 0
      },
      lastSceneRenderSignature: '',
      lastViewportRenderSignatures: [],
      backgroundCache: new Map(),
      touchPointers: new Map(),
      touchActionCounts: new Map(),
      touchButtonCounts: new WeakMap(),
      keyboardPointers: new Map(),
      keyboardActionCounts: new Map(),
      lastUiUpdateAt: 0,
      lastQuizActionUpdateAt: 0,
      lastDatasetSyncAt: 0,
      camera: { x: 0, y: 0, width: 900, height: 620 },
      debugHitboxes: false,
      cleanup: []
    }
  };
}

function getActivePlayer() {
  return session?.players[session.activePlayerIndex] || null;
}

function getQuizPlayer() {
  if (!session) return null;
  const entry = getOpenQuizEntry(session.quizPlayerIndex);
  return entry?.player || getActivePlayer();
}

function getPlayerByIndex(index) {
  if (!session) return null;
  const safeIndex = clamp(Math.round(Number(index) || 0), 0, session.players.length - 1);
  return session.players[safeIndex] || null;
}

function getPlayerIndex(player) {
  if (!session || !player) return -1;
  return session.players.indexOf(player);
}

function isPlayerQuizLocked(index) {
  return !!getPlayerQuizState(index)?.open;
}

function setActivePlayerIndex(index, { clearPreviousInput = true } = {}) {
  if (!session) return;
  const nextIndex = clamp(Math.round(Number(index) || 0), 0, session.players.length - 1);
  if (nextIndex === session.activePlayerIndex) return;
  const prevPlayer = getActivePlayer();
  if (clearPreviousInput) {
    if (prevPlayer?.control) {
      prevPlayer.control.left = false;
      prevPlayer.control.right = false;
    }
    if (prevPlayer) clearPlayerJumpInput(prevPlayer);
  }
  session.activePlayerIndex = nextIndex;
  if (clearPreviousInput) {
    session.input.left = false;
    session.input.right = false;
    session.keyboardPlayerIndex = -1;
  }
  renderStageHead();
  updateGaugeUi();
  renderSidePanel();
}

function formatGauge(value) {
  return `${Math.max(0, Math.round(Number(value) || 0))}`;
}

function getGaugePercent(player) {
  const gauge = Math.max(0, Number(player?.gauge) || 0);
  return clamp((gauge / QUIZ_GAUGE_DISPLAY_CAP) * 100, 0, 100);
}

function refillPlayerGauge(player, amount) {
  if (!player) return 0;
  const refill = Math.max(0, Number(amount) || 0);
  player.gauge = Math.max(0, (Number(player.gauge) || 0) + refill);
  if (player.gauge > GAUGE_EPSILON) player.gaugeEmptyNotified = false;
  return refill;
}

function isPlayerGaugeEmpty(player) {
  return Math.max(0, Number(player?.gauge) || 0) <= GAUGE_EPSILON;
}

function canUseGaugeEmptyAirDoubleJump(player) {
  const state = player?.state;
  if (!state || state.onGround) return false;
  return !!state.jumpedFromGround && Number(state.jumpsUsed) === 1;
}

function isPlayerGroundedForQuiz(player) {
  return !!player?.state?.onGround;
}

function createPlayerQuizState() {
  return {
    open: false,
    currentQuestion: null,
    answerLocked: false,
    answered: false,
    selectedChoice: '',
    correct: false,
    reward: 0,
    nextAllowedAt: 0,
    batchSize: QUIZ_BATCH_SIZE,
    batchIndex: 0,
    autoTimerId: 0,
    pending: false,
    questionStartedAtMs: 0,
    inputReadyAtMs: 0,
    feedback: '',
    feedbackKind: ''
  };
}

function getPlayerQuizState(playerIndex) {
  const player = getPlayerByIndex(playerIndex);
  if (!player) return null;
  if (!player.quiz) player.quiz = createPlayerQuizState();
  return player.quiz;
}

function getOpenQuizEntry(preferredIndex = -1) {
  if (!session) return null;
  const preferred = Number(preferredIndex);
  if (preferred >= 0 && session.players[preferred]?.quiz?.open) {
    return {
      index: preferred,
      player: session.players[preferred],
      quiz: session.players[preferred].quiz
    };
  }
  const index = session.players.findIndex((player) => player.quiz?.open);
  if (index < 0) return null;
  return {
    index,
    player: session.players[index],
    quiz: session.players[index].quiz
  };
}

function syncSessionQuizCompatibility(preferredIndex = -1) {
  if (!session) return null;
  const entry = getOpenQuizEntry(preferredIndex);
  const quiz = entry?.quiz || null;
  session.quizOpen = !!quiz;
  session.quizPlayerIndex = entry?.index ?? -1;
  session.currentQuestion = quiz?.currentQuestion || null;
  session.answerLocked = !!quiz?.answerLocked;
  session.quizAnswered = !!quiz?.answered;
  session.quizSelectedChoice = quiz?.selectedChoice || '';
  session.quizCorrect = !!quiz?.correct;
  session.quizReward = Number(quiz?.reward) || 0;
  session.quizNextAllowedAt = Number(quiz?.nextAllowedAt) || 0;
  session.quizBatchSize = Number(quiz?.batchSize) || QUIZ_BATCH_SIZE;
  session.quizBatchIndex = Number(quiz?.batchIndex) || 0;
  session.quizAutoTimerId = Number(quiz?.autoTimerId) || 0;
  return entry;
}

function queuePendingQuizForPlayer(playerIndex) {
  if (!session) return false;
  const safeIndex = clamp(Math.round(Number(playerIndex) || 0), 0, session.players.length - 1);
  const quiz = getPlayerQuizState(safeIndex);
  if (!quiz || quiz.pending) return false;
  quiz.pending = true;
  if (!session.pendingQuizPlayerIndexes.includes(safeIndex)) {
    session.pendingQuizPlayerIndexes.push(safeIndex);
  }
  return true;
}

function queuePlayerJump(player) {
  if (!player?.state?.input) return;
  player.state.input.jumpQueued = true;
  player.state.input.jumpHeld = true;
  player.state.input.jumpBufferUntil = performance.now() + JUMP_INPUT_BUFFER_MS;
}

function clearPlayerJumpInput(player, { clearBuffer = true } = {}) {
  if (!player?.state?.input) return;
  player.state.input.jumpQueued = false;
  player.state.input.jumpHeld = false;
  player.state.input.jumpLock = false;
  if (clearBuffer) player.state.input.jumpBufferUntil = 0;
}

function getKeyboardControlForEvent(event) {
  if (!session) return null;
  const code = event.code || '';
  const key = event.key || '';
  const matches = (values) => values.includes(code) || values.includes(key);
  const controls = session.players.length <= 1
    ? [{
      left: ['ArrowLeft', 'KeyA', 'a', 'A'],
      right: ['ArrowRight', 'KeyD', 'd', 'D'],
      jump: ['ArrowUp', 'Space', ' ', 'KeyW', 'w', 'W']
    }]
    : MULTIPLAYER_KEYBOARD_CONTROLS;
  for (let playerIndex = 0; playerIndex < Math.min(session.players.length, controls.length); playerIndex += 1) {
    const control = controls[playerIndex];
    if (matches(control.left)) return { playerIndex, action: 'left' };
    if (matches(control.right)) return { playerIndex, action: 'right' };
    if (matches(control.jump)) return { playerIndex, action: 'jump' };
  }
  return null;
}

function isKeyboardTextEntryTarget(event) {
  const target = event?.target;
  if (!target?.closest) return false;
  return !!target.closest('input, textarea, select, [contenteditable="true"]');
}

function requestQuizForPlayer(playerIndex) {
  if (!session || session.endedAt) return false;
  const safeIndex = clamp(Math.round(Number(playerIndex) || 0), 0, session.players.length - 1);
  const player = getPlayerByIndex(safeIndex);
  const quiz = getPlayerQuizState(safeIndex);
  if (!player || !quiz || quiz.open) return false;
  if (Date.now() >= session.deadlineAt) {
    finishSession();
    return false;
  }
  if (isPlayerGaugeEmpty(player) && !isPlayerGroundedForQuiz(player)) {
    queuePendingQuizForPlayer(safeIndex);
    session.feedback = `${player.name} 체력이 비었습니다. 착지 후 퀴즈가 열립니다.`;
    session.feedbackKind = 'wrong';
    renderSidePanel();
    updateGaugeUi();
    return false;
  }
  openQuiz(safeIndex);
  return true;
}

function openNextPendingQuiz() {
  if (!session || session.endedAt) return false;
  let opened = false;
  session.players.forEach((player, nextIndex) => {
    const quiz = getPlayerQuizState(nextIndex);
    if (!quiz?.pending || quiz.open) return;
    if (!isPlayerGaugeEmpty(player)) {
      quiz.pending = false;
      return;
    }
    if (!isPlayerGroundedForQuiz(player)) return;
    quiz.pending = false;
    session.pendingQuizPlayerIndexes = session.pendingQuizPlayerIndexes.filter((index) => index !== nextIndex);
    opened = requestQuizForPlayer(nextIndex) || opened;
  });
  return opened;
}

function notifyGaugeEmpty(player) {
  if (!session || !player || session.endedAt) return false;
  const playerIndex = getPlayerIndex(player);
  if (playerIndex < 0) return false;
  player.gaugeEmptyNotified = true;
  if (!isPlayerGroundedForQuiz(player)) {
    queuePendingQuizForPlayer(playerIndex);
    session.feedback = `${player.name} 체력이 비었습니다. 착지 후 퀴즈가 열립니다.`;
    session.feedbackKind = 'wrong';
    renderSidePanel();
    updateGaugeUi();
    return false;
  }
  session.feedback = `${player.name} 체력이 비었습니다. 퀴즈가 열립니다.`;
  session.feedbackKind = 'wrong';
  const opened = requestQuizForPlayer(playerIndex);
  renderSidePanel();
  updateGaugeUi();
  return opened;
}

function consumePlayerGauge(player, amount) {
  if (!player) return 0;
  if (player.quiz?.open) return 0;
  const cost = Math.max(0, Number(amount) || 0);
  if (cost <= 0) return 0;
  const prev = Math.max(0, Number(player.gauge) || 0);
  const next = Math.max(0, prev - cost);
  player.gauge = next;
  if (prev > GAUGE_EPSILON && next <= GAUGE_EPSILON) {
    notifyGaugeEmpty(player);
  }
  return prev - next;
}

function clearQuizAutoTimer(playerIndex = null) {
  if (!session) return;
  const quizzes = playerIndex == null
    ? session.players.map((player) => player.quiz).filter(Boolean)
    : [getPlayerQuizState(playerIndex)].filter(Boolean);
  quizzes.forEach((quiz) => {
    if (!quiz.autoTimerId) return;
    window.clearTimeout(quiz.autoTimerId);
    quiz.autoTimerId = 0;
  });
  syncSessionQuizCompatibility(playerIndex ?? -1);
}

function isQuizBatchComplete(playerIndex = session?.quizPlayerIndex) {
  if (!session) return false;
  const quiz = getPlayerQuizState(playerIndex);
  if (!quiz) return false;
  const batchSize = Number(quiz.batchSize) || QUIZ_BATCH_SIZE;
  return (Number(quiz.batchIndex) || 0) >= batchSize;
}

function advanceQuizAfterFeedback(playerIndex = session?.quizPlayerIndex) {
  const quiz = getPlayerQuizState(playerIndex);
  if (!session || !quiz?.open || !quiz.answered) return;
  clearQuizAutoTimer(playerIndex);
  const allowedAt = Number(quiz.nextAllowedAt) || Date.now();
  if (Date.now() < allowedAt) {
    scheduleQuizAutoAdvance(playerIndex);
    return;
  }
  if (Date.now() >= session.deadlineAt) {
    finishSession();
    return;
  }
  if (isQuizBatchComplete(playerIndex)) {
    closeQuiz({ playerIndex, rotate: false, reason: 'batch_complete' });
    return;
  }
  nextQuestion(playerIndex);
  quiz.feedback = '';
  quiz.feedbackKind = '';
  session.feedback = '';
  session.feedbackKind = '';
  renderQuizPanel(playerIndex);
  renderSidePanel();
  updateGaugeUi();
  syncSessionQuizCompatibility(playerIndex);
}

function scheduleQuizAutoAdvance(playerIndex = session?.quizPlayerIndex) {
  const quiz = getPlayerQuizState(playerIndex);
  clearQuizAutoTimer(playerIndex);
  if (!session || !quiz?.open || !quiz.answered) return;
  const allowedAt = Number(quiz.nextAllowedAt) || Date.now();
  const delay = Math.max(0, allowedAt - Date.now());
  quiz.autoTimerId = window.setTimeout(() => advanceQuizAfterFeedback(playerIndex), delay);
  syncSessionQuizCompatibility(playerIndex);
}

function nextQuestion(playerIndex = session?.quizPlayerIndex) {
  const quiz = getPlayerQuizState(playerIndex);
  if (!session || !quiz) return;
  if (!session.queue.length) {
    session.queue = shuffle(session.questions);
  }
  const base = session.queue.shift();
  quiz.batchIndex = Math.min(
    Number(quiz.batchSize) || QUIZ_BATCH_SIZE,
    (Number(quiz.batchIndex) || 0) + 1
  );
  quiz.currentQuestion = {
    ...base,
    choices: shuffle(base.choices)
  };
  const nowMs = Date.now();
  quiz.questionStartedAtMs = nowMs;
  quiz.inputReadyAtMs = nowMs + QUIZ_OPEN_INPUT_GUARD_MS;
  quiz.answerLocked = false;
  quiz.answered = false;
  quiz.selectedChoice = '';
  quiz.correct = false;
  quiz.reward = 0;
  quiz.nextAllowedAt = 0;
  quiz.feedback = '';
  quiz.feedbackKind = '';
  syncSessionQuizCompatibility(playerIndex);
}

function rotatePlayer() {
  setActivePlayerIndex((session.activePlayerIndex + 1) % session.players.length);
}

function renderPlayerChips() {
  return `
    <div class="score-row compact-score-row">
      ${session.players.map((player, index) => `
        <button class="score-chip ${index === session.activePlayerIndex ? 'active-player' : ''}" type="button" data-player-chip="${index}" style="--player-color: ${escapeHtml(player.labelColor)}">
          <b>${escapeHtml(player.name)}</b>
          <span>${formatHeightMeters(player.bestHeight)} · 정답률 ${getPlayerAccuracyText(player)}</span>
        </button>
      `).join('')}
    </div>
  `;
}

function bindGaugeButton(root = elements.gameStage) {
  $$('[data-quiz-player]', root).forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      requestQuizForPlayer(Number(button.dataset.quizPlayer) || 0);
    });
  });
}

function bindPlayerSelectors(root = elements.gameStage) {
  $$('[data-player-chip], [data-player-viewport]', root).forEach((element) => {
    element.addEventListener('pointerdown', (event) => {
      if (event.target?.closest?.('[data-touch], [data-quiz-player], .quiz-card')) return;
      const rawIndex = element.dataset.playerChip ?? element.dataset.playerViewport;
      setActivePlayerIndex(Number(rawIndex) || 0);
    });
  });
}

function collectStageUiRefs() {
  if (!session) return null;
  const playerRefs = session.players.map((_, index) => ({
    gaugeValues: $$(`[data-player-gauge-value="${index}"]`, elements.gameStage),
    gaugeFills: $$(`[data-player-gauge-fill="${index}"]`, elements.gameStage),
    heights: $$(`[data-player-height="${index}"]`, elements.gameStage),
    accuracies: $$(`[data-player-accuracy="${index}"]`, elements.gameStage),
    heightRecords: $$(`[data-height-record="${index}"]`, elements.gameStage),
    viewports: $$(`[data-player-viewport="${index}"]`, elements.gameStage)
  }));
  session.runtime.uiRefs = {
    players: playerRefs,
    quizButtons: $$('[data-quiz-player]', elements.gameStage)
  };
  return session.runtime.uiRefs;
}

function updateGaugeUi() {
  if (!session) return;
  const uiRefs = session.runtime.uiRefs || collectStageUiRefs();
  const now = performance.now();
  const runtime = session.runtime;
  if (!Array.isArray(runtime.playerUiSignatures)) runtime.playerUiSignatures = [];
  if (!Array.isArray(runtime.quizButtonSignatures)) runtime.quizButtonSignatures = [];
  session.players.forEach((player, index) => {
    const refs = uiRefs?.players?.[index] || {};
    const playerPercent = getGaugePercent(player);
    const gaugeText = formatGauge(player.gauge || 0);
    const heightText = formatHeightMeters(player.bestHeight);
    const accuracyText = getPlayerAccuracyText(player);
    const heightRecordActive = Number(player.bestHeightNoticeUntil) > now;
    const playerSignature = [
      Math.round(playerPercent * 10),
      gaugeText,
      heightText,
      accuracyText,
      heightRecordActive ? 1 : 0,
      index === session.activePlayerIndex ? 1 : 0,
      playerPercent <= GAUGE_EPSILON ? 1 : 0
    ].join('|');
    if (runtime.playerUiSignatures[index] === playerSignature) return;
    runtime.playerUiSignatures[index] = playerSignature;
    refs.gaugeValues?.forEach((element) => setTextIfChanged(element, gaugeText));
    refs.gaugeFills?.forEach((element) => setWidthIfChanged(element, playerPercent));
    refs.heights?.forEach((element) => setTextIfChanged(element, heightText));
    refs.accuracies?.forEach((element) => setTextIfChanged(element, accuracyText));
    refs.heightRecords?.forEach((element) => {
      setHiddenIfChanged(element, !heightRecordActive);
      if (heightRecordActive) setTextIfChanged(element, `최고 높이 갱신 ${heightText}`);
    });
    refs.viewports?.forEach((element) => {
      toggleClassIfChanged(element, 'is-active', index === session.activePlayerIndex);
      toggleClassIfChanged(element, 'is-gauge-empty', playerPercent <= GAUGE_EPSILON);
    });
  });
  uiRefs?.quizButtons?.forEach((button) => {
    const playerIndex = Number(button.dataset.quizPlayer) || 0;
    const player = getPlayerByIndex(playerIndex);
    const disabled = isPlayerQuizLocked(playerIndex) || (isPlayerGaugeEmpty(player) && !isPlayerGroundedForQuiz(player));
    const signature = disabled ? '1' : '0';
    if (runtime.quizButtonSignatures[playerIndex] === signature) return;
    runtime.quizButtonSignatures[playerIndex] = signature;
    setDisabledIfChanged(button, disabled);
  });
}

function renderPlayerViewport(player, index) {
  const percent = getGaugePercent(player);
  return `
    <div class="map-viewport player-viewport ${index === session.activePlayerIndex ? 'is-active' : ''} ${percent <= GAUGE_EPSILON ? 'is-gauge-empty' : ''}"
      data-player-viewport="${index}"
      tabindex="0"
      aria-label="${escapeHtml(player.name)} 점프맵 화면"
      style="--player-color: ${escapeHtml(player.labelColor)}">
      <canvas class="map-canvas" data-player-canvas="${index}"></canvas>
      <div class="player-viewport-hud" aria-hidden="true">
        <span class="player-viewport-name">${escapeHtml(player.name)}</span>
        <div class="player-viewport-stats">
          <span class="player-viewport-stat">최고 <b data-player-height="${index}">${formatHeightMeters(player.bestHeight)}</b></span>
          <span class="player-viewport-stat">정답률 <b data-player-accuracy="${index}">${getPlayerAccuracyText(player)}</b></span>
        </div>
      </div>
      <div class="height-record-badge" data-height-record="${index}" hidden>최고 높이 갱신</div>
      <div class="player-mini-gauge" aria-hidden="true">
        <div class="player-mini-gauge-fill" data-player-gauge-fill="${index}" style="width: ${percent}%"></div>
      </div>
      <div class="touch-controls" aria-label="${escapeHtml(player.name)} 터치 조작">
        <button class="touch-button" type="button" tabindex="-1" data-touch="left" data-touch-player="${index}" aria-label="${escapeHtml(player.name)} 왼쪽">&lt;</button>
        <button class="touch-button" type="button" tabindex="-1" data-touch="right" data-touch-player="${index}" aria-label="${escapeHtml(player.name)} 오른쪽">&gt;</button>
        <button class="touch-button touch-jump" type="button" tabindex="-1" data-touch="jump" data-touch-player="${index}" aria-label="${escapeHtml(player.name)} 점프">점프</button>
      </div>
      <button class="quiz-gauge-button quiz-map-button" type="button" data-quiz-player="${index}" ${isPlayerQuizLocked(index) ? 'disabled' : ''}>퀴즈 풀기</button>
      <div class="quiz-layer" data-quiz-layer="${index}" hidden></div>
    </div>
  `;
}

function renderStageShell() {
  if (!session) return;
  elements.gameStage.innerHTML = `
    <div class="stage-panel map-stage-panel">
      <div class="map-view-grid player-count-${session.players.length}" id="map-view-grid" aria-label="점프맵 분할 플레이 영역">
        ${session.players.map((player, index) => renderPlayerViewport(player, index)).join('')}
      </div>
    </div>
  `;

  session.runtime.canvases = $$('[data-player-canvas]', elements.gameStage);
  session.runtime.contexts = session.runtime.canvases.map((canvas) => getCanvasContext2d(canvas, MAP_CANVAS_CONTEXT_OPTIONS));
  session.runtime.canvas = session.runtime.canvases[session.activePlayerIndex] || session.runtime.canvases[0] || null;
  session.runtime.ctx = session.runtime.contexts[session.activePlayerIndex] || session.runtime.contexts[0] || null;
  session.runtime.canvasSizeDirty = true;
  session.runtime.lastViewportRenderSignatures = [];
  session.runtime.playerUiSignatures = [];
  session.runtime.quizButtonSignatures = [];
  collectStageUiRefs();
  bindGaugeButton();
  bindPlayerSelectors();
  $$('[data-quiz-layer]', elements.gameStage).forEach((layer) => layer.addEventListener('pointerdown', (event) => {
    event.stopPropagation();
  }));
  bindTouchControls();
  renderSidePanel();
}

function renderStageHead() {
  const head = $('.stage-head', elements.gameStage);
  if (!head || !session) return;
  head.innerHTML = `
    ${renderPlayerChips()}
  `;
  bindGaugeButton(head);
  bindPlayerSelectors(head);
}

function getSidePanelSignature() {
  if (!session) return '';
  const activePlayer = getActivePlayer();
  const totalCorrect = session.players.reduce((sum, player) => sum + player.correct, 0);
  const totalWrong = session.players.reduce((sum, player) => sum + player.wrong, 0);
  return [
    session.activePlayerIndex,
    totalCorrect,
    totalWrong,
    Math.floor((Number(activePlayer?.bestHeight) || 0) / 100),
    activePlayer?.respawns || 0,
    session.feedbackKind,
    session.feedback
  ].join('|');
}

function renderSidePanelIfChanged() {
  if (!session) return;
  const nextSignature = getSidePanelSignature();
  if (session.runtime.sidePanelSignature === nextSignature) return;
  renderSidePanel();
}

function renderSidePanel() {
  if (!session) return;
  const signature = getSidePanelSignature();
  elements.questionArea.innerHTML = '';
  session.runtime.sidePanelSignature = signature;
}

function renderChoiceButton(choice, index, question, quiz) {
  const choiceValue = String(choice);
  const disabled = quiz?.answerLocked ? ' disabled' : '';
  const correctClass = quiz?.answered && choiceValue === String(question.answer) ? ' is-correct' : '';
  const wrongClass = quiz?.answered && choiceValue === quiz.selectedChoice && choiceValue !== String(question.answer) ? ' is-wrong' : '';
  const isImageChoice = isQuizImageAsset(choiceValue);
  const imageClass = isImageChoice ? ' has-image-choice' : '';
  const longTextClass = !isImageChoice && choiceValue.length >= 16 ? ' has-long-text-choice' : '';
  const choiceBody = isImageChoice
    ? `<span class="choice-media"><img src="${escapeHtml(resolveQuizAssetPath(choiceValue))}" alt="선택지 ${index + 1}" /></span>`
    : `<span class="choice-text">${escapeHtml(choiceValue)}</span>`;
  return `
    <button class="choice-button choice-tone-${(index % 4) + 1}${imageClass}${longTextClass}${correctClass}${wrongClass}" type="button" data-choice="${escapeHtml(choiceValue)}"${disabled}>
      <span class="choice-index">${index + 1}</span>
      ${choiceBody}
    </button>
  `;
}

function getQuizLayer(playerIndex = session?.quizPlayerIndex) {
  if (!session) return null;
  const safeIndex = clamp(Number(playerIndex) || 0, 0, session.players.length - 1);
  return $(`[data-quiz-layer="${safeIndex}"]`, elements.gameStage);
}

function clearQuizLayer(playerIndex) {
  const layer = getQuizLayer(playerIndex);
  if (!layer) return;
  layer.hidden = true;
  layer.innerHTML = '';
}

function clearQuizLayers() {
  $$('[data-quiz-layer]', elements.gameStage).forEach((layer) => {
    layer.hidden = true;
    layer.innerHTML = '';
  });
}

function getQuizFeedbackText(playerIndex = session?.quizPlayerIndex) {
  const quiz = getPlayerQuizState(playerIndex);
  if (!quiz?.answered) return quiz?.feedback || '';
  const quizPlayer = getPlayerByIndex(playerIndex);
  const waitMs = Math.max(0, (Number(quiz.nextAllowedAt) || 0) - Date.now());
  const nextLabel = isQuizBatchComplete(playerIndex) ? '맵으로 돌아갑니다' : '다음 문제로 넘어갑니다';
  const waitText = waitMs > 0
    ? `${Math.ceil(waitMs / 1000)}초 후 자동으로 ${nextLabel}`
    : `자동으로 ${nextLabel}`;
  const baseText = quiz.correct ? '정답입니다' : '오답입니다';
  if (!quiz.correct) {
    return `${baseText} · ${waitText} · 체력 ${formatGauge(quizPlayer?.gauge || 0)}`;
  }
  return `${baseText} · 체력 +${formatGauge(quiz.reward)} · 현재 ${formatGauge(quizPlayer?.gauge || 0)} · ${waitText}`;
}

function updateQuizActionState() {
  if (!session) return;
  session.players.forEach((player, index) => {
    const quiz = player.quiz;
    if (!quiz?.open || !quiz.answered) return;
    const layer = getQuizLayer(index);
    const feedback = $('.quiz-card > .feedback-line', layer || document);
    if (feedback) {
      feedback.textContent = getQuizFeedbackText(index);
      feedback.className = `feedback-line ${quiz.feedbackKind}`;
    }
    if (!quiz.autoTimerId && Date.now() >= (Number(quiz.nextAllowedAt) || 0)) {
      advanceQuizAfterFeedback(index);
    }
  });
}

function renderQuizPanel(playerIndex = null) {
  if (!session) return;
  if (playerIndex == null) {
    session.players.forEach((_, index) => renderQuizPanel(index));
    syncSessionQuizCompatibility();
    return;
  }
  const safeIndex = clamp(Number(playerIndex) || 0, 0, session.players.length - 1);
  const quiz = getPlayerQuizState(safeIndex);
  const layer = getQuizLayer(safeIndex);
  if (!quiz?.open || !quiz.currentQuestion) {
    clearQuizLayer(safeIndex);
    syncSessionQuizCompatibility(safeIndex);
    syncTestDataset();
    return;
  }
  if (!layer) return;

  const question = quiz.currentQuestion;
  const quizPlayer = getPlayerByIndex(safeIndex);
  const batchSize = Number(quiz.batchSize) || QUIZ_BATCH_SIZE;
  const batchIndex = clamp(Number(quiz.batchIndex) || 1, 1, batchSize);
  const hasQuestionImage = Boolean(question.hasQuestionImage && question.image);
  const hasChoiceImages = question.choices.some(isQuizImageAsset);
  const cardClass = [
    'quiz-card',
    hasQuestionImage ? 'has-question-image' : 'no-question-image',
    hasChoiceImages ? 'has-choice-images' : 'has-text-choices'
  ].join(' ');
  const questionBody = hasQuestionImage
    ? `<div class="question-image-wrap"><img src="${escapeHtml(question.image)}" alt="${escapeHtml(question.prompt)}" /></div>`
    : `<p class="question-text">${escapeHtml(question.text || question.prompt)}</p>`;

  layer.hidden = false;
  layer.innerHTML = `
    <div class="${cardClass}" role="dialog" aria-modal="true" aria-label="점프맵 퀴즈">
      <div class="quiz-header">
        <div class="quiz-meta-line">
          <span>${escapeHtml(quizPlayer?.name || '사용자')}</span>
          <span class="quiz-progress-badge">${batchIndex} / ${batchSize}</span>
        </div>
        <div class="question-kicker">${escapeHtml(question.prompt)}</div>
      </div>
      <div class="quiz-body">
        ${questionBody}
        <div class="choice-grid">
          ${question.choices.map((choice, index) => renderChoiceButton(choice, index, question, quiz)).join('')}
        </div>
      </div>
      <div class="feedback-line ${quiz.feedbackKind}">${escapeHtml(getQuizFeedbackText(safeIndex))}</div>
    </div>
  `;

  $$('.choice-button', layer).forEach((button) => {
    button.addEventListener('click', () => submitAnswer(button.dataset.choice || '', safeIndex));
  });
  syncSessionQuizCompatibility(safeIndex);
  syncTestDataset();
}

function renderPlay() {
  if (!session) return;
  elements.playTitle.textContent = '위인 점프맵';
  renderStageShell();
  updateTimer();
}

function getObjectDrawInfo(object, image) {
  const crop = object.crop && typeof object.crop === 'object' ? object.crop : null;
  const sourceX = Math.max(0, Number(crop?.x) || 0);
  const sourceY = Math.max(0, Number(crop?.y) || 0);
  const sourceW = Math.max(1, Number(crop?.w) || image?.naturalWidth || image?.width || 1);
  const sourceH = Math.max(1, Number(crop?.h) || image?.naturalHeight || image?.height || 1);
  const scale = Math.max(0.01, Math.abs(Number(object.scale) || 1));
  const drawW = sourceW * scale;
  const drawH = sourceH * scale;
  return {
    sourceX,
    sourceY,
    sourceW,
    sourceH,
    drawW,
    drawH,
    worldRect: {
      x: Number(object.x) || 0,
      y: Number(object.y) || 0,
      width: drawW,
      height: drawH
    }
  };
}

function rectsIntersect(a, b, pad = 0) {
  return (
    a.x < b.x + b.width + pad &&
    a.x + a.width > b.x - pad &&
    a.y < b.y + b.height + pad &&
    a.y + a.height > b.y - pad
  );
}

function ensureCanvasSize(canvas = session?.runtime.canvas) {
  if (!canvas) return { width: 1, height: 1, dpr: 1 };
  const cache = session?.runtime?.canvasSizeCache?.get(canvas);
  if (cache && !session?.runtime?.canvasSizeDirty) return cache;
  const rect = canvas.getBoundingClientRect();
  const renderScale = clamp(Number(session?.runtime?.renderScale) || RENDER_SCALE_MAX, RENDER_SCALE_MIN, RENDER_SCALE_MAX);
  const dpr = clamp((window.devicePixelRatio || 1) * renderScale, 1, 2);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  const size = { width, height, cssWidth: Math.max(1, rect.width), cssHeight: Math.max(1, rect.height), dpr, renderScale };
  session?.runtime?.canvasSizeCache?.set(canvas, size);
  return size;
}

function resetRenderCaches(runtime = session?.runtime) {
  if (!runtime) return;
  runtime.canvasSizeDirty = true;
  runtime.canvasSizeCache = new WeakMap();
  runtime.backgroundCache?.clear?.();
  if (runtime.sharedStaticLayer) runtime.sharedStaticLayer.key = '';
  runtime.lastSceneRenderSignature = '';
  runtime.lastViewportRenderSignatures = [];
}

function setRuntimeRenderScale(nextScale) {
  const runtime = session?.runtime;
  if (!runtime) return false;
  const next = clamp(Number(nextScale) || RENDER_SCALE_MAX, RENDER_SCALE_MIN, RENDER_SCALE_MAX);
  const current = clamp(Number(runtime.renderScale) || RENDER_SCALE_MAX, RENDER_SCALE_MIN, RENDER_SCALE_MAX);
  if (Math.abs(next - current) < 0.001) return false;
  runtime.renderScale = next;
  resetRenderCaches(runtime);
  syncTestDataset({ force: true });
  return true;
}

function recordRenderPerformance(drawMs, timestamp = performance.now()) {
  const runtime = session?.runtime;
  if (!runtime?.renderPerf) return;
  const perf = runtime.renderPerf;
  const now = Number.isFinite(Number(timestamp)) ? Number(timestamp) : performance.now();
  const sampleStartedAt = Number(perf.sampleStartedAt) || now;
  if (!perf.sampleStartedAt) perf.sampleStartedAt = sampleStartedAt;
  perf.sampleCount = (Number(perf.sampleCount) || 0) + 1;
  perf.sampleTotalMs = (Number(perf.sampleTotalMs) || 0) + Math.max(0, Number(drawMs) || 0);
  perf.sampleMaxMs = Math.max(Number(perf.sampleMaxMs) || 0, Number(drawMs) || 0);
  if (now - sampleStartedAt < RENDER_PERF_SAMPLE_MS) return;

  const avgMs = perf.sampleTotalMs / Math.max(1, perf.sampleCount);
  const maxMs = Number(perf.sampleMaxMs) || 0;
  const currentScale = clamp(Number(runtime.renderScale) || RENDER_SCALE_MAX, RENDER_SCALE_MIN, RENDER_SCALE_MAX);
  const slow = avgMs >= RENDER_SLOW_FRAME_MS || maxMs >= RENDER_VERY_SLOW_FRAME_MS;
  const stable = avgMs <= RENDER_STABLE_FRAME_MS && maxMs <= RENDER_SLOW_FRAME_MS;

  if (slow && currentScale > RENDER_SCALE_MIN + 0.001) {
    setRuntimeRenderScale(currentScale - RENDER_SCALE_DROP_STEP);
    perf.stableStartedAt = 0;
  } else if (stable && currentScale < RENDER_SCALE_MAX - 0.001) {
    if (!perf.stableStartedAt) perf.stableStartedAt = now;
    if (now - perf.stableStartedAt >= RENDER_PERF_RECOVER_MS) {
      setRuntimeRenderScale(currentScale + RENDER_SCALE_RECOVER_STEP);
      perf.stableStartedAt = now;
    }
  } else if (!stable) {
    perf.stableStartedAt = 0;
  }

  perf.sampleStartedAt = now;
  perf.sampleCount = 0;
  perf.sampleTotalMs = 0;
  perf.sampleMaxMs = 0;
}

function computeCamera(canvasSize, player = getActivePlayer()) {
  const runtime = session.runtime;
  const aspect = Math.max(0.42, canvasSize.cssWidth / Math.max(1, canvasSize.cssHeight));
  const viewWidth = clamp(canvasSize.cssWidth < 520 ? 840 : canvasSize.cssWidth < 900 ? 980 : 1120, 760, 1240);
  const viewHeight = clamp(viewWidth / aspect, 560, 1200);
  const mapWidth = runtime.mapRect.width;
  const mapHeight = runtime.mapRect.height;
  const yBias = Number.isFinite(Number(runtime.map?.camera?.yBias)) ? Number(runtime.map.camera.yBias) : 0.46;
  const targetX = (Number(player?.state.x) || 0) + runtime.metrics.width / 2 - viewWidth / 2;
  const targetY = (Number(player?.state.y) || 0) - viewHeight * (1 - yBias);
  return {
    x: clamp(targetX, 0, Math.max(0, mapWidth - viewWidth)),
    y: clamp(targetY, 0, Math.max(0, mapHeight - viewHeight)),
    width: Math.min(viewWidth, mapWidth),
    height: Math.min(viewHeight, mapHeight)
  };
}

function buildProjector(canvasSize, camera) {
  const scale = Math.min(canvasSize.width / camera.width, canvasSize.height / camera.height);
  const offsetX = (canvasSize.width - camera.width * scale) * 0.5;
  const offsetY = (canvasSize.height - camera.height * scale) * 0.5;
  return {
    scale,
    x: (worldX) => offsetX + (worldX - camera.x) * scale,
    y: (worldY) => offsetY + (worldY - camera.y) * scale
  };
}

function getBackgroundCacheKey(background, size) {
  return [
    size.width,
    size.height,
    background.color,
    background.image || '',
    background.imageOpacity
  ].join('|');
}

function getCachedBackgroundCanvas(background, size, image) {
  if (!session?.runtime?.backgroundCache) return null;
  const key = getBackgroundCacheKey(background, size);
  const cached = session.runtime.backgroundCache.get(key);
  if (cached) return cached;
  const canvas = document.createElement('canvas');
  canvas.width = size.width;
  canvas.height = size.height;
  const bgCtx = getCanvasContext2d(canvas, BACKGROUND_CANVAS_CONTEXT_OPTIONS);
  if (!bgCtx) return null;
  bgCtx.fillStyle = background.color;
  bgCtx.fillRect(0, 0, size.width, size.height);
  if (image) {
    const scale = Math.max(size.width / image.naturalWidth, size.height / image.naturalHeight);
    const drawW = image.naturalWidth * scale;
    const drawH = image.naturalHeight * scale;
    const x = (size.width - drawW) * 0.5;
    const y = size.height - drawH;
    bgCtx.save();
    bgCtx.globalAlpha = background.imageOpacity;
    bgCtx.drawImage(image, x, y, drawW, drawH);
    bgCtx.restore();
  }
  session.runtime.backgroundCache.set(key, canvas);
  if (session.runtime.backgroundCache.size > 8) {
    const firstKey = session.runtime.backgroundCache.keys().next().value;
    session.runtime.backgroundCache.delete(firstKey);
  }
  return canvas;
}

function drawBackground(ctx, size) {
  const { background } = session.runtime;
  const image = getLoadedImage(background.image);
  if (background.image && !image) {
    ctx.fillStyle = background.color;
    ctx.fillRect(0, 0, size.width, size.height);
    return;
  }
  const cached = getCachedBackgroundCanvas(background, size, image);
  if (cached) {
    ctx.drawImage(cached, 0, 0);
    return;
  }
  ctx.fillStyle = background.color;
  ctx.fillRect(0, 0, size.width, size.height);
}

function drawMapObjectToContext(ctx, object, image, info, x, y, scale = 1) {
  const pw = info.drawW * scale;
  const ph = info.drawH * scale;
  const rotation = ((Number(object.rotation) || 0) * Math.PI) / 180;
  ctx.save();
  ctx.translate(x + pw / 2, y + ph / 2);
  ctx.rotate(rotation);
  ctx.scale(object.flipH ? -1 : 1, object.flipV ? -1 : 1);
  if (image) {
    ctx.drawImage(
      image,
      info.sourceX,
      info.sourceY,
      info.sourceW,
      info.sourceH,
      -pw / 2,
      -ph / 2,
      pw,
      ph
    );
  } else {
    ctx.fillStyle = 'rgba(82, 117, 72, 0.45)';
    ctx.fillRect(-pw / 2, -ph / 2, pw, ph);
  }
  ctx.restore();
}

function drawMapObjectDirect(ctx, object, projector) {
  const image = getLoadedImage(object.spriteSrc);
  const info = object.drawInfo || (object.drawInfo = getObjectDrawInfo(object, image));
  const worldX = Number(object.x) || 0;
  const worldY = Number(object.y) || 0;
  drawMapObjectToContext(
    ctx,
    object,
    image,
    info,
    projector.x(worldX),
    projector.y(worldY),
    projector.scale
  );
}

function touchMapObjectChunkCache(runtime, key, chunk) {
  runtime.objectChunkCache.delete(key);
  runtime.objectChunkCache.set(key, chunk);
  while (runtime.objectChunkCache.size > MAP_OBJECT_CHUNK_CACHE_LIMIT) {
    const firstKey = runtime.objectChunkCache.keys().next().value;
    runtime.objectChunkCache.delete(firstKey);
  }
}

function hasCachedMapObjectChunk(runtime, key) {
  return !!runtime?.objectChunkCache?.has(key);
}

function enqueueMapObjectChunk(runtime, key, { priority = false } = {}) {
  if (!runtime?.objectChunkIndex?.has(key) || hasCachedMapObjectChunk(runtime, key)) return false;
  if (!runtime.objectChunkPrepareQueue || !runtime.objectChunkPrepareQueued) return false;
  if (runtime.objectChunkPrepareQueued.has(key)) return false;
  if (runtime.objectChunkPrepareQueue.length >= MAP_OBJECT_CHUNK_QUEUE_LIMIT) {
    const removed = priority
      ? runtime.objectChunkPrepareQueue.pop()
      : runtime.objectChunkPrepareQueue.shift();
    if (removed) runtime.objectChunkPrepareQueued.delete(removed);
  }
  if (priority) runtime.objectChunkPrepareQueue.unshift(key);
  else runtime.objectChunkPrepareQueue.push(key);
  runtime.objectChunkPrepareQueued.add(key);
  scheduleMapObjectChunkPrepare(runtime);
  return true;
}

function getMapObjectChunkKeysForCull(runtime, cull) {
  if (!runtime?.objectChunkIndex?.size) return [];
  const keys = [];
  const startCol = Math.floor((Number(cull.x) || 0) / MAP_OBJECT_CHUNK_SIZE);
  const endCol = Math.floor(((Number(cull.x) || 0) + Math.max(1, Number(cull.width) || 1)) / MAP_OBJECT_CHUNK_SIZE);
  const startRow = Math.floor((Number(cull.y) || 0) / MAP_OBJECT_CHUNK_SIZE);
  const endRow = Math.floor(((Number(cull.y) || 0) + Math.max(1, Number(cull.height) || 1)) / MAP_OBJECT_CHUNK_SIZE);
  for (let row = startRow; row <= endRow; row += 1) {
    for (let col = startCol; col <= endCol; col += 1) {
      const key = `${col},${row}`;
      if (runtime.objectChunkIndex.has(key)) keys.push(key);
    }
  }
  return keys;
}

function enqueueMapObjectChunksForCull(runtime, cull, options = {}) {
  getMapObjectChunkKeysForCull(runtime, cull).forEach((key) => enqueueMapObjectChunk(runtime, key, options));
}

function scheduleMapObjectChunkPrepare(runtime = session?.runtime) {
  if (!runtime || runtime.objectChunkPrepareHandle) return;
  const run = (deadline = null) => {
    runtime.objectChunkPrepareHandle = 0;
    if (runtime !== session?.runtime || session?.endedAt) return;
    const startedAt = performance.now();
    while (runtime.objectChunkPrepareQueue?.length) {
      const timeRemaining = typeof deadline?.timeRemaining === 'function'
        ? deadline.timeRemaining()
        : MAP_OBJECT_CHUNK_PREPARE_BUDGET_MS - (performance.now() - startedAt);
      if (timeRemaining < 2 && performance.now() - startedAt >= MAP_OBJECT_CHUNK_PREPARE_BUDGET_MS) break;
      const key = runtime.objectChunkPrepareQueue.shift();
      runtime.objectChunkPrepareQueued.delete(key);
      if (!key || hasCachedMapObjectChunk(runtime, key)) continue;
      const [col, row] = key.split(',').map((value) => Number(value) || 0);
      renderMapObjectChunk(runtime, col, row);
    }
    if (runtime.objectChunkPrepareQueue?.length) scheduleMapObjectChunkPrepare(runtime);
  };
  if (typeof window.requestIdleCallback === 'function') {
    runtime.objectChunkPrepareHandle = window.requestIdleCallback(run, { timeout: 220 });
    return;
  }
  runtime.objectChunkPrepareHandle = window.setTimeout(() => run(null), 32);
}

function cancelMapObjectChunkPrepare(runtime = session?.runtime) {
  if (!runtime?.objectChunkPrepareHandle) return;
  if (typeof window.cancelIdleCallback === 'function') {
    window.cancelIdleCallback(runtime.objectChunkPrepareHandle);
  } else {
    window.clearTimeout(runtime.objectChunkPrepareHandle);
  }
  runtime.objectChunkPrepareHandle = 0;
}

function renderMapObjectChunk(runtime, col, row) {
  if (!runtime?.objectChunkCache || !runtime?.objectChunkIndex) return null;
  const key = `${col},${row}`;
  const cached = runtime.objectChunkCache.get(key);
  if (cached) {
    touchMapObjectChunkCache(runtime, key, cached);
    return cached;
  }
  const objectIndexes = runtime.objectChunkIndex.get(key);
  if (!objectIndexes?.length) return null;
  const canvas = document.createElement('canvas');
  canvas.width = MAP_OBJECT_CHUNK_SIZE;
  canvas.height = MAP_OBJECT_CHUNK_SIZE;
  const chunkCtx = getCanvasContext2d(canvas, CHUNK_CANVAS_CONTEXT_OPTIONS);
  if (!chunkCtx) return null;
  const worldX = col * MAP_OBJECT_CHUNK_SIZE;
  const worldY = row * MAP_OBJECT_CHUNK_SIZE;
  let complete = true;
  objectIndexes.forEach((objectIndex) => {
    const object = runtime.objects[objectIndex];
    if (!object) return;
    const image = getLoadedImage(object.spriteSrc);
    if (object.spriteSrc && !image) complete = false;
    const info = object.drawInfo || (object.drawInfo = getObjectDrawInfo(object, image));
    drawMapObjectToContext(
      chunkCtx,
      object,
      image,
      info,
      (Number(object.x) || 0) - worldX,
      (Number(object.y) || 0) - worldY,
      1
    );
  });
  const chunk = { canvas, worldX, worldY };
  if (complete) touchMapObjectChunkCache(runtime, key, chunk);
  return chunk;
}

function drawMapObjectChunks(ctx, runtime, cull, projector) {
  if (!runtime?.objectChunkIndex?.size) return false;
  const keys = getMapObjectChunkKeysForCull(runtime, cull);
  if (!keys.length) return false;
  const missing = keys.filter((key) => !hasCachedMapObjectChunk(runtime, key));
  if (missing.length) {
    missing.forEach((key) => enqueueMapObjectChunk(runtime, key, { priority: true }));
    return false;
  }
  let drew = false;
  keys.forEach((key) => {
    const chunk = runtime.objectChunkCache.get(key);
    if (!chunk) return;
    touchMapObjectChunkCache(runtime, key, chunk);
    ctx.drawImage(
      chunk.canvas,
      projector.x(chunk.worldX),
      projector.y(chunk.worldY),
      MAP_OBJECT_CHUNK_SIZE * projector.scale,
      MAP_OBJECT_CHUNK_SIZE * projector.scale
    );
    drew = true;
  });
  return drew;
}

async function prewarmMapObjectChunks(runtime, players, options = {}) {
  if (!runtime?.objectChunkIndex?.size || !Array.isArray(players)) return;
  const chunkKeys = new Set();
  players.forEach((player) => {
    const state = player?.state;
    if (!state) return;
    const playerX = Number(state.x) || 0;
    const playerY = Number(state.y) || 0;
    const cull = {
      x: playerX - MAP_OBJECT_PREWARM_WIDTH * 0.5,
      y: playerY - MAP_OBJECT_PREWARM_ABOVE,
      width: MAP_OBJECT_PREWARM_WIDTH,
      height: MAP_OBJECT_PREWARM_ABOVE + MAP_OBJECT_PREWARM_BELOW
    };
    getMapObjectChunkKeysForCull(runtime, cull).forEach((key) => chunkKeys.add(key));
  });
  let warmed = 0;
  const onProgress = typeof options.onProgress === 'function' ? options.onProgress : null;
  for (const key of chunkKeys) {
    const [col, row] = key.split(',').map((value) => Number(value) || 0);
    renderMapObjectChunk(runtime, col, row);
    warmed += 1;
    if (onProgress) onProgress(warmed, chunkKeys.size);
    if (warmed % PRELOAD_IMAGE_YIELD_EVERY === 0) {
      await yieldToBrowser();
    }
  }
}

function enqueueAheadMapObjectChunks(runtime = session?.runtime) {
  if (!runtime?.objectChunkIndex?.size || !session?.players?.length) return;
  session.players.forEach((player) => {
    const state = player?.state;
    if (!state) return;
    const x = Number(state.x) || 0;
    const y = Number(state.y) || 0;
    const vy = Number(state.vy) || 0;
    const verticalLead = vy < -40 ? 500 : 0;
    enqueueMapObjectChunksForCull(runtime, {
      x: x - MAP_OBJECT_CHUNK_AHEAD_WIDTH * 0.5,
      y: y - MAP_OBJECT_CHUNK_AHEAD_HEIGHT - verticalLead,
      width: MAP_OBJECT_CHUNK_AHEAD_WIDTH,
      height: MAP_OBJECT_CHUNK_AHEAD_HEIGHT
    });
  });
}

function drawMapObjects(ctx, camera, projector) {
  const runtime = session.runtime;
  const cull = {
    x: camera.x - 140,
    y: camera.y - 180,
    width: camera.width + 280,
    height: camera.height + 360
  };
  if (projector.scale <= MAP_OBJECT_CHUNK_MAX_PROJECTOR_SCALE && drawMapObjectChunks(ctx, runtime, cull, projector)) {
    return;
  }
  for (const object of getVisibleMapObjects(runtime, cull)) {
    const image = getLoadedImage(object.spriteSrc);
    const info = object.drawInfo || (object.drawInfo = getObjectDrawInfo(object, image));
    if (!rectsIntersect(info.worldRect, cull)) continue;
    drawMapObjectDirect(ctx, object, projector);
  }
}

function drawDebugHitboxes(ctx, camera, projector) {
  if (!session.runtime.debugHitboxes) return;
  ctx.save();
  ctx.lineWidth = Math.max(1.5, projector.scale * 2.2);
  ctx.strokeStyle = 'rgba(224, 43, 43, 0.88)';
  ctx.fillStyle = 'rgba(224, 43, 43, 0.12)';
  for (const obstacle of session.runtime.obstacles.list || []) {
    const points = Array.isArray(obstacle.points) ? obstacle.points : [];
    if (points.length < 3) continue;
    const minX = Math.min(...points.map((point) => Number(point.x) || 0));
    const maxX = Math.max(...points.map((point) => Number(point.x) || 0));
    const minY = Math.min(...points.map((point) => Number(point.y) || 0));
    const maxY = Math.max(...points.map((point) => Number(point.y) || 0));
    if (!rectsIntersect({ x: minX, y: minY, width: maxX - minX, height: maxY - minY }, camera, 120)) continue;
    ctx.beginPath();
    points.forEach((point, index) => {
      const x = projector.x(Number(point.x) || 0);
      const y = projector.y(Number(point.y) || 0);
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.restore();
}

function drawStaticScene(ctx, size, camera, projector) {
  drawBackground(ctx, size);
  drawMapObjects(ctx, camera, projector);
  drawDebugHitboxes(ctx, camera, projector);
}

function getStaticSceneKey(size, camera) {
  return [
    `${size.width}x${size.height}`,
    Number(camera.x || 0).toFixed(3),
    Number(camera.y || 0).toFixed(3),
    Number(camera.width || 0).toFixed(3),
    Number(camera.height || 0).toFixed(3),
    session?.runtime?.debugHitboxes ? 1 : 0
  ].join('|');
}

function ensureSharedStaticLayer(runtime, size) {
  if (!runtime) return null;
  const width = Math.max(1, Math.round(Number(size?.width) || 1));
  const height = Math.max(1, Math.round(Number(size?.height) || 1));
  let layer = runtime.sharedStaticLayer;
  if (!layer?.canvas || !layer?.ctx) {
    const canvas = document.createElement('canvas');
    const ctx = getCanvasContext2d(canvas, CHUNK_CANVAS_CONTEXT_OPTIONS);
    if (!ctx) return null;
    layer = { canvas, ctx };
    runtime.sharedStaticLayer = layer;
  }
  if (layer.canvas.width !== width || layer.canvas.height !== height) {
    layer.canvas.width = width;
    layer.canvas.height = height;
    layer.key = '';
  }
  return layer;
}

function getRuntimeEffectBudgetScale() {
  const renderScale = Number(session?.runtime?.renderScale) || RENDER_SCALE_MAX;
  if (renderScale <= 0.8) return 0.55;
  if (renderScale <= 0.9) return 0.75;
  return 1;
}

function spawnLandingDust(player, impactVy = 0) {
  if (!session || !player?.state) return;
  const metrics = session.runtime.metrics || { width: 44, height: 64 };
  const impact = clamp(Math.abs(Number(impactVy) || 0) / 520, 0.45, 1.35);
  const effectBudget = getRuntimeEffectBudgetScale();
  const count = clamp(Math.round((5 + impact * 5) * effectBudget), 3, 12);
  const footX = (Number(player.state.x) || 0) + (Number(metrics.width) || 0) / 2;
  const footY = (Number(player.state.y) || 0) + (Number(metrics.height) || 0) - 3;
  const particles = Array.isArray(player.dustParticles) ? player.dustParticles : [];
  for (let index = 0; index < count; index += 1) {
    const side = index % 2 === 0 ? -1 : 1;
    const spread = 34 + Math.random() * 70;
    particles.push({
      x: footX + (Math.random() - 0.5) * 18,
      y: footY + Math.random() * 4,
      vx: side * spread * (0.45 + Math.random() * 0.65),
      vy: -24 - Math.random() * 44 * impact,
      radius: 7 + Math.random() * 10,
      age: 0,
      life: LANDING_DUST_LIFE_SEC * (0.72 + Math.random() * 0.42),
      alpha: 0.28 + Math.random() * 0.18
    });
  }
  player.dustParticles = particles.slice(-Math.max(8, Math.round(LANDING_DUST_MAX_PARTICLES * effectBudget)));
}

function updatePlayerDust(player, dt) {
  if (!player?.dustParticles?.length) return;
  const safeDt = Math.max(0, Number(dt) || 0);
  player.dustParticles = player.dustParticles.filter((particle) => {
    particle.age = (Number(particle.age) || 0) + safeDt;
    if (particle.age >= particle.life) return false;
    particle.x += particle.vx * safeDt;
    particle.y += particle.vy * safeDt;
    particle.vy += 95 * safeDt;
    particle.vx *= Math.max(0, 1 - safeDt * 2.4);
    return true;
  });
}

function drawLandingDust(ctx, camera, projector, viewPlayer = getActivePlayer()) {
  const cull = {
    x: camera.x - 90,
    y: camera.y - 90,
    width: camera.width + 180,
    height: camera.height + 180
  };
  ctx.save();
  const effectBudget = getRuntimeEffectBudgetScale();
  for (const player of session.players) {
    const particles = Array.isArray(player.dustParticles) ? player.dustParticles : [];
    if (!particles.length) continue;
    const active = player === viewPlayer;
    if (!active && effectBudget < 1) continue;
    const visibleParticles = active ? particles : particles.slice(-6);
    for (const particle of visibleParticles) {
      if (!rectsIntersect({ x: particle.x - 30, y: particle.y - 30, width: 60, height: 60 }, cull, 0)) continue;
      const progress = clamp((Number(particle.age) || 0) / Math.max(0.01, Number(particle.life) || 0.01), 0, 1);
      const alpha = (Number(particle.alpha) || 0.3) * (1 - progress) * (active ? 1 : 0.45);
      const radius = (Number(particle.radius) || 8) * (0.72 + progress * 0.75) * projector.scale;
      ctx.beginPath();
      ctx.fillStyle = `rgba(229, 216, 184, ${alpha})`;
      ctx.ellipse(projector.x(particle.x), projector.y(particle.y), radius * 1.35, radius * 0.52, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function hasSpriteGroundContact(player) {
  const playerState = player?.state;
  if (!playerState || playerState.onGround) return !!playerState?.onGround;
  const detectGroundSupport = window.JumpmapTestPhysicsUtils?.detectGroundSupport;
  if (typeof detectGroundSupport !== 'function' || !session?.runtime) return false;
  try {
    const inputDir = (playerState.input?.right ? 1 : 0) - (playerState.input?.left ? 1 : 0);
    const vx = Number(playerState.vx) || 0;
    const facing = Number(playerState.facing) || 0;
    const probeDirection = inputDir || (vx > 6 ? 1 : (vx < -6 ? -1 : facing));
    const supportFootY = detectGroundSupport(playerState, session.runtime.metrics, session.runtime.obstacles, {
      maxUp: 6,
      maxDown: 24,
      direction: probeDirection,
      minSupportSamples: 1,
      minSupportSpanPx: 0,
      supportYTolerance: 2.5,
      sampleSpacing: Number(session.runtime.physics?.groundSampleSpacing) || undefined,
      playerHitboxPolygon: session.runtime.playerHitboxPolygon
    });
    if (supportFootY == null) return false;
    const footY = (Number(playerState.y) || 0) + (Number(session.runtime.metrics?.height) || 0);
    const gap = supportFootY - footY;
    const vy = Number(playerState.vy) || 0;
    const hasMoveInput = !!playerState.input?.left || !!playerState.input?.right;
    if (gap >= -3 && gap <= 12) return true;
    if (hasMoveInput && vy >= -8 && gap >= -4 && gap <= 24) return true;
    if (vy < -24 && gap > 1.5) return false;
    return gap >= -6 && gap <= 16;
  } catch (_error) {
    return false;
  }
}

function getCachedSpriteGroundContact(player, dt) {
  const state = player?.state;
  if (!state) return false;
  if (state.onGround) {
    state._spriteGroundContact = true;
    state._spriteGroundProbeWaitSec = 0;
    return true;
  }
  const wait = Math.max(0, Number(state._spriteGroundProbeWaitSec) || 0);
  const nextWait = wait - Math.max(0, Number(dt) || 0);
  if (nextWait > 0) {
    state._spriteGroundProbeWaitSec = nextWait;
    return !!state._spriteGroundContact;
  }
  const contact = hasSpriteGroundContact(player);
  state._spriteGroundContact = contact;
  state._spriteGroundProbeWaitSec = SPRITE_GROUND_PROBE_INTERVAL_SEC;
  return contact;
}

function updatePlayerSpriteState(player, dt, groundedForSprite = null) {
  const state = player?.state;
  const character = player?.character || session?.character || CHARACTERS[0];
  if (!state || !character) return character?.front || '';
  const walkSprites = Array.isArray(character.walk) && character.walk.length
    ? character.walk
    : [];
  const idleSprite = character.right || character.front;
  const jumpSprite = character.jump || idleSprite;
  const fallSprite = character.fall || jumpSprite;
  const safeDt = Math.max(0, Number(dt) || 0);
  const grounded = typeof groundedForSprite === 'boolean' ? groundedForSprite : !!state.onGround;
  const vy = Number(state.vy) || 0;
  const prevGroundLatch = Math.max(0, Number(state._spriteGroundLatchSec) || 0);
  const nextGroundLatch = grounded
    ? SPRITE_GROUND_LATCH_SEC
    : Math.max(0, prevGroundLatch - safeDt);
  state._spriteGroundLatchSec = nextGroundLatch;
  const hasMoveInput = !!state.input?.left || !!state.input?.right;
  const prevMoveLatch = Math.max(0, Number(state._spriteMoveLatchSec) || 0);
  const nextMoveLatch = hasMoveInput
    ? SPRITE_MOVE_LATCH_SEC
    : Math.max(0, prevMoveLatch - safeDt);
  state._spriteMoveLatchSec = nextMoveLatch;
  const groundedVisual = grounded || (
    nextGroundLatch > 0 &&
    !state.jumping &&
    vy > -24
  );
  const moveVisual = hasMoveInput || nextMoveLatch > 0;
  let sprite = idleSprite;
  if (!groundedVisual && vy < 0) {
    sprite = jumpSprite;
  } else if (!groundedVisual && vy > 0) {
    sprite = fallSprite;
  } else if (groundedVisual && (moveVisual || Math.abs(Number(state.vx) || 0) > 1)) {
    const wasWalkSprite = walkSprites.includes(state._spriteSrc);
    if (!wasWalkSprite) {
      state.walkTimer = 0;
      sprite = walkSprites[0] || idleSprite;
    } else {
      state.walkTimer = Math.max(0, Number(state.walkTimer) || 0) + safeDt;
      const frameIndex = walkSprites.length > 0
        ? Math.floor(state.walkTimer / WALK_FRAME_INTERVAL_SEC) % walkSprites.length
        : 0;
      sprite = walkSprites[frameIndex] || idleSprite;
    }
  } else {
    state.walkTimer = 0;
  }
  state._spriteSrc = sprite;
  return sprite;
}

function getPlayerImage(player) {
  const character = player?.character || session.character || CHARACTERS[0];
  if (performance.now() < player.damagedUntil) return character.damaged;
  return player.state._spriteSrc || updatePlayerSpriteState(player, 0, player.state.onGround);
}

function getPlayerSpriteCrop(runtimeMap, image) {
  const metaW = Math.max(1, Number(image?.naturalWidth) || Number(image?.width) || 256);
  const metaH = Math.max(1, Number(image?.naturalHeight) || Number(image?.height) || 256);
  const rawCrop = runtimeMap?.playerCrop && typeof runtimeMap.playerCrop === 'object'
    ? runtimeMap.playerCrop
    : null;
  if (!rawCrop) return { x: 0, y: 0, w: metaW, h: metaH, metaW, metaH };
  const x = clamp(Number(rawCrop.x) || 0, 0, Math.max(0, metaW - 1));
  const y = clamp(Number(rawCrop.y) || 0, 0, Math.max(0, metaH - 1));
  const w = clamp(Number(rawCrop.w) || metaW, 1, Math.max(1, metaW - x));
  const h = clamp(Number(rawCrop.h) || metaH, 1, Math.max(1, metaH - y));
  return { x, y, w, h, metaW, metaH };
}

function getPlayerSpriteResolutionScale(crop) {
  const sourceSize = Math.max(1, Number(crop?.metaW) || 1, Number(crop?.metaH) || 1);
  return PLAYER_SPRITE_LOGICAL_SIZE / sourceSize;
}

function getPlayerSpriteRender(runtimeMap, image) {
  const cache = session?.runtime?.playerSpriteRenderCache;
  const imageKey = image?.src || `${Number(image?.naturalWidth) || 0}x${Number(image?.naturalHeight) || 0}`;
  const cropKey = runtimeMap?.playerCrop
    ? `${runtimeMap.playerCrop.x || 0},${runtimeMap.playerCrop.y || 0},${runtimeMap.playerCrop.w || 0},${runtimeMap.playerCrop.h || 0}`
    : 'full';
  const key = `${imageKey}|${cropKey}|${runtimeMap?.playerScale || 1}`;
  if (cache?.has(key)) return cache.get(key);
  const metrics = getPlayerMetrics(runtimeMap);
  const crop = getPlayerSpriteCrop(runtimeMap, image);
  const scale = metrics.scale * getPlayerSpriteResolutionScale(crop);
  const spriteW = crop.w * scale;
  const spriteH = crop.h * scale;
  const render = {
    crop,
    spriteW,
    spriteH,
    offsetX: metrics.width / 2 - (crop.metaW * scale) / 2 + crop.x * scale,
    offsetY: metrics.height - crop.metaH * scale + crop.y * scale
  };
  if (cache) {
    cache.set(key, render);
    if (cache.size > 48) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
  }
  return render;
}

function getPlayerHitboxPolygonPoints(state, metrics, runtimeMap) {
  const points = Array.isArray(runtimeMap?.playerHitboxPolygon?.points)
    ? runtimeMap.playerHitboxPolygon.points
    : null;
  if (!points || points.length < 3) return null;
  return points.map((point) => ({
    x: (Number(state.x) || 0) + (Number(point.x) || 0) * metrics.width,
    y: (Number(state.y) || 0) + (Number(point.y) || 0) * metrics.height
  }));
}

function getPlayerLabelCanvas(text, fontSize, color, active) {
  const cache = session?.runtime?.playerLabelCache;
  const safeText = String(text || '');
  const safeFontSize = Math.round(Math.max(12, Number(fontSize) || 12));
  const safeColor = String(color || '#2563eb');
  const key = `${safeText}|${safeFontSize}|${safeColor}|${active ? 1 : 0}`;
  if (cache?.has(key)) return cache.get(key);
  const canvas = document.createElement('canvas');
  const ctx = getCanvasContext2d(canvas, CHUNK_CANVAS_CONTEXT_OPTIONS);
  if (!ctx) return null;
  ctx.font = `900 ${safeFontSize}px sans-serif`;
  const metrics = ctx.measureText(safeText);
  const paddingX = active ? Math.max(6, safeFontSize * 0.32) : 4;
  const paddingY = Math.max(3, safeFontSize * 0.22);
  const lineWidth = active ? Math.max(2, safeFontSize * 0.16) : 0;
  canvas.width = Math.ceil(metrics.width + paddingX * 2 + lineWidth * 2);
  canvas.height = Math.ceil(safeFontSize + paddingY * 2 + lineWidth * 2);
  const drawCtx = getCanvasContext2d(canvas, CHUNK_CANVAS_CONTEXT_OPTIONS);
  if (!drawCtx) return null;
  drawCtx.font = `900 ${safeFontSize}px sans-serif`;
  drawCtx.textAlign = 'center';
  drawCtx.textBaseline = 'bottom';
  const x = canvas.width / 2;
  const y = canvas.height - paddingY;
  if (active) {
    drawCtx.lineWidth = lineWidth;
    drawCtx.strokeStyle = 'rgba(255, 255, 255, 0.88)';
    drawCtx.strokeText(safeText, x, y);
  }
  drawCtx.fillStyle = safeColor;
  drawCtx.fillText(safeText, x, y);
  const label = { canvas, width: canvas.width, height: canvas.height };
  if (cache) {
    cache.set(key, label);
    if (cache.size > 40) {
      const firstKey = cache.keys().next().value;
      cache.delete(firstKey);
    }
  }
  return label;
}

function drawPlayers(ctx, camera, projector, viewPlayer = getActivePlayer()) {
  const metrics = session.runtime.metrics;
  const hitboxOffset = session.runtime.hitboxOffset || { x: 0, y: 0 };
  const drawOrder = session.players.filter((player) => player !== viewPlayer);
  if (viewPlayer && session.players.includes(viewPlayer)) drawOrder.push(viewPlayer);
  for (const player of drawOrder) {
    const state = player.state;
    const imageSrc = getPlayerImage(player);
    const image = getLoadedImage(imageSrc);
    const sprite = getPlayerSpriteRender(session.runtime.map, image);
    const visualLeft = (Number(state.x) || 0) + sprite.offsetX - hitboxOffset.x;
    const visualTop = (Number(state.y) || 0) + sprite.offsetY - hitboxOffset.y;
    const playerRect = { x: state.x, y: state.y, width: metrics.width, height: metrics.height };
    const visualRect = { x: visualLeft, y: visualTop, width: sprite.spriteW, height: sprite.spriteH };
    const cullRect = {
      x: Math.min(playerRect.x, visualRect.x),
      y: Math.min(playerRect.y, visualRect.y),
      width: Math.max(playerRect.x + playerRect.width, visualRect.x + visualRect.width) - Math.min(playerRect.x, visualRect.x),
      height: Math.max(playerRect.y + playerRect.height, visualRect.y + visualRect.height) - Math.min(playerRect.y, visualRect.y)
    };
    if (!rectsIntersect(cullRect, camera, 180)) continue;

    const active = player === viewPlayer;
    const renderW = sprite.spriteW * projector.scale;
    const renderH = sprite.spriteH * projector.scale;
    const x = projector.x(visualLeft);
    const y = projector.y(visualTop);
    const cx = x + renderW / 2;

    ctx.save();
    ctx.globalAlpha = active ? 1 : OTHER_PLAYER_SPRITE_ALPHA;
    ctx.translate(cx, y + renderH / 2);
    ctx.scale(state.facing === -1 ? -1 : 1, 1);
    if (image) {
      ctx.drawImage(
        image,
        sprite.crop.x,
        sprite.crop.y,
        sprite.crop.w,
        sprite.crop.h,
        -renderW / 2,
        -renderH / 2,
        renderW,
        renderH
      );
    } else {
      ctx.fillStyle = active ? (player.labelColor || '#2563eb') : '#6b7280';
      ctx.fillRect(-renderW / 2, -renderH / 2, renderW, renderH);
    }
    ctx.restore();

    const text = player.name;
    const labelY = Math.max(18, y - 5);
    const labelFontSize = Math.max(12, 12 * projector.scale + 9);
    const label = getPlayerLabelCanvas(
      text,
      labelFontSize,
      active ? (player.labelColor || '#2563eb') : 'rgba(20, 32, 47, 0.72)',
      active
    );
    if (label) {
      ctx.save();
      ctx.globalAlpha = active ? 1 : OTHER_PLAYER_LABEL_ALPHA;
      ctx.drawImage(label.canvas, cx - label.width / 2, labelY - 3 - label.height);
      ctx.restore();
    }

    if (session.runtime.debugHitboxes) {
      ctx.save();
      ctx.strokeStyle = active ? 'rgba(37, 99, 235, 0.96)' : 'rgba(20, 32, 47, 0.6)';
      ctx.lineWidth = 2;
      const polygon = getPlayerHitboxPolygonPoints(state, metrics, session.runtime);
      if (polygon) {
        ctx.beginPath();
        polygon.forEach((point, index) => {
          const px = projector.x(point.x);
          const py = projector.y(point.y);
          if (index === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        });
        ctx.closePath();
        ctx.stroke();
      } else {
        ctx.strokeRect(
          projector.x(state.x),
          projector.y(state.y),
          metrics.width * projector.scale,
          metrics.height * projector.scale
        );
      }
      ctx.restore();
    }
  }
}

function getPlayerRenderSignature(player, now = performance.now()) {
  const state = player?.state || {};
  const dustCount = Array.isArray(player?.dustParticles) ? player.dustParticles.length : 0;
  return [
    Math.round((Number(state.x) || 0) * 10),
    Math.round((Number(state.y) || 0) * 10),
    Math.round((Number(state.vx) || 0) * 10),
    Math.round((Number(state.vy) || 0) * 10),
    state.facing || 1,
    state.onGround ? 1 : 0,
    state.jumping ? 1 : 0,
    state._spriteSrc || '',
    Math.floor((Number(state.walkTimer) || 0) / WALK_FRAME_INTERVAL_SEC),
    Number(player?.damagedUntil) > now ? 1 : 0,
    dustCount,
    dustCount ? Math.floor(now / 33) : 0
  ].join(':');
}

function getPlayerRenderSignatures(now = performance.now()) {
  if (!session?.players?.length) return [];
  return session.players.map((player) => getPlayerRenderSignature(player, now));
}

function getSceneRenderSignature(now = performance.now(), playerSignatures = null) {
  if (!session?.runtime) return '';
  const runtime = session.runtime;
  const canvasSignature = runtime.canvases
    .map((canvas) => `${canvas?.width || 0}x${canvas?.height || 0}`)
    .join(',');
  const signatures = Array.isArray(playerSignatures) ? playerSignatures : getPlayerRenderSignatures(now);
  return [
    Number(runtime.renderScale || RENDER_SCALE_MAX).toFixed(2),
    canvasSignature,
    session.activePlayerIndex,
    signatures.join('|')
  ].join('||');
}

function isPlayerVisibleInCamera(player, camera, pad = 240) {
  const state = player?.state;
  if (!state || !camera) return false;
  const metrics = session?.runtime?.metrics || { width: 44, height: 64 };
  return rectsIntersect({
    x: (Number(state.x) || 0) - pad,
    y: (Number(state.y) || 0) - pad,
    width: (Number(metrics.width) || 44) + pad * 2,
    height: (Number(metrics.height) || 64) + pad * 2
  }, camera);
}

function getViewportRenderSignature(index, size, camera, viewPlayer, now = performance.now(), playerSignatures = null) {
  if (!session?.runtime || !size || !camera || !viewPlayer) return '';
  const runtime = session.runtime;
  const visiblePlayerSignature = session.players
    .map((player, playerIndex) => {
      if (player !== viewPlayer && !isPlayerVisibleInCamera(player, camera)) return '';
      const signature = Array.isArray(playerSignatures)
        ? playerSignatures[playerIndex]
        : getPlayerRenderSignature(player, now);
      return `${playerIndex}:${signature}`;
    })
    .filter(Boolean)
    .join('|');
  return [
    index,
    Number(runtime.renderScale || RENDER_SCALE_MAX).toFixed(2),
    `${size.width}x${size.height}`,
    Math.round(camera.x),
    Math.round(camera.y),
    Math.round(camera.width),
    Math.round(camera.height),
    runtime.debugHitboxes ? 1 : 0,
    visiblePlayerSignature
  ].join('||');
}

function drawScene({ force = false } = {}) {
  if (!session?.runtime.contexts?.length) return;
  const runtime = session.runtime;
  const now = performance.now();
  const playerSignatures = getPlayerRenderSignatures(now);
  if (!force && !runtime.canvasSizeDirty) {
    const nextSignature = getSceneRenderSignature(now, playerSignatures);
    if (nextSignature && nextSignature === runtime.lastSceneRenderSignature) return false;
    runtime.lastSceneRenderSignature = nextSignature;
  }
  if (force || runtime.canvasSizeDirty) resetPlayerViewportScroll();
  let drewAnyViewport = false;
  const viewports = session.runtime.canvases.map((canvas, index) => {
    const ctx = runtime.contexts[index];
    const viewPlayer = session.players[index] || getActivePlayer();
    if (!canvas || !ctx || !viewPlayer) return null;
    const size = ensureCanvasSize(canvas);
    const camera = computeCamera(size, viewPlayer);
    if (index === session.activePlayerIndex) {
      runtime.canvas = canvas;
      runtime.ctx = ctx;
      runtime.camera = camera;
    }
    const projector = buildProjector(size, camera);
    const viewportSignature = getViewportRenderSignature(index, size, camera, viewPlayer, now, playerSignatures);
    const staticKey = getStaticSceneKey(size, camera);
    return { canvas, ctx, viewPlayer, size, camera, projector, viewportSignature, staticKey, index };
  }).filter(Boolean);
  const staticKeyCounts = new Map();
  viewports.forEach((viewport) => {
    staticKeyCounts.set(viewport.staticKey, (staticKeyCounts.get(viewport.staticKey) || 0) + 1);
  });
  let sharedStaticKey = '';
  for (const [key, count] of staticKeyCounts) {
    if (count > 1) {
      sharedStaticKey = key;
      break;
    }
  }
  let sharedStaticLayerDrawn = false;

  viewports.forEach((viewport) => {
    const {
      ctx,
      viewPlayer,
      size,
      camera,
      projector,
      viewportSignature,
      staticKey,
      index
    } = viewport;
    if (!force && !runtime.canvasSizeDirty && viewportSignature === runtime.lastViewportRenderSignatures[index]) {
      return;
    }

    ctx.clearRect(0, 0, size.width, size.height);
    if (sharedStaticKey && staticKey === sharedStaticKey) {
      const layer = ensureSharedStaticLayer(runtime, size);
      if (layer) {
        if (!sharedStaticLayerDrawn) {
          if (force || runtime.canvasSizeDirty || layer.key !== staticKey) {
            layer.ctx.clearRect(0, 0, size.width, size.height);
            drawStaticScene(layer.ctx, size, camera, projector);
            layer.key = staticKey;
          }
          sharedStaticLayerDrawn = true;
        }
        ctx.drawImage(layer.canvas, 0, 0);
      } else {
        drawStaticScene(ctx, size, camera, projector);
      }
    } else {
      drawStaticScene(ctx, size, camera, projector);
    }
    drawLandingDust(ctx, camera, projector, viewPlayer);
    drawPlayers(ctx, camera, projector, viewPlayer);
    runtime.lastViewportRenderSignatures[index] = viewportSignature;
    drewAnyViewport = true;
  });
  runtime.canvasSizeDirty = false;
  runtime.lastSceneRenderSignature = getSceneRenderSignature(now, playerSignatures);
  return drewAnyViewport;
}

function updateRuntimeUi(timestamp = performance.now(), { force = false } = {}) {
  if (!session?.runtime) return;
  const runtime = session.runtime;
  const now = Number.isFinite(Number(timestamp)) ? Number(timestamp) : performance.now();
  if (force || now - (Number(runtime.lastUiUpdateAt) || 0) >= PLAY_UI_UPDATE_INTERVAL_MS) {
    runtime.lastUiUpdateAt = now;
    updateGaugeUi();
    renderSidePanelIfChanged();
    enqueueAheadMapObjectChunks(runtime);
    syncTestDataset();
  }
  if (force || now - (Number(runtime.lastQuizActionUpdateAt) || 0) >= QUIZ_ACTION_UPDATE_INTERVAL_MS) {
    runtime.lastQuizActionUpdateAt = now;
    updateQuizActionState();
  }
}

function updatePlayerProgress(player) {
  const spawnY = Number(player.spawn.y) || 0;
  const currentY = Number(player.state.y) || 0;
  const climb = Math.max(0, spawnY - currentY);
  player.maxClimb = Math.max(player.maxClimb, climb);
  const previousBestHeight = Math.max(0, Number(player.bestHeight) || 0);
  if (climb > previousBestHeight) {
    player.bestHeight = climb;
    if (Math.floor(climb / 100) > Math.floor(previousBestHeight / 100)) {
      player.bestHeightNoticeUntil = performance.now() + BEST_HEIGHT_NOTICE_MS;
    }
  }
  if (player.state.onGround) {
    player.lastSafe = { x: player.state.x, y: player.state.y };
  }
  const summitCount = Math.floor(player.bestHeight / 3200);
  if (summitCount > player.summits) {
    player.summits = summitCount;
    player.score += 300;
  }
}

function respawnPlayer(player) {
  player.respawns += 1;
  player.damagedUntil = performance.now() + 850;
  player.state.x = player.lastSafe?.x ?? player.spawn.x;
  player.state.y = Math.min(player.spawn.y, (player.lastSafe?.y ?? player.spawn.y) - 8);
  player.state.vx = 0;
  player.state.vy = 0;
  player.state.onGround = false;
  clearPlayerJumpInput(player);
  session.feedback = `${player.name} 재도전`;
  session.feedbackKind = 'wrong';
  renderSidePanel();
}

function stepPlayerPhysics(player, dt) {
  if (!player) return;
  const state = player.state;
  const wasOnGround = !!state.onGround;
  const prevX = Number(state.x) || 0;
  const prevVy = Number(state.vy) || 0;
  const prevJumpsUsed = Number(state.jumpsUsed) || 0;
  const gaugeBeforeStep = Math.max(0, Number(player.gauge) || 0);
  state.input.left = !!player.control?.left && !player.control?.right;
  state.input.right = !!player.control?.right && !player.control?.left;
  const hadMoveInput = !!state.input.left || !!state.input.right;
  const jumpBufferUntil = Number(state.input.jumpBufferUntil) || 0;
  if (state.input.jumpQueued && jumpBufferUntil > 0 && performance.now() > jumpBufferUntil) {
    state.input.jumpQueued = false;
    state.input.jumpBufferUntil = 0;
  }

  if (gaugeBeforeStep <= GAUGE_EPSILON) {
    if (wasOnGround) {
      state.input.left = false;
      state.input.right = false;
      if (player.control) {
        player.control.left = false;
        player.control.right = false;
      }
      clearPlayerJumpInput(player);
    } else if (!canUseGaugeEmptyAirDoubleJump(player)) {
      clearPlayerJumpInput(player);
    }
    if (!player.gaugeEmptyNotified || wasOnGround) notifyGaugeEmpty(player);
  }

  const physicsArgs = player._physicsStepArgs || {
    playerState: state,
    dt,
    moveSpeed: session.runtime.moveSpeed,
    physics: session.runtime.physics,
    metrics: session.runtime.metrics,
    playerHitboxPolygon: session.runtime.playerHitboxPolygon,
    map: session.runtime.mapRect,
    objects: session.runtime.physicsObjects,
    obstacles: session.runtime.obstacles,
    worldPointToLocal: session.runtime.worldPointToLocal,
    localPointToWorld: session.runtime.localPointToWorld
  };
  physicsArgs.playerState = state;
  physicsArgs.dt = dt;
  player._physicsStepArgs = physicsArgs;
  JumpmapRuntimePhysics.stepPlayerState(physicsArgs);

  updatePlayerProgress(player);
  if (state.y > session.runtime.mapRect.height - session.runtime.metrics.height + FALL_RESPAWN_PAD) {
    respawnPlayer(player);
  }
  if (!wasOnGround && state.onGround) {
    spawnLandingDust(player, prevVy);
  }
  if (isPlayerGaugeEmpty(player) && !wasOnGround && state.onGround) {
    notifyGaugeEmpty(player);
  }
  updatePlayerSpriteState(player, dt, getCachedSpriteGroundContact(player, dt));

  const movedOnGround = (
    hadMoveInput &&
    Math.abs((Number(state.x) || 0) - prevX) > 0.001 &&
    (state.onGround || wasOnGround)
  );
  if (movedOnGround) {
    consumePlayerGauge(player, QUIZ_MOVE_COST_PER_SEC * dt);
  }

  const nextJumpsUsed = Number(state.jumpsUsed) || 0;
  if (nextJumpsUsed > prevJumpsUsed) {
    consumePlayerGauge(player, prevJumpsUsed === 0 ? QUIZ_JUMP_COST : QUIZ_DOUBLE_JUMP_COST);
  }
}

function canSkipIdlePlayerPhysics(player, index) {
  const state = player?.state;
  if (!state) return false;
  if (index === session?.activePlayerIndex) return false;
  if (!state.onGround || state.jumping) return false;
  if (player?.quiz?.pending) return false;
  if (isPlayerGaugeEmpty(player) && !player.gaugeEmptyNotified) return false;
  if (player.control?.left || player.control?.right) return false;
  if (state.input?.left || state.input?.right || state.input?.jumpQueued || state.input?.jumpHeld) return false;
  if ((Number(state.input?.jumpBufferUntil) || 0) > performance.now()) return false;
  if (Math.abs(Number(state.vx) || 0) > IDLE_PHYSICS_SPEED_EPS) return false;
  if (Math.abs(Number(state.vy) || 0) > IDLE_PHYSICS_SPEED_EPS) return false;
  return true;
}

function stepPhysics(dt) {
  if (!session) return;
  session.players.forEach((player, index) => {
    updatePlayerDust(player, dt);
    if (isPlayerQuizLocked(index)) return;
    if (canSkipIdlePlayerPhysics(player, index)) {
      updatePlayerSpriteState(player, dt, true);
      return;
    }
    stepPlayerPhysics(player, dt);
  });
}

function gameLoop(timestamp) {
  if (!session || session.endedAt) return;
  const runtime = session.runtime;
  const frameTs = Number.isFinite(Number(timestamp)) ? Number(timestamp) : performance.now();
  const previousTs = runtime.lastTs;
  const elapsed = typeof previousTs === 'number' && Number.isFinite(previousTs)
    ? clamp((frameTs - previousTs) / 1000, 0, MAX_FRAME_DELTA_SEC)
    : 0;
  runtime.lastTs = frameTs;
  runtime.fixedAccumulator = Math.min(
    MAX_FRAME_DELTA_SEC,
    Math.max(0, Number(runtime.fixedAccumulator) || 0) + elapsed
  );
  let stepCount = 0;
  while (
    runtime.fixedAccumulator >= PHYSICS_FIXED_STEP_SEC &&
    stepCount < MAX_PHYSICS_STEPS_PER_FRAME &&
    session &&
    !session.endedAt
  ) {
    stepPhysics(PHYSICS_FIXED_STEP_SEC);
    runtime.fixedAccumulator -= PHYSICS_FIXED_STEP_SEC;
    stepCount += 1;
  }
  if (stepCount >= MAX_PHYSICS_STEPS_PER_FRAME) {
    runtime.fixedAccumulator = Math.min(runtime.fixedAccumulator, PHYSICS_FIXED_STEP_SEC - 0.000001);
  }
  const drawStartedAt = performance.now();
  const sceneDrawn = drawScene();
  recordRenderPerformance(sceneDrawn ? performance.now() - drawStartedAt : 0, frameTs);
  updateRuntimeUi(frameTs);
  runtime.rafId = window.requestAnimationFrame(gameLoop);
}

function startGameLoop() {
  if (!session) return;
  session.runtime.lastTs = null;
  session.runtime.fixedAccumulator = 0;
  drawScene({ force: true });
  updateRuntimeUi(performance.now(), { force: true });
  session.runtime.rafId = window.requestAnimationFrame(gameLoop);
}

function stopGameLoop() {
  if (session?.runtime.rafId) {
    window.cancelAnimationFrame(session.runtime.rafId);
    session.runtime.rafId = 0;
  }
}

function openQuiz(playerIndex = session?.activePlayerIndex || 0) {
  if (!session) return;
  if (Date.now() >= session.deadlineAt) {
    finishSession();
    return;
  }
  const safeIndex = clamp(Math.round(Number(playerIndex) || 0), 0, session.players.length - 1);
  const quiz = getPlayerQuizState(safeIndex);
  if (!quiz || quiz.open) return;
  clearQuizAutoTimer(safeIndex);
  quiz.open = true;
  quiz.pending = false;
  session.pendingQuizPlayerIndexes = session.pendingQuizPlayerIndexes.filter((index) => index !== safeIndex);
  quiz.batchSize = QUIZ_BATCH_SIZE;
  quiz.batchIndex = 0;
  quiz.answerLocked = false;
  quiz.answered = false;
  quiz.selectedChoice = '';
  quiz.correct = false;
  quiz.reward = 0;
  quiz.nextAllowedAt = 0;
  quiz.feedback = '';
  quiz.feedbackKind = '';
  nextQuestion(safeIndex);
  const quizPlayer = getPlayerByIndex(safeIndex);
  if (quizPlayer) {
    clearTouchPointersForPlayer(safeIndex);
    clearKeyboardPointersForPlayer(safeIndex);
    if (quizPlayer.control) {
      quizPlayer.control.left = false;
      quizPlayer.control.right = false;
    }
    quizPlayer.state.input.left = false;
    quizPlayer.state.input.right = false;
    clearPlayerJumpInput(quizPlayer);
    if (session.keyboardPlayerIndex === safeIndex) {
      session.input.left = false;
      session.input.right = false;
      session.keyboardPlayerIndex = -1;
    }
  }
  session.feedback = '';
  session.feedbackKind = '';
  renderQuizPanel(safeIndex);
  renderSidePanel();
  updateGaugeUi();
  syncSessionQuizCompatibility(safeIndex);
}

function applyAnswerToGame(player, correct, quiz) {
  if (!player) return;
  const reward = refillPlayerGauge(player, correct ? QUIZ_CORRECT_REWARD : QUIZ_WRONG_REWARD);
  if (quiz) quiz.reward = reward;
  if (correct) {
    player.correct += 1;
    player.score += 120 + Math.floor(player.bestHeight / 80);
    if (quiz) {
      quiz.feedback = '정답입니다';
      quiz.feedbackKind = 'correct';
    }
    session.feedback = '정답입니다';
    session.feedbackKind = 'correct';
    return;
  }
  player.wrong += 1;
  player.score = Math.max(0, player.score - 30);
  player.damagedUntil = performance.now() + 900;
  if (quiz) {
    quiz.feedback = '오답입니다';
    quiz.feedbackKind = 'wrong';
  }
  session.feedback = '오답입니다';
  session.feedbackKind = 'wrong';
}

function closeQuiz({ playerIndex = session?.quizPlayerIndex, rotate = false, reason = '' } = {}) {
  if (!session) return;
  const safeIndex = clamp(Math.round(Number(playerIndex) || 0), 0, session.players.length - 1);
  const quiz = getPlayerQuizState(safeIndex);
  if (!quiz) return;
  clearQuizAutoTimer(safeIndex);
  const quizPlayer = getPlayerByIndex(safeIndex);
  const completedQuizPlayerIndex = safeIndex;
  quiz.open = false;
  quiz.currentQuestion = null;
  quiz.answerLocked = false;
  quiz.answered = false;
  quiz.selectedChoice = '';
  quiz.correct = false;
  quiz.reward = 0;
  quiz.nextAllowedAt = 0;
  quiz.inputReadyAtMs = 0;
  quiz.batchIndex = 0;
  if (quizPlayer) {
    if (quizPlayer.control) {
      quizPlayer.control.left = false;
      quizPlayer.control.right = false;
    }
    quizPlayer.state.input.left = false;
    quizPlayer.state.input.right = false;
    clearPlayerJumpInput(quizPlayer);
  }
  if (session.keyboardPlayerIndex === safeIndex) {
    session.input.left = false;
    session.input.right = false;
    session.keyboardPlayerIndex = -1;
  }
  clearKeyboardPointersForPlayer(safeIndex);
  if (rotate && session.players.length > 1) {
    rotatePlayer();
  } else if (reason === 'return_to_map' && quizPlayer?.gauge <= GAUGE_EPSILON) {
    session.feedback = '체력이 비었습니다. 퀴즈가 열립니다.';
    session.feedbackKind = 'wrong';
  }
  if (
    reason === 'batch_complete'
    && quizPlayer?.gauge <= GAUGE_EPSILON
    && completedQuizPlayerIndex >= 0
  ) {
    queuePendingQuizForPlayer(completedQuizPlayerIndex);
  }
  renderStageHead();
  renderQuizPanel(safeIndex);
  renderSidePanel();
  updateGaugeUi();
  openNextPendingQuiz();
  syncSessionQuizCompatibility();
}

function submitAnswer(choice, playerIndex = session?.quizPlayerIndex) {
  if (!session) return;
  const safeIndex = clamp(Math.round(Number(playerIndex) || 0), 0, session.players.length - 1);
  const quiz = getPlayerQuizState(safeIndex);
  if (!quiz?.open || quiz.answerLocked || !quiz.currentQuestion) return;
  const nowMs = Date.now();
  if (nowMs < (Number(quiz.inputReadyAtMs) || 0)) return;
  if (nowMs >= session.deadlineAt) {
    finishSession();
    return;
  }

  quiz.answerLocked = true;
  const activePlayer = getPlayerByIndex(safeIndex);
  const correct = choice === String(quiz.currentQuestion.answer);
  recordGugudanAnswer(quiz.currentQuestion, choice, correct, quiz);
  applyAnswerToGame(activePlayer, correct, quiz);
  quiz.answered = true;
  quiz.selectedChoice = choice;
  quiz.correct = correct;
  quiz.nextAllowedAt = nowMs + (correct ? QUIZ_AUTO_ADVANCE_MS : QUIZ_WRONG_DELAY_MS);

  const layer = getQuizLayer(safeIndex);
  $$('.choice-button', layer || document).forEach((button) => {
    button.disabled = true;
    if (button.dataset.choice === String(quiz.currentQuestion.answer)) {
      button.classList.add('is-correct');
    } else if (button.dataset.choice === choice) {
      button.classList.add('is-wrong');
    }
  });
  const feedback = $('.feedback-line', layer || document);
  if (feedback) {
    feedback.textContent = getQuizFeedbackText(safeIndex);
    feedback.className = `feedback-line ${quiz.feedbackKind}`;
  }
  scheduleQuizAutoAdvance(safeIndex);
  updateGaugeUi();
  renderSidePanel();
  syncSessionQuizCompatibility(safeIndex);
}

function getTouchPointerKey(event) {
  if (event?.pointerId != null) return `pointer:${event.pointerId}`;
  return 'pointer:mouse';
}

function getKeyboardPointerKey(event) {
  const key = event?.code || event?.key || '';
  return key ? `keyboard:${key}` : '';
}

function setTouchButtonActive(button, active) {
  if (!button || !session?.runtime?.touchButtonCounts) return;
  const counts = session.runtime.touchButtonCounts;
  const current = Math.max(0, Number(counts.get(button)) || 0);
  const next = active ? current + 1 : Math.max(0, current - 1);
  counts.set(button, next);
  button.classList.toggle('is-active', next > 0);
}

function applyTouchControl(playerIndex, action, active) {
  const player = getPlayerByIndex(playerIndex);
  if (!session || !player) return false;
  if (active && isPlayerQuizLocked(playerIndex)) return false;
  if (action === 'left') {
    player.control.left = !!active;
    return true;
  }
  if (action === 'right') {
    player.control.right = !!active;
    return true;
  }
  if (action === 'jump') {
    if (active) queuePlayerJump(player);
    else player.state.input.jumpHeld = false;
    return true;
  }
  return false;
}

function getTouchActionKey(playerIndex, action) {
  return `${clamp(Math.round(Number(playerIndex) || 0), 0, Math.max(0, (session?.players?.length || 1) - 1))}:${String(action || '')}`;
}

function setTouchActionActive(playerIndex, action, active) {
  if (!session?.runtime?.touchActionCounts) return applyTouchControl(playerIndex, action, active);
  const key = getTouchActionKey(playerIndex, action);
  const counts = session.runtime.touchActionCounts;
  const current = Math.max(0, Number(counts.get(key)) || 0);
  if (active) {
    if (current === 0 && !applyTouchControl(playerIndex, action, true)) return false;
    counts.set(key, current + 1);
    return true;
  }
  if (current <= 0) return false;
  const next = current - 1;
  if (next > 0) {
    counts.set(key, next);
    return true;
  }
  counts.delete(key);
  applyTouchControl(playerIndex, action, false);
  return true;
}

function releaseTouchPointer(pointerKey, event = null) {
  if (!session?.runtime?.touchPointers || !pointerKey) return;
  const pointer = session.runtime.touchPointers.get(pointerKey);
  if (!pointer) return;
  session.runtime.touchPointers.delete(pointerKey);
  setTouchActionActive(pointer.playerIndex, pointer.action, false);
  setTouchButtonActive(pointer.button, false);
  if (event?.pointerId != null) {
    try {
      pointer.button?.releasePointerCapture?.(event.pointerId);
    } catch (_error) {
      // Pointer capture release is optional.
    }
  }
}

function clearTouchPointersForPlayer(playerIndex) {
  if (!session?.runtime?.touchPointers) return;
  const keys = [];
  session.runtime.touchPointers.forEach((pointer, key) => {
    if (pointer.playerIndex === playerIndex) keys.push(key);
  });
  keys.forEach((key) => releaseTouchPointer(key));
}

function clearAllTouchPointers() {
  if (!session?.runtime?.touchPointers) return;
  [...session.runtime.touchPointers.keys()].forEach((key) => releaseTouchPointer(key));
}

function applyKeyboardControl(playerIndex, action, active, { queueJump = true } = {}) {
  const player = getPlayerByIndex(playerIndex);
  if (!session || !player) return false;
  if (active && isPlayerQuizLocked(playerIndex)) return false;
  if (action === 'left') {
    player.control.left = !!active;
    return true;
  }
  if (action === 'right') {
    player.control.right = !!active;
    return true;
  }
  if (action === 'jump') {
    if (active) {
      if (queueJump) queuePlayerJump(player);
      else player.state.input.jumpHeld = true;
    } else {
      player.state.input.jumpHeld = false;
    }
    return true;
  }
  return false;
}

function setKeyboardActionActive(playerIndex, action, active, options = {}) {
  if (!session?.runtime?.keyboardActionCounts) return applyKeyboardControl(playerIndex, action, active, options);
  const key = getTouchActionKey(playerIndex, action);
  const counts = session.runtime.keyboardActionCounts;
  const current = Math.max(0, Number(counts.get(key)) || 0);
  if (active) {
    if (current === 0 && !applyKeyboardControl(playerIndex, action, true, options)) return false;
    counts.set(key, current + 1);
    return true;
  }
  if (current <= 0) return false;
  const next = current - 1;
  if (next > 0) {
    counts.set(key, next);
    return true;
  }
  counts.delete(key);
  applyKeyboardControl(playerIndex, action, false, options);
  return true;
}

function releaseKeyboardPointer(pointerKey) {
  if (!session?.runtime?.keyboardPointers || !pointerKey) return;
  const pointer = session.runtime.keyboardPointers.get(pointerKey);
  if (!pointer) return;
  session.runtime.keyboardPointers.delete(pointerKey);
  setKeyboardActionActive(pointer.playerIndex, pointer.action, false);
}

function clearKeyboardPointersForPlayer(playerIndex) {
  if (!session?.runtime?.keyboardPointers) return;
  const keys = [];
  session.runtime.keyboardPointers.forEach((pointer, key) => {
    if (pointer.playerIndex === playerIndex) keys.push(key);
  });
  keys.forEach((key) => releaseKeyboardPointer(key));
}

function clearAllKeyboardPointers() {
  if (!session?.runtime?.keyboardPointers) return;
  [...session.runtime.keyboardPointers.keys()].forEach((key) => releaseKeyboardPointer(key));
}

function resetPlayerViewportScroll(playerIndex = null) {
  if (!elements?.gameStage) return;
  const selector = playerIndex == null
    ? '[data-player-viewport]'
    : `[data-player-viewport="${Number(playerIndex) || 0}"]`;
  $$(selector, elements.gameStage).forEach((viewport) => {
    if (viewport.scrollLeft) viewport.scrollLeft = 0;
    if (viewport.scrollTop) viewport.scrollTop = 0;
  });
}

function queuePlayerViewportScrollReset(playerIndex = null) {
  resetPlayerViewportScroll(playerIndex);
  window.requestAnimationFrame(() => resetPlayerViewportScroll(playerIndex));
}

function bindTouchControls() {
  const pointerOptions = { passive: false };
  const touchOptions = { passive: false };
  const cleanup = $$('[data-touch]', elements.gameStage).map((button) => {
    const playerIndex = Number(button.dataset.touchPlayer) || 0;
    const action = button.dataset.touch || '';
    const keepViewportFixed = () => queuePlayerViewportScrollReset(playerIndex);
    const prevent = (event) => {
      event.preventDefault();
      event.stopPropagation();
    };
    const down = (event) => {
      prevent(event);
      keepViewportFixed();
      const pointerKey = getTouchPointerKey(event);
      releaseTouchPointer(pointerKey, event);
      if (!setTouchActionActive(playerIndex, action, true)) return;
      session.runtime.touchPointers.set(pointerKey, { playerIndex, action, button });
      setTouchButtonActive(button, true);
      try {
        button.setPointerCapture?.(event.pointerId);
      } catch (_error) {
        // Pointer capture is optional.
      }
    };
    const up = (event) => {
      prevent(event);
      releaseTouchPointer(getTouchPointerKey(event), event);
      keepViewportFixed();
    };
    const leave = (event) => {
      if (event.pointerType === 'mouse') up(event);
    };
    const lost = (event) => {
      prevent(event);
      releaseTouchPointer(getTouchPointerKey(event), event);
      keepViewportFixed();
    };
    const click = (event) => {
      prevent(event);
      keepViewportFixed();
    };
    button.addEventListener('pointerdown', down, pointerOptions);
    button.addEventListener('pointerup', up, pointerOptions);
    button.addEventListener('pointercancel', up, pointerOptions);
    button.addEventListener('pointerleave', leave, pointerOptions);
    button.addEventListener('lostpointercapture', lost, pointerOptions);
    button.addEventListener('touchstart', prevent, touchOptions);
    button.addEventListener('touchmove', prevent, touchOptions);
    button.addEventListener('touchend', prevent, touchOptions);
    button.addEventListener('touchcancel', prevent, touchOptions);
    button.addEventListener('focus', keepViewportFixed);
    button.addEventListener('click', click);
    button.addEventListener('contextmenu', prevent);
    button.addEventListener('dragstart', prevent);
    return () => {
      button.removeEventListener('pointerdown', down, pointerOptions);
      button.removeEventListener('pointerup', up, pointerOptions);
      button.removeEventListener('pointercancel', up, pointerOptions);
      button.removeEventListener('pointerleave', leave, pointerOptions);
      button.removeEventListener('lostpointercapture', lost, pointerOptions);
      button.removeEventListener('touchstart', prevent, touchOptions);
      button.removeEventListener('touchmove', prevent, touchOptions);
      button.removeEventListener('touchend', prevent, touchOptions);
      button.removeEventListener('touchcancel', prevent, touchOptions);
      button.removeEventListener('focus', keepViewportFixed);
      button.removeEventListener('click', click);
      button.removeEventListener('contextmenu', prevent);
      button.removeEventListener('dragstart', prevent);
      button.classList.remove('is-active');
    };
  });
  const releaseFromWindow = (event) => releaseTouchPointer(getTouchPointerKey(event), event);
  window.addEventListener('pointerup', releaseFromWindow);
  window.addEventListener('pointercancel', releaseFromWindow);
  cleanup.push(() => window.removeEventListener('pointerup', releaseFromWindow));
  cleanup.push(() => window.removeEventListener('pointercancel', releaseFromWindow));
  session.runtime.cleanup.push(...cleanup);
}

function bindRuntimeInput() {
  const onKeyDown = (event) => {
    if (!session || document.body.dataset.screen !== 'play') return;
    if (isKeyboardTextEntryTarget(event)) return;
    const control = getKeyboardControlForEvent(event);
    if (!control) return;
    event.preventDefault();
    const pointerKey = getKeyboardPointerKey(event);
    if (!pointerKey || session.runtime.keyboardPointers.has(pointerKey)) return;
    if (isPlayerQuizLocked(control.playerIndex)) return;
    if (!setKeyboardActionActive(control.playerIndex, control.action, true, { queueJump: !event.repeat })) return;
    session.runtime.keyboardPointers.set(pointerKey, control);
  };
  const onKeyUp = (event) => {
    if (!session) return;
    if (isKeyboardTextEntryTarget(event)) return;
    const control = getKeyboardControlForEvent(event);
    if (!control) return;
    event.preventDefault();
    releaseKeyboardPointer(getKeyboardPointerKey(event));
  };
  const onBlur = () => {
    if (!session) return;
    clearAllTouchPointers();
    clearAllKeyboardPointers();
    session.input.left = false;
    session.input.right = false;
    session.keyboardPlayerIndex = -1;
    session.players.forEach((player) => {
      if (player.control) {
        player.control.left = false;
        player.control.right = false;
      }
      player.state.input.left = false;
      player.state.input.right = false;
      clearPlayerJumpInput(player);
    });
  };
  window.addEventListener('keydown', onKeyDown);
  window.addEventListener('keyup', onKeyUp);
  window.addEventListener('blur', onBlur);
  session.runtime.cleanup.push(() => window.removeEventListener('keydown', onKeyDown));
  session.runtime.cleanup.push(() => window.removeEventListener('keyup', onKeyUp));
  session.runtime.cleanup.push(() => window.removeEventListener('blur', onBlur));
}

function cleanupRuntime() {
  if (!session) return;
  stopBgm();
  clearQuizAutoTimer();
  stopGameLoop();
  cancelMapObjectChunkPrepare(session.runtime);
  clearAllTouchPointers();
  session.runtime.cleanup.forEach((cleanup) => {
    try {
      cleanup();
    } catch (_error) {
      // Ignore cleanup errors when leaving the screen.
    }
  });
  session.runtime.cleanup = [];
}

function updateTimer() {
  if (!session) return;
  const remainingMs = session.deadlineAt - Date.now();
  const clock = formatClock(remainingMs / 1000);
  elements.timerPill.textContent = clock;
  elements.resultTimePill.textContent = clock;
  if (remainingMs <= 0) finishSession();
}

function startTimer() {
  updateTimer();
  session.timerId = window.setInterval(updateTimer, 250);
}

async function preloadRuntimeAssets(mapBundle, charactersInput, options = {}) {
  const objectSources = (Array.isArray(mapBundle.map.objects) ? mapBundle.map.objects : [])
    .map((object) => resolveMapAssetPath(object.sprite, 'plate'));
  const background = normalizeMapBackground(mapBundle.map);
  const characters = Array.isArray(charactersInput) ? charactersInput : [charactersInput];
  const characterSources = characters.flatMap((character) => [
    character?.front,
    character?.right,
    ...(Array.isArray(character?.walk) ? character.walk : []),
    character?.jump,
    character?.damaged,
    character?.fall
  ]);
  await preloadImages([
    background.image,
    ...characterSources,
    ...objectSources
  ], options);
}

async function startSelectedGame() {
  const loadingStartedAt = performance.now();
  let startError = '';
  elements.setupError.textContent = '';
  if (!selectedMinutes) {
    elements.setupError.textContent = '플레이 시간을 선택하세요.';
    return;
  }
  startBgm();
  const weaknessPractice = getActiveWeaknessPractice(selectedPackId);
  const loadingCharactersPreview = getLoadingCharactersFromSelection(selectedPlayers);
  const loadingCharacterPreview = loadingCharactersPreview[0] || getLoadingCharacterFromSelection();
  setStartLoadingState(true, weaknessPractice ? '취약점 연습 문제와 게임 자료를 준비하는 중입니다.' : '게임 자료를 미리 불러오는 중입니다.', {
    progress: 0.14,
    character: loadingCharacterPreview,
    characters: loadingCharactersPreview
  });
  try {
    const [questions, mapBundle] = await Promise.all([
      loadPack(selectedPackId),
      loadMap(selectedMapId)
    ]);
    const runtimeCharacters = getSelectedCharacters(selectedPlayers);
    const loadingCharacter = runtimeCharacters[0] || loadingCharacterPreview;
    setStartLoadingState(true, '이미지를 미리 불러와 플레이 중 끊김을 줄이는 중입니다.', {
      progress: 0.52,
      character: loadingCharacter,
      characters: runtimeCharacters
    });
    await preloadRuntimeAssets(mapBundle, runtimeCharacters, {
      onProgress: (loaded, total) => setStartLoadingState(true, '맵과 캐릭터 이미지를 차례대로 준비하는 중입니다.', {
        progress: 0.52 + 0.2 * (loaded / Math.max(1, total)),
        character: loadingCharacter,
        characters: runtimeCharacters
      })
    });
    await preloadQuizImages(questions, {
      onProgress: (loaded, total) => setStartLoadingState(true, '퀴즈 이미지를 미리 준비하는 중입니다.', {
        progress: 0.72 + 0.12 * (loaded / Math.max(1, total)),
        character: loadingCharacter,
        characters: runtimeCharacters
      })
    });
    setStartLoadingState(true, '곧 시작합니다.', {
      progress: 0.94,
      character: loadingCharacter,
      characters: runtimeCharacters
    });
    await keepMinimumLoadingTime(loadingStartedAt);
    setStartLoadingState(true, '출발합니다.', {
      progress: 1,
      character: loadingCharacter,
      characters: runtimeCharacters
    });
    session = buildSession({ questions, mapBundle, characters: runtimeCharacters });
    await prewarmMapObjectChunks(session.runtime, session.players, {
      onProgress: (loaded, total) => setStartLoadingState(true, '시작 지점 주변 발판을 미리 그리는 중입니다.', {
        progress: 0.94 + 0.04 * (loaded / Math.max(1, total)),
        character: loadingCharacter,
        characters: runtimeCharacters
      })
    });
    showScreen('play');
    renderPlay();
    bindRuntimeInput();
    startGameLoop();
    startTimer();
  } catch (error) {
    startError = error instanceof Error ? error.message : '시작할 수 없습니다.';
    stopBgm();
  } finally {
    setStartLoadingState(false, startError);
    updateSetupSummary();
  }
}

function stopSessionTimer() {
  if (session?.timerId) {
    window.clearInterval(session.timerId);
    session.timerId = null;
  }
}

function summarizeSession() {
  const totalCorrect = session.players.reduce((sum, player) => sum + player.correct, 0);
  const totalWrong = session.players.reduce((sum, player) => sum + player.wrong, 0);
  const totalScore = session.players.reduce((sum, player) => sum + player.score, 0);
  const bestHeight = Math.max(0, ...session.players.map((player) => player.bestHeight));
  const totalRespawns = session.players.reduce((sum, player) => sum + player.respawns, 0);
  const totalSummits = session.players.reduce((sum, player) => sum + player.summits, 0);
  const climbTarget = Math.max(1, ...session.players.map((player) => Number(player.spawn?.y) || 1));
  const playedMs = Math.max(0, (session.endedAt || new Date()).getTime() - session.startedAt.getTime());
  return {
    totalCorrect,
    totalWrong,
    totalScore,
    bestHeight,
    totalRespawns,
    totalSummits,
    climbTarget,
    climbPercent: clamp(Math.round((bestHeight / climbTarget) * 100), 0, 100),
    playedSec: Math.round(playedMs / 1000)
  };
}

function renderResult() {
  if (!session) return;
  const summary = summarizeSession();
  const profile = syncViewportProfile();
  const totalAttempts = summary.totalCorrect + summary.totalWrong;
  const accuracy = totalAttempts > 0 ? Math.round((summary.totalCorrect / totalAttempts) * 100) : 0;
  const isMultiPlayerResult = session.players.length > 1;
  const resultModal = elements.resultScreen?.querySelector('.result-modal');
  resultModal?.classList.toggle('is-single-result', !isMultiPlayerResult);
  resultModal?.classList.toggle('is-split-result', isMultiPlayerResult);
  elements.resultTitle.textContent = isMultiPlayerResult ? '사용자별 점프 결과' : '점프 결과';
  elements.resultSubtitle.textContent = `퀴즈 ${session.packLabel} · ${session.mapLabel} · ${getPlayerCountLabel(session.players.length, profile)} · ${formatClock(summary.playedSec)}`;
  elements.resultTimePill.textContent = '결과';
  elements.resultGrid.innerHTML = `
    <div class="result-summary-heading">전체 요약</div>
    ${[
    ['전체 최고 높이', formatHeightMeters(summary.bestHeight), ''],
    ['플레이 시간', formatClock(summary.playedSec), ''],
    ['전체 정답률', `${accuracy}% (${summary.totalCorrect}/${totalAttempts})`, ''],
    ['사용자 수', getPlayerCountLabel(session.players.length, profile), '']
  ].map(([label, value, tone]) => `
    <div class="result-tile ${tone}">
      <b>${escapeHtml(label)}</b>
      <span>${escapeHtml(value)}</span>
    </div>
  `).join('')}
  `;

  const playerRanks = session.players
    .map((player, index) => ({
      index,
      bestHeight: player.bestHeight,
      attempts: player.correct + player.wrong,
      accuracy: (player.correct + player.wrong) > 0
        ? player.correct / (player.correct + player.wrong)
        : 0
    }))
    .sort((a, b) => b.bestHeight - a.bestHeight || b.accuracy - a.accuracy || b.attempts - a.attempts || a.index - b.index)
    .reduce((map, item, index) => {
      map.set(item.index, index + 1);
      return map;
    }, new Map());

  const faceResultCenterHtml = session.players.length === 2 ? `
    <div class="jumpmap-face-result-center" aria-label="마주보기 점프 결과 요약">
      <div>
        <span>점프 종료</span>
        <b>위인 점프맵</b>
      </div>
      <dl>
        <div><dt>최고 높이</dt><dd>${escapeHtml(formatHeightMeters(summary.bestHeight))}</dd></div>
        <div><dt>플레이</dt><dd>${escapeHtml(formatClock(summary.playedSec))}</dd></div>
        <div><dt>정답률</dt><dd>${escapeHtml(`${accuracy}% (${summary.totalCorrect}/${totalAttempts})`)}</dd></div>
      </dl>
    </div>
  ` : '';
  resultModal?.classList.toggle('is-face-result', Boolean(faceResultCenterHtml));

  elements.playerResults.className = `player-results player-count-${session.players.length}${faceResultCenterHtml ? ' has-face-result-center' : ''}`;
  elements.playerResults.innerHTML = `
    <div class="player-results-heading">사용자별 점프 기록</div>
    ${session.players.map((player, index) => {
    const attempts = player.correct + player.wrong;
    const playerAccuracy = attempts > 0 ? Math.round((player.correct / attempts) * 100) : 0;
    const heightPercent = clamp(Math.round((player.bestHeight / summary.climbTarget) * 100), 0, 100);
    const rank = playerRanks.get(index) || index + 1;
    const heightGrade = getHeightGrade(player.bestHeight);
    const heightTitle = getHeightTitleForPlayer(player, heightGrade);
    return `
    <div class="player-result-card${rank === 1 ? ' is-top-rank' : ''}" data-result-player="${index}" style="--player-color: ${escapeHtml(player.labelColor)}">
      <div class="player-result-content">
        <div class="player-card-head">
          <span>${escapeHtml(player.name)}</span>
          <strong>${escapeHtml(player.character?.label || '캐릭터')}</strong>
          <em>높이 ${rank}위</em>
        </div>
        <div class="player-result-hero">
          <div class="player-title-panel" data-grade-key="${escapeHtml(heightGrade.imageKey)}" aria-label="칭호 ${escapeHtml(heightTitle.title)}">
            <div class="grade-badge-mark" aria-hidden="true">
              <img src="${escapeHtml(getHeightGradeImagePath(heightGrade))}" alt="" loading="eager" decoding="async">
            </div>
            <div>
              <span>칭호</span>
              <strong>${escapeHtml(heightTitle.title)}</strong>
              <em>${escapeHtml(heightTitle.caption)}</em>
            </div>
          </div>
          <div class="player-height-panel">
            <span>최고 높이</span>
            <strong>${escapeHtml(formatHeightMeters(player.bestHeight))}</strong>
            <em>${escapeHtml(heightGrade.rangeLabel)}</em>
          </div>
        </div>
        <div class="player-support-line">
          <span>퀴즈 <b>${escapeHtml(session.packLabel)}</b></span>
          <span>정답률 <b>${escapeHtml(getPlayerAccuracyText(player))}</b></span>
          <span>플레이 <b>${escapeHtml(formatClock(summary.playedSec))}</b></span>
        </div>
        <div class="player-height-meter" aria-hidden="true"><i style="width: ${heightPercent}%"></i></div>
        <div class="player-accuracy-meter" aria-hidden="true"><i style="width: ${playerAccuracy}%"></i></div>
      </div>
    </div>
    ${index === 0 ? faceResultCenterHtml : ''}
    `;
  }).join('')}
  `;
  renderGugudanRecordPanel();
}

function finishSession() {
  if (!session || session.endedAt) return;
  stopSessionTimer();
  cleanupRuntime();
  session.endedAt = new Date();
  elements.timerPill.textContent = '00:00';
  elements.resultTimePill.textContent = '결과';
  renderResult();
  showScreen('result');
}

function abandonSession() {
  stopSessionTimer();
  cleanupRuntime();
  session = null;
  showScreen('setup');
  updateSetupSummary();
}

function getFullscreenElement() {
  return document.fullscreenElement || document.webkitFullscreenElement || null;
}

async function enterFullscreen() {
  const target = document.documentElement;
  const request = target.requestFullscreen || target.webkitRequestFullscreen;
  if (!request) {
    elements.setupError.textContent = '이 브라우저에서는 전체화면을 사용할 수 없습니다.';
    return;
  }
  try {
    await request.call(target);
  } catch (_error) {
    elements.setupError.textContent = '전체화면으로 전환할 수 없습니다.';
  } finally {
    updateFullscreenButtons();
  }
}

async function exitFullscreen() {
  const exit = document.exitFullscreen || document.webkitExitFullscreen;
  if (!getFullscreenElement() || !exit) {
    updateFullscreenButtons();
    return;
  }
  try {
    await exit.call(document);
  } catch (_error) {
    elements.setupError.textContent = '전체화면을 해제할 수 없습니다.';
  } finally {
    updateFullscreenButtons();
  }
}

function updateFullscreenButtons() {
  const fullscreen = !!getFullscreenElement();
  $$('[data-action="enter-fullscreen"]').forEach((button) => {
    button.hidden = fullscreen;
  });
  $$('[data-action="exit-fullscreen"]').forEach((button) => {
    button.hidden = !fullscreen;
  });
}

function goBack() {
  const screen = document.body.dataset.screen || 'setup';
  if (screen === 'play' || screen === 'result') {
    abandonSession();
    return;
  }
  if (window.history.length > 1) {
    window.history.back();
    return;
  }
  elements.setupError.textContent = '이전 화면이 없습니다.';
}

function bindEvents() {
  elements.displayModeToggle?.addEventListener('click', selectNextDisplayMode);
  elements.modePromptModal?.addEventListener('click', (event) => {
    const button = event.target.closest('[data-mode-prompt-choice]');
    if (!button) return;
    chooseModeFromPrompt(button.dataset.modePromptChoice || 'mobile');
  });

  elements.quizPack.addEventListener('change', () => {
    selectedPackId = elements.quizPack.value;
    clearWeaknessPractice('취약점 연습을 해제했습니다. 선택한 퀴즈팩으로 시작합니다.');
    updateSetupSummary();
  });

  elements.mapSelect.addEventListener('change', () => {
    selectedMapId = elements.mapSelect.value;
    updateSetupSummary();
  });

  elements.playerOptions.addEventListener('click', (event) => {
    const button = event.target.closest('[data-players]');
    if (!button || button.disabled) return;
    const profile = syncViewportProfile();
    selectedPlayers = clamp(Number(button.dataset.players) || 1, 1, profile.maxPlayers);
    if (activeWeaknessPractice && selectedPlayers !== 1) {
      clearWeaknessPractice('취약점 연습은 1인 전용입니다. 사용자 수를 바꿔 취약점 연습을 해제했습니다.');
    }
    ensureCharacterSelections(selectedPlayers);
    updateSetupSummary();
  });

  elements.timeOptions.addEventListener('change', () => {
    selectedMinutes = Number(elements.timeOptions.value) || null;
    updateSetupSummary();
  });

  elements.characterOptions.addEventListener('click', (event) => {
    const button = event.target.closest('[data-character-player][data-character]');
    if (!button) return;
    const playerIndex = clamp(Number(button.dataset.characterPlayer) || 0, 0, Math.max(...PLAYER_COUNTS) - 1);
    selectedCharacterIds[playerIndex] = button.dataset.character || CHARACTERS[0].id;
    updateSetupSummary();
  });

  elements.startButton.addEventListener('click', startSelectedGame);
  elements.bgmToggleButton?.addEventListener('click', toggleBgm);
  elements.backSetupButton.addEventListener('click', abandonSession);
  elements.gugudanStatusToggle?.addEventListener('click', () => {
    const expanded = elements.gugudanStatusToggle.getAttribute('aria-expanded') === 'true';
    setGugudanStatusOpen(!expanded);
  });
  elements.practiceStudentSwitchButton?.addEventListener('click', promptPracticeStudentSwitch);
  elements.practiceRecordManagerButton?.addEventListener('click', () => setPracticeRecordManagerOpen(true));
  elements.practiceRecordManagerCloseButton?.addEventListener('click', () => setPracticeRecordManagerOpen(false));
  elements.practiceRecordManagerSwitchButton?.addEventListener('click', () => {
    promptPracticeStudentSwitch();
    renderPracticeRecordManager();
  });
  elements.practiceRecordManagerModal?.addEventListener('click', (event) => {
    if (event.target === elements.practiceRecordManagerModal) {
      setPracticeRecordManagerOpen(false);
      return;
    }
    const button = event.target.closest('[data-practice-record-action]');
    if (!button) return;
    handlePracticeRecordManagerAction(
      button.dataset.practiceRecordAction || '',
      button.dataset.recordType || '',
      button.dataset.studentId || ''
    );
  });
  elements.gugudanStatusButton?.addEventListener('click', () => {
    showLocalGugudanStatus('gugudan');
  });
  elements.gugudanImportRecordsButton?.addEventListener('click', () => {
    if (!elements.gugudanStatusFile) return;
    elements.gugudanStatusFile.value = '';
    elements.gugudanStatusFile.click();
  });
  elements.gugudanStatusFile?.addEventListener('change', () => {
    loadGugudanStatusFile(elements.gugudanStatusFile.files?.[0], 'gugudan');
  });
  elements.divisionGugudanStatusButton?.addEventListener('click', () => {
    showLocalGugudanStatus('division-gugudan');
  });
  elements.divisionGugudanImportRecordsButton?.addEventListener('click', () => {
    if (!elements.divisionGugudanStatusFile) return;
    elements.divisionGugudanStatusFile.value = '';
    elements.divisionGugudanStatusFile.click();
  });
  elements.divisionGugudanStatusFile?.addEventListener('change', () => {
    loadGugudanStatusFile(elements.divisionGugudanStatusFile.files?.[0], 'division-gugudan');
  });
  elements.gugudanReportCloseButton?.addEventListener('click', () => setGugudanReportOpen(false));
  elements.gugudanReportModal?.addEventListener('click', (event) => {
    if (event.target === elements.gugudanReportModal) setGugudanReportOpen(false);
  });
  elements.gugudanMergeRecordsButton?.addEventListener('click', () => {
    if (!elements.gugudanMergeRecordsFile) return;
    elements.gugudanMergeRecordsFile.value = '';
    elements.gugudanMergeRecordsFile.click();
  });
  elements.gugudanMergeRecordsFile?.addEventListener('change', () => {
    mergeSelectedGugudanRecordFiles(elements.gugudanMergeRecordsFile.files, 'gugudan');
  });
  elements.gugudanWeaknessPracticeButton?.addEventListener('click', () => {
    prepareWeaknessPracticeFromLocal('gugudan');
  });
  elements.gugudanWeaknessPracticeFile?.addEventListener('change', () => {
    prepareWeaknessPracticeFromFile(elements.gugudanWeaknessPracticeFile.files?.[0], 'gugudan');
  });
  elements.divisionGugudanMergeRecordsButton?.addEventListener('click', () => {
    if (!elements.divisionGugudanMergeRecordsFile) return;
    elements.divisionGugudanMergeRecordsFile.value = '';
    elements.divisionGugudanMergeRecordsFile.click();
  });
  elements.divisionGugudanMergeRecordsFile?.addEventListener('change', () => {
    mergeSelectedGugudanRecordFiles(elements.divisionGugudanMergeRecordsFile.files, 'division-gugudan');
  });
  elements.divisionGugudanWeaknessPracticeButton?.addEventListener('click', () => {
    prepareWeaknessPracticeFromLocal('division-gugudan');
  });
  elements.divisionGugudanWeaknessPracticeFile?.addEventListener('change', () => {
    prepareWeaknessPracticeFromFile(elements.divisionGugudanWeaknessPracticeFile.files?.[0], 'division-gugudan');
  });
  elements.gugudanStudentId?.addEventListener('input', updateResultRecordStudentUi);
  elements.gugudanDownloadCurrentButton?.addEventListener('click', saveCurrentGugudanLocal);
  elements.gugudanDownloadBackupButton?.addEventListener('click', downloadCurrentGugudanCsv);
  elements.gugudanMergeCsvButton?.addEventListener('click', () => {
    if (!getStudentIdForCsv()) return;
    if (!elements.gugudanRecordFile) return;
    elements.gugudanRecordFile.value = '';
    elements.gugudanRecordFile.click();
  });
  elements.gugudanRecordFile?.addEventListener('change', () => {
    loadPreviousGugudanCsv(elements.gugudanRecordFile.files?.[0]);
  });
  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]');
    if (!button) return;
    const action = button.dataset.action || '';
    if (action === 'settings') {
      abandonSession();
      return;
    }
    if (action === 'go-back') {
      goBack();
      return;
    }
    if (action === 'finish-game') {
      finishSession();
      return;
    }
    if (action === 'open-qr') {
      openQrModal();
      return;
    }
    if (action === 'close-qr') {
      closeQrModal();
      return;
    }
    if (action === 'enter-fullscreen') {
      enterFullscreen();
      return;
    }
    if (action === 'exit-fullscreen') {
      exitFullscreen();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeQrModal();
      if (elements.gugudanReportModal && !elements.gugudanReportModal.classList.contains('is-hidden')) {
        setGugudanReportOpen(false);
      }
      if (elements.practiceRecordManagerModal && !elements.practiceRecordManagerModal.classList.contains('is-hidden')) {
        setPracticeRecordManagerOpen(false);
      }
    }
  });
  document.addEventListener('fullscreenchange', updateFullscreenButtons);
  document.addEventListener('webkitfullscreenchange', updateFullscreenButtons);
  document.addEventListener('visibilitychange', () => {
    if (!bgmRunning) return;
    if (document.hidden || bgmMuted) {
      pauseBgmOutput(false);
      return;
    }
    startBgm();
  });
  window.addEventListener('resize', scheduleViewportUpdate);
  window.addEventListener('orientationchange', scheduleViewportUpdate);
  elements.restartSameButton.addEventListener('click', async () => {
    stopSessionTimer();
    cleanupRuntime();
    session = null;
    showScreen('setup');
    await startSelectedGame();
  });
}

renderSetupControls();
bindEvents();
updateBgmToggleButton();
showInitialModePrompt();
