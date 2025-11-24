import { Product, ProductCategory, Service, Course } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cartucce Golden Needle',
    category: ProductCategory.PMU,
    price: 45.00,
    image: 'https://picsum.photos/id/1070/400/400',
    description: 'Cartucce di alta precisione con alloggiamento placcato in oro per una conduttività e igiene superiori.',
    isNew: true,
  },
  {
    id: '2',
    name: 'Pigmento Nero Ossidiana',
    category: ProductCategory.TATTOO,
    price: 32.50,
    image: 'https://picsum.photos/id/30/400/400',
    description: 'Il nero più scuro e autentico. Resistente allo sbiadimento e organico.',
  },
  {
    id: '3',
    name: 'Anello Clicker in Titanio',
    category: ProductCategory.PIERCING,
    price: 85.00,
    image: 'https://picsum.photos/id/119/400/400',
    description: 'Titanio di grado implantare con rivestimento in oro PVD. Finitura lucidata a mano.',
  },
  {
    id: '4',
    name: 'Balsamo Curativo Velvet',
    category: ProductCategory.AFTERCARE,
    price: 22.00,
    image: 'https://picsum.photos/id/250/400/400',
    description: 'Aftercare di lusso arricchito con burro di karité e scaglie d\'oro.',
  },
  {
    id: '5',
    name: 'Macchinetta Rotativa Royal',
    category: ProductCategory.PMU,
    price: 450.00,
    image: 'https://picsum.photos/id/160/400/400',
    description: 'Ergonomica, silenziosa e potente. Progettata per l\'artista d\'élite.',
    isNew: true,
  },
  {
    id: '6',
    name: 'Carta Transfer Diamond',
    category: ProductCategory.TATTOO,
    price: 18.00,
    image: 'https://picsum.photos/id/180/400/400',
    description: 'Stencil nitidi e duraturi ogni volta.',
  }
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Sopracciglia Ombre Powder',
    duration: '3 Ore',
    price: '€450',
    description: 'Un effetto sfumato e morbido, simile al trucco leggero.',
    image: 'https://picsum.photos/id/64/800/600'
  },
  {
    id: 's2',
    name: 'Tatuaggio Fine Line',
    duration: '1-3 Ore',
    price: 'Da €150',
    description: 'Disegni delicati e intricati creati con aghi singoli per la massima eleganza.',
    image: 'https://picsum.photos/id/91/800/600'
  },
  {
    id: 's3',
    name: 'Curatela Piercing di Lusso',
    duration: '45 Min',
    price: '€80 + Gioiello',
    description: 'Consulenza anatomica e styling con gioielli in oro massiccio.',
    image: 'https://picsum.photos/id/338/800/600'
  }
];

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Masterclass Sopracciglia Perfette',
    level: 'Avanzato',
    price: 899.00,
    image: 'https://picsum.photos/id/20/600/400',
    description: 'Impara la tecnica esclusiva di Elena Parvu per sopracciglia iper-realistiche.',
    modules: 12,
    duration: '4 Settimane'
  },
  {
    id: 'c2',
    title: 'Fondamenti di PMU',
    level: 'Principiante',
    price: 499.00,
    image: 'https://picsum.photos/id/26/600/400',
    description: 'Il corso essenziale per iniziare la tua carriera nel trucco permanente.',
    modules: 8,
    duration: '2 Settimane'
  },
  {
    id: 'c3',
    title: 'Arte del Fine Line',
    level: 'Masterclass',
    price: 1200.00,
    image: 'https://picsum.photos/id/36/600/400',
    description: 'Tecniche avanzate per tatuaggi minimalisti e delicati.',
    modules: 15,
    duration: '6 Settimane'
  }
];