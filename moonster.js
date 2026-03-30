const tabButtons = Array.from(document.querySelectorAll(".tab-btn"));
const panels = Array.from(document.querySelectorAll(".tab-panel"));
const jumpButtons = Array.from(document.querySelectorAll("[data-jump]"));
const languageButtons = Array.from(document.querySelectorAll(".lang-btn"));

const themeToggle = document.getElementById("theme-toggle");

const quizEls = {
  category: document.getElementById("quiz-category"),
  question: document.getElementById("quiz-question"),
  options: document.getElementById("quiz-options"),
  insight: document.getElementById("quiz-insight"),
  next: document.getElementById("quiz-next"),
  prev: document.getElementById("quiz-prev"),
  fill: document.getElementById("quiz-progress-fill"),
  progress: document.getElementById("quiz-progress-label"),
  step: document.getElementById("quiz-step-label"),
  score: document.getElementById("quiz-score-label"),
  card: document.getElementById("quiz-card"),
  result: document.getElementById("quiz-result"),
  resultTitle: document.getElementById("quiz-result-title"),
  resultText: document.getElementById("quiz-result-text"),
  resultPoints: document.getElementById("quiz-result-points"),
  resultList: document.getElementById("quiz-result-list"),
  restart: document.getElementById("quiz-restart")
};

const LOCALE = { uk: "uk-UA", hu: "hu-HU" };

const baseContent = {
  ui: {
    brandKicker: "Eco Analytics Platform",
    brandTitle: "Green Horizon UA",
    tabs: { overview: "Огляд", biogas: "Біогаз", hydrogen: "Зелений водень", quiz: "Квіз", team: "Команда" },
    ctaQuiz: "Пройти квіз",
    ctaRoadmap: "Дивитися дорожню карту",
    themeToDark: "Увімкнути темну тему",
    themeToLight: "Увімкнути світлу тему"
  },
  overview: {
    eyebrow: "Перспективи для України 2026-2035",
    title: "Перспективи одержання біогазу та зеленого водню в Україні",
    text: "Україна може поєднати аграрний потенціал, ВДЕ й інфраструктуру, щоб зміцнити енергобезпеку та вийти на нові експортні ринки.",
    chips: ["Енергобезпека", "Декарбонізація", "Розвиток громад", "Експорт до ЄС", "Техно-інновації"],
    stats: [
      "години стабільної генерації з біогазу щодоби",
      "ключових кластерів для регіональних проєктів",
      "цільовий горизонт для масштабування біометану і H2"
    ],
    highlightsTitle: "Що зараз робить тему реальною",
    highlights: [
      { title: "Сировина", text: "Гній, силос, жом та органічні відходи формують стабільну локальну базу." },
      { title: "ВДЕ", text: "СЕС і ВЕС дають профіцит електроенергії для електролізу." },
      { title: "Інфраструктура", text: "ГТС і сховища прискорюють вихід на масштаб." },
      { title: "Промисловість", text: "Попит на низьковуглецеві гази вже формується." }
    ],
    priorityTitle: "Ключові пріоритети для країни",
    priorities: [
      { title: "Правила", bullets: ["Прозоре регулювання", "Швидке підключення", "Сертифікація ЄС"] },
      { title: "Фінанси", bullets: ["Довгі контракти", "Страхування ризиків", "Кредитні лінії"] },
      { title: "Кадри", bullets: ["Підготовка операторів", "Сервісна мережа", "Цифровий моніторинг"] }
    ],
    roadmapTitle: "Коротка дорожня карта",
    roadmap: [
      { period: "2026-2027", text: "Пілоти: біогаз, біометан, перші водневі вузли." },
      { period: "2028-2030", text: "Кластеризація регіонів і промислові off-take контракти." },
      { period: "2031-2033", text: "Інтеграція сертифікації та розвиток похідних продуктів." },
      { period: "2034-2035", text: "Системний експорт і синергія з ВДЕ." }
    ],
    extraTitle: "Де найбільший потенціал зростання",
    extras: [
      { title: "Агро-хаби", text: "Регіони з тваринництвом і переробкою можуть дати швидкий приріст біометану." },
      { title: "Промислові зони", text: "Стабільний попит на тепло і водень пришвидшує окупність." },
      { title: "Транспорт", text: "Декарбонізація важкої логістики відкриває нові ніші." }
    ]
  },
  biogas: {
    eyebrow: "Біогаз і біометан",
    title: "Найреалістичніший зелений газ для швидкого масштабування",
    text: "Біогаз для України - практичний крок, який вирішує енергетичні та екологічні задачі.",
    list: [
      "Зменшення метанових викидів.",
      "Додатковий дохід для фермерів і громад.",
      "Локальне тепло та електрика.",
      "Дигестат як корисне добриво.",
      "Заміщення імпортного газу."
    ],
    scaleTitle: "Що потрібно для масштабування біогазу",
    scale: [
      { title: "Фінансова модель", text: "Прозорий cash-flow і довгі договори купівлі." },
      { title: "Підключення", text: "Спрощені техумови та цифровий облік якості газу." },
      { title: "Логістика", text: "Планування сезонності й кооперація постачальників." },
      { title: "Сервіс", text: "Підготовка персоналу і регіональні технічні команди." }
    ],
    caseTitle: "Формати проєктів, що можуть швидко рости",
    cases: [
      { title: "Кооперативний", text: "Кілька господарств об'єднують сировину й інвестиції." },
      { title: "Муніципальний", text: "Інтеграція харчових відходів і теплопостачання міста." },
      { title: "Промисловий", text: "Контракти з великими споживачами для стабільного збуту." }
    ]
  },
  hydrogen: {
    eyebrow: "Зелений водень",
    title: "Стратегічний експортний і промисловий продукт",
    text: "Зелений водень найбільш ефективний там, де є дешева ВДЕ-електрика і промисловий попит.",
    list: [
      "Декарбонізація металургії, хімії, цементу.",
      "Накопичення надлишків ВДЕ через електроліз.",
      "Виробництво e-fuels та амоніаку.",
      "Інтеграція з енергоринком ЄС.",
      "Підсилення технологічної компетенції країни."
    ],
    conditionsTitle: "Критичні умови розвитку водневої економіки",
    conditions: [
      { title: "Економіка електролізу", text: "Доступні інвестиції та стабільні поставки ВДЕ." },
      { title: "Сертифікація", text: "Сумісність з європейськими вимогами до вуглецевого сліду." },
      { title: "Off-take", text: "Опорні промислові контракти як база окупності." },
      { title: "Безпека", text: "Сучасні норми проектування, експлуатації і навчання персоналу." }
    ],
    productsTitle: "Похідні продукти і нові ринки",
    products: [
      { title: "Зелений амоніак", text: "Експортний продукт для агро- і морського секторів." },
      { title: "e-fuels", text: "Рішення для секторів, які складно повністю електрифікувати." },
      { title: "Синтетичний метан", text: "Глибша інтеграція з існуючими газовими мережами." }
    ]
  },
  team: {
    eyebrow: "Хто зробив цю сторінку",
    title: "Команда проєкту",
    sushiRole: "Lead Web Designer",
    sushiText: "Формує інтерфейс і перетворює аналітику на зрозумілий візуальний продукт.",
    gooseRole: "Full-Stack Engineer",
    gooseText: "Відповідає за логіку, інтерактив і стабільність. І так, гусак точно працює."
  },
  footer: "Green Horizon UA. Системне бачення чистої енергетики для України."
};

