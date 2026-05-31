# ⚓ HuK (Helper Utility Kit)

[![npm version](https://img.shields.io/badge/npm-v1.0.0-orange.svg)](https://www.npmjs.com/package/@vorlaxen-labs/huk)
[![License: MIT](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-orange?logo=typescript)](https://www.typescriptlang.org/)

**Smart helpers for modern TypeScript environments. Small footprint, massive utility.**

`HuK` is a highly-optimized, zero-dependency utility suite designed to bridge the gap between "standard" logic and "smart" execution. It replaces your messy `utils` folder with a single, type-safe source of truth.

---

## 🔥 Why HuK?

Unlike monolithic utility libraries, **HuK** focuses on "Smart" logic:
*   🚀 **Zero-Dependency:** No bloated node_modules. Pure, high-performance TypeScript.
*   🌲 **Tree-Shakable:** Only ship the code you actually use.
*   🛠️ **BaR-Ready:** Designed to work in perfect harmony with `@vorlaxen-labs/bar-js`.

---

## 📦 Installation

```bash
pnpm add @vorlaxen-labs/huk-js
# or
npm install @vorlaxen-labs/huk-js
```

---

## 🛠️ Smart Modules

HuK is organized into **Namespaces**. This structure ensures that as the library grows, your implementation remains clean and predictable.

### 📝 `huk.string`
Advanced string manipulation with deep localization and security support.
*   **Transformation:** Smart `slugify` with full Turkish character support (ı, ş, ğ, ç, ö, ü), `truncate`, and case mappers (Pascal/Camel).
*   **Security:** Cryptographically secure random strings, data masking (PII protection), and HTML escaping.
*   **Validation:** Strict email, strong password, and advanced empty state checks.

---

## 🚀 Quick Start

```typescript
import { huk } from '@vorlaxen-labs/huk-js';

// 1. Zero-Fail Slugify (Handles Turkish chars perfectly)
const slug = huk.string.slugify("Hakan K. - Software Developer!"); 
// Output: "hakan-k-software-developer"

// 2. Secure PII Masking
const masked = huk.string.mask("4444555566667777", { visibleEnd: 4 });
// Output: "************7777"

// 3. Case Transformation
const camel = huk.string.toCamelCase("user_profile_data");
// Output: "userProfileData"
```

---

## 🧭 Modular Philosophy

To keep your bundles light, HuK supports sub-path imports. As the toolkit expands, you can import only what you need.

```typescript
// Import everything
import { huk } from '@vorlaxen-labs/huk-js';

// Or just the string module
import { string } from '@vorlaxen-labs/huk-js/string';
```

---

## 📐 Design Principle

> **"Don't just write code that works. Write code that assists."**

`HuK` is built on the principle that utilities shouldn't just be "shorthands"; they should be **smarter** than the code they replace. Every helper in this kit is typed to the teeth, ensuring that if it compiles, it works.

---

## ⚖️ License

Distributed under the MIT License. Created with ❤️ by **@vorlaxen-labs**.