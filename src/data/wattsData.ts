export const COMPANY_INFO = {
  name: 'Watts Renovations',
  region: 'Northamptonshire & surrounding areas',
  phoneDisplay: '+44 7359 184307',
  phoneHref: 'tel:+447359184307',
  email: 'watts.renovations@outlook.com',
  emailHref: 'mailto:watts.renovations@outlook.com',
  facebookUrl: 'https://www.facebook.com/wattsrenovations',
  logoUrl:
    'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/793721002_1063848006407004_6623840554200566978_n.jpg',
};

export const HERO_IMAGE = '/src/assets/images/hero_watts_driveway_1795536881812.jpg';
export const ABOUT_IMAGE = '/src/assets/images/about_watts_groundworks_1795536881967.jpg';

export type ServiceId =
  | 'Groundworks'
  | 'Drainage'
  | 'Driveways'
  | 'Patios'
  | 'Water Supplies'
  | 'Fencing'
  | 'Other';

export interface ServiceItem {
  number: string;
  id: Exclude<ServiceId, 'Other'>;
  title: string;
  description: string;
  highlights: string[];
  image: string;
  imageAlt: string;
}

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    id: 'Groundworks',
    title: 'Groundworks',
    description:
      'Professional groundwork solutions, including site preparation, excavation, levelling and preparation for a wide range of outdoor construction projects.',
    highlights: ['Site clearance & excavation', 'Sub-base levelling & compaction', 'Foundation & kerb preparation'],
    image: '/src/assets/images/service_groundworks_1795536882934.jpg',
    imageAlt: 'Mini-excavator and prepared crushed stone aggregate sub-base on a residential groundwork project',
  },
  {
    number: '02',
    id: 'Drainage',
    title: 'Drainage',
    description:
      'Practical drainage solutions designed to manage surface water, improve water flow and help protect your outdoor spaces from water-related problems.',
    highlights: ['Linear channel drains', 'French drains & gravel borders', 'Surface water run-off management'],
    image: '/src/assets/images/service_drainage_1795536883628.jpg',
    imageAlt: 'Newly installed linear channel drainage set flush into natural sandstone paving',
  },
  {
    number: '03',
    id: 'Driveways',
    title: 'Driveways',
    description:
      'Quality driveway installations and improvements, creating attractive, practical and durable entrances to your property.',
    highlights: ['Block paving & edging courses', 'Gravel & aggregate driveways', 'Proper sub-base & levels'],
    image: '/src/assets/images/service_driveways_1795536883888.jpg',
    imageAlt: 'Completed charcoal and grey herringbone block-paved residential driveway',
  },
  {
    number: '04',
    id: 'Patios',
    title: 'Patios',
    description:
      'Beautifully finished patios designed to create functional outdoor spaces for relaxing, entertaining and enjoying your garden.',
    highlights: ['Natural stone & porcelain paving', 'Garden steps & retaining edges', 'Clean pointing & tidy finish'],
    image: '/src/assets/images/service_patios_1795536883603.jpg',
    imageAlt: 'Newly laid natural grey sandstone patio with brick steps and turf lawn',
  },
  {
    number: '05',
    id: 'Water Supplies',
    title: 'Water Supplies',
    description:
      "Water supply installation and related groundwork solutions to support your property's requirements.",
    highlights: ['Service trench excavation', 'MDPE pipe laying & sand bedding', 'Neat reinstatement of surfaces'],
    image: '/src/assets/images/service_water_supplies_1795536884071.jpg',
    imageAlt: 'Cleanly excavated utility trench with blue water supply pipe bedded on washed sand',
  },
  {
    number: '06',
    id: 'Fencing',
    title: 'Fencing',
    description:
      'Professional fencing installations and replacements to improve privacy, security and the appearance of your outdoor space.',
    highlights: ['Closeboard & panel fencing', 'Concrete posts & gravel boards', 'Custom adaptation to ground levels'],
    image: '/src/assets/images/service_fencing_1795536884157.jpg',
    imageAlt: 'Newly fitted feather-edge timber garden fence with concrete gravel boards and posts',
  },
];

export interface TransformationItem {
  id: string;
  title: string;
  summary: string;
  beforeUrl: string;
  beforeAlt: string;
  afterUrl: string;
  afterAlt: string;
}

export const TRANSFORMATIONS: TransformationItem[] = [
  {
    id: 'transformation-1',
    title: 'Driveway & Frontage Overhaul',
    summary: 'Complete surface clearance, preparation and clean hardstanding finish.',
    beforeUrl:
      'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/915850870_1134110652714072_6892468445200115251_n.jpg',
    beforeAlt: 'Before photograph showing existing uneven outdoor ground prior to renovation works',
    afterUrl:
      'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/912575618_1134110362714101_2697618127671755763_n.jpg',
    afterAlt: 'After photograph showing completed driveway and neat surface finish by Watts Renovations',
  },
  {
    id: 'transformation-2',
    title: 'Garden Groundworks & Patio Transformation',
    summary: 'Levelling, base preparation and tailored outdoor paving finish.',
    beforeUrl:
      'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/900353527_1124076060384198_4969421652767035501_n.jpg',
    beforeAlt: 'Before photograph showing raw outdoor space prior to groundwork and paving',
    afterUrl:
      'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/897181337_1124076017050869_690830940665252426_n.jpg',
    afterAlt: 'After photograph showing finished patio and tidy outdoor space by Watts Renovations',
  },
  {
    id: 'transformation-3',
    title: 'Site Preparation & Hard Landscaping',
    summary: 'Excavation, sub-base compaction and crisp boundary finishing.',
    beforeUrl:
      'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/482028636_632984059493403_3608780721244890188_n.jpg',
    beforeAlt: 'Before photograph showing initial ground conditions before site preparation',
    afterUrl:
      'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/482088559_632984229493386_5190792010644361930_n.jpg',
    afterAlt: 'After photograph showing completed hard landscaping transformation by Watts Renovations',
  },
  {
    id: 'transformation-4',
    title: 'Exterior Surface & Boundary Upgrade',
    summary: 'Structured groundwork improving both appearance and everyday usability.',
    beforeUrl:
      'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/866459940_1114996654625472_3796277359081260054_n.jpg',
    beforeAlt: 'Before photograph showing unimproved exterior surface before groundwork',
    afterUrl:
      'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/861221936_1114996541292150_8571289677718387731_n.jpg',
    afterAlt: 'After photograph showing finished exterior surface upgrade by Watts Renovations',
  },
];