const huOverrides = {
  ui: {
    tabs: { overview: "Áttekintés", biogas: "Biogáz", hydrogen: "Zöld hidrogén", quiz: "Kvíz", team: "Csapat" },
    ctaQuiz: "Kvíz indítása",
    ctaRoadmap: "Útiterv megnyitása",
    themeToDark: "Sötét téma",
    themeToLight: "Világos téma"
  },
  overview: {
    eyebrow: "Ukrajna perspektívái 2026-2035",
    title: "A biogáz és zöld hidrogén lehetőségei Ukrajnában",
    text: "Ukrajna a mezőgazdasági erőforrásokat és a megújuló energiát kombinálva erős, exportképes pályát építhet.",
    chips: ["Energiabiztonság", "Dekarbonizáció", "Helyi fejlődés", "EU export", "Innováció"],
    stats: [
      "óra stabil biogáz alapú termelés naponta",
      "kiemelt klaszter a regionális projektekhez",
      "célhorizont a biometán és H2 skálázásához"
    ],
    highlightsTitle: "Miért reális most ez az irány",
    highlights: [
      { title: "Nyersanyag", text: "A helyi mezőgazdasági és organikus források stabil alapot adnak." },
      { title: "Megújuló energia", text: "A nap- és szélenergia bővülése támogatja az elektrolízist." },
      { title: "Infrastruktúra", text: "A hálózat és tárolás gyorsabb skálázást tesz lehetővé." },
      { title: "Piaci kereslet", text: "Az EU alacsony szénintenzitású gázokra épülő kereslete nő." }
    ],
    priorityTitle: "Országos prioritások",
    priorities: [
      { title: "Szabályozás", bullets: ["Átlátható szabályok", "Gyors engedélyezés", "EU-kompatibilitás"] },
      { title: "Pénzügy", bullets: ["Hosszú szerződések", "Kockázatkezelés", "Hitelprogramok"] },
      { title: "Képzés", bullets: ["Operátori képzés", "Szervizhálózat", "Digitális monitorozás"] }
    ],
    roadmapTitle: "Rövid ütemterv",
    roadmap: [
      { period: "2026-2027", text: "Pilot projektek biogáz és hidrogén kapcsolatokkal." },
      { period: "2028-2030", text: "Regionális klaszterek és ipari off-take szerződések." },
      { period: "2031-2033", text: "Tanúsítási integráció és származékos termékek fejlesztése." },
      { period: "2034-2035", text: "Skálázott export és teljes rendszerintegráció." }
    ],
    extraTitle: "Legnagyobb növekedési potenciál"
    ,
    extras: [
      { title: "Agrár klaszterek", text: "Gyors biometán növekedés állattenyésztési régiókban." },
      { title: "Ipari zónák", text: "Stabil hő- és hidrogénigény mellett jobb megtérülés." },
      { title: "Logisztika", text: "A nehézszállítás dekarbonizációja új piacot nyit." }
    ]
  }
};

