export type CityData = {
  [countryId: string]: {
    name: string
    cities: string[]
  }
}

export const citiesByCountry: CityData = {
  // Canada
  'CA': {
    name: 'Canada',
    cities: [
      'Toronto',
      'Vancouver',
      'Montreal',
      'Calgary',
      'Ottawa',
      'Edmonton',
      'Mississauga',
      'Winnipeg',
      'Quebec City',
      'Hamilton',
      'Brampton',
      'Surrey',
      'Kitchener',
      'Laval',
      'Halifax',
      'London',
      'Victoria',
      'Markham',
      'Vaughan',
      'Gatineau',
      'Saskatoon',
      'Regina',
      'Richmond',
      'Burnaby',
      'St. John\'s'
    ]
  },
  
  // South Korea
  'KR': {
    name: 'South Korea',
    cities: [
      'Seoul',
      'Busan',
      'Incheon',
      'Daegu',
      'Daejeon',
      'Gwangju',
      'Suwon',
      'Ulsan',
      'Seongnam',
      'Goyang',
      'Bucheon',
      'Yongin',
      'Ansan',
      'Cheongju',
      'Jeonju',
      'Anyang',
      'Changwon',
      'Pohang',
      'Cheonan',
      'Jeju City',
      'Gimhae',
      'Jinju',
      'Gumi',
      'Sejong',
      'Yangsan'
    ]
  },
  
  // Vietnam
  'VN': {
    name: 'Vietnam',
    cities: [
      'Ho Chi Minh City',
      'Hanoi',
      'Da Nang',
      'Hai Phong',
      'Can Tho',
      'Bien Hoa',
      'Nha Trang',
      'Hue',
      'Vung Tau',
      'Buon Ma Thuot',
      'Quy Nhon',
      'Long Xuyen',
      'Thai Nguyen',
      'My Tho',
      'Phan Thiet',
      'Ha Long',
      'Nam Dinh',
      'Ca Mau',
      'Phan Rang',
      'Vinh',
      'Da Lat',
      'Rach Gia',
      'Thai Binh',
      'Hoa Binh',
      'Soc Trang'
    ]
  },
  
  // France
  'FR': {
    name: 'France',
    cities: [
      'Paris',
      'Marseille',
      'Lyon',
      'Toulouse',
      'Nice',
      'Nantes',
      'Strasbourg',
      'Montpellier',
      'Bordeaux',
      'Lille',
      'Rennes',
      'Reims',
      'Saint-Étienne',
      'Toulon',
      'Le Havre',
      'Grenoble',
      'Dijon',
      'Angers',
      'Nîmes',
      'Aix-en-Provence',
      'Brest',
      'Tours',
      'Amiens',
      'Limoges',
      'Clermont-Ferrand',
      'Villeurbanne',
      'Metz',
      'Besançon',
      'Orléans',
      'Caen',
      'Mulhouse',
      'Nancy',
      'Rouen',
      'Perpignan',
      'Boulogne-Billancourt'
    ]
  },
  
  // United States
  'US': {
    name: 'United States',
    cities: [
      'New York City',
      'Los Angeles',
      'Chicago',
      'Houston',
      'Phoenix',
      'Philadelphia',
      'San Antonio',
      'San Diego',
      'Dallas',
      'San Jose',
      'Austin',
      'Jacksonville',
      'Fort Worth',
      'Columbus',
      'San Francisco',
      'Charlotte',
      'Indianapolis',
      'Seattle',
      'Denver',
      'Washington DC',
      'Boston',
      'El Paso',
      'Nashville',
      'Detroit',
      'Portland',
      'Las Vegas',
      'Memphis',
      'Atlanta',
      'Miami',
      'Baltimore'
    ]
  },
  
  // China
  'CN': {
    name: 'China',
    cities: [
      'Shanghai',
      'Beijing',
      'Guangzhou',
      'Shenzhen',
      'Tianjin',
      'Wuhan',
      'Dongguan',
      'Chengdu',
      'Chongqing',
      'Nanjing',
      'Shenyang',
      'Hangzhou',
      'Xi\'an',
      'Harbin',
      'Suzhou',
      'Qingdao',
      'Dalian',
      'Zhengzhou',
      'Jinan',
      'Kunming',
      'Changsha',
      'Taiyuan',
      'Xiamen',
      'Hefei',
      'Shijiazhuang',
      'Urumqi',
      'Fuzhou',
      'Changchun',
      'Ningbo',
      'Nanning'
    ]
  }
}

// Helper function to get cities for a country
export function getCitiesForCountry(countryCode: string): string[] {
  const country = citiesByCountry[countryCode.toUpperCase()]
  return country ? country.cities : []
}