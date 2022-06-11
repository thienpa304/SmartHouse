// ----------------------------------------------------------------------

const productsLink = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9o3VQ0jqok0ZBRdeyNv-9BFxeJHoGzCIxEQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9o3VQ0jqok0ZBRdeyNv-9BFxeJHoGzCIxEQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh35ts0VAy0CrQnEjrVm3EhHrG7K_XAWppjg&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCqRmBi7jMBySdb-8DfY9P9visMWA59sf8cA&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSz22MGFt8LyWexAhZ8LjnUZGMUTfH5mARlUQ&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4gNTJZfWUJyCKNG1saFJK1ct5URkVChzWbg&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlRSL2YtcUG2L4cH1nRdKg11y2t1owXaE31A&usqp=CAU',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0cswhyOJFRCNp94xk4m9yYCa8nngZbZl0YA&usqp=CAU'
]
export const mockImgCover = (index) => `/static/mock-images/covers/cover_${index}.jpg`;
export const mockImgProduct = (index) => productsLink[index];
export const mockImgAvatar = (index) => `/static/mock-images/avatars/avatar_${index}.jpg`;
