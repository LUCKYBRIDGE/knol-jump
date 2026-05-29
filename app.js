import './assets/runtime/jumpmap-test-physics-utils.js';
import { JumpmapRuntimeGeometry } from './assets/runtime/jumpmap-runtime-geometry.js';
import { JumpmapRuntimePhysics } from './assets/runtime/jumpmap-runtime-physics.js';

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
const LANDING_DUST_LIFE_SEC = 0.46;
const LANDING_DUST_MAX_PARTICLES = 28;
const BEST_HEIGHT_NOTICE_MS = 1100;
const PLAYER_LABEL_COLORS = ['#38bdf8', '#f97316', '#22c55e', '#d946ef'];
const OTHER_PLAYER_SPRITE_ALPHA = 0.28;
const OTHER_PLAYER_LABEL_ALPHA = 0.14;
const DEFAULT_PLAY_MINUTES = 3;
const RANDOM_CHARACTER_ID = 'random';
const RANDOM_CHARACTER_OPTION = {
  id: RANDOM_CHARACTER_ID,
  label: '랜덤'
};

const QUIZ_PACKS = [
  {
    id: 'gugudan',
    label: '구구단',
    kind: 'csv',
    path: './assets/quiz/data/gugudan-2to9.csv'
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
  }
];

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
  finishGameButton: $('#finish-game-button'),
  playTitle: $('#play-title'),
  timerPill: $('#timer-pill'),
  gameStage: $('#game-stage'),
  questionArea: $('#question-area'),
  resultTitle: $('#result-title'),
  resultSubtitle: $('#result-subtitle'),
  resultTimePill: $('#result-time-pill'),
  resultGrid: $('#result-grid'),
  playerResults: $('#player-results'),
  restartSameButton: $('#restart-same-button'),
  backSetupButton: $('#back-setup-button'),
  displayModeToggle: $('#display-mode-toggle')
};

const packCache = new Map();
const mapCache = new Map();
const imageCache = new Map();

let selectedPackId = 'gugudan';
let selectedMapId = 'jumpmap-01';
let selectedPlayers = 1;
let selectedMinutes = DEFAULT_PLAY_MINUTES;
let selectedCharacterIds = Array.from({ length: Math.max(...PLAYER_COUNTS) }, (_, index) => (
  CHARACTERS[index % CHARACTERS.length]?.id || 'sejong'
));
let selectedDisplayMode = 'auto';
let session = null;
let viewportUpdateRaf = 0;

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

function clampSelectedPlayersToViewport(profile = syncViewportProfile()) {
  const nextPlayers = clamp(selectedPlayers, 1, profile.maxPlayers);
  if (nextPlayers === selectedPlayers) return false;
  selectedPlayers = nextPlayers;
  ensureCharacterSelections(selectedPlayers);
  return true;
}

function scheduleViewportUpdate() {
  if (viewportUpdateRaf) return;
  viewportUpdateRaf = window.requestAnimationFrame(() => {
    viewportUpdateRaf = 0;
    const profile = syncViewportProfile();
    if (!session) {
      clampSelectedPlayersToViewport(profile);
      updateSetupSummary();
      return;
    }
    drawScene();
  });
}

