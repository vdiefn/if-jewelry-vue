export interface ProductData {
    category: string,
    content: string,
    description: string,
    id: string,
    imageUrl: string,
    imagesUrl: string[],
    is_enabled: number,
    num: number,
    origin_price: number,
    price: number,
    title: string,
    unit: number
  }

  export interface Pagination {
    total_pages: number,
    current_page: number,
    has_pre:boolean,
    has_next:boolean,
    category:string
  }

  export interface AllProductsResponse {
    success: boolean,
    products: ProductData[],
  }

  export interface ProductsResponse extends AllProductsResponse {
    pagination: Pagination
    messages: string[]
  }

  export interface GetProductDetail {
    product: ProductData,
    success:boolean
  }