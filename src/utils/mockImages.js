// ----------------------------------------------------------------------

const productsLink = [
  'https://images-na.ssl-images-amazon.com/images/G/01/SmartHome/Packages/66525_Amazon_categorytile_ClimateControl_400x400_superside_EN_1.png',
  'https://images-na.ssl-images-amazon.com/images/G/01/SmartHome/Packages/LG_Feb_2022/LG_EN_400x400.jpg',
  'https://images-na.ssl-images-amazon.com/images/G/01/SmartHome/Packages/Schlage-Q4-2020/XCM_Manual_1282973_us_homeimprovement_cat_tileupdate_400x400_us.en_a576c25a-756c-47a3-9fac-7d9e4d979ebc.jpg',
  'https://images-na.ssl-images-amazon.com/images/G/01/SmartHome/Packages/SYLVANIA_Feb_2022/Sylvania_EN_400x400.jpg',
  'https://images-na.ssl-images-amazon.com/images/G/01/SmartHome/Packages/Shark-Q3-2021/Shark_categorytile_VacuumsAndMops_400x400_superside_EN_1.jpg',
  'https://images-na.ssl-images-amazon.com/images/G/01/SmartHome/Packages/Moen-Q42021/OTHER_SOLUTIONS_400x400_EN_2.jpg',
  'https://images-na.ssl-images-amazon.com/images/G/01/SmartHome/StorefrontRefresh/Round-2/XCM_Manual_1263220_us_homeimprov_smarthome_storefront_400x400-4_43efe889-946f-4094-a3e1-f16847f6d4c4.jpg'
]
export const mockImgCover = (index) => `/static/mock-images/covers/cover_${index}.jpg`;
export const mockImgProduct = (index) => productsLink[index];
export const mockImgAvatar = (index) => `/static/mock-images/avatars/avatar_${index}.jpg`;
