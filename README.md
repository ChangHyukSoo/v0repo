# 여백 블로그

`/content/posts` 폴더의 Markdown 파일을 읽어 구성하는 Next.js 개인 블로그입니다. 데이터베이스나 CMS 없이 파일 기반으로 동작합니다.

## 실행

```bash
pnpm install
pnpm dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## 포스팅 추가

`content/posts/my-post.md` 파일을 만들고 아래 frontmatter를 작성합니다.

```md
---
title: "포스팅 제목"
description: "목록과 SEO에 표시할 요약"
date: "2026-10-21"
slug: "my-post"
tags:
  - 기록
draft: false
relatedPosts:
  - first-post
---

# 본문
```

`draft: true`인 포스팅은 공개 페이지와 사이트맵에서 제외됩니다. `relatedPosts`에는 다른 포스팅의 slug를 지정할 수 있으며, 부족한 연관 글은 공통 태그를 기준으로 자동 보완됩니다.

## 이미지 삽입

이미지를 `public/images`에 넣고 Markdown에서 절대 경로로 참조합니다.

```md
![이미지 설명](/images/example.jpg)
```

## 초안 미리보기

개발 서버에서 `/preview`를 열면 초안을 포함한 모든 글을 볼 수 있습니다. `/preview/slug`에서 공개 상세 페이지와 같은 레이아웃으로 확인할 수 있습니다. 프로덕션 환경에서는 `/preview`가 404를 반환합니다.