huOverrides.biogas = {
  eyebrow: "Biogáz és biometán",
  title: "A legreálisabb zöldgáz a gyors skálázáshoz",
  text: "A biogáz gyors indulási pont: helyi nyersanyag, irányítható termelés és hulladékból energia.",
  list: [
    "Metánkibocsátás csökkentése.",
    "Plusz bevétel gazdáknak és önkormányzatoknak.",
    "Helyi hő és villamos energia.",
    "Digestátum mint talajjavító.",
    "Importgáz kiváltása."
  ],
  scaleTitle: "Mi kell a biogáz skálázásához",
  scale: [
    { title: "Pénzügyi modell", text: "Bankolható szerződéses struktúra és átlátható cash-flow." },
    { title: "Csatlakozás", text: "Gyors hálózati kapcsolódás és minőségkontroll." },
    { title: "Logisztika", text: "Szezonális nyersanyag-tervezés helyi partnerekkel." },
    { title: "Üzemeltetés", text: "Képzett operátorok és régiós szerviztámogatás." }
  ],
  caseTitle: "Gyorsan növelhető projektmodellek",
  cases: [
    { title: "Kooperatív", text: "Több gazdaság közös nyersanyag- és befektetési modellje." },
    { title: "Önkormányzati", text: "Városi hulladék + hőigény integrált kezelése." },
    { title: "Ipari", text: "Nagyfogyasztói szerződésekre épülő stabil működés." }
  ]
};

huOverrides.hydrogen = {
  eyebrow: "Zöld hidrogén",
  title: "Stratégiai export- és ipari energiahordozó",
  text: "A zöld hidrogén ott a legerősebb, ahol olcsó VRE és stabil ipari kereslet találkozik.",
  list: [
    "Nehézipar dekarbonizációja.",
    "Többlet VRE tárolása elektrolízissel.",
    "Ammónia és e-üzemanyag termékek.",
    "EU energiapiaci integráció.",
    "Új technológiai kompetenciák."
  ],
  conditionsTitle: "A hidrogéngazdaság kritikus feltételei",
  conditions: [
    { title: "Elektrolízis költség", text: "Olcsó finanszírozás és megbízható VRE szükséges." },
    { title: "Tanúsítás", text: "EU-kompatibilis karbon és eredet nyomon követés." },
    { title: "Off-take", text: "Ipari szerződések a stabil kereslethez." },
    { title: "Biztonság", text: "Műszaki szabványok és képzés a teljes láncban." }
  ],
  productsTitle: "Származékos termékek és új piacok",
  products: [
    { title: "Zöld ammónia", text: "Exportorientált termék mezőgazdasági és hajózási használatra." },
    { title: "e-üzemanyag", text: "Nehéz dekarbonizációjú szektorok célzott megoldása." },
    { title: "Szintetikus metán", text: "A meglévő gázhálózat alacsonyabb kibocsátású használata." }
  ]
};

huOverrides.team = {
  eyebrow: "Ki készítette ezt az oldalt",
  title: "Projektcsapat",
  sushiText: "Az UX és vizuális rendszer kialakításáért felel.",
  gooseText: "A logikáért és stabil működésért felel. A liba képe most már biztosan működik."
};

huOverrides.footer = "Green Horizon UA. Rendszerszintű jövőkép a tiszta energiához Ukrajnában.";