function selectNextDisplayMode() {
  const currentIndex = DISPLAY_MODES.findIndex((mode) => mode.id === selectedDisplayMode);
  selectedDisplayMode = DISPLAY_MODES[(currentIndex + 1 + DISPLAY_MODES.length) % DISPLAY_MODES.length]?.id || 'auto';
  const profile = syncViewportProfile();
  if (!session) {
    clampSelectedPlayersToViewport(profile);
    updateSetupSummary();
    return;
  }
  drawScene();
  syncTestDataset();
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

function showScreen(name) {
  document.body.dataset.screen = name;
  elements.setupScreen.classList.toggle('is-hidden', name !== 'setup');
  elements.playScreen.classList.toggle('is-hidden', name !== 'play');
  elements.resultScreen.classList.toggle('is-hidden', name !== 'result');
  updateFullscreenButtons();
  syncTestDataset();
}

function syncTestDataset() {
  document.body.dataset.knolquizScreen = document.body.dataset.screen || '';
  if (!session) {
    delete document.body.dataset.mapLoaded;
    delete document.body.dataset.hitboxes;
    delete document.body.dataset.playerX;
    delete document.body.dataset.playerY;
    delete document.body.dataset.playerSprite;
    delete document.body.dataset.quizOpen;
    delete document.body.dataset.quizOpenCount;
    delete document.body.dataset.quizBatchIndex;
    delete document.body.dataset.quizBatchSize;
    delete document.body.dataset.playerViewCount;
    delete document.body.dataset.character;
    return;
  }
  syncSessionQuizCompatibility();
  const activePlayer = getActivePlayer();
  document.body.dataset.mapLoaded = String(!!session.runtime.map);
  document.body.dataset.hitboxes = String(session.runtime.summary.hitboxCount || 0);
  document.body.dataset.objects = String(session.runtime.summary.objectCount || 0);
  document.body.dataset.quizOpen = String(!!session.quizOpen);
  document.body.dataset.quizOpenCount = String(session.players.filter((player) => player.quiz?.open).length);
  document.body.dataset.quizBatchIndex = String(session.quizBatchIndex || 0);
  document.body.dataset.quizBatchSize = String(session.quizBatchSize || QUIZ_BATCH_SIZE);
  document.body.dataset.playerViewCount = String(session.players.length);
  document.body.dataset.character = activePlayer?.character?.id || session.character?.id || '';
  if (activePlayer) {
    document.body.dataset.playerX = String(Math.round(activePlayer.state.x));
    document.body.dataset.playerY = String(Math.round(activePlayer.state.y));
    document.body.dataset.playerSprite = String(activePlayer.state._spriteSrc || '');
  }
}

function getPackLabel(packId) {
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
    image.onload = () => {
      entry.loaded = true;
      resolve(entry);
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

async function preloadImages(sources) {
  const unique = [...new Set(sources.filter(Boolean))];
  await Promise.all(unique.map((src) => getImageEntry(src)?.promise));
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
    button.title = disabled ? getPlayerLimitLabel(profile) : '';
    button.textContent = getPlayerCountLabel(count, profile);
  });
  elements.timeOptions.value = selectedMinutes ? String(selectedMinutes) : '';
  $$('[data-character-player][data-character]', elements.characterOptions).forEach((button) => {
    const playerIndex = Number(button.dataset.characterPlayer) || 0;
    const selected = button.dataset.character === selectedCharacterIds[playerIndex];
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
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
          title="${disabled ? escapeHtml(getPlayerLimitLabel(profile)) : ''}"
          ${disabled ? 'disabled' : ''}>
        ${escapeHtml(getPlayerCountLabel(count, profile))}
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

function parseCsv(text) {
  const lines = text.trim().split(/\r?\n/).filter(Boolean);
  return lines.slice(1).map((line, index) => {
    const columns = line.split(',').map((value) => value.trim());
    const choices = columns.slice(1, 5).filter(Boolean);
    const answerIndex = Math.max(0, Number(columns[5]) - 1);
    return {
      id: `gugudan-${index + 1}`,
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
  if (packCache.has(packId)) return packCache.get(packId);
  const pack = QUIZ_PACKS.find((item) => item.id === packId);
  if (!pack) throw new Error('퀴즈팩을 찾을 수 없습니다.');
  const response = await fetch(pack.path, { cache: 'no-store' });
  if (!response.ok) throw new Error(`${pack.label} 데이터를 불러오지 못했습니다.`);
  const questions = pack.kind === 'csv'
    ? parseCsv(await response.text())
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
  const value = { config, map, summary };
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
  return (Array.isArray(map?.objects) ? map.objects : []).map((object) => ({
    ...object,
    spriteSrc: resolveMapAssetPath(object.sprite, 'plate')
  }));
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
  const runtimeMap = mapBundle.map;
  const summary = mapBundle.summary;
  const objects = getRuntimeObjects(runtimeMap);
  const background = normalizeMapBackground(runtimeMap);
  const metrics = getPlayerMetrics(runtimeMap);
  const characters = Array.isArray(runtimeCharacters)
    ? runtimeCharacters
    : getSelectedCharacters(selectedPlayers);
  const obstacles = JumpmapRuntimePhysics.collectObstacleBounds({
    objects: Array.isArray(runtimeMap.objects) ? runtimeMap.objects : [],
    localPointToWorld: JumpmapRuntimeGeometry.localPointToWorld
  });

  return {
    packId: selectedPackId,
    packLabel: getPackLabel(selectedPackId),
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
    input: { left: false, right: false },
    keyboardPlayerIndex: -1,
    quizOpen: false,
    runtime: {
      map: runtimeMap,
      summary,
      mapRect: { width: summary.width, height: summary.height },
      metrics,
      hitboxOffset: getPlayerHitboxOffset(runtimeMap),
      physics: getTunedRuntimePhysics(runtimeMap.physics || {}),
      moveSpeed: getRuntimeMoveSpeed(runtimeMap),
      objects,
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

function updateGaugeUi() {
  if (!session) return;
  session.players.forEach((player, index) => {
    const playerPercent = getGaugePercent(player);
    $$(`[data-player-gauge-value="${index}"]`, elements.gameStage).forEach((element) => {
      element.textContent = formatGauge(player.gauge || 0);
    });
    $$(`[data-player-gauge-fill="${index}"]`, elements.gameStage).forEach((element) => {
      element.style.width = `${playerPercent}%`;
    });
    $$(`[data-player-height="${index}"]`, elements.gameStage).forEach((element) => {
      element.textContent = formatHeightMeters(player.bestHeight);
    });
    $$(`[data-player-accuracy="${index}"]`, elements.gameStage).forEach((element) => {
      element.textContent = getPlayerAccuracyText(player);
    });
    $$(`[data-height-record="${index}"]`, elements.gameStage).forEach((element) => {
      const active = Number(player.bestHeightNoticeUntil) > performance.now();
      element.hidden = !active;
      if (active) element.textContent = `최고 높이 갱신 ${formatHeightMeters(player.bestHeight)}`;
    });
    $$(`[data-player-viewport="${index}"]`, elements.gameStage).forEach((element) => {
      element.classList.toggle('is-active', index === session.activePlayerIndex);
      element.classList.toggle('is-gauge-empty', playerPercent <= GAUGE_EPSILON);
    });
  });
  $$('[data-quiz-player]', elements.gameStage).forEach((button) => {
    const playerIndex = Number(button.dataset.quizPlayer) || 0;
    const player = getPlayerByIndex(playerIndex);
    button.disabled = isPlayerQuizLocked(playerIndex)
      || (isPlayerGaugeEmpty(player) && !isPlayerGroundedForQuiz(player));
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
        <button class="touch-button" type="button" data-touch="left" data-touch-player="${index}" aria-label="${escapeHtml(player.name)} 왼쪽">&lt;</button>
        <button class="touch-button" type="button" data-touch="right" data-touch-player="${index}" aria-label="${escapeHtml(player.name)} 오른쪽">&gt;</button>
        <button class="touch-button touch-jump" type="button" data-touch="jump" data-touch-player="${index}" aria-label="${escapeHtml(player.name)} 점프">점프</button>
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
  session.runtime.contexts = session.runtime.canvases.map((canvas) => canvas.getContext('2d'));
  session.runtime.canvas = session.runtime.canvases[session.activePlayerIndex] || session.runtime.canvases[0] || null;
  session.runtime.ctx = session.runtime.canvas?.getContext('2d') || null;
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
  const choiceBody = isImageChoice
    ? `<span class="choice-media"><img src="${escapeHtml(resolveQuizAssetPath(choiceValue))}" alt="선택지 ${index + 1}" /></span>`
    : `<span class="choice-text">${escapeHtml(choiceValue)}</span>`;
  return `
    <button class="choice-button choice-tone-${(index % 4) + 1}${imageClass}${correctClass}${wrongClass}" type="button" data-choice="${escapeHtml(choiceValue)}"${disabled}>
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
  elements.playTitle.textContent = '놀퀴즈:점프맵';
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
  const rect = canvas.getBoundingClientRect();
  const dpr = clamp(window.devicePixelRatio || 1, 1, 2);
  const width = Math.max(1, Math.round(rect.width * dpr));
  const height = Math.max(1, Math.round(rect.height * dpr));
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  return { width, height, cssWidth: Math.max(1, rect.width), cssHeight: Math.max(1, rect.height), dpr };
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

function drawBackground(ctx, size) {
  const { background } = session.runtime;
  ctx.fillStyle = background.color;
  ctx.fillRect(0, 0, size.width, size.height);
  const image = getLoadedImage(background.image);
  if (!image) return;
  const scale = Math.max(size.width / image.naturalWidth, size.height / image.naturalHeight);
  const drawW = image.naturalWidth * scale;
  const drawH = image.naturalHeight * scale;
  const x = (size.width - drawW) * 0.5;
  const y = size.height - drawH;
  ctx.save();
  ctx.globalAlpha = background.imageOpacity;
  ctx.drawImage(image, x, y, drawW, drawH);
  ctx.restore();
}

function drawMapObjects(ctx, camera, projector) {
  const runtime = session.runtime;
  const cull = {
    x: camera.x - 140,
    y: camera.y - 180,
    width: camera.width + 280,
    height: camera.height + 360
  };
  for (const object of runtime.objects) {
    const image = getLoadedImage(object.spriteSrc);
    const info = getObjectDrawInfo(object, image);
    if (!rectsIntersect(info.worldRect, cull)) continue;
    const worldX = Number(object.x) || 0;
    const worldY = Number(object.y) || 0;
    const px = projector.x(worldX);
    const py = projector.y(worldY);
    const pw = info.drawW * projector.scale;
    const ph = info.drawH * projector.scale;
    const rotation = ((Number(object.rotation) || 0) * Math.PI) / 180;

    ctx.save();
    ctx.translate(px + pw / 2, py + ph / 2);
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

function spawnLandingDust(player, impactVy = 0) {
  if (!session || !player?.state) return;
  const metrics = session.runtime.metrics || { width: 44, height: 64 };
  const impact = clamp(Math.abs(Number(impactVy) || 0) / 520, 0.45, 1.35);
  const count = clamp(Math.round(5 + impact * 5), 6, 12);
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
  player.dustParticles = particles.slice(-LANDING_DUST_MAX_PARTICLES);
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
  for (const player of session.players) {
    const particles = Array.isArray(player.dustParticles) ? player.dustParticles : [];
    if (!particles.length) continue;
    const active = player === viewPlayer;
    for (const particle of particles) {
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
      playerHitboxPolygon: session.runtime.map?.playerHitboxPolygon || null
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

function getPlayerSpriteRender(runtimeMap, image) {
  const metrics = getPlayerMetrics(runtimeMap);
  const crop = getPlayerSpriteCrop(runtimeMap, image);
  const scale = metrics.scale;
  const spriteW = crop.w * scale;
  const spriteH = crop.h * scale;
  return {
    crop,
    spriteW,
    spriteH,
    offsetX: metrics.width / 2 - (crop.metaW * scale) / 2 + crop.x * scale,
    offsetY: metrics.height - crop.metaH * scale + crop.y * scale
  };
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

    ctx.save();
    ctx.font = `900 ${Math.max(12, 12 * projector.scale + 9)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    const text = player.name;
    const labelY = Math.max(18, y - 5);
    if (active) {
      ctx.lineWidth = Math.max(2, projector.scale * 2.4);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.88)';
      ctx.strokeText(text, cx, labelY - 3);
      ctx.globalAlpha = 1;
    } else {
      ctx.globalAlpha = OTHER_PLAYER_LABEL_ALPHA;
    }
    ctx.fillStyle = active ? (player.labelColor || '#2563eb') : 'rgba(20, 32, 47, 0.72)';
    ctx.fillText(text, cx, labelY - 3);
    ctx.restore();

    if (session.runtime.debugHitboxes) {
      ctx.save();
      ctx.strokeStyle = active ? 'rgba(37, 99, 235, 0.96)' : 'rgba(20, 32, 47, 0.6)';
      ctx.lineWidth = 2;
      const polygon = getPlayerHitboxPolygonPoints(state, metrics, session.runtime.map);
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

function drawScene() {
  if (!session?.runtime.contexts?.length) return;
  session.runtime.canvases.forEach((canvas, index) => {
    const ctx = session.runtime.contexts[index];
    const viewPlayer = session.players[index] || getActivePlayer();
    if (!canvas || !ctx || !viewPlayer) return;
    const size = ensureCanvasSize(canvas);
    const camera = computeCamera(size, viewPlayer);
    if (index === session.activePlayerIndex) {
      session.runtime.canvas = canvas;
      session.runtime.ctx = ctx;
      session.runtime.camera = camera;
    }
    const projector = buildProjector(size, camera);

    ctx.clearRect(0, 0, size.width, size.height);
    drawBackground(ctx, size);
    drawMapObjects(ctx, camera, projector);
    drawLandingDust(ctx, camera, projector, viewPlayer);
    drawDebugHitboxes(ctx, camera, projector);
    drawPlayers(ctx, camera, projector, viewPlayer);
  });
  updateGaugeUi();
  renderSidePanelIfChanged();
  updateQuizActionState();
  syncTestDataset();
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
    state.input.left = false;
    state.input.right = false;
    if (player.control) {
      player.control.left = false;
      player.control.right = false;
    }
    clearPlayerJumpInput(player);
    if (!player.gaugeEmptyNotified || wasOnGround) notifyGaugeEmpty(player);
  }

  JumpmapRuntimePhysics.stepPlayerState({
    playerState: state,
    dt,
    moveSpeed: session.runtime.moveSpeed,
    physics: session.runtime.physics,
    metrics: session.runtime.metrics,
    playerHitboxPolygon: session.runtime.map?.playerHitboxPolygon || null,
    map: session.runtime.mapRect,
    objects: Array.isArray(session.runtime.map?.objects) ? session.runtime.map.objects : [],
    obstacles: session.runtime.obstacles,
    worldPointToLocal: JumpmapRuntimeGeometry.worldPointToLocal,
    localPointToWorld: JumpmapRuntimeGeometry.localPointToWorld
  });

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
  updatePlayerSpriteState(player, dt, hasSpriteGroundContact(player));

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

function stepPhysics(dt) {
  if (!session) return;
  session.players.forEach((player, index) => {
    updatePlayerDust(player, dt);
    if (isPlayerQuizLocked(index)) return;
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
  drawScene();
  runtime.rafId = window.requestAnimationFrame(gameLoop);
}

function startGameLoop() {
  if (!session) return;
  session.runtime.lastTs = null;
  session.runtime.fixedAccumulator = 0;
  drawScene();
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
  if (Date.now() >= session.deadlineAt) {
    finishSession();
    return;
  }

  quiz.answerLocked = true;
  const activePlayer = getPlayerByIndex(safeIndex);
  const correct = choice === String(quiz.currentQuestion.answer);
  applyAnswerToGame(activePlayer, correct, quiz);
  quiz.answered = true;
  quiz.selectedChoice = choice;
  quiz.correct = correct;
  quiz.nextAllowedAt = Date.now() + (correct ? QUIZ_AUTO_ADVANCE_MS : QUIZ_WRONG_DELAY_MS);

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

function bindHoldButton(button, onPress, onRelease) {
  if (!button) return () => {};
  const activePointers = new Set();
  const down = (event) => {
    event.preventDefault();
    if (event.pointerId != null) activePointers.add(event.pointerId);
    try {
      button.setPointerCapture?.(event.pointerId);
    } catch (_error) {
      // Pointer capture is optional.
    }
    onPress();
    button.classList.add('is-active');
  };
  const up = (event) => {
    event.preventDefault();
    if (event.pointerId != null) activePointers.delete(event.pointerId);
    if (activePointers.size === 0) {
      onRelease();
      button.classList.remove('is-active');
    }
  };
  const prevent = (event) => event.preventDefault();
  button.addEventListener('pointerdown', down);
  button.addEventListener('pointerup', up);
  button.addEventListener('pointercancel', up);
  button.addEventListener('pointerleave', up);
  button.addEventListener('lostpointercapture', up);
  button.addEventListener('contextmenu', prevent);
  button.addEventListener('dragstart', prevent);
  return () => {
    button.removeEventListener('pointerdown', down);
    button.removeEventListener('pointerup', up);
    button.removeEventListener('pointercancel', up);
    button.removeEventListener('pointerleave', up);
    button.removeEventListener('lostpointercapture', up);
    button.removeEventListener('contextmenu', prevent);
    button.removeEventListener('dragstart', prevent);
  };
}

function bindTouchControls() {
  const cleanup = $$('[data-touch]', elements.gameStage).map((button) => {
    const playerIndex = Number(button.dataset.touchPlayer) || 0;
    const action = button.dataset.touch || '';
    return bindHoldButton(button, () => {
      const player = getPlayerByIndex(playerIndex);
      if (!session || !player) return;
      if (isPlayerQuizLocked(playerIndex)) return;
      if (action === 'left') player.control.left = true;
      if (action === 'right') player.control.right = true;
      if (action === 'jump') queuePlayerJump(player);
    }, () => {
      const player = getPlayerByIndex(playerIndex);
      if (!player) return;
      if (action === 'left') player.control.left = false;
      if (action === 'right') player.control.right = false;
      if (action === 'jump') player.state.input.jumpHeld = false;
    });
  });
  session.runtime.cleanup.push(...cleanup);
}

function bindRuntimeInput() {
  const onKeyDown = (event) => {
    if (!session || document.body.dataset.screen !== 'play') return;
    if (event.target?.closest?.('.quiz-card')) return;
    const control = getKeyboardControlForEvent(event);
    if (!control) return;
    event.preventDefault();
    const player = getPlayerByIndex(control.playerIndex);
    if (!player || isPlayerQuizLocked(control.playerIndex)) return;
    if (control.action === 'left') {
      player.control.left = true;
      return;
    }
    if (control.action === 'right') {
      player.control.right = true;
      return;
    }
    if (!event.repeat) queuePlayerJump(player);
    player.state.input.jumpHeld = true;
  };
  const onKeyUp = (event) => {
    if (!session) return;
    if (event.target?.closest?.('.quiz-card')) return;
    const control = getKeyboardControlForEvent(event);
    if (!control) return;
    event.preventDefault();
    const player = getPlayerByIndex(control.playerIndex);
    if (!player) return;
    if (control.action === 'left') {
      player.control.left = false;
      return;
    }
    if (control.action === 'right') {
      player.control.right = false;
      return;
    }
    player.state.input.jumpHeld = false;
  };
  const onBlur = () => {
    if (!session) return;
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
  clearQuizAutoTimer();
  stopGameLoop();
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

async function preloadRuntimeAssets(mapBundle, charactersInput) {
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
  ]);
}

async function startSelectedGame() {
  elements.setupError.textContent = '';
  if (!selectedMinutes) {
    elements.setupError.textContent = '플레이 시간을 선택하세요.';
    return;
  }
  elements.startButton.disabled = true;
  try {
    const [questions, mapBundle] = await Promise.all([
      loadPack(selectedPackId),
      loadMap(selectedMapId)
    ]);
    const runtimeCharacters = getSelectedCharacters(selectedPlayers);
    await preloadRuntimeAssets(mapBundle, runtimeCharacters);
    session = buildSession({ questions, mapBundle, characters: runtimeCharacters });
    showScreen('play');
    renderPlay();
    bindRuntimeInput();
    startGameLoop();
    startTimer();
  } catch (error) {
    elements.setupError.textContent = error instanceof Error ? error.message : '시작할 수 없습니다.';
  } finally {
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
  elements.resultTitle.textContent = '사용자별 점프 결과';
  elements.resultSubtitle.textContent = `${session.packLabel} · ${session.mapLabel} · ${getPlayerCountLabel(session.players.length, profile)} · ${formatClock(summary.playedSec)}`;
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
        <b>놀퀴즈:점프맵</b>
      </div>
      <dl>
        <div><dt>최고 높이</dt><dd>${escapeHtml(formatHeightMeters(summary.bestHeight))}</dd></div>
        <div><dt>플레이</dt><dd>${escapeHtml(formatClock(summary.playedSec))}</dd></div>
        <div><dt>정답률</dt><dd>${escapeHtml(`${accuracy}% (${summary.totalCorrect}/${totalAttempts})`)}</dd></div>
      </dl>
    </div>
  ` : '';

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
    <div class="player-result-card" data-result-player="${index}" style="--player-color: ${escapeHtml(player.labelColor)}">
      <div class="player-card-head">
        <span>${escapeHtml(player.name)}</span>
        <strong>${escapeHtml(player.character?.label || '캐릭터')}</strong>
        <em>높이 ${rank}위</em>
      </div>
      <div class="player-card-session">플레이 ${escapeHtml(formatClock(summary.playedSec))}</div>
      <div class="player-scoreplate jump-scoreplate">
        <b>최고 높이</b>
        <strong>${escapeHtml(formatHeightMeters(player.bestHeight))}</strong>
        <span>정답률 ${escapeHtml(getPlayerAccuracyText(player))}</span>
      </div>
      <div class="player-grade-badge" data-grade-key="${escapeHtml(heightGrade.imageKey)}" aria-label="등급 ${escapeHtml(heightTitle.title)}">
        <div class="grade-badge-mark" aria-hidden="true">
          <img src="${escapeHtml(getHeightGradeImagePath(heightGrade))}" alt="" loading="eager" decoding="async">
        </div>
        <div>
          <span>등급</span>
          <strong>${escapeHtml(heightTitle.title)}</strong>
          <em>${escapeHtml(heightTitle.caption)}</em>
        </div>
      </div>
      <div class="player-card-main">
        <div><b>${formatClock(summary.playedSec)}</b><span>플레이 시간</span></div>
        <div><b>${playerAccuracy}% (${player.correct}/${attempts})</b><span>정답률</span></div>
      </div>
      <div class="player-height-meter" aria-hidden="true"><i style="width: ${heightPercent}%"></i></div>
      <div class="player-accuracy-meter" aria-hidden="true"><i style="width: ${playerAccuracy}%"></i></div>
    </div>
    ${index === 0 ? faceResultCenterHtml : ''}
    `;
  }).join('')}
  `;
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

  elements.quizPack.addEventListener('change', () => {
    selectedPackId = elements.quizPack.value;
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
  elements.backSetupButton.addEventListener('click', abandonSession);
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
    if (action === 'enter-fullscreen') {
      enterFullscreen();
      return;
    }
    if (action === 'exit-fullscreen') {
      exitFullscreen();
    }
  });
  document.addEventListener('fullscreenchange', updateFullscreenButtons);
  document.addEventListener('webkitfullscreenchange', updateFullscreenButtons);
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
