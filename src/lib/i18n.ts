export type Language = 'en' | 'am';

export const SUPPORTED_LANGUAGES: { code: Language; label: string; nativeLabel: string }[] = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'am', label: 'Amharic', nativeLabel: 'አማርኛ' },
];

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.myLearning': 'My Learning',
    'nav.courses': 'Courses',
    'nav.liveSessions': 'Live Sessions',
    'nav.certificates': 'Certificates',
    'nav.instructorStudio': 'Instructor Studio',
    'nav.courseCatalog': 'Course Catalog',
    'nav.community': 'Community',
    'nav.notifications': 'Notifications',
    'nav.settings': 'Settings',
    // Student Dashboard
    'dashboard.greeting': 'Welcome back',
    'dashboard.enrolledCourses': 'My Enrolled Courses',
    'dashboard.upcomingSessions': 'Upcoming Sessions',
    'dashboard.progress': 'Progress',
    'dashboard.resume': 'Resume',
    'dashboard.browseAll': 'Browse all',
    'dashboard.active': 'active',
    'dashboard.next': 'Next',
    // Course Catalog
    'catalog.title': 'Course Catalog',
    'catalog.subtitle': 'Explore our full curriculum of Ethiopian Orthodox Tewahido courses',
    'catalog.search': 'Search courses…',
    'catalog.filterGroup': 'Filter by group',
    'catalog.allGroups': 'All Groups',
    'catalog.middle': 'Middle School',
    'catalog.high': 'High School',
    'catalog.college': 'College',
    'catalog.deacon': 'Deacon Track',
    'catalog.all': 'All Levels',
    'catalog.enroll': 'Enroll Now',
    'catalog.preview': 'Free Preview',
    'catalog.enrolled': 'Enrolled',
    'catalog.lessons': 'lessons',
    'catalog.students': 'students',
    'catalog.free': 'Free',
    'catalog.noResults': 'No courses found matching your search.',
    // Lesson Player
    'lesson.markComplete': 'Mark as Complete',
    'lesson.completed': '✓ Completed',
    'lesson.previous': 'Previous',
    'lesson.next': 'Next',
    'lesson.overview': 'Overview',
    'lesson.resources': 'Resources',
    'lesson.discussion': 'Discussion',
    'lesson.viewAmharic': 'View in አማርኛ',
    'lesson.viewEnglish': 'View in English',
    // Common
    'common.loading': 'Loading…',
    'common.error': 'Something went wrong.',
    'common.language': 'Language',
  },
  am: {
    // Navigation
    'nav.myLearning': 'ትምህርቴ',
    'nav.courses': 'ኮርሶች',
    'nav.liveSessions': 'ቀጥታ ክፍሎች',
    'nav.certificates': 'ሰርቲፊኬቶች',
    'nav.instructorStudio': 'የአስተማሪ ስቱዲዮ',
    'nav.courseCatalog': 'የኮርስ ካታሎግ',
    'nav.community': 'ማህበረሰብ',
    'nav.notifications': 'ማሳወቂያዎች',
    'nav.settings': 'ቅንብሮች',
    // Student Dashboard
    'dashboard.greeting': 'እንኳን ደህና መጡ',
    'dashboard.enrolledCourses': 'የተመዘገቡ ኮርሶቼ',
    'dashboard.upcomingSessions': 'መጪ ክፍሎች',
    'dashboard.progress': 'እድገት',
    'dashboard.resume': 'ቀጥል',
    'dashboard.browseAll': 'ሁሉንም ይመልከቱ',
    'dashboard.active': 'ንቁ',
    'dashboard.next': 'ቀጣይ',
    // Course Catalog
    'catalog.title': 'የኮርስ ካታሎግ',
    'catalog.subtitle': 'የኢትዮጵያ ኦርቶዶክስ ተዋሕዶ ኮርሶቻችንን ያስሱ',
    'catalog.search': 'ኮርሶችን ይፈልጉ…',
    'catalog.filterGroup': 'በቡድን ያጣሩ',
    'catalog.allGroups': 'ሁሉም ቡድኖች',
    'catalog.middle': 'ሁለተኛ ደረጃ',
    'catalog.high': 'ከፍተኛ ሁለተኛ ደረጃ',
    'catalog.college': 'ዩኒቨርሲቲ',
    'catalog.deacon': 'የዲያቆን ትምህርት',
    'catalog.all': 'ሁሉም ደረጃዎች',
    'catalog.enroll': 'አሁን ይመዝገቡ',
    'catalog.preview': 'ነፃ ቅድመ-ዕይታ',
    'catalog.enrolled': 'ተመዝግቧል',
    'catalog.lessons': 'ትምህርቶች',
    'catalog.students': 'ተማሪዎች',
    'catalog.free': 'ነፃ',
    'catalog.noResults': 'ከፍለጋዎ ጋር የሚዛመዱ ኮርሶች አልተገኙም።',
    // Lesson Player
    'lesson.markComplete': 'እንደ ተጠናቀቀ ምልክት አድርግ',
    'lesson.completed': '✓ ተጠናቅቋል',
    'lesson.previous': 'ቀዳሚ',
    'lesson.next': 'ቀጣይ',
    'lesson.overview': 'አጠቃላይ እይታ',
    'lesson.resources': 'ሀብቶች',
    'lesson.discussion': 'ውይይት',
    'lesson.viewAmharic': 'በአማርኛ ይመልከቱ',
    'lesson.viewEnglish': 'በእንግሊዝኛ ይመልከቱ',
    // Common
    'common.loading': 'በመጫን ላይ…',
    'common.error': 'ስህተት ተፈጥሯል።',
    'common.language': 'ቋንቋ',
  },
};

export function getTranslations(language: Language): (key: string) => string {
  return (key: string) => translations[language][key] ?? translations['en'][key] ?? key;
}