const quizBase = {
  eyebrow: "Інтерактив",
  title: "Green Energy Quiz: Україна",
  subtitle: "Прокачаний квіз на 10 питань про біогаз, біометан і зелений водень.",
  stepPrefix: "Питання",
  scorePrefix: "Бали",
  progressPrefix: "Прогрес",
  completedLabel: "Квіз завершено",
  prev: "Назад",
  next: "Далі",
  showResult: "Показати результат",
  restart: "Пройти ще раз",
  resultPrefix: "Результат",
  levels: [
    {
      min: 85,
      title: "Рівень: Стратег зеленої трансформації",
      text: "Ти добре бачиш системну картину і вмієш поєднувати технології.",
      recommendations: [
        "Плануй мультикластерне масштабування до 2035.",
        "Роби ставку на сертифікацію і довгі контракти.",
        "Будуй синергію між біометаном та H2."
      ]
    },
    {
      min: 65,
      title: "Рівень: Сильний практик",
      text: "Дуже хороший рівень. Додай більше фокусу на фінансові моделі та ризики.",
      recommendations: [
        "Поглиб економіку проєктів і логістику сировини.",
        "Доопрацюй шаблони промислових off-take угод.",
        "Визнач KPI для кожного етапу запуску."
      ]
    },
    {
      min: 0,
      title: "Рівень: Енерго-ентузіаст",
      text: "Сильний старт. Наступний крок - більше практики на реальних кейсах.",
      recommendations: [
        "Почни з пілотних моделей громад і фермерських кооперацій.",
        "Вивчи базову сертифікацію біометану та H2.",
        "Перейди від теорії до конкретних дорожніх карт."
      ]
    }
  ],
  questions: [
    { category: "Сировина", question: "Яка модель сировини найстабільніша для біогазової станції?", options: [
      { label: "Гній + силос + органічні відходи", score: 20, insight: "Правильно, змішана сировина вирівнює сезонні ризики." },
      { label: "Випадкові відходи без сортування", score: 3, insight: "Нестабільний склад погіршує процес ферментації." },
      { label: "Тільки імпортна біомаса", score: 2, insight: "Дорого і без локальної доданої вартості." },
      { label: "Лише деревина без підготовки", score: 4, insight: "Не найефективніший старт для біогазу." }
    ]},
    { category: "Фінанси", question: "Що найбільше підвищує bankability проєкту?", options: [
      { label: "Довгі контракти й прозора звітність", score: 20, insight: "Так, це знижує кредитний ризик." },
      { label: "Тільки оптимістичний прогноз", score: 2, insight: "Без контрактів прогнози слабко переконують інвестора." },
      { label: "Орієнтація лише на спот-ціни", score: 6, insight: "Спот може бути частиною, але не основою моделі." },
      { label: "Гранти без бізнес-моделі", score: 3, insight: "Гранти допомагають, але не замінюють економіку проєкту." }
    ]},
    { category: "Інфраструктура", question: "Ключова перевага біометану перед сирим біогазом:", options: [
      { label: "Подача в газову мережу після очищення", score: 20, insight: "Так, це відкриває масштаб і гнучкий збут." },
      { label: "Відсутність вимог до якості", score: 1, insight: "Навпаки, вимоги до якості обов'язкові." },
      { label: "Використання тільки на місці", score: 5, insight: "Біометан має набагато ширший ринок." },
      { label: "Неможливість зберігання", score: 2, insight: "Інфраструктура дозволяє балансувати обсяги." }
    ]},
    { category: "Водень", question: "Коли зелений водень має найкращу економіку?", options: [
      { label: "Коли є ВДЕ-профіцит і промисловий попит", score: 20, insight: "Саме це дає технічний і комерційний сенс." },
      { label: "Коли живиться викопною генерацією", score: 2, insight: "Тоді втрачається декарбонізаційна цінність." },
      { label: "Коли немає кінцевого споживача", score: 3, insight: "Без off-take проєкт погано масштабується." },
      { label: "Коли відсутні стандарти безпеки", score: 1, insight: "Безпека є базовою вимогою." }
    ]},
    { category: "Сертифікація", question: "Що ключове для експорту H2 в ЄС?", options: [
      { label: "Сертифікація походження й вуглецевого сліду", score: 20, insight: "Так, це вимога ринку ЄС." },
      { label: "Тільки низька ціна", score: 2, insight: "Ціни недостатньо без прозорої сертифікації." },
      { label: "Лише маркетинг", score: 1, insight: "Ринок вирішують стандарти і докази походження." },
      { label: "Локальні довідки без сумісності з ЄС", score: 5, insight: "Потрібна міжнародна сумісність документів." }
    ]},
    { category: "Експорт", question: "Яка стратегія найстійкіша в середньостроковій перспективі?", options: [
      { label: "Портфель: біометан + H2 + похідні продукти", score: 20, insight: "Диверсифікація знижує ринкову волатильність." },
      { label: "Ставка на один продукт", score: 4, insight: "Один продукт = вищий ризик цінових коливань." },
      { label: "Лише короткі угоди", score: 6, insight: "Короткі угоди гнучкі, але слабші для інвестора." },
      { label: "Експорт без сертифікації", score: 2, insight: "Без сертифікації ринковий доступ обмежений." }
    ]},
    { category: "Громади", question: "Що дає громадам найбільший ефект від біогазових хабів?", options: [
      { label: "Енергія + робочі місця + переробка відходів", score: 20, insight: "Комплексний ефект формує сильну підтримку." },
      { label: "Тільки комунікація без операцій", score: 1, insight: "Потрібна реальна операційна модель." },
      { label: "Ігнорування локальних постачальників", score: 3, insight: "Без локальних партнерів стійкість падає." },
      { label: "Запуск без навчання персоналу", score: 2, insight: "Кадри критично важливі для безпечної роботи." }
    ]},
    { category: "Безпека", question: "Найкращий спосіб зменшення технічних ризиків:", options: [
      { label: "Пілот -> аудит -> масштабування", score: 20, insight: "Логічна поетапність суттєво знижує ризики." },
      { label: "Одразу великий масштаб без тесту", score: 2, insight: "Це часто веде до дорогих помилок." },
      { label: "Без онлайн-моніторингу", score: 3, insight: "Моніторинг підвищує стабільність і безпеку." },
      { label: "Економія на захисті систем", score: 1, insight: "Захисні системи - не опція, а вимога." }
    ]},
    { category: "Кадри", question: "Що найважливіше для кадрового забезпечення?", options: [
      { label: "Підготовка операторів, інженерів, сервісних команд", score: 20, insight: "Люди - головний фактор довгострокового успіху." },
      { label: "Тільки зовнішні консультанти", score: 6, insight: "Потрібна власна локальна експертиза." },
      { label: "Старт без навчання", score: 2, insight: "Без підготовки зростають простої та аварійність." },
      { label: "Відмова від співпраці з університетами", score: 3, insight: "Освітні партнерства дають кадровий резерв." }
    ]},
    { category: "Стратегія", question: "Яка модель впровадження найбільш реалістична до 2035 року?", options: [
      { label: "Пілоти -> кластери -> сертифікований експорт", score: 20, insight: "Так, етапність і системність працюють найкраще." },
      { label: "Тільки декларації без плану", score: 1, insight: "Без roadmap інвестиції і запуски гальмуються." },
      { label: "Масштабування без пілотів", score: 4, insight: "Пілоти потрібні для перевірки технології та економіки." },
      { label: "Фокус на одному регіоні", score: 6, insight: "Почати можна з одного, але масштаб потребує кількох кластерів." }
    ]}
  ]
};

