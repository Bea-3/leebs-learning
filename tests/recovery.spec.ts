import { expect, test, type Page } from "@playwright/test";

async function quickCheck(page: Page, option = "B. Frog") {
  await page.goto("/learn/food-chains/lesson");
  await page.getByRole("radio", { name: "Sun", exact: true }).check();
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByRole("button", { name: "Go to Quick Check" }).click();
  await page.getByRole("radio", { name: option }).check();
  await page.getByRole("button", { name: "Check Answer", exact: true }).click();
}

async function stage(page: Page, title: string) {
  await expect(page.getByRole("heading", { name: title, exact: true })).toBeFocused();
  await expect(page.getByRole("navigation", { name: "Main navigation" })).toHaveCount(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  const primary = title === "Understanding grows" ? page.getByRole("link", { name: "Back to learning" }) : page.getByRole("button").last();
  await primary.scrollIntoViewIfNeeded();
  await expect(primary).toBeInViewport();
  expect((await primary.boundingBox())!.height).toBeGreaterThanOrEqual(48);
}

async function answer(page: Page, option: string) {
  await page.getByRole("radio", { name: option, exact: true }).check();
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
}

async function reachTransfer(page: Page, coachingChoice = "Yes") {
  await answer(page, coachingChoice);
  await stage(page, "Follow the producer");
  await answer(page, "Grasshopper");
  await expect(page.getByRole("status")).toContainText("grasshopper feeds directly on the producer");
  await page.getByRole("button", { name: "Prove understanding" }).click();
  await stage(page, "Prove it");
  await expect(page.getByRole("button", { name: "Check answer", exact: true })).toBeDisabled();
}

for (const width of [360, 430, 1024]) {
  test(`signature misconception-to-understanding journey at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await quickCheck(page);
    await stage(page, "Why did you choose that?");
    await expect(page.getByRole("status")).toContainText("Not quite");
    await expect(page.getByRole("main")).not.toContainText(/grasshopper|correct answer/i);
    await expect(page.getByRole("button", { name: "Continue", exact: true })).toBeDisabled();
    await page.getByLabel("Your thinking").fill("   ");
    await expect(page.getByRole("button", { name: "Continue", exact: true })).toBeDisabled();
    await page.getByLabel("Your thinking").fill("I chose frog because it eats the grasshopper. I thought the first animal that eats another animal is the primary consumer.");
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await stage(page, "Let’s work it out");
    await expect(page.getByText("You’re right that consumers get energy by eating other organisms.")).toBeVisible();
    await expect(page.getByRole("main")).not.toContainText(/grasshopper|correct answer/i);
    await expect(page.getByText("Guided practice · Prewritten prompts, not AI analysis")).toBeVisible();
    await page.screenshot({ path: test.info().outputPath("coaching.png"), fullPage: true });
    await reachTransfer(page);
    await answer(page, "B. Rat");
    await expect(page.getByRole("status")).toContainText("You’ve got it.");
    await page.getByRole("button", { name: "Continue", exact: true }).click();
    await stage(page, "Before you go...");
    await expect(page.getByRole("button", { name: "Finish lesson" })).toBeDisabled();
    await page.getByLabel("In your own words, a primary consumer is...").fill("   ");
    await expect(page.getByRole("button", { name: "Finish lesson" })).toBeDisabled();
    await page.getByLabel("In your own words, a primary consumer is...").fill("An organism that eats a producer directly.");
    await page.getByRole("button", { name: "Finish lesson" }).click();
    await stage(page, "Understanding grows");
    await expect(page.getByText("Developing → Understanding", { exact: true })).toBeVisible();
    await page.screenshot({ path: test.info().outputPath("completion.png"), fullPage: true });
    await page.getByRole("link", { name: "Back to learning" }).click();
    await expect(page).toHaveURL(/\/dashboard$/);
    await expect(page.getByRole("navigation", { name: "Main navigation" })).toBeVisible();
    await expect(page.getByText("Understanding", { exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Review Food Chains" })).toBeVisible();
    await page.reload();
    await expect(page.getByText("Understanding", { exact: true })).toBeVisible();
    await page.screenshot({ path: test.info().outputPath("dashboard.png"), fullPage: true });
    await page.getByRole("link", { name: "Journal", exact: true }).click();
    await expect(page.getByRole("article", { name: "Food Chains learning history" })).toContainText("An organism that eats a producer directly.");
    await expect(page.getByText("Understanding", { exact: true })).toBeVisible();
    await page.screenshot({ path: test.info().outputPath("journal.png"), fullPage: true });
  });
}

for (const choice of ["No", "I’m not sure"]) {
  test(`unsure reasoning and ${choice} coaching response receive scaffolding; transfer retries`, async ({ page }) => {
    await quickCheck(page);
    await page.getByRole("checkbox", { name: "I’m not sure" }).focus();
    await page.keyboard.press("Space");
    await page.getByRole("button", { name: "Continue", exact: true }).focus();
    await page.keyboard.press("Enter");
    await stage(page, "Let’s work it out");
    await expect(page.getByText("Let’s look at how consumers get energy.")).toBeVisible();
    await answer(page, choice);
    await expect(page.getByText(/Maize is a producer\. The chicken/)).toBeVisible();
    await answer(page, "Frog");
    await expect(page.getByRole("status")).toContainText("Find the producer first");
    await expect(page.getByRole("button", { name: "Prove understanding" })).toHaveCount(0);
    await answer(page, "Grasshopper");
    await page.getByRole("button", { name: "Prove understanding" }).click();
    await answer(page, "C. Snake");
    await expect(page.getByRole("status")).toContainText("Find the producer first. Then look at what eats it directly.");
    await expect(page.getByRole("status")).not.toContainText(/rat/i);
    await expect(page.getByRole("heading", { name: "Prove it" })).toBeVisible();
    await page.getByRole("radio", { name: "A. Cassava" }).focus();
    await page.keyboard.press("ArrowDown");
    await expect(page.getByRole("radio", { name: /B\. Rat/ })).toBeChecked();
    await page.getByRole("button", { name: "Check answer", exact: true }).click();
    await expect(page.getByRole("status")).toContainText("You’ve got it.");
  });
}

test("arbitrary reasoning is accepted and bounded hints prevent a trapped learner", async ({ page }) => {
  await quickCheck(page, "A. Grass");
  await page.getByLabel("Your thinking").fill("I picked the first item. I’m still working this out.");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByText("Let’s look at how consumers get energy.")).toBeVisible();
  await answer(page, "No");
  await answer(page, "Snake");
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("grasshopper feeds directly on the producer");
  await page.getByRole("button", { name: "Prove understanding" }).click();
  await answer(page, "D. Hawk");
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("The rat eats the producer directly");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("In your own words, a primary consumer is...").fill("It eats a plant directly.");
  await page.getByRole("button", { name: "Finish lesson" }).click();
  await expect(page.getByText("Developing · Keep practising", { exact: true })).toBeVisible();
  await expect(page.getByText("Developing → Understanding", { exact: true })).toHaveCount(0);
});

test("storage unavailable does not block fallback completion or the dashboard payoff", async ({ page }) => {
  await page.addInitScript(() => {
    Storage.prototype.getItem = () => { throw new Error("Storage unavailable"); };
    Storage.prototype.setItem = () => { throw new Error("Storage unavailable"); };
  });
  await page.route("**/api/coach", (route) => route.abort("internetdisconnected"));
  await quickCheck(page);
  await page.getByRole("checkbox", { name: "I’m not sure" }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await expect(page.getByText("Guided practice · Prewritten prompts, not AI analysis")).toBeVisible();
  await reachTransfer(page);
  await answer(page, "B. Rat");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("In your own words, a primary consumer is...").fill("It eats the producer directly.");
  await page.getByRole("button", { name: "Finish lesson" }).click();
  await expect(page.getByText("Developing → Understanding", { exact: true })).toBeVisible();
  await expect(page.getByRole("status")).toContainText("couldn’t save your result");
  await page.getByRole("link", { name: "Back to learning" }).click();
  await expect(page.getByText("Understanding", { exact: true })).toBeVisible();
});

test("corrupt saved progress is ignored without blocking the lesson", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("leebs.food-chains.v1", "{broken json"));
  await page.goto("/dashboard");
  await expect(page.getByText("Needs Practice", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Continue Learning" })).toBeVisible();
  await page.getByRole("link", { name: "Continue Learning" }).click();
  await page.getByRole("link", { name: "Start lesson" }).click();
  await expect(page.getByRole("heading", { name: "Where energy begins" })).toBeVisible();
});

test("a later assisted attempt saves its reflection without replacing best mastery evidence", async ({ page }) => {
  await quickCheck(page);
  await page.getByRole("checkbox", { name: "I’m not sure" }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await reachTransfer(page);
  await answer(page, "B. Rat");
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await page.getByLabel("In your own words, a primary consumer is...").fill("My first reflection.");
  await page.getByRole("button", { name: "Finish lesson" }).click();
  const best = await page.evaluate(() => JSON.parse(localStorage.getItem("leebs.food-chains.v1")!));
  expect(best.mastery).toBe("Understanding");
  expect(best.evidence).toBe("transfer");

  await quickCheck(page);
  await page.getByRole("checkbox", { name: "I’m not sure" }).check();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  await reachTransfer(page);
  await answer(page, "D. Hawk");
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await page.getByRole("button", { name: "Check answer", exact: true }).click();
  await page.getByRole("button", { name: "Continue", exact: true }).click();
  const latestReflection = "I needed guidance this time. A primary consumer eats a producer.";
  await page.getByLabel("In your own words, a primary consumer is...").fill(`  ${latestReflection}  `);
  await page.getByRole("button", { name: "Finish lesson" }).click();
  await expect(page.getByText("This practice needed guidance. Your best demonstrated mastery remains Understanding.")).toBeVisible();
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("leebs.food-chains.v1")!))).toEqual({ ...best, reflection: latestReflection });
  await page.getByRole("link", { name: "Back to learning" }).click();
  await expect(page.getByText("Understanding", { exact: true })).toBeVisible();
  await page.getByRole("link", { name: "Journal", exact: true }).click();
  await page.reload();
  await expect(page.getByText(latestReflection, { exact: true })).toBeVisible();
  await expect(page.getByText("My first reflection.", { exact: true })).toHaveCount(0);
  await expect(page.getByText("Your latest reflection", { exact: true })).toBeVisible();
  await expect(page.getByText("Understanding", { exact: true })).toBeVisible();

  // A direct correct retry has no reflection and must not erase the latest one.
  await quickCheck(page, "C. Grasshopper");
  expect(await page.evaluate(() => JSON.parse(localStorage.getItem("leebs.food-chains.v1")!))).toEqual({ ...best, reflection: latestReflection });
});
