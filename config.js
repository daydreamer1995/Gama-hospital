/**
 * GAMA Hospital AI Concierge: client-editable configuration.
 * Change values here only. No other file needs to be edited for routine updates.
 */
window.GAMA_CONFIG = {
  hospital: {
    name: 'GAMA Hospital',
    nameAr: 'مستشفى جاما',
    phone: '920033175',
    email: 'info@gamahospital.com',
    address: 'Al Qashlah District, Dhahran, Eastern Province, Kingdom of Saudi Arabia'
  },

  // WhatsApp numbers in international format, digits only (example: 9665XXXXXXXX).
  // TODO(client): confirm that this number is a live WhatsApp Business number.
  whatsapp: {
    main: '966920033175',
    message: 'Hello GAMA Hospital'
  },

  links: {
    book: 'https://gamahospital.com/en-us/P/book-appointment'
  },

  // If the patient types one of these words in the directory search, an emergency notice is shown.
  // TODO(client): approve this list together with the emergency wording.
  emergencyKeywords: ['chest pain', 'cant breathe', "can't breathe", 'unconscious', 'stroke', 'heavy bleeding', 'severe bleeding', 'accident', 'seizure', 'overdose', 'emergency'],

  /**
   * Department directory.
   *  - whatsapp: optional department-specific WhatsApp number. Leave '' to use the main number
   *    (the chat opens with the department name pre-filled).
   *  - keywords: lets patients who already have a diagnosis find the right clinic.
   *    This is a routing aid only. It is not a medical diagnosis.
   */
  departments: [
    { en: 'Cardiology', ar: 'أمراض القلب', whatsapp: '', keywords: ['heart', 'hypertension', 'blood pressure', 'cholesterol', 'palpitation', 'arrhythmia', 'angina'] },
    { en: 'Internal Medicine', ar: 'الطب الباطني', whatsapp: '', keywords: ['fever', 'check-up', 'checkup', 'chronic disease', 'anemia'] },
    { en: 'Endocrinology and Diabetes', ar: 'الغدد الصماء والسكري', whatsapp: '', keywords: ['diabetes', 'sugar', 'thyroid', 'hormone', 'obesity'] },
    { en: 'Nephrology', ar: 'أمراض الكلى', whatsapp: '', keywords: ['kidney failure', 'dialysis', 'ckd', 'kidney disease', 'creatinine'] },
    { en: 'Urology', ar: 'المسالك البولية', whatsapp: '', keywords: ['kidney stone', 'prostate', 'urinary', 'bladder', 'uti'] },
    { en: 'Pulmonology', ar: 'أمراض الصدر', whatsapp: '', keywords: ['asthma', 'copd', 'lung', 'breathing', 'tuberculosis', 'cough'] },
    { en: 'Gastroenterology and Endoscopy', ar: 'أمراض الجهاز الهضمي والمناظير', whatsapp: '', keywords: ['ulcer', 'gastritis', 'liver', 'hepatitis', 'reflux', 'ibs', 'colonoscopy', 'stomach'] },
    { en: 'Neurology', ar: 'طب الأعصاب', whatsapp: '', keywords: ['epilepsy', 'migraine', 'parkinson', 'headache', 'neuropathy', 'memory'] },
    { en: 'Neurosurgery', ar: 'جراحة المخ والأعصاب', whatsapp: '', keywords: ['brain tumor', 'spine', 'disc', 'slipped disc', 'hydrocephalus'] },
    { en: 'Orthopedic Surgery', ar: 'جراحة العظام', whatsapp: '', keywords: ['fracture', 'joint', 'knee', 'hip', 'back pain', 'bone', 'shoulder'] },
    { en: 'Rheumatology and Rehabilitation', ar: 'الروماتيزم والتأهيل', whatsapp: '', keywords: ['arthritis', 'lupus', 'gout', 'rheumatoid', 'osteoporosis'] },
    { en: 'Physical Therapy', ar: 'العلاج الطبيعي', whatsapp: '', keywords: ['physiotherapy', 'rehabilitation', 'sports injury', 'physical therapy'] },
    { en: 'Obstetrics and Gynecology', ar: 'النساء والولادة', whatsapp: '', keywords: ['pregnancy', 'pregnant', 'antenatal', 'delivery', 'menopause', 'period', 'women'] },
    { en: 'Pediatrics and Neonatology', ar: 'طب الأطفال وحديثي الولادة', whatsapp: '', keywords: ['child', 'baby', 'newborn', 'vaccination', 'infant', 'kids'] },
    { en: 'Dermatology & Laser', ar: 'الجلدية والليزر', whatsapp: '', keywords: ['acne', 'eczema', 'psoriasis', 'skin', 'hair loss', 'laser', 'rash'] },
    { en: 'Ophthalmology', ar: 'طب العيون', whatsapp: '', keywords: ['cataract', 'glaucoma', 'eye', 'vision', 'retina'] },
    { en: 'Ear, Nose and Throat ENT', ar: 'الأنف والأذن والحنجرة', whatsapp: '', keywords: ['sinus', 'tonsil', 'hearing', 'ear', 'throat', 'nose', 'snoring'] },
    { en: 'Oral and Dental Clinic', ar: 'عيادة الفم والأسنان', whatsapp: '', keywords: ['tooth', 'teeth', 'dental', 'gum', 'braces'] },
    { en: 'General Surgery', ar: 'الجراحة العامة', whatsapp: '', keywords: ['hernia', 'appendix', 'appendicitis', 'gallbladder', 'gallstone', 'surgery'] },
    { en: 'Plastic Surgery', ar: 'جراحة التجميل', whatsapp: '', keywords: ['cosmetic', 'scar', 'reconstruction', 'burn'] },
    { en: 'Vascular Surgery', ar: 'جراحة الأوعية الدموية', whatsapp: '', keywords: ['varicose', 'vein', 'aneurysm', 'blood clot', 'diabetic foot'] },
    { en: 'Clinical Nutrition', ar: 'التغذية العلاجية', whatsapp: '', keywords: ['diet', 'weight loss', 'nutrition', 'weight'] },
    { en: 'General Practice', ar: 'الطب العام', whatsapp: '', keywords: ['general', 'consultation', 'cold', 'flu'] },
    { en: 'Radiology and Imaging', ar: 'الأشعة والتصوير الطبي', whatsapp: '', keywords: ['x-ray', 'xray', 'mri', 'ct scan', 'ultrasound', 'mammogram'] },
    { en: 'Interventional Radiology', ar: 'الأشعة التداخلية', whatsapp: '', keywords: ['embolization', 'biopsy', 'angiography'] },
    { en: 'Laboratory', ar: 'المختبر', whatsapp: '', keywords: ['blood test', 'lab test', 'laboratory', 'sample', 'culture'] },
    { en: 'Anesthesia', ar: 'التخدير', whatsapp: '', keywords: ['anesthesia', 'anaesthesia', 'sedation'] },
    { en: 'Intensive Care Unit ICU', ar: 'العناية المركزة', whatsapp: '', keywords: ['icu', 'critical care', 'intensive'] },
    { en: 'Long Term Care', ar: 'الرعاية طويلة الأمد', whatsapp: '', keywords: ['bedridden', 'elderly care', 'long term'] },
    { en: 'Home Care Services', ar: 'خدمات الرعاية المنزلية', whatsapp: '', keywords: ['home care', 'home nursing', 'nurse at home'] }
  ]
};