const quizHuOverrides = {
  eyebrow: "Interaktív",
  title: "Green Energy Quiz: Ukrajna",
  subtitle: "Nagyobb kvíz a biogáz, biometán és zöld hidrogén gyakorlati kérdéseiről.",
  stepPrefix: "Kérdés",
  scorePrefix: "Pont",
  progressPrefix: "Haladás",
  completedLabel: "A kvíz befejezve",
  prev: "Vissza",
  next: "Tovább",
  showResult: "Eredmény",
  restart: "Újrakezdés",
  resultPrefix: "Eredmény"
};

const state = {
  lang: "uk",
  theme: "light",
  quiz: { index: 0, answers: [], finished: false }
};


function getContent() {
  if (state.lang === "uk") {
    return { ...baseContent, quiz: quizBase };
  }

  return {
    ...baseContent,
    ...huOverrides,
    ui: { ...baseContent.ui, ...huOverrides.ui, tabs: { ...baseContent.ui.tabs, ...(huOverrides.ui && huOverrides.ui.tabs ? huOverrides.ui.tabs : {}) } },
    overview: { ...baseContent.overview, ...huOverrides.overview },
    biogas: { ...baseContent.biogas, ...huOverrides.biogas },
    hydrogen: { ...baseContent.hydrogen, ...huOverrides.hydrogen },
    team: { ...baseContent.team, ...huOverrides.team },
    footer: huOverrides.footer,
    quiz: { ...quizBase, ...quizHuOverrides }
  };
}

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = value;
  }
}

