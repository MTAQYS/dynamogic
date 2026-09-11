# MCP tool description (exact)

Agents should see **exactly one tool**.

---

## Tool name

```
create_branded_pdf
```

---

## Description string (agents see this)

```
Create a branded PDF from markdown or plain text using the user's Dynamogic brand kit (or inline brand fields). Returns a PDF URL and optional share URL. Use when the user wants a downloadable or shareable on-brand PDF from AI-generated content. Respects plan quotas. Dynamogic is a brand layer for AI output — not a full design suite.
```

---

## Input schema (JSON Schema)

```json
{
  "type": "object",
  "additionalProperties": false,
  "properties": {
    "content": {
      "type": "string",
      "description": "Document body as markdown or plain text."
    },
    "content_type": {
      "type": "string",
      "enum": ["markdown", "plain"],
      "default": "markdown",
      "description": "How to interpret content."
    },
    "brand_kit_id": {
      "type": "string",
      "description": "UUID of a saved brand kit for the authenticated Dynamogic account. Prefer this when available."
    },
    "brand": {
      "type": "object",
      "description": "Inline brand override/fallback when brand_kit_id is omitted.",
      "additionalProperties": false,
      "properties": {
        "name": { "type": "string" },
        "primary_color": { "type": "string", "description": "Hex color, e.g. #0A0A0A" },
        "secondary_color": { "type": "string" },
        "font_heading": { "type": "string" },
        "font_body": { "type": "string" },
        "footer_text": { "type": "string" },
        "website": { "type": "string" },
        "logo_url": { "type": "string", "description": "Public HTTPS URL to logo image" },
        "accent_style": {
          "type": "string",
          "enum": ["minimal", "bar", "left-rule"]
        }
      },
      "required": ["primary_color", "font_heading", "font_body", "accent_style"]
    },
    "share": {
      "type": "boolean",
      "default": true,
      "description": "If true, also create a share URL per plan expiry rules."
    }
  },
  "required": ["content"]
}
```

**Validation rule:** at least one of `brand_kit_id` or `brand` must be present (enforce in tool handler).

---

## Output (tool result text / structured)

Return JSON as text content:

```json
{
  "id": "uuid",
  "status": "done",
  "pdf_url": "https://...",
  "share_url": "https://...",
  "chars": 1234
}
```

On quota errors, return a clear message including upgrade URL — do not silently retry loops.

---

## Server env

- `DYNAMOGIC_API_KEY` — required  
- `DYNAMOGIC_API_BASE` — default `https://YOURDOMAIN/api/v1`  

---

## Non-goals

Do not register tools like `list_pdfs`, `delete_pdf`, `update_brand` in v1.
