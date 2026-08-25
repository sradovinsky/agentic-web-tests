# Codemify Homepage Focused Test Plan

## Application Overview

Focused functional test plan for the single visible homepage at https://codemify.com/. Every scenario starts from a fresh blank state using tests/seed.spec.ts. Testers must remain on the homepage, must not follow any link, and should record link destinations from the rendered href only where specified.

## Test Scenarios

### 1. Codemify Homepage

**Seed:** `tests/seed.spec.ts`

#### 1.1. Homepage content and CTA destination integrity without navigation

**File:** `tests/codemify-homepage/homepage-content-and-cta-destinations.spec.ts`

**Steps:**
  1. Open the seeded page and verify the page URL is exactly https://codemify.com/ and the title identifies Codemify career training.
    - expect: The homepage loads without a navigation away from https://codemify.com/.
    - expect: The main hero heading, founder attribution, career-path section, course roadmap, pricing/payment section, FAQ section, and footer are visible or reachable by scrolling.
  2. Inspect visible links and record their href destinations without clicking them, including Schedule, Explore the Courses Now, Try Free Lesson, Join AI Testing Workshop, Book a call, Subscribe, Reserve Your Spot, Get Started Now, and social links.
    - expect: Each link exposes a destination consistent with its label.
    - expect: Outbound destinations such as courses.codemify.com, calendly.com, youtube.com, Google reviews, and social platforms are recorded but not opened.
    - expect: Same-site route destinations such as /program and /courses-schedule are recorded but not opened.
  3. Scroll through the homepage and verify the course, community, benefits, testimonials, pricing, and footer content remains present and does not force a page navigation.
    - expect: The page remains on https://codemify.com/.
    - expect: The displayed pricing information, money-back guarantee, testimonials, and support/contact information are readable.

#### 1.2. Career path selector updates the homepage in place

**File:** `tests/codemify-homepage/career-path-selector.spec.ts`

**Steps:**
  1. From a fresh seeded homepage, locate the Find Your Career Path selector and note the initially selected path and description.
    - expect: The selector presents Manual QA (AI Assistant), QA AI Automation Engineer, AI Testing Engineer, AI Automation SDET Engineer, and ML Engineer options.
    - expect: A current career label and supporting description are displayed.
  2. Select ML Engineer.
    - expect: The selected career label changes to ML Engineer.
    - expect: The supporting description updates to describe the beginner machine-learning program.
    - expect: The browser remains on https://codemify.com/ and no external or route-changing page opens.
  3. Select QA AI Automation Engineer, then select another available career path.
    - expect: The displayed career label and description update to match each selected option.
    - expect: Only the in-page career content changes; the homepage URL remains unchanged.

#### 1.3. Free lesson hash and FAQ accordion behavior

**File:** `tests/codemify-homepage/free-lesson-and-faq.spec.ts`

**Steps:**
  1. From a fresh seeded homepage, activate Try Free Lesson and inspect the resulting page state without navigating elsewhere.
    - expect: The URL remains on codemify.com and may include the in-page hash #popup:free-lesson-homepageV2.
    - expect: An in-page free-lesson popup or overlay becomes visible; if it does not render, the test records the missing overlay as a failure.
    - expect: No new external page is opened.
  2. Dismiss the free-lesson popup using its available close control, or return to the base homepage state if no popup rendered.
    - expect: The homepage remains available at codemify.com.
    - expect: No outbound destination is visited.
  3. Scroll to FAQ and activate Do I need coding experience or a special degree?.
    - expect: The FAQ button exposes an expanded state.
    - expect: The answer No prior experience or education required. appears in place.
    - expect: The URL remains on the Codemify homepage.
  4. Activate the same FAQ question again.
    - expect: The answer collapses or the accordion returns to its closed state.
    - expect: No navigation occurs.