function renderGrid(id, items, cls) {
  const el = document.getElementById(id);
  if (!el) {
    return;
  }
  el.innerHTML = items
    .map(function(item) {
      return '<article class="' + cls + '"><h4>' + item.title + '</h4><p>' + item.text + '</p></article>';
    })
    .join('');
}

function renderPriority(id, items) {
  const el = document.getElementById(id);
  if (!el) {
    return;
  }
  el.innerHTML = items
    .map(function(item) {
      var bulletHtml = item.bullets.map(function(b) { return '<li>' + b + '</li>'; }).join('');
      return '<article class="priority-card"><h4>' + item.title + '</h4><ul>' + bulletHtml + '</ul></article>';
    })
    .join('');
}

function renderTimeline(items) {
  const el = document.getElementById('ov-roadmap-row');
  el.innerHTML = items
    .map(function(item) {
      return '<article class="timeline-item"><span>' + item.period + '</span><p>' + item.text + '</p></article>';
    })
    .join('');
}

function renderList(id, items) {
  const el = document.getElementById(id);
  el.innerHTML = items.map(function(item) { return '<li>' + item + '</li>'; }).join('');
}

function applyTheme(theme, persist) {
  if (persist === undefined) {
    persist = true;
  }

  state.theme = theme;
  document.body.dataset.theme = theme;

  const c = getContent();
  const isDark = theme === 'dark';
  themeToggle.textContent = isDark ? '☀️' : '🌙';
  themeToggle.title = isDark ? c.ui.themeToLight : c.ui.themeToDark;
  themeToggle.setAttribute('aria-label', themeToggle.title);

  if (persist) {
    localStorage.setItem('prefTheme', theme);
  }
}

function applyLanguage(lang, persist) {
  if (persist === undefined) {
    persist = true;
  }

  state.lang = lang === 'hu' ? 'hu' : 'uk';
  document.body.dataset.lang = state.lang;
  document.documentElement.lang = state.lang;

  languageButtons.forEach(function(btn) {
    btn.classList.toggle('is-active', btn.dataset.lang === state.lang);
  });

  const c = getContent();

  setText('brand-kicker', c.ui.brandKicker);
  setText('brand-title', c.ui.brandTitle);
  setText('tab-overview', c.ui.tabs.overview);
  setText('tab-biogas', c.ui.tabs.biogas);
  setText('tab-hydrogen', c.ui.tabs.hydrogen);
  setText('tab-quiz', c.ui.tabs.quiz);
  setText('tab-team', c.ui.tabs.team);
  setText('cta-quiz', c.ui.ctaQuiz);
  setText('cta-roadmap', c.ui.ctaRoadmap);

  setText('ov-eyebrow', c.overview.eyebrow);
  setText('ov-title', c.overview.title);
  setText('ov-text', c.overview.text);
  setText('stat-label-1', c.overview.stats[0]);
  setText('stat-label-2', c.overview.stats[1]);
  setText('stat-label-3', c.overview.stats[2]);
  setText('ov-highlights-title', c.overview.highlightsTitle);
  setText('ov-priority-title', c.overview.priorityTitle);
  setText('ov-roadmap-title', c.overview.roadmapTitle);
  setText('ov-extra-title', c.overview.extraTitle);

  document.getElementById('ov-chips').innerHTML = c.overview.chips
    .map(function(item) { return '<span class="chip">' + item + '</span>'; })
    .join('');

  renderGrid('ov-highlights-grid', c.overview.highlights, 'feature-card');
  renderPriority('ov-priority-grid', c.overview.priorities);
  renderTimeline(c.overview.roadmap);
  renderGrid('ov-extra-grid', c.overview.extras, 'insight-card');

  setText('bio-eyebrow', c.biogas.eyebrow);
  setText('bio-title', c.biogas.title);
  setText('bio-text', c.biogas.text);
  setText('bio-scale-title', c.biogas.scaleTitle);
  setText('bio-case-title', c.biogas.caseTitle);
  renderList('bio-list', c.biogas.list);
  renderGrid('bio-scale-grid', c.biogas.scale, 'feature-card');
  renderGrid('bio-case-grid', c.biogas.cases, 'insight-card');

  setText('h2-eyebrow', c.hydrogen.eyebrow);
  setText('h2-title', c.hydrogen.title);
  setText('h2-text', c.hydrogen.text);
  setText('h2-conditions-title', c.hydrogen.conditionsTitle);
  setText('h2-products-title', c.hydrogen.productsTitle);
  renderList('h2-list', c.hydrogen.list);
  renderGrid('h2-conditions-grid', c.hydrogen.conditions, 'feature-card');
  renderGrid('h2-products-grid', c.hydrogen.products, 'insight-card');

  setText('team-eyebrow', c.team.eyebrow);
  setText('team-title', c.team.title);
  setText('sushi-role', c.team.sushiRole);
  setText('sushi-text', c.team.sushiText);
  setText('goose-role', c.team.gooseRole);
  setText('goose-text', c.team.gooseText);

  setText('quiz-eyebrow', c.quiz.eyebrow);
  setText('quiz-title', c.quiz.title);
  setText('quiz-subtitle', c.quiz.subtitle);
  setText('quiz-prev', c.quiz.prev);
  setText('quiz-next', c.quiz.next);
  setText('quiz-restart', c.quiz.restart);

  const year = new Date().getFullYear();
  document.getElementById('footer-text').innerHTML = '© <span id="year">' + year + '</span> ' + c.footer;

  initQuiz();
  applyTheme(state.theme, false);

  if (persist) {
    localStorage.setItem('prefLang', state.lang);
  }
}

