import { expect, test, type Page } from "@playwright/test";

async function learn(page: Page) {
  await page.goto("/dashboard");
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  await page.getByRole("link", { name: "Continue Learning" }).click();
  await expect(page).toHaveURL(/\/learn\/food-chains$/);
  await page.getByRole("link", { name: "Start lesson" }).click();
  await expect(page.getByRole("heading", { name: "Where energy begins" })).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toHaveCount(0);
  await expect(page.getByText("Demo preview · Sample progress · No data is saved yet")).toHaveCount(0);
  await expect(page.getByText("Choose an answer to check it. You can try again.")).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Check answer", exact: true })).toBeDisabled();
  await page.getByRole("radio", { name: "Grass", exact: true }).check();
  await expect(page.getByRole("button", { name: "Check answer", exact: true })).toBeEnabled();
  await expect(page.getByRole("status")).toBeEmpty();
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Try again");
  await expect(page.getByRole("heading", { name: "Where energy begins" })).toBeVisible();
  await expect(page.getByRole("status")).toContainText("Frog ← Grasshopper ← Grass ← ?");
  await expect(page.getByRole("status")).not.toContainText(/sun/i);
  await expect(page.getByRole("button", { name: "Continue", exact: true })).toHaveCount(0);
  await page.getByRole("radio", { name: "Grasshopper", exact: true }).check();
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Frog ← Grasshopper ← Grass ← ?");
  await expect(page.getByRole("status")).not.toContainText(/sun/i);
  await expect(page.getByText("1 of 3")).toBeVisible();
  await page.getByRole("radio", { name: "Sun", exact: true }).check();
  await expect(page.getByRole("button", { name: "Continue", exact: true })).toHaveCount(0);
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("energy began with sunlight");
  await expect(page.getByRole("button", { name: "Continue", exact: true })).toBeEnabled();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Plants are producers" })).toBeFocused();
  await expect(page.getByText("2 of 3")).toBeVisible();
  await page.getByRole("button", { name: "Back", exact: true }).click();
  await expect(page.getByRole("radio", { name: /Sun/ })).toBeChecked();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Consumers get energy by eating" })).toBeVisible();
  await page.getByRole("button", { name: "Go to Quick Check" }).click();
  await expect(page.getByRole("button", { name: "Check Answer" })).toBeDisabled();
}

test("Quick Check preserves withheld answer, reload reset and direct correct feedback", async ({ page }) => {
  await learn(page);
  await page.getByRole("radio", { name: "B. Frog" }).check();
  await page.getByRole("button", { name: "Check Answer" }).click();
  await expect(page.getByRole("heading", { name: "Why did you choose that?" })).toBeFocused();
  await expect(page.getByRole("status")).toContainText("Not quite");
  await expect(page.getByRole("main")).not.toContainText(/grasshopper|feeds directly|correct answer/i);
  await page.reload();
  await expect(page.getByRole("radio", { name: "Sun", exact: true })).not.toBeChecked();
  await page.getByRole("radio", { name: "Sun", exact: true }).check();
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Go to Quick Check" }).click();
  await page.getByRole("radio", { name: "C. Grasshopper" }).check();
  await page.getByRole("button", { name: "Check Answer" }).click();
  await expect(page.getByRole("heading", { name: "That’s right!" })).toBeVisible();
  await expect(page.getByRole("status")).toContainText("grasshopper feeds directly on the producer");
  await page.getByRole("link", { name: "Back to your journey" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
});

test("entry, recommendation and topic links resolve; supporting topics stay previews", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore Leebs" }).click();
  await page.getByRole("link", { name: "Continue as Adora" }).click();
  await page.getByRole("link", { name: "View topics" }).click();
  await expect(page.getByText("Preview only · Lesson coming later.")).toHaveCount(2);
  await page.getByRole("link", { name: "Open topic" }).click();
  await expect(page.getByRole("heading", { name: "Food Chains & Energy Flow", exact: true })).toBeVisible();
});

test("Step 1 can be checked with the keyboard and changing an answer requires checking again", async ({ page }) => {
  await page.goto("/learn/food-chains/lesson");
  const checkButton = page.getByRole("button", { name: "Check answer", exact: true });
  await expect(checkButton).toBeDisabled();
  await page.getByRole("radio", { name: "Sun", exact: true }).focus();
  await page.keyboard.press("Space");
  await expect(checkButton).toBeEnabled();
  await checkButton.focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("button", { name: "Continue", exact: true })).toBeEnabled();
  await page.getByRole("radio", { name: /Sun/ }).focus();
  await page.keyboard.press("ArrowDown");
  await expect(page.getByRole("radio", { name: /Grass Selected/ })).toBeChecked();
  await expect(page.getByRole("button", { name: "Continue", exact: true })).toHaveCount(0);
  await expect(page.getByRole("status")).toBeEmpty();
  await checkButton.click();
  await expect(page.getByRole("status")).toContainText("Try again");
  await expect(page.getByText("1 of 3")).toBeVisible();
});

for (const width of [360, 430, 1024]) {
  test(`journey fits ${width}px and answer options support keyboard`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await learn(page);
    await page.screenshot({ path: test.info().outputPath(`quick-check-${width}.png`), fullPage: true });
    await page.getByRole("radio", { name: "A. Grass" }).focus();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("radio", { name: "B. Frog" })).toBeChecked();
    await expect(page.getByRole("button", { name: "Check Answer" })).toBeEnabled();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await page.reload();
    await expect(page.getByRole("heading", { name: "Where energy begins" })).toBeVisible();
    const primaryAction = page.getByRole("button", { name: "Check answer", exact: true });
    await primaryAction.scrollIntoViewIfNeeded();
    await expect(primaryAction).toBeInViewport();
    const bounds = await primaryAction.boundingBox();
    expect(bounds!.height).toBeGreaterThanOrEqual(48);
    expect(bounds!.width).toBeGreaterThanOrEqual(44);
    await page.screenshot({ path: test.info().outputPath(`lesson-${width}.png`), fullPage: true });
    await page.getByRole("link", { name: "Topic overview" }).click();
    await expect(page).toHaveURL(/\/learn\/food-chains$/);
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
  });
}
