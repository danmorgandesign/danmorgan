import type { ImageMetadata } from 'astro';
import libraryLite from '../assets/images/card-library-lite.png';
import easyInvoice from '../assets/images/card-easy-invoice.png';
import bikeBus from '../assets/images/card-bike-bus.png';

export interface Project {
  slug: string;
  title: string;
  summary: string;
  href: string;
  /** Card thumbnail: 5:4 (1920×1536) or 3:2 (1920×1280) screenshot. */
  thumbnail: ImageMetadata;
}

// Card order and copy from the Figma Project Grid (Home 313:455).
export const projects: Project[] = [
  {
    slug: 'library-lite',
    title: 'Library Lite',
    summary: 'A fast, scan-first library management app designed for the reality of a busy school.',
    href: '/library-lite.html',
    thumbnail: libraryLite,
  },
  {
    slug: 'easy-invoice',
    title: 'Easy Invoice',
    summary: 'An invoicing app for freelancers and sole traders to manage clients and payments simply.',
    href: '/easy-invoice.html',
    thumbnail: easyInvoice,
  },
  {
    slug: 'bike-bus',
    title: 'Bike Bus',
    summary: 'An award-winning, simplified tool to co-ordinate parents to get the school bike bus running smoothly.',
    href: '/bike-bus.html',
    thumbnail: bikeBus,
  },
];
