import { expect, test, type Page } from "@playwright/test";
import { localCoachingService } from "@/lib/coaching";
import { recommendedLesson, recommendedQuestion } from "@/content/biology";

async function reasoningScreen(page: Page) {
  await page.goto("/learn/food-chains/lesson");
  await page.getByRole("radio", { name: "Sun", exact: true }).check();
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Go to Quick Check" }).click();
  await page.getByRole("radio", { name: "B. Frog" }).check();
  await page.getByRole("button", { name: "Check Answer", exact: true }).click();
}

test("AI guidance renders truthfully, loading prevents duplicates, and the golden path still completes", async ({ page }) => {
  await page.setViewportSize({ width: 360, height: 844 });
  let release!: () => void;
  const gate = new Promise<void>((resolve) => { release = resolve; });
  let calls = 0;
  let payload: unknown;
  const base = await localCoachingService.getPrompt({ concept: recommendedLesson.objective, question: recommendedQuestion, selectedAnswerId: "b", reasoning: "I know plants make food.", attempt: 1 });
  await page.route("**/api/coach", async (route) => {
    calls++;
    payload = route.request().postDataJSON();
    await gate;
    await route.fulfill({ json: { ...base, source: "ai", reasoningType: "partial_understanding", acknowledgement: "You recognised that plants make their own food.", guidance: "Focus next on how an organism gets energy from a plant.", misconception: null } });
  });
  await reasoningScreen(page);
  await page.getByLabel("Your thinking").fill("I know plants make food.");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByText("Thinking about your explanation...")).toBeVisible();
  await expect(page.getByRole("button", { name: "Thinking…", exact: true })).toBeDisabled();
  expect(calls).toBe(1);
  expect(payload).toEqual({ lessonId: "energy-starts-here", questionId: "primary-consumer-demo", selectedAnswerId: "b", reasoning: "I know plants make food.", coachingAttempt: 1 });
  release();
  await expect(page.getByText("AI Coach", { exact: true })).toBeVisible();
  await expect(page.getByText("Focus next on how an organism gets energy from a plant.")).toBeVisible();
  await expect(page.getByRole("main")).not.toContainText(/grasshopper|correct answer/i);
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: test.info().outputPath("ai-coaching-360.png"), fullPage: true });
  await page.getByRole("radio", { name: "Yes", exact: true }).check();
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await page.getByRole("radio", { name: "Grasshopper", exact: true }).check();
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await page.getByRole("button", { name: "Prove understanding" }).click();
  await page.getByRole("radio", { name: "B. Rat", exact: true }).check();
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("In your own words, a primary consumer is...").fill("It eats a producer directly.");
  await page.getByRole("button", { name: "Finish lesson" }).click();
  await expect(page.getByText("Developing → Understanding", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Back to learning" }).click();
  await expect(page).toHaveURL(/\/dashboard$/);
  expect(calls).toBe(1);
});

for (const failure of ["network", "malformed-response"]) {
  test(`${failure} transitions to truthful guided practice`, async ({ page }) => {
    await page.route("**/api/coach", async (route) => {
      if (failure === "network") await route.abort("internetdisconnected");
      else await route.fulfill({ json: { acknowledgement: "invalid raw model output" } });
    });
    await reasoningScreen(page);
    await page.getByRole("checkbox", { name: "I’m not sure" }).check();
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await expect(page.getByText("Guided practice · Prewritten prompts, not AI analysis")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Let’s work it out" })).toBeFocused();
    await page.getByRole("radio", { name: "I’m not sure", exact: true }).check();
    await page.getByRole("button", { name: "Check answer", exact: true }).click();
    await expect(page.getByText(/Maize is a producer\. The chicken/)).toBeVisible();
  });
}