function activateTab(id, scroll) {
  if (scroll === undefined) {
    scroll = false;
  }

  panels.forEach(function(panel) {
    const active = panel.id === id;
    panel.classList.toggle('is-active', active);
    panel.setAttribute('aria-hidden', String(!active));
  });

  tabButtons.forEach(function(btn) {
    const active = btn.dataset.tabTarget === id;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', String(active));
  });

  if (scroll) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function animateCount(node) {
  if (node.dataset.animated === 'true') {
    return;
  }
  node.dataset.animated = 'true';

  const target = Number(node.dataset.count);
  const start = performance.now();
  const duration = 1200;
  const locale = LOCALE[state.lang] || 'uk-UA';

  const frame = function(time) {
    const t = Math.min((time - start) / duration, 1);
    node.textContent = Math.floor(target * t).toLocaleString(locale);
    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      node.textContent = target.toLocaleString(locale);
    }
  };

  requestAnimationFrame(frame);
}

const revealObserver = new IntersectionObserver(
  function(entries, observer) {
    entries.forEach(function(entry) {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('is-visible');
      if (entry.target.matches('.stat-value[data-count]')) {
        animateCount(entry.target);
      }
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.2 }
);

function initReveal() {
  document.querySelectorAll('.reveal, .stat-value[data-count]').forEach(function(el) {
    revealObserver.observe(el);
  });
}

function quizData() {
  return getContent().quiz;
}

function quizScore() {
  const q = quizData().questions;
  return state.quiz.answers.reduce(function(sum, ans, i) {
    if (ans === null || ans === undefined) {
      return sum;
    }
    return sum + q[i].options[ans].score;
  }, 0);
}

function updateQuizMeta() {
  const q = quizData();
  const total = q.questions.length;
  const step = Math.min(state.quiz.index + 1, total);
  const score = quizScore();
  const max = total * 20;
  const progress = Math.round((Math.min(state.quiz.index, total) / total) * 100);

  quizEls.step.textContent = q.stepPrefix + ': ' + step + ' / ' + total;
  quizEls.score.textContent = q.scorePrefix + ': ' + score + ' / ' + max;
  quizEls.fill.style.width = progress + '%';
  quizEls.progress.textContent = state.quiz.finished ? q.completedLabel : q.progressPrefix + ': ' + progress + '%';
}

function renderQuizQuestion() {
  const q = quizData();
  const item = q.questions[state.quiz.index];
  const selected = state.quiz.answers[state.quiz.index];

  quizEls.category.textContent = item.category;
  quizEls.question.textContent = (state.quiz.index + 1) + '. ' + item.question;
  quizEls.options.innerHTML = '';

  item.options.forEach(function(option, index) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'quiz-option';
    btn.style.animationDelay = (index * 60) + 'ms';
    btn.innerHTML = '<span class="option-letter">' + String.fromCharCode(65 + index) + '</span><span class="option-text">' + option.label + '</span>';

    if (selected === index) {
      btn.classList.add('is-selected');
    }

    btn.addEventListener('click', function() {
      state.quiz.answers[state.quiz.index] = index;
      quizEls.insight.textContent = option.insight;
      renderQuizQuestion();
    });

    quizEls.options.appendChild(btn);
  });

  if (selected !== null && selected !== undefined) {
    quizEls.insight.textContent = item.options[selected].insight;
  } else {
    quizEls.insight.textContent = '';
  }

  quizEls.prev.disabled = state.quiz.index === 0;
  quizEls.next.disabled = selected === null || selected === undefined;
  quizEls.next.textContent = state.quiz.index === q.questions.length - 1 ? q.showResult : q.next;

  updateQuizMeta();
}

function resolveLevel(percent) {
  const levels = quizData().levels;
  return levels.find(function(level) {
    return percent >= level.min;
  }) || levels[levels.length - 1];
}

function launchSparkles() {
  const colors = ['#3fd881', '#78ecab', '#f0d688', '#ffffff'];
  for (let i = 0; i < 22; i += 1) {
    const spark = document.createElement('span');
    spark.className = 'spark';
    spark.style.left = (40 + Math.random() * 60) + '%';
    spark.style.top = (40 + Math.random() * 30) + '%';
    spark.style.background = colors[i % colors.length];
    spark.style.setProperty('--dx', ((Math.random() - 0.5) * 220) + 'px');
    spark.style.setProperty('--dy', (-40 - Math.random() * 180) + 'px');
    quizEls.result.appendChild(spark);
    setTimeout(function() { spark.remove(); }, 760);
  }
}

function showQuizResult() {
  const q = quizData();
  const total = q.questions.length * 20;
  const score = quizScore();
  const percent = Math.round((score / total) * 100);
  const level = resolveLevel(percent);

  state.quiz.finished = true;
  quizEls.card.hidden = true;
  quizEls.result.hidden = false;
  quizEls.fill.style.width = '100%';

  quizEls.resultTitle.textContent = level.title;
  quizEls.resultText.textContent = level.text;
  quizEls.resultPoints.textContent = q.resultPrefix + ': ' + score + ' / ' + total + ' (' + percent + '%)';
  quizEls.resultList.innerHTML = level.recommendations.map(function(item) { return '<li>' + item + '</li>'; }).join('');

  updateQuizMeta();
  launchSparkles();
}

function nextQuiz() {
  const q = quizData();
  const selected = state.quiz.answers[state.quiz.index];
  if (selected === null || selected === undefined) {
    return;
  }

  if (state.quiz.index === q.questions.length - 1) {
    showQuizResult();
    return;
  }

  state.quiz.index += 1;
  renderQuizQuestion();
}

function prevQuiz() {
  if (state.quiz.index === 0) {
    return;
  }
  state.quiz.index -= 1;
  renderQuizQuestion();
}

function initQuiz() {
  const q = quizData();
  state.quiz.index = 0;
  state.quiz.answers = Array(q.questions.length).fill(null);
  state.quiz.finished = false;
  quizEls.card.hidden = false;
  quizEls.result.hidden = true;
  renderQuizQuestion();
}

function initTabs() {
  tabButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      activateTab(btn.dataset.tabTarget, true);
    });
  });

  jumpButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      activateTab(btn.dataset.jump, true);
    });
  });
}