export interface WhyChooseUsItem {
  title: string;
  description: string;
  iconName: 'hammer' | 'ruler' | 'message' | 'sliders' | 'shield' | 'smile';
}

export const WHY_CHOOSE_US: WhyChooseUsItem[] = [
  {
    title: 'Quality Workmanship',
    description:
      'We take pride in the quality of our work and aim to deliver excellent results on every project.',
    iconName: 'hammer',
  },
  {
    title: 'Attention to Detail',
    description:
      'From preparation to completion, we focus on the details that make a difference.',
    iconName: 'ruler',
  },
  {
    title: 'Reliable Communication',
    description:
      'We believe in keeping customers informed and making the process as straightforward as possible.',
    iconName: 'message',
  },
  {
    title: 'Tailored Solutions',
    description:
      'Every property and project is different. We work around your requirements to find suitable solutions.',
    iconName: 'sliders',
  },
  {
    title: 'Professional Approach',
    description:
      'We aim to maintain a professional, organised and respectful approach throughout each job.',
    iconName: 'shield',
  },
  {
    title: 'Customer Satisfaction',
    description:
      'Our priority is to deliver work that customers can feel happy and confident about.',
    iconName: 'smile',
  },
];

export interface GalleryImage {
  id: number;
  url: string;
  alt: string;
}

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    url: 'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/483487997_635386789253130_1648540373607558431_n.jpg',
    alt: 'Watts Renovations completed outdoor groundwork and paving project 1',
  },
  {
    id: 2,
    url: 'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/481333352_635387895919686_4419606417994672124_n.jpg',
    alt: 'Watts Renovations driveway and exterior preparation work 2',
  },
  {
    id: 3,
    url: 'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/483506437_635387502586392_199959233364050577_n.jpg',
    alt: 'Watts Renovations residential patio and garden edging project 3',
  },
  {
    id: 4,
    url: 'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/491200286_662384133220062_5439948030698118941_n.jpg',
    alt: 'Watts Renovations site preparation and stonework installation 4',
  },
  {
    id: 5,
    url: 'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/491697900_662385879886554_1887197074849355103_n.jpg',
    alt: 'Watts Renovations outdoor renovation and drainage work 5',
  },
  {
    id: 6,
    url: 'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/825351642_1091719570286514_1235857115862154690_n.jpg',
    alt: 'Watts Renovations finished driveway and surfacing project 6',
  },
  {
    id: 7,
    url: 'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/912921660_1134110479380756_689327727924245798_n.jpg',
    alt: 'Watts Renovations clean residential hard landscaping finish 7',
  },
  {
    id: 8,
    url: 'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/481256244_629369499854859_4205688482284296320_n.jpg',
    alt: 'Watts Renovations fencing and garden boundary installation 8',
  },
  {
    id: 9,
    url: 'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/482215748_632417736216702_5517760624677367255_n.jpg',
    alt: 'Watts Renovations residential groundwork and levelling project 9',
  },
  {
    id: 10,
    url: 'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/481913352_630894396369036_4650851757979751255_n.jpg',
    alt: 'Watts Renovations gravel and edging installation 10',
  },
  {
    id: 11,
    url: 'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/482061306_630176559774153_2194938174994470755_n.jpg',
    alt: 'Watts Renovations outdoor hardscaping and drainage project 11',
  },
  {
    id: 12,
    url: 'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/483879283_635387635919712_3783938649253617627_n.jpg',
    alt: 'Watts Renovations completed garden terrace and paving 12',
  },
  {
    id: 13,
    url: 'https://your-awesome-website-preview.com/wp-content/uploads/2026/11/802988668_1068074885984316_3420872328085388381_n.jpg',
    alt: 'Watts Renovations finished exterior renovation project 13',
  },
];

export interface TestimonialItem {
  quote: string;
  author: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    quote:
      'Charlie and the team did a great job taking up old turf and rocks and laying to gravel - Charlie arranged everything, kept me updated and they worked very hard all day, start to finish, leaving the job all swept down and tidied - you won’t be disappointed using Watts Renovations, I can highly recommend.',
    author: 'Suzanne Bratby',
  },
  {
    quote:
      'Really pleased with the finished fence. It took a little while to get the work started after materials were dropped off (due to the heatwave) and for some of the old fencing/rubbish to be collected, but the quality of the installation was very good. They also adapted the fence to suit the property, which made for a much better finished result. Overall, I’m happy with the work and would recommend Charlie.',
    author: 'Joanna Clayton',
  },
];
