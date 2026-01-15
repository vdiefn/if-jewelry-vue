export interface ProductData {
  category: string,
  content: string,
  description: string,
  id: string,
  is_enabled: number,
  num: number,
  origin_price:number,
  price: number,
  title: string,
  unit: string,
  imageUrl: string,
  imagesUrl: string[]
}

export interface Pagination {
  total_pages: number,
  current_page: number,
  has_pre: boolean,
  has_next: boolean,
  category: string
}

export interface GetProductsResponse {
  success: boolean,
  products: ProductData[],
  pagination: Pagination,
  message: string[]
}

export interface CreateProductParams {
  title: string
  category: string
  origin_price: number
  price: number
  unit: string
  description: string
  content: string
  is_enabled: number
  imageUrl: string
  imagesUrl: string[],
  num:number
}

export interface ProductResponse {
  success: boolean,
  message: string
}

export interface EditProductParams {
  id: string
  title: string
  category: string
  origin_price: number
  price: number
  unit: string
  description: string
  content: string
  is_enabled: number
  imageUrl: string
  imagesUrl: string[]
  num:number
}

export type AllProductData = Record<string, ProductData>

export interface AllProductsResponse {
  success: boolean,
  products: AllProductData
}
