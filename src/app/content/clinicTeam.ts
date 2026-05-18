import type { Locale } from '../i18n';

export type ClinicTeamMember = {
  name: string;
  role: string;
  blurb: string;
  image: string;
};

export const clinicTeamByLocale: Record<Locale, ClinicTeamMember[]> = {
  bg: [
    {
      name: 'д-р Михаил Михайлов, дм',
      role: 'Управител и лекар-специалист по кожни и венерически болести',
      blurb:
        'д-р Михаил Михайлов, дм – лекар-специалист по кожни и венерически болести и управител на медицински център ОБЛИК, който съчетава клинична прецизност, съвременна естетична дерматология и индивидуален подход към всеки пациент.',
      image: 'doctor-portrait-test.png',
    },
    {
      name: 'д-р Евгения Дамеска-Стойковска',
      role: 'Лекар-специалист по вътрешни болести',
      blurb:
        'Лекар-специалист по вътрешни болести с внимание към цялостното здравословно състояние и баланса между вътрешното здраве и доброто общо състояние на пациента.',
      image: '/logo-test.png',
    },
    {
      name: 'д-р Николина Колева-Пеева',
      role: 'Лекар-специалист по кардиология',
      blurb:
        'Лекар-специалист по кардиология, посветена на грижата за сърдечно-съдовото здраве с внимание, спокойствие и професионална прецизност.',
      image: '/logo-test.png',
    },
    {
      name: 'Ирина Шмигалева',
      role: 'Медицински специалист',
      blurb:
        'Медицински специалист, която допринася за усещането за спокойствие, комфорт и професионална грижа по време на всяко посещение в ОБЛИК.',
      image: '/logo-test.png',
    },
    {
      name: 'Гергана Найденова',
      role: 'Медицински секретар',
      blurb:
        'Медицински секретар, която посреща пациентите с внимание, организация и отношение, създаващи увереност още от първия контакт с ОБЛИК.',
      image: '/logo-test.png',
    },
  ],
  en: [
    {
      name: 'Dr. Mihail Mihaylov, DM',
      role: 'MEDICAL DIRECTOR · DERMATOLOGY AND VENEREOLOGY',
      blurb:
        'Dr. Mihail Mihaylov, DM — specialist in dermatology and venereology and medical director of OBLIQ Medical Centre, combining clinical precision, contemporary aesthetic dermatology and an individualized approach to every patient.',
      image: 'doctor-portrait-test.png',
    },
    {
      name: 'Dr. Evgeniya Dameska-Stoykovska',
      role: 'SPECIALIST IN INTERNAL MEDICINE',
      blurb:
        'Specialist in internal medicine with attention to overall health and the balance between internal wellbeing and the patient’s general condition.',
      image: '/logo-test.png',
    },
    {
      name: 'Dr. Nikolina Koleva-Peeva',
      role: 'SPECIALIST IN CARDIOLOGY',
      blurb:
        'Specialist in cardiology, dedicated to cardiovascular health with calm attention and professional precision.',
      image: '/logo-test.png',
    },
    {
      name: 'Irina Shmigaleva',
      role: 'MEDICAL SPECIALIST',
      blurb:
        'Medical specialist who contributes to a sense of calm, comfort and professional care during every visit to OBLIQ.',
      image: '/logo-test.png',
    },
    {
      name: 'Gergana Naydenova',
      role: 'MEDICAL SECRETARY',
      blurb:
        'Medical secretary who welcomes patients with attention, organization and warmth that build confidence from the first contact with OBLIQ.',
      image: '/logo-test.png',
    },
  ],
  ru: [
    {
      name: 'д-р Михаил Михайлов, дм',
      role: 'РУКОВОДИТЕЛЬ · ВРАЧ-ДЕРМАТОВЕНЕРОЛОГ',
      blurb:
        'д-р Михаил Михайлов, дм — врач-специалист по кожным и венерическим болезням и руководитель медицинского центра OBLIQ, сочетающий клиническую точность, современную эстетическую дерматологию и индивидуальный подход к каждому пациенту.',
      image: 'doctor-portrait-test.png',
    },
    {
      name: 'д-р Евгения Дамеска-Стойковска',
      role: 'ВРАЧ-СПЕЦИАЛИСТ ПО ВНУТРЕННИМ БОЛЕЗНЯМ',
      blurb:
        'Врач-специалист по внутренним болезням с вниманием к целостному состоянию здоровья и балансу между внутренним здоровьем и общим самочувствием пациента.',
      image: '/logo-test.png',
    },
    {
      name: 'д-р Николина Колева-Пеева',
      role: 'ВРАЧ-СПЕЦИАЛИСТ ПО КАРДИОЛОГИИ',
      blurb:
        'Врач-специалист по кардиологии, посвятившая себя заботе о сердечно-сосудистом здоровье с вниманием, спокойствием и профессиональной точностью.',
      image: '/logo-test.png',
    },
    {
      name: 'Ирина Шмигалева',
      role: 'МЕДИЦИНСКИЙ СПЕЦИАЛИСТ',
      blurb:
        'Медицинский специалист, которая создаёт ощущение спокойствия, комфорта и профессиональной заботы во время каждого визита в OBLIQ.',
      image: '/logo-test.png',
    },
    {
      name: 'Гергана Найденова',
      role: 'МЕДИЦИНСКИЙ СЕКРЕТАРЬ',
      blurb:
        'Медицинский секретарь, которая встречает пациентов с вниманием, организованностью и отношением, формирующими уверенность уже с первого контакта с OBLIQ.',
      image: '/logo-test.png',
    },
  ],
};
