# 여백 블로그

`/content/posts` 폴더의 Markdown 파일을 읽어 구성하는 Next.js 개인 블로그입니다. 데이터베이스나 CMS 없이 파일 기반으로 동작합니다.

## 실행

```bash
pnpm install
pnpm dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## Vercel 배포 (`vercel` 브랜치)

GitHub 저장소 `ChangHyukSoo/v0repo`를 Vercel 프로젝트에 연결합니다.

1. `vercel` 브랜치를 GitHub에 푸시합니다: `git push -u origin vercel`.
2. Vercel에서 **Add New → Project**로 저장소를 가져옵니다. 기존 연결된 프로젝트가 있다면 그 프로젝트를 사용합니다.
3. Framework Preset은 **Next.js**, Root Directory는 **저장소 루트 (`./`)**로 설정합니다. GitHub 저장소 자체가 앱 루트이므로 `v0repo/`를 입력하지 않습니다.
4. **Settings → Environments → Production → Branch Tracking**에서 Production Branch를 **`vercel`**로 설정합니다. 최초 가져오기 화면에서 브랜치를 선택할 수 있으면 `vercel`을 선택합니다.
5. Node.js는 **24.x**를 사용합니다. 설치·빌드 명령은 `vercel.json`을 따르고 Output Directory는 Next.js 기본값을 유지합니다.
6. 환경 변수 **`ENABLE_EXPERIMENTAL_COREPACK=1`**을 설정하고 시스템 환경 변수 자동 노출을 활성화합니다. `packageManager`에 지정된 pnpm 버전으로 의존성을 설치합니다.
7. 필요하면 **`NEXT_PUBLIC_SITE_URL=https://실제-도메인`**을 설정합니다. 생략하면 Vercel의 프로덕션 도메인, 배포 도메인 순서로 사용합니다. 도메인 변경 후에는 다시 배포합니다.
8. `vercel` 브랜치에서 배포를 실행합니다. 이후 이 브랜치에 푸시하면 프로덕션에 자동 배포됩니다.

별도 GitHub Actions 워크플로나 Vercel 토큰을 저장소에 추가할 필요가 없습니다. Vercel GitHub 연동을 사용하며, GitHub Pages용 `GITHUB_PAGES`, `NEXT_PUBLIC_BASE_PATH` 환경 변수는 설정하지 않습니다.

`vercel.json`은 frozen lockfile 설치 후 타입 검사와 Next.js 서버 빌드를 수행합니다. 배포 후 `/`, `/posts`, 공개 글 상세, `/sitemap.xml`을 확인합니다. 프로덕션에서 `/preview`는 404여야 합니다.

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
