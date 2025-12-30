# Vue 3 電商商城專案（前台 / 後台）

一個使用Vue 3 + TypeScript開發的前後台分離電商網站，模擬實際商業情境，完整實作商品、購物車、訂單與後台管理流程。

---

## 專案背景與目的

本專案為一個模擬電商平台，分為前台（使用者端）與後台（管理者端）：

- 前後台分離的專案設計
- 與第三方 API 串接的資料流處理
- TypeScript 型別設計與錯誤預防
- 元件化與狀態管理的實際應用
- 後台管理系統常見功能實作

---

## 使用技術

- Vue 3
- TypeScript
- Composition API
- Pinia（狀態管理）
- Vue Router
- Element Plus
- SCSS
- RWD 響應式設計

---

## 功能實作說明

### 前台（使用者端）
- 商品列表與分類瀏覽
- 商品詳細頁
- 購物車新增 / 刪除 / 數量調整
- 套用優惠券
- 建立訂單（含表單驗證）
- 響應式版型（桌機 / 平板 / 手機）

### 後台（管理者端）
- 管理者登入驗證
- 商品管理（CRUD）
- 訂單管理
- 優惠券管理
- 圖片上傳與顯示
- 權限控管（未登入不可操作）

---

## 專案架構說明

```bash
src/
├── api/            # API 請求封裝（axios）
├── assets/         # 靜態資源
├── components/     # 共用元件
├── composables/    # Composition API 邏輯抽離
├── data/           # 靜態資料
├── layout/         # 前台 / 後台版型配置
├── router/         # 路由與權限控管
├── store/          # Pinia 狀態管理
├── types/          # TypeScript 型別定義
├── styles/         # SCSS 與共用樣式
├── views/
│   ├── front/      # 前台頁面
│   └── admin/      # 後台頁面
└── utils/          # 共用工具函式
```
---

## 專案啟動方式

```bash
# 安裝套件
npm install

# 啟動開發環境
npm run dev

# 建置專案
npm run build
```