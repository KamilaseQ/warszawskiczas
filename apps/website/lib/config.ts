// Globalna konfiguracja front-endowa (placeholdery — bez backendu)

// TODO: przenieść do bazy danych / zmiennej środowiskowej po wdrożeniu backendu
export const ACCESS_CODE = 'WC2024'

// TODO: podmień docelowy numer telefonu
export const CONTACT_PHONE = '+48 604 501 000'
export const CONTACT_PHONE_RAW = '+48604501000'

// TODO: podmień numer WhatsApp
export const WHATSAPP_NUMBER = '48604501000'

// TODO: podmień docelowy e-mail
export const CONTACT_EMAIL = 'biuro@warszawskiczas.pl'

export const ADDRESS = {
  street: 'ul. Mokotowska 71',
  postal: '00-530',
  city: 'Warszawa',
}

export const HOURS = {
  weekdays: '10:00 – 18:00',
  saturday: '10:00 – 15:00',
  sunday: 'Zamknięte',
}

// Hardcoded liczby w licznikach — łatwo podmienić
export const STATS = {
  transactions: 400,
  yearsSince: 2009,
}
