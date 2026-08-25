import { test, expect } from '@playwright/test';

test.describe('Codemify Homepage', () => {
  test('Homepage content and CTA destination integrity without navigation', async ({ page }) => {
    await page.goto('https://codemify.com/');

    // 1. Open the seeded page and verify the page URL is exactly https://codemify.com/ and the title identifies Codemify career training.
    await expect(page).toHaveURL('https://codemify.com/');
    await expect(page).toHaveTitle(/Codemify.*Career Training.*QA.*AI Testing.*ML/);
    await expect(page.getByRole('heading', { level: 1, name: /Everything You Need to Be Job-Ready/ })).toBeVisible();
    await expect(page.getByText('Sergii · Founder & Lead Mentor', { exact: true })).toBeVisible();
    await expect(page.getByText('Find Your Career Path', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'From No Experience to a Tech Career' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Pricing & Payment Plans' })).toBeVisible();
    await expect(page.getByText('FAQ', { exact: true }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: 'support@codemify.com' })).toBeVisible();

    // 2. Inspect visible links and record their href destinations without clicking them, including Schedule, Explore the Courses Now, Try Free Lesson, Join AI Testing Workshop, Book a call, Subscribe, Reserve Your Spot, Get Started Now, and social links.
    const expectedLinks = [
      ['Schedule', 'https://codemify.com/courses-schedule'],
      ['Explore the Courses Now', '/program'],
      ['Try Free Lesson', '#popup:free-lesson-homepageV2'],
      ['Join AI Testing Workshop', 'https://courses.codemify.com/offers/nqWvoBSx/checkout'],
      ['Book a call', 'https://calendly.com/codemify/consultation'],
      ['Subscribe', 'https://www.youtube.com/@Codemify'],
      ['Reserve Your Spot', 'https://courses.codemify.com/offers/2oZhogLF/checkout'],
      ['Get Started Now', 'https://courses.codemify.com/offers/2oZhogLF/checkout'],
    ] as const;

    for (const [name, href] of expectedLinks) {
      await expect(page.getByRole('link', { name, exact: true }).first()).toHaveAttribute('href', href);
    }

    await expect(page.getByRole('link', { name: 'Book a 1-on-1 Call →', exact: true })).toHaveAttribute(
      'href',
      'https://calendly.com/codemify/qa-career-with-sergii-inst',
    );

    const socialLinks = page.locator('a[href*="linkedin.com"], a[href*="instagram.com"], a[href*="youtube.com"], a[href*="facebook.com"], a[href*="tiktok.com"]');
    await expect(socialLinks).not.toHaveCount(0);
    for (const socialLink of await socialLinks.all()) {
      await expect(socialLink).toHaveAttribute('href', /^(https?:\/\/|mailto:)/);
    }
    await expect(page).toHaveURL('https://codemify.com/');

    // 3. Scroll through the homepage and verify the course, community, benefits, testimonials, pricing, and footer content remains present and does not force a page navigation.
    await page.getByRole('link', { name: 'support@codemify.com' }).scrollIntoViewIfNeeded();
    await expect(page).toHaveURL('https://codemify.com/');
    await expect(page.getByRole('heading', { name: 'Students Learning From Everywhere' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Why are we the best in Tech education?' })).toBeVisible();
    await expect(page.getByText('Student success stories', { exact: true })).toBeVisible();
    await expect(page.getByText('100% Money-Back Guarantee', { exact: true })).toBeVisible();
    await expect(page.getByRole('link', { name: 'support@codemify.com' })).toBeVisible();
  });
});