function initControls() {
  themeToggle.addEventListener('click', function() {
    applyTheme(state.theme === 'light' ? 'dark' : 'light');
  });

  languageButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      applyLanguage(btn.dataset.lang);
    });
  });

  quizEls.next.addEventListener('click', nextQuiz);
  quizEls.prev.addEventListener('click', prevQuiz);
  quizEls.restart.addEventListener('click', initQuiz);
}

function initKeyboard() {
  document.addEventListener('keydown', function(event) {
    const quizVisible = document.getElementById('quiz').classList.contains('is-active');
    if (!quizVisible || state.quiz.finished) {
      return;
    }

    if (event.key >= '1' && event.key <= '4') {
      const node = quizEls.options.children[Number(event.key) - 1];
      if (node) {
        node.click();
      }
    }

    if (event.key === 'ArrowRight') {
      nextQuiz();
    }
    if (event.key === 'ArrowLeft') {
      prevQuiz();
    }
  });
}

function initAmbientPointerMotion() {
  const glows = Array.from(document.querySelectorAll('.ambient-glow'));
  window.addEventListener('pointermove', function(event) {
    const x = (event.clientX / window.innerWidth - 0.5) * 12;
    const y = (event.clientY / window.innerHeight - 0.5) * 12;

    glows.forEach(function(glow, index) {
      const factor = index === 0 ? 1 : -1;
      glow.style.transform = 'translate(' + (x * factor) + 'px, ' + (y * factor) + 'px)';
    });
  });
}

function loadPrefs() {
  const prefLang = localStorage.getItem('prefLang');
  const prefTheme = localStorage.getItem('prefTheme');
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  state.lang = prefLang === 'hu' ? 'hu' : 'uk';
  state.theme = prefTheme === 'dark' || prefTheme === 'light' ? prefTheme : systemDark ? 'dark' : 'light';

  applyLanguage(state.lang, false);
  applyTheme(state.theme, false);
}

function init() {
  initTabs();
  initControls();
  initKeyboard();
  initReveal();
  initAmbientPointerMotion();
  loadPrefs();
}

init();

