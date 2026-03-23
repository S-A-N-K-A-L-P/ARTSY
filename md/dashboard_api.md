# Dashboard & Feed API Reference

Documentation of all endpoints powering the Discovery and Management layers.

## 1. Discovery API (`/api/items`)
Fetches public artifacts for the Social Home Feed.

- **Method**: `GET`
- **Query Params**: `limit` (default: 20)
- **Response Structure**: `Array<Item>`

### JSON Token Example
```json
[
  {
    "_id": "65f1234567890abcdef12345",
    "ownerId": {
      "username": "tushar_artsy",
      "profile": { "avatar": "https://..." },
      "aesthetic": "cyberpunk"
    },
    "title": "Neon Artifact #01",
    "description": "A high-depth digital manifestation.",
    "images": ["https://..."],
    "price": 899,
    "aesthetic": "cyberpunk",
    "createdAt": "2024-03-15T10:00:00Z"
  }
]
```

## 2. Creator Page API (`/api/creator/page`)
Manages high-level creator spaces.

- **Method**: `GET` (Fetch user's pages) | `POST` (Create new page)
- **Response Structure**: `{ success: boolean, pages: Array<Page> }`

### JSON Token Example (Page Object)
```json
{
  "_id": "65f987654321fedcba098765",
  "name": "Design Sanctum",
  "slug": "sanctum",
  "aesthetic": {
    "theme": "noir",
    "custom": {
      "primaryColor": "#000",
      "font": "inter",
      "spacing": "compact"
    }
  },
  "type": "gallery",
  "coverImage": "https://...",
  "stats": { "followers": 12, "views": 450 }
}
```

## 3. Aesthetic Management (`/api/user/aesthetic`)
Persists the user's current aesthetic perspective preference.

- **Method**: `PUT`
- **Request Body**: `{ aesthetic: string }`

### JSON Request Token
```json
{
  "aesthetic": "vaporwave"
}
```

## 4. Item Control (`/api/creator/item`)
Granular item management for specific pages.

- **Method**: `GET` (Filtered by `pageId`)
- **Query Params**: `pageId`
```json
{
  "success": true,
  "items": [
     {
       "title": "Vapor Item",
       "price": 1200,
       "images": ["..."]
     }
  ]
}
```
